import { useLocation, useNavigate } from 'react-router-dom';
import defaultProfileImg from '@Assets/Images/default_profile.svg';
import ProfileSetupForm from '@components/common/ProfileSetupForm';
import CommonModal from '@components/common/CommonModal';
import useModal from '@hooks/useModal';
import SignUpSuccessModal from '@components/Signup/SignUpSuccessModal';
import { NewUserResponse } from '@/types/AuthTypes';
import Spinner from '@components/Auth/Spinner';
import { useSignUp } from '@hooks/useSignup';

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as NewUserResponse;
  const { nickname, profileImage } = state.data;
  const { isOpen: isSignUpModalOpen, open: signUpModalOpen } = useModal();
  const { handleSubmit, isSingUpLoading } = useSignUp(state, signUpModalOpen);

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
