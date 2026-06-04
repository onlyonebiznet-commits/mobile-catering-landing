import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { useGTMTracking } from "@/hooks/useGTM";
import { trackMaterialRequestFormView, trackMaterialRequestSubmit } from "@/utils/ga4-events";
import SuccessModal from "./SuccessModal";

interface MaterialRequestModalProps {
  onClose: () => void;
}

export default function MaterialRequestModal({ onClose }: MaterialRequestModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();
  const { trackFormSubmit } = useGTMTracking();
  const [hasTrackedFormView, setHasTrackedFormView] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    managerName: "",
    phone: "",
    email: "",
  });

  const [agreements, setAgreements] = useState({
    allAgree: false,
    personalInfoCollection: false,
    marketingConsent: false,
    adConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionCountdown, setCompletionCountdown] = useState(5);

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
      trackMaterialRequestFormView();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const resetForm = () => {
    setFormData({
      companyName: "",
      managerName: "",
      phone: "",
      email: "",
    });
    setAgreements({
      allAgree: false,
      personalInfoCollection: false,
      marketingConsent: false,
      adConsent: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.companyName.trim()) {
      toast.error("회사명을 입력해주세요");
      return;
    }
    if (!formData.managerName.trim()) {
      toast.error("담당자를 입력해주세요");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("연락처를 입력해주세요");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("이메일을 입력해주세요");
      return;
    }

    if (!agreements.personalInfoCollection) {
      toast.error("개인정보 수집에 동의해주세요");
      return;
    }

    setIsSubmitting(true);
    try {
      // 실제 API 호출
      const response = await fetch("/api/material-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          manager: formData.managerName,
          phone: formData.phone,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API 요청 실패");
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || "자료 신청 처리 실패");
      }

      // API 성공 후에만 GTM 이벤트 추적
      trackFormSubmit("material_request", {
        company_name: formData.companyName,
        manager: formData.managerName,
        form_type: "material_request",
      });

      // GA4 이벤트: 자료 신청 완료 (API 성공 후에만 발생)
      trackMaterialRequestSubmit(true);
      
      // 폼 초기화
      resetForm();
      
      // 완료 화면 표시
      setIsCompleted(true);
      setCompletionCountdown(5);
    } catch (error) {
      console.error("Material request error:", error);
      // GA4 이벤트: 자료 신청 실패
      trackMaterialRequestSubmit(false);
      toast.error(error instanceof Error ? error.message : "자료 신청 중 오류가 발생했습니다");
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
        {/* Accessible Dialog Title (hidden visually) */}
        <DialogTitle className="sr-only">자료 신청</DialogTitle>

        {/* Header */}
        <div className="bg-[#005B44] px-6 py-6 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 hover:bg-[#004a37] rounded-md transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-xl font-bold text-white pr-8">자료 신청</h2>
          <p className="text-sm text-green-100 mt-2">서비스 소개자료와 맞춤형 운영 정보를 받아보세요.</p>
        </div>

        {/* Completion Screen */}
        {isCompleted ? (
          <SuccessModal
            title="자료 신청이 완료 되었습니다!"
            message="감사합니다.\n빠른 시일 내에 연락드리겠습니다."
            countdown={completionCountdown}
            onClose={() => {
              onClose();
              navigate("/");
            }}
          />
        ) : (
          /* Form Content */
          <div className="px-6 py-6 overflow-y-auto" style={{ maxHeight: 'calc(75vh - 140px)' }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium">
                  회사명 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="회사명을 입력해주세요"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="rounded-lg border-gray-300"
                />
              </div>

              {/* Manager */}
              <div className="space-y-2">
                <Label htmlFor="manager" className="text-sm font-medium">
                  담당자명 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="managerName"
                  name="managerName"
                  placeholder="담당자명을 입력해주세요"
                  value={formData.managerName}
                  onChange={handleChange}
                  className="rounded-lg border-gray-300"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  연락처 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="rounded-lg border-gray-300"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  이메일 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-lg border-gray-300"
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
                    <AccordionContent className="text-xs text-gray-600 pb-3 pt-2 border-t space-y-3">
                      <div className="space-y-2">
                        <p>CJ프레시웨이㈜는 이동급식 서비스 상담를 위해 아래 목적 범위 내로 고객님의 개인정보를 처리합니다. 수집한 개인정보는 목적 이외의 용도로 처리하지 않으며, 처리 목적을 변경할 경우 고객님께 안내하고 동의를 받을 예정입니다.</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>수집·이용 항목: 성명, 휴대폰번호, 이메일주소, 기업명, 주소, 예상 식수</li>
                          <li>목적: 이동급식 서비스 상담 및 진행</li>
                          <li>보유·이용 기간: 서비스 상담 신청 후 3년</li>
                          <li>근거: 개인정보 보호법 제15조 제1항 제4호에 따른 서비스 이행</li>
                        </ul>
                        <p className="text-gray-500 text-xs">개인정보를 기입하지 않으실 수 있으나, 기재하지 않으실 경우 이동급식 서비스 상담 진행이 어렵습니다.</p>
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
                          onClick={(e) => e.stopPropagation()}
                          className="flex-shrink-0"
                        />
                        <Label htmlFor="marketingConsent" className="text-xs text-gray-600 cursor-pointer whitespace-nowrap">
                          마케팅 목적 이용 동의
                        </Label>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-gray-600 pb-3 pt-2 border-t space-y-3">
                      <div className="space-y-2">
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>수집·이용 항목: 성명, 휴대폰번호, 이메일, 기업명</li>
                          <li>목적: 서비스 홍보 등 마케팅</li>
                          <li>보유·이용 기간: 수집·이용 동의 후 3년</li>
                        </ul>
                        <p className="text-gray-500 text-xs">개인정보 수집 및 이용 동의를 거부할 수 있습니다. 동의 거부 시 마케팅 서비스 이용이 어려우나, 상담에는 지장이 없습니다.</p>
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
                          onClick={(e) => e.stopPropagation()}
                          className="flex-shrink-0"
                        />
                        <Label htmlFor="adConsent" className="text-xs text-gray-600 cursor-pointer whitespace-nowrap">
                          광고성 정보 수신 동의
                        </Label>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-gray-600 pb-3 pt-2 border-t space-y-3">
                      <div className="space-y-2">
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>수집·이용 항목: 성명, 휴대폰번호, 이메일, 기업명</li>
                          <li>목적: 신상품 정보, 이벤트 등 광고성 정보 전송</li>
                          <li>보유·이용 기간: 수집·이용 동의 후 3년</li>
                        </ul>
                        <p className="text-gray-500 text-xs">광고성 정보 수신 동의를 거부할 수 있습니다. 동의 거부 시 광고성 정보 수신이 중단되나, 상담에는 지장이 없습니다.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#005B44] hover:bg-[#004a37] text-white py-2 rounded-lg font-medium transition-colors mt-6"
              >
                {isSubmitting ? "신청 중..." : "자료 신청하기"}
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
