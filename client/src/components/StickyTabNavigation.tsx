import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StickyTabNavigationProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export default function StickyTabNavigation({ activeTab, onTabClick }: StickyTabNavigationProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const tabs = [
    { id: 'intro', label: '서비스 소개' },
    { id: 'kitchen', label: '구내식당' },
    { id: 'snack', label: '수제간편식' },
    { id: 'snacks', label: '간식' },
    { id: 'cafe', label: '사내카페' },
    { id: 'process', label: '프로세스' },
    { id: 'reviews', label: '고객후기' },
    { id: 'faq', label: 'FAQ' },
  ];

  const checkScroll = () => {
    if (tabsRef.current) {
      setCanScrollLeft(tabsRef.current.scrollLeft > 0);
      setCanScrollRight(
        tabsRef.current.scrollLeft < tabsRef.current.scrollWidth - tabsRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      tabsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* PC: Horizontal Tab Menu with Underline */}
        <div className="hidden md:flex items-center justify-between h-16 gap-4">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="flex-shrink-0 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Tabs Container */}
          <div
            ref={tabsRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide flex-1 relative"
            onScroll={checkScroll}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabClick(tab.id)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`px-2 py-4 font-semibold text-sm whitespace-nowrap flex-shrink-0 transition-all duration-300 relative group ${
                  activeTab === tab.id
                    ? 'text-gray-900'
                    : hoveredTab === tab.id
                    ? 'text-gray-900'
                    : 'text-gray-600'
                }`}
              >
                {tab.label}
                {/* Underline for active tab */}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-t-full animate-slideIn"></div>
                )}
                {/* Underline for hover tab (only if not active) */}
                {activeTab !== tab.id && hoveredTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-400 rounded-t-full animate-slideIn"></div>
                )}
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="flex-shrink-0 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile: Horizontal Scrollable Tab Menu */}
        <div className="md:hidden flex items-center gap-2 h-14 overflow-hidden">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="flex-shrink-0 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <div
            ref={tabsRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide flex-1"
            onScroll={checkScroll}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabClick(tab.id)}
                className={`px-3 py-2 font-medium text-xs whitespace-nowrap flex-shrink-0 transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? 'text-gray-900'
                    : 'text-gray-600'
                }`}
              >
                {tab.label}
                {/* Underline for active tab */}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="flex-shrink-0 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slideIn {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
