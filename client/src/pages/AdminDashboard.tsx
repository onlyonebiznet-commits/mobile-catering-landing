import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ConsultationRequest {
  id: number;
  created_at: string;
  company_name: string;
  manager_name: string;
  phone: string;
  email: string;
  employee_count: number;
  inquiry_type: string;
  message: string;
  status: string;
}

interface MaterialRequest {
  id: number;
  created_at: string;
  company_name: string;
  manager_name: string;
  phone: string;
  email: string;
  download_file: string;
  status: string;
}

interface Stats {
  consultationToday: number;
  consultationMonth: number;
  materialToday: number;
  materialMonth: number;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [materials, setMaterials] = useState<MaterialRequest[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

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
      const [consultResponse, materialResponse, statsResponse] = await Promise.all([
        fetch('/api/admin/consultations', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch('/api/admin/materials', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch('/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (!consultResponse.ok || !materialResponse.ok || !statsResponse.ok) {
        setError('데이터를 불러올 수 없습니다');
        return;
      }

      const consultData = await consultResponse.json();
      const materialData = await materialResponse.json();
      const statsData = await statsResponse.json();

      setConsultations(consultData.data || []);
      setMaterials(materialData.data || []);
      setStats(statsData);
    } catch (err) {
      setError('데이터 로드 중 오류가 발생했습니다');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setLocation('/admin/login');
  };

  const handleExport = async (type: 'consultation' | 'material') => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch(`/api/admin/export?type=${type}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('내보내기 중 오류가 발생했습니다');
      console.error('Export error:', err);
    }
  };

  const handleStatusChange = async (type: 'consultation' | 'material', id: number, newStatus: string) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch('/api/admin/update-status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ type, id, status: newStatus }),
      });

      if (!response.ok) throw new Error('Status update failed');

      fetchData();
    } catch (err) {
      setError('상태 업데이트 중 오류가 발생했습니다');
      console.error('Status update error:', err);
    }
  };

  const filteredConsultations = consultations.filter(c => {
    const matchesSearch = c.company_name.includes(searchTerm) ||
      c.manager_name.includes(searchTerm) ||
      c.phone.includes(searchTerm);
    const matchesStatus = !statusFilter || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredMaterials = materials.filter(m => {
    const matchesSearch = m.company_name.includes(searchTerm) ||
      m.manager_name.includes(searchTerm) ||
      m.phone.includes(searchTerm);
    const matchesStatus = !statusFilter || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <p className="text-slate-600 text-sm">오늘 상담 신청</p>
              <p className="text-3xl font-bold text-slate-900">{stats.consultationToday}</p>
            </Card>
            <Card className="p-6">
              <p className="text-slate-600 text-sm">이번 달 상담 신청</p>
              <p className="text-3xl font-bold text-slate-900">{stats.consultationMonth}</p>
            </Card>
            <Card className="p-6">
              <p className="text-slate-600 text-sm">오늘 자료 신청</p>
              <p className="text-3xl font-bold text-slate-900">{stats.materialToday}</p>
            </Card>
            <Card className="p-6">
              <p className="text-slate-600 text-sm">이번 달 자료 신청</p>
              <p className="text-3xl font-bold text-slate-900">{stats.materialMonth}</p>
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
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm"
            >
              <option value="">모든 상태</option>
              <option value="신규">신규</option>
              <option value="처리중">처리중</option>
              <option value="완료">완료</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="consultations" className="w-full">
          <TabsList>
            <TabsTrigger value="consultations">상담 신청 ({filteredConsultations.length})</TabsTrigger>
            <TabsTrigger value="materials">자료 신청 ({filteredMaterials.length})</TabsTrigger>
          </TabsList>

          {/* Consultations Tab */}
          <TabsContent value="consultations">
            <Card>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">상담 신청 목록</h2>
                  <Button onClick={() => handleExport('consultation')} size="sm">
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
                          <th className="text-left py-3 px-4 font-semibold">문의 유형</th>
                          <th className="text-left py-3 px-4 font-semibold">상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredConsultations.map((item) => (
                          <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50">
                            <td className="py-3 px-4">{new Date(item.created_at).toLocaleString('ko-KR')}</td>
                            <td className="py-3 px-4">{item.company_name}</td>
                            <td className="py-3 px-4">{item.manager_name}</td>
                            <td className="py-3 px-4">{item.phone}</td>
                            <td className="py-3 px-4">{item.email}</td>
                            <td className="py-3 px-4">{item.inquiry_type}</td>
                            <td className="py-3 px-4">
                              <select
                                value={item.status || '신규'}
                                onChange={(e) => handleStatusChange('consultation', item.id, e.target.value)}
                                className="px-2 py-1 border border-slate-300 rounded text-sm"
                              >
                                <option value="신규">신규</option>
                                <option value="처리중">처리중</option>
                                <option value="완료">완료</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials">
            <Card>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">자료 신청 목록</h2>
                  <Button onClick={() => handleExport('material')} size="sm">
                    CSV 다운로드
                  </Button>
                </div>

                {loading ? (
                  <p className="text-slate-600">로딩 중...</p>
                ) : filteredMaterials.length === 0 ? (
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
                          <th className="text-left py-3 px-4 font-semibold">신청 자료</th>
                          <th className="text-left py-3 px-4 font-semibold">상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMaterials.map((item) => (
                          <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50">
                            <td className="py-3 px-4">{new Date(item.created_at).toLocaleString('ko-KR')}</td>
                            <td className="py-3 px-4">{item.company_name}</td>
                            <td className="py-3 px-4">{item.manager_name}</td>
                            <td className="py-3 px-4">{item.phone}</td>
                            <td className="py-3 px-4">{item.email}</td>
                            <td className="py-3 px-4">{item.download_file}</td>
                            <td className="py-3 px-4">
                              <select
                                value={item.status || '신규'}
                                onChange={(e) => handleStatusChange('material', item.id, e.target.value)}
                                className="px-2 py-1 border border-slate-300 rounded text-sm"
                              >
                                <option value="신규">신규</option>
                                <option value="처리중">처리중</option>
                                <option value="완료">완료</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
