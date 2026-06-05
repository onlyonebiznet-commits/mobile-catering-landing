import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { useGTMTracking } from "@/hooks/useGTM";
import { trackConsultationFormView, trackConsultationSubmit } from "@/utils/ga4-events";
import SuccessModal from "./SuccessModal";

interface ConsultationModalProps {
  onClose: () => void;
  isOpen?: boolean;
}

export default function ConsultationModal({ onClose, isOpen = true }: ConsultationModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();
  const { trackFormSubmit } = useGTMTracking();
  const [hasTrackedFormView, setHasTrackedFormView] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
    service: "",
    region: "",
    estimatedMeals: "",
    message: "",
  });

  const [agreements, setAgreements] = useState({
    allAgree: false,
    personalInfoCollection: false,
    marketingConsent: false,
    adConsent: false,
  });

  const [adMediaConsents, setAdMediaConsents] = useState({
    sms: false,
    email: false,
    kakao: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionCountdown, setCompletionCountdown] = useState(5);
  const [accordionValue, setAccordionValue] = useState<string>("");
  const checkboxClickRef = useRef(false);

  const clearError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Handle outside click - REMOVED
  // Radix Dialog handles outside click dismissal via onOpenChange
  // Custom handler was causing issues with Select Portal (dropdown rendered outside Dialog)

  // ESC key handling is already managed by Radix Dialog
  // No need for custom ESC handler

  // Track form view on mount
  useEffect(() => {
    if (!hasTrackedFormView) {
      trackConsultationFormView();
      setHasTrackedFormView(true);
    }
  }, [hasTrackedFormView]);

  // Auto-redirect after completion
  useEffect(() => {
    if (isCompleted && completionCountdown > 0) {
      const timer = setTimeout(() => {
        setCompletionCountdown(completionCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (isCompleted && completionCountdown === 0) {
      onClose();
      navigate("/");
    }
  }, [isCompleted, completionCountdown, onClose, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value.trim()) {
      clearError(name);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value.trim()) {
      clearError(name);
    }
  };

  const handleAgreementChange = (key: string, value: boolean) => {
    if (key === "allAgree") {
      setAgreements({
        allAgree: value,
        personalInfoCollection: value,
        marketingConsent: value,
        adConsent: value,
      });
    } else if (key === "adConsent") {
      // 광고성 정보 수신 동의 체크 시 하위 항목 모두 자동 체크
      setAgreements({
        ...agreements,
        [key]: value,
      });
      if (value) {
        setAdMediaConsents({
          sms: true,
          email: true,
          kakao: true,
        });
      } else {
        setAdMediaConsents({
          sms: false,
          email: false,
          kakao: false,
        });
      }
    } else {
      const newAgreements = {
        ...agreements,
        [key]: value,
      };
      setAgreements(newAgreements);
      // Update allAgree if all are checked
      const allChecked = newAgreements.personalInfoCollection && newAgreements.marketingConsent && newAgreements.adConsent;
      newAgreements.allAgree = allChecked;
      setAgreements(newAgreements);
    }
  };

  const handleAccordionValueChange = (value: string) => {
    // Checkbox 클릭 중이면 아코디언 열기 무시
    if (checkboxClickRef.current) {
      checkboxClickRef.current = false;
      return;
    }
    setAccordionValue(value);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    checkboxClickRef.current = true;
    e.stopPropagation();
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    // Validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = "회사명을 입력해주세요";
    }
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "담당자명을 입력해주세요";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "연락처를 입력해주세요";
    }
    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요";
    }
    if (!formData.region.trim()) {
      newErrors.region = "지역을 선택해주세요";
    }
    if (!formData.estimatedMeals.trim()) {
      newErrors.estimatedMeals = "예상 인원을 입력해주세요";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("필수 항목을 입력해주세요");
      return;
    }

    if (!agreements.personalInfoCollection) {
      toast.error("개인정보 수집에 동의해주세요");
      return;
    }

    setIsSubmitting(true);
    try {
      // 실제 API 호출
      const response = await fetch("/api/consultation-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          manager: formData.contactPerson,
          phone: formData.phoneNumber,
          email: formData.email,
          serviceType: formData.service,
          expectedMealCount: formData.estimatedMeals,
          inquiries: formData.message || null,
          region: formData.region,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API 요청 실패");
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || "상담 신청 처리 실패");
      }

      // API 성공 후에만 GTM 이벤트 추적
      trackFormSubmit("consultation_request", {
        company_name: formData.companyName,
        contact_person: formData.contactPerson,
        service_type: formData.service || "not_selected",
        region: formData.region || "not_selected",
        estimated_meals: formData.estimatedMeals || "not_specified",
        form_type: "consultation",
      });

      // GA4 이벤트: 상담 신청 완료 (API 성공 후에만 발생)
      trackConsultationSubmit(true);
      
      // 완료 화면 표시
      setIsCompleted(true);
      setCompletionCountdown(5);
    } catch (error) {
      console.error("Consultation request error:", error);
      // GA4 이벤트: 상담 신청 실패
      trackConsultationSubmit(false);
      toast.error(error instanceof Error ? error.message : "상담 신청 중 오류가 발생했습니다");
      // 실패 시 모달은 열린 상태 유지
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && !isCompleted) {
        onClose();
      }
    }}>
      <DialogContent 
        ref={contentRef}
        className="w-[calc(100vw-32px)] md:w-auto md:max-w-[600px] p-0 gap-0 rounded-lg overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          maxHeight: 'calc(100vh - 100px)',
          width: 'calc(100vw - 32px)',
          maxWidth: '600px',
          zIndex: 9999
        }}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) {
            e.stopPropagation();
          }
        }}
        showCloseButton={false}
      >
        {/* Accessible Dialog Title (hidden visually) */}
        <DialogTitle className="sr-only">상담 신청</DialogTitle>

        {/* Header */}
        <div className="bg-[#005B44] px-6 py-6 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 hover:bg-[#004a37] rounded-md transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-xl font-bold text-white pr-8">상담 신청</h2>
          <p className="text-sm text-green-100 mt-2">우리 현장에 맞는 맞춤형 서비스를 제안해드립니다.</p>
        </div>

        {/* Completion Screen */}
        {isCompleted ? (
          <SuccessModal
            title="상담 신청이 완료 되었습니다!"
            messages={["감사합니다.", "빠른 시일 내에 연락드리겠습니다."]}
            countdown={completionCountdown}
            onClose={() => {
              onClose();
              navigate("/");
            }}
          />
        ) : (
          /* Form Content */
          <div className="px-6 py-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company Name */}
            <div className="space-y-1">
              <Label htmlFor="companyName" className="text-sm font-medium">
                회사명 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="예: 프레시 테크"
                value={formData.companyName}
                onChange={handleInputChange}
                className={`rounded-lg border-gray-300 ${errors.companyName ? 'border-red-500' : ''}`}
              />
              {errors.companyName && (
                <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
              )}
            </div>

            {/* Contact Person */}
            <div className="space-y-1">
              <Label htmlFor="contactPerson" className="text-sm font-medium">
                담당자명 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactPerson"
                name="contactPerson"
                placeholder="담당자명을 입력해주세요"
                value={formData.contactPerson}
                onChange={handleInputChange}
                className={`rounded-lg border-gray-300 ${errors.contactPerson ? 'border-red-500' : ''}`}
              />
              {errors.contactPerson && (
                <p className="text-red-500 text-xs mt-1">{errors.contactPerson}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                연락처 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="010-0000-0000"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`rounded-lg border-gray-300 ${errors.phoneNumber ? 'border-red-500' : ''}`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium">
                이메일 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@company.com"
                value={formData.email}
                onChange={handleInputChange}
                className={`rounded-lg border-gray-300 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Service Type */}
            <div className="space-y-1">
              <Label htmlFor="service" className="text-sm font-medium">
                관심 서비스
              </Label>
              <Select value={formData.service} onValueChange={(value) => handleSelectChange("service", value)}>
                <SelectTrigger className={`rounded-lg border-gray-300 ${errors.service ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="서비스를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cafeteria">구내식당</SelectItem>
                  <SelectItem value="snack">간식</SelectItem>
                  <SelectItem value="breakfast">조식</SelectItem>
                  <SelectItem value="cafe">사내카페</SelectItem>
                  <SelectItem value="catering">케이터링</SelectItem>
                </SelectContent>
              </Select>
              {errors.service && (
                <p className="text-red-500 text-xs mt-1">{errors.service}</p>
              )}
            </div>

            {/* Region */}
            <div className="space-y-1">
              <Label htmlFor="region" className="text-sm font-medium">
                지역 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="region"
                name="region"
                placeholder="서울, 경기 등"
                value={formData.region}
                onChange={handleInputChange}
                className={`rounded-lg border-gray-300 ${errors.region ? 'border-red-500' : ''}`}
              />
              {errors.region && (
                <p className="text-red-500 text-xs mt-1">{errors.region}</p>
              )}
            </div>

            {/* Estimated Meals */}
            <div className="space-y-1">
              <Label htmlFor="estimatedMeals" className="text-sm font-medium">
                예상 인원 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="estimatedMeals"
                name="estimatedMeals"
                placeholder="예: 50명"
                value={formData.estimatedMeals}
                onChange={handleInputChange}
                className={`rounded-lg border-gray-300 ${errors.estimatedMeals ? 'border-red-500' : ''}`}
              />
              {errors.estimatedMeals && (
                <p className="text-red-500 text-xs mt-1">{errors.estimatedMeals}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1">
              <Label htmlFor="message" className="text-sm font-medium">
                특별한 요청사항
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="특별한 요청사항이 있으시면 입력해주세요"
                value={formData.message}
                onChange={handleInputChange}
                className="rounded-lg border-gray-300 resize-none"
                rows={3}
              />
            </div>

            {/* Agreements Section */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allAgree"
                  checked={agreements.allAgree}
                  onCheckedChange={(checked) => handleAgreementChange("allAgree", checked as boolean)}
                />
                <Label htmlFor="allAgree" className="text-sm font-medium cursor-pointer">
                  전체 동의
                </Label>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-2" value={accordionValue} onValueChange={handleAccordionValueChange}>
                <AccordionItem value="personal-info" className="border border-gray-200 rounded-lg px-3">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center space-x-2 text-left flex-nowrap">
                      <Checkbox
                        id="personalInfoCollection"
                        checked={agreements.personalInfoCollection}
                        onCheckedChange={(checked) => handleAgreementChange("personalInfoCollection", checked as boolean)}
                        onClick={handleCheckboxClick}
                        className="flex-shrink-0"
                      />
                      <Label htmlFor="personalInfoCollection" className="text-xs text-gray-600 cursor-pointer whitespace-nowrap">
                        개인정보 수집 및 이용 동의 <span className="text-red-500">*</span>
                      </Label>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-gray-600 bg-gray-50 p-3 rounded max-h-64 overflow-y-auto">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs mb-2">CJ프레시웨이㈜는 이동급식 서비스 상담을 위해 아래 목적 범위 내로 고객님의 개인정보를 처리합니다.</p>
                        <p className="text-xs mb-2">수집한 개인정보는 목적 이외의 용도로 처리하지 않으며, 처리 목적을 변경할 경우 고객님께 안내하고 동의를 받을 예정입니다.</p>
                      </div>
                      <div>
                        <p className="font-semibold text-xs mb-1">◼ 수집·이용 항목</p>
                        <p className="text-xs">성명, 휴대폰번호, 이메일주소, 기업명, 주소, 예상 식수</p>
                      </div>
                      <div>
                        <p className="font-semibold text-xs mb-1">◼ 목적</p>
                        <p className="text-xs">이동급식 서비스 상담 및 진행</p>
                      </div>
                      <div>
                        <p className="font-semibold text-xs mb-1">◼ 보유·이용 기간</p>
                        <p className="text-xs">서비스 상담 신청 후 3년</p>
                      </div>
                      <div>
                        <p className="font-semibold text-xs mb-1">◼ 근거</p>
                        <p className="text-xs">개인정보 보호법 제15조 제1항 제4호에 따른 서비스 이행</p>
                      </div>
                      <div className="border-t pt-2">
                        <p className="text-xs">개인정보를 기입하지 않으실 수 있으나, 기재하지 않으실 경우 이동급식 서비스 상담 진행이 어렵습니다.</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="marketing" className="border border-gray-200 rounded-lg px-3">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center space-x-2 text-left flex-nowrap">
                      <Checkbox
                        id="marketingConsent"
                        checked={agreements.marketingConsent}
                        onCheckedChange={(checked) => handleAgreementChange("marketingConsent", checked as boolean)}
                        onClick={handleCheckboxClick}
                        className="flex-shrink-0"
                      />
                      <Label htmlFor="marketingConsent" className="text-xs text-gray-600 cursor-pointer whitespace-nowrap">
                        마케팅 정보 수신 동의 (선택)
                      </Label>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-gray-600 bg-gray-50 p-3 rounded max-h-64 overflow-y-auto">
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-xs mb-1">◼ 수집·이용 항목</p>
                        <p className="text-xs">성명, 휴대폰번호, 이메일, 기업명</p>
                      </div>
                      <div>
                        <p className="font-semibold text-xs mb-1">◼ 목적</p>
                        <p className="text-xs">서비스 홍보 등 마케팅</p>
                      </div>
                      <div>
                        <p className="font-semibold text-xs mb-1">◼ 보유·이용 기간</p>
                        <p className="text-xs">수집·이용 동의 후 3년</p>
                      </div>
                      <div className="border-t pt-2">
                        <p className="text-xs mb-2">개인정보 수집 및 이용 동의를 거부할 수 있습니다.</p>
                        <p className="text-xs">동의 거부 시 마케팅 서비스 이용이 어렵으나, 상담에는 지장이 없습니다.</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ad" className="border border-gray-200 rounded-lg px-3">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center space-x-2 text-left flex-nowrap">
                      <Checkbox
                        id="adConsent"
                        checked={agreements.adConsent}
                        onCheckedChange={(checked) => handleAgreementChange("adConsent", checked as boolean)}
                        onClick={handleCheckboxClick}
                        className="flex-shrink-0"
                      />
                      <Label htmlFor="adConsent" className="text-xs text-gray-600 cursor-pointer whitespace-nowrap">
                        광고성 정보 수신 동의 (선택)
                      </Label>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-gray-600 bg-gray-50 p-3 rounded max-h-64 overflow-y-auto">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs mb-3">CJ프레시웨이㈜는 마케팅 목적의 개인정보 수집 및 이용에 동의한 고객님의 개인정보를 이용하여 다양한 전자 전송 매체를 통해 광고성 정보를 전송할 수 있습니다.</p>
                      </div>
                      <div>
                        <p className="font-semibold text-xs mb-2">수신 매체 선택:</p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="sms-consent" 
                              checked={adMediaConsents.sms}
                              onCheckedChange={(checked) => setAdMediaConsents({...adMediaConsents, sms: checked as boolean})}
                            />
                            <Label htmlFor="sms-consent" className="text-xs cursor-pointer">SMS(문자)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="email-consent" 
                              checked={adMediaConsents.email}
                              onCheckedChange={(checked) => setAdMediaConsents({...adMediaConsents, email: checked as boolean})}
                            />
                            <Label htmlFor="email-consent" className="text-xs cursor-pointer">이메일</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="kakao-consent" 
                              checked={adMediaConsents.kakao}
                              onCheckedChange={(checked) => setAdMediaConsents({...adMediaConsents, kakao: checked as boolean})}
                            />
                            <Label htmlFor="kakao-consent" className="text-xs cursor-pointer">카카오톡</Label>
                          </div>
                        </div>
                      </div>
                      <div className="border-t pt-2">
                        <p className="text-xs font-semibold">고객센터 : 02-2149-6114</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#005B44] hover:bg-[#004a37] text-white font-semibold py-3 rounded-lg mt-6"
            >
              {isSubmitting ? "처리 중..." : "상담 신청하기"}
            </Button>
          </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
