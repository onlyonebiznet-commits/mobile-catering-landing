import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(
  resolve(process.cwd(), "client/src/pages/Home.tsx"),
  "utf8"
);

describe("FO card surface consistency", () => {
  it("uses white surfaces for meal and cafe cards on desktop and mobile", () => {
    expect(home).not.toContain('className="bg-gray-50 rounded-[10px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow"');
    expect(home).not.toContain('className="bg-gray-50 rounded-[10px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow"');
    expect(home).toContain('className="bg-white rounded-[10px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow"');
    expect(home).toContain('className="bg-white rounded-[10px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow"');
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

  it("uses the reference-style diet presentation responsively on PC and mobile", () => {
    expect(home).toContain('className="relative overflow-hidden rounded-[10px] bg-white shadow-lg scroll-reveal"');
    expect(home).toContain('<div key={currentDietIndex} className="diet-card-transition relative">');
    expect(home).toContain('className="relative aspect-[4/3] overflow-hidden group cursor-grab active:cursor-grabbing select-none md:aspect-auto md:h-[420px]"');
    expect(home).toContain('grid grid-cols-1 gap-8 px-5 py-7 sm:px-7 md:grid-cols-[minmax(250px,0.8fr)_minmax(0,1.8fr)] md:gap-12 md:px-10 md:py-9');
    expect(home).toContain('고객 특성에 맞춰 구성됩니다');
    expect(home).toContain('className="hidden md:flex flex-col justify-center"');
    expect(home).not.toContain('맞춤 운영 사례');
    expect(home).toContain('eventTitle: "오피스 임직원 맞춤 식사"');
  });

  it("uses three menu previews and arrow navigation without dot pagination", () => {
    expect(home).toContain('className="grid grid-cols-3 gap-2 md:gap-4"');
    expect(home).not.toContain('aria-label="식단 선택"');
    expect(home.match(/aria-label="이전 식단 카드"/g)?.length).toBe(1);
    expect(home.match(/aria-label="다음 식단 카드"/g)?.length).toBe(1);
    expect(home).not.toContain('className="mt-7 flex items-center gap-2" aria-label="식단 선택"');
    expect(home).not.toContain("좌우로 밀어보거나 화살표로 다른 식단을 확인해보세요");
  });

  it("uses a 4:3 image ratio for the mobile customer diet card", () => {
    expect(home).toContain('data-diet-carousel');
    expect(home).toContain('className="relative aspect-[4/3] overflow-hidden');
    expect(home).toContain('className="grid grid-cols-1 gap-8 px-5 py-7 sm:px-7 md:grid-cols-[minmax(250px,0.8fr)_minmax(0,1.8fr)] md:gap-12 md:px-10 md:py-9"');
    expect(home).toContain('className="absolute inset-0 w-full h-full object-cover');
  });

  it("provides swipe navigation and accessible mobile diet arrows", () => {
    expect(home).toContain('onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}');
    expect(home).toContain('onTouchCancel={() => setTouchStart(0)}');
    expect(home).toContain('aria-label="이전 식단 카드"');
    expect(home).toContain('aria-label="다음 식단 카드"');
    expect(home).toContain('className="pointer-events-auto absolute left-4');
    expect(home).toContain('className="pointer-events-auto absolute right-4');
    expect(home).toContain('className="pointer-events-none absolute inset-0"');
    expect(home.match(/aspect-\[4\/3\]/g)?.length).toBe(1);
  });

  it("uses six colored snackpick categories with responsive grids", () => {
    expect(home).toContain("const snackCategoryIcons");
    expect(home).toContain("const snackCategoryTones");
    expect(home).toContain("Reference-style category tiles - PC and mobile: 3 columns x 2 rows");
    expect(home).toContain('className="grid grid-cols-3 gap-3 md:gap-6"');
    expect(home).toContain("rounded-[10px]");
    expect(home).toContain("min-h-10");
    expect(home).toContain("md:min-h-12");
    expect(home).toContain("md:h-7 md:w-7");
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
