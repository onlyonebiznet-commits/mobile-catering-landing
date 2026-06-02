import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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

interface ConsultationModalProps {
  onClose: () => void;
}

export default function ConsultationModal({ onClose }: ConsultationModalProps) {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Add slight delay to avoid closing immediately on open
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Track form view on mount
  useEffect(() => {
    if (!hasTrackedFormView) {
      trackConsultationFormView();
      setHasTrackedFormView(true);
    }
  }, [hasTrackedFormView]);

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
      toast.success("상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.");
      onClose();
      // 감사 페이지로 리다이렉트
      setTimeout(() => navigate("/thank-you"), 500);
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent 
        ref={contentRef}
        className="w-[calc(100vw-32px)] md:w-auto md:max-w-[600px] p-0 gap-0 rounded-lg overflow-hidden bg-white"
        style={{
          maxHeight: 'min(75vh, calc(100vh - 120px))',
          width: 'calc(100vw - 32px)',
          maxWidth: '600px'
        }}
        onMouseDown={(e) => e.stopPropagation()}
        showCloseButton={false}
      >
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

        {/* Form Content */}
        <div className="px-6 py-6 overflow-y-auto" style={{ maxHeight: 'calc(75vh - 140px)' }}>
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
                추가 요청사항
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

            {/* Agreements */}
            <div className="space-y-3 border-t pt-4">
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

              <Accordion type="single" collapsible className="w-full space-y-2">
                <AccordionItem value="personal-info" className="border border-gray-200 rounded-lg px-3">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center space-x-2 text-left flex-nowrap">
                      <Checkbox
                        id="personalInfoCollection"
                        checked={agreements.personalInfoCollection}
                        onCheckedChange={(checked) => handleAgreementChange("personalInfoCollection", checked as boolean)}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0"
                      />
                      <Label htmlFor="personalInfoCollection" className="text-xs text-gray-600 cursor-pointer whitespace-nowrap">
                        개인정보 수집 및 이용 동의 <span className="text-red-500">*</span>
                      </Label>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
                    <p className="mb-2">프레시밀온은 다음과 같이 개인정보를 수집 및 이용합니다:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>수집항목: 회사명, 담당자명, 연락처, 이메일, 지역, 예상 인원</li>
                      <li>수집목적: 상담 신청 처리 및 서비스 제공</li>
                      <li>보유기간: 상담 완료 후 1년</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="marketing" className="border border-gray-200 rounded-lg px-3">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center space-x-2 text-left flex-nowrap">
                      <Checkbox
                        id="marketingConsent"
                        checked={agreements.marketingConsent}
                        onCheckedChange={(checked) => handleAgreementChange("marketingConsent", checked as boolean)}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0"
                      />
                      <Label htmlFor="marketingConsent" className="text-xs text-gray-600 cursor-pointer whitespace-nowrap">
                        마케팅 정보 수신 동의 (선택)
                      </Label>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
                    <p>프레시밀온의 최신 소식, 이벤트, 프로모션 정보를 이메일로 받으실 수 있습니다.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ad" className="border border-gray-200 rounded-lg px-3">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center space-x-2 text-left flex-nowrap">
                      <Checkbox
                        id="adConsent"
                        checked={agreements.adConsent}
                        onCheckedChange={(checked) => handleAgreementChange("adConsent", checked as boolean)}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0"
                      />
                      <Label htmlFor="adConsent" className="text-xs text-gray-600 cursor-pointer whitespace-nowrap">
                        광고성 정보 수신 동의 (선택)
                      </Label>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
                    <p>프레시밀온의 신상품, 할인 정보 등 광고성 정보를 이메일로 받으실 수 있습니다.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#005B44] hover:bg-[#004a37] text-white py-2 rounded-lg font-medium transition-colors"
            >
              {isSubmitting ? "신청 중..." : "상담 신청하기"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
