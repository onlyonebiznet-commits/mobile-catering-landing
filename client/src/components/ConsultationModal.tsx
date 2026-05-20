import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

interface ConsultationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ConsultationModal({ open, onOpenChange }: ConsultationModalProps) {
  const [, navigate] = useLocation();
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

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.companyName || !formData.contactPerson || !formData.phoneNumber || !formData.service) {
      toast.error("필수 항목을 모두 입력해주세요");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to thank you page
      navigate("/thank-you");
      onOpenChange(false);

      // Reset form
      setFormData({
        companyName: "",
        contactPerson: "",
        phoneNumber: "",
        email: "",
        service: "",
        region: "",
        estimatedMeals: "",
        message: "",
      });
    } catch (error) {
      toast.error("상담 신청 중 오류가 발생했습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>온라인 상담 신청</DialogTitle>
          <DialogDescription>
            프레시밀온 서비스에 대해 궁금한 점을 상담받으세요. 빠른 시간 내에 연락드리겠습니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-medium">
              회사명 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="companyName"
              name="companyName"
              placeholder="예: 프레시 테크"
              value={formData.companyName}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="border-border"
            />
          </div>

          {/* Contact Person */}
          <div className="space-y-2">
            <Label htmlFor="contactPerson" className="text-sm font-medium">
              담당자명 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contactPerson"
              name="contactPerson"
              placeholder="예: 김철수"
              value={formData.contactPerson}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="border-border"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm font-medium">
              연락처 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="예: 010-1234-5678"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="border-border"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              이메일
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="예: example@company.com"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="border-border"
            />
          </div>

          {/* Service Interest */}
          <div className="space-y-2">
            <Label htmlFor="service" className="text-sm font-medium">
              관심 서비스 <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.service} onValueChange={(value) => handleSelectChange("service", value)} disabled={isSubmitting}>
              <SelectTrigger className="border-border">
                <SelectValue placeholder="서비스를 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobile-meal">이동급식</SelectItem>
                <SelectItem value="snack-breakfast">간식조식</SelectItem>
                <SelectItem value="office-cafe">사내카페</SelectItem>
                <SelectItem value="catering">케이터링</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Region */}
          <div className="space-y-2">
            <Label htmlFor="region" className="text-sm font-medium">
              희망 지역
            </Label>
            <Input
              id="region"
              name="region"
              placeholder="예: 서울시 강남구"
              value={formData.region}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="border-border"
            />
          </div>

          {/* Estimated Meals */}
          <div className="space-y-2">
            <Label htmlFor="estimatedMeals" className="text-sm font-medium">
              예상 식수
            </Label>
            <Input
              id="estimatedMeals"
              name="estimatedMeals"
              placeholder="예: 100명"
              value={formData.estimatedMeals}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="border-border"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              문의 사항
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="궁금한 점이나 특별한 요청사항을 입력해주세요"
              value={formData.message}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="border-border min-h-[80px] resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "신청 중..." : "상담 신청"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
