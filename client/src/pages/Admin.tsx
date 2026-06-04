import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Download, RefreshCw, LogOut } from "lucide-react";
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
    const statusMap: { [key: string]: { label: string; variant: any } } = {
      'pending': { label: '대기중', variant: 'secondary' },
      'in_progress': { label: '진행중', variant: 'default' },
      'target': { label: '타겟처', variant: 'outline' },
      'prospect': { label: '가망처', variant: 'default' },
      'won': { label: '수주완료', variant: 'default' },
      'dropped': { label: 'DROP', variant: 'destructive' },
      'new': { label: '신규', variant: 'secondary' }
    };
    
    const statusInfo = statusMap[status] || { label: status, variant: 'secondary' };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
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
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">상담 신청 목록</h2>
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
                    ) : consultationRequests.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                          데이터가 없습니다
                        </td>
                      </tr>
                    ) : (
                      consultationRequests.map((request) => (
                        <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">{request.companyName}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.manager}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.phone}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.email || '-'}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.serviceType || '-'}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.region || '-'}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.expectedMealCount || '-'}</td>
                          <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{request.inquiries || '-'}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap text-xs">{formatDate(request.createdAt)}</td>
                          <td className="px-4 py-3">{getStatusBadge(request.status)}</td>
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
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">자료 요청 목록</h2>
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
                    ) : materialRequests.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                          데이터가 없습니다
                        </td>
                      </tr>
                    ) : (
                      materialRequests.map((request) => (
                        <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">{request.companyName}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.manager}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.phone}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{request.email || '-'}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap text-xs">{formatDate(request.createdAt)}</td>
                          <td className="px-4 py-3">{getStatusBadge(request.status)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
