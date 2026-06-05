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
    { id: 'snacks', label: '스낵픽', icon: Candy },
    { id: 'cafe', label: '사내카페', icon: Coffee },
    { id: 'process', label: '프로세스', icon: Workflow },
    { id: 'reviews', label: '고객후기', icon: MessageSquare },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <div className="sticky top-0 z-40 bg-white">
      {/* PC: Card Navigation - 8 columns */}
      <div className="hidden md:block border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-8 gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabClick(tab.id)}
                  className={`flex flex-col items-center justify-center gap-3 p-5 rounded-[20px] transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#006B4F] text-white shadow-md'
                      : 'bg-white text-gray-700 border border-[#F1F3F5] hover:bg-[#F7FAF8] hover:shadow-sm'
                  }`}
                  style={{
                    transform: activeTab === tab.id ? 'translateY(0)' : 'translateY(0)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon className={`w-6 h-6 ${activeTab === tab.id ? 'text-white' : 'text-[#64748B]'}`} />
                  <span className={`text-xs font-semibold text-center leading-tight ${activeTab === tab.id ? 'text-white' : 'text-[#374151]'}`}>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Card Navigation - 4x2 Grid */}
      <div className="md:hidden border-b border-gray-100">
        <div className="px-4 sm:px-6 py-6">
          <div className="grid grid-cols-4 gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabClick(tab.id)}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-[16px] transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#006B4F] text-white shadow-md'
                      : 'bg-white text-gray-700 border border-[#F1F3F5] hover:bg-[#F7FAF8]'
                  }`}
                  style={{
                    transform: activeTab === tab.id ? 'translateY(0)' : 'translateY(0)',
                    transition: 'all 0.3s ease'
                  }}
                  onTouchStart={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-[#64748B]'}`} />
                  <span className={`text-xs font-semibold text-center leading-tight ${activeTab === tab.id ? 'text-white' : 'text-[#374151]'}`}>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
