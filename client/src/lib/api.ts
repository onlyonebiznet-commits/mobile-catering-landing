/**
 * API 기본 URL 설정
 * 항상 상대 경로를 사용하여 Vite 프록시가 자동으로 포트 5000으로 라우팅
 */
export const getApiBaseUrl = () => {
  // 상대 경로 사용 - Vite 프록시가 /api 요청을 포트 5000으로 자동 라우팅
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
