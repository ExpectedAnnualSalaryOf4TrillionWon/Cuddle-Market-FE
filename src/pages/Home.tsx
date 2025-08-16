import CategoryFilter from '@layout/CategoryFilter';
import ProductCard from '@layout/ProductCard';
import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../api/products';
import type { Product } from '../types'; // 타입 변경

const Home = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleItems, setVisibleItems] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPetType, setSelectedPetType] = useState<string>('ALL');

  const loadProducts = async () => {
    try {
      setLoading(true);
      // console.log('Loading products with petType:', petTypeCode); // 디버깅용

      // const filters = {
      //   ...(petTypeCode && petTypeCode !== 'ALL' && { pet_type_code: petTypeCode }),
      // };

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

  useEffect(() => {
    if (visibleItems >= allProducts.length || allProducts.length === 0) return;

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      console.log('스크롤 퍼센트:', scrollPercent);
      console.log('현재 visibleItems:', visibleItems);

      if (scrollPercent > 30 && visibleItems === 12) {
        console.log('조건 만족! 아이템 추가');
        setVisibleItems(Math.min(20, allProducts.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleItems, allProducts.length]);

  useEffect(() => {
    // 실행순서1️⃣
    loadProducts();
  }, []);

  // const handlePetTypeChange = (petTypeCode: string) => {
  //   setSelectedPetType(petTypeCode);
  // };
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

  const visibleProducts = allProducts.slice(0, visibleItems); // 수정

  return (
    <div>
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md tablet:py-xl">
        {/* 탭 */}
        <CategoryFilter />
        {/* 섹션 타이틀 */}
        <div>
          <h2 className="heading4 text-text-primary">전체 상품</h2>
          <p className="mt-xs bodySmall text-text-secondary">{`총 ${allProducts.length}개의 상품 (현재 ${visibleItems}개 표시)`}</p>
        </div>

        <ul className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-md tablet:gap-lg desktop:gap-xl">
          {visibleProducts.map((product, index) => (
            <ProductCard key={product.id} data-index={index} product={product} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
