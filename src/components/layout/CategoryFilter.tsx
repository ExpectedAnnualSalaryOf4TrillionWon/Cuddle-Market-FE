const categories = [
  { id: 'all', name: '전체', count: 3847 },
  { id: 'food', name: '사료/간식', count: 623 },
  { id: 'toys', name: '장난감', count: 442 },
  { id: 'housing', name: '사육장/하우스', count: 387 },
  { id: 'health', name: '건강/위생', count: 256 },
  { id: 'accessories', name: '의류/악세사리', count: 198 },
  { id: 'equipment', name: '사육장비', count: 167 },
  { id: 'carrier', name: '이동장/목줄', count: 134 },
  { id: 'etc', name: '기타', count: 89 },
];

const petCategories = {
  mammal: {
    name: '포유류',
    count: 2156,
    pets: [
      { id: 'dog', name: '강아지', count: 1245 },
      { id: 'cat', name: '고양이', count: 892 },
      { id: 'rabbit', name: '토끼', count: 143 },
      { id: 'hamster', name: '햄스터', count: 98 },
      { id: 'guinea_pig', name: '기니피그', count: 67 },
      { id: 'ferret', name: '페럿', count: 45 },
      { id: 'chinchilla', name: '친칠라', count: 32 },
      { id: 'hedgehog', name: '고슴도치', count: 28 },
    ],
  },
  bird: {
    name: '조류',
    count: 287,
    pets: [
      { id: 'parakeet', name: '잉꼬', count: 156 },
      { id: 'parrot', name: '앵무새', count: 89 },
      { id: 'canary', name: '카나리아', count: 42 },
    ],
  },
  reptile: {
    name: '파충류',
    count: 198,
    pets: [
      { id: 'lizard', name: '도마뱀', count: 89 },
      { id: 'snake', name: '뱀', count: 67 },
      { id: 'turtle', name: '거북이', count: 42 },
    ],
  },
  aquatic: {
    name: '수생동물',
    count: 156,
    pets: [
      { id: 'fish', name: '물고기', count: 89 },
      { id: 'shrimp', name: '새우', count: 45 },
      { id: 'snail', name: '달팽이', count: 22 },
    ],
  },
  insect: {
    name: '곤충/절지동물',
    count: 67,
    pets: [
      { id: 'spider', name: '거미', count: 34 },
      { id: 'beetle', name: '딱정벌레', count: 23 },
      { id: 'mantis', name: '사마귀', count: 10 },
    ],
  },
};
export function CategoryFilter() {
  return (
    <div className="border-b border-border bg-light">
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-xl">
        {/* 상품 카테고리 */}
        <section aria-labelledby="category-heading" className="mb-2xl">
          <h3 id="category-heading" className="mb-md tablet:mb-lg heading5 text-text-primary">
            상품 카테고리
          </h3>

          <nav aria-label="상품 카테고리 목록">
            <ul className="flex flex-wrap gap-sm">
              {categories.map(category => (
                <li key={category.id}>
                  <button
                    type="button"
                    className="inline-flex items-center px-md py-xs rounded-md border border-border bg-bg bodySmall text-text-primary transition focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/50 hover:bg-primary/10"
                  >
                    {category.name}
                    <span className="ml-sm inline-flex items-center px-sm py-[2px] rounded-md border border-border bg-secondary caption text-text-primary">
                      {category.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        {/* 반려동물 종류 */}
        <section aria-labelledby="pet-type-heading">
          <h3 id="pet-type-heading" className="mb-md tablet:mb-lg heading5 text-text-primary">
            반려동물 종류
          </h3>

          {/* 상위 분류 탭 */}
          <nav aria-label="반려동물 상위 분류" className="mb-lg">
            <ul className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-5 gap-sm">
              {Object.entries(petCategories).map(([key, category]) => (
                <li key={key}>
                  <button
                    type="button"
                    className="w-full px-md py-sm rounded-md border border-border bg-bg bodySmall text-text-primary text-left transition focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/50 hover:bg-primary/10"
                  >
                    {category.name}
                    <span className="ml-sm caption text-text-secondary">{category.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* 하위 분류(개체) */}
          <div className="space-y-xl">
            {Object.entries(petCategories).map(([key, category]) => (
              <div key={key} aria-labelledby={`pet-sub-${key}`}>
                <h4 id={`pet-sub-${key}`} className="mb-sm heading5 text-text-primary">
                  {category.name}
                </h4>
                <ul className="flex flex-wrap gap-sm">
                  {category.pets.map(pet => (
                    <li key={pet.id}>
                      <button
                        type="button"
                        className="inline-flex items-center px-md py-xs rounded-md border border-border bg-bg bodySmall text-text-primary transition focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/50 hover:bg-primary/10"
                      >
                        <span>{pet.name}</span>
                        <span className="ml-sm caption text-text-secondary">{pet.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
export default CategoryFilter;
