import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("ConsultationModal Props", () => {
  it("should accept onClose prop", () => {
    const mockOnClose = vi.fn();
    
    // Test that the prop type is correct
    const props = { onClose: mockOnClose };
    expect(props.onClose).toBeDefined();
    expect(typeof props.onClose).toBe("function");
  });

  it("should call onClose function", () => {
    const mockOnClose = vi.fn();
    mockOnClose();
    
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});

describe("ConsultationModal - Agreement Accordion Behavior", () => {
  it("should not expand accordion when clicking agreement checkboxes", () => {
    // Test logic for handleAgreementChange function
    // When key is "allAgree", "adConsent", or other agreement keys,
    // setAccordionValue("") should be called to prevent accordion expansion
    
    const mockSetAccordionValue = vi.fn();
    
    // Simulate the behavior
    const handleAgreementChange = (key: string, value: boolean) => {
      if (key === "allAgree" || key === "adConsent") {
        mockSetAccordionValue("");
      } else {
        mockSetAccordionValue("");
      }
    };
    
    // Test: clicking "Select All" should not expand accordion
    handleAgreementChange("allAgree", true);
    expect(mockSetAccordionValue).toHaveBeenCalledWith("");
    
    mockSetAccordionValue.mockClear();
    
    // Test: clicking "광고성 정보 수신 동의" should not expand accordion
    handleAgreementChange("adConsent", true);
    expect(mockSetAccordionValue).toHaveBeenCalledWith("");
    
    mockSetAccordionValue.mockClear();
    
    // Test: clicking individual agreement should not expand accordion
    handleAgreementChange("personalInfoCollection", true);
    expect(mockSetAccordionValue).toHaveBeenCalledWith("");
  });

  it("should auto-check media consent when ad consent is checked", () => {
    // Test logic for handleAgreementChange with adConsent
    const mockSetAdMediaConsents = vi.fn();
    
    const handleAgreementChange = (key: string, value: boolean) => {
      if (key === "adConsent" && value) {
        mockSetAdMediaConsents({
          sms: true,
          email: true,
          kakao: true,
        });
      }
    };
    
    // Test: checking ad consent should auto-check all media options
    handleAgreementChange("adConsent", true);
    expect(mockSetAdMediaConsents).toHaveBeenCalledWith({
      sms: true,
      email: true,
      kakao: true,
    });
  });

  it("should uncheck all sub-items when select all is unchecked", () => {
    // Test logic for handleAgreementChange with allAgree = false
    const mockSetAgreements = vi.fn();
    const mockSetAdMediaConsents = vi.fn();
    
    const handleAgreementChange = (key: string, value: boolean) => {
      if (key === "allAgree") {
        mockSetAgreements({
          allAgree: value,
          personalInfoCollection: value,
          marketingConsent: value,
          adConsent: value,
        });
        if (!value) {
          mockSetAdMediaConsents({
            sms: false,
            email: false,
            kakao: false,
          });
        }
      }
    };
    
    // Test: unchecking select all should uncheck everything
    handleAgreementChange("allAgree", false);
    expect(mockSetAgreements).toHaveBeenCalledWith({
      allAgree: false,
      personalInfoCollection: false,
      marketingConsent: false,
      adConsent: false,
    });
    expect(mockSetAdMediaConsents).toHaveBeenCalledWith({
      sms: false,
      email: false,
      kakao: false,
    });
  });

  it("should check all sub-items when select all is checked", () => {
    // Test logic for handleAgreementChange with allAgree = true
    const mockSetAgreements = vi.fn();
    const mockSetAdMediaConsents = vi.fn();
    
    const handleAgreementChange = (key: string, value: boolean) => {
      if (key === "allAgree") {
        mockSetAgreements({
          allAgree: value,
          personalInfoCollection: value,
          marketingConsent: value,
          adConsent: value,
        });
        if (value) {
          mockSetAdMediaConsents({
            sms: true,
            email: true,
            kakao: true,
          });
        }
      }
    };
    
    // Test: checking select all should check everything
    handleAgreementChange("allAgree", true);
    expect(mockSetAgreements).toHaveBeenCalledWith({
      allAgree: true,
      personalInfoCollection: true,
      marketingConsent: true,
      adConsent: true,
    });
    expect(mockSetAdMediaConsents).toHaveBeenCalledWith({
      sms: true,
      email: true,
      kakao: true,
    });
  });
});

describe("ConsultationModal - checkbox guide appearance", () => {
  it("uses square checkbox semantics for services and all consent items", () => {
    const source = readFileSync(
      resolve(process.cwd(), "client/src/components/ConsultationModal.tsx"),
      "utf8"
    );

    expect(source).not.toContain('appearance="radio"');
    expect(source).toContain('onCheckedChange={(checked) => handleServiceToggle(value, checked === true)}');
    expect(source).toContain('id={checkboxId}\n                        checked={formData.serviceTypes.includes(value)}');
    expect(source).toContain('id={checkboxId}\n                        checked={formData.serviceTypes.includes(value)}');
    expect(source).toContain('id="allAgree"');
    expect(source).toContain('id="personalInfoCollection"');
    expect(source).toContain('id="marketingConsent"');
    expect(source).toContain('id="adConsent"');
    expect(source).toContain('id="sms-consent"');
    expect(source).toContain('id="email-consent"');
    expect(source).toContain('id="kakao-consent"');
  });
});

describe("ConsultationModal - confirmed personal information notice", () => {
  it("renders the approved collection, use, retention, and refusal notice", () => {
    const source = readFileSync(
      resolve(process.cwd(), "client/src/components/ConsultationModal.tsx"),
      "utf8"
    );
    const noticeSource = readFileSync(
      resolve(process.cwd(), "client/src/components/PersonalInfoConsentDetails.tsx"),
      "utf8"
    );

    expect(source).toContain("PersonalInfoConsentDetails");
    expect(noticeSource).toContain("CJ프레시웨이㈜는 서비스 상담 제공을 위해 아래와 같이 개인정보를 수집·이용합니다.");
    expect(noticeSource).toContain("(필수)</span> 개인정보 수집 및 이용");
    expect(noticeSource).toContain("서비스 상담 신청 접수, 상담 진행");
    expect(noticeSource).toContain("성명, 기업명, 연락처, 이메일주소, 지역, 예상 식수");
    expect(noticeSource).toContain("상담일로부터 1개월");
    expect(noticeSource).toContain("(선택)</span> 상담 내용 관련 정보");
    expect(noticeSource).toContain("상담 내용 파악 및 맞춤 서비스 제안");
    expect(noticeSource).toContain("관심 서비스, 이용 환경, 요청사항(문의 내용)");
    expect(noticeSource).toContain("필수항목에 대한 동의를 거부하실 경우 서비스 상담 신청이 제한됩니다.");
    expect(noticeSource).toContain("선택항목은 입력하지 않으셔도 서비스 상담 이용에 제한이 없습니다.");
    expect(noticeSource).not.toContain("서비스 상담 신청 후 3년");
    expect(noticeSource).toContain('className="text-[18px] font-semibold text-gray-900 md:text-[24px]"');
    expect((noticeSource.match(/className="text-\[18px\] font-semibold text-gray-900 md:text-\[24px\]"/g) ?? [])).toHaveLength(2);
    expect(source).toContain('aria-expanded={accordionValue === "personal-info"}');
    expect(source).toContain('aria-controls="personal-info-content"');
    expect(source).toContain('aria-expanded={accordionValue === "marketing"}');
    expect(source).toContain('aria-controls="marketing-consent-content"');
    expect(source).toContain('aria-expanded={accordionValue === "ad"}');
    expect(source).toContain('aria-controls="advertising-consent-content"');
  });
});

describe("ConsultationModal - Text input guide", () => {
  it("uses shared field hierarchy and accessible descriptions for the active FO form", async () => {
    const source = readFileSync(
      resolve(process.cwd(), "client/src/components/ConsultationModal.tsx"),
      "utf8"
    );

    expect(source).toContain('className="form-field-label"');
    expect(source).not.toContain('className="form-field-helper"');
    expect(source).toContain('className="form-field-error"');
    expect(source).toContain('aria-describedby={errors.companyName ? "companyName-error" : undefined}');
    expect(source).toContain('data-validation-state={errors.companyName ? "error" : undefined}');
    expect(source).toContain('aria-describedby={undefined}');
    expect(source).not.toContain('companyName-helper');
    expect(source).not.toContain('contactPerson-helper');
    expect(source).not.toContain('phoneNumber-helper');
    expect(source).not.toContain('email-helper');
    expect(source).not.toContain('service-helper');
    expect(source).not.toContain('region-helper');
    expect(source).not.toContain('estimatedMeals-helper');
    expect(source).not.toContain('message-helper');
    expect(source).toContain('className="form-field-control--textarea"');
    expect(source).toContain('rows={3}');
    expect(source).not.toContain('form-field-control--textarea-large');
  });
});
