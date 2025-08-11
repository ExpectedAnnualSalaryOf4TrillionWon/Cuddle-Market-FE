export function CategoryFilter() {
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

  return (
    <div className="border-b border-gray-200" style={{ background: '#c8d9f0' }}>
      <div className="max-w-[1280px] mx-auto px-4 py-4">
        {/* 상품 카테고리 - 기본으로 열림 */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3">상품 카테고리</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button key={category.id} className="h-8">
                {category.name}
                <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 ml-2 text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 반려동물 종류 - 기본으로 열림 */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3">반려동물 종류</h3>
          <>
            <ul className="grid w-full grid-cols-5 mb-4">
              {Object.entries(petCategories).map(([key, category]) => (
                <button key={key} value={key} className="text-sm">
                  {category.name}
                  <span className="ml-1 text-xs">{category.count}</span>
                </button>
              ))}
            </ul>

            {Object.entries(petCategories).map(([key, category]) => (
              <div key={key}>
                <div className="flex flex-wrap gap-2">
                  {category.pets.map(pet => (
                    <button key={pet.id} className="h-8 flex items-center gap-1">
                      <span>{pet.name}</span>
                      <span className="ml-1 text-xs">{pet.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </>
        </div>
      </div>
    </div>
  );
}
export default CategoryFilter;
