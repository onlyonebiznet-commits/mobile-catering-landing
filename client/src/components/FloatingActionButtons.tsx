
export default function FloatingActionButtons() {
  // Scroll to chatbot
  const scrollToChatbot = () => {
    const chatbotElement = document.querySelector("[data-chatbot-trigger]");
    if (chatbotElement) {
      chatbotElement.scrollIntoView({ behavior: "smooth" });
      // Trigger chatbot open
      (chatbotElement as HTMLElement).click();
    }
  };

  return (
    <>
      {/* Recommendation simulation CTA */}
      <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
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
    </>
  );
}
