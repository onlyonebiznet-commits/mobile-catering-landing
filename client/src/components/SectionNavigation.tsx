import React from 'react';
import { Building2, Utensils, Package, Candy, Coffee, Workflow, MessageSquare, HelpCircle } from 'lucide-react';

interface SectionNavigationProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const sections = [
  { id: 'intro', label: '서비스 소개', icon: Building2 },
  { id: 'kitchen', label: '구내식당', icon: Utensils },
  { id: 'snack', label: '수제간편식', icon: Package },
  { id: 'snacks', label: '스낵픽', icon: Candy },
  { id: 'cafe', label: '사내카페', icon: Coffee },
  { id: 'process', label: '프로세스', icon: Workflow },
  { id: 'reviews', label: '고객후기', icon: MessageSquare },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

export default function SectionNavigation({ activeSection, onSectionClick }: SectionNavigationProps) {
  return (
    <>
      {/* PC Version */}
      <section className="hidden md:block w-full bg-white sticky top-0 z-40">
        <div className="container py-8">
          <div className="grid grid-cols-8 gap-6 w-full">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionClick(section.id)}
                  className={`flex flex-col items-center justify-center gap-3 p-5 rounded-[20px] transition-all duration-300 ${
                    isActive
                      ? 'bg-[#006B4F] text-white shadow-md'
                      : 'bg-white text-gray-700 border border-[#F1F3F5] hover:bg-[#F7FAF8] hover:shadow-sm'
                  }`}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                  <span className={`text-xs font-semibold text-center leading-tight ${isActive ? 'text-white' : 'text-[#374151]'}`}>
                    {section.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile Version */}
      <section className="md:hidden w-full bg-white">
        <div className="container py-6">
          <div className="grid grid-cols-4 gap-3 w-full">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionClick(section.id)}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-[16px] transition-all duration-300 ${
                    isActive
                      ? 'bg-[#006B4F] text-white shadow-md'
                      : 'bg-white text-gray-700 border border-[#F1F3F5] hover:bg-[#F7FAF8]'
                  }`}
                  onTouchStart={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                  <span className={`text-xs font-semibold text-center leading-tight ${isActive ? 'text-white' : 'text-[#374151]'}`}>
                    {section.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
