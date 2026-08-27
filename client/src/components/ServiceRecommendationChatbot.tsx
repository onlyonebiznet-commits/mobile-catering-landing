import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

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
    region: '',
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
    
    try {
      // 백엔드로 데이터 전송
      const response = await fetch('/api/consultation-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: formData.company,
          contactPerson: formData.name,
          phoneNumber: formData.phone,
          email: formData.email,
          serviceType: formData.service,
          region: formData.region,
          estimatedMeals: formData.people,
          message: formData.inquiry,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit consultation request');
      }

      // 성공 시 완료 메시지 표시
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
          region: '',
          inquiry: ''
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('문의 접수에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedService('');
      setFormData({ ...formData, service: '' });
    } else if (step === 3) {
      setStep(2);
      setSelectedEnvironment('');
      setFormData({ ...formData, environment: '' });
    }
  };

  return (
    <>
      {/* Floating Button - Hidden, used only as trigger for FloatingActionButtons */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden"
        title="서비스 추천 챗봇"
        data-chatbot-trigger
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
          <div className="bg-gradient-to-r from-[#005B45] to-[#003326] text-white p-6">
            <h3 className="text-lg font-bold">서비스 추천 상담</h3>
            <p className="text-sm text-white/80 mt-1">우리 현장에 맞는 맞춤형 서비스를 추천해드립니다</p>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-status-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-status-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-900 font-semibold mb-2 text-center">문의가 접수되었습니다</p>
                <p className="text-sm text-gray-600 text-center">담당자가 빠르게 연락드리겠습니다.</p>
              </div>
            ) : step === 1 ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="font-semibold text-gray-900 mb-4">어떤 서비스가 궁금하신가요?</p>
                <div className="space-y-2">
                  {services.map((service) => (
                    <button
                      key={service}
                      onClick={() => handleServiceSelect(service)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-left hover:border-[#005B45] hover:bg-[#005B45]/5 transition-all duration-200 font-medium text-gray-700 hover:text-[#005B45]"
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            ) : step === 2 ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="font-semibold text-gray-900 mb-4">어느 환경에서 필요하신가요?</p>
                <div className="space-y-2">
                  {environments.map((environment) => (
                    <button
                      key={environment}
                      onClick={() => handleEnvironmentSelect(environment)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-left hover:border-[#005B45] hover:bg-[#005B45]/5 transition-all duration-200 font-medium text-gray-700 hover:text-[#005B45]"
                    >
                      {environment}
                    </button>
                  ))}
                </div>
              </div>
            ) : step === 3 ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="이름"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005B45]"
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="회사명/기관명"
                      value={formData.company}
                      onChange={handleFormChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005B45]"
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
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005B45]"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="이메일"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005B45]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="people"
                      placeholder="예상 식수"
                      value={formData.people}
                      onChange={handleFormChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005B45]"
                    />
                    <input
                      type="text"
                      name="region"
                      placeholder="희망 지역"
                      value={formData.region}
                      onChange={handleFormChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005B45]"
                    />
                  </div>

                  <textarea
                    name="inquiry"
                    placeholder="필요한 서비스 내용, 운영 장소, 예산, 일정 등을 자유롭게 남겨주세요."
                    value={formData.inquiry}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005B45] resize-none"
                  />

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-sm"
                    >
                      뒤로가기
                    </button>
                    <button
                      type="submit"
                      data-event="consultation_submit_click"
                      data-form="chatbot_consultation_form"
                      className="flex-1 px-4 py-2 bg-[#005B45] text-white rounded-lg hover:bg-[#003326] transition-colors duration-200 font-medium text-sm"
                      onClick={() => {
                        window.dataLayer?.push({
                          event: "consultation_submit_click",
                          form_name: "chatbot_consultation_form",
                          button_text: "문의하기",
                          page_location: window.location.href
                        });
                      }}
                    >
                      문의하기
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
