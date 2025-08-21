import { useEffect, useRef, useState } from 'react';
import { FiFilter } from 'react-icons/fi';

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
  all: {
    name: '전체',
    count: 2156 + 287 + 198 + 156 + 67,
    selected: true, // 기본 선택
    pets: [
      // 모든 대분류의 pets 배열을 합친다
      { id: 'dog', name: '강아지', count: 1245 },
      { id: 'cat', name: '고양이', count: 892 },
      { id: 'rabbit', name: '토끼', count: 143 },
      { id: 'hamster', name: '햄스터', count: 98 },
      { id: 'guinea_pig', name: '기니피그', count: 67 },
      { id: 'ferret', name: '페럿', count: 45 },
      { id: 'chinchilla', name: '친칠라', count: 32 },
      { id: 'hedgehog', name: '고슴도치', count: 28 },

      { id: 'parakeet', name: '잉꼬', count: 156 },
      { id: 'parrot', name: '앵무새', count: 89 },
      { id: 'canary', name: '카나리아', count: 42 },

      { id: 'lizard', name: '도마뱀', count: 89 },
      { id: 'snake', name: '뱀', count: 67 },
      { id: 'turtle', name: '거북이', count: 42 },

      { id: 'fish', name: '물고기', count: 89 },
      { id: 'shrimp', name: '새우', count: 45 },
      { id: 'snail', name: '달팽이', count: 22 },

      { id: 'spider', name: '거미', count: 34 },
      { id: 'beetle', name: '딱정벌레', count: 23 },
      { id: 'mantis', name: '사마귀', count: 10 },
    ],
  },
  mammal: {
    name: '포유류',
    count: 2156,
    selected: false,
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
    selected: false,
    pets: [
      { id: 'parakeet', name: '잉꼬', count: 156 },
      { id: 'parrot', name: '앵무새', count: 89 },
      { id: 'canary', name: '카나리아', count: 42 },
    ],
  },
  reptile: {
    name: '파충류',
    count: 198,
    selected: false,
    pets: [
      { id: 'lizard', name: '도마뱀', count: 89 },
      { id: 'snake', name: '뱀', count: 67 },
      { id: 'turtle', name: '거북이', count: 42 },
    ],
  },
  aquatic: {
    name: '수생동물',
    count: 156,
    selected: false,
    pets: [
      { id: 'fish', name: '물고기', count: 89 },
      { id: 'shrimp', name: '새우', count: 45 },
      { id: 'snail', name: '달팽이', count: 22 },
    ],
  },
  insect: {
    name: '곤충/절지동물',
    count: 67,
    selected: false,
    pets: [
      { id: 'spider', name: '거미', count: 34 },
      { id: 'beetle', name: '딱정벌레', count: 23 },
      { id: 'mantis', name: '사마귀', count: 10 },
    ],
  },
};
const CITIES = {
  서울특별시: [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ],
  부산광역시: [
    '강서구',
    '금정구',
    '기장군',
    '남구',
    '동구',
    '동래구',
    '부산진구',
    '북구',
    '사상구',
    '사하구',
    '서구',
    '수영구',
    '연제구',
    '영도구',
    '중구',
    '해운대구',
  ],
  대구광역시: ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'],
  인천광역시: [
    '강화군',
    '계양구',
    '남동구',
    '동구',
    '미추홀구',
    '부평구',
    '서구',
    '연수구',
    '옹진군',
    '중구',
  ],
  광주광역시: ['광산구', '남구', '동구', '북구', '서구'],
  대전광역시: ['대덕구', '동구', '서구', '유성구', '중구'],
  울산광역시: ['남구', '동구', '북구', '울주군', '중구'],
  세종특별자치시: ['세종시'],
} as const;
type Province = keyof typeof CITIES;
const PROVINCES = Object.keys(CITIES) as Province[];

type ConditionValue = 'new' | 'nearly' | 'used' | 'defect' | 'repair';
interface ConditionItem {
  value: ConditionValue;
  title: string;
}
const conditionItems: ReadonlyArray<ConditionItem> = [
  { value: 'new', title: '새상품' },
  { value: 'nearly', title: '거의새것' },
  { value: 'used', title: '사용감있음' },
  { value: 'defect', title: '하자있음' },
  { value: 'repair', title: '수리필요' },
];

