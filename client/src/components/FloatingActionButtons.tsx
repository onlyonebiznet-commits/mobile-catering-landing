import { useState, useEffect } from "react";
import { ChevronUp, MessageCircle, X } from "lucide-react";

export default function FloatingActionButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [touchedButton, setTouchedButton] = useState<string | null>(null);
  const [showRecommendationHint, setShowRecommendationHint] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly and close consultation form
  const scrollToTop = () => {
    // Dispatch event to close consultation form
    window.dispatchEvent(new CustomEvent('closeConsultationForm'));
    
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Scroll to chatbot
  const scrollToChatbot = () => {
    const chatbotElement = document.querySelector("[data-chatbot-trigger]");
    if (chatbotElement) {
      chatbotElement.scrollIntoView({ behavior: "smooth" });
      // Trigger chatbot open
      (chatbotElement as HTMLElement).click();
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = (buttonName: string) => {
    setTouchedButton(buttonName);
  };

  const handleTouchEnd = () => {
    // Keep touch state visible for a moment, then fade out
    setTimeout(() => {
      setTouchedButton(null);
    }, 1500);
  };

  // Get expanded state (hover on desktop or touch on mobile)
  const isExpanded = (buttonName: string) => {
    return hoveredButton === buttonName || touchedButton === buttonName;
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem("freshmeal-recommendation-hint-seen")) return;
    const timer = window.setTimeout(() => setShowRecommendationHint(true), 3500);
    return () => window.clearTimeout(timer);
  }, []);

  const dismissRecommendationHint = () => {
    setShowRecommendationHint(false);
    window.sessionStorage.setItem("freshmeal-recommendation-hint-seen", "true");
  };

  // Close touch state when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setTouchedButton(null);
    };

    if (touchedButton) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [touchedButton]);

  return (
    <>
      {/* Top Button */}
      {isVisible && (
        <div
          className="fixed bottom-24 right-6 z-40"
          onMouseEnter={() => setHoveredButton("top")}
          onMouseLeave={() => setHoveredButton(null)}
          onTouchStart={() => handleTouchStart("top")}
          onTouchEnd={handleTouchEnd}
        >
          {/* Connected shape: the label expands from the same green container as the button */}
          <div className="flex h-14 w-[244px] items-center overflow-hidden rounded-[10px] bg-[#007651] shadow-lg transition-all duration-200 hover:bg-[#008F69]">
            <button
              type="button"
              onClick={scrollToTop}
              className="relative flex h-14 w-full items-center justify-start rounded-[10px] bg-transparent text-white transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008F69] focus-visible:ring-inset active:scale-[0.97]"
              aria-label="맨 위로 이동"
            >
              <span className="flex w-[calc(100%-48px)] items-center justify-center whitespace-nowrap text-sm font-semibold sm:text-base">위로 이동</span>
              <ChevronUp aria-hidden="true" strokeWidth={1.5} className="system-icon system-icon-md absolute right-4" />
            </button>
          </div>
        </div>
      )}

      {/* Recommendation simulation CTA */}
      <div className="fixed bottom-6 right-4 z-40 sm:right-6">
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
        <div className="flex min-h-14 w-[244px] items-center overflow-hidden rounded-[10px] bg-[#007651] shadow-lg transition-all duration-200 hover:bg-[#008F69]">
          <button
            type="button"
            onClick={scrollToChatbot}
            className="flex min-h-14 w-full items-center justify-start text-white transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008F69] focus-visible:ring-inset active:scale-[0.97]"
            aria-label="우리 현장 맞춤 추천받기"
          >
            <span className="flex w-[calc(100%-48px)] items-center justify-center whitespace-nowrap text-sm font-semibold sm:text-base">우리 현장 맞춤 추천받기</span>
            <MessageCircle aria-hidden="true" strokeWidth={1.7} className="absolute right-4 h-5 w-5 flex-shrink-0" />
          </button>
        </div>
      </div>
    </>
  );
}
