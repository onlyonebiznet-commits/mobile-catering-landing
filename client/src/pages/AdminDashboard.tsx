import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { getApiBaseUrl } from '@/lib/api';
import { isWithinDateRange } from '@/lib/dateRange';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ConsultationRequest {
  id: number;
  companyName: string;
  manager: string;
  phone: string;
  email?: string;
  region?: string;
  expectedMealCount?: number;
  serviceType?: string;
  inquiries?: string;
  status: string;
  createdAt: string;
  webhookStatus?: string;
  webhookResponseCode?: number;
  webhookErrorMessage?: string;
  webhookSentAt?: string;
}

interface Stats {
  consultationToday: number;
  consultationMonth: number;
}

const STATUS_OPTIONS = ['pending', 'processing', 'completed'];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending':
      return '신규';
    case 'processing':
      return '처리중';
    case 'completed':
      return '완료';
    default:
      return status;
  }
};

const getWebhookStatusColor = (status?: string) => {
  switch (status) {
    case 'not_configured':
      return 'bg-gray-100 text-gray-700 border-gray-300';
    case 'pending':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'success':
      return 'bg-green-100 text-green-700 border-green-300';
    case 'failed':
      return 'bg-red-100 text-red-700 border-red-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

const getWebhookStatusLabel = (status?: string) => {
  switch (status) {
    case 'not_configured':
      return '미설정';
    case 'pending':
      return '대기중';
    case 'success':
      return '성공';
    case 'failed':
      return '실패';
    default:
      return '-';
  }
};

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const getToken = () => localStorage.getItem('adminToken');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLocation('/admin/login');
      return;
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    const token = getToken();
    if (!token) return;

    setLoading(true);
    setError('');

    try {
      const baseUrl = getApiBaseUrl();
      const [consultResponse, statsResponse] = await Promise.all([
        fetch(`${baseUrl}/api/admin/consultations`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${baseUrl}/api/admin/stats`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (!consultResponse.ok) {
        const contentType = consultResponse.headers.get('content-type');
        let errorText = '';
        if (contentType && contentType.includes('application/json')) {
          const errorData = await consultResponse.json();
          errorText = errorData.error || 'Unknown error';
        } else {
          errorText = await consultResponse.text();
        }
        console.error('Consult response error:', consultResponse.status, errorText);
        setError(`상담 신청 데이터 오류 (${consultResponse.status})`);
        return;
      }

      if (!statsResponse.ok) {
        const contentType = statsResponse.headers.get('content-type');
        let errorText = '';
        if (contentType && contentType.includes('application/json')) {
          const errorData = await statsResponse.json();
          errorText = errorData.error || 'Unknown error';
        } else {
          errorText = await statsResponse.text();
        }
        console.error('Stats response error:', statsResponse.status, errorText);
        setError(`통계 데이터 오류 (${statsResponse.status})`);
        return;
      }

      const consultContentType = consultResponse.headers.get('content-type');
      const statsContentType = statsResponse.headers.get('content-type');

      if (!consultContentType || !consultContentType.includes('application/json')) {
        const text = await consultResponse.text();
        console.error('Invalid content-type for consultations:', consultContentType);
        setError('상담 신청 응답이 JSON이 아닙니다');
        return;
      }

      if (!statsContentType || !statsContentType.includes('application/json')) {
        const text = await statsResponse.text();
        console.error('Invalid content-type for stats:', statsContentType);
        setError('통계 응답이 JSON이 아닙니다');
        return;
      }

      const consultData = await consultResponse.json();
      const statsData = await statsResponse.json();

      setConsultations(consultData.data || []);
      setStats(statsData);
    } catch (err) {
      setError('데이터 로드 중 오류가 발생했습니다: ' + (err instanceof Error ? err.message : String(err)));
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setLocation('/admin/login');
  };

  const handleExport = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/admin/export?type=consultation`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `consultation_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('내보내기 중 오류가 발생했습니다');
      console.error('Export error:', err);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    const token = getToken();
    if (!token) return;

    setUpdatingId(id);

    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/admin/update-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ type: 'consultation', id, status: newStatus }),
      });

      if (!response.ok) throw new Error('Status update failed');

      // 로컬 상태 업데이트
      setConsultations(consultations.map(c => 
        c.id === id ? { ...c, status: newStatus } : c
      ));

      // 통계 새로고침
      await fetchData();
    } catch (err) {
      setError('상태 업데이트 중 오류가 발생했습니다');
      console.error('Status update error:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredConsultations = consultations.filter(c => {
    const matchesSearch =
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm);
    const matchesStatus = !statusFilter || c.status === statusFilter;
    const matchesDate = isWithinDateRange(c.createdAt, startDate, endDate);
    return matchesSearch && matchesStatus && matchesDate;
  });

  const isDateRangeInvalid = Boolean(startDate && endDate && startDate > endDate);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">관리자 대시보드</h1>
          <Button onClick={handleLogout} variant="outline">
            로그아웃
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="p-6">
              <p className="text-slate-600 text-sm">오늘 상담 신청</p>
              <p className="text-3xl font-bold text-slate-900">{stats.consultationToday}</p>
            </Card>
            <Card className="p-6">
              <p className="text-slate-600 text-sm">이번 달 상담 신청</p>
              <p className="text-3xl font-bold text-slate-900">{stats.consultationMonth}</p>
            </Card>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <Input
            placeholder="회사명, 담당자명, 연락처로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <label className="space-y-1">
              <span className="block text-xs font-medium text-slate-600">접수 시작일</span>
              <input
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </label>
            <label className="space-y-1">
              <span className="block text-xs font-medium text-slate-600">접수 종료일</span>
              <input
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm"
            >
              <option value="">모든 상태</option>
              <option value="pending">신규</option>
              <option value="processing">처리중</option>
              <option value="completed">완료</option>
            </select>
            <div className="text-sm text-slate-600 lg:text-right">
              {isDateRangeInvalid ? "시작일은 종료일보다 늦을 수 없습니다." : `필터 결과 ${filteredConsultations.length}건`}
            </div>
          </div>
        </div>

        {/* Consultations Table */}
        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">상담 신청 목록 ({filteredConsultations.length})</h2>
              <Button onClick={handleExport} size="sm">
                CSV 다운로드
              </Button>
            </div>

            {loading ? (
              <p className="text-slate-600">로딩 중...</p>
            ) : filteredConsultations.length === 0 ? (
              <p className="text-slate-600">데이터가 없습니다</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold">신청일시</th>
                      <th className="text-left py-3 px-4 font-semibold">회사명</th>
                      <th className="text-left py-3 px-4 font-semibold">담당자명</th>
                      <th className="text-left py-3 px-4 font-semibold">연락처</th>
                      <th className="text-left py-3 px-4 font-semibold">이메일</th>
                      <th className="text-left py-3 px-4 font-semibold">지역</th>
                      <th className="text-left py-3 px-4 font-semibold">예상 식수</th>
                      <th className="text-left py-3 px-4 font-semibold">서비스 유형</th>
                      <th className="text-left py-3 px-4 font-semibold">Webhook 상태</th>
                      <th className="text-left py-3 px-4 font-semibold">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredConsultations.map((item) => (
                      <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50">
                        <td className="py-3 px-4 text-xs">{new Date(item.createdAt).toLocaleString('ko-KR')}</td>
                        <td className="py-3 px-4">{item.companyName}</td>
                        <td className="py-3 px-4">{item.manager}</td>
                        <td className="py-3 px-4">{item.phone}</td>
                        <td className="py-3 px-4">{item.email || '-'}</td>
                        <td className="py-3 px-4">{item.region || '-'}</td>
                        <td className="py-3 px-4">{item.expectedMealCount ? `${item.expectedMealCount}명` : '-'}</td>
                        <td className="py-3 px-4">{item.serviceType || '-'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full border text-xs font-medium ${getWebhookStatusColor(item.webhookStatus)}`}>
                            {getWebhookStatusLabel(item.webhookStatus)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                disabled={updatingId === item.id}
                                className={`px-3 py-1 rounded-full border font-medium text-xs cursor-pointer transition-colors hover:opacity-80 ${getStatusColor(item.status || 'pending')}`}
                              >
                                {getStatusLabel(item.status || 'pending')}
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {STATUS_OPTIONS.map((status) => (
                                <DropdownMenuItem
                                  key={status}
                                  onClick={() => handleStatusChange(item.id, status)}
                                  disabled={updatingId === item.id}
                                >
                                  {getStatusLabel(status)}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
