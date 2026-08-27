import { Building2, Utensils, Package, Candy, Coffee, MessageSquare } from 'lucide-react';

interface PCNavigationProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export default function PCNavigation({ activeTab, onTabClick }: PCNavigationProps) {
  const tabs = [
    { id: 'intro', label: '서비스 소개', icon: Building2 },
    { id: 'kitchen', label: '구내식당', icon: Utensils },
    { id: 'snack', label: '수제간편식', icon: Package },
    { id: 'snacks', label: '스낵픽', icon: Candy },
    { id: 'cafe', label: '사내카페', icon: Coffee },
    { id: 'reviews', label: '고객후기', icon: MessageSquare },
  ];

  return (
    <div className="sticky top-0 z-40 bg-white">
      <div className="w-full max-w-[1200px] mx-auto px-6 py-8">
        <div className="grid grid-cols-6 gap-6 w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabClick(tab.id)}
                className={`group flex flex-col items-center justify-center gap-3 p-5 rounded-[20px] transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#007651] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-[#E6E6E6] hover:bg-[#D7F9EF] hover:shadow-sm'
                }`}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={`system-icon system-icon-md ${activeTab === tab.id ? 'text-white' : 'text-[#666666] group-hover:text-[#008F69]'}`}
                />
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
