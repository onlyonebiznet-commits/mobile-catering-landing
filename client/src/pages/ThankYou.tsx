import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ThankYou() {
  const [, navigate] = useLocation();
  const goHome = () => navigate("/");

  useEffect(() => {
    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => {
      goHome();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            상담 신청이 완료되었습니다!
          </h1>
          <p className="text-lg text-muted-foreground">
            감사합니다. 빠른 시간 내에 연락드리겠습니다.
          </p>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl p-8 border border-border space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              입력하신 연락처로 프레시밀온 담당자가 연락을 드릴 예정입니다.
            </p>
            <p className="text-sm text-muted-foreground">
              평일 9시~18시 사이에 연락드리며, 긴급한 경우 1234-5678로 바로 연락주시기 바랍니다.
            </p>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              상담 신청 내용은 이메일로도 전송되었습니다.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button
            onClick={goHome}
            className="w-full bg-primary hover:bg-primary/90 text-white"
            size="lg"
          >
            홈으로 돌아가기 <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-xs text-muted-foreground">
            5초 후 자동으로 홈으로 이동합니다
          </p>
        </div>
      </div>
    </div>
  );
}
