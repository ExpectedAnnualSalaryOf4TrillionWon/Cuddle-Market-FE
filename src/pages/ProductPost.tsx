import logoImage from '@images/CuddleMarketLogo.png';
import { useEffect, useRef, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { PiUploadSimpleLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const PETS = {
  포유류: ['강아지', '고양이', '토끼', '햄스터', '기니피그', '페럿', '친칠라', '고슴도치'],
  조류: ['잉꼬', '앵무새', '카나리아', '모란앵무'],
  파충류: ['도마뱀', '뱀', '거북이', '게코'],
  수생동물: ['금붕어', '열대어', '체리새우', '달팽이'],
  '곤충/절지동물': ['귀뚜라미', '사마귀', '딱정벌레', '거미'],
} as const;
type PetCategory = keyof typeof PETS;
const PET_CATEGORIES = Object.keys(PETS) as PetCategory[];

const categoryOptions = [
  { value: 'food', label: '사료/간식' },
  { value: 'toys', label: '장난감' },
  { value: 'housing', label: '사육장/하우스' },
  { value: 'health', label: '건강/위생' },
  { value: 'accessories', label: '의류/악세사리' },
  { value: 'equipment', label: '사육장비' },
  { value: 'carrier', label: '이동장/목줄' },
  { value: 'cleaning', label: '청소용품' },
  { value: 'training', label: '훈련용품' },
  { value: 'etc', label: '기타' },
];

type ConditionValue = 'new' | 'nearly' | 'used' | 'defect' | 'repair';
interface ConditionItem {
  value: ConditionValue;
  title: string;
  subtitle: string;
}
const conditionItems: ReadonlyArray<ConditionItem> = [
  { value: 'new', title: '새상품', subtitle: '미사용 상품' },
  { value: 'nearly', title: '거의새것', subtitle: '사용감 거의 없음' },
  { value: 'used', title: '사용감있음', subtitle: '일반적인 사용흔적' },
  { value: 'defect', title: '하자있음', subtitle: '기능에 이상 없음' },
  { value: 'repair', title: '수리필요', subtitle: '수리 후 사용가능' },
];

// as const : 값을 고정합니다. “서울특별시” 같은 문자열과 배열 안의 항목들까지 바뀌지 않는 상수 값으로 취급됩니다.
// 타입도 리터럴 그대로 잡힙니다. 즉 "서울특별시"는 그냥 string이 아니라 "서울특별시"라는 정확한 값 타입이 됩니다.
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

const TABS = [
  { id: 'sales', label: '판매' },
  { id: 'purchases', label: '판매요청' },
] as const;

const ProductPost = () => {
  const [activeTab, setActiveTab] = useState<'sales' | 'purchases'>('sales');

  // const [pet, setPet] = useState<string>('');
  // const [showPetSelect, setShowPetSelect] = useState(false);

  const [selectedPetCategory, setSelectedPetCategory] = useState<PetCategory | null>(null);
  const [selectedPetType, setSelectedPetType] = useState<string>('');
  const [showPetCategorySelect, setShowPetCategorySelect] = useState(false);
  const [showPetTypeSelect, setShowPetTypeSelect] = useState(false);

  const petCategoryBoxRef = useRef<HTMLDivElement | null>(null);
  const petTypeBoxRef = useRef<HTMLDivElement | null>(null);

  const petTypeOptions = selectedPetCategory ? PETS[selectedPetCategory] : [];
  // 가격
  const [price, setPrice] = useState<number | ''>('');

  // 상품 상태
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  // 상품 카테고리
  const [petCate, setPetCate] = useState<string>('');
  const [showCategorySelect, setShowCategorySelect] = useState(false);

  // 상품명
  const [productName, setProductName] = useState<string>('');

  // 거주지
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [showProvinceSelect, setShowProvinceSelect] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showCitySelect, setShowCitySelect] = useState(false);

  const cityOptions = selectedProvince ? CITIES[selectedProvince] : [];

  const [meetingPlace, setMeetingPlace] = useState<string>('');

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

  const handleSelectPetCategory = (opt: PetCategory) => {
    setSelectedPetCategory(opt);
    setSelectedPetType(''); // 카테고리 변경 시 세부종 초기화
    setShowPetCategorySelect(false);
    setShowPetTypeSelect(false);
  };

  const handleSelectPetType = (opt: string) => {
    setSelectedPetType(opt);
    setShowPetTypeSelect(false);
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
      // 반려동물 카테고리 드롭다운
      if (
        showPetCategorySelect &&
        petCategoryBoxRef.current &&
        !petCategoryBoxRef.current.contains(target)
      ) {
        setShowPetCategorySelect(false);
      }
      // 반려동물 세부종 드롭다운
      if (showPetTypeSelect && petTypeBoxRef.current && !petTypeBoxRef.current.contains(target)) {
        setShowPetTypeSelect(false);
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
  }, [showProvinceSelect, showCitySelect, showPetCategorySelect, showPetTypeSelect]);
  return (
    <div className="bg-bg">
      {/* 헤더 영역 */}
      <header className="flex items-center justify-between gap-lg sticky top-0 z-1 bg-primary">
        <div className="w-full max-w-[var(--container-max-width)] mx-auto px-lg py-md flex items-center gap-lg">
          {/* 로고 */}
          <Link to="/">
            <img src={logoImage} alt="커들마켓" className="w-auto h-22 object-contain" />
          </Link>

          {/* 페이지 타이틀 */}
          <h2 className="text-xl font-bold">상품 등록</h2>
        </div>
      </header>
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-3xl flex items-center">
        <div className="flex flex-col gap-2xl w-full">
          {/* 탭 리스트 */}
          <div
            role="tablist"
            className="grid grid-cols-2 gap-sm px-sm py-sm rounded-3xl bg-dark/25"
          >
            {TABS.map(tab => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-md py-sm rounded-3xl  
                     ${
                       activeTab === tab.id ? 'border-dark' : 'border-transparent'
                     } bodySmall text-text-primary text-center transition hover:bg-dark`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 탭 패널 - 판매 */}
          {activeTab === 'sales' && (
            <div
              role="tabpanel"
              id="panel-sales"
              aria-labelledby="tab-sales"
              className="flex-1 outline-none"
            >
              <form className="flex flex-col gap-xl">
                <div className="flex flex-col gap-6 rounded-xl border border-border p-xl shadow-xl">
                  <div className="flex flex-col items-start gap-xs">
                    <h4>기본 정보</h4>
                    <p>상품의 기본 정보를 입력해주세요. *는 필수 항목입니다.</p>
                  </div>
                  <div className="flex flex-col gap-md">
                    <div className="flex flex-col gap-sm">
                      <label className="text-sm">반려동물 종류 *</label>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative" ref={petCategoryBoxRef}>
                          <button
                            type="button"
                            role="combobox"
                            aria-expanded={showPetCategorySelect}
                            onClick={() => {
                              setShowPetCategorySelect(prev => !prev);
                              setShowPetTypeSelect(false);
                            }}
                            className={`flex w-full rounded-md py-2 pl-3 text-sm bg-secondary/30`}
                          >
                            <span className="text-gray-500">
                              {selectedPetCategory || '대분류를 선택해주세요 (예: 포유류)'}
                            </span>
                          </button>
                          {showPetCategorySelect && (
                            <div
                              role="listbox"
                              aria-label="반려동물 대분류 선택"
                              className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md mt-sm"
                            >
                              {PET_CATEGORIES.map(opt => (
                                <button
                                  key={opt}
                                  role="option"
                                  aria-selected={selectedPetCategory === opt}
                                  type="button"
                                  onClick={() => handleSelectPetCategory(opt)}
                                  className={`w-full px-3 py-xs rounded-md transition
          hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
          ${selectedPetCategory === opt ? 'bg-gray-100 ring-1 ring-gray-300' : ''}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* 세부 종류 */}
                        <div className="relative" ref={petTypeBoxRef}>
                          <button
                            type="button"
                            role="combobox"
                            aria-expanded={showPetTypeSelect}
                            onClick={() => {
                              if (!selectedPetCategory) return;
                              setShowPetTypeSelect(prev => !prev);
                              setShowPetCategorySelect(false);
                            }}
                            className={`flex w-full rounded-md py-2 pl-3 text-sm bg-secondary/30`}
                          >
                            <span className="text-gray-500">
                              {selectedPetType ||
                                (selectedPetCategory
                                  ? '세부 종류를 선택해주세요'
                                  : '먼저 대분류를 선택해주세요')}
                            </span>
                          </button>
                          {showPetTypeSelect && selectedPetCategory && (
                            <div
                              role="listbox"
                              aria-label="반려동물 세부종 선택"
                              className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md
                            mt-sm"
                            >
                              {petTypeOptions.map(opt => (
                                <button
                                  key={opt}
                                  role="option"
                                  aria-selected={selectedPetType === opt}
                                  type="button"
                                  onClick={() => handleSelectPetType(opt)}
                                  className={`w-full px-3 py-xs rounded-md transition
          hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
          ${selectedPetType === opt ? 'bg-gray-100 ring-1 ring-gray-300' : ''}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-sm">
                      <label className="flex items-center gap-2 text-sm">상품 카테고리 *</label>
                      <div className="relative">
                        <button
                          type="button"
                          role="combobox"
                          onClick={() => setShowCategorySelect(!showCategorySelect)}
                          className="flex w-full rounded-md px-3 py-2 text-sm bg-secondary/30 mb-sm"
                        >
                          <span className="w-full text-left">
                            {petCate
                              ? categoryOptions.find(option => option.value === petCate)?.label
                              : '카테고리를 선택해주세요'}
                          </span>
                        </button>
                        {showCategorySelect && (
                          <div
                            role="listbox"
                            aria-label="카테고리 선택"
                            className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md"
                          >
                            {categoryOptions.map(opt => (
                              <button
                                key={opt.value}
                                role="option"
                                aria-selected={petCate === opt.value}
                                type="button"
                                onClick={() => {
                                  setPetCate(opt.value);
                                  setShowCategorySelect(false);
                                }}
                                className={`w-full px-3 py-xs rounded-md transition
                                  hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
                                  ${
                                    petCate === opt.value ? 'bg-gray-100 ring-1 ring-gray-300' : ''
                                  }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-sm">
                      <label className="flex items-center gap-2 text-sm" htmlFor="title">
                        상품명 *
                      </label>
                      <input
                        className="flex h-9 w-full rounded-md px-3 py-1 bg-secondary/30"
                        id="title"
                        placeholder="예: 강아지 사료 10kg 새상품"
                        maxLength={50}
                        value={productName}
                        onChange={e => {
                          const val = e.target.value;
                          setProductName(val === '' ? '' : val);
                        }}
                      />
                      <p className="text-xs text-gray-500">0/50자</p>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm " htmlFor="description">
                        상품 설명 *
                      </label>
                      <textarea
                        data-slot="textarea"
                        className="resize-none flex min-h-16 w-full rounded-md px-3 py-2 bg-secondary/30"
                        id="description"
                        placeholder="상품의 상태, 구매 시기, 사용 빈도, 특징 등을 자세히 적어주세요."
                        rows={5}
                        maxLength={1000}
                      ></textarea>
                      <p className="text-xs text-gray-500">0/1000자</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6 rounded-xl border border-border p-xl shadow-xl">
                  <h4>가격 및 상태</h4>
                  <div className="flex flex-col gap-xl">
                    <div className="flex flex-col gap-sm">
                      <label className="text-sm" htmlFor="price">
                        판매 가격 *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          className="flex h-9 w-full border border-border rounded-md px-3 py-1 bg-secondary/30 pr-8"
                          id="price"
                          placeholder="0"
                          value={price}
                          onChange={e => {
                            const val = e.target.value;
                            setPrice(val === '' ? '' : Number(val));
                          }}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          원
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-sm">
                      <label className="text-sm ">상품 상태 *</label>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {conditionItems.map(item => (
                          <div
                            key={item.value}
                            onClick={() => setSelectedCondition(item.value)}
                            className={`rounded-lg p-3 cursor-pointer transition-colors border border-border hover:border-primary 
                            ${
                              selectedCondition === item.value ? 'bg-secondary' : 'bg-secondary/30'
                            }  hover:border-primary`}
                          >
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-gray-500">{item.subtitle}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6 rounded-xl border border-border p-xl shadow-xl">
                  <div className="flex flex-col items-start gap-xs">
                    <h4 className="flex items-center gap-2">상품 이미지 *</h4>
                    <p>
                      상품 이미지를 업로드해주세요. 첫 번째 이미지가 대표 이미지가 됩니다. (최대
                      10장)
                    </p>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="product-post-image"
                    />
                    <label
                      htmlFor="product-post-image"
                      className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-7 text-center hover:border-border-400 transition-colors cursor-pointer bg-secondary/30"
                    >
                      <PiUploadSimpleLight size={40} className="pb-md" />
                      <p className="text-sm text-gray-600">클릭하거나 파일을 드래그해서 업로드</p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF 파일 (각 파일 최대 10MB)
                      </p>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-6 rounded-xl border border-border p-xl shadow-xl">
                  <h4>거래 정보</h4>

                  <div className="flex flex-col gap-sm">
                    <label className="text-sm">거래 희망 지역 *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative" ref={provinceBoxRef}>
                        <CiLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <button
                          type="button"
                          role="combobox"
                          aria-expanded={showProvinceSelect}
                          onClick={() => {
                            setShowProvinceSelect(prev => !prev);
                            setShowCitySelect(false);
                          }}
                          className={`flex w-full rounded-md py-2 pl-10 text-sm bg-secondary/30`}
                        >
                          <span className="text-gray-500">
                            {selectedProvince || '시/도를 선택해주세요'}
                          </span>
                        </button>
                        {showProvinceSelect && (
                          <div
                            role="listbox"
                            aria-label="시/도 선택"
                            className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md mt-sm"
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
                        <CiLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <button
                          type="button"
                          role="combobox"
                          aria-expanded={showCitySelect}
                          onClick={() => {
                            if (!selectedProvince) return;
                            setShowCitySelect(prev => !prev);
                            setShowProvinceSelect(false);
                          }}
                          className={`flex w-full rounded-md py-2 pl-10 text-sm bg-secondary/30`}
                        >
                          <span className="text-gray-500">
                            {selectedCity ||
                              (selectedProvince
                                ? '구/군을 선택해주세요'
                                : '먼저 시/도를 선택해주세요')}
                          </span>
                        </button>
                        {showCitySelect && selectedProvince && (
                          <div
                            role="listbox"
                            aria-label="구/군 선택"
                            className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md
                            mt-sm"
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

                  <div className="flex items-center gap-sm">
                    <input
                      type="checkbox"
                      aria-hidden="true"
                      className="w-[14px] h-[14px]"
                      id="delivery"
                    />
                    <label className="flex items-center gap-2 text-sm" htmlFor="delivery">
                      택배 거래 가능
                    </label>
                  </div>

                  <div className="flex flex-col gap-sm">
                    <label className="text-sm" htmlFor="meetingPlace">
                      선호하는 만남 장소
                    </label>
                    <input
                      data-slot="input"
                      className="h-9 w-full rounded-md border px-3 py-1 md:text-sm border-border bg-secondary/30"
                      id="meetingPlace"
                      placeholder="예: 지하철역, 카페, 공원 등"
                      value={meetingPlace}
                      onChange={e => {
                        const val = e.target.value;
                        setMeetingPlace(val === '' ? '' : val);
                      }}
                    />
                  </div>
                </div>
                <button
                  data-slot="button"
                  className="items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-primary hover:bg-primary/90 h-9 px-4 py-2 flex-1"
                  type="submit"
                >
                  상품 등록하기
                </button>
              </form>
            </div>
          )}

          {/* 탭 패널 - 판매요청 */}
          {activeTab === 'purchases' && (
            <div
              role="tabpanel"
              id="panel-sales-request"
              aria-labelledby="tab-sales-request"
              className="flex-1 outline-none"
            >
              <form className="flex flex-col gap-xl">
                <div className="flex flex-col gap-6 rounded-xl border border-border p-xl shadow-xl">
                  <div className="flex flex-col items-start gap-xs">
                    <h4>판매요청 정보</h4>
                    <p>찾고 있는 상품 정보를 입력해주세요. *는 필수 항목입니다.</p>
                  </div>
                  <div className="flex flex-col gap-xl">
                    <div className="flex flex-col gap-sm">
                      <label className="text-sm">반려동물 종류 *</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative" ref={petCategoryBoxRef}>
                          <button
                            type="button"
                            role="combobox"
                            aria-expanded={showPetCategorySelect}
                            onClick={() => {
                              setShowPetCategorySelect(prev => !prev);
                              setShowPetTypeSelect(false);
                            }}
                            className={`flex w-full rounded-md py-2 pl-10 text-sm bg-secondary/30`}
                          >
                            <span className="text-gray-500">
                              {selectedPetCategory || '대분류를 선택해주세요 (예: 포유류)'}
                            </span>
                          </button>
                          {showPetCategorySelect && (
                            <div
                              role="listbox"
                              aria-label="반려동물 대분류 선택"
                              className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md mt-sm"
                            >
                              {PET_CATEGORIES.map(opt => (
                                <button
                                  key={opt}
                                  role="option"
                                  aria-selected={selectedPetCategory === opt}
                                  type="button"
                                  onClick={() => handleSelectPetCategory(opt)}
                                  className={`w-full px-3 py-xs rounded-md transition
          hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
          ${selectedPetCategory === opt ? 'bg-gray-100 ring-1 ring-gray-300' : ''}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* 세부 종류 */}
                        <div className="relative" ref={petTypeBoxRef}>
                          <button
                            type="button"
                            role="combobox"
                            aria-expanded={showPetTypeSelect}
                            onClick={() => {
                              if (!selectedPetCategory) return;
                              setShowPetTypeSelect(prev => !prev);
                              setShowPetCategorySelect(false);
                            }}
                            className={`flex w-full rounded-md py-2 pl-10 text-sm bg-secondary/30`}
                          >
                            <span className="text-gray-500">
                              {selectedPetType ||
                                (selectedPetCategory
                                  ? '세부 종류를 선택해주세요'
                                  : '먼저 대분류를 선택해주세요')}
                            </span>
                          </button>
                          {showPetTypeSelect && selectedPetCategory && (
                            <div
                              role="listbox"
                              aria-label="반려동물 세부종 선택"
                              className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md
                            mt-sm"
                            >
                              {petTypeOptions.map(opt => (
                                <button
                                  key={opt}
                                  role="option"
                                  aria-selected={selectedPetType === opt}
                                  type="button"
                                  onClick={() => handleSelectPetType(opt)}
                                  className={`w-full px-3 py-xs rounded-md transition
          hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
          ${selectedPetType === opt ? 'bg-gray-100 ring-1 ring-gray-300' : ''}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-sm">
                      <label className="flex items-center gap-2 text-sm">상품 카테고리 *</label>
                      <div className="relative">
                        <button
                          type="button"
                          role="combobox"
                          onClick={() => setShowCategorySelect(!showCategorySelect)}
                          className="flex w-full rounded-md px-3 py-2 text-sm bg-secondary/30 mb-sm"
                        >
                          <span className="w-full text-left">
                            {petCate
                              ? categoryOptions.find(option => option.value === petCate)?.label
                              : '카테고리를 선택해주세요'}
                          </span>
                        </button>
                        {showCategorySelect && (
                          <div
                            role="listbox"
                            aria-label="카테고리 선택"
                            className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md"
                          >
                            {categoryOptions.map(opt => (
                              <button
                                key={opt.value}
                                role="option"
                                aria-selected={petCate === opt.value}
                                type="button"
                                onClick={() => {
                                  setPetCate(opt.value);
                                  setShowCategorySelect(false);
                                }}
                                className={`w-full px-3 py-xs rounded-md transition
                                  hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
                                  ${
                                    petCate === opt.value ? 'bg-gray-100 ring-1 ring-gray-300' : ''
                                  }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <label className="flex items-center gap-2 text-sm" htmlFor="title">
                        찾고 있는 상품명 *
                      </label>
                      <input
                        className="flex h-9 w-full rounded-md px-3 py-1 bg-secondary/30"
                        id="title"
                        placeholder="고양이 자동 급식기 구해요"
                        maxLength={50}
                        value=""
                      />
                      <p className="text-xs text-gray-500">0/50자</p>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm " htmlFor="description">
                        상세 요청사항 *
                      </label>
                      <textarea
                        data-slot="textarea"
                        className="resize-none flex min-h-16 w-full rounded-md px-3 py-2 bg-secondary/30"
                        id="description"
                        placeholder="어떤 상품을 찾고 있는지, 원하는 조건(가격대, 상태 등)을 자세히 적어주세요"
                        rows={5}
                        maxLength={1000}
                      ></textarea>
                      <p className="text-xs text-gray-500">0/1000자</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6 rounded-xl border border-border p-xl shadow-xl">
                  <h4>가격 및 상태</h4>
                  <div className="flex flex-col gap-xl">
                    <div className="flex flex-col gap-sm">
                      <label className="text-sm" htmlFor="price">
                        희망 가격대 *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          className="flex h-9 w-full border border-border rounded-md px-3 py-1 bg-secondary/30 pr-8"
                          id="price"
                          placeholder="0"
                          value={price}
                          onChange={e => {
                            const val = e.target.value;
                            setPrice(val === '' ? '' : Number(val));
                          }}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          원
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6 rounded-xl border border-border p-xl shadow-xl">
                  <div className="flex flex-col items-start gap-xs">
                    <h4 className="flex items-center gap-2">상품 이미지</h4>
                    <p>
                      상품 이미지를 업로드해주세요. 첫 번째 이미지가 대표 이미지가 됩니다. (최대
                      10장)
                    </p>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="product-post-image"
                    />
                    <label
                      htmlFor="product-post-image"
                      className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-7 text-center hover:border-border-400 transition-colors cursor-pointer bg-secondary/30"
                    >
                      <PiUploadSimpleLight size={40} className="pb-md" />
                      <p className="text-sm text-gray-600">클릭하거나 파일을 드래그해서 업로드</p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF 파일 (각 파일 최대 10MB)
                      </p>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-6 rounded-xl border border-border p-xl shadow-xl">
                  <h4>거래 정보</h4>

                  <div className="flex flex-col gap-sm">
                    <label className="text-sm">거래 희망 지역 *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative" ref={provinceBoxRef}>
                        <CiLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <button
                          type="button"
                          role="combobox"
                          aria-expanded={showProvinceSelect}
                          onClick={() => {
                            setShowProvinceSelect(prev => !prev);
                            setShowCitySelect(false);
                          }}
                          className={`flex w-full rounded-md py-2 pl-10 text-sm bg-secondary/30`}
                        >
                          <span className="text-gray-500">
                            {selectedProvince || '시/도를 선택해주세요'}
                          </span>
                        </button>
                        {showProvinceSelect && (
                          <div
                            role="listbox"
                            aria-label="시/도 선택"
                            className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md mt-sm"
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
                        <CiLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <button
                          type="button"
                          role="combobox"
                          aria-expanded={showCitySelect}
                          onClick={() => {
                            if (!selectedProvince) return;
                            setShowCitySelect(prev => !prev);
                            setShowProvinceSelect(false);
                          }}
                          className={`flex w-full rounded-md py-2 pl-10 text-sm bg-secondary/30`}
                        >
                          <span className="text-gray-500">
                            {selectedCity ||
                              (selectedProvince
                                ? '구/군을 선택해주세요'
                                : '먼저 시/도를 선택해주세요')}
                          </span>
                        </button>
                        {showCitySelect && selectedProvince && (
                          <div
                            role="listbox"
                            aria-label="구/군 선택"
                            className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md
                            mt-sm"
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

                  <div className="flex items-center gap-sm">
                    <input
                      type="checkbox"
                      aria-hidden="true"
                      className="w-[14px] h-[14px]"
                      id="delivery"
                    />
                    <label className="flex items-center gap-2 text-sm" htmlFor="delivery">
                      택배 거래 가능
                    </label>
                  </div>

                  <div className="flex flex-col gap-sm">
                    <label className="text-sm" htmlFor="meetingPlace">
                      선호하는 만남 장소
                    </label>
                    <input
                      data-slot="input"
                      className="h-9 w-full rounded-md border px-3 py-1 md:text-sm border-border bg-secondary/30"
                      id="meetingPlace"
                      placeholder="예: 지하철역, 카페, 공원 등"
                      value=""
                    />
                  </div>
                </div>
                <button
                  data-slot="button"
                  className="items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-primary hover:bg-primary/90 h-9 px-4 py-2 flex-1"
                  type="submit"
                >
                  상품 등록하기
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPost;
