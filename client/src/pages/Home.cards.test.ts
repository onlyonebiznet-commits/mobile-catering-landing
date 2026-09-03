import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(
  resolve(process.cwd(), "client/src/pages/Home.tsx"),
  "utf8"
);

describe("FO card surface consistency", () => {
  it("uses white surfaces for meal and cafe cards on desktop and mobile", () => {
    expect(home).not.toContain('className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"');
    expect(home).not.toContain('className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"');
    expect(home).toContain('className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"');
    expect(home).toContain('className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"');
  });

  it("uses a white image surface for mobile meal and cafe cards", () => {
    expect(home).not.toContain("group bg-gray-100 flex items-center justify-center");
    expect(home).toContain("group bg-white flex items-center justify-center");
  });

  it("uses a scrollbar-free peek carousel for meals and cafes on mobile", () => {
    expect(home).toContain("snap-x snap-mandatory scroll-px-2 hide-scrollbar");
    expect(home).toContain("w-[calc(100vw-64px)] max-w-[320px] snap-center");
    expect(home.match(/hide-scrollbar/g)?.length).toBe(2);
  });

  it("keeps the shortened Korean meal description requested by the visual edit", () => {
    expect(home).toContain(
      'fullDescription: "한반도의 오랜 식문화를 계승한 정통 한식입니다. 계절 재료를 활용하여 영양 균형을 맞추고, 전통 양념과 조리법으로 깊은 맛을",'
    );
    expect(home).not.toContain("깊은 맛을 살렸습니다.");
  });

  it("keeps the shortened cafe dessert description requested by the visual edit", () => {
    expect(home).toContain(
      'fullDescription: "카페만의 특별한 디저트와 건강한 스낵을 준비했습니다. 신선한 재료로 매일 만드는 베이커리 제품과 함께 커피의 맛을 ",' 
    );
    expect(home).not.toContain("커피의 맛을 돋보이게 합니다.");
  });

  it("keeps the shortened premium coffee description requested by the visual edit", () => {
    expect(home).toContain(
      'fullDescription: "세계 각지에서 엄선한 최고급 원두를 사용하여 만든 프리미엄 커피입니다. 바리스타의 정성으로 완성된 특별한 맛과 향을",'
    );
    expect(home).not.toContain("특별한 맛과 향을 선사합니다.");
  });

  it("uses real on-site photos for customer success cards", () => {
    expect(home).not.toContain('image: "https://api.dicebear.com/7.x/avataaars/svg?seed=');
    expect(home).toContain('image: "/manus-storage/cropped_pasted_file_vNMOOM_KakaoTalk_20250219_170906076_11_1c1f5f37.jpg",');
    expect(home).toContain('image: "/manus-storage/cropped_fingerfood_04_6f773ed6.jpg",');
  });

  it("renders all six customer success stories on mobile", () => {
    expect(home).toContain("{/* Mobile: Full List - show all six success stories */}");
    expect(home).toContain("<div className=\"md:hidden space-y-4\">\n            {reviews.map((review, idx) => (");
    expect(home).not.toContain("reviews.slice(0, 3)");
  });

  it("uses the refined warm delivery and hygienic pickup copy", () => {
    expect(home).toContain('description: "따뜻하게 배송하고 위생적으로 수거합니다",');
    expect(home).not.toContain("따뜻한 상태로 배송 후 위생적으로 수거합니다");
  });

  it("uses a 4:3 image ratio for the mobile customer diet card", () => {
    expect(home).toContain('data-diet-carousel');
    expect(home).toContain('className="relative aspect-[4/3] overflow-hidden');
    expect(home).toContain('className="p-6 sm:p-8 md:p-12 flex flex-col justify-center aspect-[4/3]"');
    expect(home).toContain('className="absolute inset-0 w-full h-full object-cover');
  });

  it("provides swipe navigation and accessible mobile diet arrows", () => {
    expect(home).toContain('onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}');
    expect(home).toContain('onTouchCancel={() => setTouchStart(0)}');
    expect(home).toContain('aria-label="이전 식단 카드"');
    expect(home).toContain('aria-label="다음 식단 카드"');
    expect(home).toContain('className="pointer-events-auto absolute left-3');
    expect(home).toContain('className="pointer-events-auto absolute right-3');
    expect(home.match(/aspect-\[4\/3\]/g)?.length).toBe(2);
  });

  it("uses six colored snackpick categories with responsive grids", () => {
    expect(home).toContain("const snackCategoryIcons");
    expect(home).toContain("const snackCategoryTones");
    expect(home).toContain("Slim Filter Chips - PC: 1x6, Mobile: 3-column grid");
    expect(home).toContain('className="grid grid-cols-3 gap-2.5 md:grid-cols-6 md:gap-3"');
    expect(home).toContain("rounded-full");
    expect(home).toContain("md:min-h-14");
    expect(home).toContain("gap-1.5");
    ["베이커리", "샐러드", "샌드위치", "밥", "라면", "음료"].forEach((label) => {
      expect(home).toContain(`name: '${label}'`);
    });
    expect(home).not.toContain("id: 'yogurt'");
    expect(home).not.toContain("id: 'energybar'");
  });

  it("keeps hero autoplay state separate from the customer diet card state", () => {
    expect(home).toContain('const [currentHeroIndex, setCurrentHeroIndex] = useState(0);');
    expect(home).toContain('setCurrentHeroIndex((prev) => (prev + 1) % 3);');
    expect(home).toContain('src={diets[currentDietIndex].image}');
  });
});

export {};
