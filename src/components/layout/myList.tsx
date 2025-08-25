import { stateStyleMap, type TransactionStatus } from '@constants/constants';
import { useEffect, useState } from 'react';
import { GrView } from 'react-icons/gr';
import { IoIosArrowDown, IoMdCheckmark } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import type { Product } from 'src/types';
import { fetchMyPageData } from '../../api/products';

type TabId = 'products' | 'wishlist';

interface MyListProps {
  activeTab: TabId;
  onCountsUpdate?: (counts: { products: number; wishlist: number }) => void; // ← 추가
  onDelete: (itemId?: number) => void;
}

const MyList: React.FC<MyListProps> = ({ activeTab, onCountsUpdate, onDelete }) => {
  const [MyProductList, setMyProductList] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showStatusDropdown, setShowStatusDropdown] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();
  const handleStatusChange = async (productId: number, newStatus: TransactionStatus) => {
    try {
      // TODO: API 호출하여 서버에 상태 업데이트
      // await updateProductStatus(productId, newStatus);

      // 로컬 상태 업데이트
      setShowStatusDropdown(prev => ({ ...prev, [productId]: false }));

      // MyProductList 업데이트 (옵션)
      setMyProductList(prev =>
        prev.map(product =>
          product.id === productId ? { ...product, transaction_status: newStatus } : product,
        ),
      );
    } catch (error) {
      console.error('상태 변경 실패:', error);
    }
  };
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
    const currentStatus = product.transaction_status;
    const statusOptions: TransactionStatus[] = ['판매중', '예약중', '판매완료'];
    return (
      <div
        className="flex items-start gap-lg cursor-pointer rounded-lg p-lg border border-border bg-bg transition-shadow hover:shadow-sm h-[150px]"
        key={product.id}
      >
        {/* 상품 이미지 */}
        <div className="w-[113px] h-full rounded-lg overflow-hidden">
          <img src={product.images} alt={product.title} className=" h-full object-cover" />
        </div>

        {/* 상품 정보 */}
        <div className="flex-1 flex flex-col gap-xs">
          <p
            className={`col-start-1 row-start-1   
                          rounded-md w-fit p-1
                          border text-bg
                          text-xs font-medium whitespace-nowrap 
                          flex items-center justify-center
                          ${stateStyleMap[currentStatus]}
                        `}
          >
            {currentStatus}
          </p>
          <div className="flex flex-col gap-xs">
            <h3 className="bodySmall text-text-primary overflow-hidden text-ellipsis line-clamp-2">
              {/* 화면이 축소되어 타이틀이 2줄 이상으로 변환시 ...으로 바뀌게끔 css 추가 / 2줄까지만 허용 */}
              {product.title}
            </h3>
            <p className="text-bodyLarge text-text-primary font-bold">{product.price}원</p>
            <div className="flex items-center gap-xs caption text-text-secondary">
              <GrView />
              <span>조회 {product.view_count}</span>
            </div>
          </div>
        </div>

        {/* 상품 상태 및 액션 */}
        <div className="flex flex-col items-end gap-xs">
          {activeTab === 'products' && (
            <div className="relative">
              <button
                type="button"
                role="combobox"
                className={`flex w-28 h-8 rounded-md px-3 py-2 items-center justify-between gap-2  text-sm bg-secondary/30`}
                aria-expanded={showStatusDropdown[product.id] || false}
                onClick={e => {
                  e.stopPropagation();
                  setShowStatusDropdown(prev => ({
                    ...prev,
                    [product.id]: !prev[product.id],
                  }));
                }}
              >
                <span className="text-gray-500"> {currentStatus}</span>
                <IoIosArrowDown />
              </button>
              {showStatusDropdown[product.id] && (
                <div
                  role="listbox"
                  aria-label="거래상태 선택"
                  className="absolute left-0 top-full z-40 w-full min-w-[120px] rounded-md border border-border bg-white p-1 shadow-md mt-1"
                >
                  {statusOptions.map(status => (
                    <button
                      key={status}
                      role="option"
                      type="button"
                      aria-selected={currentStatus === status}
                      onClick={e => {
                        e.stopPropagation();
                        handleStatusChange(product.id, status);
                      }}
                      className={`w-full text-left text-sm
                          hover:bg-gray-100 focus:bg-gray-100 justify-between
                          flex items-center gap-2 rounded-md  py-1.5 px-2 whitespace-nowrap transition-[color,box-shadow]
                          ${currentStatus === status ? 'bg-gray-100' : ''}
                        `}
                    >
                      <span className={`text-xs font-medium rounded`}>{status}</span>
                      {currentStatus === status && <IoMdCheckmark />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-xs">
            {activeTab === 'products' && (
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleEdit(product.id);
                }}
                className={`text-xs px-3 bg-primary hover:bg-dark text-point py-sm rounded-sm`}
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
              }  text-xs px-3 bg-primary hover:bg-dark text-point py-sm rounded-sm`}
            >
              삭제
            </button>
          </div>
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
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2"> 거래한 상품이 없어요</h3>
          </div>
          // 빈 목록 안내문구 양식 통일을 위해 찜한상품 양식 복사.
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
