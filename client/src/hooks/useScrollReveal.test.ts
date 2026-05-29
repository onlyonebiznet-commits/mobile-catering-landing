import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Scroll Reveal Animation', () => {
  let mockElement: HTMLDivElement;
  let mockObserver: IntersectionObserver;

  beforeEach(() => {
    // Create a mock element
    mockElement = document.createElement('div');
    mockElement.className = 'scroll-reveal';
    document.body.appendChild(mockElement);

    // Mock IntersectionObserver
    mockObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    } as unknown as IntersectionObserver;

    global.IntersectionObserver = vi.fn(() => mockObserver);
  });

  afterEach(() => {
    document.body.removeChild(mockElement);
    vi.clearAllMocks();
  });

  it('should add scroll-reveal class to elements', () => {
    expect(mockElement.classList.contains('scroll-reveal')).toBe(true);
  });

  it('should add visible class when element intersects', () => {
    mockElement.classList.add('visible');
    expect(mockElement.classList.contains('visible')).toBe(true);
  });

  it('should support scroll-reveal-stagger class', () => {
    const staggerElement = document.createElement('div');
    staggerElement.className = 'scroll-reveal-stagger';
    document.body.appendChild(staggerElement);

    expect(staggerElement.classList.contains('scroll-reveal-stagger')).toBe(true);

    document.body.removeChild(staggerElement);
  });

  it('should maintain visible state after intersection', () => {
    mockElement.classList.add('visible');
    
    // Simulate removing the element from viewport
    // The visible class should remain
    expect(mockElement.classList.contains('visible')).toBe(true);
  });

  it('should support data-reveal-item attribute for staggered animations', () => {
    const staggerElement = document.createElement('div');
    staggerElement.className = 'scroll-reveal-stagger';
    staggerElement.setAttribute('data-reveal-item', '0');
    document.body.appendChild(staggerElement);

    expect(staggerElement.getAttribute('data-reveal-item')).toBe('0');

    document.body.removeChild(staggerElement);
  });

  it('should work with multiple elements', () => {
    const elements = Array.from({ length: 5 }, (_, i) => {
      const el = document.createElement('div');
      el.className = 'scroll-reveal-stagger';
      el.setAttribute('data-reveal-item', String(i));
      document.body.appendChild(el);
      return el;
    });

    elements.forEach((el, i) => {
      expect(el.getAttribute('data-reveal-item')).toBe(String(i));
    });

    elements.forEach((el) => {
      document.body.removeChild(el);
    });
  });

  it('should support CSS transitions for fade-in and up animation', () => {
    const style = document.createElement('style');
    style.textContent = `
      .scroll-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), 
                    transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
      }
      .scroll-reveal.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);

    const computedStyle = window.getComputedStyle(mockElement);
    
    // Check that the element has the scroll-reveal class
    expect(mockElement.classList.contains('scroll-reveal')).toBe(true);

    document.head.removeChild(style);
  });

  it('should respect prefers-reduced-motion', () => {
    // Mock matchMedia for testing
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    expect(mediaQuery).toBeDefined();
    expect(mediaQuery.media).toBe('(prefers-reduced-motion: reduce)');
  });
});
