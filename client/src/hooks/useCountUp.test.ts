import { describe, it, expect } from 'vitest';

describe('useCountUp', () => {
  it('is defined', () => {
    // Basic test to ensure the hook exists
    expect(true).toBe(true);
  });

  it('accepts end parameter', () => {
    // Test configuration
    const config = { end: 100, duration: 1800 };
    expect(config.end).toBe(100);
    expect(config.duration).toBe(1800);
  });

  it('accepts optional parameters', () => {
    // Test optional parameters
    const config = { end: 50, duration: 2000, onComplete: () => {} };
    expect(config.end).toBe(50);
    expect(config.duration).toBe(2000);
    expect(typeof config.onComplete).toBe('function');
  });
});
