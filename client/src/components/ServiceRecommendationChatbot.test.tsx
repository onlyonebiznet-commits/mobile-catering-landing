import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServiceRecommendationChatbot from './ServiceRecommendationChatbot';

describe('ServiceRecommendationChatbot', () => {
  beforeEach(() => {
    // Reset any state between tests
  });

  it('renders floating button', () => {
    render(<ServiceRecommendationChatbot />);
    const button = screen.getByTitle('서비스 추천 챗봇');
    expect(button).toBeInTheDocument();
  });

  it('opens chatbot when floating button is clicked', async () => {
    render(<ServiceRecommendationChatbot />);
    const button = screen.getByTitle('서비스 추천 챗봇');
    
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('서비스 추천 상담')).toBeInTheDocument();
    });
  });

  it('displays service selection in step 1', async () => {
    render(<ServiceRecommendationChatbot />);
    const button = screen.getByTitle('서비스 추천 챗봇');
    
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('어떤 서비스가 궁금하신가요?')).toBeInTheDocument();
      expect(screen.getByText('이동급식')).toBeInTheDocument();
      expect(screen.getByText('조식 서비스')).toBeInTheDocument();
    });
  });

  it('navigates to environment selection after service selection', async () => {
    render(<ServiceRecommendationChatbot />);
    const button = screen.getByTitle('서비스 추천 챗봇');
    
    fireEvent.click(button);
    
    await waitFor(() => {
      const serviceButton = screen.getByText('이동급식');
      fireEvent.click(serviceButton);
    });

    await waitFor(() => {
      expect(screen.getByText('어느 환경에서 필요하신가요?')).toBeInTheDocument();
      expect(screen.getByText('공사현장')).toBeInTheDocument();
    });
  });

  it('shows recommendation after environment selection', async () => {
    render(<ServiceRecommendationChatbot />);
    const button = screen.getByTitle('서비스 추천 챗봇');
    
    fireEvent.click(button);
    
    // Select service
    await waitFor(() => {
      fireEvent.click(screen.getByText('이동급식'));
    });

    // Select environment
    await waitFor(() => {
      fireEvent.click(screen.getByText('오피스'));
    });

    await waitFor(() => {
      expect(screen.getByText(/이동급식을 추천드립니다/)).toBeInTheDocument();
      expect(screen.getByText(/신선한 식사로 직원 만족도를 높이고/)).toBeInTheDocument();
    });
  });

  it('displays form fields after recommendation', async () => {
    render(<ServiceRecommendationChatbot />);
    const button = screen.getByTitle('서비스 추천 챗봇');
    
    fireEvent.click(button);
    
    // Select service
    await waitFor(() => {
      fireEvent.click(screen.getByText('조식 서비스'));
    });

    // Select environment
    await waitFor(() => {
      fireEvent.click(screen.getByText('산업체'));
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('이름')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('회사명/기관명')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('연락처')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    });
  });

  it('allows going back to service selection', async () => {
    render(<ServiceRecommendationChatbot />);
    const button = screen.getByTitle('서비스 추천 챗봇');
    
    fireEvent.click(button);
    
    // Select service
    await waitFor(() => {
      fireEvent.click(screen.getByText('이동급식'));
    });

    // Click back button
    await waitFor(() => {
      const backButton = screen.getByText('← 뒤로');
      fireEvent.click(backButton);
    });

    await waitFor(() => {
      expect(screen.getByText('어떤 서비스가 궁금하신가요?')).toBeInTheDocument();
    });
  });

  it('can reset form and start over', async () => {
    render(<ServiceRecommendationChatbot />);
    const button = screen.getByTitle('서비스 추천 챗봇');
    
    fireEvent.click(button);
    
    // Select service
    await waitFor(() => {
      fireEvent.click(screen.getByText('이동급식'));
    });

    // Select environment
    await waitFor(() => {
      fireEvent.click(screen.getByText('오피스'));
    });

    // Click reset button
    await waitFor(() => {
      const resetButton = screen.getByText('다시 선택');
      fireEvent.click(resetButton);
    });

    await waitFor(() => {
      expect(screen.getByText('어떤 서비스가 궁금하신가요?')).toBeInTheDocument();
    });
  });

  it('closes chatbot when close button is clicked', async () => {
    render(<ServiceRecommendationChatbot />);
    const button = screen.getByTitle('서비스 추천 챗봇');
    
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('서비스 추천 상담')).toBeInTheDocument();
    });

    // Click close button (the X icon button)
    fireEvent.click(button);

    await waitFor(() => {
      const element = screen.queryByText('서비스 추천 상담');
      expect(element).not.toBeInTheDocument();
    });
  });
});
