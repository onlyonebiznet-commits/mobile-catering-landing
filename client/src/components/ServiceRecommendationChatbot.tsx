import React, { useState } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';

const ServiceRecommendationChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '',
    environment: '',
    people: '',
    startDate: '',
    inquiry: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const services = [
    '이동급식',
    '조식 서비스',
    '간식 서비스',
    '케이터링',
    '사내카페'
  ];

  const environments = [
    '공사현장',
    '산업체',
    '오피스',
    '병원',
    '요양시설',
    '복지관',
    '학교/교육기관',
    '행사장',
    '기타'
  ];

  const recommendations: { [key: string]: { [key: string]: string } } = {
    '이동급식': {
      '공사현장': '현장 맞춤형 이동급식으로 작업자들의 영양 관리와 만족도를 높일 수 있습니다.',
      '산업체': '산업체 특성에 맞춘 이동급식 서비스로 직원 복지를 개선하세요.',
      '오피스': '신선한 식사로 직원 만족도를 높이고 회사 이미지를 개선할 수 있습니다.',
      '병원': '환자와 직원을 위한 전문화된 이동급식 서비스를 제공합니다.',
      '요양시설': '어르신들을 위한 영양 관리 이동급식 서비스입니다.',
      '복지관': '지역 주민들을 위한 따뜻한 이동급식 서비스를 제공합니다.',
      '학교/교육기관': '학생과 교직원을 위한 건강한 이동급식 서비스입니다.',
      '행사장': '행사 규모와 특성에 맞춘 이동급식으로 성공적인 행사를 지원합니다.',
      '기타': '특별한 요구사항에 맞춘 맞춤형 이동급식 서비스를 제공합니다.'
    },
    '조식 서비스': {
      '공사현장': '아침 일찍 현장에 도착한 작업자들을 위한 조식 서비스입니다.',
      '산업체': '직원들의 활기찬 하루를 시작하는 영양 조식 서비스입니다.',
      '오피스': '신선하고 건강한 아침 식사로 업무 효율을 높입니다.',
      '병원': '환자 회복을 돕는 전문 영양 조식 서비스입니다.',
      '요양시설': '어르신들의 건강한 아침을 위한 맞춤 조식 서비스입니다.',
      '복지관': '지역 주민들을 위한 따뜻한 아침 조식 서비스입니다.',
      '학교/교육기관': '학생들의 성장을 돕는 영양 조식 서비스입니다.',
      '행사장': '행사 참가자들을 위한 조식 서비스입니다.',
      '기타': '특별한 요구사항에 맞춘 조식 서비스를 제공합니다.'
    },
    '간식 서비스': {
      '공사현장': '작업 중 에너지 충전을 위한 건강한 간식 서비스입니다.',
      '산업체': '직원들의 휴식 시간을 더욱 즐겁게 해주는 간식 서비스입니다.',
      '오피스': '업무 중 피로를 덜어주는 신선한 간식 서비스입니다.',
      '병원': '환자와 보호자를 위한 건강한 간식 서비스입니다.',
      '요양시설': '어르신들의 간식 시간을 풍요롭게 해주는 서비스입니다.',
      '복지관': '지역 주민들을 위한 건강한 간식 서비스입니다.',
      '학교/교육기관': '학생들의 성장을 돕는 영양 간식 서비스입니다.',
      '행사장': '행사 분위기를 더하는 간식 서비스입니다.',
      '기타': '특별한 요구사항에 맞춘 간식 서비스를 제공합니다.'
    },
    '케이터링': {
      '공사현장': '현장 행사와 회의를 위한 전문 케이터링 서비스입니다.',
      '산업체': '회의, 행사, 워크숍을 위한 프리미엄 케이터링 서비스입니다.',
      '오피스': '회의실 행사와 특별 행사를 위한 케이터링 서비스입니다.',
      '병원': '병원 행사와 특별한 날을 위한 케이터링 서비스입니다.',
      '요양시설': '시설 행사와 특별한 날을 위한 케이터링 서비스입니다.',
      '복지관': '지역 행사와 프로그램을 위한 케이터링 서비스입니다.',
      '학교/교육기관': '학교 행사와 특별 프로그램을 위한 케이터링 서비스입니다.',
      '행사장': '행사 규모와 특성에 맞춘 전문 케이터링 서비스입니다.',
      '기타': '특별한 행사를 위한 맞춤형 케이터링 서비스입니다.'
    },
    '사내카페': {
      '공사현장': '현장 휴게실을 위한 카페 운영 서비스입니다.',
      '산업체': '직원들의 휴식 공간을 위한 사내 카페 운영 서비스입니다.',
      '오피스': '업무 중 휴식을 위한 프리미엄 사내 카페 서비스입니다.',
      '병원': '의료진과 방문객을 위한 카페 운영 서비스입니다.',
      '요양시설': '어르신들의 휴식 공간을 위한 카페 운영 서비스입니다.',
      '복지관': '지역 주민들을 위한 카페 운영 서비스입니다.',
      '학교/교육기관': '학생과 교직원을 위한 카페 운영 서비스입니다.',
      '행사장': '행사 참가자들을 위한 카페 운영 서비스입니다.',
      '기타': '특별한 요구사항에 맞춘 카페 운영 서비스입니다.'
    }
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setFormData({ ...formData, service });
    setStep(2);
  };

  const handleEnvironmentSelect = (environment: string) => {
    setSelectedEnvironment(environment);
    setFormData({ ...formData, environment });
    setStep(3);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // For now, just show success message
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setStep(1);
      setSelectedService('');
      setSelectedEnvironment('');
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        service: '',
        environment: '',
        people: '',
        startDate: '',
        inquiry: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedService('');
    setSelectedEnvironment('');
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      service: '',
      environment: '',
      people: '',
      startDate: '',
      inquiry: ''
    });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#005B44] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        title="서비스 추천 챗봇"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#005B44] to-[#004a35] text-white p-6">
            <h3 className="text-lg font-bold">서비스 추천 상담</h3>
            <p className="text-sm text-white/80 mt-1">맞춤형 서비스를 추천해드립니다</p>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-900 font-semibold mb-2">문의가 접수되었습니다</p>
                <p className="text-sm text-gray-600">담당자가 빠르게 연락드리겠습니다.</p>
              </div>
            ) : step === 1 ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="font-semibold text-gray-900 mb-4">어떤 서비스가 궁금하신가요?</p>
                <div className="space-y-2">
                  {services.map((service) => (
                    <button
                      key={service}
                      onClick={() => handleServiceSelect(service)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-left hover:border-[#005B44] hover:bg-[#005B44]/5 transition-all duration-200 font-medium text-gray-700 hover:text-[#005B44]"
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            ) : step === 2 ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setStep(1)}
                    className="text-[#005B44] hover:text-[#004a35] text-sm font-medium"
                  >
                    ← 뒤로
                  </button>
                </div>
                <p className="font-semibold text-gray-900 mb-4">어느 환경에서 필요하신가요?</p>
                <div className="space-y-2">
                  {environments.map((environment) => (
                    <button
                      key={environment}
                      onClick={() => handleEnvironmentSelect(environment)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-left hover:border-[#005B44] hover:bg-[#005B44]/5 transition-all duration-200 font-medium text-gray-700 hover:text-[#005B44]"
                    >
                      {environment}
                    </button>
                  ))}
                </div>
              </div>
            ) : step === 3 ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-[#005B44]/10 border border-[#005B44]/20 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">선택하신 조건에 맞춰</p>
                  <p className="font-semibold text-gray-900 mb-3">{selectedService}을 추천드립니다.</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {recommendations[selectedService]?.[selectedEnvironment] || '맞춤형 서비스를 제공합니다.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="이름"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005B44]"
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="회사명/기관명"
                      value={formData.company}
                      onChange={handleFormChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005B44]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="연락처"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005B44]"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="이메일"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005B44]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="people"
                      placeholder="예상 이용 인원"
                      value={formData.people}
                      onChange={handleFormChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005B44]"
                    />
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleFormChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005B44]"
                    />
                  </div>

                  <textarea
                    name="inquiry"
                    placeholder="필요한 서비스 내용, 운영 장소, 예산, 일정 등을 자유롭게 남겨주세요."
                    value={formData.inquiry}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005B44] resize-none"
                  />

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-[#005B44] text-white rounded-lg hover:bg-[#004a35] transition-colors duration-200 font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      문의하기
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-sm"
                    >
                      다시 선택
                    </button>
                  </div>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceRecommendationChatbot;
