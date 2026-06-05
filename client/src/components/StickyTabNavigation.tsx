import { useState, useEffect, useRef } from "react";

interface StickyTabNavigationProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export default function StickyTabNavigation({ activeTab, onTabClick }: StickyTabNavigationProps) {
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
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
      {/* PC: Full Width Button Navigation */}
      <div className="hidden md:block">
        <div className="flex h-24">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={`flex-1 px-4 py-6 font-bold text-lg transition-all duration-300 border-r border-gray-200 last:border-r-0 ${
                activeTab === tab.id
                  ? 'text-white bg-[#006B4F]'
                  : 'text-gray-900 bg-white hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: Scrollable Button Navigation */}
      <div className="md:hidden">
        <div className="flex h-20 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={`flex-shrink-0 px-4 py-4 font-bold text-base whitespace-nowrap transition-all duration-300 border-r border-gray-200 last:border-r-0 ${
                activeTab === tab.id
                  ? 'text-white bg-[#006B4F]'
                  : 'text-gray-900 bg-white hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
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
