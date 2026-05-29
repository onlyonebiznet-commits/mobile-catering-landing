import { useState, useEffect } from "react";
import { ChevronUp, MessageCircle } from "lucide-react";

export default function FloatingActionButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
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

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {/* Top Button - Telegram Style */}
      {isVisible && (
        <div
          className="fixed bottom-24 right-6 z-40"
          onMouseEnter={() => setHoveredButton("top")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <button
            onClick={scrollToTop}
            className="w-14 h-14 rounded-full bg-[#005B44] text-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center flex-shrink-0"
            aria-label="맨 위로 이동"
            title="Top"
          >
            <ChevronUp className="w-6 h-6" />
          </button>

          {/* Expanded Text Area */}
          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 h-14 bg-[#005B44] rounded-full shadow-lg transition-all duration-300 flex items-center overflow-hidden ${
              hoveredButton === "top" ? "w-40 pr-14" : "w-0"
            }`}
          >
            <div
              className={`pl-4 whitespace-nowrap text-white font-medium text-sm transition-opacity duration-300 ${
                hoveredButton === "top" ? "opacity-100" : "opacity-0"
              }`}
            >
              맨 위로 이동
            </div>
          </div>
        </div>
      )}

      {/* Consultation Button - Telegram Style */}
      {isVisible && (
        <div
          className="fixed bottom-6 right-6 z-40"
          onMouseEnter={() => setHoveredButton("consultation")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <button
            onClick={scrollToChatbot}
            className="w-14 h-14 rounded-full bg-[#005B44] text-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center flex-shrink-0"
            aria-label="맞춤 상담"
            title="맞춤 상담"
          >
            <MessageCircle className="w-6 h-6" />
          </button>

          {/* Expanded Text Area */}
          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 h-14 bg-[#005B44] rounded-full shadow-lg transition-all duration-300 flex items-center overflow-hidden ${
              hoveredButton === "consultation" ? "w-40 pr-14" : "w-0"
            }`}
          >
            <div
              className={`pl-4 whitespace-nowrap text-white font-medium text-sm transition-opacity duration-300 ${
                hoveredButton === "consultation" ? "opacity-100" : "opacity-0"
              }`}
            >
              맞춤 상담하기
            </div>
          </div>
        </div>
      )}
    </>
  );
}
