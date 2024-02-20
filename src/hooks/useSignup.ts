import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/types';
import { IRegisterRequest, NewUserResponse } from '@/types/AuthTypes';
import { useSignUpMutation } from '@store/api/authApiSlice';

export const useSignUp = (state: NewUserResponse, open: () => void) => {
  const [signUp, { isLoading: isSingUpLoading }] = useSignUpMutation();
  const navigate = useNavigate();
  const { authId, authType, profileImage } = state.data;
  const { latitude, longitude, regionCode } = useSelector(
    (state: RootState) => state.coordinateSetup
  );

  const handleSuccessfulSignUp = () => {
    open();
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000);
  };

  const handleError = (error: any) => {
    console.error(error);
    alert(
      '회원가입에 실패했습니다. 다시 시도 해주세요. error: ' + error.message
    );
    navigate('/auth', { replace: true });
  };

  const handleSubmit = async (nickname: string) => {
    const signupData: IRegisterRequest = {
      authId,
      authType,
      nickname,
      profileImage,
      addressRequest: {
        latitude,
        longitude,
        regionCode,
        type: 'main',
      },
    };

    try {
      await signUp(signupData).unwrap();
      handleSuccessfulSignUp();
    } catch (error: any) {
      if (error.status === 409) {
        alert('중복된 닉네임입니다.');
      } else {
        handleError(error);
      }
    }
  };

  return { handleSubmit, isSingUpLoading };
};
