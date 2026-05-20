import { useState } from "react";
import ConsultationModal from "@/components/ConsultationModal";
import MaterialRequestModal from "@/components/MaterialRequestModal";
import { Button } from "@/components/ui/button";
import { Leaf, Heart, Shield, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

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
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [materialRequestOpen, setMaterialRequestOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

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

      {/* Kitchen-less Meal Solutions Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            키친리스 밀솔루션
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "프레시밀온",
                keyword: "최소한의 공간, 이동형 밀솔루션",
                description: "공간 제약 없이 신선한 식사를 제공합니다",
                features: ["신선한 재료", "빠른 배송", "맞춤형 메뉴"]
              },
              {
                title: "슈퍼그로틴",
                keyword: "트렌디한 건강메뉴, 수제 간편식",
                description: "건강과 맛을 동시에 만족시킵니다",
                features: ["고단백 식단", "건강식", "간편식"]
              },
              {
                title: "스낵픽&카페",
                keyword: "임직원 취향저격, 맞춤형 밀솔루션",
                description: "직원들의 취향을 반영한 서비스입니다",
                features: ["간식 제공", "카페 서비스", "맞춤 구성"]
              }
            ].map((solution, idx) => (
              <div key={idx} className="p-8 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors space-y-4">
                <h3 className="text-2xl font-bold text-primary">{solution.title}</h3>
                <p className="text-sm font-semibold text-foreground">{solution.keyword}</p>
                <p className="text-muted-foreground">{solution.description}</p>
                <div className="space-y-2">
                  {solution.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 rounded" checked disabled />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Characteristics Section */}
      <section id="service" className="py-16 md:py-24 bg-secondary/40">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            고객 특성에 맞춘 식단
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "오피스",
                description: "다양한 직급과 취향을 고려한 균형잡힌 식단",
                tags: ["신선함", "다양성", "영양균형"],
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/corporate-meal-bg-kaE7ss6sP9NVoKZndD8oRb.webp"
              },
              {
                title: "산업체",
                description: "에너지 충전이 필요한 근로자를 위한 푸짐한 식단",
                tags: ["고칼로리", "푸짐함", "에너지"],
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/factory-meal-bg-kaE7ss6sP9NVoKZndD8oRb.webp"
              },
              {
                title: "병원",
                description: "환자와 직원을 위한 건강하고 위생적인 식단",
                tags: ["위생", "건강식", "영양"],
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/hospital-meal-bg-kaE7ss6sP9NVoKZndD8oRb.webp"
              }
            ].map((category, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 bg-white space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.tags.map((tag, tidx) => (
                      <span key={tidx} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
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

      {/* Menu Gallery Section */}
      <section id="menu" className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            실제 운영중인 식단
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "강릉 초당순두부",
                description: "신선한 두부와 정통 양념으로 만든 건강식",
                tags: ["건강식", "전통", "신선함"],
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-example-korean-set-kaE7ss6sP9NVoKZndD8oRb.webp"
              },
              {
                name: "한식 정식",
                description: "밥, 국, 반찬으로 구성된 정통 한식 정식",
                tags: ["정통", "영양", "한식"],
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-example-korean-set-kaE7ss6sP9NVoKZndD8oRb.webp"
              },
              {
                name: "건강 보울",
                description: "신선한 채소와 단백질로 만든 영양 만점 보울",
                tags: ["건강", "영양", "채식"],
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/meal-example-healthy-bowl-kaE7ss6sP9NVoKZndD8oRb.webp"
              }
            ].map((menu, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={menu.image} alt={menu.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 bg-white space-y-4">
                  <h3 className="text-xl font-bold text-foreground">{menu.name}</h3>
                  <p className="text-muted-foreground text-sm">{menu.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {menu.tags.map((tag, tidx) => (
                      <span key={tidx} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
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
                title: "신선한 재료 입고",
                description: "매일 아침 신선한 재료를 엄선하여 입고합니다",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/process-step1-bg-kaE7ss6sP9NVoKZndD8oRb.webp"
              },
              {
                step: "2",
                title: "정성스러운 조리",
                description: "숙련된 셰프가 정성스럽게 조리합니다",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/process-step2-bg-kaE7ss6sP9NVoKZndD8oRb.webp"
              },
              {
                step: "3",
                title: "위생 관리",
                description: "엄격한 위생 기준으로 안전성을 보장합니다",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/process-step3-bg-kaE7ss6sP9NVoKZndD8oRb.webp"
              },
              {
                step: "4",
                title: "신속한 배송",
                description: "신선도를 유지하며 빠르게 배송합니다",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/process-step4-bg-kaE7ss6sP9NVoKZndD8oRb.webp"
              }
            ].map((process, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-40 overflow-hidden relative">
                  <img src={process.image} alt={process.title} className="w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-bold text-white">{process.step}</span>
                  </div>
                </div>
                <div className="p-4 bg-white space-y-2">
                  <h3 className="text-lg font-bold text-foreground">{process.title}</h3>
                  <p className="text-sm text-muted-foreground">{process.description}</p>
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
                company: "테크 스타트업",
                rating: 5,
                comment: "프레시밀온 덕분에 직원들의 만족도가 크게 높아졌습니다. 매일 다양한 메뉴가 제공되어 좋습니다."
              },
              {
                name: "이영희",
                company: "제조업체",
                rating: 5,
                comment: "신선하고 맛있는 식사가 근로자들의 에너지를 충전해줍니다. 강력 추천합니다!"
              },
              {
                name: "박준호",
                company: "의료기관",
                rating: 5,
                comment: "위생 관리가 철저하고 영양 균형이 잘 맞춰져 있어서 환자와 직원 모두 만족합니다."
              }
            ].map((review, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-border bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.company}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            자주 묻는 질문
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                question: "프레시밀온 서비스는 어떻게 신청하나요?",
                answer: "상단의 '지금 상담받기' 버튼을 클릭하여 상담 신청 폼을 작성하시면, 담당자가 빠르게 연락드립니다."
              },
              {
                question: "최소 주문 식수는 몇 명부터 가능한가요?",
                answer: "기업 규모와 상황에 따라 유연하게 대응하고 있습니다. 상담 시 자세히 설명해드리겠습니다."
              },
              {
                question: "메뉴는 얼마나 자주 바뀌나요?",
                answer: "매주 새로운 메뉴를 제공하여 직원들이 다양한 식사를 즐길 수 있습니다."
              },
              {
                question: "배송 지역에 제한이 있나요?",
                answer: "전국 대부분의 지역에서 서비스를 제공하고 있습니다. 자세한 내용은 상담 시 확인해주세요."
              },
              {
                question: "식품 알레르기 대응이 가능한가요?",
                answer: "네, 직원들의 알레르기 정보를 미리 파악하여 맞춤형 메뉴를 제공합니다."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-border rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-semibold text-foreground text-left">{faq.question}</span>
                  {expandedFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 border-t border-border bg-secondary/20">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            프레시밀온과 함께 직원 복지를 높이세요
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            20년 이상의 경험과 신뢰로 1,000명 이상의 직원 식사를 책임지고 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={() => setConsultationOpen(true)}>
              지금 상담받기
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => setMaterialRequestOpen(true)}>
              자료 다운로드
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            {/* Left: Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">프레시밀온</span>
              </div>
              <p className="text-sm text-white/70">Food Business Partner Creating the success way</p>
              <div className="space-y-2 text-sm text-white/70">
                <p><strong>상호명:</strong> 씨제이프레시웨이 주식회사</p>
                <p><strong>대표자:</strong> 이건일</p>
                <p><strong>사업자등록번호:</strong> 603-81-11270</p>
                <p><strong>대표전화:</strong> 02-2149-6114</p>
                <p><strong>주소:</strong> 경기도 용인시 기흥구 기곡로 32(하갈동)</p>
                <p className="text-xs">(주사무소: 서울시 마포구 월드컵북로 54길 25 S-city)</p>
              </div>
            </div>

            {/* Center: Links */}
            <div className="space-y-4">
              <h3 className="font-bold text-white">빠른 링크</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#service" className="hover:text-white transition-colors">서비스</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">식단</a></li>
                <li><a href="#process" className="hover:text-white transition-colors">프로세스</a></li>
                <li>
                  <button onClick={() => setShowPrivacy(true)} className="hover:text-white transition-colors">
                    개인정보 처리방침
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowTerms(true)} className="hover:text-white transition-colors">
                    이용약관
                  </button>
                </li>
              </ul>
            </div>

            {/* Right: CJ Freshway */}
            <div className="space-y-4">
              <h3 className="font-bold text-white">CJ프레시웨이</h3>
              <a href="https://www.cjfreshway.com" target="_blank" rel="noopener noreferrer" className="inline-block text-sm text-primary hover:text-primary/80 transition-colors">
                CJ프레시웨이 홈페이지 바로가기 ›
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-sm text-white/60">
              Copyright © CJ Freshway. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">개인정보 처리방침</h2>
              <button onClick={() => setShowPrivacy(false)} className="text-2xl text-muted-foreground hover:text-foreground">
                ×
              </button>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>CJ프레시웨이㈜는 개인정보보호법을 준수하며, 고객님의 개인정보를 안전하게 관리합니다.</p>
              <p><strong>1. 수집하는 개인정보의 항목</strong></p>
              <p>성명, 휴대폰번호, 이메일주소, 기업명, 주소, 예상 식수</p>
              <p><strong>2. 개인정보의 수집 및 이용목적</strong></p>
              <p>이동급식 서비스 상담 및 진행, 서비스 홍보 등 마케팅</p>
              <p><strong>3. 개인정보의 보유 및 이용기간</strong></p>
              <p>서비스 상담 신청 후 3년</p>
              <p><strong>4. 개인정보 보호 책임자</strong></p>
              <p>대표전화: 02-2149-6114</p>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">이용약관</h2>
              <button onClick={() => setShowTerms(false)} className="text-2xl text-muted-foreground hover:text-foreground">
                ×
              </button>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p><strong>제1조 (목적)</strong></p>
              <p>본 약관은 CJ프레시웨이㈜가 제공하는 이동급식 서비스의 이용에 관한 기본적인 사항을 규정합니다.</p>
              <p><strong>제2조 (서비스의 제공)</strong></p>
              <p>회사는 고객의 요청에 따라 이동급식 서비스를 제공합니다.</p>
              <p><strong>제3조 (이용자의 의무)</strong></p>
              <p>이용자는 본 약관의 내용을 숙지하고 이를 준수해야 합니다.</p>
              <p><strong>제4조 (면책조항)</strong></p>
              <p>회사는 천재지변 등 불가항력적인 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.</p>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ConsultationModal open={consultationOpen} onOpenChange={setConsultationOpen} />
      <MaterialRequestModal open={materialRequestOpen} onOpenChange={setMaterialRequestOpen} />
    </div>
  );
}
