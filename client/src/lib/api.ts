/**
 * API 기본 URL 설정
 * 개발 환경에서는 포트 5000 (Express 서버)로 요청
 * 배포 환경에서는 같은 도메인으로 요청
 */
export const getApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  // 개발 환경 (localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }

  // 배포 환경 (같은 도메인)
  return '';
};

/**
 * API 요청 래퍼 함수
 * @param endpoint - API 엔드포인트 (예: /api/admin/consultations)
 * @param options - fetch 옵션
 */
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = getApiBaseUrl();
  const url = baseUrl + endpoint;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  return response;
};
