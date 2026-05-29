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

interface ConsultationModalProps {
  onClose: () => void;
}

export default function ConsultationModal({ onClose }: ConsultationModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
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
    if (!formData.contactPerson.trim()) {
      toast.error("담당자명을 입력해주세요");
      return;
    }
    if (!formData.phoneNumber.trim()) {
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
      toast.success("상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.");
      onClose();
    } catch (error) {
      toast.error("상담 신청 중 오류가 발생했습니다");
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
          <h2 className="text-xl font-bold text-white pr-8">상담 신청</h2>
          <p className="text-sm text-green-100 mt-2">우리 현장에 맞는 맞춤형 서비스를 제안해드립니다.</p>
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
                placeholder="예: 프레시 테크"
                value={formData.companyName}
                onChange={handleInputChange}
                className="rounded-lg border-gray-300"
              />
            </div>

            {/* Contact Person */}
            <div className="space-y-2">
              <Label htmlFor="contactPerson" className="text-sm font-medium">
                담당자명 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactPerson"
                name="contactPerson"
                placeholder="담당자명을 입력해주세요"
                value={formData.contactPerson}
                onChange={handleInputChange}
                className="rounded-lg border-gray-300"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                연락처 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="010-0000-0000"
                value={formData.phoneNumber}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className="rounded-lg border-gray-300"
              />
            </div>

            {/* Service Type */}
            <div className="space-y-2">
              <Label htmlFor="service" className="text-sm font-medium">
                관심 서비스
              </Label>
              <Select value={formData.service} onValueChange={(value) => handleSelectChange("service", value)}>
                <SelectTrigger className="rounded-lg border-gray-300">
                  <SelectValue placeholder="서비스를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="catering">케이터링</SelectItem>
                  <SelectItem value="meal">도시락</SelectItem>
                  <SelectItem value="buffet">뷔페</SelectItem>
                  <SelectItem value="other">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Region */}
            <div className="space-y-2">
              <Label htmlFor="region" className="text-sm font-medium">
                지역
              </Label>
              <Input
                id="region"
                name="region"
                placeholder="서울, 경기 등"
                value={formData.region}
                onChange={handleInputChange}
                className="rounded-lg border-gray-300"
              />
            </div>

            {/* Estimated Meals */}
            <div className="space-y-2">
              <Label htmlFor="estimatedMeals" className="text-sm font-medium">
                예상 인원
              </Label>
              <Input
                id="estimatedMeals"
                name="estimatedMeals"
                placeholder="예: 50명"
                value={formData.estimatedMeals}
                onChange={handleInputChange}
                className="rounded-lg border-gray-300"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
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
              {isSubmitting ? "신청 중..." : "상담 신청하기"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
