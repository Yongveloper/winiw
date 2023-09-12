import styled from 'styled-components';
import CommonHeader from '@components/common/CommonHeader/CommonHeader';
import Profile from '@components/MyPage/Profile';
import ExchangeInfoList from '@components/MyPage/ExchangeInfoList';

const MyPageContainer = styled.div`
  width: 100%;
  padding-top: 48px;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 21px;
`;

function MyPage() {
  return (
    <>
      <CommonHeader visibleHeart visibleOption>
        마이페이지
      </CommonHeader>
      <MyPageContainer>
        <TopSection>
          <Profile />
          <ExchangeInfoList />
        </TopSection>
      </MyPageContainer>
    </>
  );
}

export default MyPage;
