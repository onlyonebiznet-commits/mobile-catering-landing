'use client';

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

  // Auto-rotate banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDietIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (location === "/thank-you") {
    return <ThankYouPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Integrated Header */}
      <section className="relative h-screen overflow-hidden">
        {/* Banner Carousel Background */}
        <div className="absolute inset-0">
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
          ].map((banner, idx) => {
            const isActive = idx === currentDietIndex % 3;
            return (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}
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
            );
          })}
        </div>

        {/* Fixed Header */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-16 py-2 md:py-0">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-lg md:text-xl">이동형 F&B 서비스</span>
              </div>
              
              {/* Desktop Menu */}
              <nav className="hidden md:flex gap-8">
                <a href="#services" className="text-white hover:text-white/80 transition">서비스</a>
                <a href="#diet" className="text-white hover:text-white/80 transition">식단</a>
                <a href="#process" className="text-white hover:text-white/80 transition">프로세스</a>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/20 rounded-lg text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <button
                onClick={() => setConsultationOpen(true)}
                className="hidden md:block px-6 py-2 bg-white text-[#005B44] rounded-lg hover:bg-white/90 border-2 border-white transition duration-300 font-semibold"
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

      {/* Rest of the page content continues here */}
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

      {/* Modals */}
      {consultationOpen && <ConsultationModal onClose={() => setConsultationOpen(false)} />}
      {materialOpen && <MaterialRequestModal onClose={() => setMaterialOpen(false)} />}
    </div>
  );
}
