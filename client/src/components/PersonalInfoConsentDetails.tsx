import type { HTMLAttributes } from "react";

type PersonalInfoConsentDetailsProps = HTMLAttributes<HTMLDivElement>;

/**
 * The approved personal-information collection and use notice shared by the
 * main consultation form and the recommendation widget.
 */
export function PersonalInfoConsentDetails({ className = "", ...props }: PersonalInfoConsentDetailsProps) {
  return (
    <div
      className={`personal-info-consent-details space-y-4 text-[8px] leading-relaxed text-gray-600 md:text-xs ${className}`}
      {...props}
    >
      <p>
        CJ프레시웨이㈜는 서비스 상담 제공을 위해 아래와 같이 개인정보를 수집·이용합니다. 수집한 개인정보는 목적 이외의 용도로 처리하지 않으며, 처리 목적을 변경할 경우 별도로 안내하고 동의를 받겠습니다. 내용을 자세히 읽으신 후 동의 여부를 결정하여 주시기 바랍니다.
      </p>

      <section className="space-y-2" aria-labelledby="required-personal-info-title">
        <h3 id="required-personal-info-title" className="text-[20px] font-semibold text-gray-900 md:text-[24px]">
          <span className="text-status-error">(필수)</span> 개인정보 수집 및 이용
        </h3>
        <div className="grid grid-cols-3 border border-gray-300 bg-white text-left">
          <div className="border-r border-gray-300 bg-gray-100 px-2 py-2 text-center font-semibold text-gray-900">수집·이용 목적</div>
          <div className="border-r border-gray-300 bg-gray-100 px-2 py-2 text-center font-semibold text-gray-900">수집 항목</div>
          <div className="bg-gray-100 px-2 py-2 text-center font-semibold text-gray-900">보유·이용 기간</div>
          <div className="border-r border-t border-gray-300 px-2 py-3">서비스 상담 신청 접수, 상담 진행</div>
          <div className="border-r border-t border-gray-300 px-2 py-3">성명, 기업명, 연락처, 이메일주소, 지역, 예상 식수</div>
          <div className="border-t border-gray-300 px-2 py-3">상담일로부터 1개월</div>
        </div>
      </section>

      <section className="space-y-2" aria-labelledby="optional-consultation-info-title">
        <h3 id="optional-consultation-info-title" className="font-semibold text-gray-900">
          <span className="text-status-error">(선택)</span> 상담 내용 관련 정보
        </h3>
        <div className="grid grid-cols-3 border border-gray-300 bg-white text-left">
          <div className="border-r border-gray-300 bg-gray-100 px-2 py-2 text-center font-semibold text-gray-900">수집·이용 목적</div>
          <div className="border-r border-gray-300 bg-gray-100 px-2 py-2 text-center font-semibold text-gray-900">수집 항목</div>
          <div className="bg-gray-100 px-2 py-2 text-center font-semibold text-gray-900">보유·이용 기간</div>
          <div className="border-r border-t border-gray-300 px-2 py-3">상담 내용 파악 및 맞춤 서비스 제안</div>
          <div className="border-r border-t border-gray-300 px-2 py-3">관심 서비스, 이용 환경, 요청사항(문의 내용)</div>
          <div className="border-t border-gray-300 px-2 py-3">상담일로부터 1개월</div>
        </div>
      </section>

      <p className="border-t border-gray-300 pt-3">
        * 귀하는 개인정보 수집 및 이용에 대한 동의를 거부하실 권리가 있습니다. 다만 필수항목에 대한 동의를 거부하실 경우 서비스 상담 신청이 제한됩니다. 선택항목은 입력하지 않으셔도 서비스 상담 이용에 제한이 없습니다.
      </p>
    </div>
  );
}
