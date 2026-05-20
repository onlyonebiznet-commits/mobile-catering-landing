'use client';

import { useState, useEffect } from "react";
import ConsultationModal from "@/components/ConsultationModal";
import MaterialRequestModal from "@/components/MaterialRequestModal";
import { Button } from "@/components/ui/button";
import { Leaf, ChevronLeft, ChevronRight, X, Menu, Building2, Users, Heart, Zap, Truck, CheckCircle } from "lucide-react";

export default function Home() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [materialRequestOpen, setMaterialRequestOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [currentDietIndex, setCurrentDietIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              newSet.add(entry.target.id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-scroll-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const diets = [
    {
      title: "오피스",
      description: "프리미엄 업무 환경을 위한 건강한 식단",
      tags: ["균형잡힌 영양", "프리미엄 메뉴", "빠른 섭취"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/corporate-meal-carousel-f2DqeewL8p9QTRUu8jnzdS.webp",
    },
    {
      title: "산업체",
      description: "에너지 충전이 필요한 근로자를 위한 푸짐한 식단",
      tags: ["고단백", "고칼로리", "든든한 식사"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/factory-meal-carousel-TH5PbSUxE4ew3NZQ2GFKBZ.webp",
    },
    {
      title: "병원",
      description: "환자 건강을 고려한 맞춤형 식단",
      tags: ["저염식", "소화하기 쉬운", "영양 관리"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/hospital-meal-carousel-mneg9wNuzjGDLED9pgDBDf.webp",
    },
  ];

  const meals = [
    {
      name: "정통 한식",
      description: "전통 한식의 맛과 영양을 담은 정성스러운 한끼",
      tags: ["한식", "정식", "영양균형"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/corporate-meal-carousel-f2DqeewL8p9QTRUu8jnzdS.webp",
    },
    {
      name: "아시안식",
      description: "신선한 재료로 만든 균형잡힌 건강식",
      tags: ["아시안", "건강식", "신선"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/super-grotin-hero-EnkjTLPrRJAMgqDuTFtczr.webp",
    },
    {
      name: "고급 양식",
      description: "프리미엄 재료로 준비한 세련된 양식 요리",
      tags: ["양식", "프리미엄", "고급"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/snack-pick-cafe-hero-YEJTRmZZSYChfg3tUEFqPY.webp",
    },
  ];

  const kitchenlessSolutions = [
    {
      name: "프레시밀온",
      shortDesc: "최소한의 공간, 이동형 밀솔루션",
      details: "사무실, 공장, 병원 등 어디든 설치 가능한 이동형 밀솔루션으로 공간 제약 없이 신선한 식사를 제공합니다.",
      tags: ["이동형", "공간절약", "신선"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/fresh-meal-on-hero-gBtqdgZs9PjFiB2wftstQz.webp",
    },
    {
      name: "슈퍼그로틴",
      shortDesc: "트렌디한 건강메뉴, 수제 간편식 밀솔루션",
      details: "건강을 추구하는 직원들을 위한 프리미엄 간편식으로 고단백, 저탄수화물 옵션을 제공합니다.",
      tags: ["건강식", "고단백", "프리미엄"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/super-grotin-hero-EnkjTLPrRJAMgqDuTFtczr.webp",
    },
    {
      name: "스낵픽&카페",
      shortDesc: "임직원 취향저격, 맞춤형 밀솔루션",
      details: "커피, 간식, 음료 등 다양한 선택지를 제공하여 직원들의 오후 피로를 풀어줍니다.",
      tags: ["간식", "카페", "다양한선택"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/snack-pick-cafe-hero-YEJTRmZZSYChfg3tUEFqPY.webp",
    },
  ];

  const customers = [
    { name: "삼성", logo: "삼성" },
    { name: "SK하이닉스", logo: "SK" },
    { name: "LG", logo: "LG" },
    { name: "크래프톤", logo: "크래프톤" },
    { name: "현대", logo: "현대" },
    { name: "인천공항", logo: "공항" },
  ];

  const faqs = [
    {
      question: "프레시밀온 서비스는 어떻게 신청하나요?",
      answer: "상단의 '지금 상담받기' 버튼을 클릭하여 간단한 정보를 입력하시면, 전담 매니저가 연락드려 상세한 상담을 진행합니다.",
    },
    {
      question: "최소 주문 식수는 몇 명부터 가능한가요?",
      answer: "회사 규모와 상황에 따라 유연하게 대응 가능합니다. 상담 시 최적의 플랜을 제안해드립니다.",
    },
    {
      question: "식단 변경이나 취소는 언제까지 가능한가요?",
      answer: "배송 전날 오후 5시까지 변경 및 취소가 가능합니다. 긴급한 경우 고객센터에 문의해주세요.",
    },
    {
      question: "알레르기 식재료 대응이 가능한가요?",
      answer: "네, 사전에 알레르기 정보를 알려주시면 맞춤형 메뉴로 대응 가능합니다.",
    },
    {
      question: "배송 지역은 어디까지 가능한가요?",
      answer: "서울, 경기, 인천 지역을 중심으로 배송 가능하며, 기타 지역은 상담 시 확인 가능합니다.",
    },
  ];

  const reviews = [
    {
      name: "삼성전자 HR팀",
      role: "인사담당자",
      comment: "프레시밀온을 도입한 이후 직원 만족도가 크게 향상되었습니다. 신선하고 맛있는 식사가 제공되어 업무 효율도 높아졌습니다.",
      emoji: "😊",
    },
    {
      name: "LG디스플레이 식당",
      role: "식당 운영팀",
      comment: "다양한 메뉴와 빠른 배송으로 직원들의 만족도가 높습니다. 특히 맞춤형 식단 옵션이 매우 유용합니다.",
      emoji: "👍",
    },
    {
      name: "현대자동차 복지팀",
      role: "복지담당자",
      comment: "위생 관리와 신선도가 우수하며, 비용 대비 품질이 뛰어납니다. 강력히 추천합니다!",
      emoji: "⭐",
    },
  ];

  const processSteps = [
    { title: "신선한 재료 입고", icon: "📦" },
    { title: "정성스러운 조리", icon: "👨‍🍳" },
    { title: "신속한 배송", icon: "🚚" },
    { title: "안전한 보관", icon: "❄️" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-[#1B7F4A]" />
              <span className="text-xl font-bold text-[#1B7F4A]">프레시밀온</span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-gray-700 hover:text-[#1B7F4A] transition">서비스</a>
              <a href="#meals" className="text-gray-700 hover:text-[#1B7F4A] transition">식단</a>
              <a href="#process" className="text-gray-700 hover:text-[#1B7F4A] transition">프로세스</a>
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setConsultationOpen(true)}
                className="hidden md:inline-block px-6 py-2 bg-[#1B7F4A] text-white rounded-lg hover:bg-white hover:text-[#1B7F4A] hover:border-[#1B7F4A] border-2 border-[#1B7F4A] transition duration-300"
              >
                문의하기
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100">
              <a href="#services" className="block py-2 text-gray-700 hover:text-[#1B7F4A]">서비스</a>
              <a href="#meals" className="block py-2 text-gray-700 hover:text-[#1B7F4A]">식단</a>
              <a href="#process" className="block py-2 text-gray-700 hover:text-[#1B7F4A]">프로세스</a>
              <button
                onClick={() => {
                  setConsultationOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-4 px-4 py-2 bg-[#1B7F4A] text-white rounded-lg hover:bg-white hover:text-[#1B7F4A] border-2 border-[#1B7F4A] transition"
              >
                문의하기
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{
        backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/hero-header-full-3XqRvnKjFpzWqKvQXvfPQe.webp')",
      }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex flex-col justify-center items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#1B7F4A] text-lg mb-4">신선함 속 있는 이동형 밀솔루션</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              직원복지의 새로운 기준<br />
              <span className="text-[#1B7F4A]">프레시밀온</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-xl">
              신선한 재료와 정성스러운 조리로 만든 건강한 식사가 직원들의 만족도를 높입니다.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => setConsultationOpen(true)}
                className="px-8 py-3 bg-[#1B7F4A] text-white rounded-lg hover:bg-white hover:text-[#1B7F4A] border-2 border-[#1B7F4A] transition duration-300 font-semibold"
              >
                지금 상담받기
              </button>
              <button
                onClick={() => setMaterialRequestOpen(true)}
                className="px-8 py-3 bg-white text-[#1B7F4A] rounded-lg hover:bg-[#1B7F4A] hover:text-white border-2 border-white transition duration-300 font-semibold"
              >
                자료 다운로드
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#1B7F4A] mb-2">20+</div>
              <p className="text-gray-600">년 이상의 금식 운영 경험</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#1B7F4A] mb-2">1,000+</div>
              <p className="text-gray-600">일일 제공 식수</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#1B7F4A] mb-2">100+</div>
              <p className="text-gray-600">사업장 운영 중</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#1B7F4A] mb-2">99%</div>
              <p className="text-gray-600">고객 만족도</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kitchenless Solutions Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">키친리스 밀솔루션</h2>
            <p className="text-xl text-gray-600">공간 제약 없이 신선한 식사를 제공하는 프레시밀온의 3가지 솔루션</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {kitchenlessSolutions.map((solution, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden group">
                  <img
                    src={solution.image}
                    alt={solution.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{solution.name}</h3>
                  <p className="text-[#1B7F4A] font-semibold mb-3">{solution.shortDesc}</p>
                  <p className="text-gray-600 mb-4">{solution.details}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {solution.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-[#1B7F4A]/10 text-[#1B7F4A] rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="w-full px-4 py-2 bg-[#1B7F4A] text-white rounded-lg hover:bg-white hover:text-[#1B7F4A] border-2 border-[#1B7F4A] transition duration-300 font-semibold"
                  >
                    견적 문의
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Diet Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">고객 특성에 맞춘 식단</h2>
            <p className="text-xl text-gray-600">각 산업의 특성에 맞춘 맞춤형 식단으로 직원 만족도를 높입니다</p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentDietIndex((prev) => (prev - 1 + diets.length) % diets.length)}
              className="p-2 hover:bg-[#1B7F4A]/10 rounded-full transition"
            >
              <ChevronLeft className="w-6 h-6 text-[#1B7F4A]" />
            </button>

            <div className="flex-1 max-w-4xl">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                  <div className="relative h-80 overflow-hidden rounded-lg group">
                    <img
                      src={diets[currentDietIndex].image}
                      alt={diets[currentDietIndex].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">{diets[currentDietIndex].title}</h3>
                    <p className="text-lg text-gray-600 mb-4">{diets[currentDietIndex].description}</p>
                    <div className="flex flex-wrap gap-2">
                      {diets[currentDietIndex].tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-[#1B7F4A]/10 text-[#1B7F4A] rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentDietIndex((prev) => (prev + 1) % diets.length)}
              className="p-2 hover:bg-[#1B7F4A]/10 rounded-full transition"
            >
              <ChevronRight className="w-6 h-6 text-[#1B7F4A]" />
            </button>
          </div>
        </div>
      </section>

      {/* Meals Gallery Section */}
      <section id="meals" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">실제 운영중인 식단</h2>
            <p className="text-xl text-gray-600">신선한 재료로 만든 다양한 메뉴를 경험해보세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {meals.map((meal, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden group">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{meal.name}</h3>
                  <p className="text-gray-600 mb-4">{meal.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {meal.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-[#1B7F4A]/10 text-[#1B7F4A] rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customers Section */}
      <section
        id="customers"
        data-scroll-animate
        className={`py-20 bg-gray-50 transition-all duration-1000 ${
          visibleSections.has("customers") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">함께하는 고객사</h2>
            <p className="text-xl text-gray-600">국내 주요 기업들이 프레시밀온을 신뢰합니다</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {customers.map((customer, idx) => (
              <div key={idx} className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="text-lg font-bold text-gray-700">{customer.logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">신선함을 보장하는 프로세스</h2>
            <p className="text-xl text-gray-600">입고부터 배송까지 신선함을 지키는 프레시밀온의 프로세스</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="text-6xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                {idx < processSteps.length - 1 && (
                  <div className="hidden md:block absolute ml-32 text-3xl text-[#1B7F4A]">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section
        id="reviews"
        data-scroll-animate
        className={`py-20 bg-gray-50 transition-all duration-1000 ${
          visibleSections.has("reviews") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">고객 후기</h2>
            <p className="text-xl text-gray-600">프레시밀온을 이용하는 고객들의 만족도 평가</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{review.emoji}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                </div>
                <div className="bg-[#1B7F4A]/5 rounded-lg p-4 border-l-4 border-[#1B7F4A]">
                  <p className="text-gray-700 italic">"{review.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <p className="text-xl text-gray-600">프레시밀온 서비스에 대해 자주 묻는 질문들을 모았습니다</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900 text-left">{faq.question}</span>
                  <span className="text-[#1B7F4A] text-xl">{expandedFaq === idx ? "−" : "+"}</span>
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        data-scroll-animate
        className={`py-20 bg-[#1B7F4A] transition-all duration-1000 ${
          visibleSections.has("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">직원 복지의 새로운 기준을 경험하세요</h2>
          <p className="text-xl text-white/90 mb-8">프레시밀온과 함께 직원 만족도를 높이고 기업 이미지를 개선하세요</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => setConsultationOpen(true)}
              className="px-8 py-3 bg-white text-[#1B7F4A] rounded-lg hover:bg-[#1B7F4A] hover:text-white border-2 border-white transition duration-300 font-semibold"
            >
              지금 상담받기
            </button>
            <button
              onClick={() => setMaterialRequestOpen(true)}
              className="px-8 py-3 bg-transparent text-white rounded-lg hover:bg-white hover:text-[#1B7F4A] border-2 border-white transition duration-300 font-semibold"
            >
              자료 다운로드
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6 text-[#1B7F4A]" />
                <span className="text-xl font-bold text-white">프레시밀온</span>
              </div>
              <p className="text-gray-400 mb-6">Food Business Partner Creating the success way</p>
              <div className="space-y-2 text-sm">
                <p><strong>상호명:</strong> 씨제이프레시웨이 주식회사</p>
                <p><strong>대표자:</strong> 이건일</p>
                <p><strong>사업자등록번호:</strong> 603-81-11270</p>
                <p><strong>대표전화:</strong> 02-2149-6114</p>
                <p><strong>주소:</strong> 경기도 용인시 기흥구 기곡로 32(하갈동)</p>
                <p className="text-xs text-gray-500">(주사무소: 서울시 마포구 월드컵북로 54길 25 S-city)</p>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <a href="#" className="text-[#1B7F4A] hover:text-white mb-4 font-semibold flex items-center gap-2">
                CJ프레시웨이 홈페이지 바로가기 ‣
              </a>
              <div className="space-y-2">
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  개인정보 처리방침
                </button>
                <button
                  onClick={() => setShowTerms(true)}
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  이용약관
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
            <p>Copyright © CJ Freshway. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ConsultationModal open={consultationOpen} onOpenChange={setConsultationOpen} />
      <MaterialRequestModal open={materialRequestOpen} onOpenChange={setMaterialRequestOpen} />

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">개인정보 처리방침</h2>
              <button onClick={() => setShowPrivacy(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-gray-700 space-y-4 text-sm">
              <p>CJ프레시웨이㈜는 개인정보 보호법에 따라 고객의 개인정보를 보호하고 있습니다.</p>
              <p><strong>수집·이용 항목:</strong> 성명, 휴대폰번호, 이메일주소, 기업명, 주소, 예상 식수</p>
              <p><strong>목적:</strong> 이동급식 서비스 상담 및 진행</p>
              <p><strong>보유·이용 기간:</strong> 서비스 상담 신청 후 3년</p>
              <p>자세한 내용은 CJ프레시웨이 홈페이지를 참고해주세요.</p>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">이용약관</h2>
              <button onClick={() => setShowTerms(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-gray-700 space-y-4 text-sm">
              <p>프레시밀온 서비스 이용약관입니다.</p>
              <p>본 약관은 CJ프레시웨이㈜가 제공하는 이동급식 서비스의 이용과 관련하여 회사와 고객 간의 권리, 의무 및 책임사항을 규정합니다.</p>
              <p>자세한 내용은 CJ프레시웨이 홈페이지를 참고해주세요.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
