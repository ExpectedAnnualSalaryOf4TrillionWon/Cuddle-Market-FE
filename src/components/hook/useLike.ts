import { useUserStore } from '@store/userStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

interface UseLikeReturn {
  isLiked: boolean;
  isLoading: boolean;
  modalState: {
    isOpen: boolean;
    message: string;
    subMessage: string;
  };
  toggleLike: (e?: React.MouseEvent) => Promise<void>;
  setIsLiked: (value: boolean) => void; // 외부에서 상태 설정 가능
  handleModalConfirm: () => void;
  handleModalCancel: () => void;
}

interface UseLikeOptions {
  productId: number;
  initialLiked?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onToggle?: (isLiked: boolean) => void; // 토글 후 콜백
}

export const useLike = ({
  productId,
  initialLiked = false,
  onSuccess,
  onError,
  onToggle,
}: UseLikeOptions): UseLikeReturn => {
  const { user, accessToken, redirectUrl, setRedirectUrl } = useUserStore();
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: '',
    subMessage: '',
  });

  // 초기값이 변경되면 상태 업데이트
  useEffect(() => {
    setIsLiked(initialLiked);
  }, [initialLiked]);

  const toggleLike = async (e?: React.MouseEvent) => {
    // 이벤트 버블링 방지
    e?.stopPropagation();

    // 로그인 체크
    if (!user || !accessToken) {
      setModalState({
        isOpen: true,
        message: '로그인이 필요한 서비스입니다.',
        subMessage: '로그인 페이지로 이동하시겠습니까?',
      });
      return;
    }

    try {
      setIsLoading(true);

      // 현재 상태에 따라 API 호출 분기
      const method = isLiked ? 'DELETE' : 'POST';

      const response = await fetch(`${API_BASE_URL}/likes/`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (response.ok) {
        // 상태 토글
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);

        // 토글 콜백 호출
        onToggle?.(newLikedState);
        onSuccess?.();

        console.log(newLikedState ? '찜하기 성공' : '찜하기 취소 성공');
      } else {
        // 에러 처리
        const data = await response.json();

        // 이미 찜한 상품인 경우 상태 동기화
        if (response.status === 400 && data[0] === '이미 관심 상품으로 추가된 상품입니다.') {
          setIsLiked(true);
        }

        throw new Error(data.message || '찜하기 처리 실패');
      }

      // 리다이렉트 처리 (필요한 경우)
      if (redirectUrl) {
        const targetUrl = redirectUrl;
        setRedirectUrl(null);
        navigate(targetUrl, { replace: true });
      }
    } catch (error) {
      console.error('찜하기 처리 실패:', error);
      onError?.(error as Error);

      // 에러 토스트 메시지 (옵션)
      // showToast('찜하기 처리에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalConfirm = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    navigate('/signin');
  };

  const handleModalCancel = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return {
    isLiked,
    isLoading,
    modalState,
    toggleLike,
    setIsLiked,
    handleModalConfirm,
    handleModalCancel,
  };
};
