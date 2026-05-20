import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { useLocation } from "wouter";

interface MaterialRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MaterialRequestModal({ open, onOpenChange }: MaterialRequestModalProps) {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    companyName: "",
    manager: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      setLocation("/thank-you");
      setFormData({
        companyName: "",
        manager: "",
        phone: "",
        email: "",
      });
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">자료 신청</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-semibold">
              회사명 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="companyName"
              name="companyName"
              placeholder="회사명을 입력해주세요"
              value={formData.companyName}
              onChange={handleChange}
              className="border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="manager" className="text-sm font-semibold">
              담당자 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="manager"
              name="manager"
              placeholder="담당자명을 입력해주세요"
              value={formData.manager}
              onChange={handleChange}
              className="border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-semibold">
              연락처 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={handleChange}
              className="border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">
              이메일 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@company.com"
              value={formData.email}
              onChange={handleChange}
              className="border-border"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "신청 중..." : "자료 신청"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
