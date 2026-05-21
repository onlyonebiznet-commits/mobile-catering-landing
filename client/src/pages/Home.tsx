import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';
import MaterialRequestModal from '@/components/MaterialRequestModal';

export default function Home() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [materialOpen, setMaterialOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const kitchenlessSolutions = [
    {
      title: '프레시밀온',
      description: '신선한 재료로 정성스럽게 준비된 이동형 밀솔루션',
      image: '/manus-storage/freshmelon_main.jpg',
      features: ['신선한 식재료', '위생적인 조리', '맞춤형 메뉴'],
    },
    {
      title: '슈퍼그로틴',
      description: '고단백 건강식 도시락으로 직원 건강 관리',
      image: '/manus-storage/supergrotin_main.jpg',
      features: ['고단백 식단', '영양 균형', '맛있는 조리'],
    },
    {
      title: '스낵픽&카페',
      description: '편의점 형태의 간편식 및 음료 서비스',
      image: '/manus-storage/snackpick_main.jpg',
      features: ['다양한 메뉴', '24시간 이용', '신선함 보장'],
    },
  ];

  const diets = [
    {
      name: '정통 한식',
      description: '한국의 전통 음식 문화를 담은 정성스러운 한식 도시락',
      summary: '매일 신선한 재료로 준비하는 정통 한식',
      tags: ['한식', '정통', '신선'],
      image: '/manus-storage/korean_food.jpg',
      testimonialImages: [
        '/manus-storage/korean_1.jpg',
        '/manus-storage/korean_2.jpg',
        '/manus-storage/korean_3.jpg',
      ],
    },
    {
      name: '아시안식',
      description: '다양한 아시아 요리를 현지식으로 준비한 특별한 메뉴',
      summary: '아시아의 맛을 담은 다채로운 식단',
      tags: ['아시안', '다양성', '건강'],
      image: '/manus-storage/asian_food.jpg',
      testimonialImages: [
        '/manus-storage/asian_1.jpg',
        '/manus-storage/asian_2.jpg',
        '/manus-storage/asian_3.jpg',
      ],
    },
    {
      name: '고급 양식',
      description: '프리미엄 재료로 만든 세계 수준의 양식 요리',
      summary: '고급스러운 맛과 영양을 담은 양식',
      tags: ['양식', '프리미엄', '세계적'],
      image: '/manus-storage/western_food.jpg',
      testimonialImages: [
        '/manus-storage/western_1.jpg',
        '/manus-storage/western_2.jpg',
        '/manus-storage/western_3.jpg',
      ],
    },
  ];

  const faqs = [
    {
      question: '프레시밀온 서비스는 어떻게 신청하나요?',
      answer: '상단의 "지금 상담받기" 버튼을 클릭하여 기본 정보를 입력하시면, 담당자가 연락드려 맞춤형 서비스를 제안해드립니다.',
    },
    {
      question: '배송 지역은 어디까지 가능한가요?',
      answer: '서울, 경기, 인천 지역을 기본으로 서비스하고 있으며, 다른 지역의 경우 별도 상담을 통해 가능 여부를 확인해드립니다.',
    },
    {
      question: '식단 변경이나 취소는 언제까지 가능한가요?',
      answer: '배송 예정일 3일 전까지 변경 및 취소가 가능합니다. 긴급한 경우 담당자에게 연락주시면 최대한 도와드리겠습니다.',
    },
    {
      question: '위생 관리는 어떻게 하고 있나요?',
      answer: '모든 식재료는 신선도 검사를 거쳐 조리되며, HACCP 인증 시설에서 위생 기준을 철저히 준수하여 조리됩니다.',
    },
    {
      question: '알레르기 식재료 제외가 가능한가요?',
      answer: '네, 가능합니다. 신청 시 알레르기 정보를 알려주시면 그에 맞게 식단을 조정하여 제공해드립니다.',
    },
  ];

  const operatingPhotos = [
    { image: diets[0]?.testimonialImages?.[0] || '', comment: '매일 신선한 재료로 정성스럽게 준비된 식사', company: '삼성전자', department: 'HR팀', name: '김민준', position: '팀장', emoji: '😊', customerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kim' },
    { image: diets[0]?.testimonialImages?.[1] || '', comment: '직원들이 만족하는 다양한 메뉴 구성', company: 'LG전자', department: '개발팀', name: '이지은', position: '대리', emoji: '👍', customerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lee' },
    { image: diets[1]?.testimonialImages?.[0] || '', comment: '산업체 특성에 맞춘 영양 균형 식단', company: '현대중공업', department: '생산팀', name: '이영준', position: '팀장', emoji: '😊', customerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lee2' },
    { image: diets[1]?.testimonialImages?.[1] || '', comment: '직원 체력 관리를 위한 고단백 메뉴', company: '포스코', department: '운영팀', name: '김석호', position: '대리', emoji: '👍', customerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kim2' },
    { image: diets[2]?.testimonialImages?.[0] || '', comment: '환자 맞춤형 저염식 및 특수식 제공', company: '서울대병원', department: '영양팀', name: '이수진', position: '영양사', emoji: '😊', customerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lee3' },
    { image: diets[2]?.testimonialImages?.[1] || '', comment: '위생 기준을 철저히 준수한 조리', company: '삼성의료원', department: '급식팀', name: '김지현', position: '팀장', emoji: '👍', customerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kim3' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/manus-storage/hero_image.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/90 text-sm md:text-base mb-2 drop-shadow-lg">신선함 속 있는 이동형 밀솔루션</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            직원 복지의 새로운 기준을 경험하세요
          </h1>
          <p className="text-[#ED6325] text-2xl md:text-3xl font-bold drop-shadow-lg">프레시밀온</p>
          <p className="text-white/80 text-base md:text-lg mt-4 max-w-2xl drop-shadow-lg">
            신선한 재료와 정성스러운 조리로 만든 건강한 식사가 직원들의 만족도를 높입니다
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005B44]">20+</p>
              <p className="text-gray-600 mt-2">년 이상의 금식 운영 경험</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005B44]">1,000+</p>
              <p className="text-gray-600 mt-2">일일 제공 식수</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005B44]">100+</p>
              <p className="text-gray-600 mt-2">사업장 운영 중</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005B44]">99%</p>
              <p className="text-gray-600 mt-2">고객 만족도</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kitchen-less Solutions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">키친리스 밀솔루션</h2>
            <p className="text-xl text-gray-600">직원 복지를 위한 맞춤형 식사 서비스</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {kitchenlessSolutions.map((solution, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#005B44] mb-2">{solution.title}</h3>
                  <p className="text-gray-600 mb-4">{solution.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {solution.features.map((feature, fIdx) => (
                      <span key={fIdx} className="bg-[#FBFBEF] text-[#005B44] px-3 py-1 rounded-full text-sm font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="w-full bg-[#ED6325] text-white py-2 rounded-lg hover:bg-[#d95517] transition-colors font-semibold"
                  >
                    견적 문의
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer-Specific Diets Section */}
      <section className="py-20 bg-[#FBFBEF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">고객 특성에 맞춘 식단</h2>
            <p className="text-xl text-gray-600">다양한 산업 특성에 맞춘 맞춤형 식단 제공</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {diets.map((diet, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={diet.image}
                    alt={diet.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#005B44] mb-2">{diet.name}</h3>
                  <p className="text-gray-600 mb-3">{diet.description}</p>
                  <p className="text-sm text-gray-700 mb-4 font-medium">{diet.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {diet.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="bg-[#005B44]/10 text-[#005B44] px-3 py-1 rounded-full text-xs font-semibold">
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

      {/* Operating Meals Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">실제 운영중인 식단</h2>
            <p className="text-xl text-gray-600">고객사에서 직접 제공한 실제 후기</p>
          </div>

          {/* Operating Photos Gallery with Speech Bubbles */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {operatingPhotos.map((photo, pIdx) => (
                <div key={pIdx} className="group">
                  {/* Photo with Speech Bubble Overlay */}
                  <div className="relative overflow-hidden rounded-lg bg-gray-100 h-56">
                    <img
                      src={photo.image}
                      alt={`운영 사진 ${pIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Speech Bubble and Customer Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {/* Speech Bubble */}
                      <div className="bg-white rounded-xl p-3 shadow-lg mb-3 relative">
                        {/* Tail */}
                        <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-3 border-r-3 border-t-3 border-l-transparent border-r-transparent border-t-white" />
                        <p className="text-gray-800 text-xs leading-relaxed font-medium">"{photo.comment}"</p>
                      </div>

                      {/* Customer Info */}
                      <div className="flex items-center gap-2">
                        <img
                          src={photo.customerImage}
                          alt={photo.name}
                          className="w-8 h-8 rounded-full object-cover border-2 border-white flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-xs">{photo.company}</p>
                          <p className="text-white/80 text-xs">{photo.department}</p>
                        </div>
                        <span className="text-lg flex-shrink-0">{photo.emoji}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Freshness Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">신선함을 보장하는 프로세스</h2>
            <p className="text-xl text-gray-600">엄격한 품질 관리로 신선함을 유지합니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '🛒', title: '신선한 재료 선별', desc: '매일 신선한 재료를 엄선하여 사용' },
              { icon: '👨‍🍳', title: '정성스러운 조리', desc: 'HACCP 인증 시설에서 위생적으로 조리' },
              { icon: '❄️', title: '신속한 냉장', desc: '조리 직후 신속하게 냉장 보관' },
              { icon: '🚚', title: '빠른 배송', desc: '신선함을 유지하며 빠르게 배송' },
            ].map((process, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <p className="text-4xl mb-3">{process.icon}</p>
                <h3 className="text-lg font-bold text-[#005B44] mb-2">{process.title}</h3>
                <p className="text-gray-600 text-sm">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <p className="text-xl text-gray-600">프레시밀온 서비스에 대한 자주 묻는 질문들입니다</p>
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
                      expandedFAQ === idx ? 'transform rotate-180' : ''
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

      {/* Final CTA Section */}
      <section className="py-20 bg-[#005B44]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">직원 복지의 새로운 기준을 경험하세요</h2>
          <p className="text-xl text-white/90 mb-8">신선한 식사로 직원 만족도를 높이고 회사 이미지를 개선하세요</p>
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

      {/* Modals */}
      {consultationOpen && <ConsultationModal onClose={() => setConsultationOpen(false)} />}
      {materialOpen && <MaterialRequestModal onClose={() => setMaterialOpen(false)} />}
    </div>
  );
}
