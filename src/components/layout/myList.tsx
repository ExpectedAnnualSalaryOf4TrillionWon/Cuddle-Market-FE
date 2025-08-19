import { useEffect, useState } from 'react';
import { GrView } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import type { Product } from 'src/types';
import { fetchMyPageData } from '../../api/products';
import { ProductState, stateLabelMap, stateStyleMap } from '../../constants/constants';

type TabId = 'products' | 'wishlist';

interface MyListProps {
  activeTab: TabId;
  onCountsUpdate?: (counts: { products: number; wishlist: number }) => void; // ← 추가
  onDelete: (itemId?: number) => Promise<void>; // 삭제 핸들러 prop 추가
}

const getProductState = (status: string): ProductState => {
  switch (status) {
    case '판매중':
      return 'selling';
    case '예약중':
      return 'reserved';
    case '판매완료':
      return 'sold';
    default:
      return 'selling';
  }
};

// interface Product {
//   id: number;
//   image: string;
//   title: string;
//   price: number;
//   state: ProductState;
//   view: number;
// }

// type ProductList = Product[];
// const wishlist: ProductList = [];

// const MyproductList: ProductList = [
//   {
//     id: 1,
//     image: exampleImage,
//     title: '강아지밥그릇',
//     price: 20000,
//     state: ProductState.Selling,
//     view: 12,
//   },
//   {
//     id: 2,
//     image: defaultImage,
//     title: '고양이장난감',
//     price: 15000,
//     state: ProductState.Selling,
//     view: 12,
//   },
//   {
//     id: 3,
//     image: defaultImage,
//     title: '햄스터집',
//     state: ProductState.Selling,
//     price: 25000,
//     view: 120,
//   },
//   {
//     id: 4,
//     image: defaultImage,
//     title: '새장',
//     state: ProductState.Selling,
//     price: 35000,
//     view: 20,
//   },
//   {
//     id: 5,
//     image: defaultImage,
//     title: '애착 방석',
//     state: ProductState.Reserved,
//     price: 5000,
//     view: 10,
//   },
//   {
//     id: 6,
//     image: defaultImage,
//     title: '애착 방석',
//     price: 5000,
//     state: ProductState.Sold,
//     view: 120,
//   },
//   {
//     id: 7,
//     image: defaultImage,
//     title: '애착 방석',
//     price: 5000,
//     state: ProductState.Reserved,
//     view: 120,
//   },
//   {
//     id: 8,
//     image: defaultImage,
//     title: '애착 방석',
//     price: 5000,
//     state: ProductState.Reserved,
//     view: 120,
//   },
//   {
//     id: 9,
//     image: defaultImage,
//     title: '애착 방석',
//     price: 5000,
//     state: ProductState.Selling,
//     view: 120,
//   },
//   {
//     id: 10,
//     image: defaultImage,
//     title: '애착 방석',
//     price: 5000,
//     state: ProductState.Reserved,
//     view: 120,
//   },
// ];

const MyList: React.FC<MyListProps> = ({ activeTab, onCountsUpdate, onDelete }) => {
  const [MyProductList, setMyProductList] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const loadUserInfo = async () => {
    try {
      const data = await fetchMyPageData();
      console.log(data);
      setMyProductList(data.my_product_list);
      setWishlist(data.liked_product_list);
      if (onCountsUpdate) {
        onCountsUpdate({
          products: data.my_product_list.length,
          wishlist: data.liked_product_list.length,
        });
      }
    } catch (error) {
      console.error('사용자 정보 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productId: number) => {
    navigate(`/products/${productId}/edit`);
  };

  const handleDelete = async (productId: number) => {
    if (confirm('삭제하시겠습니까?')) {
      // 삭제 로직 구현 (추후 API 연동)
      console.log('삭제:', productId);
    }
  };
  useEffect(() => {
    loadUserInfo();
  }, []);

  useEffect(() => {
    if (onCountsUpdate && !loading) {
      onCountsUpdate({
        products: MyProductList.length,
        wishlist: wishlist.length,
      });
    }
  }, [MyProductList.length, wishlist.length, loading]);

  const renderContents = (product: Product) => {
    const state = getProductState(product.transaction_status);
    return (
      <div
        className="flex items-start gap-lg cursor-pointer rounded-lg p-lg border border-border bg-bg transition-shadow hover:shadow-sm"
        key={product.id}
      >
        {/* 상품 이미지 */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-light">
          <img src={product.images} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* 상품 정보 */}
        <div className="flex-1">
          <h3 className="bodySmall text-text-primary">{product.title}</h3>
          <p className="heading5 text-text-primary font-bold">{product.price}원</p>
          <div className="flex items-center gap-xs caption text-text-secondary">
            <GrView />
            <span>조회 {product.view_count}</span>
          </div>
        </div>

        {/* 상품 상태 및 액션 */}
        <div className="grid grid-cols-2 gap-xs">
          <p
            className={`col-start-1 row-start-1   
                          rounded-md px-3 py-1
                          border text-bg
                          text-xs font-medium whitespace-nowrap min-w-[70px] 
                          flex items-center justify-center
                          ${stateStyleMap[state]}
                        `}
          >
            {stateLabelMap[state]}
          </p>

          {activeTab === 'products' && (
            <button
              onClick={e => {
                e.stopPropagation(); // 부모 div의 클릭 이벤트 방지
                handleEdit(product.id);
              }}
              className={`text-xs  bg-primary hover:bg-dark text-point py-sm rounded-sm`}
            >
              수정
            </button>
          )}

          <button
            onClick={e => {
              e.stopPropagation(); // 부모 div의 클릭 이벤트 방지
              onDelete(product.id);
            }}
            className={`${
              activeTab === 'products' ? 'col-start-2 row-start-2' : 'col-start-2 row-start-1'
            }  text-xs  bg-primary hover:bg-dark text-point py-sm rounded-sm`}
          >
            삭제
          </button>
        </div>
      </div>
    );
  };

  const renderList = () => {
    switch (activeTab) {
      case 'products':
        return MyProductList.length > 0 ? (
          MyProductList.map(product => renderContents(product))
        ) : (
          <div className="text-heading3">목록이 없습니다.</div>
        );
      case 'wishlist':
        return wishlist.length > 0 ? (
          wishlist.map(product => renderContents(product))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">아직 찜한 상품이 없어요</h3>
            <div className="text-gray-500 text-sm">
              <p className="w-full text-center">
                마음에 드는 상품을 찜하시면 여기에서 쉽게 확인하실 수 있어요.
              </p>
              <p className="w-full text-center">다양한 반려동물 용품을 둘러보세요!</p>
            </div>
          </div>
        );
    }
  };

  return <>{renderList()}</>;
};

export default MyList;
