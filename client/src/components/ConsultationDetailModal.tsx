import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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

interface ConsultationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultation: ConsultationRequest | null;
}

const getServiceTypeLabel = (serviceType: string | null | undefined): string => {
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

const getStatusLabel = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    'pending': '대기중',
    'in_progress': '진행중',
    'target': '타겟처',
    'prospect': '가망처',
    'won': '수주완료',
    'dropped': 'DROP',
    'new': '신규'
  };
  return statusMap[status] || status;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function ConsultationDetailModal({ isOpen, onClose, consultation }: ConsultationDetailModalProps) {
  if (!consultation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>상담 신청 상세 정보</DialogTitle>
          <DialogDescription>
            접수일: {formatDate(consultation.createdAt)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 기본 정보 섹션 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-900">기본 정보</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">회사명</label>
                <p className="text-gray-900 mt-1">{consultation.companyName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">담당자명</label>
                <p className="text-gray-900 mt-1">{consultation.manager}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">연락처</label>
                <p className="text-gray-900 mt-1">{consultation.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">이메일</label>
                <p className="text-gray-900 mt-1">{consultation.email || "-"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">지역</label>
                <p className="text-gray-900 mt-1">{consultation.region || "-"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">예상 식수</label>
                <p className="text-gray-900 mt-1">{consultation.expectedMealCount ? `${consultation.expectedMealCount}명` : "-"}</p>
              </div>
            </div>
          </div>

          {/* 서비스 정보 섹션 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-900">서비스 정보</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">희망 서비스</label>
                <p className="text-gray-900 mt-1">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-status-info/10 text-status-info">
                    {getServiceTypeLabel(consultation.serviceType)}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">진행 현황</label>
                <p className="text-gray-900 mt-1">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-status-success/10 text-status-success">
                    {getStatusLabel(consultation.status)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* 문의 사항 섹션 */}
          {consultation.inquiries && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-900">문의 사항</h3>
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <p className="text-gray-900 whitespace-pre-wrap">{consultation.inquiries}</p>
              </div>
            </div>
          )}

          {/* 버튼 */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              닫기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
