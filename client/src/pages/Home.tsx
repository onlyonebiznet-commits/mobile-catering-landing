import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, MapPin, Users, Utensils, Clock, CheckCircle2, MessageCircle } from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";
import MaterialRequestModal from "@/components/MaterialRequestModal";
import ThankYouPage from "@/pages/ThankYou";
import { useLocation } from "wouter";

export default function Home() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [materialOpen, setMaterialOpen] = useState(false);
  const [currentDietIndex, setCurrentDietIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [location] = useLocation();

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

    document.querySelectorAll("[data-section]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const operatingPhotos = [
    {
      image: "/manus-storage/pasted_file_GLjdwZ_03_ab8063d4.jpg",
      comment: "깔끔하고 신선한 식사 제공",
    },
    {
      image: "/manus-storage/pasted_file_process01_244fb723.jpg",
      comment: "다양한 메뉴 선택 가능",
    },
    {
      image: "/manus-storage/pasted_file_process02_6b8f1234.jpg",
      comment: "직원들이 만족하는 식사",
    },
    {
      image: "/manus-storage/pasted_file_process03_8c9d5678.jpg",
      comment: "건강한 식단 구성",
    },
    {
      image: "/manus-storage/pasted_file_process04_9e1f2345.jpg",
      comment: "신선한 재료 사용",
    },
    {
      image: "/manus-storage/pasted_file_process05_1a3b6789.jpg",
      comment: "정성스러운 서빙",
    },
  ];

  const reviews = [
    {
      company: "삼성전자",
      department: "HR팀",
      name: "김민준",
      position: "팀장",
      rating: 5,
      comment: "프레시밀온 덕분에 직원들의 점심시간이 훨씬 편해졌습니다. 신선하고 맛있는 식사로 만족도가 높습니다.",
      emoji: "😊",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=kim",
    },
    {
      company: "LG전자",
      department: "개발팀",
      name: "이지은",
      position: "대리",
      rating: 5,
      comment: "다양한 메뉴와 건강한 식단으로 직원들이 정말 좋아합니다. 강력 추천합니다!",
      emoji: "👍",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=lee",
    },
    {
      company: "SK하이닉스",
      department: "생산팀",
      name: "박준호",
      position: "과장",
      rating: 5,
      comment: "매일 신선한 식사를 제공해주셔서 감사합니다. 직원 복지가 한 단계 업그레이드 되었습니다.",
      emoji: "⭐",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=park",
    },
    {
      company: "현대자동차",
      department: "사무팀",
      name: "이준영",
      position: "대리",
      rating: 5,
      comment: "프레시밀온의 신선한 식재료와 정성스러운 서비스가 정말 인상적입니다. 직원들의 만족도가 매우 높습니다.",
      emoji: "🌟",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=lee2",
    },
    {
      company: "삼성SDI",
      department: "관리팀",
      name: "정수진",
      position: "팀장",
      rating: 5,
      comment: "배송이 정확하고 음식 품질이 항상 일정해서 신뢰가 갑니다. 재계약 확정했습니다!",
      emoji: "✨",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=jung",
    },
    {
      company: "포스코",
      department: "인사팀",
      name: "최민수",
      position: "과장",
      rating: 5,
      comment: "직원 복지 만족도가 눈에 띄게 올라갔습니다. 프레시밀온 추천합니다!",
      emoji: "👏",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=choi",
    },
  ];

  const faqs = [
    {
      question: "프레시밀온 서비스는 어떻게 신청하나요?",
      answer: "위의 '지금 상담받기' 버튼을 클릭하여 간단한 정보를 입력하시면, 담당자가 연락드려 자세한 상담을 진행합니다.",
    },
    {
      question: "최소 주문 식수는 얼마인가요?",
      answer: "회사 규모와 필요에 따라 유연하게 조정 가능합니다. 상담 시 최적의 플랜을 제안해드립니다.",
    },
    {
      question: "식단 변경이 가능한가요?",
      answer: "네, 월 1회 이상 식단 변경이 가능하며, 직원들의 선호도를 반영하여 맞춤형 메뉴를 제공합니다.",
    },
    {
      question: "배송 지역에 제한이 있나요?",
      answer: "전국 대부분 지역에 배송 가능합니다. 구체적인 지역은 상담 시 확인해주시기 바랍니다.",
    },
  ];

  const diets = [
    {
      title: "한식 도시락",
      description: "한국의 맛을 담은 건강한 도시락",
      icon: "🍱",
      image: "/manus-storage/pasted_file_GLjdwZ_03_ab8063d4.jpg",
    },
    {
      title: "건강식 도시락",
      description: "칼로리 조절 및 영양 균형잡힌 식단",
      icon: "🥗",
      image: "/manus-storage/pasted_file_process01_244fb723.jpg",
    },
    {
      title: "프리미엄 도시락",
      description: "고급 재료로 만든 특별한 도시락",
      icon: "⭐",
      image: "/manus-storage/pasted_file_process02_6b8f1234.jpg",
    },
    {
      title: "식단 맞춤형",
      description: "회사 맞춤형 특별 식단 구성",
      icon: "🎯",
      image: "/manus-storage/pasted_file_process03_8c9d5678.jpg",
    },
  ];

  const companies = [
    { name: "Company 1", logo: "https://via.placeholder.com/120?text=Company1" },
    { name: "Company 2", logo: "https://via.placeholder.com/120?text=Company2" },
    { name: "Company 3", logo: "https://via.placeholder.com/120?text=Company3" },
    { name: "Company 4", logo: "https://via.placeholder.com/120?text=Company4" },
    { name: "Company 5", logo: "https://via.placeholder.com/120?text=Company5" },
    { name: "Company 6", logo: "https://via.placeholder.com/120?text=Company6" },
  ];

  const processes = [
    {
      number: "01",
      title: "상담 신청",
      description: "간단한 정보 입력으로 시작",
      icon: "📞",
    },
    {
      number: "02",
      title: "맞춤 제안",
      description: "회사에 맞는 식단 구성",
      icon: "📋",
    },
    {
      number: "03",
      title: "계약 체결",
      description: "조건 협의 후 계약",
      icon: "✍️",
    },
    {
      number: "04",
      title: "서비스 시작",
      description: "정기적인 배송 시작",
      icon: "🚚",
    },
  ];

  if (location === "/thank-you") {
    return <ThankYouPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img src="/manus-storage/pasted_file_logo_a1b2c3d4.png" alt="Logo" className="h-8" />
              <span className="font-bold text-lg text-[#005B44]">프레시밀온</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              <a href="#services" className="text-gray-700 hover:text-[#005B44] transition">
                서비스
              </a>
              <a href="#diet" className="text-gray-700 hover:text-[#005B44] transition">
                식단
              </a>
              <a href="#process" className="text-gray-700 hover:text-[#005B44] transition">
                프로세스
              </a>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setConsultationOpen(true)}
                className="hidden sm:block px-6 py-2 bg-[#005B44] text-white rounded-lg hover:bg-[#004433] transition"
              >
                문의하기
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                서비스
              </a>
              <a href="#diet" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                식단
              </a>
              <a href="#process" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                프로세스
              </a>
              <button
                onClick={() => setConsultationOpen(true)}
                className="w-full px-4 py-2 bg-[#005B44] text-white rounded-lg hover:bg-[#004433] transition"
              >
                문의하기
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/manus-storage/pasted_file_hero_bg.jpg)' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">직원 복지의 새로운 기준</h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-2xl">신선한 재료와 정성스러운 조리로 만드는 건강한 식사가 직원들의 만족도를 높입니다</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setConsultationOpen(true)}
              className="px-8 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A2B] transition"
            >
              지금 상담받기
            </button>
            <button
              onClick={() => setMaterialOpen(true)}
              className="px-8 py-3 bg-white text-[#005B44] rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              자료 다운로드
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#005B44] mb-2">20+</p>
              <p className="text-gray-600">년 이상의 급식 운영 경험</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#005B44] mb-2">1,000+</p>
              <p className="text-gray-600">일일 제공 식수</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#005B44] mb-2">100+</p>
              <p className="text-gray-600">사업장 운영 중</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#005B44] mb-2">99%</p>
              <p className="text-gray-600">고객 만족도</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" data-section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2">우리의 서비스</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">프레시밀온이 제공하는 다양한 서비스</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-[#005B44]/20 to-[#005B44]/5 flex items-center justify-center">
                <MapPin className="w-16 h-16 text-[#005B44]" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">50인 이상 대형 오피스</h3>
                <p className="text-gray-600">넓은 공간에 최적화된 프레시밀온 솔루션으로 직원 만족도를 높였습니다.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-[#005B44]/20 to-[#005B44]/5 flex items-center justify-center">
                <Users className="w-16 h-16 text-[#005B44]" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">즉시 입주 가능한 오피스</h3>
                <p className="text-gray-600">신속한 배송과 설치로 빠르게 서비스를 시작할 수 있습니다.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-[#005B44]/20 to-[#005B44]/5 flex items-center justify-center">
                <Utensils className="w-16 h-16 text-[#005B44]" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">신선한 오피스 식사 솔루션</h3>
                <p className="text-gray-600">매일 신선한 재료로 준비하는 건강한 식사를 제공합니다.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-[#005B44]/20 to-[#005B44]/5 flex items-center justify-center">
                <Clock className="w-16 h-16 text-[#005B44]" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">정기 배송 서비스</h3>
                <p className="text-gray-600">정해진 시간에 정확하게 배송되는 신뢰할 수 있는 서비스입니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diet Section */}
      <section id="diet" data-section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2">우리의 식단</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">프레시밀온의 다양한 식단 옵션</p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {diets.map((diet, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl bg-gray-100 h-64 mb-4">
                    <img
                      src={diet.image}
                      alt={diet.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                      <span className="text-5xl">{diet.icon}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{diet.title}</h3>
                  <p className="text-gray-600">{diet.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" data-section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2">우리의 이야기</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">프레시밀온과 함께 만들어가는 성공 사례들</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {processes.map((process, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition text-center">
                <div className="text-5xl mb-4">{process.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{process.title}</h3>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2">함께하는 고객사</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">프레시밀온을 신뢰하는 기업들</p>
          </div>

          <div className="relative overflow-hidden">
            <style>{`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .scroll-container {
                animation: scroll 60s linear infinite;
              }
              .scroll-container:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="flex overflow-hidden">
              <div className="scroll-container flex gap-8 py-8">
                {[...companies, ...companies, ...companies].map((company, idx) => (
                  <div key={idx} className="flex-shrink-0 w-32 h-20 bg-gray-100 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <img src={company.logo} alt={company.name} className="w-24 h-16 object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Image Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2">실제 이용 고객 사례를 확인하세요</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">프레시밀온을 도입한 기업들의 운영 현장</p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Images Grid - Show 3 on desktop, 1 on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {reviews.map((review, idx) => {
                const isVisible = idx >= currentReviewIndex && idx < currentReviewIndex + 3;
                return isVisible ? (
                  <div key={idx} className="relative group">
                    <div className="relative rounded-xl overflow-hidden bg-gray-200 aspect-square">
                      <img
                        src={operatingPhotos[idx]?.image}
                        alt={review.company}
                        className="w-full h-full object-cover"
                      />
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition">
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Company Name Below Image */}
                    <div className="mt-4 text-center">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{review.company}</h4>
                      <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
                    </div>
                  </div>
                ) : null;
              })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentReviewIndex(Math.max(0, currentReviewIndex - 1))}
              className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-6 md:-translate-x-12 bg-[#005B44] text-white p-2 rounded-full hover:bg-[#004433] transition disabled:opacity-50"
              disabled={currentReviewIndex === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentReviewIndex(Math.min(reviews.length - 3, currentReviewIndex + 1))}
              className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-6 md:translate-x-12 bg-[#005B44] text-white p-2 rounded-full hover:bg-[#004433] transition disabled:opacity-50"
              disabled={currentReviewIndex >= reviews.length - 3}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(Math.ceil(reviews.length / 3))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentReviewIndex(i * 3)}
                  className={`w-2 h-2 rounded-full transition ${
                    i === Math.floor(currentReviewIndex / 3) ? 'bg-[#005B44]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2">자주 묻는 질문</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">프레시밀온 서비스에 대한 자주 묻는 질문들입니다</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm hover:shadow-md transition">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900 text-left">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#005B44] transition-transform duration-300 ${
                      expandedFAQ === idx ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFAQ === idx && (
                  <div className="px-6 py-4 border-t bg-gray-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4">프레시밀온 이야기</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">프레시밀온의 서비스와 고객 사례를 영상으로 만나보세요</p>
          </div>

          <div className="bg-black rounded-lg overflow-hidden aspect-video w-full">
            <video
              width="100%"
              height="100%"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/manus-storage/freshmelon-video_d7ab0bca.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-[#005B44]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">지금 바로 시작하세요</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">프레시밀온과 함께 직원 복지를 한 단계 업그레이드하세요</p>
          <button
            onClick={() => setConsultationOpen(true)}
            className="px-8 py-4 bg-white text-[#005B44] rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
          >
            무료 상담 신청하기
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">프레시밀온</h4>
              <p className="text-gray-400 text-sm">신선한 재료와 정성스러운 조리로 만드는 건강한 식사</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">서비스</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">도시락 배송</a></li>
                <li><a href="#" className="hover:text-white transition">맞춤형 식단</a></li>
                <li><a href="#" className="hover:text-white transition">기업 급식</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">회사</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">소개</a></li>
                <li><a href="#" className="hover:text-white transition">채용</a></li>
                <li><a href="#" className="hover:text-white transition">블로그</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">연락처</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>📞 1234-5678</li>
                <li>📧 info@freshmelon.com</li>
                <li>📍 서울시 강남구</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <button onClick={() => setShowPrivacyModal(true)} className="hover:text-white transition mr-4">
              개인정보처리방침
            </button>
            <button onClick={() => setShowTermsModal(true)} className="hover:text-white transition">
              이용약관
            </button>
            <p className="mt-4">&copy; 2024 프레시밀온. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {consultationOpen && (
        <ConsultationModal onClose={() => setConsultationOpen(false)} />
      )}
      {materialOpen && (
        <MaterialRequestModal onClose={() => setMaterialOpen(false)} />
      )}
    </div>
  );
}
