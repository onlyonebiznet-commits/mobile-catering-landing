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
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-md">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* PC: Horizontal Tab Menu */}
        <div className="hidden md:flex items-center justify-center h-16 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#006B4F] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile: Horizontal Scrollable Tab Menu */}
        <div className="md:hidden flex items-center gap-2 h-16 overflow-hidden">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="flex-shrink-0 p-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div
            ref={tabsRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide flex-1"
            onScroll={checkScroll}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabClick(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-[#006B4F] text-white'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="flex-shrink-0 p-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronRight className="w-5 h-5" />
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
      `}</style>
    </div>
  );
}
