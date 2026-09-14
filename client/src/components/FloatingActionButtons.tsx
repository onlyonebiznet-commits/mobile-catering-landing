import { useState, useEffect } from "react";
import { ChevronUp, MessageCircle } from "lucide-react";

export default function FloatingActionButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [touchedButton, setTouchedButton] = useState<string | null>(null);

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
          {/* Floating item container: label and button occupy separate layout space */}
          <div className="flex items-center justify-end gap-2">
            <div className={`flex h-14 items-center overflow-hidden rounded-[10px] bg-[#007651] px-4 shadow-lg transition-all duration-200 ${isExpanded("top") ? "max-w-40 opacity-100" : "max-w-0 px-0 opacity-0"}`} aria-hidden={!isExpanded("top")}>
              <span className="whitespace-nowrap text-sm font-medium text-white">위로 이동</span>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#007651] text-white shadow-md transition-all duration-200 hover:bg-[#008F69] hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008F69] focus-visible:ring-offset-2"
              aria-label="맨 위로 이동"
            >
              <ChevronUp aria-hidden="true" strokeWidth={1.5} className="system-icon system-icon-md" />
            </button>
          </div>
        </div>
      )}

      {/* Consultation Button */}
      {isVisible && (
        <div
          className="fixed bottom-6 right-6 z-40"
          onMouseEnter={() => setHoveredButton("consultation")}
          onMouseLeave={() => setHoveredButton(null)}
          onTouchStart={() => handleTouchStart("consultation")}
          onTouchEnd={handleTouchEnd}
        >
          {/* Floating item container: label and button occupy separate layout space */}
          <div className="flex items-center justify-end gap-2">
            <div className={`flex h-14 items-center overflow-hidden rounded-[10px] bg-[#007651] px-4 shadow-lg transition-all duration-200 ${isExpanded("consultation") ? "max-w-40 opacity-100" : "max-w-0 px-0 opacity-0"}`} aria-hidden={!isExpanded("consultation")}>
              <span className="whitespace-nowrap text-sm font-medium text-white">맞춤 상담하기</span>
            </div>
            <button
              type="button"
              onClick={scrollToChatbot}
              className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#007651] text-white shadow-md transition-all duration-200 hover:bg-[#008F69] hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008F69] focus-visible:ring-offset-2"
              aria-label="맞춤 상담"
            >
              <MessageCircle aria-hidden="true" strokeWidth={1.5} className="system-icon system-icon-md" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
