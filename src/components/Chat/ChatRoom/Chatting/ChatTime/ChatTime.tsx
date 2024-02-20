import styled from 'styled-components';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface IChatTimerops {
  send: boolean;
  time: Date;
}

const ChatTime = ({ send, time }: IChatTimerops) => {
  const chatTime = format(time, 'HH:mm', { locale: ko });

  return <ChatTimeBlock $send={send}>{chatTime}</ChatTimeBlock>;
};

export default ChatTime;

const ChatTimeBlock = styled.div<{ $send: boolean }>`
  display: flex;
  position: relative;
  align-items: flex-end;
  padding: 2px 7px;
  font-weight: 500;
  font-size: ${({ theme }) => theme.font.size.xSmall};
  color: ${({ theme }) => theme.color.gray};
  letter-spacing: 0.5px;
`;
