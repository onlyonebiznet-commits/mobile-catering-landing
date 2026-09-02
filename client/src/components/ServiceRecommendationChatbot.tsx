import React, { useState } from 'react';
import { X, MessageCircle, ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

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
    inquiry: '',
  });
  const [agreements, setAgreements] = useState({
    allAgree: false,
    personalInfoCollection: false,
    marketingConsent: false,
    adConsent: false,
  });
  const [accordionValue, setAccordionValue] = useState('');
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgreementChange = (
    key: 'allAgree' | 'personalInfoCollection' | 'marketingConsent' | 'adConsent',
    checked: boolean,
  ) => {
    setAgreements((prev) => {
      if (key === 'allAgree') {
        return {
          allAgree: checked,
          personalInfoCollection: checked,
          marketingConsent: checked,
          adConsent: checked,
        };
      }

      const next = { ...prev, [key]: checked };
      next.allAgree = next.personalInfoCollection && next.marketingConsent && next.adConsent;
      return next;
    });
  };

  const toggleAgreementAccordion = (value: string) => {
    setAccordionValue((current) => (current === value ? '' : value));
  };

  const stopAgreementPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreements.personalInfoCollection) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    try {
      // 백엔드로 데이터 전송
      const response = await fetch('/api/consultation-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: formData.company,
          manager: formData.name,
          phone: formData.phone,
          email: formData.email,
          serviceType: formData.service,
          region: formData.region,
          estimatedMeals: formData.people,
          inquiries: formData.inquiry,
          privacyConsent: agreements.personalInfoCollection,
          marketingConsent: agreements.marketingConsent,
          advertisingConsent: agreements.adConsent,
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
        setAgreements({
          allAgree: false,
          personalInfoCollection: false,
          marketingConsent: false,
          adConsent: false,
        });
        setAccordionValue('');
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
          <div className="bg-gradient-to-r from-[#007651] to-[#008F69] text-white p-6">
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-left hover:border-[#007651] hover:bg-[#007651]/5 transition-all duration-200 font-medium text-gray-700 hover:text-[#007651]"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-left hover:border-[#007651] hover:bg-[#007651]/5 transition-all duration-200 font-medium text-gray-700 hover:text-[#007651]"
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
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#007651]"
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="회사명/기관명"
                      value={formData.company}
                      onChange={handleFormChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#007651]"
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
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#007651]"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="이메일"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#007651]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="people"
                      placeholder="예상 식수"
                      value={formData.people}
                      onChange={handleFormChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#007651]"
                    />
                    <input
                      type="text"
                      name="region"
                      placeholder="희망 지역"
                      value={formData.region}
                      onChange={handleFormChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#007651]"
                    />
                  </div>

                  <textarea
                    name="inquiry"
                    placeholder="필요한 서비스 내용, 운영 장소, 예산, 일정 등을 자유롭게 남겨주세요."
                    value={formData.inquiry}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#007651] resize-none"
                  />

                  <div className="space-y-3 border-t border-gray-200 pt-3" aria-label="개인정보 동의">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="chatbot-all-agree"
                        checked={agreements.allAgree}
                        onCheckedChange={(checked) => handleAgreementChange('allAgree', checked === true)}
                        onClick={stopAgreementPropagation}
                        onPointerDown={stopAgreementPropagation}
                      />
                      <Label
                        htmlFor="chatbot-all-agree"
                        className="form-checkbox-label font-medium cursor-pointer"
                        onClick={stopAgreementPropagation}
                        onPointerDown={stopAgreementPropagation}
                      >
                        전체 동의
                      </Label>
                    </div>

                    <Accordion
                      type="single"
                      collapsible
                      value={accordionValue}
                      onValueChange={setAccordionValue}
                      className="w-full space-y-2"
                    >
                      <AccordionItem value="personal-info" className="border border-gray-200 rounded-lg px-3">
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <Checkbox
                              id="chatbot-personal-info"
                              checked={agreements.personalInfoCollection}
                              onCheckedChange={(checked) => handleAgreementChange('personalInfoCollection', checked === true)}
                              onClick={stopAgreementPropagation}
                              onPointerDown={stopAgreementPropagation}
                            />
                            <Label
                              htmlFor="chatbot-personal-info"
                              className="form-checkbox-label text-gray-700 cursor-pointer"
                              onClick={stopAgreementPropagation}
                              onPointerDown={stopAgreementPropagation}
                            >
                              개인정보 수집 및 이용 동의 <span className="text-status-error" aria-hidden="true">*</span>
                            </Label>
                          </div>
                          <button
                            type="button"
                            className="flex-shrink-0 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => toggleAgreementAccordion('personal-info')}
                            aria-label="개인정보 수집 및 이용 동의 내용 열기"
                            aria-expanded={accordionValue === 'personal-info'}
                          >
                            <ChevronDown className={`h-4 w-4 transition-transform ${accordionValue === 'personal-info' ? 'rotate-180' : ''}`} aria-hidden="true" />
                          </button>
                        </div>
                        <AccordionContent className="rounded bg-gray-50 p-3 text-xs leading-relaxed text-gray-600">
                          CJ프레시웨이㈜는 이동급식 서비스 상담을 위해 성명, 휴대폰번호, 이메일, 기업명, 주소, 예상 식수를 수집·이용합니다. 이용 목적은 이동급식 서비스 상담 및 진행이며, 보유·이용 기간은 상담 신청 후 3년입니다. 동의하지 않을 수 있으나 상담 진행이 어려울 수 있습니다.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="marketing" className="border border-gray-200 rounded-lg px-3">
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <Checkbox
                              id="chatbot-marketing"
                              checked={agreements.marketingConsent}
                              onCheckedChange={(checked) => handleAgreementChange('marketingConsent', checked === true)}
                              onClick={stopAgreementPropagation}
                              onPointerDown={stopAgreementPropagation}
                            />
                            <Label
                              htmlFor="chatbot-marketing"
                              className="form-checkbox-label text-gray-700 cursor-pointer"
                              onClick={stopAgreementPropagation}
                              onPointerDown={stopAgreementPropagation}
                            >
                              마케팅 정보 수신 동의 (선택)
                            </Label>
                          </div>
                          <button
                            type="button"
                            className="flex-shrink-0 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => toggleAgreementAccordion('marketing')}
                            aria-label="마케팅 정보 수신 동의 내용 열기"
                            aria-expanded={accordionValue === 'marketing'}
                          >
                            <ChevronDown className={`h-4 w-4 transition-transform ${accordionValue === 'marketing' ? 'rotate-180' : ''}`} aria-hidden="true" />
                          </button>
                        </div>
                        <AccordionContent className="rounded bg-gray-50 p-3 text-xs leading-relaxed text-gray-600">
                          서비스 홍보 등 마케팅을 위해 성명, 휴대폰번호, 이메일, 기업명을 이용합니다. 보유·이용 기간은 동의 후 3년이며, 동의하지 않아도 상담 이용에는 지장이 없습니다.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="advertising" className="border border-gray-200 rounded-lg px-3">
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <Checkbox
                              id="chatbot-advertising"
                              checked={agreements.adConsent}
                              onCheckedChange={(checked) => handleAgreementChange('adConsent', checked === true)}
                              onClick={stopAgreementPropagation}
                              onPointerDown={stopAgreementPropagation}
                            />
                            <Label
                              htmlFor="chatbot-advertising"
                              className="form-checkbox-label text-gray-700 cursor-pointer"
                              onClick={stopAgreementPropagation}
                              onPointerDown={stopAgreementPropagation}
                            >
                              광고성 정보 수신 동의 (선택)
                            </Label>
                          </div>
                          <button
                            type="button"
                            className="flex-shrink-0 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => toggleAgreementAccordion('advertising')}
                            aria-label="광고성 정보 수신 동의 내용 열기"
                            aria-expanded={accordionValue === 'advertising'}
                          >
                            <ChevronDown className={`h-4 w-4 transition-transform ${accordionValue === 'advertising' ? 'rotate-180' : ''}`} aria-hidden="true" />
                          </button>
                        </div>
                        <AccordionContent className="rounded bg-gray-50 p-3 text-xs leading-relaxed text-gray-600">
                          마케팅 목적의 개인정보 수집·이용에 동의한 고객에게 문자, 이메일 등 전자 전송 매체를 통해 광고성 정보를 전송할 수 있습니다. 동의하지 않아도 상담 이용에는 지장이 없습니다.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

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
                      className="flex-1 px-4 py-2 bg-[#007651] text-white rounded-lg hover:bg-[#008F69] transition-colors duration-200 font-medium text-sm"
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
