import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Leaf, Heart, Shield, Clock, Users, TrendingUp, Coffee, Utensils, Zap } from "lucide-react";
import { useState } from "react";
import ConsultationModal from "@/components/ConsultationModal";
import MaterialRequestModal from "@/components/MaterialRequestModal";

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
                  지금 상담받기 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10" onClick={() => setMaterialRequestOpen(true)}>
                  자료 다운로드
                </Button>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/manus-storage/header-office-meal_34bf8ce8.png" 
                alt="프레시밀온 서비스" 
                className="w-full h-auto object-cover"
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

      {/* Kitchenless Meal Solutions Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              키친리스 밀솔루션
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              공간 효율성과 다양한 니즈를 모두 충족하는 프레시밀온의 3가지 솔루션
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "프레시밀온",
                subtitle: "이동형 밀솔루션",
                description: "최소한의 공간",
                features: ["이동형 푸드트럭 운영", "신선한 한끼 식사 제공", "공간 제약 없음", "빠른 배포"],
                icon: Utensils,
                bgColor: "bg-blue-50",
              },
              {
                title: "슈퍼그로틴",
                subtitle: "수제 간편식 밀솔루션",
                description: "트렌디한 건강메뉴",
                features: ["고단백 메뉴 구성", "건강한 간편식", "다양한 선택지", "영양 관리"],
                icon: TrendingUp,
                bgColor: "bg-green-50",
              },
              {
                title: "스낵픽&카페",
                subtitle: "맞춤형 밀솔루션",
                description: "임직원 취향저격",
                features: ["간식 & 카페 운영", "24시간 무인 서비스", "취향 맞춤 구성", "휴식 공간 제공"],
                icon: Coffee,
                bgColor: "bg-orange-50",
              },
            ].map((solution, idx) => {
              const Icon = solution.icon;
              return (
                <div key={idx} className={`${solution.bgColor} p-8 rounded-xl border border-border space-y-4 hover:shadow-lg transition-shadow`}>
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{solution.title}</h3>
                    <p className="text-sm text-primary font-semibold">{solution.subtitle}</p>
                    <p className="text-sm text-muted-foreground">{solution.description}</p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-border/50">
                    {solution.features.map((feature, featureIdx) => (
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

      {/* Service Overview Section */}
      <section id="service" className="py-16 md:py-24 bg-secondary/40">
        <div className="container space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              운영부터 품질까지 모두 책임집니다
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              신선함과 안전성을 최우선으로 하는 프레시밀온의 핵심 서비스
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "위생 & 안전 관리",
                description: "HACCP 인증 시설에서 엄격한 위생 기준을 준수하며 정기적인 품질 검사를 실시합니다",
                features: ["HACCP 인증", "정기 품질 검사", "냉장 배송", "위생 교육"],
              },
              {
                icon: Heart,
                title: "맞춤형 메뉴 개발",
                description: "기업의 특성과 직원의 취향을 반영한 맞춤형 메뉴를 개발하고 지속적으로 개선합니다",
                features: ["맞춤 메뉴 개발", "영양 관리", "알레르기 대응", "계절 메뉴"],
              },
              {
                icon: Clock,
                title: "신속한 배송 & 수거",
                description: "정해진 시간에 신선한 식사를 배송하고 빠르게 수거하여 위생을 유지합니다",
                features: ["정시 배송", "신속 수거", "온도 관리", "신선도 보장"],
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="space-y-4 p-6 rounded-xl bg-white border border-border hover:shadow-lg transition-shadow">
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
      <section className="py-16 md:py-24 bg-white">
        <div className="container space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              고객 특성에 맞춘 식단
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              기업, 산업체, 병원 등 다양한 환경에 최적화된 식단을 제공합니다
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
      <section id="menu" className="py-16 md:py-24 bg-secondary/40">
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
                description: "영양 균형 맞춘 한끼",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-example-korean-set.png",
                items: ["소불고기", "계란말이", "나물"],
              },
              {
                title: "건강 보울",
                description: "트렌디한 웰빙 식단",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-example-healthy-bowl.png",
                items: ["퀴노아", "닭가슴살", "채소"],
              },
            ].map((meal, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden bg-white border border-border hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden bg-secondary">
                  <img src={meal.image} alt={meal.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-4">
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

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "신선한 식재료 입고",
                description: "매일 엄선된 신선한 식재료를 입고하여 품질을 확보합니다",
              },
              {
                step: "02",
                title: "위생적 조리",
                description: "HACCP 인증 시설에서 위생 기준을 준수하여 조리합니다",
              },
              {
                step: "03",
                title: "냉장 배송",
                description: "신선도를 유지하며 정해진 시간에 배송합니다",
              },
              {
                step: "04",
                title: "신속한 수거",
                description: "식사 후 빠르게 수거하여 위생을 유지합니다",
              },
            ].map((process, idx) => (
              <div key={idx} className="space-y-4 p-6 rounded-xl bg-secondary/40 border border-border text-center">
                <div className="text-4xl font-bold text-primary">{process.step}</div>
                <h3 className="text-lg font-bold text-foreground">{process.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Logos Section */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              함께하는 고객사
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              국내 주요 기업들이 프레시밀온을 신뢰하고 있습니다
            </p>
          </div>

          <div className="grid md:grid-cols-6 gap-8 items-center justify-items-center">
            {[
              { name: "Samsung", logo: "삼성" },
              { name: "SK Hynix", logo: "SK하이닉스" },
              { name: "LG", logo: "LG" },
              { name: "Krafton", logo: "크래프톤" },
              { name: "Hyundai", logo: "현대" },
              { name: "Incheon Airport", logo: "인천공항" },
            ].map((company, idx) => (
              <div key={idx} className="w-full h-20 bg-white rounded-lg border border-border flex items-center justify-center hover:shadow-md transition-shadow">
                <span className="text-sm font-semibold text-muted-foreground">{company.logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              고객 후기
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              프레시밀온을 이용하는 고객들의 만족도를 확인해보세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                company: "테크 스타트업",
                name: "김 이사",
                rating: 5,
                comment: "직원들의 만족도가 눈에 띄게 높아졌습니다. 신선하고 맛있는 식사가 업무 능률 향상에 큰 도움이 됩니다.",
              },
              {
                company: "제조업체",
                name: "이 과장",
                rating: 5,
                comment: "현장 직원들을 위한 든든한 한끼가 정말 좋습니다. 운영도 간편하고 위생 관리도 철저해서 신뢰할 수 있습니다.",
              },
              {
                company: "병원",
                name: "박 원장",
                rating: 5,
                comment: "환자들의 회복에 필요한 영양 관리를 전문적으로 해주셔서 감사합니다. 맞춤형 메뉴 개발도 만족스럽습니다.",
              },
            ].map((review, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-secondary/50 border border-border space-y-4">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                <div className="pt-4 border-t border-border/50">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              자주 묻는 질문
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              프레시밀온에 대해 궁금한 점을 확인해보세요
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
              <div key={idx} className="p-5 rounded-xl bg-white border border-border space-y-3">
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
      
      {/* Material Request Modal */}
      <MaterialRequestModal open={materialRequestOpen} onOpenChange={setMaterialRequestOpen} />
    </div>
  );
}
