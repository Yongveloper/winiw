import { useLocation, useNavigate } from 'react-router-dom';
import { Coordinates } from '@/types/UserTypes';
import defaultProfileImg from '@Assets/Images/default_profile.svg';
import ProfileSetupForm from '@components/common/ProfileSetupForm';
import CommonModal from '@components/common/CommonModal';
import useModal from '@hooks/useModal';
import SignUpSuccessModal from '@components/Signup/SignUpSuccessModal';
import { NewUserResponse } from '@/types/AuthTypes';
import { useSignUpMutation } from '@store/api/authApiSlice';
import Spinner from '@components/Auth/Spinner';

function SignUp() {
  const [signUp, { isLoading: isSingUpLoading }] = useSignUpMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as NewUserResponse;
  const { authId, authType, nickname, profileImage } = state.data;
  const { isOpen: isSignUpModalOpen, open: signUpModalOpen } = useModal();

  const handleModalOkClick = () => {
    navigate('/', { replace: true });
  };

  if (!state) {
    return (
      <CommonModal
        isOpen={true}
        title="비정상적인 접근입니다."
        closeAction={handleModalOkClick}
      />
    );
  }

  const handleSuccessfulSignUp = () => {
    signUpModalOpen();
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000);
  };

  const handleError = (error: any) => {
    console.error(error);
    alert('회원가입에 실패했습니다. error: ' + error);
    navigate('/auth', { replace: true });
  };

  const handleSubmit = async (
    nickname: string,
    coordinates: Coordinates,
    town: string,
    profileImgFile: File | null
  ) => {
    const signUpData = {
      authId,
      authType,
      nickname,
      profileImage,
      // imageFile: profileImgFile,
      addressRequest: {
        name: town,
        longitude: coordinates.latitude,
        latitude: coordinates.longitude,
        type: 'main',
      },
    };

    try {
      await signUp(signUpData).unwrap();
      handleSuccessfulSignUp();
    } catch (error: any) {
      if (error.status === 409) {
        alert('중복된 닉네임입니다.');
      } else {
        handleError(error);
      }
    }
  };

  return (
    <>
      <ProfileSetupForm
        defaultProfileImgSrc={profileImage || defaultProfileImg}
        defaultNickname={nickname}
        handleSubmit={handleSubmit}
      />
      <SignUpSuccessModal isOpen={isSignUpModalOpen} />
      {isSingUpLoading && <Spinner />}
    </>
  );
}

export default SignUp;
