import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as A from './ArticlesStyles';
import CommonHeader from '@components/common/CommonHeader/CommonHeader';
import WriterProfile from '@/components/Articles/WriterProfile';
import ProductInfo from '@components/Articles/ProductInfo';
import PostActionButtons from '@components/Articles/PostActionButtons.tsx';
import LikeAndComment from '@/components/Articles/LikeAndComment';
import OfferItemLists from '@/components/Articles/OfferItemLists';
import useTimeDiff from '@/hooks/useTimeDiff';
import BottomSheet from '@/components/common/BottomSheet';
import useModal from '@hooks/useModal';
import { OfferPostTypes } from '@/types/OfferTypes';
import defaultCharacterImg from '@Assets/Character_Icons/Character_circle.svg';
import ConfirmModal from '@components/common/ConfirmModal';
import ChatToOfferedUserContainer from '@components/Articles/ChatToOfferedUserContainer';
import ProductImagesContainer from '@components/Articles/ProductImagesContainer';
import {
  useDeletePostMutation,
  useGetPostDetailQuery,
} from '@store/api/postApiSlice';
import { useUser } from '@hooks/useUser';
import Spinner from '@components/Auth/Spinner';
import { format, parseISO } from 'date-fns';
import { TRADE_TYPE } from '@/types/PostTypes';

// 더미데이터
const offers: OfferPostTypes[] = [
  {
    id: '1',
    userId: '123',
    profileImg: 'https://www.a-m.co.kr/news/photo/202202/603633_4408_253.jpg',
    nickname: '용',
    location: '한강로동',
    rating: 'two',
    title: '선글라스',
    category: '의류',
    createdAt: new Date('2023-08-29T21:24:00'),
    price: '21,000~24,000',
    text: '(본문) 선글라스와 교환하신다고 하면 다른 물건도 얹어드릴 수 있습니다.',
    isOriginalPost: true,
  },
  {
    id: '2',
    userId: '123321',
    profileImg: '',
    nickname: '거래왕',
    location: '신사동',
    rating: 'one',
    title: '선글라스',
    category: '의류',
    createdAt: new Date('2023-08-26T22:24:00'),
    price: '11,000~24,000',
    text: '(본문) 교환해요',
    isOriginalPost: false,
  },
  {
    id: '3',
    userId: '3213',
    profileImg: 'https://www.a-m.co.kr/news/photo/202202/603633_4408_253.jpg',
    nickname: '용',
    location: '한강로동',
    rating: 'three',
    title: '선글라스',
    category: '의류',
    createdAt: new Date('2023-08-29T21:24:00'),
    price: '21,000~24,000',
    text: '(본문) 선글라스와 교환하신다고 하면 다른 물건도 얹어드릴 수 있습니다.',
    isOriginalPost: true,
    // isOriginalPost를 통해 원글인지 댓글인지 구분 하는데, API명세서가 나오면 수정 필요 (post id 여부로 판별?)
  },
];

function Articles() {
  const navigate = useNavigate();
  const { data: { data: user } = {} } = useUser();
  // Todo: 게시물 생성 완료되면 해당 게시물 id로 상세 정보 가져오기
  const { data: post, isLoading, isError } = useGetPostDetailQuery('13');

  if (isError) {
    navigate('/error', { replace: true });
  }

  const [deletePost, { isLoading: isDeletePostLoading }] =
    useDeletePostMutation();

  const { isOpen, open, close } = useModal();
  const {
    isOpen: isDeleteModalOpen,
    open: deleteModalOpen,
    close: deleteModalClose,
  } = useModal();
  const {
    isOpen: isChatToOfferedUserModalOpen,
    open: chatToOfferedUserModalOpen,
    close: chatToOfferedUserModalClose,
  } = useModal();
  const timeDifference = post?.createdAt ? useTimeDiff(post.createdAt) : null;
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(false);

  const handleDeletePost = async () => {
    try {
      await deletePost('13').unwrap();
      navigate('/', { replace: true });
    } catch (error: any) {
      throw new Error(error.data.message);
    }
  };

  // 1:1 거래일 시 채팅하기 버튼 클릭 시
  const handleDirectChatInitiation = () => {};

  useEffect(() => {
    if (post && user) {
      setIsOwner(post.writer.id === user.id);
    }
  }, [post, user]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <CommonHeader visibleOption={isOwner} optionClick={open}>
        상세 페이지
      </CommonHeader>
      <A.Container>
        {post?.images.length > 0 && (
          <ProductImagesContainer images={post.images} />
        )}
        <A.ContentsContainer>
          <WriterProfile
            profileImg={post?.writer.profileImage || defaultCharacterImg}
            nickname={post?.writer.nickname}
            location={
              post?.writer.address.hdongName || post?.writer.address.eupMyeon
            }
            rating="three"
          />
          <ProductInfo
            title={post?.title}
            category={post?.wishCategory}
            uploadTime={timeDifference}
            deadLine={format(parseISO(post?.closeAt), 'yyyy년 MM월 dd일')}
            desiredCategory={post?.provisionCategory}
            tradeTime={post?.tradeTime}
            price={post?.suggestedPrice}
            description={post?.content}
          />
          <LikeAndComment likeCount="3" commentCount="3" />
          {post.tradeType === TRADE_TYPE.OFFER && (
            <OfferItemLists offers={offers} isOwner={isOwner} />
          )}
        </A.ContentsContainer>
      </A.Container>
      <PostActionButtons
        isOfferPost={post.tradeType === TRADE_TYPE.OFFER}
        isOwner={isOwner}
        isEnded={new Date(post?.closeAt).getTime() < Date.now()}
        onChatButtonClick={
          post.tradeType === TRADE_TYPE.OFFER
            ? chatToOfferedUserModalOpen
            : handleDirectChatInitiation
        } // 오퍼 게시물 일때 채팅하기 버튼 클릭 시 모달 오픈, 1:1 게시물 일때 채팅하기 버튼 클릭 시 바로 채팅방으로 이동
      />
      {isDeletePostLoading && <Spinner />}
      {isOpen && (
        <BottomSheet height={'200px'} onClick={close}>
          <A.CorrectionButton
            onClick={() => navigate(`edit/select-element`, { state: post })}
          >
            게시물 수정
          </A.CorrectionButton>
          <A.DeleteButton
            onClick={() => {
              close();
              deleteModalOpen();
            }}
          >
            삭제
          </A.DeleteButton>
        </BottomSheet>
      )}
      <ChatToOfferedUserContainer
        offers={offers}
        isOpen={isChatToOfferedUserModalOpen}
        modalClose={chatToOfferedUserModalClose}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="게시물 삭제"
        content="게시물을 삭제하시겠습니까?"
        confirmedContent="게시물이 삭제되었습니다."
        onConfirmAction={handleDeletePost}
        closeAction={deleteModalClose}
      />
    </>
  );
}

export default Articles;
