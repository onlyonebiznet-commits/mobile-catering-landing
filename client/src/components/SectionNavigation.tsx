import { Building2, Utensils, Package, Candy, Coffee, MessageSquare } from 'lucide-react';

interface SectionNavigationProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const sections = [
  { id: 'intro', label: '서비스 소개', icon: Building2, iconTone: 'bg-brand-50 text-brand-700' },
  { id: 'kitchen', label: '구내식당', icon: Utensils, iconTone: 'bg-[#FFF1D9] text-[#C77700]' },
  { id: 'snack', label: '수제간편식', icon: Package, iconTone: 'bg-[#EAF3FF] text-[#006ECD]' },
  { id: 'snacks', label: '스낵픽', icon: Candy, iconTone: 'bg-[#FFF0E5] text-[#D86B2D]' },
  { id: 'cafe', label: '사내카페', icon: Coffee, iconTone: 'bg-[#F5EEE8] text-[#8A5A3C]' },
  { id: 'reviews', label: '고객후기', icon: MessageSquare, iconTone: 'bg-[#F2ECFF] text-[#7352C7]' },
];

export default function SectionNavigation({ activeSection, onSectionClick }: SectionNavigationProps) {
  return (
    <section className="w-full bg-white" aria-label="페이지 주요 메뉴">
      <div className="container py-6 md:py-10">
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4 w-full">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onSectionClick(section.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`group flex min-h-[104px] flex-col items-center justify-center gap-2 rounded-[18px] border p-3 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 active:scale-[0.97] md:min-h-[124px] md:gap-3 md:rounded-[20px] md:p-4 motion-reduce:transition-none motion-reduce:active:scale-100 ${
                  isActive
                    ? 'border-brand-700 bg-brand-700 text-white shadow-md'
                    : 'border-gray-100 bg-white text-gray-800 shadow-sm hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50 hover:shadow-md'
                }`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors md:h-14 md:w-14 ${
                    isActive ? 'bg-white/15 text-white' : `${section.iconTone} group-hover:bg-white`
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="system-icon system-icon-md h-5 w-5 md:h-7 md:w-7"
                  />
                </span>
                <span className={`text-[11px] font-semibold leading-tight md:text-sm ${isActive ? 'text-white' : 'text-gray-800'}`}>
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
