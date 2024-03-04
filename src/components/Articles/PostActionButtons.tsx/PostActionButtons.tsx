import { useNavigate } from 'react-router-dom';
import * as P from './PostActionButtonsStyles';
import LikeButton from '@/components/common/Buttons/LikeButton';
import BlueButton from '@components/common/Buttons/BlueButton';
import ActionButton from '@/components/common/Buttons/ActionButton';

interface IPostActionsProps {
  isOfferPost: boolean;
  isOwner: boolean;
  isEnded: boolean;
  onChatButtonClick: () => void;
}

function PostActions({
  isOfferPost,
  isOwner,
  isEnded,
  onChatButtonClick,
}: IPostActionsProps) {
  const navigate = useNavigate();

  const handleCommentButtonClick = () => {
    navigate('write-comment');
  };

  return (
    <P.Container>
      <LikeButton isLiked={false} />
      <P.ButtonsContainer $isOfferPost={isOfferPost}>
        {isEnded && (
          <ActionButton onClick={() => {}} disabled={isEnded}>
            거래가 마감되었습니다.
          </ActionButton>
        )}
        {!isEnded && isOfferPost && (
          <ActionButton onClick={handleCommentButtonClick} disabled={isOwner}>
            댓글쓰기
          </ActionButton>
        )}
        {!isEnded && (
          <BlueButton
            className={!isOfferPost && 'only-chat'}
            disabled={(!isOfferPost && isOwner) || (isOfferPost && !isOwner)}
            onClick={onChatButtonClick}
          >
            채팅하기
          </BlueButton>
        )}
      </P.ButtonsContainer>
    </P.Container>
  );
}

export default PostActions;
