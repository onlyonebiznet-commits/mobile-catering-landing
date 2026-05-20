import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Leaf, Heart, Shield, Clock, Users, TrendingUp } from "lucide-react";
import { useState } from "react";

/**
 * Design Philosophy: Contemporary Minimalism with Functional Elegance
 * - Clean white background with dark green accents (#1B7F4A)
 * - Asymmetric layouts (left text + right image) for dynamic feel
 * - Ample whitespace for breathing room
 * - Pretendard typography for modern, professional look
 * - Smooth animations and transitions (200-300ms)
 */

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

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
            <a href="#benefits" className="text-sm text-foreground hover:text-primary transition-colors">
              서비스 소개
            </a>
            <a href="#features" className="text-sm text-foreground hover:text-primary transition-colors">
              핵심 가치
            </a>
            <a href="#pricing" className="text-sm text-foreground hover:text-primary transition-colors">
              가격 정책
            </a>
            <a href="#process" className="text-sm text-foreground hover:text-primary transition-colors">
              프로세스
            </a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            문의하기
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                  새로운 복지문화
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                이동형 밀솔루션
                <span className="text-primary"> 프레시밀온</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                공간의 제약을 넘어 맞춤형 영양까지 담은 이동형 밀솔루션으로 직원 복지를 혁신하세요. 신선하고 건강한 식사로 직원 만족도를 높이고 기업의 성장을 이끌어냅니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  지금 시작하기 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-border hover:bg-secondary">
                  자세히 알아보기
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
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { stat: "90%", label: "직장인이 회사 복지를 이직 고려 요소로 생각" },
              { stat: "77%", label: "차별화된 복지는 높은 연봉만큼 중요" },
              { stat: "77%", label: "복지제도가 직장생활 지속에 영향" },
              { stat: "89%", label: "복지제도의 수준이 중요한 고려대상" },
            ].map((item, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">{item.stat}</div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems & Solutions Section */}
      <section id="benefits" className="py-20 md:py-32">
        <div className="container space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              사내식당 조성의 현실적 문제
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              프레시밀온이 해결해주는 3가지 핵심 문제
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "공간적 제약",
                problem: "사내식당으로 사용할 공간이 없는 회사가 대부분",
                solution: "영업신고 NO! 최소한의 공간만 필요",
              },
              {
                icon: TrendingUp,
                title: "비용적 제약",
                problem: "식당 조성에 필요한 공사비/설비 구매비 등 높은 비용 필요",
                solution: "시설투자 없이 고품질의 식사 제공",
              },
              {
                icon: Users,
                title: "시간적 제약",
                problem: "외부식당 이동 및 대기로 휴식시간 부족",
                solution: "기다림 없는 식사 충분한 휴식 보장",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="space-y-4 p-6 rounded-xl bg-secondary/50 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">문제</p>
                      <p className="text-sm text-foreground">{item.problem}</p>
                    </div>
                    <div className="pt-2 border-t border-border">
                      <p className="text-sm text-muted-foreground font-medium">솔루션</p>
                      <p className="text-sm text-primary font-medium">{item.solution}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-secondary/30">
        <div className="container space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              프레시밀온의 핵심 가치
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              맛, 건강, 안전을 모두 담은 이동형 밀솔루션
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "맛과 편리",
                description: "메뉴 고민 없이 양질의 다양한 메뉴를 회사 안에서 즐길 수 있습니다.",
                tags: ["빠른식사", "집밥같은식사", "간편식까지"],
              },
              {
                icon: Leaf,
                title: "건강한 식사",
                description: "급식 전문가가 제공하는 균형잡힌 영양 식사로 직원 건강을 챙깁니다.",
                tags: ["전문밀플랜", "영양노하우"],
              },
              {
                icon: Shield,
                title: "식품 안전",
                description: "신선한 당일제조와 적온 배송, Cold System으로 최고의 품질을 보장합니다.",
                tags: ["자체HACCP", "고품질식자재"],
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="space-y-4 p-8 rounded-xl bg-white border border-border hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-accent rounded-lg flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {item.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meal Plans Section */}
      <section id="pricing" className="py-20 md:py-32">
        <div className="container space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              맞춤형 밀플랜
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              3가지 가격정책으로 원하는대로 선택하세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "CUSTOM MEAL PLAN",
                description: "기본 구성",
                items: ["밥류 1종", "국류 1종", "메인메뉴", "반찬 4종"],
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-quality-showcase-SFdK2CCmBM3iiDzfeYjHJR.webp",
              },
              {
                name: "FLEX MEAL PLAN",
                description: "추천 구성",
                items: ["밥류 1종", "국류 1종", "메인메뉴", "반찬 5종"],
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-quality-showcase-SFdK2CCmBM3iiDzfeYjHJR.webp",
                featured: true,
              },
              {
                name: "SPECIAL MEAL PLAN",
                description: "맞춤형 구성",
                items: ["별도 협의", "고객 맞춤형", "스페셜 밀플랜"],
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-quality-showcase-SFdK2CCmBM3iiDzfeYjHJR.webp",
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl overflow-hidden transition-all ${
                  plan.featured ? "ring-2 ring-primary shadow-lg" : "border border-border"
                }`}
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-4">
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
                    문의하기
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 md:py-32 bg-secondary/30">
        <div className="container space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              딜리버리 제공 프로세스
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              신선함과 품질을 보장하는 4단계 프로세스
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
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
                description: "세척 업체 뽀득과의 제휴를 통한 철저한 위생 지속 관리",
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-bold text-foreground">{item.title}</h3>
                    <p className="text-xs text-primary font-medium">{item.time}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {idx < 3 && <div className="hidden md:block h-0.5 bg-primary/20 mt-6" />}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/process-workflow-visual-KajPJtLGMnkJ8pcNRu3eLy.webp"
              alt="프로세스 워크플로우"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-20 md:py-32">
        <div className="container space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              고객 후기
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              프레시밀온을 이용하고 있는 고객사의 생생한 후기를 들어보세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
              <div key={idx} className="p-6 rounded-xl bg-secondary/50 border border-border space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary">★</span>
                  ))}
                </div>
                <p className="text-foreground italic">"{testimonial.content}"</p>
                <div className="pt-4 border-t border-border">
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-white">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            프레시밀온으로 직원 복지를 혁신하세요
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            신선하고 건강한 식사로 직원 만족도를 높이고, 기업의 성장을 이끌어내세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
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
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">프레시밀온</span>
              </div>
              <p className="text-sm text-white/70">
                이동형 밀솔루션으로 새로운 복지문화를 만들어갑니다.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">서비스</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">프레시밀온</a></li>
                <li><a href="#" className="hover:text-white transition-colors">스낵픽</a></li>
                <li><a href="#" className="hover:text-white transition-colors">카페프레시</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">회사</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">소개</a></li>
                <li><a href="#" className="hover:text-white transition-colors">채용</a></li>
                <li><a href="#" className="hover:text-white transition-colors">뉴스</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">연락처</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>📞 1234-5678</li>
                <li>📧 info@freshmealon.com</li>
                <li>📍 서울시 강남구</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/70">
            <p>&copy; 2024 프레시밀온. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
