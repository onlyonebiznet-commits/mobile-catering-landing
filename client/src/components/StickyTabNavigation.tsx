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
      {/* PC: Horizontal Circular Button Navigation */}
      <div className="hidden md:block">
        <div className="container px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-6 justify-center flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabClick(tab.id)}
                  className={`flex flex-col items-center gap-3 transition-all duration-300 ${
                    activeTab === tab.id ? '' : ''
                  }`}
                >
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#006B4F] text-white'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                  }`}>
                    <Icon className="w-10 h-10" />
                  </div>
                  <span className={`text-sm font-semibold text-center transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-[#006B4F]'
                      : 'text-gray-700'
                  }`}>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Circular Button Grid (4x2) */}
      <div className="md:hidden">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-4 gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabClick(tab.id)}
                  className="flex flex-col items-center gap-2 transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#006B4F] text-white'
                      : 'bg-white text-gray-700 border-2 border-gray-200'
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className={`text-xs font-semibold text-center leading-tight transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-[#006B4F]'
                      : 'text-gray-700'
                  }`}>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
