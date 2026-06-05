import { useState, useEffect, useRef } from "react";

interface StickyTabNavigationProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export default function StickyTabNavigation({ activeTab, onTabClick }: StickyTabNavigationProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
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

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* PC: Horizontal Tab Menu */}
      <div className="hidden md:flex items-center justify-center h-16 gap-8 px-4 sm:px-6 lg:px-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
            className={`px-2 py-4 font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
              activeTab === tab.id
                ? 'text-gray-900'
                : hoveredTab === tab.id
                ? 'text-gray-900'
                : 'text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mobile: Horizontal Scrollable Tab Menu */}
      <div className="md:hidden flex items-center gap-4 h-14 overflow-x-auto scrollbar-hide px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={`px-3 py-2 font-medium text-xs whitespace-nowrap flex-shrink-0 transition-all duration-300 ${
              activeTab === tab.id
                ? 'text-gray-900'
                : 'text-gray-600'
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
