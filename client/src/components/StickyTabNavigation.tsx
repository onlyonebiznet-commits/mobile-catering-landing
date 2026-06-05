import { useState, useEffect, useRef } from "react";

interface StickyTabNavigationProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export default function StickyTabNavigation({ activeTab, onTabClick }: StickyTabNavigationProps) {
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

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

  // 언더라인 위치 업데이트
  useEffect(() => {
    if (activeTabRef.current && tabsContainerRef.current) {
      const tabRect = activeTabRef.current.getBoundingClientRect();
      const containerRect = tabsContainerRef.current.getBoundingClientRect();
      setUnderlineStyle({
        width: tabRect.width,
        left: tabRect.left - containerRect.left,
      });
    }
  }, [activeTab]);

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-[#EAEAEA]" style={{
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
    }}>
      {/* PC: Horizontal Tab Menu */}
      <div 
        ref={tabsContainerRef}
        className="hidden md:flex items-center h-16 px-4 sm:px-6 lg:px-8 relative"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={activeTab === tab.id ? activeTabRef : null}
            onClick={() => onTabClick(tab.id)}
            className={`px-4 py-3 font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
              activeTab === tab.id
                ? 'text-white bg-[#006B4F] rounded-lg'
                : 'text-gray-900 hover:text-[#006B4F]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mobile: Horizontal Scrollable Tab Menu */}
      <div className="md:hidden flex items-center h-14 overflow-x-auto scrollbar-hide px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={`px-3 py-2 font-medium text-xs whitespace-nowrap flex-shrink-0 transition-all duration-300 rounded-lg ${
              activeTab === tab.id
                ? 'text-white bg-[#006B4F]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
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