type PriceValue = 'new' | 'nearly' | 'used' | 'defect' | 'repair';
interface PriceItem {
  value: PriceValue;
  title: string;
}
const priceItems: ReadonlyArray<PriceItem> = [
  { value: 'new', title: '1만원 이하' },
  { value: 'nearly', title: '1만원 이상' },
  { value: 'used', title: '5만원 이상' },
  { value: 'defect', title: '10만원 이상' },
];

export function CategoryFilter() {
  // 거주지
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [showProvinceSelect, setShowProvinceSelect] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showCitySelect, setShowCitySelect] = useState(false);
  const cityOptions = selectedProvince ? CITIES[selectedProvince] : [];

  const provinceBoxRef = useRef<HTMLDivElement | null>(null);
  const cityBoxRef = useRef<HTMLDivElement | null>(null);

  const handleSelectProvince = (opt: Province) => {
    setSelectedProvince(opt);
    setSelectedCity(''); // 시/도 변경 시 구/군 초기화
    setShowProvinceSelect(false); // 시/도 목록 닫기
    setShowCitySelect(false);
  };

  const handleSelectCity = (opt: string) => {
    setSelectedCity(opt);
    setShowCitySelect(false);
  };

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      // 시/도 드롭다운 바깥 클릭
      if (
        showProvinceSelect &&
        provinceBoxRef.current &&
        !provinceBoxRef.current.contains(target)
      ) {
        setShowProvinceSelect(false);
      }
      // 구/군 드롭다운 바깥 클릭
      if (showCitySelect && cityBoxRef.current && !cityBoxRef.current.contains(target)) {
        setShowCitySelect(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showProvinceSelect) setShowProvinceSelect(false);
        if (showCitySelect) setShowCitySelect(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showProvinceSelect, showCitySelect]);
  return (
    <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-xl flex flex-col gap-xl">
      {/* 반려동물 종류 */}
      <div>
        <h3 id="pet-type-heading" className="tablet:mb-lg heading5 text-text-primary">
          반려동물 종류
        </h3>

        {/* 상위 분류 탭 */}
        <div
          role="tablist"
          aria-label="반려동물 상위 분류"
          className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-6 gap-sm px-sm py-sm rounded-3xl bg-dark/25"
        >
          {Object.entries(petCategories).map(([key, category]) => (
            <button
              key={key}
              role="tab"
              type="button"
              aria-selected={category.selected}
              className={`w-full px-md py-sm rounded-3xl
                    ${
                      category.selected ? 'bg-dark' : 'bg-transparent'
                    } bodySmall text-text-primary text-center transition hover:bg-primary/10
                  `}
            >
              {category.name}
              <span className="ml-sm caption text-text-secondary">{category.count}</span>
            </button>
          ))}
        </div>
      </div>
      {/* 하위 분류(개체) */}
      <div>
        {Object.entries(petCategories)
          .filter(entry => entry[1].selected)
          .map(([key, category]) => (
            <div key={key} aria-labelledby={`pet-sub-${key}`}>
              <h4 id={`pet-sub-${key}`} className="mb-sm heading5 text-text-primary">
                {category.name}
              </h4>
              <div className="flex flex-wrap gap-sm" role="tabpanel">
                {category.pets.map(pet => (
                  <button
                    key={pet.id}
                    type="button"
                    className="inline-flex items-center px-md py-xs rounded-md border border-border bg-secondary/40 bodySmall text-text-primary transition focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/50 hover:bg-primary/10"
                  >
                    <span>{pet.name}</span>
                    <span className="ml-sm caption text-text-secondary">{pet.count}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
      </div>
      <div>
        <h3 id="category-heading" className="mb-md tablet:mb-lg heading5 text-text-primary">
          상품 카테고리
        </h3>
        <nav aria-label="상품 카테고리 목록">
          <ul className="flex flex-wrap gap-sm">
            {categories.map(category => (
              <li key={category.id}>
                <button
                  type="button"
                  className="inline-flex items-center px-md py-xs rounded-md border border-border bg-secondary/40 bodySmall text-text-primary transition focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/50 hover:bg-primary/10"
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
      </div>

      {/* 세부 필터 */}
      <div className="flex flex-col gap-sm">
        <button
          type="button"
          className="w-full items-center justify-between px-lg py-sm h-10 rounded-md bg-secondary/40 text-text-primary transition-all"
        >
          <div className="flex items-center gap-sm">
            <FiFilter />
            <span className="bodySmall">세부 필터</span>
            <span className="items-center justify-center px-sm py-[2px] gap-sm whitespace-nowrap overflow-hidden rounded-md bg-secondary border border-border caption text-text-primary">
              상품상태 · 가격대 · 지역
            </span>
          </div>
        </button>

        <div className="bg-secondary/40 px-lg py-sm rounded-md">
          <div className="grid grid-cols-1 desktop:grid-cols-3 gap-xl rounded-lg ">
            <div>
              <h3 className="mb-md font-medium text-text-primary">상품 상태</h3>
              <div className="flex flex-wrap gap-sm">
                {conditionItems.map(item => (
                  <button
                    key={item.value}
                    className="px-md py-sm rounded-md bg-light bodySmall transition-all"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-md font-medium text-text-primary">가격대</h3>
              <div className="flex flex-wrap gap-sm">
                {priceItems.map(item => (
                  <button
                    key={item.value}
                    className="px-md py-sm rounded-md bg-light bodySmall transition-all"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-md font-medium text-text-primary">지역</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative" ref={provinceBoxRef}>
                  <button
                    type="button"
                    role="combobox"
                    aria-expanded={showProvinceSelect}
                    onClick={() => {
                      setShowProvinceSelect(prev => !prev);
                      setShowCitySelect(false);
                    }}
                    className={`flex w-full rounded-md py-2 pl-3 text-sm bg-light`}
                  >
                    <span className="text-gray-500">
                      {selectedProvince || '시/도를 선택해주세요'}
                    </span>
                  </button>
                  {showProvinceSelect && (
                    <div
                      role="listbox"
                      aria-label="시/도 선택"
                      className="absolute left-0 top-full z-2 w-full rounded-md border border-border bg-white p-1 shadow-md mt-sm"
                    >
                      {PROVINCES.map(opt => (
                        <button
                          key={opt}
                          role="option"
                          aria-selected={selectedProvince === opt}
                          type="button"
                          onClick={() => handleSelectProvince(opt)}
                          className={`w-full px-3 py-xs rounded-md transition
                            hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
                            ${selectedProvince === opt ? 'bg-gray-100 ring-1 ring-gray-300' : ''}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative" ref={cityBoxRef}>
                  <button
                    type="button"
                    role="combobox"
                    aria-expanded={showCitySelect}
                    onClick={() => {
                      if (!selectedProvince) return;
                      setShowCitySelect(prev => !prev);
                      setShowProvinceSelect(false);
                    }}
                    className={`flex w-full rounded-md py-2 pl-3 text-sm bg-light`}
                  >
                    <span className="text-gray-500">
                      {selectedCity ||
                        (selectedProvince ? '구/군을 선택해주세요' : '먼저 시/도를 선택해주세요')}
                    </span>
                  </button>
                  {showCitySelect && selectedProvince && (
                    <div
                      role="listbox"
                      aria-label="구/군 선택"
                      className="absolute left-0 top-full z-2 w-full rounded-md border border-border bg-white p-1 shadow-md mt-sm"
                    >
                      {cityOptions.map(opt => (
                        <button
                          key={opt}
                          role="option"
                          aria-selected={selectedCity === opt}
                          type="button"
                          onClick={() => handleSelectCity(opt)}
                          className={`w-full px-3 py-xs rounded-md transition
                            hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
                            ${selectedCity === opt ? 'bg-gray-100 ring-1 ring-gray-300' : ''}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
