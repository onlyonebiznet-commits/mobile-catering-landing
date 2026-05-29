import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X } from "lucide-react";
import { toast } from "sonner";

interface MaterialRequestModalProps {
  onClose: () => void;
}

export default function MaterialRequestModal({ onClose }: MaterialRequestModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    manager: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.companyName.trim()) {
      toast.error("회사명을 입력해주세요");
      return;
    }
    if (!formData.manager.trim()) {
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("자료 신청이 완료되었습니다. 이메일로 자료를 보내드리겠습니다.");
      onClose();
    } catch (error) {
      toast.error("자료 신청 중 오류가 발생했습니다");
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
          <h2 className="text-xl font-bold text-white pr-8">자료 신청</h2>
          <p className="text-sm text-green-100 mt-2">서비스 소개자료와 맞춤형 운영 정보를 받아보세요.</p>
        </div>

        {/* Form Content */}
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
                id="manager"
                name="manager"
                placeholder="담당자명을 입력해주세요"
                value={formData.manager}
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
                    <div className="flex items-center space-x-2 text-left">
                      <Checkbox
                        id="personalInfoCollection"
                        checked={agreements.personalInfoCollection}
                        onCheckedChange={(checked) => handleAgreementChange("personalInfoCollection", checked as boolean)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Label htmlFor="personalInfoCollection" className="text-xs text-gray-600 cursor-pointer">
                        개인정보 수집 및 이용 동의 <span className="text-red-500">*</span>
                      </Label>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-gray-500 pb-3 pt-2 border-t">
                    <p>개인정보 수집 및 이용에 대한 상세 내용입니다. 귀사의 개인정보는 상담 목적으로만 사용되며, 관련 법령에 따라 안전하게 보호됩니다.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="marketing" className="border border-gray-200 rounded-lg px-3">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center space-x-2 text-left">
                      <Checkbox
                        id="marketingConsent"
                        checked={agreements.marketingConsent}
                        onCheckedChange={(checked) => handleAgreementChange("marketingConsent", checked as boolean)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Label htmlFor="marketingConsent" className="text-xs text-gray-600 cursor-pointer">
                        마케팅 정보 수신 동의
                      </Label>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-gray-500 pb-3 pt-2 border-t">
                    <p>마케팅 정보 수신에 동의하시면 신제품 소개, 이벤트 정보 등을 받아보실 수 있습니다.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ad" className="border border-gray-200 rounded-lg px-3">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center space-x-2 text-left">
                      <Checkbox
                        id="adConsent"
                        checked={agreements.adConsent}
                        onCheckedChange={(checked) => handleAgreementChange("adConsent", checked as boolean)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Label htmlFor="adConsent" className="text-xs text-gray-600 cursor-pointer">
                        광고성 정보 수신 동의
                      </Label>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-gray-500 pb-3 pt-2 border-t">
                    <p>광고성 정보 수신에 동의하시면 프로모션 및 특별 혜택 정보를 받아보실 수 있습니다.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#005B44] hover:bg-[#004a37] text-white font-medium rounded-lg py-2 mt-6"
            >
              {isSubmitting ? "신청 중..." : "자료 신청하기"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
