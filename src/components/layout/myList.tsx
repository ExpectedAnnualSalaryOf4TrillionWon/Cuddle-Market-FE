import exampleImage from '@images/bowl.jpg';
import defaultImage from '@images/CuddleMarketLogoImage.png';

type TabId = 'products' | 'transactions' | 'wishlist';

interface MyListProps {
  activeTab: TabId;
}
const productList = [
  /* 예시를 위한 상품정보 객체배열 생성 */
  {
    image: exampleImage,
    description: '강아지밥그릇',
    price: 20000,
  },
  {
    image: defaultImage,
    description: '고양이장난감',
    price: 15000,
  },
  {
    image: defaultImage,
    description: '햄스터집',
    price: 25000,
  },
  {
    image: defaultImage,
    description: '새장',
    price: 35000,
  },
  {
    image: defaultImage,
    description: '애착 방석',
    price: 5000,
  },
];

const productListNone: object[] = [];
/* 목록이 비었을 경우를 확인하기 위한 빈 상품정보 객체배열 생성. */

const MyList: React.FC<MyListProps> = ({ activeTab }) => {
  const renderContents = (image: string, description: string, price: number) => {
    return (
      <div className="flex flex-col gap-xs bg-secondary">
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-xs items-center p-sm border border-border rounded-b-md shadow">
          <img
            src={image}
            alt="사진"
            className="w-16 h-16 tablet:w-18 tablet:h-18 desktop:w-20 desktop:h-20"
          />
          <div className="flex items-center px-sm text-bodyLarge tablet:text-heading5 desktop:text-heading3">
            {description}
          </div>
          <div className="flex items-center px-sm text-bodyLarge tablet:text-heading5 desktop:text-heading3">
            {price}원
          </div>
          <div className="flex justify-evenly gap-xs">
            <button
              onClick={() => alert('상품등록/수정 페이지로 이동')}
              className="w-2xl bg-primary hover:bg-dark text-point py-sm rounded-sm "
            >
              수정
            </button>
            {/*alert,confirm 등은 추후에 대체될 예정*/}
            <button
              onClick={() => confirm('삭제하시겠습니까?')}
              className=" w-2xl  bg-primary hover:bg-dark text-point py-sm rounded-sm "
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    );
  };
  {
    /* props 전달 테스트는 거래내역 탭에서 확인가능, 추후 백엔드와 api전달 설정 완료후 삭제예정*/
  }
  const renderList = (image: string, description: string, price: number) => {
    switch (activeTab) {
      case 'products':
        return productList.length > 0 ? (
          productList.map(product =>
            renderContents(product.image, product.description, product.price),
          )
        ) : (
          <div className="text-heading3">목록이 없습니다.</div>
        );

      case 'transactions':
        return renderContents(
          (image = defaultImage),
          (description = '고양이 사료'),
          (price = 15000),
        );

      case 'wishlist':
        return productListNone.length > 0 ? (
          productListNone.map(product =>
            renderContents(product.image, product.description, product.price),
          )
        ) : (
          <div className="text-heading3">목록이 없습니다.</div>
        );
      /* 찜한 상품 탭에서 '목록이 없습니다.' 텍스트 확인가능.
          
          개발 확인 과정에서는 ts에러가 발생하는데 api연결을 마치면 사라질 것으로 예상함 */
    }
  };

  return renderList();
};

export default MyList;
