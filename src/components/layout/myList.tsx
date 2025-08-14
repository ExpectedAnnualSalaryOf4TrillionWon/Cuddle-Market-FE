import exampleImage from '@images/bowl.jpg';
import defaultImage from '@images/CuddleMarketLogoImage.png';

type TabId = 'products' | 'wishlist';

interface MyListProps {
  activeTab: TabId;
}

interface Product {
  id: number;
  image: string;
  description: string;
  price: number;
}

type ProductList = Product[];

const MyproductList: ProductList = [
  /* 예시를 위한 상품정보 객체배열 생성 */
  {
    id: 1,
    image: exampleImage,
    description: '강아지밥그릇',
    price: 20000,
  },
  {
    id: 2,
    image: defaultImage,
    description: '고양이장난감',
    price: 15000,
  },
  {
    id: 3,
    image: defaultImage,
    description: '햄스터집',
    price: 25000,
  },
  {
    id: 4,
    image: defaultImage,
    description: '새장',
    price: 35000,
  },
  {
    id: 5,
    image: defaultImage,
    description: '애착 방석',
    price: 5000,
  },
];

const wishlist: ProductList = [];

const renderContents = (id: number, image: string, description: string, price: number) => {
  return (
    <div className="flex flex-col gap-xs bg-secondary" key={id}>
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

const MyList: React.FC<MyListProps> = ({ activeTab }) => {
  const renderList = () => {
    switch (activeTab) {
      case 'products':
        return MyproductList.length > 0 ? (
          MyproductList.map(product =>
            renderContents(product.id, product.image, product.description, product.price),
          )
        ) : (
          <div className="text-heading3">목록이 없습니다.</div>
        );
      //백엔드 조교님과의 논의 후 거래내역은 우선순위 낮음으로 결정하여 alert처리.
      case 'wishlist':
        return wishlist.length > 0 ? (
          wishlist.map(product =>
            renderContents(product.id, product.image, product.description, product.price),
          )
        ) : (
          <div className="text-heading3">목록이 없습니다.</div>
        );
    }
  };

  return <>{renderList()}</>;
};

export default MyList;
