import styled from 'styled-components';
import BottomSheet from '@components/common/BottomSheet';

const LogoutText = styled.div``;

const WithDrawText = styled.div`
  color: red;
`;

interface IOptionModalProps {
  isOpen: boolean;
  close: () => void;
  onLogoutClick: () => void;
  onDeleteUserClick: () => void;
}

function OptionModal({
  isOpen,
  close,
  onLogoutClick,
  onDeleteUserClick,
}: IOptionModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <BottomSheet onClick={close}>
        <LogoutText onClick={onLogoutClick}>로그아웃</LogoutText>
        <WithDrawText onClick={onDeleteUserClick}>탈퇴하기</WithDrawText>
      </BottomSheet>
    </>
  );
}

export default OptionModal;
