import { SimpleHeader } from '@layout/SimpleHeader';
import { useEffect, useState } from 'react';
import { BsChat } from 'react-icons/bs';
import { CiCalendar, CiLocationOn } from 'react-icons/ci';
import { GrView } from 'react-icons/gr';
import { useNavigate, useParams } from 'react-router-dom';
import type { UserWithProducts } from 'src/types';
import { fetchSellerById } from '../api/products';

const UserPage = () => {
  const [seller, setSeller] = useState<UserWithProducts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const formatJoinDate = (dateString: string): string => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return `${year}년 ${month}월 가입`;
  };

  const goToProductDetail = () => {
    navigate(`/products/${id}`);
  };

  const loadSellerData = async () => {
    if (!id) return;

    try {
      setLoading(true);

      // 상품 상세 정보 가져오기
      const productData = await fetchSellerById(id);
      console.log(productData);

      setSeller(productData);
      setError(null);
    } catch (err) {
      console.error('Error loading product:', err);
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadSellerData();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">로딩중…</div>;
  }
  if (error || !seller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error ?? '사용자를 찾을 수 없습니다.'}</p>
      </div>
    );
  }

  return (
    <>
      {/* 헤더영역 => 컴포넌트화 */}
      <SimpleHeader title={'판매자 프로필 페이지'} />

      <div className="max-w-[var(--container-max-width)] mx-auto flex flex-col tablet:flex-row gap-xl px-lg py-xl">
        {/* 좌측: 사용자 카드 */}
        <div className="tablet:w-[300px] tablet:h-[375px] flex flex-col gap-xl rounded-xl border border-border p-xl">
          <div className="sticky top-24 flex flex-col gap-xl rounded-xl  text-text-primary">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mx-auto mb-lg rounded-full overflow-hidden">
                <img
                  src={seller.profile_image}
                  alt={seller.nickname}
                  className="block w-full h-full object-cover"
                />
              </div>
              <h2 className="heading4 text-text-primary mb-sm font-bold">{seller.nickname}</h2>
            </div>

            <div className="flex flex-col gap-sm">
              <div className="flex items-center gap-sm">
                <CiLocationOn />
                <span className="bodySmall text-text-primary">
                  {seller.state} {seller.city}
                </span>
              </div>
              <div className="flex items-center gap-sm">
                <CiCalendar />
                <span className="bodySmall text-text-primary">
                  {seller.created_at ? formatJoinDate(seller.created_at) : ''}
                </span>
              </div>
            </div>

            <div className="mt-lg flex flex-col gap-sm">
              <button
                className="
                    flex items-center justify-center gap-sm font-bold
                    h-10 rounded-md px-xl bg-dark text-bg shadow-sm cursor-pointer hover:shadow-lg hover:bg-dark-point/30 hover:text-text-primary transition-all duration-300 ease-in-out
                  "
              >
                <BsChat />
                <span>채팅하기</span>
              </button>
            </div>
          </div>
        </div>

        {/* 우측: 탭 + 목록 */}
        <div className="flex-1 tablet:col-span-2">
          <div className="flex flex-col gap-sm w-full">
            {/* 탭 리스트 */}
            <div
              role="tablist"
              aria-label="사용자 탭"
              className="mb-lg px-sm py-sm border-b border-gray-200"
            >
              <h3 className="heading4 text-text-primary font-bold">
                {seller.nickname}님 상품 ({seller.total_products}개)
              </h3>
            </div>

            {/* 탭 패널: 상품 */}
            <div
              role="tabpanel"
              id="panel-products"
              aria-labelledby="tab-products"
              className={`flex-1 outline-none`}
            >
              <div className="flex flex-col gap-md">
                {seller.seller_products.map(item => (
                  <div
                    key={item.product_id}
                    className="
                    cursor-pointer
                    rounded-lg p-lg
                    border border-border
                    bg-bg
                    transition-shadow hover:shadow-sm"
                    onClick={goToProductDetail}
                  >
                    <div className="flex gap-lg ">
                      <div className="w-[113px] h-full rounded-lg overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="block w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col gap-1">
                        <h3 className="bodyRegular text-text-primary font-bold">{item.title}</h3>
                        <p className="heading5 text-dark font-bold">
                          {item.price.toLocaleString()}원
                        </p>

                        <div className="flex items-center gap-xs bodySmall text-text-secondary">
                          <GrView />
                          <span>조회 {item.view_count}</span>
                        </div>
                      </div>

                      <span
                        className="
                        flex items-center justify-center gap-1
                          rounded-md px-3 py-2 
                          border border-sale
                          bg-sale text-bg
                          text-sm font-medium whitespace-nowrap
                          transition-[color,box-shadow] overflow-hidden h-max
                        "
                      >
                        {item.transaction_status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
