import { useState, useEffect } from "react";
import { ChevronUp, MessageCircle } from "lucide-react";

export default function FloatingActionButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [touchedButton, setTouchedButton] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    const currentScrollY = window.scrollY;
    
    // Show/hide based on scroll position
    if (currentScrollY > 300) {
      setIsVisible(true);
      
      // Detect scroll direction
      if (currentScrollY > lastScrollY) {
        // Scrolling down - hide button
        setIsHidden(true);
      } else {
        // Scrolling up - show button
        setIsHidden(false);
      }
    } else {
      setIsVisible(false);
      setIsHidden(false);
    }
    
    setLastScrollY(currentScrollY);
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
          className={`fixed bottom-24 right-6 z-40 transition-all duration-300 ease-out ${
            isHidden ? "translate-y-32 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
          }`}
          onMouseEnter={() => setHoveredButton("top")}
          onMouseLeave={() => setHoveredButton(null)}
          onTouchStart={() => handleTouchStart("top")}
          onTouchEnd={handleTouchEnd}
        >
          {/* Floating item container */}
          <div className="relative inline-block">
            {/* Text Label Pill - Behind the icon */}
            <div
              className={`absolute right-0 top-0 h-14 bg-[#005B44] rounded-full shadow-lg transition-all duration-300 flex items-center overflow-hidden ${
                isExpanded("top") ? "w-40 opacity-100 visible" : "w-0 opacity-0 invisible"
              }`}
              style={{ zIndex: 1, paddingLeft: "28px", paddingRight: "80px" }}
            >
              <div className="whitespace-nowrap text-white font-medium text-sm">
                위로 이동
              </div>
            </div>

            {/* Circular Icon Button - On top */}
            <button
              onClick={scrollToTop}
              className="relative w-14 h-14 rounded-full bg-[#005B44] text-white shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
              style={{ zIndex: 3 }}
              aria-label="맨 위로 이동"
              title="Top"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Consultation Button */}
      {isVisible && (
        <div
          className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ease-out ${
            isHidden ? "translate-y-32 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
          }`}
          onMouseEnter={() => setHoveredButton("consultation")}
          onMouseLeave={() => setHoveredButton(null)}
          onTouchStart={() => handleTouchStart("consultation")}
          onTouchEnd={handleTouchEnd}
        >
          {/* Floating item container */}
          <div className="relative inline-block">
            {/* Text Label Pill - Behind the icon */}
            <div
              className={`absolute right-0 top-0 h-14 bg-[#005B44] rounded-full shadow-lg transition-all duration-300 flex items-center overflow-hidden ${
                isExpanded("consultation") ? "w-40 opacity-100 visible" : "w-0 opacity-0 invisible"
              }`}
              style={{ zIndex: 1, paddingLeft: "28px", paddingRight: "80px" }}
            >
              <div className="whitespace-nowrap text-white font-medium text-sm">
                맞춤 상담하기
              </div>
            </div>

            {/* Circular Icon Button - On top */}
            <button
              onClick={scrollToChatbot}
              className="relative w-14 h-14 rounded-full bg-[#005B44] text-white shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
              style={{ zIndex: 3 }}
              aria-label="맞춤 상담"
              title="맞춤 상담"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
