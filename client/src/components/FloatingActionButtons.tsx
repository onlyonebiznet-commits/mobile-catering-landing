import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function FloatingActionButtons() {
  const [isVisible, setIsVisible] = useState(false);

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
      {/* Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-[#005B44] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          aria-label="Top으로 이동"
          title="Top"
        >
          <ChevronUp className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
        </button>
      )}

      {/* Recommendation Button */}
      {isVisible && (
        <button
          onClick={scrollToChatbot}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-white text-[#005B44] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 font-semibold text-sm border-2 border-[#005B44]"
          aria-label="맞춤 추천"
          title="맞춤 추천"
        >
          맞춤 추천
        </button>
      )}
    </>
  );
}
