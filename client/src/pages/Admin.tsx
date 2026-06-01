import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Download, RefreshCw } from "lucide-react";
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
  createdAt: string;
}

interface MaterialRequest {
  id: number;
  companyName: string;
  manager: string;
  phone: string;
  email: string | null;
  createdAt: string;
}

export default function Admin() {
  const [consultationRequests, setConsultationRequests] = useState<ConsultationRequest[]>([]);
  const [materialRequests, setMaterialRequests] = useState<MaterialRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/debug/requests");
      if (!response.ok) {
        throw new Error("요청 데이터를 불러올 수 없습니다");
      }
      const data = await response.json();
      setConsultationRequests(data.consultationRequests || []);
      setMaterialRequests(data.materialRequests || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const downloadCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      alert("다운로드할 데이터가 없습니다");
      return;
    }

    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            if (value === null || value === undefined) return "";
            if (typeof value === "string" && value.includes(",")) {
              return `"${value}"`;
            }
            return value;
          })
          .join(",")
      ),
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
          <p className="text-gray-600 mt-2">상담 신청 및 자료 요청 데이터 관리</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Refresh Button */}
        <div className="mb-6">
          <Button
            onClick={fetchRequests}
            disabled={isLoading}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            {isLoading ? "로딩 중..." : "새로고침"}
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="consultation" className="space-y-4">
          <TabsList>
            <TabsTrigger value="consultation">
              상담 신청 ({consultationRequests.length})
            </TabsTrigger>
            <TabsTrigger value="material">
              자료 요청 ({materialRequests.length})
            </TabsTrigger>
          </TabsList>

          {/* Consultation Requests Tab */}
          <TabsContent value="consultation" className="space-y-4">
            {consultationRequests.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">상담 신청 데이터가 없습니다</p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => downloadCSV(consultationRequests, "consultation-requests.csv")}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    CSV 다운로드
                  </Button>
                </div>
                <div className="space-y-4">
                  {consultationRequests.map((request) => (
                    <Card key={request.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{request.companyName}</CardTitle>
                            <CardDescription>
                              ID: {request.id} • {new Date(request.createdAt).toLocaleString("ko-KR")}
                            </CardDescription>
                          </div>
                          <Badge variant="outline">상담 신청</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-600">담당자</p>
                            <p className="text-gray-900">{request.manager}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">연락처</p>
                            <p className="text-gray-900">{request.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">이메일</p>
                            <p className="text-gray-900">{request.email || "-"}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">희망 서비스</p>
                            <p className="text-gray-900">{request.serviceType || "-"}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">지역</p>
                            <p className="text-gray-900">{request.region || "-"}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">예상 식수</p>
                            <p className="text-gray-900">{request.expectedMealCount || "-"}</p>
                          </div>
                        </div>
                        {request.inquiries && (
                          <div>
                            <p className="text-sm font-semibold text-gray-600">문의사항</p>
                            <p className="text-gray-900 whitespace-pre-wrap">{request.inquiries}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* Material Requests Tab */}
          <TabsContent value="material" className="space-y-4">
            {materialRequests.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">자료 요청 데이터가 없습니다</p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => downloadCSV(materialRequests, "material-requests.csv")}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    CSV 다운로드
                  </Button>
                </div>
                <div className="space-y-4">
                  {materialRequests.map((request) => (
                    <Card key={request.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{request.companyName}</CardTitle>
                            <CardDescription>
                              ID: {request.id} • {new Date(request.createdAt).toLocaleString("ko-KR")}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">자료 요청</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-600">담당자</p>
                            <p className="text-gray-900">{request.manager}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">연락처</p>
                            <p className="text-gray-900">{request.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">이메일</p>
                            <p className="text-gray-900">{request.email || "-"}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
