import { useState } from "react";
import ConsultationModal from "@/components/ConsultationModal";
import MaterialRequestModal from "@/components/MaterialRequestModal";
import { Button } from "@/components/ui/button";
import { Leaf, ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";

export default function Home() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [materialRequestOpen, setMaterialRequestOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [currentDietIndex, setCurrentDietIndex] = useState(0);
  const [currentMealIndex, setCurrentMealIndex] = useState(0);

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
      name: "한식 정식",
      description: "전통 한식의 맛과 영양을 담은 정성스러운 한끼",
      tags: ["한식", "정식", "영양균형"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/corporate-meal-carousel-f2DqeewL8p9QTRUu8jnzdS.webp",
    },
    {
      name: "건강 보울",
      description: "신선한 재료로 만든 균형잡힌 건강식",
      tags: ["건강식", "고단백", "신선"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/super-grotin-hero-EnkjTLPrRJAMgqDuTFtczr.webp",
    },
    {
      name: "카페 스낵",
      description: "오후의 피로를 풀어주는 가벼운 간식",
      tags: ["간식", "카페", "가벼운"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/snack-pick-cafe-hero-YEJTRmZZSYChfg3tUEFqPY.webp",
    },
  ];

  const kitchenlessSolutions = [
    {
      name: "프레시밀온",
      description: "최소한의 공간, 이동형 밀솔루션",
      details: "사무실, 공장, 병원 등 어디든 설치 가능한 이동형 밀솔루션",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/fresh-meal-on-hero-gBtqdgZs9PjFiB2wftstQz.webp",
    },
    {
      name: "슈퍼그로틴",
      description: "트렌디한 건강메뉴, 수제 간편식 밀솔루션",
      details: "건강을 추구하는 직원들을 위한 프리미엄 간편식",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/super-grotin-hero-EnkjTLPrRJAMgqDuTFtczr.webp",
    },
    {
      name: "스낵픽&카페",
      description: "임직원 취향저격, 맞춤형 밀솔루션",
      details: "커피, 간식, 음료 등 다양한 선택지 제공",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/snack-pick-cafe-hero-YEJTRmZZSYChfg3tUEFqPY.webp",
    },
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
      answer: "전국 주요 지역에 배송 가능합니다. 상담 시 지역별 배송 가능 여부를 확인해드립니다.",
    },
  ];

  const nextDiet = () => {
    setCurrentDietIndex((prev) => (prev + 1) % diets.length);
  };

  const prevDiet = () => {
    setCurrentDietIndex((prev) => (prev - 1 + diets.length) % diets.length);
  };

  const nextMeal = () => {
    setCurrentMealIndex((prev) => (prev + 1) % meals.length);
  };

  const prevMeal = () => {
    setCurrentMealIndex((prev) => (prev - 1 + meals.length) % meals.length);
  };

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

      {/* Hero Section - Full Width Image */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/hero-header-full-3cjYuMNLwgQdBpk4qCwgQR.webp"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="container">
            <div className="max-w-lg">
              <p className="text-green-400 text-sm font-semibold mb-4">신선함 수 있는 이동형 밀솔루션</p>
              <h1 className="text-5xl font-bold text-white mb-6">
                직원 복지의 새로운<br />기준<br />
                <span className="text-primary">프레시밀온</span>
              </h1>
              <p className="text-white/90 text-lg mb-8">
                공간 제약 없이 시작하고 건강한 식사를 제공하는 프레시밀온은 기업의 특성에 맞춘 맞춤 식단으로 직원 만족도를 높입니다.
              </p>
              <div className="flex gap-4">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={() => setConsultationOpen(true)}
                >
                  지금 상담받기
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => setMaterialRequestOpen(true)}
                >
                  자료 다운로드
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <p className="text-gray-600">년 이상의 급식 운영 경험</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1,000+</div>
              <p className="text-gray-600">일일 제공 식수</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-gray-600">사업장 운영 중</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99%</div>
              <p className="text-gray-600">고객 만족도</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kitchen-less Solutions Section */}
      <section id="service" className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16">키친리스 밀솔루션</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {kitchenlessSolutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <img src={solution.image} alt={solution.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{solution.name}</h3>
                  <p className="text-primary font-semibold mb-3">{solution.description}</p>
                  <p className="text-gray-600 mb-6">{solution.details}</p>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setConsultationOpen(true)}
                  >
                    견적 문의
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Diet Section - Carousel */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16">고객 특성에 맞춘 식단</h2>
          <div className="relative">
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={diets[currentDietIndex].image}
                alt={diets[currentDietIndex].title}
                className="w-full h-96 object-cover"
              />
              <div className="p-8">
                <h3 className="text-3xl font-bold text-foreground mb-3">{diets[currentDietIndex].title}</h3>
                <p className="text-lg text-gray-600 mb-4">{diets[currentDietIndex].description}</p>
                <div className="flex flex-wrap gap-2">
                  {diets[currentDietIndex].tags.map((tag, idx) => (
                    <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={prevDiet}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-primary hover:bg-primary/90 text-white p-3 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextDiet}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-primary hover:bg-primary/90 text-white p-3 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Meal Gallery - Carousel */}
      <section id="menu" className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16">실제 운영중인 식단</h2>
          <div className="relative">
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={meals[currentMealIndex].image}
                alt={meals[currentMealIndex].name}
                className="w-full h-96 object-cover"
              />
              <div className="p-8">
                <h3 className="text-3xl font-bold text-foreground mb-3">{meals[currentMealIndex].name}</h3>
                <p className="text-lg text-gray-600 mb-4">{meals[currentMealIndex].description}</p>
                <div className="flex flex-wrap gap-2">
                  {meals[currentMealIndex].tags.map((tag, idx) => (
                    <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={prevMeal}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-primary hover:bg-primary/90 text-white p-3 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextMeal}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-primary hover:bg-primary/90 text-white p-3 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16">신선함을 보장하는 프로세스</h2>
          <div className="relative">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663473728877/BNzd6XnofgDBbo2EVE2Tz4/process-step1-fresh-Se9k8psD9fWpNKfa7DDVtP.webp"
              alt="Process"
              className="w-full h-96 object-cover rounded-lg mb-8 opacity-60"
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-32 relative z-10">
              {[
                { title: "신선한 재료 입고", icon: "🥬" },
                { title: "위생 관리", icon: "✓" },
                { title: "맞춤형 메뉴 개발", icon: "👨‍🍳" },
                { title: "신속한 배송 & 수거", icon: "🚚" },
              ].map((step, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16">고객 후기</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "삼성전자 HR팀",
                comment: "직원들의 만족도가 눈에 띄게 높아졌습니다. 프레시밀온 최고!",
                emoji: "😊",
              },
              {
                name: "현대자동차 식당",
                comment: "신선한 재료와 위생 관리가 정말 뛰어납니다.",
                emoji: "👍",
              },
              {
                name: "서울대학교 병원",
                comment: "환자들의 회복 속도가 개선되었어요. 감사합니다!",
                emoji: "❤️",
              },
            ].map((review, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm relative">
                <div className="absolute -top-4 -left-4 text-4xl">{review.emoji}</div>
                <div className="flex gap-3 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{review.comment}"</p>
                <p className="font-bold text-foreground">{review.name}</p>
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                  <p className="text-sm text-gray-600">💬 {review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-16">자주 묻는 질문</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-foreground text-left">{faq.question}</span>
                  <span className="text-primary">{expandedFaq === index ? "−" : "+"}</span>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-border">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">지금 바로 상담받으세요</h2>
          <p className="text-xl mb-8 text-white/90">프레시밀온과 함께 직원 복지의 새로운 기준을 만들어보세요</p>
          <div className="flex gap-4 justify-center">
            <Button
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => setConsultationOpen(true)}
            >
              지금 상담받기
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => setMaterialRequestOpen(true)}
            >
              자료 다운로드
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            {/* Left: Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">프레시밀온</span>
              </div>
              <p className="text-gray-400 mb-6">Food Business Partner Creating the success way</p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>상호명 : 씨제이프레시웨이 주식회사</p>
                <p>대표자 : 이건일</p>
                <p>사업자등록번호 : 603-81-11270</p>
                <p>대표전화 : 02-2149-6114</p>
                <p>경기도 용인시 기흥구 기곡로 32(하갈동)</p>
                <p className="text-xs mt-4">(주사무소: 서울시 마포구 월드컵북로 54길 25 S-city)</p>
              </div>
            </div>

            {/* Middle: Quick Links */}
            <div>
              <h3 className="font-bold mb-6">빠른 링크</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#service" className="hover:text-primary transition-colors">
                    서비스
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-primary transition-colors">
                    식단
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-primary transition-colors">
                    프로세스
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setShowPrivacy(true)}
                    className="hover:text-primary transition-colors text-left"
                  >
                    개인정보 처리방침
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowTerms(true)}
                    className="hover:text-primary transition-colors text-left"
                  >
                    이용약관
                  </button>
                </li>
              </ul>
            </div>

            {/* Right: CJ Freshway */}
            <div>
              <h3 className="font-bold mb-6">CJ프레시웨이</h3>
              <a
                href="https://www.cjfreshway.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
              >
                CJ프레시웨이 홈페이지 바로가기 ‣
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-500 text-sm">
              Copyright ⓒ CJ Freshway. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold">개인정보 처리방침</h3>
              <button onClick={() => setShowPrivacy(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 text-gray-700 space-y-4">
              <p>
                CJ프레시웨이㈜는 이동급식 서비스 상담을 위해 아래 목적 범위 내로 고객님의 개인정보를 처리합니다. 수집한
                개인정보는 목적 이외의 용도로 처리하지 않으며, 처리 목적을 변경할 경우 고객님께 안내하고 동의를 받을
                예정입니다.
              </p>
              <h4 className="font-bold">수집·이용 항목</h4>
              <p>성명, 휴대폰번호, 이메일주소, 기업명, 주소, 예상 식수</p>
              <h4 className="font-bold">목적</h4>
              <p>이동급식 서비스 상담 및 진행</p>
              <h4 className="font-bold">보유·이용 기간</h4>
              <p>서비스 상담 신청 후 3년</p>
              <h4 className="font-bold">근거</h4>
              <p>개인정보 보호법 제15조 제1항 제4호에 따른 서비스 이행</p>
              <p className="text-sm text-gray-600">
                개인정보를 기입하지 않으실 수 있으나, 기재하지 않으실 경우 이동급식 서비스 상담 진행이 어렵습니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold">이용약관</h3>
              <button onClick={() => setShowTerms(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 text-gray-700 space-y-4">
              <h4 className="font-bold">제1조 (목적)</h4>
              <p>본 약관은 CJ프레시웨이㈜가 제공하는 이동급식 서비스의 이용에 관한 기본적인 사항을 규정합니다.</p>
              <h4 className="font-bold">제2조 (서비스 내용)</h4>
              <p>
                회사는 고객의 사무실, 공장, 병원 등 다양한 환경에서 신선하고 건강한 식사를 제공하는 이동급식 서비스를
                제공합니다.
              </p>
              <h4 className="font-bold">제3조 (이용 약관의 효력 및 변경)</h4>
              <p>
                본 약관은 고객이 본 서비스에 가입함으로써 효력이 발생합니다. 회사는 필요한 경우 약관을 변경할 수 있으며,
                변경된 약관은 공지 후 효력이 발생합니다.
              </p>
              <h4 className="font-bold">제4조 (서비스 이용 조건)</h4>
              <p>
                고객은 본 약관에 동의함으로써 서비스를 이용할 수 있습니다. 서비스 이용 중 문제가 발생할 경우 고객센터에
                문의하시기 바랍니다.
              </p>
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
