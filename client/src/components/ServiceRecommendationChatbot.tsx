import React, { useMemo, useState } from 'react';
import { X, MessageCircle, ChevronDown, Check } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PersonalInfoConsentDetails } from './PersonalInfoConsentDetails';
import { MarketingConsentDetails } from './MarketingConsentDetails';
import { AdvertisingConsentDetails } from './AdvertisingConsentDetails';

const companyTypes = ['산업체', '오피스', '병원', '요양시설', '복지관', '행사장', '기타'];
const mealRanges = ['50명 미만', '50명 이상 ~ 70명 미만', '70명 이상 ~ 100명 미만', '100명 이상 ~ 200명 미만', '200명 이상 ~ 300명 미만', '300명 이상'];
const budgetRanges = ['5천원 미만', '5~7천원 미만', '7~1만원 미만', '1만원 이상'];

const menuByCompany: Record<string, { title: string; menu: string; note: string }> = {
  산업체: { title: '든든한 산업체 균형식', menu: '현미밥 · 닭다리살 구이 · 제철나물 · 된장국', note: '활동량이 많은 임직원을 위한 포만감과 영양 균형 중심' },
  오피스: { title: '오피스 데일리 웰니스 식단', menu: '곤드레밥 · 연어구이 · 샐러드 · 미소국', note: '업무 중에도 부담 없이 즐기는 깔끔하고 건강한 구성' },
  병원: { title: '병원 맞춤 케어 식단', menu: '잡곡밥 · 저염 소불고기 · 두부찜 · 맑은국', note: '다양한 이용자를 고려한 부드럽고 균형 잡힌 구성' },
  요양시설: { title: '시니어 맞춤 부드러운 식단', menu: '영양밥 · 생선구이 · 계란찜 · 들깨국', note: '소화 부담을 줄이고 친숙한 맛과 식감을 살린 구성' },
  복지관: { title: '복지시설 따뜻한 한 끼', menu: '보리밥 · 제육볶음 · 계절나물 · 김치찌개', note: '친숙한 메뉴와 계절 식재료를 활용한 만족도 중심 구성' },
  행사장: { title: '행사 맞춤 케이터링 식단', menu: '미니 샌드위치 · 핑거푸드 · 과일컵 · 음료', note: '행사 동선과 참석자 취향을 고려한 간편 제공 구성' },
  기타: { title: '현장 맞춤 큐레이션 식단', menu: '오늘의 밸런스 도시락 · 샐러드 · 제철 반찬 · 국', note: '현장 조건과 구성원 취향을 상담 후 유연하게 조정' },
};

const budgetNote: Record<string, string> = {
  '5천원 미만': '실속형 기본 구성으로 핵심 메뉴와 운영 효율을 우선합니다.',
  '5~7천원 미만': '대중적인 메인과 계절 반찬을 균형 있게 구성합니다.',
  '7~1만원 미만': '단백질 메인과 샐러드·디저트까지 만족도를 높입니다.',
  '1만원 이상': '프리미엄 식재료와 선택 메뉴를 포함한 맞춤 구성이 가능합니다.',
};

const initialForm = { name: '', company: '', phone: '', email: '', region: '', inquiry: '' };
const initialAgreements = { allAgree: false, personalInfoCollection: false, marketingConsent: false, adConsent: false };

type AgreementKey = keyof typeof initialAgreements;

const ServiceRecommendationChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedCompanyType, setSelectedCompanyType] = useState('');
  const [selectedMealRange, setSelectedMealRange] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [formData, setFormData] = useState(initialForm);
  const [agreements, setAgreements] = useState(initialAgreements);
  const [accordionValue, setAccordionValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const recommendation = useMemo(() => {
    if (!selectedCompanyType) return null;
    const base = menuByCompany[selectedCompanyType] ?? menuByCompany.기타;
    return { ...base, budgetNote: budgetNote[selectedBudget] ?? '', mealRange: selectedMealRange, budget: selectedBudget };
  }, [selectedCompanyType, selectedMealRange, selectedBudget]);

  const resetWidget = () => {
    setIsOpen(false);
    setStep(1);
    setSelectedCompanyType('');
    setSelectedMealRange('');
    setSelectedBudget('');
    setFormData(initialForm);
    setAgreements(initialAgreements);
    setAccordionValue('');
    setSubmitted(false);
  };

  const chooseCompanyType = (value: string) => { setSelectedCompanyType(value); setStep(2); };
  const chooseMealRange = (value: string) => { setSelectedMealRange(value); setStep(3); };
  const chooseBudget = (value: string) => { setSelectedBudget(value); setStep(4); };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgreementChange = (key: AgreementKey, checked: boolean) => {
    setAgreements((prev) => {
      if (key === 'allAgree') return { allAgree: checked, personalInfoCollection: checked, marketingConsent: checked, adConsent: checked };
      const next = { ...prev, [key]: checked };
      next.allAgree = next.personalInfoCollection && next.marketingConsent && next.adConsent;
      return next;
    });
  };

  const stopAgreementPropagation = (e: React.SyntheticEvent) => e.stopPropagation();
  const toggleAgreementAccordion = (value: string) => setAccordionValue((current) => current === value ? '' : value);

  const handleBack = () => {
    if (step === 2) { setStep(1); setSelectedCompanyType(''); }
    else if (step === 3) { setStep(2); setSelectedMealRange(''); }
    else if (step === 4) { setStep(3); setSelectedBudget(''); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreements.personalInfoCollection) { alert('개인정보 수집 및 이용에 동의해주세요.'); return; }
    try {
      const response = await fetch('/api/consultation-request', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: formData.company, manager: formData.name, phone: formData.phone, email: formData.email,
          serviceType: '서비스 추천 상담', region: formData.region, estimatedMeals: selectedMealRange,
          inquiries: `회사 유형: ${selectedCompanyType}\n예상 식수: ${selectedMealRange}\n단가: ${selectedBudget}\n예상 메뉴: ${recommendation?.menu ?? ''}\n${formData.inquiry}`,
          privacyConsent: agreements.personalInfoCollection, marketingConsent: agreements.marketingConsent, advertisingConsent: agreements.adConsent,
        }),
      });
      if (!response.ok) throw new Error('Failed to submit consultation request');
      setSubmitted(true);
      setTimeout(resetWidget, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('문의 접수에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="hidden" title="서비스 추천 챗봇" data-chatbot-trigger>
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[min(30rem,calc(100vw-24px))] bg-white rounded-[10px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gradient-to-r from-[#007651] to-[#008F69] text-white p-6">
            <div className="flex items-start justify-between gap-3">
              <div><h3 className="text-lg font-bold">서비스 추천 상담</h3><p className="text-sm text-white/80 mt-1">우리 현장에 맞는 맞춤형 서비스를 추천해드립니다</p></div>
              <button type="button" onClick={resetWidget} className="rounded-[10px] p-1 text-white/80 hover:bg-white/10" aria-label="서비스 추천 상담 닫기"><X className="h-5 w-5" aria-hidden="true" /></button>
            </div>
          </div>

          <div className="p-6 max-h-[min(620px,calc(100vh-150px))] overflow-y-auto">
            {submitted ? (
              <div className="text-center py-8"><div className="w-12 h-12 bg-status-success/10 rounded-[10px] flex items-center justify-center mx-auto mb-4"><Check className="w-6 h-6 text-status-success" /></div><p className="text-gray-900 font-semibold mb-2">문의가 접수되었습니다</p><p className="text-sm text-gray-600">담당자가 빠르게 연락드리겠습니다.</p></div>
            ) : step <= 3 ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between"><p className="font-semibold text-gray-900">{step === 1 ? '회사 유형을 선택해주세요' : step === 2 ? '예상 식수를 선택해주세요' : '예상 단가를 선택해주세요'}</p><span className="text-xs text-gray-500">{step}/3</span></div>
                <div className="h-1.5 rounded-[10px] bg-gray-100 overflow-hidden"><div className="h-full rounded-[10px] bg-[#007651] transition-all" style={{ width: `${(step / 3) * 100}%` }} /></div>
                <div className="grid grid-cols-2 gap-2">
                  {(step === 1 ? companyTypes : step === 2 ? mealRanges : budgetRanges).map((option) => {
                    const selected = option === (step === 1 ? selectedCompanyType : step === 2 ? selectedMealRange : selectedBudget);
                    return <button key={option} type="button" onClick={() => step === 1 ? chooseCompanyType(option) : step === 2 ? chooseMealRange(option) : chooseBudget(option)} className={`min-h-12 rounded-[10px] border px-3 py-2 text-left text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008F69] ${selected ? 'border-[#007651] bg-[#007651]/10 font-semibold text-[#007651]' : 'border-gray-200 text-gray-700 hover:border-[#007651] hover:bg-[#007651]/5'}`}>{option}</button>;
                  })}
                </div>
                {step > 1 && <button type="button" onClick={handleBack} className="w-full rounded-[10px] border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">이전 단계</button>}
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="rounded-[10px] border border-[#007651]/20 bg-[#007651]/5 p-4">
                  <p className="text-xs font-semibold text-[#007651]">맞춤 추천 초안</p><h4 className="mt-1 text-base font-bold text-gray-900">{recommendation?.title}</h4><p className="mt-2 text-sm font-medium text-gray-800">{recommendation?.menu}</p><p className="mt-2 text-xs leading-relaxed text-gray-600">{recommendation?.note}</p><p className="mt-2 text-xs text-[#007651]">{recommendation?.budgetNote}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5"><span className="rounded-[10px] bg-white px-2 py-1 text-xs text-gray-600">{selectedCompanyType}</span><span className="rounded-[10px] bg-white px-2 py-1 text-xs text-gray-600">{selectedMealRange}</span><span className="rounded-[10px] bg-white px-2 py-1 text-xs text-gray-600">{selectedBudget}</span></div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <p className="text-sm font-semibold text-gray-900">상담을 위해 기본 정보를 남겨주세요</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5"><Label htmlFor="chatbot-contact-person" className="form-field-label text-xs">담당자명 <span className="text-status-error" aria-hidden="true">*</span></Label><Input id="chatbot-contact-person" name="name" placeholder="담당자명을 입력해주세요" value={formData.name} onChange={handleFormChange} aria-required="true" /></div>
                    <div className="space-y-1.5"><Label htmlFor="chatbot-company" className="form-field-label text-xs">회사명 <span className="text-status-error" aria-hidden="true">*</span></Label><Input id="chatbot-company" name="company" placeholder="회사명/기관명을 입력해주세요" value={formData.company} onChange={handleFormChange} aria-required="true" /></div>
                    <div className="space-y-1.5"><Label htmlFor="chatbot-phone" className="form-field-label text-xs">연락처 <span className="text-status-error" aria-hidden="true">*</span></Label><Input id="chatbot-phone" name="phone" type="tel" placeholder="010-0000-0000" value={formData.phone} onChange={handleFormChange} aria-required="true" /></div>
                    <div className="space-y-1.5"><Label htmlFor="chatbot-email" className="form-field-label text-xs">이메일 <span className="text-status-error" aria-hidden="true">*</span></Label><Input id="chatbot-email" name="email" type="email" placeholder="example@company.com" value={formData.email} onChange={handleFormChange} aria-required="true" /></div>
                    <div className="space-y-1.5"><Label htmlFor="chatbot-meal-range" className="form-field-label text-xs">예상 식수 <span className="text-status-error" aria-hidden="true">*</span></Label><Input id="chatbot-meal-range" name="mealRange" placeholder="선택한 예상 식수" value={selectedMealRange} readOnly aria-readonly="true" aria-required="true" /></div>
                    <div className="space-y-1.5"><Label htmlFor="chatbot-region" className="form-field-label text-xs">희망 지역 <span className="text-status-error" aria-hidden="true">*</span></Label><Input id="chatbot-region" name="region" placeholder="서울, 경기 등" value={formData.region} onChange={handleFormChange} aria-required="true" /></div>
                  </div>
                  <div className="space-y-1.5"><Label htmlFor="chatbot-inquiry" className="form-field-label text-xs">요청 사항</Label><Textarea id="chatbot-inquiry" name="inquiry" placeholder="요청 사항을 입력해주세요" value={formData.inquiry} onChange={handleFormChange} rows={3} className="form-field-control--textarea" /></div>
                  <div className="space-y-3 border-t border-gray-200 pt-3" aria-label="개인정보 동의">
                    <div className="flex items-center gap-2"><Checkbox id="chatbot-all-agree" checked={agreements.allAgree} onCheckedChange={(checked) => handleAgreementChange('allAgree', checked === true)} onClick={stopAgreementPropagation} onPointerDown={stopAgreementPropagation} /><Label htmlFor="chatbot-all-agree" className="form-checkbox-label cursor-pointer font-medium" onClick={stopAgreementPropagation} onPointerDown={stopAgreementPropagation}>전체 동의</Label></div>
                    <Accordion type="single" collapsible value={accordionValue} onValueChange={setAccordionValue} className="w-full space-y-2">
                      {([
                        ['personal-info','chatbot-personal-info','개인정보 수집 및 이용 동의', 'personalInfoCollection', ''],
                        ['marketing','chatbot-marketing','마케팅 정보 수신 동의 (선택)', 'marketingConsent', '서비스 홍보 등 마케팅을 위해 성명, 휴대폰번호, 이메일, 기업명을 이용합니다. 동의하지 않아도 상담 이용에는 지장이 없습니다.'],
                        ['advertising','chatbot-advertising','광고성 정보 수신 동의 (선택)', 'adConsent', '문자와 이메일 등 전자 전송 매체를 통해 광고성 정보를 전송할 수 있습니다. 동의하지 않아도 상담 이용에는 지장이 없습니다.'],
                      ] as const).map(([value, id, label, key]) => <AccordionItem key={value} value={value} className="rounded-[10px] border border-gray-200 px-3"><div className="flex items-center justify-between py-2"><div className="flex min-w-0 items-center gap-2"><Checkbox id={id} checked={agreements[key]} onCheckedChange={(checked) => handleAgreementChange(key, checked === true)} onClick={stopAgreementPropagation} onPointerDown={stopAgreementPropagation} /><Label htmlFor={id} className="form-checkbox-label cursor-pointer text-gray-700" onClick={stopAgreementPropagation} onPointerDown={stopAgreementPropagation}>{label}{key === 'personalInfoCollection' && <span className="text-status-error" aria-hidden="true"> *</span>}</Label></div><button type="button" className="flex-shrink-0 rounded-[10px] p-1 text-gray-500 hover:bg-gray-100" onClick={() => toggleAgreementAccordion(value)} aria-label={`${label} 내용 열기`} aria-expanded={accordionValue === value} aria-controls={`${id}-content`}><ChevronDown className={`h-4 w-4 transition-transform ${accordionValue === value ? 'rotate-180' : ''}`} aria-hidden="true" /></button></div><AccordionContent id={`${id}-content`} className="max-h-[32rem] overflow-y-auto rounded-[10px] bg-gray-50 p-3">{key === 'personalInfoCollection' ? <PersonalInfoConsentDetails /> : key === 'marketingConsent' ? <MarketingConsentDetails /> : <AdvertisingConsentDetails />}</AccordionContent></AccordionItem>)}
                    </Accordion>
                  </div>
                  <div className="flex gap-2 pt-2"><button type="button" onClick={handleBack} className="flex-1 rounded-[10px] border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">뒤로가기</button><button type="submit" data-event="consultation_submit_click" data-form="chatbot_consultation_form" className="flex-1 rounded-[10px] bg-[#007651] px-4 py-2 text-sm font-medium text-white hover:bg-[#008F69]">문의하기</button></div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceRecommendationChatbot;
