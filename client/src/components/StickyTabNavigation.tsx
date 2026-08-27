import { Building2, Utensils, Package, Candy, Coffee, MessageSquare } from 'lucide-react';

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
    { id: 'reviews', label: '고객후기', icon: MessageSquare },
  ];

  return (
    <div className="md:hidden w-full">
      <div className="container py-6">
        <div className="grid grid-cols-4 gap-3 w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabClick(tab.id)}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-[16px] transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#007651] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-[#E6E6E6] hover:bg-[#D7F9EF]'
                }`}
                onTouchStart={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-[#666666]'}`} />
                <span className={`text-xs font-semibold text-center leading-tight ${activeTab === tab.id ? 'text-white' : 'text-[#333333]'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
