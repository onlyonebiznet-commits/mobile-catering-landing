import { CheckCircle2, Leaf, Heart, Shield, Clock, Users, TrendingUp, Coffee, Utensils, Zap, ChevronDown } from "lucide-react";
import { useState } from "react";
import ConsultationModal from "@/components/ConsultationModal";
import MaterialRequestModal from "@/components/MaterialRequestModal";
import { Button } from "@/components/ui/button";

/**
 * Design Philosophy: Contemporary Minimalism with Functional Elegance
 * - Clean white background with dark green accents (#1B7F4A)
 * - Asymmetric layouts (left text + right image) for dynamic feel
 * - Ample whitespace for breathing room
 * - Pretendard typography for modern, professional look
 * - Smooth animations and transitions (200-300ms)
 * 
 * Inspired by WeFun Corp's professional approach to corporate catering
 */

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [materialRequestOpen, setMaterialRequestOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">프레시밀온</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#service" className="text-sm text-foreground hover:text-primary transition-colors">
              서비스
            </a>
            <a href="#menu" className="text-sm text-foreground hover:text-primary transition-colors">
              식단
            </a>
            <a href="#process" className="text-sm text-foreground hover:text-primary transition-colors">
              프로세스
            </a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => setConsultationOpen(true)}>
            문의하기
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-28 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-accent rounded-full text-sm text-primary font-medium">
                신뢰할 수 있는 이동형 밀솔루션
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                직원 복지의 새로운 기준
                <br />
                <span className="text-primary">프레시밀온</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                공간 제약 없이 시작하고 건강한 식사를 제공하는 프레시밀온은 기업의 특성에 맞춘 맞춤 밀솔루션으로 직원 만족도를 높이고 기업의 성장을 이끌어냅니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" onClick={() => setConsultationOpen(true)}>
                  지금 상담받기
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10" onClick={() => setMaterialRequestOpen(true)}>
                  자료 다운로드
                </Button>
              </div>
            </div>
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/hero-background-full-kaE7ss6sP9NVoKZndD8oRb.webp" 
                alt="프레시밀온 서비스" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 md:py-16 bg-secondary/40">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "20+", label: "년 이상의 금식 운영 경험" },
              { number: "1,000+", label: "일일 제공 식수" },
              { number: "100+", label: "사업장 운영 중" },
              { number: "99%", label: "고객 만족도" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</p>
                <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Overview Section */}
      <section id="service" className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            프레시밀온의 핵심 가치
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "맛과 편리",
                description: "신선한 재료로 만든 맛있는 식사와 편리한 배송 서비스"
              },
              {
                icon: Leaf,
                title: "건강한 식사",
                description: "영양 균형을 고려한 맞춤형 메뉴로 직원 건강 관리"
              },
              {
                icon: Shield,
                title: "식품 안전",
                description: "엄격한 위생 관리와 신선도 보장 시스템"
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchen-less Meal Solutions Section */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            키친리스 밀솔루션
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "프레시밀온",
                subtitle: "최소한의 공간, 이동형 밀솔루션",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/fresh-meal-on-service-kJ8mKpNvhD9xQ2pL5rW8sT.webp"
              },
              {
                title: "슈퍼그로틴",
                subtitle: "트렌디한 건강메뉴, 수제 간편식 밀솔루션",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/super-grotin-service-aB3cD4eF5gH6iJ7kL8mN9o.webp"
              },
              {
                title: "스낵픽&카페",
                subtitle: "임직원 취향저격, 맞춤형 밀솔루션",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/snack-pick-cafe-service-pQ1rS2tU3vW4xY5zA6bC7d.webp"
              }
            ].map((solution, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <img 
                    src={solution.image} 
                    alt={solution.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-foreground mb-2">{solution.title}</h3>
                  <p className="text-sm text-muted-foreground">{solution.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operations to Quality Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            운영부터 품질까지
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "위생 & 안전 관리",
                description: "엄격한 위생 기준과 안전 관리 시스템으로 신선한 식사 보장"
              },
              {
                icon: Utensils,
                title: "맞춤형 메뉴 개발",
                description: "기업의 특성과 직원의 취향을 반영한 맞춤형 메뉴 개발"
              },
              {
                icon: Clock,
                title: "신속한 배송 & 수거",
                description: "정시 배송과 신속한 수거로 최적의 서비스 제공"
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Specific Meals Section */}
      <section id="menu" className="py-16 md:py-24 bg-secondary/40">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            고객 특성에 맞춘 식단
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "기업",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/corporate-meal-bg-fcjuhfqEdqdKhY6d6ymVBD.webp"
              },
              {
                title: "산업체",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/factory-meal-bg-iBPLXhB9XTZd9R9cW5pVxP.webp"
              },
              {
                title: "병원",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/hospital-meal-bg-kGYyoyz98J4bTjeFRVm65K.webp"
              }
            ].map((meal, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-64 bg-gray-200">
                  <img 
                    src={meal.image} 
                    alt={meal.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 bg-white text-center">
                  <h3 className="text-xl font-bold text-foreground">{meal.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meal Gallery Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            실제 운영 중인 식단
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "강릉초당순두부",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-example-korean-set-mN7oP8qR9sT0uV1wX2yZ3a.webp"
              },
              {
                name: "한식 정식",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-example-healthy-bowl-bC4dE5fG6hI7jK8lM9nO0p.webp"
              },
              {
                name: "건강 보울",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-quality-showcase-cQ2rS3tU4vW5xY6zA7bC8d.webp"
              }
            ].map((meal, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={meal.image} 
                  alt={meal.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white text-center">
                  <p className="text-sm font-semibold text-foreground">{meal.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 md:py-24 bg-secondary/40">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            신선함을 보장하는 프로세스
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "신선한 재료 준비",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/process-step1-bg-fRPRuXGRhDcBSYSgEpwKbm.webp"
              },
              {
                step: "2",
                title: "전문 조리",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/process-step2-bg-7542ij4CkzsLuBsjZ6QX8g.webp"
              },
              {
                step: "3",
                title: "품질 관리",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/process-step3-bg-hjCrHrfdVf4vTF3gZZn9w6.webp"
              },
              {
                step: "4",
                title: "신속한 배송",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/process-step4-bg-hMHMabC8ukezutCc7Z4qBG.webp"
              }
            ].map((process, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden shadow-lg h-64">
                <img 
                  src={process.image} 
                  alt={process.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                  <div className="text-5xl font-bold text-white mb-2">{process.step}</div>
                  <p className="text-white font-semibold text-center px-4">{process.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            고객 후기
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "김철수",
                company: "삼성전자",
                comment: "프레시밀온 도입 후 직원 만족도가 크게 높아졌습니다. 신선하고 맛있는 식사가 직원들의 업무 효율을 높이는 데 큰 도움이 됩니다.",
                icon: "👨‍💼"
              },
              {
                name: "이영희",
                company: "LG전자",
                comment: "다양한 메뉴와 정시 배송으로 식당 운영 걱정이 없어졌습니다. 프레시밀온 팀의 전문성과 성실함이 정말 인상적입니다.",
                icon: "👩‍💼"
              },
              {
                name: "박민준",
                company: "현대자동차",
                comment: "위생 관리와 품질이 최고 수준입니다. 직원들이 매일 즐거운 마음으로 식사하는 모습을 보면 프레시밀온을 선택한 것이 정말 잘한 결정이라고 생각합니다.",
                icon: "👨‍💻"
              }
            ].map((review, idx) => (
              <div key={idx} className="p-8 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="text-4xl mb-4">{review.icon}</div>
                <p className="text-muted-foreground mb-6 italic">"{review.comment}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "프레시밀온 서비스는 어떻게 시작하나요?",
                answer: "간단한 상담을 통해 귀사의 필요에 맞는 맞춤형 솔루션을 제안해드립니다. 상담 후 약 2주 내에 서비스를 시작할 수 있습니다."
              },
              {
                question: "최소 주문량이나 계약 기간이 있나요?",
                answer: "최소 일일 50명 이상의 식수부터 시작 가능하며, 계약 기간은 협의 가능합니다. 유연한 조건으로 귀사의 상황에 맞춰 진행됩니다."
              },
              {
                question: "메뉴는 얼마나 자주 바뀌나요?",
                answer: "주 1회 이상 메뉴가 변경되며, 계절 재료를 활용한 신선한 식단을 제공합니다. 특별한 요청사항이 있으면 언제든지 반영 가능합니다."
              },
              {
                question: "배송 지역에 제한이 있나요?",
                answer: "전국 대부분의 지역에 서비스를 제공하고 있습니다. 구체적인 배송 지역은 상담 시 확인해드립니다."
              },
              {
                question: "식품 알레르기 대응이 가능한가요?",
                answer: "네, 직원들의 알레르기 정보를 미리 파악하여 맞춤형 메뉴를 준비합니다. 안전한 식사 환경을 최우선으로 생각합니다."
              },
              {
                question: "가격은 어떻게 결정되나요?",
                answer: "일일 식수, 메뉴 구성, 배송 지역 등을 고려하여 맞춤형 견적을 제공합니다. 상담을 통해 최적의 가격을 안내해드립니다."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-secondary/20 transition-colors"
                >
                  <span className="font-semibold text-foreground text-left">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-primary transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-secondary/30 border-t border-border">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            지금 바로 상담받으세요
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            프레시밀온과 함께 직원 복지의 새로운 기준을 만들어보세요.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90" 
            onClick={() => setConsultationOpen(true)}
          >
            지금 상담받기
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 md:py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left: Company Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xl font-bold">프레시밀온</span>
              </div>
              <div className="space-y-3 text-sm text-white/80">
                <p>
                  <span className="font-semibold">상호명:</span> 씨제이프레시웨이 주식회사
                </p>
                <p>
                  <span className="font-semibold">대표자:</span> 이건일
                </p>
                <p>
                  <span className="font-semibold">사업자등록번호:</span> 603-81-11270
                </p>
                <p>
                  <span className="font-semibold">대표전화:</span> 02-2149-6114
                </p>
                <p>
                  <span className="font-semibold">주소:</span> 경기도 용인시 기흥구 기곡로 32(하갈동)
                </p>
                <p className="text-xs text-white/60">
                  (주사무소: 서울시 마포구 월드컵북로 54길 25 S-city)
                </p>
              </div>
            </div>

            {/* Right: Links */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">CJ프레시웨이</h3>
                <a href="https://www.cjfreshway.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  홈페이지 바로가기 ‣
                </a>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Food Business Partner</h3>
                <p className="text-white/80">Creating the success way</p>
              </div>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-white/80 hover:text-white transition-colors block">
                  개인정보 처리방침
                </a>
                <a href="#" className="text-white/80 hover:text-white transition-colors block">
                  이용약관
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <p className="text-center text-sm text-white/60">
              Copyright ⓒ CJ Freshway. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ConsultationModal open={consultationOpen} onOpenChange={setConsultationOpen} />
      <MaterialRequestModal open={materialRequestOpen} onOpenChange={setMaterialRequestOpen} />
    </div>
  );
}
