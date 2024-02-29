import defaultProfileImg from '@Assets/Images/default_profile.svg';
import ProfileSetupForm from '@components/common/ProfileSetupForm';
import ConfirmModal from '@components/common/ConfirmModal';
import useModal from '@hooks/useModal';
import { useUser } from '@hooks/useUser';
import Spinner from '@components/Auth/Spinner';
import { useEditProfile } from '@hooks/useEditProfile';

function EditProfile() {
  const {
    data: { data: user },
  } = useUser();
  const { isOpen, open, close } = useModal();
  const {
    handleSubmit,
    handleUpdateUser,
    onModalCompleteButtonClick,
    isLoading,
  } = useEditProfile(user, open);

  return (
    <>
      <ProfileSetupForm
        isEdit={true}
        defaultProfileImgSrc={user.profileImage || defaultProfileImg}
        defaultNickname={user.nickname}
        defaultAddress={`${user.address.siDo} ${user.address.guGunSi} ${
          user.address.hdongName || user.address.eupMyeon
        }`}
        handleSubmit={handleSubmit}
      />
      <ConfirmModal
        isOpen={isOpen}
        title="프로필 수정"
        content="프로필을 수정하시겠습니까?"
        confirmedContent="프로필이 수정되었습니다."
        onConfirmAction={handleUpdateUser}
        onCompletedAction={onModalCompleteButtonClick}
        closeAction={close}
      />
      {isLoading && <Spinner />}
    </>
  );
}

export default EditProfile;
