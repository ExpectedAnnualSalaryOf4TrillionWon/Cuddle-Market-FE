import CategoryFilter from '@layout/CategoryFilter';
import ProductCard from '@layout/ProductCard';
import { useEffect, useMemo, useState } from 'react';
import { fetchAllProducts } from '../api/products';
// import { useLike } from '../components/hook/useLike';
// import { useLike } from '../components/hook/useLike';
import { LOCATIONS } from '@constants/constants';
import type { FilterState, Product } from '../types'; // 타입 변경
const Home = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleItems, setVisibleItems] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    selectedPetType: null,
    selectedPetDetails: [],
    selectedCategories: [],
    selectedConditions: [],
    selectedPriceRanges: [],
    selectedLocation: {
      state: null,
      city: null,
    },
  });

  /**
   * 하트 번호 클릭 -> toggleLike 함수 실행(useLike 안의 toggleLike) ->
   * toggleLike 함수 안의 addLike 함수 실행 -> 핸들러 안의 http.post('/api/likes') 실행
   */
  // const { isProductLiked } = useLike();

  const loadProducts = async () => {
    try {
      setLoading(true);

      const result = await fetchAllProducts();
      // console.log('API response:', result); // 실행순서6️⃣

      setAllProducts(result); // 변수명 수정
      setVisibleItems(12);
      setError(null);
    } catch (err) {
      // console.error('Error loading products:', err); // 디버깅용
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 필터링된 제품 목록 계산
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // 반려동물 종류 필터링 (대분류)
    if (filters.selectedPetType && filters.selectedPetType !== 'ALL') {
      filtered = filtered.filter(product => product.pet_type_code === filters.selectedPetType);
    }

    // 반려동물 세부 종류 필터링 (소분류)
    if (filters.selectedPetDetails.length > 0) {
      filtered = filtered.filter(product =>
        filters.selectedPetDetails.includes(product.pet_type_detail_code),
      );
    }

    // 카테고리 필터링
    if (filters.selectedCategories.length > 0) {
      filtered = filtered.filter(
        product =>
          product.category_code && filters.selectedCategories.includes(product.category_code),
      );
    }

    // 상품 상태 필터링
    if (filters.selectedConditions.length > 0) {
      filtered = filtered.filter(product => {
        const conditionMap: Record<string, string> = {
          NEW: '새 상품',
          LIKE_NEW: '거의 새것',
          USED: '사용감 있음',
          NEEDS_REPAIR: '수리 필요',
        };

        return filters.selectedConditions.some(
          condition => conditionMap[condition] === product.condition_status,
        );
      });
    }

    // 가격대 필터링
    if (filters.selectedPriceRanges.length > 0) {
      filtered = filtered.filter(product => {
        const price = product.price;
        return filters.selectedPriceRanges.some(range => {
          switch (range) {
            case 'under10k':
              return price <= 10000;
            case 'over10k':
              return price >= 10000 && price < 50000;
            case 'over50k':
              return price >= 50000 && price < 100000;
            case 'over100k':
              return price >= 100000;
            default:
              return false;
          }
        });
      });
    }

    // 지역 필터링
    if (filters.selectedLocation.state) {
      const stateName = LOCATIONS.find(loc => loc.code === filters.selectedLocation.state)?.name;
      filtered = filtered.filter(product => product.state_code === stateName);
    }

    if (filters.selectedLocation.city) {
      const state = LOCATIONS.find(loc => loc.code === filters.selectedLocation.state);
      const cityName = state?.cities.find(
        city => city.code === filters.selectedLocation.city,
      )?.name;
      filtered = filtered.filter(product => product.city_code === cityName);
    }

    return filtered;
  }, [allProducts, filters]);

  // 필터가 변경되면 visibleItems 초기화
  useEffect(() => {
    setVisibleItems(12);
  }, [filters]);

  useEffect(() => {
    if (visibleItems >= filteredProducts.length || filteredProducts.length === 0) return;

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      console.log('스크롤 퍼센트:', scrollPercent);
      console.log('현재 visibleItems:', visibleItems);

      if (scrollPercent > 30 && visibleItems === 12) {
        console.log('조건 만족! 아이템 추가');
        setVisibleItems(Math.min(20, filteredProducts.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleItems, filteredProducts.length]);

  useEffect(() => {
    // 실행순서1️⃣
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md tablet:py-xl">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md tablet:py-xl">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
          <button className="mt-2 text-blue-600 hover:text-blue-800">다시 시도</button>
        </div>
      </div>
    );
  }

  const visibleProducts = filteredProducts.slice(0, visibleItems); // 수정

  return (
    <div className="bg-bg">
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md tablet:py-xl">
        {/* 필터링 */}
        <CategoryFilter onFilterChange={setFilters} />
        <div>
          <h2 className="heading4 text-text-primary">전체 상품</h2>
          <p className="mt-xs bodySmall text-text-secondary">{`총 ${filteredProducts.length}개의 상품`}</p>
        </div>

        <ul className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-md tablet:gap-lg desktop:gap-xl">
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              data-index={index}
              data={product}
              // isLiked={isProductLiked(product.id)}
              // onToggleLike={() => toggleLike(product.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
