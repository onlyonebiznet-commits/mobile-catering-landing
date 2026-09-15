import type { HTMLAttributes } from "react";

type AdvertisingConsentDetailsProps = HTMLAttributes<HTMLDivElement>;

/**
 * The approved advertising-information transmission notice shared by the
 * main consultation form and the recommendation widget.
 */
export function AdvertisingConsentDetails({ className = "", ...props }: AdvertisingConsentDetailsProps) {
  return (
    <div
      className={`advertising-consent-details space-y-4 text-[8px] leading-relaxed text-gray-600 md:text-xs ${className}`}
      {...props}
    >
      <p>
        CJ프레시웨이㈜는 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제50조에 따라, ‘마케팅 목적의 개인정보 수집 및 이용’에 동의하신 고객님께 아래와 같이 광고성 정보를 전송합니다.
      </p>

      <div className="grid grid-cols-[minmax(5rem,0.8fr)_minmax(0,2fr)] border border-gray-300 bg-white text-left">
        <div className="border-r border-gray-300 bg-gray-100 px-2 py-2 text-center font-semibold text-gray-900">구분</div>
        <div className="bg-gray-100 px-2 py-2 text-center font-semibold text-gray-900">내용</div>

        <div className="border-r border-t border-gray-300 px-2 py-3 font-medium text-gray-900">전송 내용</div>
        <div className="border-t border-gray-300 px-2 py-3">서비스 소개, 신규 서비스 안내, 이벤트·프로모션 및 혜택 정보 등</div>

        <div className="border-r border-t border-gray-300 px-2 py-3 font-medium text-gray-900">전송 매체</div>
        <div className="border-t border-gray-300 px-2 py-3">
          <div>[체크박스] SMS(문자)</div>
          <div>[체크박스] 이메일</div>
          <div>[체크박스] 카카오톡</div>
        </div>

        <div className="border-r border-t border-gray-300 px-2 py-3 font-medium text-gray-900">수신 거부 방법</div>
        <div className="border-t border-gray-300 px-2 py-3">
          CJ프레시웨이 고객센터(1588-8161/1588-6967 / www.cjfreshway.com), 각 전송 메시지 내 수신거부 기능
        </div>
      </div>

      <p className="border-t border-gray-300 pt-3">
        * 귀하는 광고성 정보 수신에 대한 동의를 거부하실 권리가 있습니다. 동의를 거부하실 경우 광고성 정보를 받으실 수 없으나, 서비스 이용에는 지장이 없습니다. 동의 이후에도 언제든지 수신을 거부하실 수 있습니다.
      </p>
    </div>
  );
}
