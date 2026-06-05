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
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
      {/* PC: Horizontal Button Navigation with Icons */}
      <div className="hidden md:block">
        <div className="container px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-3 justify-between">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabClick(tab.id)}
                  className={`flex-1 flex flex-col items-center gap-2 px-4 py-4 rounded-2xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-[#006B4F] bg-[#EEF7F2]'
                      : 'text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: 4x2 Grid Button Navigation */}
      <div className="md:hidden">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-4 gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabClick(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 h-[72px] rounded-2xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-[#006B4F] bg-[#EEF7F2]'
                      : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-200'
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
