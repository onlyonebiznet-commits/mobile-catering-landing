import type { HTMLAttributes } from "react";

type MarketingConsentDetailsProps = HTMLAttributes<HTMLDivElement>;

/**
 * The approved marketing-information collection and use notice shared by the
 * main consultation form and the recommendation widget.
 */
export function MarketingConsentDetails({ className = "", ...props }: MarketingConsentDetailsProps) {
  return (
    <div
      className={`marketing-consent-details space-y-4 text-[8px] leading-relaxed text-gray-600 md:text-xs ${className}`}
      {...props}
    >
      <p>
        CJ프레시웨이㈜는 서비스 홍보 및 판매 권유 등 마케팅 목적으로 아래와 같이 개인정보를 수집·이용합니다. 내용을 자세히 읽으신 후 동의 여부를 결정하여 주시기 바랍니다.
      </p>

      <div className="grid grid-cols-3 border border-gray-300 bg-white text-left">
        <div className="border-r border-gray-300 bg-gray-100 px-2 py-2 text-center font-semibold text-gray-900">수집·이용 목적</div>
        <div className="border-r border-gray-300 bg-gray-100 px-2 py-2 text-center font-semibold text-gray-900">수집 항목</div>
        <div className="bg-gray-100 px-2 py-2 text-center font-semibold text-gray-900">보유·이용 기간</div>
        <div className="border-r border-t border-gray-300 px-2 py-3">서비스 홍보, 이벤트·혜택 안내 등 마케팅 및 판매 권유</div>
        <div className="border-r border-t border-gray-300 px-2 py-3">성명, 기업명, 연락처, 이메일주소</div>
        <div className="border-t border-gray-300 px-2 py-3">상담일로부터 1개월</div>
      </div>

      <p className="border-t border-gray-300 pt-3">
        * 귀하는 마케팅 목적의 개인정보 수집 및 이용에 대한 동의를 거부하실 권리가 있습니다. 동의를 거부하실 경우 프레시밀온 소식 및 혜택 안내를 받을 수 없으나, 서비스 상담 이용에는 영향을 미치지 않습니다. 동의 이후에도 언제든지 철회하실 수 있습니다. (문의: cjfwsecurity@cj.net / 고객센터 1588-8161/1588-6967)
      </p>
    </div>
  );
}
