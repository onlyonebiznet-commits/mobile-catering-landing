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
    <div className="px-6 py-12 flex flex-col items-center justify-center text-center" style={{ minHeight: 'calc(75vh - 140px)' }}>
      <div className="mb-8">
        <div className="w-16 h-16 bg-[#005B44] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#005B44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h3 className="text-4xl font-bold text-[#005B44] mb-8 text-center">{title}</h3>
      <div className="mb-8 text-center w-full">
        {messages.map((line, index) => (
          <p key={index} className="text-gray-700 text-base leading-relaxed text-center">
            {line}
          </p>
        ))}
      </div>
      <Button
        onClick={onClose}
        className="w-full bg-[#005B44] hover:bg-[#004a37] text-white py-2 rounded-lg font-medium transition-colors mb-4"
      >
        홈으로 돌아가기
      </Button>
      <p className="text-sm text-gray-500">{countdown}초 후 자동으로 홈으로 이동합니다.</p>
    </div>
  );
}
