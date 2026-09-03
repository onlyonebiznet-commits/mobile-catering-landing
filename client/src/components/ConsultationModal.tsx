import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X, ChevronDown as ChevronDownIcon } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { useGTMTracking } from "@/hooks/useGTM";
import { trackConsultationFormView, trackConsultationSubmit } from "@/utils/ga4-events";
import SuccessModal from "./SuccessModal";

interface ConsultationModalProps {
  onClose: () => void;
  isOpen?: boolean;
}

const SERVICE_OPTIONS = [
  { value: "cafeteria", label: "구내식당" },
  { value: "snack", label: "간식" },
  { value: "breakfast", label: "조식" },
  { value: "cafe", label: "사내카페" },
  { value: "catering", label: "케이터링" },
] as const;

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
    serviceTypes: [] as string[],
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

  const handleServiceToggle = (service: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      serviceTypes: checked
        ? Array.from(new Set([...prev.serviceTypes, service]))
        : prev.serviceTypes.filter((type) => type !== service),
    }));
    clearError("service");
  };

  const handleAgreementChange = (key: string, value: boolean) => {
    if (key === "allAgree") {
      // 전체 동의 체크 시 아코디언 상태는 변경하지 않음 (체크박스와 아코디언 상태 완전 분리)
      setAgreements({
        allAgree: value,
        personalInfoCollection: value,
        marketingConsent: value,
        adConsent: value,
      });
      // 전체 동의 체크 시 하위 항목도 모두 체크
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
      // 아코디언 상태는 변경하지 않음 (사용자의 명시적 클릭에만 반응)
    } else if (key === "adConsent") {
      // 광고성 정보 수신 동의 체크 시 하위 항목 모두 자동 체크
      // 아코디언 상태는 변경하지 않음
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
      // 아코디언 상태는 변경하지 않음 (사용자의 명시적 클릭에만 반응)
    } else {
      // 개별 항목 체크 시 아코디언 상태는 변경하지 않음
      const newAgreements = {
        ...agreements,
        [key]: value,
      };
      setAgreements(newAgreements);
      // Update allAgree if all are checked
      const allChecked = newAgreements.personalInfoCollection && newAgreements.marketingConsent && newAgreements.adConsent;
      newAgreements.allAgree = allChecked;
      setAgreements(newAgreements);
      // 아코디언 상태는 변경하지 않음 (사용자의 명시적 클릭에만 반응)
    }
  };

  const handleAccordionValueChange = (value: string) => {
    // 아코디언은 사용자의 명시적 클릭(화살표)에만 반응
    // 체크박스 클릭 시에는 아코디언이 펼쳐지지 않음
    setAccordionValue(value);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    // 체크박스 클릭 시 이벤트 전파 중지
    e.stopPropagation();
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
          serviceType: formData.serviceTypes.join(",") || null,
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
        service_type: formData.serviceTypes.join(",") || "not_selected",
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
        <div className="bg-[#007651] px-6 py-6 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 hover:bg-[#008F69] rounded-md transition-colors"
            aria-label="Close"
          >
            <X aria-hidden="true" strokeWidth={1.5} className="system-icon system-icon-sm text-white" />
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
            <div className="space-y-1.5">
              <Label htmlFor="companyName" className="form-field-label">
                회사명 <span className="text-status-error" aria-hidden="true">*</span>
              </Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="예: 프레시 테크"
                value={formData.companyName}
                onChange={handleInputChange}
                aria-required="true"
                aria-invalid={Boolean(errors.companyName)}
                aria-describedby={errors.companyName ? "companyName-error" : undefined}
                data-validation-state={errors.companyName ? "error" : undefined}
              />
              {errors.companyName && (
                <p id="companyName-error" role="alert" className="form-field-error">{errors.companyName}</p>
              )}
            </div>

            {/* Contact Person */}
            <div className="space-y-1.5">
              <Label htmlFor="contactPerson" className="form-field-label">
                담당자명 <span className="text-status-error" aria-hidden="true">*</span>
              </Label>
              <Input
                id="contactPerson"
                name="contactPerson"
                placeholder="담당자명을 입력해주세요"
                value={formData.contactPerson}
                onChange={handleInputChange}
                aria-required="true"
                aria-invalid={Boolean(errors.contactPerson)}
                aria-describedby={errors.contactPerson ? "contactPerson-error" : undefined}
                data-validation-state={errors.contactPerson ? "error" : undefined}
              />
              {errors.contactPerson && (
                <p id="contactPerson-error" role="alert" className="form-field-error">{errors.contactPerson}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <Label htmlFor="phoneNumber" className="form-field-label">
                연락처 <span className="text-status-error" aria-hidden="true">*</span>
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="010-0000-0000"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                aria-required="true"
                aria-invalid={Boolean(errors.phoneNumber)}
                aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
                data-validation-state={errors.phoneNumber ? "error" : undefined}
              />
              {errors.phoneNumber && (
                <p id="phoneNumber-error" role="alert" className="form-field-error">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="form-field-label">
                이메일 <span className="text-status-error" aria-hidden="true">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@company.com"
                value={formData.email}
                onChange={handleInputChange}
                aria-required="true"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                data-validation-state={errors.email ? "error" : undefined}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="form-field-error">{errors.email}</p>
              )}
            </div>

            {/* Service Type */}
            <fieldset className="space-y-1.5">
              <legend id="service-label" className="form-field-label">관심 서비스</legend>
              <div
                role="group"
                aria-labelledby="service-label"
                className="grid grid-cols-2 gap-2 rounded-md border border-gray-200 p-3"
              >
                {SERVICE_OPTIONS.map(({ value, label }) => {
                  const checkboxId = `service-${value}`;
                  return (
                    <div key={value} className="flex items-center gap-2 rounded-md px-2 py-2 transition-colors hover:bg-gray-50">
                      <Checkbox
                        id={checkboxId}
                        appearance="radio"
                        checked={formData.serviceTypes.includes(value)}
                        onCheckedChange={(checked) => handleServiceToggle(value, checked === true)}
                        aria-describedby={errors.service ? "service-error" : undefined}
                      />
                      <Label htmlFor={checkboxId} className="form-checkbox-label cursor-pointer">
                        {label}
                      </Label>
                    </div>
                  );
                })}
              </div>
              {errors.service && (
                <p id="service-error" role="alert" className="form-field-error">{errors.service}</p>
              )}
            </fieldset>

            {/* Region */}
            <div className="space-y-1.5">
              <Label htmlFor="region" className="form-field-label">
                지역 <span className="text-status-error" aria-hidden="true">*</span>
              </Label>
              <Input
                id="region"
                name="region"
                placeholder="서울, 경기 등"
                value={formData.region}
                onChange={handleInputChange}
                aria-required="true"
                aria-invalid={Boolean(errors.region)}
                aria-describedby={errors.region ? "region-error" : undefined}
                data-validation-state={errors.region ? "error" : undefined}
              />
              {errors.region && (
                <p id="region-error" role="alert" className="form-field-error">{errors.region}</p>
              )}
            </div>

            {/* Estimated Meals */}
            <div className="space-y-1.5">
              <Label htmlFor="estimatedMeals" className="form-field-label">
                예상 인원 <span className="text-status-error" aria-hidden="true">*</span>
              </Label>
              <Input
                id="estimatedMeals"
                name="estimatedMeals"
                placeholder="예: 50명"
                value={formData.estimatedMeals}
                onChange={handleInputChange}
                aria-required="true"
                aria-invalid={Boolean(errors.estimatedMeals)}
                aria-describedby={errors.estimatedMeals ? "estimatedMeals-error" : undefined}
                data-validation-state={errors.estimatedMeals ? "error" : undefined}
              />
              {errors.estimatedMeals && (
                <p id="estimatedMeals-error" role="alert" className="form-field-error">{errors.estimatedMeals}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <Label htmlFor="message" className="form-field-label">
                요청사항
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="요청사항을 입력해주세요"
                value={formData.message}
                onChange={handleInputChange}
                aria-describedby={undefined}
                className="form-field-control--textarea form-field-control--textarea-large"
                rows={12}
              />
            </div>

            {/* Agreements Section */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allAgree"
                  appearance="radio"
                  checked={agreements.allAgree}
                  onCheckedChange={(checked) => handleAgreementChange("allAgree", checked as boolean)}
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                />
                <Label
                  htmlFor="allAgree"
                  className="form-checkbox-label font-medium cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  전체 동의
                </Label>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-2" value={accordionValue} onValueChange={handleAccordionValueChange}>
                <AccordionItem value="personal-info" className="border border-gray-200 rounded-lg px-3">
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-2 text-left flex-nowrap">
                      <Checkbox
                        id="personalInfoCollection"
                        appearance="radio"
                        checked={agreements.personalInfoCollection}
                        onCheckedChange={(checked) => handleAgreementChange("personalInfoCollection", checked as boolean)}
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="flex-shrink-0"
                      />
                      <Label
                        htmlFor="personalInfoCollection"
                        className="form-checkbox-label text-gray-600 cursor-pointer whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        개인정보 수집 및 이용 동의 <span className="text-status-error">*</span>
                      </Label>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAccordionValue(accordionValue === "personal-info" ? "" : "personal-info")}
                      className="flex-shrink-0 hover:bg-gray-100 p-1 rounded transition-colors"
                      aria-label="Toggle personal info section"
                    >
                      <ChevronDownIcon strokeWidth={1.5} aria-hidden="true" className={`system-icon system-icon-xs transition-transform duration-200 ${
                        accordionValue === "personal-info" ? "rotate-180" : ""
                      }`} />
                    </button>
                  </div>
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
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-2 text-left flex-nowrap">
                      <Checkbox
                        id="marketingConsent"
                        appearance="radio"
                        checked={agreements.marketingConsent}
                        onCheckedChange={(checked) => handleAgreementChange("marketingConsent", checked as boolean)}
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="flex-shrink-0"
                      />
                      <Label
                        htmlFor="marketingConsent"
                        className="form-checkbox-label text-gray-600 cursor-pointer whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        마케팅 정보 수신 동의 (선택)
                      </Label>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAccordionValue(accordionValue === "marketing" ? "" : "marketing")}
                      className="flex-shrink-0 hover:bg-gray-100 p-1 rounded transition-colors"
                      aria-label="Toggle marketing section"
                    >
                      <ChevronDownIcon strokeWidth={1.5} aria-hidden="true" className={`system-icon system-icon-xs transition-transform duration-200 ${
                        accordionValue === "marketing" ? "rotate-180" : ""
                      }`} />
                    </button>
                  </div>
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
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-2 text-left flex-nowrap">
                      <Checkbox
                        id="adConsent"
                        appearance="radio"
                        checked={agreements.adConsent}
                        onCheckedChange={(checked) => {
                          handleAgreementChange("adConsent", checked as boolean);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="flex-shrink-0"
                      />
                      <Label
                        htmlFor="adConsent"
                        className="form-checkbox-label text-gray-600 cursor-pointer whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        광고성 정보 수신 동의 (선택)
                      </Label>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAccordionValue(accordionValue === "ad" ? "" : "ad")}
                      className="flex-shrink-0 hover:bg-gray-100 p-1 rounded transition-colors"
                      aria-label="Toggle advertising section"
                    >
                      <ChevronDownIcon strokeWidth={1.5} aria-hidden="true" className={`system-icon system-icon-xs transition-transform duration-200 ${
                        accordionValue === "ad" ? "rotate-180" : ""
                      }`} />
                    </button>
                  </div>
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
                            appearance="radio"
                            checked={adMediaConsents.sms}
                              onCheckedChange={(checked) => {
                                const newState = {...adMediaConsents, sms: checked as boolean};
                                setAdMediaConsents(newState);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              onPointerDown={(e) => e.stopPropagation()}
                            />
                            <Label
                              htmlFor="sms-consent"
                              className="form-checkbox-label cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                              onPointerDown={(e) => e.stopPropagation()}
                            >
                              SMS(문자)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                            id="email-consent"
                            appearance="radio"
                            checked={adMediaConsents.email}
                              onCheckedChange={(checked) => {
                                const newState = {...adMediaConsents, email: checked as boolean};
                                setAdMediaConsents(newState);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              onPointerDown={(e) => e.stopPropagation()}
                            />
                            <Label
                              htmlFor="email-consent"
                              className="form-checkbox-label cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                              onPointerDown={(e) => e.stopPropagation()}
                            >
                              이메일
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                            id="kakao-consent"
                            appearance="radio"
                            checked={adMediaConsents.kakao}
                              onCheckedChange={(checked) => {
                                const newState = {...adMediaConsents, kakao: checked as boolean};
                                setAdMediaConsents(newState);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              onPointerDown={(e) => e.stopPropagation()}
                            />
                            <Label
                              htmlFor="kakao-consent"
                              className="form-checkbox-label cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                              onPointerDown={(e) => e.stopPropagation()}
                            >
                              카카오톡
                            </Label>
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
              className="w-full bg-[#007651] hover:bg-[#008F69] text-white font-semibold py-3 rounded-lg mt-6"
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
