import { SimpleHeader } from '@layout/SimpleHeader';
import { useEffect, useRef, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { IoCloseCircle } from 'react-icons/io5';
import { PiUploadSimpleLight } from 'react-icons/pi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { CreateProductRequest, FormErrors } from 'src/types';
import { createProduct, fetchProductById, updateProduct } from '../api/products';
import {
  ALLOWED_IMAGE_TYPES,
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

  /**상품 카테고리 */
  const [petCate, setPetCate] = useState<string>('');
  const [showCategorySelect, setShowCategorySelect] = useState(false);

  /**가격 */
  const [price, setPrice] = useState<number | ''>('');

  /**상품 상태 */
  const [selectedCondition, setSelectedCondition] = useState<ConditionValue | null>(null);

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
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 드래그 앤 드롭 상태
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  /**거주지 선택창 */
  const cityOptions = selectedProvince ? CITIES[selectedProvince] : [];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isEditMode = location.pathname.includes('/edit');

  // 대분류
  const handleSelectPetCategory = (opt: PetCategory) => {
    setSelectedPetCategory(opt);
    setSelectedPetType('');
    setShowPetCategorySelect(false);
    setShowPetTypeSelect(false);
  };

  // 소분류
  const handleSelectPetType = (opt: string) => {
    setSelectedPetType(opt);
    setShowPetTypeSelect(false);
    if (selectedPetCategory && opt) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.petType;
        return newErrors;
      });
    }
  };

  // 카테고리
  const handleSelectCategory = (opt: { value: string; label: string }) => {
    setPetCate(opt.value);
    setShowCategorySelect(false);
    if (opt.value) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.category;
        return newErrors;
      });
    }
  };

  // 상품명
  const handleProductName = (val: string) => {
    setProductName(val === '' ? '' : val);
    if (productName && val) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.productName;
        return newErrors;
      });
    }
  };

  // 상품 설명
  const handleProductDescription = (val: string) => {
    setDescription(val === '' ? '' : val);
    if (description && val) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.description;
        return newErrors;
      });
    }
  };

  // 상품 가격
  const handleProductPrice = (val: string) => {
    setPrice(val === '' ? '' : Number(val));
    if (price && val) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.price;
        return newErrors;
      });
    }
  };

  // 상품 상태
  const handleSelectCondition = (val: ConditionValue) => {
    setSelectedCondition(val);
    if (val) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.condition;
        return newErrors;
      });
    }
  };

  // 거주지
  const handleSelectProvince = (opt: Province) => {
    setSelectedProvince(opt);
    setSelectedCity('');
    setShowProvinceSelect(false);
    setShowCitySelect(false);
  };

  const handleSelectCity = (opt: string) => {
    setSelectedCity(opt);
    setShowCitySelect(false);
    if (selectedProvince && opt) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.location;
        return newErrors;
      });
    }
  };

  // 상품 등록
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('상품등록 버튼 클릭');

    if (isSubmitting) return; // 중복 제출 방지

    const newErrors: FormErrors = {};
    // 유효성 검사
    if (!selectedPetCategory || !selectedPetType) {
      newErrors.petType = '반려동물 종류를 선택해주세요.';
    }

    if (!petCate) {
      newErrors.category = '상품 카테고리를 선택해주세요.';
    }

    if (!productName) {
      newErrors.productName = '상품명을 입력해주세요.';
    }

    if (!description) {
      newErrors.description = '상품 설명을 입력해주세요.';
    }

    if (!price || price <= 0) {
      newErrors.price = '올바른 가격을 입력해주세요.';
    }

    if (!selectedCondition) {
      newErrors.condition = '상품 상태를 선택해주세요.';
    }

    if (!selectedProvince || !selectedCity) {
      newErrors.location = '거래 희망 지역을 선택해주세요.';
    }

    // 이미지 필수 검증 추가 : qa
    if (imageFiles.length === 0) {
      newErrors.images = '상품 이미지를 최소 1장 이상 등록해주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // 첫 번째 에러가 있는 위치로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    try {
      const productData: CreateProductRequest = {
        title: productName,
        description: description,
        price: typeof price === 'number' ? price : 0,
        images: imageFiles,
        state_code: selectedProvince!,
        city_code: selectedCity,
        category_code: petCate,
        pet_type_code: selectedPetCategory!,
        pet_type_detail_code: selectedPetType,
        condition_status: selectedCondition!,
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
      setErrors({
        general: error instanceof Error ? error.message : '상품 등록에 실패했습니다.',
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 이미지 파일 선택 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (imagePreviews.length >= 4) {
      setErrors(prev => ({ ...prev, images: '최대 4장까지만 업로드 가능합니다.' }));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    const remainingSlots = 4 - imageFiles.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    // 이미지 파일 타입 체크
    const invalidFiles = filesToAdd.filter(file => !ALLOWED_IMAGE_TYPES.includes(file.type));
    if (invalidFiles.length > 0) {
      setErrors(prev => ({ ...prev, images: '이미지 파일만 업로드 가능합니다.' }));
      return;
    }

    // 파일 크기 체크 (5MB)
    const oversizedFiles = filesToAdd.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setErrors(prev => ({ ...prev, images: '파일 크기는 5MB 이하여야 합니다.' }));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.images;
      return newErrors;
    });

    // 미리보기 생성
    filesToAdd.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    setImageFiles(prev => [...prev, ...filesToAdd]);

    // input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 이미지 삭제
  const handleRemoveImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.images;
      return newErrors;
    });
  };
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];

    // 드래그한 아이템 제거
    const [draggedFile] = newFiles.splice(draggedIndex, 1);
    const [draggedPreview] = newPreviews.splice(draggedIndex, 1);

    // 새 위치에 삽입
    newFiles.splice(dropIndex, 0, draggedFile);
    newPreviews.splice(dropIndex, 0, draggedPreview);

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // 이미지 순서 변경 (드래그 앤 드롭 대신 간단한 버튼으로 구현)

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };
  // const moveImage = (fromIndex: number, toIndex: number) => {
  //   if (toIndex < 0 || toIndex >= imageFiles.length) return;

  //   const newFiles = [...imageFiles];
  //   const newPreviews = [...imagePreviews];

  //   const [movedFile] = newFiles.splice(fromIndex, 1);
  //   const [movedPreview] = newPreviews.splice(fromIndex, 1);

  //   newFiles.splice(toIndex, 0, movedFile);
  //   newPreviews.splice(toIndex, 0, movedPreview);

  //   setImageFiles(newFiles);
  //   setImagePreviews(newPreviews);
  // };

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
        if (showPetCategorySelect) setShowPetCategorySelect(false);
        if (showPetTypeSelect) setShowPetTypeSelect(false);
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
    // 상품 수정
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

        // ✅ 이미지 처리 추가
        // 기존 이미지 URL을 미리보기로 설정
        if (product.images) {
          // 메인 이미지를 배열로 변환
          const imageUrls = [product.images];

          // sub_images가 있으면 추가
          if (product.sub_images && product.sub_images.length > 0) {
            imageUrls.push(...product.sub_images);
          }

          // 최대 4장까지만 설정
          const previewImages = imageUrls.slice(0, 4);
          setImagePreviews(previewImages);

          // 수정 모드에서는 기존 이미지를 File 객체로 변환할 수 없으므로
          // imageFiles는 비워둡니다. 새로운 이미지를 추가하면 그때 설정됩니다.
          // 서버에서는 이미지가 변경되지 않았다면 기존 이미지를 유지하도록 처리해야 합니다.
        }
      } catch (error) {
        console.error('상품 정보 로드 실패:', error);
        setErrors({
          general: '상품 정보를 불러오는데 실패했습니다.',
        });
      }
    };
    if (isEditMode && id) {
      loadProductData();
    }
  }, [isEditMode, id]);

  return (
    <div className="bg-bg">
      {/* 헤더 영역 - 컴포넌트화 */}
      <SimpleHeader title="상품 등록" />

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
                aria-selected={activeTab === tab.id}
                id={`tab-${tab.id}`}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-md py-sm rounded-3xl ${
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
                {/* 기본정보 */}
                <div className="flex flex-col gap-6 rounded-xl border border-border p-xl shadow-xl">
                  <div className="flex flex-col items-start gap-xs">
                    <h4>기본 정보</h4>
                    <p>상품의 기본 정보를 입력해주세요. *는 필수 항목입니다.</p>
                  </div>
                  <div className="flex flex-col">
                    {/* 반려동물 종류 */}
                    <div className="flex flex-col gap-xs">
                      <div className="flex flex-col gap-xs">
                        <div className="flex flex-col gap-sm">
                          <label className="text-sm">반려동물 종류 *</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 대분류 */}
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
                        {errors.petType && <p className="text-xs text-red-600">{errors.petType}</p>}
                      </div>
                    </div>

                    {/* 상품 카테고리 */}
                    <div className="flex flex-col gap-xs">
                      <div className="flex flex-col gap-sm">
                        <label className="flex items-center gap-2 text-sm">상품 카테고리 *</label>
                        <div className="relative">
                          <button
                            type="button"
                            role="combobox"
                            onClick={() => {
                              setShowCategorySelect(prev => !prev);
                            }}
                            className="flex w-full rounded-md py-2 pl-3 text-sm bg-secondary/30"
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
                              className="absolute left-0 top-full z-40  w-full rounded-md border border-border bg-white p-1 shadow-md mt-sm"
                            >
                              {CATEGORY_OPTIONS.map(opt => (
                                <button
                                  key={opt.value}
                                  role="option"
                                  aria-selected={petCate === opt.value}
                                  type="button"
                                  onClick={() => {
                                    handleSelectCategory(opt);
                                  }}
                                  className={`w-full px-3 py-xs rounded-md transition
                                    hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left bodySmall
                                    ${
                                      petCate === opt.value
                                        ? 'bg-gray-100 ring-1 ring-gray-300'
                                        : ''
                                    }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      {errors.category && <p className="text-xs text-red-600">{errors.category}</p>}
                    </div>

                    {/* 상품명 */}
                    <div className="flex flex-col gap-xs">
                      <div className="flex flex-col gap-sm">
                        <label className="flex items-center gap-2 text-sm" htmlFor="title">
                          상품명 *
                        </label>
                        <input
                          className="flex h-9 w-full rounded-md py-2 pl-3 bg-secondary/30"
                          id="title"
                          placeholder="예: 강아지 사료 10kg 새상품"
                          maxLength={50}
                          value={productName}
                          onChange={e => {
                            const val = e.target.value;
                            handleProductName(val);
                          }}
                        />
                        <p className="text-xs text-gray-500">{productName.length}/50자</p>
                      </div>
                      {errors.productName && (
                        <p className="text-xs text-red-600">{errors.productName}</p>
                      )}
                    </div>

                    {/* 상품 설명 */}
                    <div className="flex flex-col gap-xs">
                      <div className="flex flex-col gap-sm">
                        <label className="flex items-center gap-2 text-sm " htmlFor="description">
                          상품 설명 *
                        </label>
                        <textarea
                          data-slot="textarea"
                          className="resize-none flex min-h-16 w-full rounded-md py-2 pl-3 bg-secondary/30"
                          id="description"
                          placeholder="상품의 상태, 구매 시기, 사용 빈도, 특징 등을 자세히 적어주세요."
                          rows={5}
                          maxLength={1000}
                          value={description}
                          onChange={e => {
                            const val = e.target.value;
                            handleProductDescription(val);
                          }}
                        />
                        <p className="text-xs text-gray-500">{description.length}/1000자</p>
                      </div>
                      {errors.description && (
                        <p className="text-xs text-red-600">{errors.description}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 가격 및 상태 */}
                <div className="flex flex-col gap-6 rounded-xl border border-border p-xl shadow-xl">
                  <h4>가격 및 상태</h4>
                  <div className="flex flex-col gap-xl">
                    <div className="flex flex-col gap-xs">
                      <div className="flex flex-col gap-sm">
                        <label className="text-sm" htmlFor="price">
                          판매 가격 *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            className="flex h-9 w-full border border-border rounded-md px-3 py-1 bg-secondary/30 pr-8"
                            id="price"
                            placeholder="0"
                            value={price}
                            onChange={e => {
                              const val = e.target.value;
                              handleProductPrice(val);
                            }}
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            원
                          </span>
                        </div>
                      </div>
                      {errors.price && <p className="text-xs text-red-600">{errors.price}</p>}
                    </div>

                    <div className="flex flex-col gap-xs">
                      <div className="flex flex-col gap-sm">
                        <label className="text-sm ">상품 상태 *</label>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                          {CONDITION_ITEMS.map(item => (
                            <label
                              key={item.value}
                              className={`rounded-lg p-3 cursor-pointer transition-colors border border-border hover:border-primary
                              ${
                                selectedCondition === item.value
                                  ? 'bg-secondary'
                                  : 'bg-secondary/30'
                              }  hover:border-primary`}
                            >
                              <input
                                type="radio"
                                name="condition_status"
                                value={item.value}
                                checked={selectedCondition === item.value}
                                onChange={e => {
                                  const val = e.target.value as ConditionValue;
                                  handleSelectCondition(val);
                                }}
                                className="blind" // 화면에서 숨김
                              />
                              <div className="font-medium">{item.value}</div>
                              <div className="text-xs text-gray-500">{item.subtitle}</div>
                            </label>
                          ))}
                        </div>
                      </div>
                      {errors.condition && (
                        <p className="text-xs text-red-600">{errors.condition}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 상품 이미지 */}
                <div className="flex flex-col gap-6 rounded-xl border border-border p-xl shadow-xl">
                  <h4>상품 이미지 *</h4>
                  <div className="flex flex-col gap-xs">
                    <div className="flex flex-col gap-sm">
                      <div className="flex flex-col items-start gap-xs">
                        <p>상품 이미지를 업로드해주세요. (최대 4장)</p>
                        <p className="text-xs text-gray-600">
                          첫 번째 이미지가 대표 이미지가 됩니다.
                        </p>
                        <p className="text-xs text-gray-600">
                          이미지를 드래그하여 순서를 변경할 수 있습니다.
                        </p>
                      </div>
                      {/* {imageFiles.length < 5 && ( */}
                      <div className="flex flex-col gap-5">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          id="product-post-image"
                          onChange={handleImageChange}
                        />
                        <label
                          htmlFor="product-post-image"
                          className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-7 text-center hover:border-border-400 transition-colors cursor-pointer bg-secondary/30"
                        >
                          <PiUploadSimpleLight size={40} className="pb-md" />
                          <p className="text-sm text-gray-600">클릭해서 업로드</p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF 파일 (각 파일 최대 5MB)
                          </p>
                          <p className="text-xs text-blue-600 mt-2">
                            {Math.max(0, 4 - imagePreviews.length)}장 더 업로드 가능
                          </p>
                        </label>
                        {/* 이미지 미리보기 영역 */}
                        {imagePreviews.length > 0 && (
                          <div className="flex">
                            {imagePreviews.map((preview, index) => (
                              <div
                                key={index}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={e => handleDragOver(e, index)}
                                onDragLeave={handleDragLeave}
                                onDrop={e => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                                className={`relative group w-1/4 tablet:w-1/6 cursor-move transition-all ${
                                  draggedIndex === index ? 'opacity-50' : ''
                                } ${dragOverIndex === index ? 'scale-105' : ''}`}
                              >
                                <div className="rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 pb-[100%] relative w-full h-full">
                                  <img
                                    src={preview}
                                    alt={`상품 이미지 ${index + 1}`}
                                    className="w-full h-full object-cover absolute t-0 l-0"
                                  />
                                  <div
                                    className={`absolute top-2 px-1 flex w-full items-start ${
                                      index === 0 ? 'justify-between' : 'justify-end'
                                    }`}
                                  >
                                    {index === 0 && (
                                      <div className="bg-primary text-white text-xs rounded-lg p-1 flex items-center ml-1">
                                        대표
                                      </div>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveImage(index)}
                                      title="삭제"
                                      className="w-[25px] h-[25px] cursor-pointer"
                                    >
                                      <IoCloseCircle color="white" className="w-full h-full" />
                                    </button>
                                  </div>
                                </div>
                                {/* 순서 변경 및 삭제 버튼 */}
                                {/* <div className="absolute top-2 right-2 flex gap-1">
                                  {index > 0 && (
                                    <button
                                      type="button"
                                      onClick={() => moveImage(index, index - 1)}
                                      className="p-1 bg-white rounded-full shadow hover:bg-gray-100"
                                      title="앞으로 이동"
                                    >
                                      <IoIosArrowBack />
                                    </button>
                                  )}
                                  {index < imagePreviews.length - 1 && (
                                    <button
                                      type="button"
                                      onClick={() => moveImage(index, index + 1)}
                                      className="p-1 bg-white rounded-full shadow hover:bg-gray-100"
                                      title="뒤로 이동"
                                    >
                                      <IoIosArrowForward />
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    title="삭제"
                                  >
                                    <IoCloseCircle size={25} color="white" />
                                  </button>
                                </div> */}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* )} */}
                      {errors.images && <p className="text-xs text-red-600">{errors.images}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6 rounded-xl border border-border p-xl shadow-xl">
                  <h4>거래 정보</h4>
                  <div className="flex flex-col gap-xs">
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
                                ${
                                  selectedProvince === opt ? 'bg-gray-100 ring-1 ring-gray-300' : ''
                                }`}
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
                                    ${
                                      selectedCity === opt ? 'bg-gray-100 ring-1 ring-gray-300' : ''
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
                    {errors.location && <p className="text-xs text-red-600">{errors.location}</p>}
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
              판매요청 기능은 추후에 개발 예정입니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPost;
