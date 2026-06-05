import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, MapPin, Users, Utensils, Clock, CheckCircle2, MessageCircle } from "lucide-react";
import { useScrollReveal, useScrollRevealGroup } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import ConsultationModal from "@/components/ConsultationModal";
import MaterialRequestModal from "@/components/MaterialRequestModal";
import ServiceRecommendationChatbot from "@/components/ServiceRecommendationChatbot";
import FloatingActionButtons from "@/components/FloatingActionButtons";
import ThankYouPage from "@/pages/ThankYou";
import StickyTabNavigation from "@/components/StickyTabNavigation";
import { useLocation } from "wouter";

interface StatisticItemProps {
  end: number;
  suffix: string;
  label: string;
  index?: number;
}

function StatisticItem({ end, suffix, label, index = 0 }: StatisticItemProps) {
  const { count, elementRef } = useCountUp({ end, duration: 1800 });

  // 특수 포맷팅 함수
  const formatNumber = (num: number): string => {
    if (suffix === "명") {
      // 300,000 → 30만
      const wan = Math.round(num / 10000);
      return wan.toLocaleString('ko-KR');
    }
    return num.toLocaleString('ko-KR');
  };

  return (
    <div ref={elementRef} className="text-center scroll-reveal-stagger">
      <div className="text-3xl md:text-6xl font-bold text-[#005B44] mb-2 whitespace-nowrap text-center">
        {formatNumber(count)}
        <span className="ml-1">{suffix}</span>
      </div>
      <p className="text-sm md:text-base text-gray-600 text-center">
        {label}
      </p>
    </div>
  );
}

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
  const [activeTab, setActiveTab] = useState('intro');
  const [location] = useLocation();
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({
    intro: null,
    kitchen: null,
    snack: null,
    snacks: null,
    cafe: null,
    process: null,
    reviews: null,
    faq: null,
  });

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
      if (consultationOpen) {
        setConsultationOpen(false);
      }

      const sections = Object.entries(sectionRefs.current);
      for (const [key, ref] of sections) {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveTab(key);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [consultationOpen]);

  const scrollToSection = (sectionKey: string) => {
    const ref = sectionRefs.current[sectionKey];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(sectionKey);
    }
  };

  useEffect(() => {
    const handleCloseConsultation = () => {
      setConsultationOpen(false);
    };

    window.addEventListener('closeConsultationForm', handleCloseConsultation);
    return () => window.removeEventListener('closeConsultationForm', handleCloseConsultation);
  }, []);

  // Auto-play banner carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDietIndex((prev) => (prev + 1) % 3);
    }, 5000); // Change banner every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Control video playback based on current index
  useEffect(() => {
    // 모든 비디오를 먼저 일시정지
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });

    // 현재 비디오만 재생
    const currentVideo = videoRefs.current[currentDietIndex];
    if (currentVideo) {
      // 비디오가 로드되었는지 확인
      if (currentVideo.readyState >= 2) {
        // HAVE_CURRENT_DATA 이상이면 즉시 재생
        currentVideo.play().catch((err) => {
          console.warn(`Video ${currentDietIndex} autoplay failed:`, err);
        });
      } else {
        // 로드 대기 후 재생
        const handleCanPlay = () => {
          currentVideo.play().catch((err) => {
            console.warn(`Video ${currentDietIndex} autoplay failed:`, err);
          });
          currentVideo.removeEventListener('canplay', handleCanPlay);
        };
        currentVideo.addEventListener('canplay', handleCanPlay);
      }
    }
  }, [currentDietIndex]);

  // Scroll Reveal Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('scroll-reveal')) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    document.querySelectorAll('.scroll-reveal, .scroll-reveal-stagger').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
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

  const cafeItems = [
    {
      name: "프리미엄 커피",
      image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=600&fit=crop",
      description: "최고급 원두로 만든 커피",
      fullDescription: "세계 각지에서 엄선한 최고급 원두를 사용하여 만든 프리미엄 커피입니다. 바리스타의 정성으로 완성된 특별한 맛과 향을 선사합니다.",
      summary: "세계 최고급 원두로 만든 특별한 커피",
      tags: ["프리미엄", "커피", "바리스타"],
    },
    {
      name: "건강한 음료",
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=600&fit=crop",
      description: "신선한 과일로 만든 음료",
      fullDescription: "신선한 과일과 건강한 재료로 만든 다양한 음료입니다. 설탕을 최소화하고 영양가를 극대화한 웰니스 음료 라인입니다.",
      summary: "신선한 과일로 만든 건강한 음료",
      tags: ["건강식", "음료", "웰니스"],
    },
    {
      name: "디저트 & 스낵",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=600&fit=crop",
      description: "정성스러운 디저트와 스낵",
      fullDescription: "카페만의 특별한 디저트와 건강한 스낵을 준비했습니다. 신선한 재료로 매일 만드는 베이커리 제품과 함께 커피의 맛을 돋보이게 합니다.",
      summary: "정성스럽게 만든 디저트와 스낵",
      tags: ["디저트", "베이커리", "스낵"],
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

  const [selectedSnackCategory, setSelectedSnackCategory] = useState('bakery');
  // 카테고리 아이콘 매핑
  const categoryIcons: { [key: string]: string } = {
    bakery: '🥐',
    salad: '🥗',
    sandwich: '🥪',
    rice: '🍱',
    ramen: '🍜',
    beverage: '🥤',
    yogurt: '🥛',
    energybar: '⚡',
  };


  const snackCategories = [
    {
      id: 'bakery',
      name: '베이커리',
      products: [
        { name: '소금빵', image: '/manus-storage/5c620aaa-70cc-4b50-a73f-59faffdaaa89_26b923dc.png' },
        { name: '크루아상', image: '/manus-storage/e9ac38b1-d749-4d69-90be-3d3b4277b827_a57a6c02.png' },
        { name: '머핀', image: '/manus-storage/5b72426f-ebb3-4ce8-9c28-9b70fa4860d2_e21f17a9.png' },
        { name: '베이글', image: '/manus-storage/55da86e1-306c-4df7-a968-fa0548e52de0_2f9b69a5.png' },
      ],
    },
    {
      id: 'salad',
      name: '샐러드',
      products: [
        { name: '샐러드1', image: '/manus-storage/cf3960c1-33b9-47e3-bf62-02e454b7a5bf_7d1257bb.png' },
        { name: '샐러드2', image: '/manus-storage/a276cb24-2395-4f8d-9671-6d90e36551ae_99b0bd90.png' },
        { name: '샐러드3', image: '/manus-storage/2f27db04-7176-4bdc-803c-ea79de19c64c_5b0d9310.png' },
        { name: '샐러드4', image: '/manus-storage/43a59833-3d5d-4754-948e-ad4ba32f9f88_18c7e8ce.webp' },
      ],
    },
    {
      id: 'sandwich',
      name: '샌드위치',
      products: [
        { name: '샌드위치1', image: '/manus-storage/0ef55738-1976-4d5b-9478-86596577659e_7a290e8a.png' },
        { name: '샌드위치2', image: '/manus-storage/7eed7945-f753-4d49-81c9-5c56fccbaa2b_91c6cd4b.png' },
        { name: '샌드위치3', image: '/manus-storage/4c29e128-e48f-4910-9b1a-813bebc520f5_2da5888e.png' },
        { name: '샌드위치4', image: '/manus-storage/f5e043e2-10f2-4ce0-8c1c-94ea6ad2a8f6_19b2ec6e.png' },
      ],
    },
    {
      id: 'rice',
      name: '밥',
      products: [
        { name: '밥1', image: '/manus-storage/fc37c440-8ad6-4d5d-9686-2699c9c1a0c8_7589c7b7.png' },
        { name: '밥2', image: '/manus-storage/67c4b09b-f687-4706-9878-c1435401f32d_842aa473.png' },
        { name: '밥3', image: '/manus-storage/aa3536b9-a697-4275-8021-200201926caa_2cf5cbac.png' },
        { name: '밥4', image: '/manus-storage/73d940f4-47dc-4d12-8e18-550b3c057faa_bf71142a.png' },
      ],
    },
    {
      id: 'ramen',
      name: '라면',
      products: [
        { name: '라면1', image: 'https://via.placeholder.com/400x300?text=Ramen+1' },
        { name: '라면2', image: 'https://via.placeholder.com/400x300?text=Ramen+2' },
        { name: '라면3', image: 'https://via.placeholder.com/400x300?text=Ramen+3' },
        { name: '라면4', image: 'https://via.placeholder.com/400x300?text=Ramen+4' },
      ],
    },
    {
      id: 'beverage',
      name: '음료',
      products: [
        { name: '음료1', image: '/manus-storage/pasted_file_5hIjDd_image_ccf1f4d9.png' },
        { name: '음료2', image: 'https://via.placeholder.com/400x300?text=Beverage+2' },
        { name: '음료3', image: 'https://via.placeholder.com/400x300?text=Beverage+3' },
        { name: '음료4', image: 'https://via.placeholder.com/400x300?text=Beverage+4' },
      ],
    },
    {
      id: 'yogurt',
      name: '요거트',
      products: [
        { name: '요거트1', image: 'https://via.placeholder.com/400x300?text=Yogurt+1' },
        { name: '요거트2', image: 'https://via.placeholder.com/400x300?text=Yogurt+2' },
        { name: '요거트3', image: 'https://via.placeholder.com/400x300?text=Yogurt+3' },
        { name: '요거트4', image: 'https://via.placeholder.com/400x300?text=Yogurt+4' },
      ],
    },
    {
      id: 'energybar',
      name: '에너지바',
      products: [
        { name: '에너지바1', image: 'https://via.placeholder.com/400x300?text=Energy+Bar+1' },
        { name: '에너지바2', image: 'https://via.placeholder.com/400x300?text=Energy+Bar+2' },
        { name: '에너지바3', image: 'https://via.placeholder.com/400x300?text=Energy+Bar+3' },
        { name: '에너지바4', image: 'https://via.placeholder.com/400x300?text=Energy+Bar+4' },
      ],
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
      fullDescription: "태국, 베트남, 중국 등 다양한 아시아 요리의 정수를 담았습니다. 신선한 허브와 향신료로 입맛을 돋우고, 영양가 있는 메뉴 구성입니다.",
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
    { name: "아시아나항공", logo: "/manus-storage/asia-na-hwang-gong_9a54cda7.png" },
    { name: "INSPIRE", logo: "/manus-storage/inspire_7018fe59.png" },
    { name: "SAMSUNG", logo: "/manus-storage/samsung_5aab8709.png" },
    { name: "TBT", logo: "/manus-storage/tbt_d956e8b5.png" },
    { name: "SK 바이오닉스", logo: "/manus-storage/sk-bionics_b30c6820.png" },
    { name: "LG Display", logo: "/manus-storage/lg-display_310d67e8.png" },
    { name: "Kakao", logo: "/manus-storage/kakao_5d39ef93.png" },
    { name: "STECO", logo: "/manus-storage/steco_14994f81.png" },
  ];
  const companiesRow2 = [
    { name: "Severance", logo: "/manus-storage/severance_e94a957c.png" },
    { name: "Coupang", logo: "/manus-storage/coupang_035fc0fb.png" },
    { name: "시대언재", logo: "/manus-storage/sidaeon-jae_1752a23c.png" },
    { name: "Hyundai", logo: "/manus-storage/hyundai_afb2ef79.png" },
    { name: "CGV", logo: "/manus-storage/cgv_e205ad60.png" },
    { name: "KAL", logo: "/manus-storage/kal_02c52bc8.png" },
    { name: "바노바기클리닉", logo: "/manus-storage/banobagi-clinic_3128d981.png" },
    { name: "MUSINSA", logo: "/manus-storage/musinsa_02d98551.png" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Integrated Header */}
      <section className="relative h-[680px] overflow-hidden">
        {/* Banner Carousel Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="relative w-full h-full">
            {[
              {
                video: '/manus-storage/0601_compressed_9dc9f144.mp4',
                title: '어디든지 찾아가는 사내 복지',
                highlight: '프레시밀온',
                description: '오피스부터 산업체까지, 원하는 장소에서 즐기는 맛있고 따뜻한 식사 서비스를 제공합니다.'
              },
              {
                video: '/manus-storage/inbound_snack_fcff7dcf.mp4',
                title: '직원 만족을 높이는 간식 복지',
                highlight: '스낵픽',
                description: '우리 회사에 꼭 맞는 간식 큐레이션으로 직원들의 만족도를 높이는 간식 서비스를 제공합니다.'
              },
              {
                video: '/manus-storage/cafe_fresh_39cc91e6.mp4',
                title: '기업 문화를 만드는 사내 카페',
                highlight: '카페프레시',
                description: '직원들의 소통과 휴식을 지원하며 조직 문화를 만들어가는 카페 서비스를 제공합니다.'
              }
            ].map((banner, idx) => (
              <div
                key={idx}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{
                  opacity: currentDietIndex === idx ? 1 : 0
                }}
              >
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[idx] = el;
                  }}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                  src={banner.video}
                />
                <div className="absolute inset-0 transition-all duration-300" style={{
                  background: scrolled 
                    ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.6) 100%)'
                    : 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.5) 100%)'
                }}></div>
              </div>
            ))}

            {/* Progress Indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex gap-2">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    currentDietIndex === idx 
                      ? 'w-8 bg-white' 
                      : 'w-2 bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>



        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center pt-20">
          <div className="container w-full scroll-reveal">
            {[
              {
                video: '/manus-storage/0601_compressed_9dc9f144.mp4',
                title: '어디든지 찾아가는 사내 복지',
                highlight: '프레시밀온',
                description: '오피스부터 산업체까지, 원하는 장소에서 즐기는 맛있고 따뜻한 식사 서비스를 제공합니다.'
              },
              {
                video: '/manus-storage/inbound_snack_fcff7dcf.mp4',
                title: '직원 만족을 높이는 간식 복지',
                highlight: '스낵픽',
                description: '우리 회사에 꼭 맞는 간식 큐레이션으로 직원들의 만족도를 높이는 간식 서비스를 제공합니다.'
              },
              {
                video: '/manus-storage/cafe_fresh_39cc91e6.mp4',
                title: '기업 문화를 만드는 사내 카페',
                highlight: '카페프레시',
                description: '직원들의 소통과 휴식을 지원하며 조직 문화를 만들어가는 카페 서비스를 제공합니다.'
              }
            ][currentDietIndex % 3] && (
              <div>
                {/* MO: 1,2줄 36px, PC: 1,2줄 72px */}
                <div className="md:hidden">
                  <h1 className="font-bold text-white drop-shadow-lg animate-in fade-in slide-in-from-left-4 delay-100 text-center" style={{fontSize: '30px', lineHeight: '1.2', marginBottom: '0'}}>
                    {[
                      {
                        image: '/manus-storage/hero-office-meal_08208dd3.png',
                        title: '어디든지 찾아가는 사내 복지',
                        highlight: '프레시밀온',
                        description: '오피스부터 산업체까지, 원하는 장소에서 즐기는 맛있고 따뜻한 식사 서비스를 제공합니다.'
                      },
                      {
                        image: '/manus-storage/hero-office-meal_08208dd3.png',
                        title: '직원 만족을 높이는 간식 복지',
                        highlight: '스낵픽',
                        description: '우리 회사에 꼭 맞는 간식 큐레이션으로 직원들의 만족도를 높이는 간식 서비스를 제공합니다.'
                      },
                      {
                        image: '/manus-storage/hero-office-meal_08208dd3.png',
                        title: '기업 문화를 만드는 사내 카페',
                        highlight: '카페프레시',
                        description: '직원들의 소통과 휴식을 지원하며 조직 문화를 만들어가는 카페 서비스를 제공합니다.'
                      }
                    ][currentDietIndex % 3].title}
                  </h1>
                  <h2 className="font-bold text-white drop-shadow-lg animate-in fade-in slide-in-from-left-4 delay-100 text-center" style={{fontSize: '30px', lineHeight: '1.2', marginBottom: '0.75rem'}}>
                    {[
                      {
                        image: '/manus-storage/hero-office-meal_08208dd3.png',
                        title: '어디든지 찾아가는 사내 복지',
                        highlight: '프레시밀온',
                        description: '오피스부터 산업체까지, 원하는 장소에서 즐기는 맛있고 따뜻한 식사 서비스를 제공합니다.'
                      },
                      {
                        image: '/manus-storage/hero-office-meal_08208dd3.png',
                        title: '직원 만족을 높이는 간식 복지',
                        highlight: '스낵픽',
                        description: '우리 회사에 꼭 맞는 간식 큐레이션으로 직원들의 만족도를 높이는 간식 서비스를 제공합니다.'
                      },
                      {
                        image: '/manus-storage/hero-office-meal_08208dd3.png',
                        title: '기업 문화를 만드는 사내 카페',
                        highlight: '카페프레시',
                        description: '직원들의 소통과 휴식을 지원하며 조직 문화를 만들어가는 카페 서비스를 제공합니다.'
                      }
                    ][currentDietIndex % 3].highlight}
                  </h2>
                </div>
                
                <div className="hidden md:block">
                  <h1 className="font-bold text-white drop-shadow-lg animate-in fade-in slide-in-from-left-4 delay-100" style={{fontSize: '60px', lineHeight: '1.2', marginBottom: '0'}}>
                    {[
                      {
                        image: '/manus-storage/hero-office-meal_08208dd3.png',
                        title: '어디든지 찾아가는 사내 복지',
                        highlight: '프레시밀온',
                        description: '오피스부터 산업체까지, 원하는 장소에서 즐기는 맛있고 따뜻한 식사 서비스를 제공합니다.'
                      },
                      {
                        image: '/manus-storage/hero-office-meal_08208dd3.png',
                        title: '직원 만족을 높이는 간식 복지',
                        highlight: '스낵픽',
                        description: '우리 회사에 꼭 맞는 간식 큐레이션으로 직원들의 만족도를 높이는 간식 서비스를 제공합니다.'
                      },
                      {
                        image: '/manus-storage/hero-office-meal_08208dd3.png',
                        title: '기업 문화를 만드는 사내 카페',
                        highlight: '카페프레시',
                        description: '직원들의 소통과 휴식을 지원하며 조직 문화를 만들어가는 카페 서비스를 제공합니다.'
                      }
                    ][currentDietIndex % 3].title}
                  </h1>
                  <h2 className="font-bold text-white drop-shadow-lg animate-in fade-in slide-in-from-left-4 delay-100" style={{fontSize: '60px', lineHeight: '1.2', marginBottom: '1rem'}}>
                    {[
                      {
                        image: '/manus-storage/hero-office-meal_08208dd3.png',
                        title: '어디든지 찾아가는 사내 복지',
                        highlight: '프레시밀온',
                        description: '오피스부터 산업체까지, 원하는 장소에서 즐기는 맛있고 따뜻한 식사 서비스를 제공합니다.'
                      },
                      {
                        image: '/manus-storage/hero-office-meal_08208dd3.png',
                        title: '직원 만족을 높이는 간식 복지',
                        highlight: '스낵픽',
                        description: '우리 회사에 꼭 맞는 간식 큐레이션으로 직원들의 만족도를 높이는 간식 서비스를 제공합니다.'
                      },
                      {
                        image: '/manus-storage/hero-office-meal_08208dd3.png',
                        title: '기업 문화를 만드는 사내 카페',
                        highlight: '카페프레시',
                        description: '직원들의 소통과 휴식을 지원하며 조직 문화를 만들어가는 카페 서비스를 제공합니다.'
                      }
                    ][currentDietIndex % 3].highlight}
                  </h2>
                </div>
                
                {/* 간단한 설명 - MO: 18px, PC: 36px */}
                <p className="md:hidden text-white drop-shadow-lg animate-in fade-in slide-in-from-left-4 delay-200 mb-8 text-center" style={{fontSize: '18px', lineHeight: '1.4'}}>
                  {[
                    {
                      image: '/manus-storage/hero-office-meal_08208dd3.png',
                      title: '어디든지 찾아가는 사내 복지',
                      highlight: '프레시밀온',
                      description: '오피스부터 산업체까지, 원하는 장소에서 즐기는 맛있고 따뜻한 식사 서비스를 제공합니다.'
                    },
                    {
                      image: '/manus-storage/hero-office-meal_08208dd3.png',
                      title: '직원 만족을 높이는 간식 복지',
                      highlight: '스낵픽',
                      description: '우리 회사에 꼭 맞는 간식 큐레이션으로 직원들의 만족도를 높이는 간식 서비스를 제공합니다.'
                    },
                    {
                      image: '/manus-storage/hero-office-meal_08208dd3.png',
                      title: '기업 문화를 만드는 사내 카페',
                      highlight: '카페프레시',
                      description: '직원들의 소통과 휴식을 지원하며 조직 문화를 만들어가는 카페 서비스를 제공합니다.'
                    }
                  ][currentDietIndex % 3].description}
                </p>
                <p className="hidden md:block text-white drop-shadow-lg animate-in fade-in slide-in-from-left-4 delay-200 mb-8" style={{fontSize: '18px', lineHeight: '1.4'}}>
                  {[
                    {
                      image: '/manus-storage/hero-office-meal_08208dd3.png',
                      title: '어디든지 찾아가는 사내 복지',
                      highlight: '프레시밀온',
                      description: '오피스부터 산업체까지, 원하는 장소에서 즐기는 맛있고 따뜻한 식사 서비스를 제공합니다.'
                    },
                    {
                      image: '/manus-storage/hero-office-meal_08208dd3.png',
                      title: '직원 만족을 높이는 간식 복지',
                      highlight: '스낵픽',
                      description: '우리 회사에 꼭 맞는 간식 큐레이션으로 직원들의 만족도를 높이는 간식 서비스를 제공합니다.'
                    },
                    {
                      image: '/manus-storage/hero-office-meal_08208dd3.png',
                      title: '기업 문화를 만드는 사내 카페',
                      highlight: '카페프레시',
                      description: '직원들의 소통과 휴식을 지원하며 조직 문화를 만들어가는 카페 서비스를 제공합니다.'
                    }
                  ][currentDietIndex % 3].description}
                </p>
                
                <div className="flex gap-4 animate-in fade-in slide-in-from-left-4 delay-500">
                  <button
                    onClick={() => setConsultationOpen(true)}
                    data-event="consultation_click"
                    className="px-8 py-3 bg-[#005B44] text-white rounded-lg hover:bg-white hover:text-[#005B44] border-2 border-[#005B44] transition duration-300 font-semibold"
                  >
                    지금 상담받기
                  </button>
                  <button
                    onClick={() => setMaterialOpen(true)}
                    data-event="material_request_click"
                    className="px-8 py-3 bg-[#005B44] text-white rounded-lg hover:bg-white hover:text-[#005B44] border-2 border-[#005B44] transition duration-300 font-semibold"
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
      {/* Service Recommendation Chatbot */}
      <ServiceRecommendationChatbot />


      {/* Tab Navigation Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container">
          <StickyTabNavigation activeTab={activeTab} onTabClick={scrollToSection} />
        </div>
      </section>

      {/* Kitchenless Solutions Section */}
      <section
        ref={(el) => { if (el) sectionRefs.current.intro = el; }}
        id="intro"
        className="py-20 bg-white"
      >
        <div className="container">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-[30px] md:text-[40px] font-bold text-gray-900 mb-2 text-center" style={{fontSize: 'clamp(30px, 5vw, 40px)'}}>키친리스 밀솔루션</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 text-center" style={{fontSize: 'clamp(15px, 3vw, 20px)'}}>공간 제약 없이 신선한 식사를 제공하는 프레시밀온의 3가지 솔루션</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {kitchenlessSolutions.map((solution, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow scroll-reveal-stagger" data-reveal-item={idx}>
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
                    data-event="consultation_click"
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
        <div className="container">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-[30px] md:text-[40px] font-bold text-gray-900 mb-2 text-center" style={{fontSize: 'clamp(30px, 5vw, 40px)'}}>고객 특성에 맞춘 식단</h2>
            <p className="text-[15px] md:text-[25px] text-gray-600 text-center" style={{fontSize: 'clamp(15px, 3vw, 20px)'}}>각 산업의 특성에 맞춘 맞춤형 식단으로 직원 만족도를 높입니다</p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg scroll-reveal">
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
      <section
        ref={(el) => { if (el) sectionRefs.current.kitchen = el; }}
        id="kitchen"
        className="py-20 bg-white"
      >
        <div className="container">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-[30px] md:text-[40px] font-bold text-gray-900 mb-2 text-center" style={{fontSize: 'clamp(30px, 5vw, 40px)'}}>실제 운영중인 식단</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 text-center" style={{fontSize: 'clamp(15px, 3vw, 20px)'}}>신선한 재료로 만든 다양한 메뉴</p>
          </div>

          {/* PC: 3 columns, Mobile: Horizontal scroll */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            {meals.map((meal, idx) => (
              <div key={idx} className="scroll-reveal-stagger" data-reveal-item={idx}>
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

          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden">
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
              {meals.map((meal, idx) => (
                <div key={idx} className="flex-shrink-0 w-80 snap-center">
                  <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative h-48 overflow-hidden group bg-gray-100 flex items-center justify-center">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
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
        </div>
      </section>

      {/* Healthy Homemade Meals Section */}
      {/* Snack Pick Curation Section */}
      <section
        ref={(el) => { if (el) sectionRefs.current.snacks = el; }}
        id="snacks"
        className="py-20 bg-amber-50"
      >
        <div className="container">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-[30px] md:text-[40px] font-bold text-gray-900 mb-2 text-center" style={{fontSize: 'clamp(30px, 5vw, 40px)'}}>맞춤형 큐레이션 스낵픽</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 text-center" style={{fontSize: 'clamp(15px, 3vw, 20px)'}}>CJ만의 상품 구매 역량을 통한 맞춤 큐레이션</p>
          </div>

          {/* Category Buttons - PC: Rounded Rectangle, Mobile: Circle */}
          <div className="mb-12">
            {/* PC: Rounded Rectangle Buttons (Starbucks Kiosk Style) */}
            <div className="hidden md:grid grid-cols-4 gap-4">
              {snackCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedSnackCategory(category.id)}
                  className={`py-4 px-5 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    selectedSnackCategory === category.id
                      ? 'bg-[#006B4F] text-white shadow-md'
                      : 'bg-white text-gray-700 border-2 border-[#D8D8D8] hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{categoryIcons[category.id]}</span>
                  <span className="text-sm font-semibold">{category.name}</span>
                </button>
              ))}
            </div>

            {/* Mobile: 4x2 Grid - Circle Cards (Delivery App Style) */}
            <div className="md:hidden grid grid-cols-4 gap-3">
              {snackCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedSnackCategory(category.id)}
                  className={`aspect-square flex flex-col items-center justify-center gap-1 rounded-3xl transition-all duration-300 shadow-sm ${
                    selectedSnackCategory === category.id
                      ? 'bg-[#006B4F] text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-100'
                  }`}
                >
                  <span className="text-2xl">{categoryIcons[category.id]}</span>
                  <span className="text-xs font-semibold text-center px-1 leading-tight">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Gallery - PC: 4x1, Mobile: 2x2 */}
          {snackCategories.find((cat) => cat.id === selectedSnackCategory) && (
            <>
              {/* PC: 4x1 Grid - 1:1 Square with Rounded Corners */}
              <div className="hidden md:grid grid-cols-4 gap-4">
                {snackCategories
                  .find((cat) => cat.id === selectedSnackCategory)
                  ?.products.map((product, idx) => (
                    <div key={idx} className="scroll-reveal-stagger" data-reveal-item={idx}>
                      <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="relative w-full aspect-square overflow-hidden group bg-white">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-2 text-center bg-white">
                          <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Mobile: 2x2 Grid */}
              <div className="md:hidden grid grid-cols-2 gap-4">
                {snackCategories
                  .find((cat) => cat.id === selectedSnackCategory)
                  ?.products.map((product, idx) => (
                    <div key={idx} className="scroll-reveal-stagger" data-reveal-item={idx}>
                      <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="relative h-32 overflow-hidden group bg-white">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-2 text-center bg-white">
                          <h3 className="text-xs font-semibold text-gray-900">{product.name}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Customized In-house Cafe Section */}
      <section
        ref={(el) => { if (el) sectionRefs.current.cafe = el; }}
        id="cafe"
        className="py-20 bg-white"
      >
        <div className="container">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-[30px] md:text-[40px] font-bold text-gray-900 mb-2 text-center" style={{fontSize: 'clamp(30px, 5vw, 40px)'}}>맞춤형 사내카페</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 text-center" style={{fontSize: 'clamp(15px, 3vw, 20px)'}}>고객의 니즈를 녹이고 고객사의 색깔을 듬뿍 담은 서비스를 제공합니다.</p>
          </div>

          {/* PC: 3 Column Grid */}
          <div className="hidden md:grid grid-cols-3 gap-8">
            {cafeItems.map((cafe, idx) => (
              <div key={idx} className="scroll-reveal-stagger" data-reveal-item={idx}>
                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-64 overflow-hidden group">
                    <img
                      src={cafe.image}
                      alt={cafe.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{cafe.name}</h3>
                    <p className="text-[#005B44] font-semibold text-sm mb-3">{cafe.summary}</p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{cafe.fullDescription}</p>
                    <div className="flex flex-wrap gap-2">
                      {cafe.tags.map((tag, i) => (
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

          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden">
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
              {cafeItems.map((cafe, idx) => (
                <div key={idx} className="flex-shrink-0 w-80 snap-center">
                  <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative h-48 overflow-hidden group bg-gray-100 flex items-center justify-center">
                      <img
                        src={cafe.image}
                        alt={cafe.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{cafe.name}</h3>
                      <p className="text-[#005B44] font-semibold text-sm mb-3">{cafe.summary}</p>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{cafe.fullDescription}</p>
                      <div className="flex flex-wrap gap-2">
                        {cafe.tags.map((tag, i) => (
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
        </div>
      </section>

      {/* Process Section - Professional Layout */}
      <section
        ref={(el) => { if (el) sectionRefs.current.process = el; }}
        id="process"
        className="py-20 bg-gradient-to-r from-[#005B44] to-[#1a8a4d]"
      >
        <div className="container">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-[30px] md:text-[40px] font-bold text-white mb-2 text-center" style={{fontSize: 'clamp(30px, 5vw, 40px)'}}>신선함을 보장하는 프로세스</h2>
            <p className="text-sm sm:text-base md:text-xl text-white/90 text-center" style={{fontSize: 'clamp(15px, 3vw, 20px)'}}>엄격한 품질 관리로 신선한 식사를 보장합니다</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {processes.map((process, idx) => (
              <div key={idx} className="relative scroll-reveal-stagger" data-reveal-item={idx}>
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

            {/* Partner Companies Section - 2 Row Infinite Scroll */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="container">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-[30px] md:text-[40px] font-bold text-gray-900 mb-2 text-center" style={{fontSize: 'clamp(30px, 5vw, 40px)'}}>함께하는 고객사</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 text-center" style={{fontSize: 'clamp(15px, 3vw, 20px)'}}>100개 이상의 기업이 프레시밀온을 신뢰하고 있습니다</p>
          </div>
          <style>{`
            @keyframes scroll-infinite-ltr {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes scroll-infinite-rtl {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .scroll-content-row1 {
              display: flex;
              gap: 2rem;
              width: max-content;
              animation: scroll-infinite-ltr 60s linear infinite;
            }
            .scroll-content-row2 {
              display: flex;
              gap: 2rem;
              width: max-content;
              animation: scroll-infinite-rtl 60s linear infinite;
              animation-delay: -30s;
            }
            .scroll-content-row1:hover,
            .scroll-content-row2:hover {
              animation-play-state: paused;
            }
            @media (max-width: 768px) {
              .scroll-content-row1,
              .scroll-content-row2 {
                gap: 1rem;
                animation-duration: 50s;
              }
              .scroll-content-row2 {
                animation-delay: -25s;
              }
            }
          `}</style>
          <div className="space-y-8">
            {/* Row 1 - Left to Right */}
            <div className="relative w-full overflow-hidden bg-gray-50">
              <div className="overflow-hidden">
                <div className="scroll-content-row1">
                  {[...Array(3)].map((_, iteration) => (
                    companies.map((company, idx) => (
                      <div key={`logo-row1-${iteration}-${idx}`} className="flex-shrink-0 w-[180px] h-[80px] md:w-[180px] md:h-[80px] sm:w-[140px] sm:h-[60px] flex items-center justify-center hover:scale-110 transition-transform duration-300">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="max-h-[56px] md:max-h-[56px] sm:max-h-[40px] max-w-[160px] md:max-w-[160px] sm:max-w-[120px] w-auto h-auto object-contain"
                        />
                      </div>
                    ))
                  ))}
                </div>
              </div>
            </div>
            {/* Row 2 - Right to Left (Offset) */}
            <div className="relative w-full overflow-hidden bg-gray-50">
              <div className="overflow-hidden">
                <div className="scroll-content-row2">
                  {[...Array(3)].map((_, iteration) => (
                    companiesRow2.map((company, idx) => (
                      <div key={`logo-row2-${iteration}-${idx}`} className="flex-shrink-0 w-[180px] h-[80px] md:w-[180px] md:h-[80px] sm:w-[140px] sm:h-[60px] flex items-center justify-center hover:scale-110 transition-transform duration-300">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="max-h-[56px] md:max-h-[56px] sm:max-h-[40px] max-w-[160px] md:max-w-[160px] sm:max-w-[120px] w-auto h-auto object-contain"
                        />
                      </div>
                    ))
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Card Grid with Play Button */}
      <section
        ref={(el) => { if (el) sectionRefs.current.reviews = el; }}
        id="reviews"
        className="py-20 bg-white"
      >
        <div className="container">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-[30px] md:text-[40px] font-bold text-gray-900 mb-2 text-center" style={{fontSize: 'clamp(30px, 5vw, 40px)'}}>고객 후기</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 text-center" style={{fontSize: 'clamp(15px, 3vw, 20px)'}}>프레시밀온과 함께하는 고객들의 성공 스토리</p>
          </div>

          {/* Card Grid Reviews */}
          <div>
            {/* Grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {reviews.slice(0, 3).map((review, idx) => (
                <div key={idx} className="flex flex-col scroll-reveal-stagger" data-reveal-item={idx}>
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
        <div className="container">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-[30px] md:text-[40px] font-bold text-gray-900 mb-2 text-center" style={{fontSize: 'clamp(30px, 5vw, 40px)'}}>우리의 이야기</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 text-center" style={{fontSize: 'clamp(15px, 3vw, 20px)'}}>프레시밀온과 함께 만들어가는 성공 사례들</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              {
                image: "/manus-storage/story_image_1_5ec94354.webp",
                subtitle: "대형 오피스 추천",
                title: "50인 이상 대형 오피스",
                description: "넓은 공간에 최적화된 프레시밀온 솔루션으로 직원 만족도를 높였습니다."
              },
              {
                image: "/manus-storage/story_image_2_21a852e8.webp",
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
              <div key={idx} className="group cursor-pointer scroll-reveal-stagger" data-reveal-item={idx}>
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
      <section
        ref={(el) => { if (el) sectionRefs.current.faq = el; }}
        id="faq"
        className="py-20 bg-gray-50"
      >
        <div className="container">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-[30px] md:text-[40px] font-bold text-gray-900 mb-2 text-center" style={{fontSize: 'clamp(30px, 5vw, 40px)'}}>자주 묻는 질문</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 text-center" style={{fontSize: 'clamp(15px, 3vw, 20px)'}}>프레시밀온 서비스에 대한 자주 묻는 질문들입니다</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm hover:shadow-md transition scroll-reveal-stagger" data-reveal-item={idx}>
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
        <div className="container">
          <div className="text-center mb-8 md:mb-16 scroll-reveal">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4 text-center" style={{fontSize: 'clamp(30px, 5vw, 40px)'}}>프레시밀온 이야기</h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 text-center" style={{fontSize: 'clamp(15px, 3vw, 20px)'}}>프레시밀온의 서비스와 고객 사례를 영상으로 만나보세요</p>
          </div>

          <div className="bg-black rounded-lg overflow-hidden aspect-video w-full scroll-reveal">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-reveal">
            <h2 className="text-[30px] md:text-[40px] font-bold text-white mb-2 text-center" style={{fontSize: 'clamp(30px, 5vw, 40px)'}}>직원 복지의 새로운 기준을 경험하세요</h2>
            <p className="text-sm sm:text-base md:text-xl text-white/90 mb-8 text-center" style={{fontSize: 'clamp(15px, 3vw, 20px)'}}>신선한 식사로 직원 만족도를 높이고 회사 이미지를 개선하세요</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-reveal-stagger" data-reveal-item="0">
            <button
              onClick={() => setConsultationOpen(true)}
              className="px-8 py-3 bg-white text-[#005B44] rounded-lg hover:bg-[#005B44] hover:text-white border-2 border-white transition duration-300 font-semibold"
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
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container">
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
                <a href="#" className="text-gray-400 hover:text-white transition mb-4 block">CJ프레시웨이 홈페이지 바로가기 ‣</a>
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
      {consultationOpen && <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />}
      {materialOpen && <MaterialRequestModal onClose={() => setMaterialOpen(false)} />}

      {/* Floating Action Buttons */}
      <FloatingActionButtons />

      {/* Service Recommendation Chatbot */}
      <ServiceRecommendationChatbot />
    </div>
  );
}
