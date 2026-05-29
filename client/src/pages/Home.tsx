import { useState, useEffect, useRef } from "react";
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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const reviewsContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play banner carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDietIndex((prev) => (prev + 1) % 3);
    }, 5000); // Change banner every 5 seconds
    return () => clearInterval(interval);
  }, []);



  if (location === "/thank-you") {
    return <ThankYouPage />;
  }

  const diets = [
    {
      title: "오피스",
      image: "/manus-storage/cropped_pasted_file_vNMOOM_KakaoTalk_20250219_170906076_11_1c1f5f37.jpg",
      description: "정통 한식부터 건강한 샐러드까지, 직원들의 다양한 입맛을 만족시키는 균형잡힌 식단입니다. 신선한 재료로 만든 한끼 식사로 업무 효율을 높입니다.",
      tags: ["균형잡힌 영양", "신선한 재료", "다양한 메뉴"],
    },
    {
      title: "산업체",
      image: "/manus-storage/cropped_pasted_file_wJ2TV0_KakaoTalk_20250219_170952476_15_82ba9f37.jpg",
      description: "육체적 노동으로 소모되는 에너지를 충분히 보충할 수 있는 푸짐한 식단입니다. 고단백 메뉴와 든든한 밥상으로 근로자의 건강을 지킵니다.",
      tags: ["고단백 식단", "푸짐한 양", "에너지 보충"],
    },
    {
      title: "병원",
      image: "/manus-storage/cropped_pasted_file_K9GApj_IMG_6678_17ac1b51.jpg",
      description: "환자의 건강 상태를 고려한 특별식 제공이 가능합니다. 영양사 상담을 통한 맞춤형 메뉴로 빠른 회복을 돕습니다.",
      tags: ["영양관리", "특별식", "위생관리"],
    },
    {
      title: "카페/음료",
      image: "/manus-storage/cropped_cafe_IMG_6844_dd3c1ce0.jpg",
      description: "프리미엄 커피와 다양한 음료로 직원들의 휴식 시간을 더욱 특별하게 만듭니다. 신선한 재료로 만든 건강한 음료 메뉴를 제공합니다.",
      tags: ["프리미엄 음료", "카페", "휴식시간"],
    },
    {
      title: "핑거푸드",
      image: "/manus-storage/cropped_fingerfood_04_6f773ed6.jpg",
      description: "회의나 행사에 어울리는 세련된 핑거푸드로 특별한 순간을 더욱 돋보이게 합니다. 신선한 재료로 만든 고급스러운 메뉴입니다.",
      tags: ["핑거푸드", "행사용", "고급스러움"],
    },
    {
      title: "음료/음식",
      image: "/manus-storage/cropped_pasted_file_jzHyNk_Gemini_Generated_Image_8dorez8dorez8dor_56141727.jpg",
      description: "다양한 음료와 간식으로 직원들의 일상에 활력을 더합니다. 건강과 맛을 모두 고려한 프리미엄 음식 및 음료 솔루션입니다.",
      tags: ["음료", "간식", "다양한선택"],
    },
  ];

  const kitchenlessSolutions = [
    {
      name: "프레시밀온",
      shortDesc: "최소한의 공간, 이동형 밀솔루션",
      details: "좁은 공간에도 설치 가능한 이동형 식사 솔루션으로, 어디든 신선한 식사를 제공합니다.",
      image: "/manus-storage/freshmelon-solution_70247cd6.png",
      tags: ["이동형", "공간절약", "신선함"],
    },
    {
      name: "슈퍼그로틴",
      shortDesc: "트렌디한 건강메뉴, 수제 간편식",
      details: "건강을 생각하는 직원들을 위한 고단백 간편식으로, 맛과 영양을 모두 잡았습니다.",
      image: "/manus-storage/supergrotin-solution_88cf978e.png",
      tags: ["고단백", "건강식", "간편식"],
    },
    {
      name: "스낵픽&카페",
      shortDesc: "임직원 취향저격, 맞춤형 밀솔루션",
      details: "간식부터 커피까지, 직원들의 다양한 니즈를 충족하는 복합형 솔루션입니다.",
      image: "/manus-storage/snackpick-solution_634d0e45.webp",
      tags: ["간식", "카페", "맞춤형"],
    },
  ];

  const meals = [
    {
      name: "정통 한식",
      image: "/manus-storage/02_07006eb7.png",
      description: "신선한 재료로 만든 전통 한식",
      fullDescription: "한반도의 오랜 식문화를 계승한 정통 한식입니다. 계절 재료를 활용하여 영양 균형을 맞추고, 전통 양념과 조리법으로 깊은 맛을 살렸습니다.",
      summary: "계절 재료로 만든 영양 균형 잡힌 한끼",
      tags: ["전통식", "영양균형", "한국식"],
    },
    {
      name: "아시안식",
      image: "/manus-storage/03_f0cbcda5.png",
      description: "다양한 아시아 요리의 맛",
      fullDescription: "태국, 베트남, 중국 등 다양한 아시아 요리의 정수를 담았습니다. 신선한 허브와 향신료로 입맛을 돋우고, 가벼우면서도 영양가 있는 메뉴 구성입니다.",
      summary: "신선한 향신료로 살린 아시아의 맛",
      tags: ["아시안", "향신료", "다양한맛"],
    },
    {
      name: "고급 양식",
      image: "/manus-storage/04_024062b0.png",
      description: "세련된 양식 메뉴",
      fullDescription: "유럽의 정통 요리 기법을 바탕으로 한 세련된 양식입니다. 신선한 재료와 정교한 조리로 프리미엄 식사 경험을 제공합니다.",
      summary: "유럽 정통 기법으로 만든 프리미엄 식사",
      tags: ["양식", "프리미엄", "세련된맛"],
    },
  ];

  const processes = [
    {
      step: "1",
      title: "신선한 재료 입고",
      description: "매일 엄선된 신선한 재료를 입고합니다",
      icon: "🥬",
    },
    {
      step: "2",
      title: "위생 관리",
      description: "HACCP 기준에 따른 철저한 위생 관리",
      icon: "✓",
    },
    {
      step: "3",
      title: "신속한 조리",
      description: "신선함을 유지하며 빠르게 조리합니다",
      icon: "👨‍🍳",
    },
    {
      step: "4",
      title: "배송 & 수거",
      description: "따뜻한 상태로 배송 후 위생적으로 수거합니다",
      icon: "🚚",
    },
  ];

  const operatingPhotos = [
    { image: '/manus-storage/cropped_pasted_file_vNMOOM_KakaoTalk_20250219_170906076_11_1c1f5f37.jpg', comment: '매일 신선한 재료로 정성스럽게 준비된 식사', company: '삼성전자', department: 'HR팀', name: '김민준', position: '팀장', emoji: '😊', customerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kim' },
    { image: '/manus-storage/cropped_pasted_file_wJ2TV0_KakaoTalk_20250219_170952476_15_82ba9f37.jpg', comment: '직원들이 만족하는 다양한 메뉴 구성', company: 'LG전자', department: '개발팀', name: '이지은', position: '대리', emoji: '👍', customerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lee' },
    { image: '/manus-storage/cropped_pasted_file_K9GApj_IMG_6678_17ac1b51.jpg', comment: '산업체 특성에 맞춘 영양 균형 식단', company: '현대중공업', department: '생산팀', name: '이영준', position: '팀장', emoji: '😊', customerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lee2' },
    { image: '/manus-storage/cropped_cafe_IMG_6844_dd3c1ce0.jpg', comment: '직원 체력 관리를 위한 고단백 메뉴', company: '포스코', department: '운영팀', name: '김석호', position: '대리', emoji: '👍', customerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kim2' },
    { image: '/manus-storage/cropped_fingerfood_04_6f773ed6.jpg', comment: '환자 맞춤형 저염식 및 특수식 제공', company: '서울대병원', department: '영양팀', name: '이수진', position: '영양사', emoji: '😊', customerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lee3' },
    { image: '/manus-storage/cropped_pasted_file_jzHyNk_Gemini_Generated_Image_8dorez8dorez8dor_56141727.jpg', comment: '위생 기준을 철저히 준수한 조리', company: '삼성의료원', department: '급식팀', name: '김지현', position: '팀장', emoji: '👍', customerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kim3' },
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
      department: "인사팀",
      name: "이수현",
      position: "부장",
      rating: 5,
      comment: "프레시밀온의 이동형 솔루션으로 다양한 사업장에서 직원 식사를 제공할 수 있게 되었습니다.",
      emoji: "🚗",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=hyun",
    },
    {
      company: "삼성화재",
      department: "영업팀",
      name: "최지훈",
      position: "과장",
      rating: 5,
      comment: "신선한 재료와 정성스러운 조리로 만든 식사가 정말 맛있습니다. 직원들의 만족도가 매우 높습니다.",
      emoji: "😋",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=choi",
    },
    {
      company: "네이버",
      department: "개발팀",
      name: "정혜린",
      position: "팀장",
      rating: 5,
      comment: "프레시밀온 덕분에 사무실에서도 편하게 신선한 식사를 즐길 수 있습니다. 정말 추천합니다!",
      emoji: "🌟",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=jung",
    },
  ];

  // Auto-rotate hero banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDietIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide for reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => {
        const maxIndex = reviews.length - 3;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe(e.targetTouches[0]?.clientX || e.changedTouches[0].clientX);
  };

  const handleSwipe = (endX: number) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - endX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // Swipe left - go to next
      setCurrentReviewIndex((prevIndex) => {
        const maxIndex = reviews.length - 3;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    } else if (isRightSwipe) {
      // Swipe right - go to previous
      setCurrentReviewIndex((prevIndex) => {
        return prevIndex <= 0 ? reviews.length - 3 : prevIndex - 1;
      });
    }
  };

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
    {
      question: "식품 위생 기준은 어떻게 되나요?",
      answer: "HACCP 인증을 받았으며, 매일 엄격한 위생 관리와 검사를 통해 안전한 식사를 보장합니다.",
    },
  ];

  const companies = [
    { name: "Company 1", logo: "/manus-storage/logo_01_2d111615.png" },
    { name: "Company 2", logo: "/manus-storage/logo_02_96ffa516.png" },
    { name: "Company 3", logo: "/manus-storage/logo_03_45e8c1c5.png" },
    { name: "Company 4", logo: "/manus-storage/logo_04_7b2b1dca.png" },
    { name: "Company 5", logo: "/manus-storage/logo_05_9ebcc27b.png" },
    { name: "Company 6", logo: "/manus-storage/logo_06_68267b53.png" },
    { name: "Company 7", logo: "/manus-storage/logo_07_1caf9494.png" },
    { name: "Company 8", logo: "/manus-storage/logo_08_4b7fe42c.png" },
    { name: "Company 9", logo: "/manus-storage/logo_09_191d5360.png" },
    { name: "Company 10", logo: "/manus-storage/logo_10_f2680fbf.png" },
    { name: "Company 11", logo: "/manus-storage/logo_11_c44b2fc0.png" },
    { name: "Company 12", logo: "/manus-storage/logo_12_cf712c7d.png" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Integrated Header */}
      <section className="relative h-[85vh] overflow-hidden">
        {/* Banner Carousel Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(calc(${currentDietIndex % 3} * -100%))`
            }}
          >
            {[
              {
                image: '/manus-storage/hero-office-meal_08208dd3.png',
                title: '직원 복지의 새로운 기준',
                highlight: '프레시밀온',
                description: '신선한 재료와 정성스러운 조리로 만든 건강한 식사가 직원들의 만족도를 높입니다.'
              },
              {
                image: '/manus-storage/hero-office-meal_08208dd3.png',
                title: '이동형 밀솔루션의 혁신',
                highlight: '프레시밀온',
                description: '공간의 제약 없이 모든 직원에게 프리미엄 식사 경험을 제공합니다.'
              },
              {
                image: '/manus-storage/hero-office-meal_08208dd3.png',
                title: '신뢰할 수 있는 파트너',
                highlight: '프레시밀온',
                description: '20년 이상의 경험과 노하우로 최고의 서비스를 제공합니다.'
              }
            ].map((banner, idx) => (
              <div
                key={idx}
                className="relative w-full h-full flex-shrink-0"
                style={{
                  backgroundImage: `url('${banner.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className={`absolute inset-0 transition-all duration-300 ${
                  scrolled ? 'bg-black/60' : 'bg-black/40'
                }`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Header */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-16 py-2 md:py-0">
              <div className="flex items-center gap-2">
                <span className={`font-bold text-lg md:text-xl transition ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}>이동형 F&B 서비스</span>
              </div>
              
              {/* Desktop Menu */}
              <nav className="hidden md:flex gap-8">
                <a href="#services" className={`transition ${
                  scrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-white/80'
                }`}>서비스</a>
                <a href="#diet" className={`transition ${
                  scrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-white/80'
                }`}>식단</a>
                <a href="#process" className={`transition ${
                  scrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-white/80'
                }`}>프로세스</a>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition ${
                  scrolled ? 'hover:bg-gray-200 text-gray-900' : 'hover:bg-white/20 text-white'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <button
                onClick={() => setConsultationOpen(true)}
                className={`hidden md:block px-6 py-2 rounded-lg border-2 transition duration-300 font-semibold ${
                  scrolled 
                    ? 'bg-[#005B44] text-white border-[#005B44] hover:bg-white hover:text-[#005B44]' 
                    : 'bg-white text-[#005B44] border-white hover:bg-white/90'
                }`}
              >
                문의하기
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden pb-4 border-t border-white/30 bg-black/20">
                <a href="#services" className="block py-2 text-white hover:text-white/80">서비스</a>
                <a href="#diet" className="block py-2 text-white hover:text-white/80">식단</a>
                <a href="#process" className="block py-2 text-white hover:text-white/80">프로세스</a>
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="w-full mt-4 px-4 py-2 bg-white text-[#005B44] rounded-lg font-semibold"
                >
                  문의하기
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-7xl mx-auto w-full">
            {[
              {
                image: '/manus-storage/hero-office-meal_08208dd3.png',
                title: '직원 복지의 새로운 기준',
                highlight: '프레시밀온',
                description: '신선한 재료와 정성스러운 조리로 만든 건강한 식사가 직원들의 만족도를 높입니다.'
              },
              {
                image: '/manus-storage/hero-office-meal_08208dd3.png',
                title: '이동형 밀솔루션의 혁신',
                highlight: '프레시밀온',
                description: '공간의 제약 없이 모든 직원에게 프리미엄 식사 경험을 제공합니다.'
              },
              {
                image: '/manus-storage/hero-office-meal_08208dd3.png',
                title: '신뢰할 수 있는 파트너',
                highlight: '프레시밀온',
                description: '20년 이상의 경험과 노하우로 최고의 서비스를 제공합니다.'
              }
            ][currentDietIndex % 3] && (
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg animate-in fade-in slide-in-from-left-4 delay-100">
                  {[
                    {
                      image: '/manus-storage/hero-office-meal_08208dd3.png',
                      title: '직원 복지의 새로운 기준',
                      highlight: '프레시밀온',
                      description: '신선한 재료와 정성스러운 조리로 만든 건강한 식사가 직원들의 만족도를 높입니다.'
                    },
                    {
                      image: '/manus-storage/hero-office-meal_08208dd3.png',
                      title: '이동형 밀솔루션의 혁신',
                      highlight: '프레시밀온',
                      description: '공간의 제약 없이 모든 직원에게 프리미엄 식사 경험을 제공합니다.'
                    },
                    {
                      image: '/manus-storage/hero-office-meal_08208dd3.png',
                      title: '신뢰할 수 있는 파트너',
                      highlight: '프레시밀온',
                      description: '20년 이상의 경험과 노하우로 최고의 서비스를 제공합니다.'
                    }
                  ][currentDietIndex % 3].title}
                </h1>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg animate-in fade-in slide-in-from-left-4 delay-200">
                  {[
                    {
                      image: '/manus-storage/hero-office-meal_08208dd3.png',
                      title: '직원 복지의 새로운 기준',
                      highlight: '프레시밀온',
                      description: '신선한 재료와 정성스러운 조리로 만든 건강한 식사가 직원들의 만족도를 높입니다.'
                    },
                    {
                      image: '/manus-storage/hero-office-meal_08208dd3.png',
                      title: '이동형 밀솔루션의 혁신',
                      highlight: '프레시밀온',
                      description: '공간의 제약 없이 모든 직원에게 프리미엄 식사 경험을 제공합니다.'
                    },
                    {
                      image: '/manus-storage/hero-office-meal_08208dd3.png',
                      title: '신뢰할 수 있는 파트너',
                      highlight: '프레시밀온',
                      description: '20년 이상의 경험과 노하우로 최고의 서비스를 제공합니다.'
                    }
                  ][currentDietIndex % 3].highlight}
                </h2>
                <p className="text-white text-lg md:text-xl max-w-2xl mb-8 drop-shadow-lg leading-relaxed animate-in fade-in slide-in-from-left-4 delay-300">
                  {[
                    {
                      image: '/manus-storage/hero-office-meal_08208dd3.png',
                      title: '직원 복지의 새로운 기준',
                      highlight: '프레시밀온',
                      description: '신선한 재료와 정성스러운 조리로 만든 건강한 식사가 직원들의 만족도를 높입니다.'
                    },
                    {
                      image: '/manus-storage/hero-office-meal_08208dd3.png',
                      title: '이동형 밀솔루션의 혁신',
                      highlight: '프레시밀온',
                      description: '공간의 제약 없이 모든 직원에게 프리미엄 식사 경험을 제공합니다.'
                    },
                    {
                      image: '/manus-storage/hero-office-meal_08208dd3.png',
                      title: '신뢰할 수 있는 파트너',
                      highlight: '프레시밀온',
                      description: '20년 이상의 경험과 노하우로 최고의 서비스를 제공합니다.'
                    }
                  ][currentDietIndex % 3].description}
                </p>
                <div className="flex gap-4 animate-in fade-in slide-in-from-left-4 delay-500">
                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="px-8 py-3 bg-[#005B44] text-white rounded-lg hover:bg-white hover:text-[#005B44] border-2 border-[#005B44] transition duration-300 font-semibold"
                  >
                    지금 상담받기
                  </button>
                  <button
                    onClick={() => setMaterialOpen(true)}
                    className="px-8 py-3 bg-white text-[#005B44] rounded-lg hover:bg-[#005B44] hover:text-white border-2 border-white transition duration-300 font-semibold"
                  >
                    자료 다운로드
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Banner Navigation - Right Bottom */}
        <div className="absolute bottom-8 right-8 flex gap-4 z-10">
          <button
            onClick={() => setCurrentDietIndex((prev) => (prev - 1 + 3) % 3)}
            className="text-white hover:text-white/80 transition duration-300 hover:scale-125 transform"
            title="이전"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={() => setCurrentDietIndex((prev) => (prev + 1) % 3)}
            className="text-white hover:text-white/80 transition duration-300 hover:scale-125 transform"
            title="다음"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* Floating Contact Button - Mobile Only */}
      <style>{`
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 91, 68, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(0, 91, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 91, 68, 0);
          }
        }
        @keyframes bounce-scale {
          0%, 100% {
            transform: translateX(-50%) scale(1);
          }
          50% {
            transform: translateX(-50%) scale(1.08);
          }
        }
        .floating-btn {
          animation: pulse-ring 2s infinite;
        }
        .floating-btn-center {
          animation: bounce-scale 2s ease-in-out infinite;
        }
      `}</style>
      <button
        onClick={() => setConsultationOpen(true)}
        className="floating-btn fixed bottom-6 right-6 md:hidden z-40 w-14 h-14 bg-[#005B44] text-white rounded-full shadow-lg hover:bg-[#004433] transition-all duration-300 flex items-center justify-center text-2xl font-bold hover:scale-110"
        title="문의하기"
      >
        ?
      </button>

      {/* Center bottom floating button - All devices */}
      <button
        onClick={() => setConsultationOpen(true)}
        className="floating-btn-center fixed bottom-6 left-1/2 z-40 px-8 py-4 bg-[#ED6325] text-white rounded-2xl shadow-xl hover:bg-[#d45a1f] transition-all duration-300 font-bold text-lg hover:shadow-2xl whitespace-nowrap"
        title="지금 바로 상담 신청"
      >
        지금 바로 상담 신청
      </button>


      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#005B44] mb-2">20+</div>
              <p className="text-gray-600">년 이상의 금식 운영 경험</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#005B44] mb-2">1,000+</div>
              <p className="text-gray-600">일일 제공 식수</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#005B44] mb-2">100+</div>
              <p className="text-gray-600">사업장 운영 중</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#005B44] mb-2">99%</div>
              <p className="text-gray-600">고객 만족도</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kitchenless Solutions Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2">키친리스 밀솔루션</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">공간 제약 없이 신선한 식사를 제공하는 프레시밀온의 3가지 솔루션</p>
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
                  <p className="text-[#005B44] font-semibold mb-3">{solution.shortDesc}</p>
                  <p className="text-gray-600 mb-4">{solution.details}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {solution.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-[#005B44]/10 text-[#005B44] rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="w-full px-4 py-2 bg-[#005B44] text-white rounded-lg hover:bg-white hover:text-[#005B44] border-2 border-[#005B44] transition duration-300 font-semibold"
                  >
                    견적 문의
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Diet Section - Wide Layout */}
      <section id="diet" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2">고객 특성에 맞춘 식단</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">각 산업의 특성에 맞춘 맞춤형 식단으로 직원 만족도를 높입니다</p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-96">
                <div className="relative h-96 md:h-auto overflow-hidden group">
                  <img
                    src={diets[currentDietIndex].image}
                    alt={diets[currentDietIndex].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2">{diets[currentDietIndex].title}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 leading-relaxed">{diets[currentDietIndex].description}</p>

                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      {diets.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentDietIndex(idx)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            idx === currentDietIndex ? "bg-[#005B44] w-8" : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setCurrentDietIndex((prev) => (prev === 0 ? diets.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-16 bg-[#005B44] text-white p-3 rounded-full hover:bg-[#004a36] transition-colors shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentDietIndex((prev) => (prev === diets.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-16 bg-[#005B44] text-white p-3 rounded-full hover:bg-[#004a36] transition-colors shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Actual Operating Meals Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2">실제 운영중인 식단</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">신선한 재료로 만든 다양한 메뉴</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {meals.map((meal, idx) => (
              <div key={idx}>
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-64 overflow-hidden group">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{meal.name}</h3>
                    <p className="text-[#005B44] font-semibold text-sm mb-3">{meal.summary}</p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{meal.fullDescription}</p>
                    <div className="flex flex-wrap gap-2">
                      {meal.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-[#005B44]/10 text-[#005B44] rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Professional Layout */}
      <section id="process" className="py-20 bg-gradient-to-r from-[#005B44] to-[#1a8a4d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2">신선함을 보장하는 프로세스</h2>
            <p className="text-sm sm:text-base md:text-xl text-white/90">엄격한 품질 관리로 신선한 식사를 보장합니다</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {processes.map((process, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 text-center border border-white/20 hover:bg-white/30 hover:border-white/40 transition-all duration-300 cursor-pointer">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">{process.icon}</div>
                  <h3 className="text-base md:text-xl font-bold text-white mb-2">{process.title}</h3>
                  <p className="text-white/80 text-xs md:text-sm">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Companies Section */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">함께하는 고객사</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">100개 이상의 기업이 프레시밀온을 신뢰하고 있습니다</p>
          </div>

          <style>{`
            @keyframes scroll-infinite {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .scroll-content {
              display: flex;
              gap: 2rem;
              width: max-content;
              animation: scroll-infinite 60s linear infinite;
            }
            .scroll-content:hover {
              animation-play-state: paused;
            }
            @media (max-width: 768px) {
              .scroll-content {
                gap: 1.5rem;
                animation: scroll-infinite 50s linear infinite;
              }
            }
          `}</style>

          <div className="relative w-full overflow-hidden bg-gray-50">
            <div className="overflow-hidden">
              <div className="scroll-content scroll-content-row1">
                {[...Array(3)].map((_, iteration) => (
                  companies.map((company, idx) => (
                    <div key={`logo-${iteration}-${idx}`} className="flex-shrink-0 w-20 sm:w-24 md:w-36 lg:w-44 h-14 sm:h-18 md:h-24 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ))
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Card Grid with Play Button */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2">고객 후기</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">프레시밀온과 함께하는 고객들의 성공 스토리</p>
          </div>

          {/* Card Grid Reviews */}
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {reviews.slice(0, 3).map((review, idx) => (
                <div key={idx} className="flex flex-col">
                  {/* Image Card */}
                  <div className="relative rounded-2xl overflow-hidden bg-gray-200 aspect-square group mb-4">
                    <img
                      src={operatingPhotos[currentReviewIndex + idx]?.image}
                      alt={review.company}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Company Name and Review - Left Aligned */}
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{review.company}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">"{review.comment}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section - Magazine Style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2">우리의 이야기</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">프레시밀온과 함께 만들어가는 성공 사례들</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              {
                image: "/manus-storage/story1_c7ff773c.webp",
                subtitle: "대형 오피스 추천",
                title: "50인 이상 대형 오피스",
                description: "넓은 공간에 최적화된 프레시밀온 솔루션으로 직원 만족도를 높였습니다."
              },
              {
                image: "/manus-storage/story2_b2dd90e7.jpg",
                subtitle: "즉시 입주 가능",
                title: "즉시 입주 가능한 오피스",
                description: "빠른 설치와 운영으로 입주 첫날부터 서비스를 시작할 수 있습니다."
              },
              {
                image: "/manus-storage/story3_fa3a1529.jpg",
                subtitle: "신규 오피스 추천",
                title: "새로운 오피스에서 근무하고 싶다면",
                description: "현대적이고 쾌적한 환경에서 프레시밀온의 신선한 식사를 즐기세요."
              },
              {
                image: "/manus-storage/story4_823f1f8c.webp",
                subtitle: "1인 오피스 추천",
                title: "혼자 집중하며 일하는 공간",
                description: "소규모 오피스도 프레시밀온으로 직원 복지를 충실하게 구성할 수 있습니다."
              }
            ].map((story, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4]">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <p className="text-sm font-medium mb-2 opacity-90">{story.subtitle}</p>
                    <h3 className="text-lg md:text-xl font-bold leading-tight">{story.title}</h3>
                  </div>
                </div>
              </div>
            ))}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2">직원 복지의 새로운 기준을 경험하세요</h2>
            <p className="text-sm sm:text-base md:text-xl text-white/90 mb-8">신선한 식사로 직원 만족도를 높이고 회사 이미지를 개선하세요</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setConsultationOpen(true)}
              className="px-8 py-3 bg-white text-[#005B44] rounded-lg hover:bg-gray-100 transition duration-300 font-semibold"
            >
              지금 상담받기
            </button>
            <button
              onClick={() => setMaterialOpen(true)}
              className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white/10 transition duration-300 font-semibold"
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
              <h3 className="text-white font-bold text-xl mb-4">이동형 F&B 서비스</h3>
              <p className="text-gray-400 mb-6">Food Business Partner Creating the success way</p>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">상호명:</span> 씨제이프레시웨이 주식회사</p>
                <p><span className="font-semibold">대표자:</span> 이건일</p>
                <p><span className="font-semibold">사업자등록번호:</span> 603-81-11270</p>
                <p><span className="font-semibold">대표전화:</span> 02-2149-6114</p>
                <p><span className="font-semibold">주소:</span> 경기도 용인시 기흥구 기곡로 32(하갈동)</p>
                <p className="text-xs text-gray-500 mt-2">(주사무소: 서울시 마포구 월드컵북로 54길 25 S-city)</p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-white font-semibold mb-4">CJ프레시웨이</h3>
                <a href="#" className="text-gray-400 hover:text-white transition">CJ프레시웨이 홈페이지 바로가기 ‣</a>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  개인정보 처리방침
                </button>
                <button
                  onClick={() => setShowTermsModal(true)}
                  className="text-gray-400 hover:text-white transition text-sm block"
                >
                  이용약관
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>Copyright ⓒ CJ Freshway. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">개인정보 처리방침</h2>
              <div className="space-y-4 text-gray-700 text-sm">
                <p>CJ프레시웨이㈜는 이동급식 서비스 상담을 위해 아래 목적 범위 내로 고객님의 개인정보를 처리합니다.</p>
                <div>
                  <p className="font-semibold mb-2">◼ 수집·이용 항목:</p>
                  <p>성명, 휴대폰번호, 이메일주소, 기업명, 주소, 예상 식수</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">◼ 목적:</p>
                  <p>이동급식 서비스 상담 및 진행</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">◼ 보유·이용 기간:</p>
                  <p>서비스 상담 신청 후 3년</p>
                </div>
                <p className="text-xs text-gray-600">개인정보를 기입하지 않으실 수 있으나, 기재하지 않으실 경우 이동급식 서비스 상담 진행이 어렵습니다.</p>
              </div>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="mt-6 w-full px-4 py-2 bg-[#005B44] text-white rounded-lg hover:bg-[#004a36] transition"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">이용약관</h2>
              <div className="space-y-4 text-gray-700 text-sm">
                <p>프레시밀온 서비스 이용약관입니다.</p>
                <p>본 약관은 CJ프레시웨이㈜가 제공하는 이동급식 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정합니다.</p>
                <p>서비스를 이용함으로써 본 약관에 동의하는 것으로 간주됩니다.</p>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="mt-6 w-full px-4 py-2 bg-[#005B44] text-white rounded-lg hover:bg-[#004a36] transition"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {consultationOpen && <ConsultationModal onClose={() => setConsultationOpen(false)} />}
      {materialOpen && <MaterialRequestModal onClose={() => setMaterialOpen(false)} />}
    </div>
  );
}
