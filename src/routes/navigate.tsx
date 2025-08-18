import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

export const goToSignIn = () => {
  navigate('/signin');
};
export const goToMyPage = () => {
  navigate('/mypage');
};
export const gotoAlarmPage = () => {
  navigate('/alarm');
};
