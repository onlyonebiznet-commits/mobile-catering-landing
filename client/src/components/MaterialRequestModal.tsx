import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

  const [agreements, setAgreements] = useState({
    allAgree: false,
    personalInfoCollection: false,
    marketingConsent: false,
    adConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      toast.error("[필수] 개인정보 수집/이용 동의에 동의해주세요");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/material-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          agreements: {
            personalInfoCollection: agreements.personalInfoCollection,
            marketingConsent: agreements.marketingConsent,
            adConsent: agreements.adConsent,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("요청 처리 중 오류가 발생했습니다");
      }

      setIsSubmitting(false);
      onOpenChange(false);
      setLocation("/thank-you");
      setFormData({
        companyName: "",
        manager: "",
        phone: "",
        email: "",
      });
      setAgreements({
        allAgree: false,
        personalInfoCollection: false,
        marketingConsent: false,
        adConsent: false,
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("요청 처리 중 오류가 발생했습니다");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
              className="border-border"
            />
          </div>

          {/* Personal Information Agreement */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="space-y-3">
              {/* All Agree */}
              <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                <Checkbox
                  id="allAgree"
                  checked={agreements.allAgree}
                  onCheckedChange={(checked) => handleAgreementChange("allAgree", checked as boolean)}
                  disabled={isSubmitting}
                  className="mt-1"
                />
                <Label htmlFor="allAgree" className="text-sm font-semibold cursor-pointer flex-1">
                  모두 동의합니다. (선택항목 포함)
                </Label>
              </div>

              {/* Personal Info Collection */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="personalInfoCollection"
                    checked={agreements.personalInfoCollection}
                    onCheckedChange={(checked) => handleAgreementChange("personalInfoCollection", checked as boolean)}
                    disabled={isSubmitting}
                    className="mt-1"
                  />
                  <Label htmlFor="personalInfoCollection" className="text-sm font-medium cursor-pointer flex-1">
                    <span className="text-destructive">[필수]</span> 개인정보 수집 / 이용 동의서
                  </Label>
                </div>
                <div className="ml-7 text-xs text-muted-foreground space-y-2 bg-white p-3 rounded border border-border">
                  <p className="font-semibold">개인정보 수집·이용 안내</p>
                  <p>CJ프레시웨이㈜는 이동급식 서비스 상담을 위해 아래 목적 범위 내로 고객님의 개인정보를 처리합니다. 수집한 개인정보는 목적 이외의 용도로 처리하지 않으며, 처리 목적을 변경할 경우 고객님께 안내하고 동의를 받을 예정입니다.</p>
                  <div className="space-y-1">
                    <p>◼ 수집·이용 항목: 성명, 휴대폰번호, 이메일주소, 기업명, 주소, 예상 식수</p>
                    <p>◼ 목적: 이동급식 서비스 상담 및 진행</p>
                    <p>◼ 보유·이용 기간: 서비스 상담 신청 후 3년</p>
                    <p>◼ 근거: 개인정보 보호법 제15조 제1항 제4호에 따른 서비스 이행</p>
                  </div>
                  <p>개인정보를 기입하지 않으실 수 있으나, 기재하지 않으실 경우 이동급식 서비스 상담 진행이 어렵습니다.</p>
                </div>
              </div>

              {/* Marketing Consent */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="marketingConsent"
                    checked={agreements.marketingConsent}
                    onCheckedChange={(checked) => handleAgreementChange("marketingConsent", checked as boolean)}
                    disabled={isSubmitting}
                    className="mt-1"
                  />
                  <Label htmlFor="marketingConsent" className="text-sm font-medium cursor-pointer flex-1">
                    마케팅 목적 개인정보 수집 / 이용 동의서
                  </Label>
                </div>
                <div className="ml-7 text-xs text-muted-foreground space-y-2 bg-white p-3 rounded border border-border">
                  <p className="font-semibold">마케팅 목적 개인정보 수집·이용 동의</p>
                  <div className="space-y-1">
                    <p>◼ 수집·이용 항목: 성명, 휴대폰번호, 이메일, 기업명</p>
                    <p>◼ 목적: 서비스 홍보 등 마케팅</p>
                    <p>◼ 보유·이용 기간: 수집·이용 동의 후 3년</p>
                  </div>
                  <p>개인정보 수집 및 이용 동의를 거부할 수 있습니다. 동의 거부 시 마케팅 서비스 이용이 어려우나, 상담에는 지장이 없습니다.</p>
                </div>
              </div>

              {/* Ad Consent */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="adConsent"
                    checked={agreements.adConsent}
                    onCheckedChange={(checked) => handleAgreementChange("adConsent", checked as boolean)}
                    disabled={isSubmitting}
                    className="mt-1"
                  />
                  <Label htmlFor="adConsent" className="text-sm font-medium cursor-pointer flex-1">
                    <span className="text-muted-foreground">[선택]</span> 광고성 정보 수신 동의서
                  </Label>
                </div>
                <div className="ml-7 text-xs text-muted-foreground space-y-2 bg-white p-3 rounded border border-border">
                  <p className="font-semibold">광고성 정보 수신 동의</p>
                  <p>CJ프레시웨이㈜는 '마케팅 목적의 개인정보 수집 및 이용'에 동의한 고객님의 개인정보를 이용하여 다양한 전자 전송 매체를 통해 광고성 정보를 전송할 수 있습니다. 본 동의를 거부하실 수 있으며, 거부 시 광고성 정보를 받으실 수 없으나, 서비스 이용에 지장이 없습니다.</p>
                  <p>광고성 정보 수신 설정 변경은 다음과 같습니다. 고객센터(02-2149-6114)를 통한 광고성 정보 수신 동의 변경 신청</p>
                  <p>☐ SMS(문자) ☐ 이메일 ☐ 카카오톡</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
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
