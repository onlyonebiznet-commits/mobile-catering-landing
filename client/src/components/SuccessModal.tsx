import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface SuccessModalProps {
  title: string;
  messages: string[];
  onClose: () => void;
  countdown?: number;
  onCountdownEnd?: () => void;
}

export default function SuccessModal({
  title,
  messages,
  onClose,
  countdown = 5,
  onCountdownEnd,
}: SuccessModalProps) {
  return (
    <div className="px-8 md:px-8 py-12 md:py-16 flex flex-col items-center justify-center text-center overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)', minHeight: 'auto' }}>
      <div className="mb-4 md:mb-8 flex-shrink-0">
        <div className="w-12 md:w-16 h-12 md:h-16 bg-[#005B44] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-6">
          <svg className="w-6 md:w-8 h-6 md:h-8 text-[#005B44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl md:text-4xl font-bold text-[#005B44] mb-4 md:mb-8 text-center max-w-sm md:max-w-none leading-snug md:leading-tight break-words">{title}</h3>
      <div className="mb-4 md:mb-8 text-center w-full flex-shrink-0">
        {messages.map((line, index) => (
          <p key={index} className="text-gray-700 text-xs md:text-base leading-relaxed text-center mb-1 md:mb-2">
            {line}
          </p>
        ))}
      </div>
      <Button
        onClick={onClose}
        className="w-full bg-[#005B44] hover:bg-[#004a37] text-white py-3 md:py-3 rounded-lg font-medium transition-colors mb-4 md:mb-6 flex-shrink-0 text-sm md:text-base"
      >
        홈으로 돌아가기
      </Button>
      <p className="text-xs md:text-sm text-gray-500 flex-shrink-0 pb-4">{countdown}초 후 자동으로 홈으로 이동합니다.</p>
    </div>
  );
}
