import { useState, useEffect, useRef } from "react";
import { Building2, Utensils, Package, Candy, Coffee, Workflow, MessageSquare, HelpCircle } from "lucide-react";

interface StickyTabNavigationProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export default function StickyTabNavigation({ activeTab, onTabClick }: StickyTabNavigationProps) {
  const tabs = [
    { id: 'intro', label: '서비스 소개', icon: Building2 },
    { id: 'kitchen', label: '구내식당', icon: Utensils },
    { id: 'snack', label: '수제간편식', icon: Package },
    { id: 'snacks', label: '간식', icon: Candy },
    { id: 'cafe', label: '사내카페', icon: Coffee },
    { id: 'process', label: '프로세스', icon: Workflow },
    { id: 'reviews', label: '고객후기', icon: MessageSquare },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <div className="sticky top-0 z-40 bg-white">
      {/* PC: Horizontal Rounded Rectangle Button Navigation */}
      <div className="hidden md:block border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-3 justify-between items-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabClick(tab.id)}
                  className={`flex flex-col items-center gap-2 px-5 py-4 rounded-[20px] transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#006B4F] text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-semibold text-center leading-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Rounded Rectangle Button Grid (4x2) */}
      <div className="md:hidden border-b border-gray-100">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-4 gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabClick(tab.id)}
                  className={`flex flex-col items-center gap-1 px-2 py-3 rounded-[20px] transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#006B4F] text-white shadow-sm'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-semibold text-center leading-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
