import { RootState, useAppSelector } from '@/redux/store';
import { useNavigate } from 'react-router-dom';

export const useRoutesManager = () => {
  const URL_LOGIN = '/app/authentication/login';
  const URL_HOME = '/app/home';

  

  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate(URL_LOGIN, { replace: true });
  };

  const redirectToHome = () => {
    navigate(URL_HOME, { replace: true });
  };

  return {
    redirectToHome,
    redirectToLogin,
  };
};
