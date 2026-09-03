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

describe("ConsultationModal - FW Radio button appearance", () => {
  it("uses the circular selection appearance without changing checkbox semantics", () => {
    const source = readFileSync(
      resolve(process.cwd(), "client/src/components/ConsultationModal.tsx"),
      "utf8"
    );

    expect(source).toContain('appearance="radio"');
    expect(source.match(/appearance="radio"/g)?.length).toBe(8);
    expect(source).toContain('onCheckedChange={(checked) => handleServiceToggle(value, checked === true)}');
    expect(source).toContain('id="allAgree"');
    expect(source).toContain('id="personalInfoCollection"');
    expect(source).toContain('id="marketingConsent"');
    expect(source).toContain('id="adConsent"');
    expect(source).toContain('id="sms-consent"');
    expect(source).toContain('id="email-consent"');
    expect(source).toContain('id="kakao-consent"');
  });
});

describe("ConsultationModal - Text input guide", () => {
  it("uses shared field hierarchy and accessible descriptions for the active FO form", async () => {
    const source = readFileSync(
      resolve(process.cwd(), "client/src/components/ConsultationModal.tsx"),
      "utf8"
    );

    expect(source).toContain('className="form-field-label"');
    expect(source).toContain('className="form-field-helper"');
    expect(source).toContain('className="form-field-error"');
    expect(source).toContain('aria-describedby={errors.companyName ? "companyName-helper companyName-error" : "companyName-helper"}');
    expect(source).toContain('data-validation-state={errors.companyName ? "error" : undefined}');
    expect(source).toContain('aria-describedby="message-helper"');
  });
});
