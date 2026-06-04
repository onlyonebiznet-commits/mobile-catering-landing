'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Download, RefreshCw, LogOut, Search, Filter } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

interface MaterialRequest {
  id: number;
  companyName: string;
  manager: string;
  phone: string;
  email: string | null;
  status: string;
  createdAt: string;
}

export default function Admin() {
  const [consultationRequests, setConsultationRequests] = useState<ConsultationRequest[]>([]);
  const [materialRequests, setMaterialRequests] = useState<MaterialRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginPassword, setLoginPassword] = useState("");

  // Phase 2: 검색/필터/정렬 상태
  const [consultationSearchQuery, setConsultationSearchQuery] = useState("");
  const [materialSearchQuery, setMaterialSearchQuery] = useState("");
  const [consultationStatusFilter, setConsultationStatusFilter] = useState("all");
  const [materialStatusFilter, setMaterialStatusFilter] = useState("all");
  const [consultationSortOrder, setConsultationSortOrder] = useState<"newest" | "oldest">("newest");
  const [materialSortOrder, setMaterialSortOrder] = useState<"newest" | "oldest">("newest");
  
  // Phase 4: 삭제 기능
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; type: 'consultation' | 'material' } | null>(null);

  const fetchRequests = async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const headers: HeadersInit = {
        'Authorization': `Bearer ${token}`
      };

      const [consultationRes, materialRes] = await Promise.all([
        fetch("/api/admin/consultations", { headers }),
        fetch("/api/admin/materials", { headers })
      ]);

      if (!consultationRes.ok || !materialRes.ok) {
        throw new Error("요청 데이터를 불러올 수 없습니다");
      }

      const consultationData = await consultationRes.json();
      const materialData = await materialRes.json();
      
      setConsultationRequests(consultationData.data || []);
      setMaterialRequests(materialData.data || []);
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
    setMaterialRequests([]);
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
  const handleStatusChange = async (id: number, newStatus: string, isConsultation: boolean) => {
    try {
      const headers: HeadersInit = {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      };

      const res = await fetch('/api/admin/update-status', {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          id,
          status: newStatus,
          type: isConsultation ? 'consultation' : 'material'
        })
      });

      if (!res.ok) {
        throw new Error('상태 업데이트 실패');
      }

      // 데이터 새로고침
      await fetchRequests(adminToken!);
    } catch (err) {
      alert('상태 업데이트 중 오류가 발생했습니다');
      console.error(err);
    }
  };

  // Phase 4: 삭제 함수
  const handleDelete = async () => {
    if (!deleteConfirm) return;
    
    try {
      const headers: HeadersInit = {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      };

      const res = await fetch('/api/admin/delete', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({
          id: deleteConfirm.id,
          type: deleteConfirm.type
        })
      });

      if (!res.ok) {
        throw new Error('데이터 삭제 실패');
      }

      // 데이터 새로고침
      await fetchRequests(adminToken!);
      setDeleteConfirm(null);
    } catch (err) {
      alert('데이터 삭제 중 오류가 발생했습니다');
      console.error(err);
    }
  };

  // Phase 2: 검색 및 필터링 함수
  const filterAndSortData = (data: any[], searchQuery: string, statusFilter: string, sortOrder: "newest" | "oldest") => {
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
    consultationSortOrder
  );

  const filteredMaterials = filterAndSortData(
    materialRequests,
    materialSearchQuery,
    materialStatusFilter,
    materialSortOrder
  );

  // Phase 2: CSV 다운로드 함수 (개선된 컬럼 순서)
  const downloadCSV = (data: any[], filename: string, isConsultation: boolean) => {
    const headers = isConsultation
      ? ["회사명", "담당자", "연락처", "이메일", "희망 서비스", "지역", "예상 식수", "문의 사항", "접수 일시", "진행 현황"]
      : ["회사명", "담당자", "연락처", "이메일", "접수 일시", "진행 현황"];

    const rows = data.map(item => {
      if (isConsultation) {
        return [
          item.companyName,
          item.manager,
          item.phone,
          item.email || "-",
          item.serviceType || "-",
          item.region || "-",
          item.expectedMealCount || "-",
          item.inquiries || "-",
          formatDate(item.createdAt),
          item.status
        ];
      } else {
        return [
          item.companyName,
          item.manager,
          item.phone,
          item.email || "-",
          formatDate(item.createdAt),
          item.status
        ];
      }
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
            <p className="text-gray-600 mt-2">상담 신청 및 자료 요청 관리</p>
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

        <Tabs defaultValue="consultation" className="space-y-4">
          <TabsList>
            <TabsTrigger value="consultation">상담 신청 ({consultationRequests.length})</TabsTrigger>
            <TabsTrigger value="material">자료 요청 ({materialRequests.length})</TabsTrigger>
          </TabsList>

          {/* Consultation Requests Tab */}
          <TabsContent value="consultation" className="space-y-4">
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
                onClick={() => downloadCSV(filteredConsultations, "consultations.csv", true)}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 검색 */}
                <div className="md:col-span-2">
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

              {/* 정렬 */}
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
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">문의 사항</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">접수 일시</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">진행 현황</th>
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
                          <td className="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">{request.companyName}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.manager}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.phone}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.email || "-"}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.serviceType || "-"}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.region || "-"}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.expectedMealCount || "-"}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap max-w-xs truncate">{request.inquiries || "-"}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{formatDate(request.createdAt)}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <select
                                value={request.status}
                                onChange={(e) => handleStatusChange(request.id, e.target.value, true)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-[#005B44] cursor-pointer ${
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
                              <button
                                onClick={() => setDeleteConfirm({ id: request.id, type: 'consultation' })}
                                className="text-red-600 hover:text-red-800 text-xs font-semibold"
                              >
                                삭제
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Material Requests Tab */}
          <TabsContent value="material" className="space-y-4">
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
                onClick={() => downloadCSV(filteredMaterials, "materials.csv", false)}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 검색 */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="회사명, 담당자, 연락처, 이메일 검색..."
                      value={materialSearchQuery}
                      onChange={(e) => setMaterialSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005B44]"
                    />
                  </div>
                </div>

                {/* 상태 필터 */}
                <div>
                  <select
                    value={materialStatusFilter}
                    onChange={(e) => setMaterialStatusFilter(e.target.value)}
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

              {/* 정렬 */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">총 {filteredMaterials.length}건</span>
                <select
                  value={materialSortOrder}
                  onChange={(e) => setMaterialSortOrder(e.target.value as "newest" | "oldest")}
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
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">접수 일시</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">진행 현황</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                          로딩 중...
                        </td>
                      </tr>
                    ) : filteredMaterials.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                          데이터가 없습니다
                        </td>
                      </tr>
                    ) : (
                      filteredMaterials.map((request) => (
                        <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">{request.companyName}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.manager}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.phone}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.email || "-"}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{formatDate(request.createdAt)}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <select
                                value={request.status}
                                onChange={(e) => handleStatusChange(request.id, e.target.value, false)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-[#005B44] cursor-pointer ${
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
                              <button
                                onClick={() => setDeleteConfirm({ id: request.id, type: 'material' })}
                                className="text-red-600 hover:text-red-800 text-xs font-semibold"
                              >
                                삭제
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* 상태 범례 */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">진행 현황 범례</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">진행중</span>
              <span className="text-sm text-gray-600">신규 접수된 상담</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">타겟처</span>
              <span className="text-sm text-gray-600">우선 타겟 고객</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">가망처</span>
              <span className="text-sm text-gray-600">계약 가능성 높음</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">수주완료</span>
              <span className="text-sm text-gray-600">계약 완료</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">DROP</span>
              <span className="text-sm text-gray-600">진행 중단</span>
            </div>
          </div>
        </div>

        {/* Phase 4: 삭제 확인 모달 */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>데이터 삭제</CardTitle>
                <CardDescription>이 데이터를 삭제하시겠습니까? 이 동작은 되돌릴 수 없습니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setDeleteConfirm(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    취소
                  </Button>
                  <Button
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    삭제
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
