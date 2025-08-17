import logoImage from '@images/CuddleMarketLogo.png';
import UserProduct from '@layout/UserProduct';
import { BsChat } from 'react-icons/bs';
import { CiCalendar, CiLocationOn } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const ProductState = {
  Selling: 'selling',
  Reserved: 'reserved',
  Sold: 'sold',
} as const;
type ProductState = (typeof ProductState)[keyof typeof ProductState];

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  state: ProductState;
  view: number;
}
type ProductList = Product[];

const userProductList: ProductList = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
    title: '강아지 털 빗 전문가용',
    price: 25000,
    state: ProductState.Selling,
    view: 123,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
    title: '고양이 장난감',
    price: 15000,
    state: ProductState.Selling,
    view: 77,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
    title: '햄스터집',
    price: 25000,
    state: ProductState.Reserved,
    view: 45,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
    title: '새장',
    price: 35000,
    state: ProductState.Sold,
    view: 300,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
    title: '애착 방석',
    price: 5000,
    state: ProductState.Selling,
    view: 12,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
    title: '애착 방석',
    price: 5000,
    state: ProductState.Selling,
    view: 12,
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
    title: '애착 방석',
    price: 5000,
    state: ProductState.Selling,
    view: 12,
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
    title: '애착 방석',
    price: 5000,
    state: ProductState.Selling,
    view: 12,
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
    title: '애착 방석',
    price: 5000,
    state: ProductState.Selling,
    view: 12,
  },
];

const UserPage = () => {
  return (
    <>
      <header className="sticky top-0 z-1 bg-primary min-h-[112px]">
        <div className="w-full max-w-[var(--container-max-width)] mx-auto px-lg py-md flex items-center gap-xl">
          {/* 로고 */}
          <Link to="/">
            <img src={logoImage} alt="커들마켓" className="w-auto h-22 object-contain" />
          </Link>

          {/* 페이지 타이틀 */}
          <h2 className="text-xl font-bold">판매자 프로필</h2>
        </div>
      </header>
      <div className="px-lg py-3xl bg-bg">
        <div className="max-w-[var(--container-max-width)]  mx-auto  grid grid-cols-1 tablet:grid-cols-3 gap-xl">
          {/* 좌측: 사용자 카드 */}
          <div className="tablet:col-span-1 ">
            <div className="sticky top-24 flex flex-col gap-xl rounded-xl border border-border bg-bg text-text-primary p-xl">
              <div className="flex flex-col items-center">
                <div className="w-auto h-22 mx-auto mb-lg rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
                    alt="멍멍이아빠"
                    className="block w-full h-full object-cover"
                  />
                </div>
                <h2 className="heading4 text-text-primary mb-sm">멍멍이아빠</h2>
              </div>

              <div className="flex flex-col gap-sm">
                <div className="flex items-center gap-sm">
                  <CiLocationOn />
                  <span className="bodySmall text-text-primary">서울 강남구</span>
                </div>

                <div className="flex flex-col gap-sm">
                  <div className="flex items-center gap-sm">
                    <CiMail />
                    <span className="bodySmall text-text-primary">dogdad@example.com</span>
                  </div>
                  <div className="flex items-center gap-sm">
                    <CiLocationOn />
                    <span className="bodySmall text-text-primary">서울 강남구</span>
                  </div>
                  <div className="flex items-center gap-sm">
                    <CiCalendar />
                    <span className="bodySmall text-text-primary">2023년 3월 가입</span>
                  </div>
                </div>


              <div className="flex flex-col gap-sm">
                <button
                  className="
                    flex items-center justify-center gap-sm
                    h-10 rounded-md px-xl
                    bg-primary hover:bg-primary/90
                    text-bg text-sm font-medium
                    transition-all
                  "
                >
                  <BsChat />
                  <span>채팅하기</span>
                </button>
              </div>
            </div>
          </div>

          {/* 우측: 탭 + 목록 */}
          <div className="tablet:col-span-2">
            <div className="flex flex-col gap-sm w-full">
              {/* 탭 리스트 */}
              <div className={`flex-1 flex flex-col gap-md`}>
                <h3 className="heading5 text-text-primary border-b border-border pb-md">
                  멍멍이아빠님 상품 ({`${userProductList.length}개`})
                </h3>

                <div className="pt-md overflow-y-auto max-h-[40vh]">
                  <ul className="flex flex-col gap-md ">
                    {userProductList.map(userProduct => (
                      <UserProduct key={userProduct.id} {...userProduct} />
                    ))}
                    {userProductList.length > 0 && (
                      <button
                        onClick={() => alert('목록 5개씩 추가 렌더링!')}
                        className="w-full bg-dark rounded-lg shadow-2xs py-sm"
                      >
                        더보기
                      </button>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* 우측 끝 */}
        </div>
      </div>
    </>
  );
};

export default UserPage;
