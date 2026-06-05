import { Building2, Utensils, Package, Candy, Coffee, Workflow, MessageSquare, HelpCircle } from "lucide-react";

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
    { id: 'process', label: '프로세스', icon: Workflow },
    { id: 'reviews', label: '고객후기', icon: MessageSquare },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <div className="sticky top-0 z-40 bg-white">
      <div className="w-full max-w-[1200px] mx-auto px-6 py-8">
        <div className="grid grid-cols-8 gap-4 w-full">
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
                <span className={`text-xs font-semibold text-center leading-tight ${activeTab === tab.id ? 'text-white' : 'text-[#374151]'}`}>
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
