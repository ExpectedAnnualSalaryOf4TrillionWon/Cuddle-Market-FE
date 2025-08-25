// import { useCallback, useEffect, useState } from 'react';
// import { addLike, fetchMyLikes, removeLike } from '../../api/products';
// import type { UseLikeReturn } from '../../types/index';

// // export const useLike = (): UseLikeReturn => {
// //   const [likedProductIds, setLikedProductIds] = useState<number[]>([]);
// //   const [isLoading, setIsLoading] = useState(false);

// //   // 초기 찜 목록 로드

// //   const loadInitialData = useCallback(async () => {
// //     try {
// //       setIsLoading(true);
// //       const { product_ids } = await fetchMyLikes();
// //       setLikedProductIds(product_ids ?? []);
// //     } catch (e) {
// //       console.error('[useLike] 초기 로드 실패:', e);
// //       setLikedProductIds([]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, []);

// //   // 찜하기 토글
// //   const toggleLike = useCallback(
// //     async (productId: number) => {
// //       const isLiked = likedProductIds.includes(productId);

// //       setLikedProductIds(prev =>
// //         isLiked ? prev.filter(id => id !== productId) : [...prev, productId],
// //       );

// //       try {
// //         if (isLiked) await removeLike(productId);
// //         else await addLike(productId);
// //       } catch (e) {
// //         console.error('[useLike] 토글 실패, 롤백:', e);
// //         // 롤백
// //         setLikedProductIds(prev =>
// //           isLiked ? [...prev, productId] : prev.filter(id => id !== productId),
// //         );
// //         alert('찜하기 처리 중 오류가 발생했습니다.');
// //       }
// //     },
// //     [likedProductIds],
// //   );

// //   // 특정 상품이 찜되어 있는지 확인
// //   const isProductLiked = useCallback(
// //     (productId: number) => likedProductIds.includes(productId),
// //     [likedProductIds],
// //   );

// //   // 찜 목록 새로고침
// //   const refreshLikes = useCallback(async () => {
// //     await loadInitialData();
// //   }, [loadInitialData]);

// //   // 컴포넌트 마운트 시 자동 로드
// //   useEffect(() => {
// //     loadInitialData();
// //   }, [loadInitialData]);

// //   return {
// //     likedProductIds,
// //     isProductLiked,
// //     toggleLike,
// //     isLoading,
// //     totalLikedCount: likedProductIds.length,
// //     refreshLikes,
// //   };
// // };
