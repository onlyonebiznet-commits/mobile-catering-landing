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
    <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
      {/* PC: Horizontal Tab Menu */}
      <div className="hidden md:block">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabClick(tab.id)}
                className={`px-6 py-3 font-semibold text-lg whitespace-nowrap transition-all duration-300 rounded-lg ${
                  activeTab === tab.id
                    ? 'text-white bg-[#006B4F]'
                    : 'text-gray-800 hover:text-[#006B4F] hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Horizontal Scrollable Tab Menu */}
      <div className="md:hidden">
        <div className="flex items-center h-16 overflow-x-auto scrollbar-hide px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={`px-4 py-2 font-semibold text-sm whitespace-nowrap flex-shrink-0 transition-all duration-300 rounded-lg ${
                activeTab === tab.id
                  ? 'text-white bg-[#006B4F]'
                  : 'text-gray-700 hover:text-[#006B4F]'
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
