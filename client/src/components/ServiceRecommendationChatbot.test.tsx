import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServiceRecommendationChatbot from './ServiceRecommendationChatbot';

class ResizeObserverMock { observe() {} unobserve() {} disconnect() {} }
globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

const openWidget = () => {
  render(<ServiceRecommendationChatbot />);
  fireEvent.click(screen.getByTitle('서비스 추천 챗봇'));
};

const reachForm = async () => {
  openWidget();
  fireEvent.click(await screen.findByRole('button', { name: '오피스' }));
  fireEvent.click(await screen.findByRole('button', { name: '70명 이상 ~ 100명 미만' }));
  fireEvent.click(await screen.findByRole('button', { name: '7~1만원 미만' }));
};

describe('ServiceRecommendationChatbot', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('renders a hidden trigger button', () => {
    render(<ServiceRecommendationChatbot />);
    expect(screen.getByTitle('서비스 추천 챗봇')).toHaveClass('hidden');
  });

  it('opens with company type selection as step 1', async () => {
    openWidget();
    expect(await screen.findByText('회사 유형을 선택해주세요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '산업체' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '오피스' })).toBeInTheDocument();
  });

  it('navigates from company type to meal range', async () => {
    openWidget();
    fireEvent.click(await screen.findByRole('button', { name: '병원' }));
    expect(await screen.findByText('예상 식수를 선택해주세요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '50명 미만' })).toBeInTheDocument();
  });

  it('navigates from meal range to budget', async () => {
    openWidget();
    fireEvent.click(await screen.findByRole('button', { name: '산업체' }));
    fireEvent.click(await screen.findByRole('button', { name: '100명 이상 ~ 200명 미만' }));
    expect(await screen.findByText('예상 단가를 선택해주세요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5~7천원 미만' })).toBeInTheDocument();
  });

  it('shows a recommendation after all three selections', async () => {
    await reachForm();
    expect(screen.getByText('맞춤 추천 초안')).toBeInTheDocument();
    expect(screen.getByText('오피스 데일리 웰니스 식단')).toBeInTheDocument();
    expect(screen.getByText('곤드레밥 · 연어구이 · 샐러드 · 미소국')).toBeInTheDocument();
    expect(screen.getByText('70명 이상 ~ 100명 미만')).toBeInTheDocument();
  });

  it('displays form fields after recommendation selection', async () => {
    await reachForm();
    expect(screen.getByLabelText(/담당자명/)).toBeInTheDocument();
    expect(screen.getByLabelText(/회사명/)).toBeInTheDocument();
    expect(screen.getByLabelText(/연락처/)).toBeInTheDocument();
    expect(screen.getByLabelText(/이메일/)).toBeInTheDocument();
    expect(screen.getByLabelText(/예상 식수/)).toHaveValue('70명 이상 ~ 100명 미만');
    expect(screen.getByLabelText(/희망 지역/)).toBeInTheDocument();
    expect(screen.getByLabelText('요청 사항')).toBeInTheDocument();
  });

  it('shows all privacy agreement items before inquiry submission', async () => {
    await reachForm();
    expect(screen.getByText(/개인정보 수집 및 이용 동의/)).toBeInTheDocument();
    expect(screen.getByText(/마케팅 정보 수신 동의/)).toBeInTheDocument();
    expect(screen.getByText(/광고성 정보 수신 동의/)).toBeInTheDocument();
    expect(screen.getByText('전체 동의')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '문의하기' })).toBeInTheDocument();
  });

  it('shows the confirmed personal information notice in the privacy accordion', async () => {
    await reachForm();
    fireEvent.click(screen.getByRole('button', { name: '개인정보 수집 및 이용 동의 내용 열기' }));
    expect(await screen.findByText(/서비스 상담 제공을 위해 아래와 같이 개인정보를 수집·이용합니다/)).toBeInTheDocument();
    expect(screen.getByText(/서비스 상담 신청 접수, 상담 진행/)).toBeInTheDocument();
    expect(screen.getByText(/성명, 기업명, 연락처, 이메일주소, 지역, 예상 식수/)).toBeInTheDocument();
    expect(screen.getByText(/상담일로부터 1개월/)).toBeInTheDocument();
    expect(screen.getByText(/필수항목에 대한 동의를 거부하실 경우 서비스 상담 신청이 제한됩니다/)).toBeInTheDocument();
  });

  it('keeps agreement checkbox clicks separate from accordion expansion', async () => {
    await reachForm();
    const allAgree = screen.getByRole('checkbox', { name: '전체 동의' });
    fireEvent.click(allAgree);
    expect(allAgree).toBeChecked();
    expect(screen.getByRole('checkbox', { name: /개인정보 수집 및 이용 동의/ })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: /마케팅 정보 수신 동의/ })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: /광고성 정보 수신 동의/ })).toBeChecked();
    expect(screen.getByRole('button', { name: '개인정보 수집 및 이용 동의 내용 열기' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('requires personal information agreement before submitting', async () => {
    await reachForm();
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.click(screen.getByRole('button', { name: '문의하기' }));
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('includes recommendation and agreement values in the inquiry payload', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true } as Response);
    await reachForm();
    fireEvent.click(screen.getByRole('checkbox', { name: /개인정보 수집 및 이용 동의/ }));
    fireEvent.submit(document.querySelector('form')!);
    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));
    const [, requestInit] = fetchSpy.mock.calls[0] as [string, RequestInit];
    const payload = JSON.parse(requestInit.body as string);
    expect(payload).toMatchObject({ serviceType: '서비스 추천 상담', estimatedMeals: '70명 이상 ~ 100명 미만', privacyConsent: true, marketingConsent: false, advertisingConsent: false });
    expect(payload.inquiries).toContain('단가: 7~1만원 미만');
    expect(payload.inquiries).toContain('예상 메뉴: 곤드레밥 · 연어구이 · 샐러드 · 미소국');
  });

  it('can return to the previous selection step', async () => {
    await reachForm();
    fireEvent.click(screen.getByRole('button', { name: '뒤로가기' }));
    expect(screen.getByText('예상 단가를 선택해주세요')).toBeInTheDocument();
  });

  it('closes chatbot when the hidden trigger is clicked again', async () => {
    openWidget();
    expect(await screen.findByText('서비스 추천 상담')).toBeInTheDocument();
    fireEvent.click(screen.getByTitle('서비스 추천 챗봇'));
    await waitFor(() => expect(screen.queryByText('서비스 추천 상담')).not.toBeInTheDocument());
  });
});
