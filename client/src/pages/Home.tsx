import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Leaf, Heart, Shield, Clock, Users, TrendingUp, Coffee, Utensils, Zap } from "lucide-react";
import { useState } from "react";
import ConsultationModal from "@/components/ConsultationModal";

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
            <a href="#pricing" className="text-sm text-foreground hover:text-primary transition-colors">
              가격
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
      <section className="py-16 md:py-24 overflow-hidden bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                  신뢰할 수 있는 이동형 밀솔루션
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                직원 복지의 새로운 기준
                <span className="text-primary"> 프레시밀온</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                공간 제약 없이 신선하고 건강한 식사를 제공하세요. 프레시밀온은 기업의 특성에 맞춘 맞춤형 식단으로 직원 만족도를 높이고 기업의 성장을 이끌어냅니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" onClick={() => setConsultationOpen(true)}>
                  지금 상담받기 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-border hover:bg-secondary">
                  자료 다운로드
                </Button>
              </div>
            </div>
            <div className="relative h-96 md:h-full animate-fade-in-delayed">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/hero-meal-delivery-XPTkxbCqjLtzsXEpu5rM9o.webp"
                alt="프레시밀온 서비스"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
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
              { stat: "20+", label: "년 이상의 급식 운영 경험" },
              { stat: "1,000+", label: "일일 제공 식수" },
              { stat: "100+", label: "사업장 운영 중" },
              { stat: "99%", label: "고객 만족도" },
            ].map((item, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">{item.stat}</div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Overview Section */}
      <section id="service" className="py-16 md:py-24 bg-white">
        <div className="container space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              운영부터 품질까지 모두 책임집니다
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              20년 이상의 경험을 바탕으로 기업의 특성에 맞춘 최고 수준의 서비스를 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Utensils,
                title: "맞춤형 식단 설계",
                description: "연령대, 업무 강도, 국적 등을 고려한 책임 영양사의 전문 식단 관리",
                features: ["월별 신메뉴 개발", "영양 균형 관리", "특식 대응"],
              },
              {
                icon: Shield,
                title: "철저한 위생 관리",
                description: "HACCP 기준의 체계적인 위생 관리로 매일 안심할 수 있는 식사 제공",
                features: ["6대 대기업 물류", "DRY SYSTEM", "정기 방역"],
              },
              {
                icon: Heart,
                title: "세심한 서비스",
                description: "3인 관리 체계와 일일 만족도 조사로 지속적인 서비스 개선",
                features: ["3인 관리 체계", "CS 교육", "피드백 시스템"],
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="space-y-4 p-6 rounded-xl bg-secondary/50 border border-border hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  <ul className="space-y-2 pt-2">
                    {item.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customized Menu Section */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              고객 특성에 맞춘 식단
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              기업, 산업체, 병원, 학교 등 다양한 환경에 최적화된 식단을 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "기업 (오피스)",
                description: "임직원의 업무 집중도와 컨디션 관리에 초점을 둔 식단",
                icon: Users,
                benefits: ["업무 능률 향상", "에너지 충전", "건강 관리"],
              },
              {
                title: "산업체 (현장)",
                description: "활동량이 많은 근무 환경에 맞춘 든든한 식단",
                icon: Zap,
                benefits: ["포만감 충전", "에너지 공급", "체력 관리"],
              },
              {
                title: "병원",
                description: "환자의 상태와 치료 과정을 고려한 과학적 메뉴 설계",
                icon: Heart,
                benefits: ["회복 지원", "영양 관리", "특식 대응"],
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="space-y-4 p-6 rounded-xl bg-white border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.benefits.map((benefit, benefitIdx) => (
                      <span key={benefitIdx} className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meal Gallery Section */}
      <section id="menu" className="py-16 md:py-24 bg-white">
        <div className="container space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              실제 운영 중인 식단
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              한식부터 중식, 일식, 양식까지 다양한 메뉴를 만나보세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "강릉 초당순두부",
                description: "고객사 맞춤 식단",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-example-gangneung.png",
                items: ["우육수밥", "우전", "강릉초당순두부"],
              },
              {
                title: "한식 정식",
                description: "전통 한식 메뉴",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-example-korean-set-c2rTF8o2ppuiUAKpmki7Dn.webp",
                items: ["쇠고기 구이", "된장국", "계란말이"],
              },
              {
                title: "건강 보울",
                description: "영양 균형 식단",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-example-healthy-bowl-SN9RN2jJjcLNNSCdJKauSV.webp",
                items: ["퀴노아", "그릴 치킨", "신선 채소"],
              },
            ].map((meal, idx) => (
              <div key={idx} className="space-y-4 rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow bg-white">
                <div className="h-56 bg-gray-200 overflow-hidden">
                  <img src={meal.image} alt={meal.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{meal.title}</h3>
                    <p className="text-sm text-muted-foreground">{meal.description}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium">포함 메뉴</p>
                    <div className="flex flex-wrap gap-2">
                      {meal.items.map((item, itemIdx) => (
                        <span key={itemIdx} className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl bg-secondary/50 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-5">추가 서비스</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Coffee,
                  title: "커피 & 카페",
                  description: "머신 렌탈과 원두 구독으로 휴식 공간 조성",
                },
                {
                  icon: Utensils,
                  title: "TO-GO 코너",
                  description: "줄 서지 않고 즐기는 취향 맞춤 간편식",
                },
                {
                  icon: Clock,
                  title: "24시간 무인 운영",
                  description: "간식부터 간편식까지 언제든 즐길 수 있는 서비스",
                },
              ].map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div key={idx} className="space-y-3">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-foreground">{service.title}</h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-secondary/40">
        <div className="container space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              합리적인 가격 정책
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              기업 규모와 운영 방식에 맞춘 맞춤형 견적을 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "기본 플랜",
                description: "소규모 기업 맞춤",
                items: ["밥류 1종", "국류 1종", "메인메뉴", "반찬 4종"],
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-quality-showcase-SFdK2CCmBM3iiDzfeYjHJR.webp",
              },
              {
                name: "표준 플랜",
                description: "중규모 기업 추천",
                items: ["밥류 1종", "국류 1종", "메인메뉴", "반찬 5종"],
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-quality-showcase-SFdK2CCmBM3iiDzfeYjHJR.webp",
                featured: true,
              },
              {
                name: "프리미엄 플랜",
                description: "대규모 기업 맞춤",
                items: ["별도 협의", "고객 맞춤형", "스페셜 구성"],
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-quality-showcase-SFdK2CCmBM3iiDzfeYjHJR.webp",
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl overflow-hidden transition-all ${
                  plan.featured ? "ring-2 ring-primary shadow-lg" : "border border-border"
                }`}
              >
                <div className="h-44 bg-gray-200 overflow-hidden">
                  <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 space-y-4 bg-white">
                  {plan.featured && (
                    <div className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                      인기 상품
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {plan.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.featured
                        ? "bg-primary hover:bg-primary/90 text-white"
                        : "bg-secondary hover:bg-secondary/80 text-foreground"
                    }`}
                  >
                    견적 문의하기
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl bg-white border border-border text-center">
            <p className="text-muted-foreground">
              최소 식수 제한이 없으며, 6대 대기업 물류 사용으로 <span className="font-bold text-foreground">약 8% 저렴한 가격</span>을 제공합니다
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 md:py-24 bg-white">
        <div className="container space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              신선함을 보장하는 프로세스
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              입고부터 수거까지 4단계 프로세스로 최고의 품질을 유지합니다
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-5">
            {[
              {
                step: "01",
                title: "입고 & 조리",
                time: "AM 6 ~ 10",
                description: "신선한 당일 배송 재료 검수와 맛있는 식사 조리",
              },
              {
                step: "02",
                title: "적온배송",
                time: "AM 10 ~ 11",
                description: "따뜻함과 신선함을 유지한 적온 배송",
              },
              {
                step: "03",
                title: "식사제공",
                time: "PM 12 ~ 13",
                description: "고객의 환경에 맞춘 식사 세팅과 맛있는 식사 제공",
              },
              {
                step: "04",
                title: "수거 & 세척",
                time: "PM 15 ~ 16",
                description: "전문 세척 업체와의 제휴로 철저한 위생 관리",
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="space-y-1 flex-1">
                    <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                    <p className="text-xs text-primary font-medium">{item.time}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {idx < 3 && <div className="hidden md:block h-0.5 bg-primary/20 mt-4" />}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/process-workflow-visual-KajPJtLGMnkJ8pcNRu3eLy.webp"
              alt="프로세스 워크플로우"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              고객 후기
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              프레시밀온을 이용하고 있는 고객사의 생생한 후기를 들어보세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "김진수",
                company: "테크 스타트업 A사",
                role: "HR 담당자",
                content: "프레시밀온 도입 후 직원들의 만족도가 크게 높아졌습니다. 특히 신선하고 건강한 식사가 직원 복지의 핵심이 되었습니다.",
              },
              {
                name: "이미영",
                company: "금융회사 B사",
                role: "복지 담당자",
                content: "공간 제약이 많았던 우리 회사에서도 프레시밀온으로 직원 식사 복지를 제공할 수 있게 되었습니다. 정말 감사합니다.",
              },
              {
                name: "박준호",
                company: "제조업체 C사",
                role: "경영진",
                content: "직원들이 충분한 휴식 시간을 가질 수 있게 되었고, 그 결과 업무 생산성도 향상되었습니다. 최고의 선택입니다.",
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white border border-border space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary">★</span>
                  ))}
                </div>
                <p className="text-foreground italic text-sm">"{testimonial.content}"</p>
                <div className="pt-4 border-t border-border">
                  <p className="font-bold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              자주 묻는 질문
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              프레시밀온에 대해 궁금한 점들을 확인해보세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              {
                q: "최소 몇 명부터 운영이 가능한가요?",
                a: "최소 식수 제한은 없습니다. 현장 규모와 운영 환경을 종합적으로 검토해 맞춤 컨설팅을 제공하며, 식수 규모에 따라 합리적인 단가를 안내해 드립니다.",
              },
              {
                q: "식단가는 얼마인가요?",
                a: "식수 규모와 하루 제공 횟수, 운영 방식에 따라 상이하며 현장 여건을 고려해 맞춤형으로 제안해 드립니다.",
              },
              {
                q: "주방 컨설팅 및 투자가 가능한가요?",
                a: "가능합니다. 신축 및 리모델링 현장 모두 컨설팅이 가능하며, 현장 상황에 따라 주방 설비 투자도 협의 후 진행할 수 있습니다.",
              },
              {
                q: "운영 가능 지역은 어디까지인가요?",
                a: "지역 제한 없이 전국 운영이 가능합니다.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-secondary/50 border border-border space-y-3">
                <h4 className="font-bold text-foreground">{faq.q}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            직원 복지의 새로운 기준을 경험하세요
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            신선하고 건강한 식사로 직원 만족도를 높이고, 기업의 성장을 이끌어내세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={() => setConsultationOpen(true)}>
              지금 상담받기 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              자료 다운로드
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-white">
        <div className="container space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">프레시밀온</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Food Business Partner Creating the success way
              </p>
              <a href="https://www.cjfreshway.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                CJ프레시웨이 홈페이지 바로가기 ‣
              </a>
            </div>
            <div className="space-y-3 text-sm text-white/70">
              <div>
                <p className="text-white font-semibold mb-2">회사 정보</p>
                <p>상호명 : 씨제이프레시웨이 주식회사</p>
                <p>대표자 : 이건일</p>
                <p>사업자등록번호 : 603-81-11270</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">연락처</p>
                <p>대표전화 : 02-2149-6114</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">주소</p>
                <p>경기도 용인시 기흥구 기곡로 32(하갈동)</p>
                <p className="text-xs mt-1">(주사무소: 서울시 마포구 월드컵북로 54길 25 S-city)</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
              <p>Copyright ⓒ CJ Freshway. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">개인정보 처리방침</a>
                <a href="#" className="hover:text-white transition-colors">이용약관</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Consultation Modal */}
      <ConsultationModal open={consultationOpen} onOpenChange={setConsultationOpen} />
    </div>
  );
}
