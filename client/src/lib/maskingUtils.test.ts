import { describe, it, expect } from 'vitest';
import { maskName, maskPhone, maskEmail, maskCompanyName, maskAddress } from './maskingUtils';

describe('maskingUtils', () => {
  describe('maskName', () => {
    it('should mask name correctly', () => {
      expect(maskName('김철수')).toBe('김**');
      expect(maskName('김')).toBe('김');
      expect(maskName('')).toBe('-');
      expect(maskName(null)).toBe('-');
      expect(maskName(undefined)).toBe('-');
    });

    it('should handle single character names', () => {
      expect(maskName('김')).toBe('김');
    });

    it('should handle long names', () => {
      expect(maskName('김철수이')).toBe('김***');
    });
  });

  describe('maskPhone', () => {
    it('should mask phone with hyphens', () => {
      expect(maskPhone('010-1234-5678')).toBe('010-****-5678');
      expect(maskPhone('02-123-4567')).toBe('02-****-4567');
    });

    it('should mask phone without hyphens', () => {
      expect(maskPhone('01012345678')).toBe('010****5678');
    });

    it('should handle invalid inputs', () => {
      expect(maskPhone('')).toBe('-');
      expect(maskPhone(null)).toBe('-');
      expect(maskPhone(undefined)).toBe('-');
    });

    it('should handle short phone numbers', () => {
      expect(maskPhone('123')).toBe('123');
    });
  });

  describe('maskEmail', () => {
    it('should mask email correctly', () => {
      expect(maskEmail('test@company.com')).toBe('t**t@company.com');
      expect(maskEmail('a@company.com')).toBe('a*@company.com');
    });

    it('should handle long local parts', () => {
      expect(maskEmail('testuser@company.com')).toBe('t******r@company.com');
    });

    it('should handle invalid inputs', () => {
      expect(maskEmail('')).toBe('-');
      expect(maskEmail(null)).toBe('-');
      expect(maskEmail(undefined)).toBe('-');
    });

    it('should handle emails without @', () => {
      expect(maskEmail('invalidemail')).toBe('invalidemail');
    });
  });

  describe('maskCompanyName', () => {
    it('should mask company name correctly', () => {
      expect(maskCompanyName('CJ제일제당')).toBe('CJ****');
      expect(maskCompanyName('테스트회사')).toBe('테스***');
    });

    it('should handle short company names', () => {
      expect(maskCompanyName('CJ')).toBe('CJ');
      expect(maskCompanyName('C')).toBe('C');
    });

    it('should handle invalid inputs', () => {
      expect(maskCompanyName('')).toBe('-');
      expect(maskCompanyName(null)).toBe('-');
      expect(maskCompanyName(undefined)).toBe('-');
    });
  });

  describe('maskAddress', () => {
    it('should mask address correctly', () => {
      expect(maskAddress('서울시 강남구 테헤란로 123')).toBe('서울시 강남구 ***');
    });

    it('should handle short addresses', () => {
      expect(maskAddress('서울시 강남구')).toBe('서울시 강남구');
    });

    it('should handle invalid inputs', () => {
      expect(maskAddress('')).toBe('-');
      expect(maskAddress(null)).toBe('-');
      expect(maskAddress(undefined)).toBe('-');
    });
  });
});
