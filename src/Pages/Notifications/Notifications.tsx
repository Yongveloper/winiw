import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BottomSheet from '@components/common/BottomSheet';
import CommonHeader from '@components/common/CommonHeader/CommonHeader';
import useModal from '@hooks/useModal';
import Menu from '@components/Notifications/Menu';
import useQueryString from '@hooks/useQueryString';

const Container = styled.div`
  padding-top: 60px;
`;

const Menubar = styled.div`
  display: flex;
  width: 100%;
`;

const KeywordSetting = styled.div``;

const RemoveNotification = styled.div`
  color: ${({ theme }) => theme.color.orange};
`;

function Notifications() {
  const { isOpen, open, close } = useModal();
  const navigate = useNavigate();
  const type = useQueryString('type');

  const checkType = (currentType: string) => type === currentType;

  const handleKeywordMenuClick = () =>
    navigate('?type=keyword', { replace: true });

  const handleActivityMenuClick = () =>
    navigate('?type=activity', { replace: true });

  return (
    <>
      <CommonHeader visibleOption={true} optionClick={open}>
        알림
      </CommonHeader>
      <Container>
        <Menubar>
          <Menu
            isActive={checkType('keyword')}
            title="키워드 알림"
            onClick={handleKeywordMenuClick}
          />
          <Menu
            isActive={checkType('activity')}
            title="활동 알림"
            onClick={handleActivityMenuClick}
          />
        </Menubar>
      </Container>
      {isOpen && (
        <BottomSheet height="200px" onClick={close}>
          <KeywordSetting>키워드 설정</KeywordSetting>
          <RemoveNotification>삭제</RemoveNotification>
        </BottomSheet>
      )}
    </>
  );
}

export default Notifications;
