import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Download, RefreshCw, LogOut, Search, Filter } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { maskName, maskPhone, maskEmail, maskCompanyName } from "@/lib/maskingUtils";
import ConsultationDetailModal from "@/components/ConsultationDetailModal";

interface ConsultationRequest {
  id: number;
  companyName: string;
  manager: string;
  phone: string;
  email: string | null;
  region: string | null;
  expectedMealCount: string | null;
  serviceType: string | null;
  inquiries: string | null;
  status: string;
  createdAt: string;
}

export default function Admin() {
  const [consultationRequests, setConsultationRequests] = useState<ConsultationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginPassword, setLoginPassword] = useState("");

  // Phase 2: 검색/필터/정렬 상태
  const [consultationSearchQuery, setConsultationSearchQuery] = useState("");
  const [consultationStatusFilter, setConsultationStatusFilter] = useState("all");
  const [consultationServiceFilter, setConsultationServiceFilter] = useState("all");
  const [consultationSortOrder, setConsultationSortOrder] = useState<"newest" | "oldest">("newest");
  
  // Phase 4: 삭제 기능
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; type: 'consultation' } | null>(null);

  // Phase 5: 상세보기 모달
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationRequest | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Phase 6: 희망 서비스 변경 중 상태
  const [updatingServiceId, setUpdatingServiceId] = useState<number | null>(null);

  const getToken = () => localStorage.getItem('adminToken');

  const fetchRequests = async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const headers: HeadersInit = {
        'Authorization': `Bearer ${token}`
      };

      const consultationRes = await fetch("/api/admin/consultations", { headers });

      if (!consultationRes.ok) {
        throw new Error("요청 데이터를 불러올 수 없습니다");
      }

      const consultationData = await consultationRes.json();
      
      setConsultationRequests(consultationData.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (adminToken) {
      fetchRequests(adminToken);
    }
  }, [adminToken]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword })
      });

      const data = await res.json();
      
      if (data.success && data.token) {
        localStorage.setItem('adminToken', data.token);
        setAdminToken(data.token);
        setLoginPassword("");
      } else {
        setLoginError(data.error || '로그인 실패');
      }
    } catch (err) {
      setLoginError('로그인 중 오류가 발생했습니다');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken(null);
    setConsultationRequests([]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Phase 4: serviceType 한글 변환 함수
  const getServiceTypeLabel = (serviceType: string | null | undefined) => {
    if (!serviceType) return "-";
    const serviceMap: { [key: string]: string } = {
      'cafeteria': '구내식당',
      'catering': '케이터링',
      'snack': '간식/스낵',
      'cafe': '사내카페',
      'breakfast': '조식',
      'other': '기타'
    };
    return serviceMap[serviceType] || serviceType;
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { label: string; color: string } } = {
      'pending': { label: '대기중', color: 'bg-gray-100 text-gray-800' },
      'in_progress': { label: '진행중', color: 'bg-blue-100 text-blue-800' },
      'target': { label: '타겟처', color: 'bg-orange-100 text-orange-800' },
      'prospect': { label: '가망처', color: 'bg-green-100 text-green-800' },
      'won': { label: '수주완료', color: 'bg-purple-100 text-purple-800' },
      'dropped': { label: 'DROP', color: 'bg-red-100 text-red-800' },
      'new': { label: '신규', color: 'bg-gray-100 text-gray-800' }
    };
    
    const statusInfo = statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
    return <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>{statusInfo.label}</span>;
  };

  // Phase 3: 상태 업데이트 함수
  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const headers: HeadersInit = {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      };

      const res = await fetch('/api/admin/update-status', {
        method: 'PUT',
        headers,
        body: JSON.stringify({ type: 'consultation', id, status: newStatus })
      });

      if (!res.ok) throw new Error('상태 업데이트 실패');

      // 로컬 상태 업데이트
      setConsultationRequests(consultationRequests.map(c => 
        c.id === id ? { ...c, status: newStatus } : c
      ));
    } catch (err) {
      setError('상태 업데이트 중 오류가 발생했습니다');
    }
  };

  // Phase 6: 희망 서비스 변경 함수
  const handleServiceTypeChange = async (id: number, newServiceType: string) => {
    setUpdatingServiceId(id);
    try {
      const headers: HeadersInit = {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      };

      const res = await fetch('/api/admin/update-service-type', {
        method: 'PUT',
        headers,
        body: JSON.stringify({ id, serviceType: newServiceType })
      });

      if (!res.ok) throw new Error('서비스 타입 업데이트 실패');

      // 로컬 상태 업데이트
      setConsultationRequests(consultationRequests.map(c => 
        c.id === id ? { ...c, serviceType: newServiceType } : c
      ));
    } catch (err) {
      setError('서비스 타입 업데이트 중 오류가 발생했습니다');
    } finally {
      setUpdatingServiceId(null);
    }
  };

  // Phase 2: 검색 및 필터링 함수
  const filterAndSortData = (data: ConsultationRequest[], searchQuery: string, statusFilter: string, serviceFilter: string, sortOrder: "newest" | "oldest") => {
    let filtered = data;

    // 검색 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.companyName?.toLowerCase().includes(query) ||
        item.manager?.toLowerCase().includes(query) ||
        item.phone?.toLowerCase().includes(query) ||
        item.email?.toLowerCase().includes(query)
      );
    }

    // 상태 필터
    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // 희망 서비스 필터
    if (serviceFilter !== "all") {
      filtered = filtered.filter(item => item.serviceType === serviceFilter);
    }

    // 정렬
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  };

  const filteredConsultations = filterAndSortData(
    consultationRequests,
    consultationSearchQuery,
    consultationStatusFilter,
    consultationServiceFilter,
    consultationSortOrder
  );

  // Phase 2: CSV 다운로드 함수 (개선된 컬럼 순서)
  const downloadCSV = (data: ConsultationRequest[], filename: string) => {
    const headers = ["회사명", "담당자", "연락처", "이메일", "희망 서비스", "지역", "예상 식수", "문의 사항", "접수 일시", "진행 현황"];

    const rows = data.map(item => {
      return [
        item.companyName,
        item.manager,
        item.phone,
        item.email || "-",
        getServiceTypeLabel(item.serviceType),
        item.region || "-",
        item.expectedMealCount || "-",
        item.inquiries || "-",
        formatDate(item.createdAt),
        item.status
      ];
    });

    const csv = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Phase 5: 상세보기 열기
  const handleOpenDetail = (consultation: ConsultationRequest) => {
    setSelectedConsultation(consultation);
    setIsDetailModalOpen(true);
  };

  if (!adminToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>관리자 로그인</CardTitle>
            <CardDescription>관리자 비밀번호를 입력해주세요</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="비밀번호"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005B44]"
              />
              {loginError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full bg-[#005B44] hover:bg-[#004a37]">
                로그인
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
            <p className="text-gray-600 mt-2">상담 신청 관리</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Consultation Requests Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-2">
              <Button
                onClick={() => fetchRequests(adminToken!)}
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={isLoading}
              >
                <RefreshCw className="w-4 h-4" />
                새로고침
              </Button>
            </div>
            <Button
              onClick={() => downloadCSV(filteredConsultations, "consultations.csv")}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              CSV 다운로드
            </Button>
          </div>

          {/* Phase 2: 검색 및 필터 UI */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
            {/* 첫 번째 줄: 검색창, 희망 서비스, 진행 현황 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 검색 */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="회사명, 담당자, 연락처, 이메일 검색..."
                    value={consultationSearchQuery}
                    onChange={(e) => setConsultationSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005B44]"
                  />
                </div>
              </div>

              {/* 희망 서비스 필터 */}
              <div>
                <select
                  value={consultationServiceFilter}
                  onChange={(e) => setConsultationServiceFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005B44]"
                >
                  <option value="all">전체 서비스</option>
                  <option value="cafeteria">구내식당</option>
                  <option value="catering">케이터링</option>
                  <option value="snack">간식/스낵</option>
                  <option value="cafe">사내카페</option>
                  <option value="breakfast">조식</option>
                  <option value="other">기타</option>
                </select>
              </div>

              {/* 상태 필터 */}
              <div>
                <select
                  value={consultationStatusFilter}
                  onChange={(e) => setConsultationStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005B44]"
                >
                  <option value="all">전체 상태</option>
                  <option value="pending">대기중</option>
                  <option value="in_progress">진행중</option>
                  <option value="target">타겟처</option>
                  <option value="prospect">가망처</option>
                  <option value="won">수주완료</option>
                  <option value="dropped">DROP</option>
                  <option value="new">신규</option>
                </select>
              </div>
            </div>

            {/* 두 번째 줄: 총 n건 (왼쪽) | 정렬 드롭다운 (오른쪽) */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">총 {filteredConsultations.length}건</span>
              <select
                value={consultationSortOrder}
                onChange={(e) => setConsultationSortOrder(e.target.value as "newest" | "oldest")}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#005B44]"
              >
                <option value="newest">최신순</option>
                <option value="oldest">오래된순</option>
              </select>
            </div>
          </div>

          {/* 테이블 */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">회사명</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">담당자</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">연락처</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">이메일</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">희망 서비스</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">지역</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">예상 식수</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">접수 일시</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">진행 현황</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">액션</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                        로딩 중...
                      </td>
                    </tr>
                  ) : filteredConsultations.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                        데이터가 없습니다
                      </td>
                    </tr>
                  ) : (
                    filteredConsultations.map((request) => (
                      <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">{maskCompanyName(request.companyName)}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{maskName(request.manager)}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{maskPhone(request.phone)}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{maskEmail(request.email)}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                          <select
                            value={request.serviceType || ""}
                            onChange={(e) => handleServiceTypeChange(request.id, e.target.value)}
                            disabled={updatingServiceId === request.id}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-[#005B44] cursor-pointer ${
                              request.serviceType === 'cafeteria' ? 'bg-blue-100 text-blue-800' :
                              request.serviceType === 'catering' ? 'bg-green-100 text-green-800' :
                              request.serviceType === 'snack' ? 'bg-yellow-100 text-yellow-800' :
                              request.serviceType === 'cafe' ? 'bg-purple-100 text-purple-800' :
                              request.serviceType === 'breakfast' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <option value="">미설정</option>
                            <option value="cafeteria">구내식당</option>
                            <option value="catering">케이터링</option>
                            <option value="snack">간식/스낵</option>
                            <option value="cafe">사내카페</option>
                            <option value="breakfast">조식</option>
                            <option value="other">기타</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.region || "-"}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.expectedMealCount || "-"}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{formatDate(request.createdAt)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <select
                            value={request.status}
                            onChange={(e) => handleStatusChange(request.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-[#005B44] cursor-pointer w-full ${
                              request.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                              request.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                              request.status === 'target' ? 'bg-orange-100 text-orange-800' :
                              request.status === 'prospect' ? 'bg-green-100 text-green-800' :
                              request.status === 'won' ? 'bg-purple-100 text-purple-800' :
                              request.status === 'dropped' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <option value="pending">대기중</option>
                            <option value="in_progress">진행중</option>
                            <option value="target">타겟처</option>
                            <option value="prospect">가망처</option>
                            <option value="won">수주완료</option>
                            <option value="dropped">DROP</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center space-x-2">
                          <button
                            onClick={() => handleOpenDetail(request)}
                            className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                          >
                            상세보기
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ id: request.id, type: 'consultation' })}
                            className="text-red-600 hover:text-red-800 text-xs font-semibold"
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 5: 상세보기 모달 */}
      <ConsultationDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        consultation={selectedConsultation}
      />
    </div>
  );
}
