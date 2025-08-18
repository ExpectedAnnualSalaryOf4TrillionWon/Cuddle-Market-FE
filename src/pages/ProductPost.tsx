import logoImage from '@images/CuddleMarketLogo.png';
import { useEffect, useRef, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { PiUploadSimpleLight } from 'react-icons/pi';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import type { CreateProductRequest } from 'src/types';
import { createProduct, fetchProductById, updateProduct } from '../api/products';
import {
  CATEGORY_OPTIONS,
  CITIES,
  CONDITION_ITEMS,
  PET_CATEGORIES,
  PETS,
  PRODUCT_POST_TABS,
  PROVINCES,
  type ConditionValue,
  type PetCategory,
  type ProductPostTabId,
  type Province,
} from '../constants/constants';

const ProductPost = () => {
  const [activeTab, setActiveTab] = useState<ProductPostTabId>('sales');

  /**반려동물 종류 */
  // 대분류
  const [selectedPetCategory, setSelectedPetCategory] = useState<PetCategory | null>(null);
  const [showPetCategorySelect, setShowPetCategorySelect] = useState(false);
  // 소분류(세부 분류)
  const [selectedPetType, setSelectedPetType] = useState<string>('');
  const [showPetTypeSelect, setShowPetTypeSelect] = useState(false);

  // 반려동물 종류 선택
  const petTypeOptions = selectedPetCategory ? PETS[selectedPetCategory] : [];
  // 반려동물 종류 선택창
  const petCategoryBoxRef = useRef<HTMLDivElement | null>(null);
  const petTypeBoxRef = useRef<HTMLDivElement | null>(null);

  /**가격 */
  const [price, setPrice] = useState<number | ''>('');

  /**상품 상태 */
  const [selectedCondition, setSelectedCondition] = useState<ConditionValue | null>(null);

  /**상품 카테고리 */
  const [petCate, setPetCate] = useState<string>('');
  const [showCategorySelect, setShowCategorySelect] = useState(false);

  /**상품명 */
  const [productName, setProductName] = useState<string>('');

  /**상품 설명 */
  const [description, setDescription] = useState<string>('');

  /**거주지 */
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [showProvinceSelect, setShowProvinceSelect] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showCitySelect, setShowCitySelect] = useState(false);
  const provinceBoxRef = useRef<HTMLDivElement | null>(null);
  const cityBoxRef = useRef<HTMLDivElement | null>(null);

  /**이미지 */
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  /**거주지 선택창 */
  const cityOptions = selectedProvince ? CITIES[selectedProvince] : [];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isEditMode = location.pathname.includes('/edit');

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
    setSelectedPetType('');
    setShowPetCategorySelect(false);
    setShowPetTypeSelect(false);
  };

  const handleSelectPetType = (opt: string) => {
    setSelectedPetType(opt);
    setShowPetTypeSelect(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('상품등록 버튼 클릭');

    // 유효성 검사
    if (!selectedPetCategory || !selectedPetType) {
      setError('반려동물 종류를 선택해주세요.');
      return;
    }

    if (!petCate) {
      setError('상품 카테고리를 선택해주세요.');
      return;
    }

    if (!productName || !description) {
      setError('상품명과 설명을 입력해주세요.');
      return;
    }

    if (!price || price <= 0) {
      setError('올바른 가격을 입력해주세요.');
      return;
    }

    if (!selectedCondition) {
      setError('상품 상태를 선택해주세요.');
      return;
    }

    if (!selectedProvince || !selectedCity) {
      setError('거래 희망 지역을 선택해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const productData: CreateProductRequest = {
        title: productName,
        description: description,
        price: typeof price === 'number' ? price : 0,
        images: imageFiles,
        state_code: selectedProvince,
        city_code: selectedCity,
        category_code: petCate,
        pet_type_code: selectedPetCategory,
        pet_type_detail_code: selectedPetType,
        condition_status: selectedCondition,
      };

      const response =
        isEditMode && id ? await updateProduct(id, productData) : await createProduct(productData);

      console.log(isEditMode ? '상품 수정 성공:' : '상품 등록 성공:', response);

      // 성공 시 상품 상세 페이지로 이동
      if (response.id) {
        navigate(`/products/${response.id}`);
      }
    } catch (error) {
      console.error('상품 등록 실패:', error);
      setError(error instanceof Error ? error.message : '상품 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadProductData = async () => {
    if (!id) return;

    try {
      const product = await fetchProductById(id);

      // 폼 필드에 데이터 설정
      setProductName(product.title);
      setDescription(product.description || '');
      setPrice(product.price);
      setSelectedPetCategory(product.pet_type_code as PetCategory);
      setSelectedPetType(product.pet_type_detail_code);
      setPetCate(product.category_code || '');
      setSelectedCondition(product.condition_status as ConditionValue);
      setSelectedProvince(product.state_code as Province);
      setSelectedCity(product.city_code || '');
    } catch (error) {
      console.error('상품 정보 로드 실패:', error);
      setError('상품 정보를 불러오는데 실패했습니다.');
    }
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

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEditMode && id) {
      loadProductData();
    }
  }, [isEditMode, id]);

  return (
    <div className="bg-bg">
      {/* 헤더 영역 */}
      <header className="sticky top-0 z-1 bg-primary">
        <div className="w-full max-w-[var(--container-max-width)] mx-auto px-lg py-md flex items-center gap-xl">
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
            {PRODUCT_POST_TABS.map(tab => (
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
              <form className="flex flex-col gap-xl" onSubmit={handleSubmit}>
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
                                  ${
                                    selectedPetCategory === opt
                                      ? 'bg-gray-100 ring-1 ring-gray-300'
                                      : ''
                                  }`}
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
                                  ${
                                    selectedPetType === opt
                                      ? 'bg-gray-100 ring-1 ring-gray-300'
                                      : ''
                                  }`}
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
                            {/* {petCate
                              ? CATEGORY_OPTIONS.find(option => option.value === petCate)?.label
                              : '카테고리를 선택해주세요'} */}
                            {petCate || '카테고리를 선택해주세요'}
                          </span>
                        </button>
                        {showCategorySelect && (
                          <div
                            role="listbox"
                            aria-label="카테고리 선택"
                            className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md"
                          >
                            {CATEGORY_OPTIONS.map(opt => (
                              <button
                                key={opt.value}
                                role="option"
                                aria-selected={petCate === opt.value}
                                type="button"
                                onClick={() => {
                                  setPetCate(opt.label);
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
                        value={description}
                        onChange={e => {
                          const val = e.target.value;
                          setDescription(val === '' ? '' : val);
                        }}
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
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                        {CONDITION_ITEMS.map(item => (
                          <label
                            key={item.value}
                            // onClick={() => setSelectedCondition(item.value)}
                            className={`rounded-lg p-3 cursor-pointer transition-colors border border-border hover:border-primary 
                            ${
                              selectedCondition === item.value ? 'bg-secondary' : 'bg-secondary/30'
                            }  hover:border-primary`}
                          >
                            <input
                              type="radio"
                              name="condition_status"
                              value={item.value}
                              checked={selectedCondition === item.value}
                              onChange={e => setSelectedCondition(e.target.value as ConditionValue)}
                              className="blind" // 화면에서 숨김
                            />
                            <div className="font-medium">{item.value}</div>
                            <div className="text-xs text-gray-500">{item.subtitle}</div>
                          </label>
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
                </div>
                <button
                  data-slot="button"
                  className="items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-primary hover:bg-primary/90 h-9 px-4 py-2 flex-1"
                  type="submit"
                >
                  {isEditMode ? '상품 수정하기' : '상품 등록하기'}
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
                                  ${
                                    selectedPetCategory === opt
                                      ? 'bg-gray-100 ring-1 ring-gray-300'
                                      : ''
                                  }`}
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
                                  ${
                                    selectedPetType === opt
                                      ? 'bg-gray-100 ring-1 ring-gray-300'
                                      : ''
                                  }`}
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
                              ? CATEGORY_OPTIONS.find(option => option.value === petCate)?.label
                              : '카테고리를 선택해주세요'}
                          </span>
                        </button>
                        {showCategorySelect && (
                          <div
                            role="listbox"
                            aria-label="카테고리 선택"
                            className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md"
                          >
                            {CATEGORY_OPTIONS.map(opt => (
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
