import { useState, useEffect } from "react";
import { MousePointer2, X } from "lucide-react";

export default function FloatingActionButtons() {
  const [showRecommendationHint, setShowRecommendationHint] = useState(false);

  // Scroll to chatbot
  const scrollToChatbot = () => {
    const chatbotElement = document.querySelector("[data-chatbot-trigger]");
    if (chatbotElement) {
      chatbotElement.scrollIntoView({ behavior: "smooth" });
      // Trigger chatbot open
      (chatbotElement as HTMLElement).click();
    }
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("freshmeal-recommendation-hint-seen")) return;
    const timer = window.setTimeout(() => setShowRecommendationHint(true), 3500);
    return () => window.clearTimeout(timer);
  }, []);

  const dismissRecommendationHint = () => {
    setShowRecommendationHint(false);
    window.sessionStorage.setItem("freshmeal-recommendation-hint-seen", "true");
  };

  return (
    <>
      {/* Recommendation simulation CTA */}
      <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
        {showRecommendationHint && (
          <div className="absolute bottom-[calc(100%+12px)] right-0 w-[244px] rounded-[10px] border border-[#007651]/15 bg-white p-4 pr-10 text-left shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300 after:absolute after:bottom-[-7px] after:right-8 after:h-3 after:w-3 after:rotate-45 after:border-b after:border-r after:border-[#007651]/15 after:bg-white">
            <p className="text-sm font-semibold leading-5 text-gray-900">우리 현장에 맞는 서비스를</p>
            <p className="text-sm leading-5 text-gray-700">30초 만에 추천받아보세요</p>
            <button
              type="button"
              onClick={dismissRecommendationHint}
              className="absolute right-2 top-2 rounded-[10px] p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              aria-label="추천 안내 닫기"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
        <div className="relative">
          <span className="cta-cursor pointer-events-none absolute -bottom-3 -right-3 z-10 text-[#007651]" aria-hidden="true">
            <MousePointer2 className="h-7 w-7 fill-white" strokeWidth={2} />
          </span>
        <div className="cta-float flex min-h-14 w-[244px] items-center overflow-hidden rounded-[10px] bg-[#007651] shadow-lg transition-all duration-200 hover:bg-[#008F69]">
          <button
            type="button"
            onClick={scrollToChatbot}
            className="relative flex min-h-14 w-full items-center justify-center overflow-hidden text-white transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008F69] focus-visible:ring-inset active:scale-[0.97]"
            aria-label="우리 현장 맞춤 추천받기"
          >
            <span className="whitespace-nowrap text-sm font-semibold sm:text-base">우리 현장 맞춤 추천받기</span>
          </button>
        </div>
        </div>
      </div>
    </>
  );
}
