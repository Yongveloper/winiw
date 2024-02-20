import { useState } from 'react';
import styled from 'styled-components';
import ModalBackground from './ModalBackground';
import Spinner from '@components/Auth/Spinner';

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 300px;
  width: 100%;
  height: 163px;
  z-index: 999;
  border-top-left-radius: 8px;
  border-top-left-radius: 8px;
  background-color: ${({ theme }) => theme.color.bgColor};
  box-shadow: 0px 0px 12px 0px rgba(33, 86, 242, 0.1);

  .title {
    color: ${({ theme }) => theme.color.Mainblue};
    font-size: ${({ theme }) => theme.font.size.medium};
    font-weight: 600;
    position: absolute;
    bottom: calc(45% + 36px);
    width: 100%;
    text-align: center;
  }

  .content {
    color: ${({ theme }) => theme.color.lightGray};
    font-size: 15px;
    text-align: center;
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    line-height: 20px;
    white-space: pre-line;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: -40px;
  width: 100%;

  button {
    width: 50%;
    border: none;
    padding: 11px;
    height: 40px;
  }

  .close-btn {
    color: ${({ theme }) => theme.color.lightGray};
    border-bottom-left-radius: 8px;
    background-color: ${({ theme }) => theme.color.whiteGray};
  }

  .ok-btn {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.Mainblue};
  }

  .initial-ok-btn {
    border-bottom-right-radius: 8px;
  }

  .final-ok-btn {
    width: 100%;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

interface IConfirmModalProps {
  isOpen: boolean;
  title: string;
  confirmedTitle?: string;
  content: string;
  confirmedContent?: string;
  closeAction: () => void;
  onConfirmAction: () => Promise<void> | Promise<unknown> | void;
  onCompletedAction?: () => void;
  confirmType?: string;
}

function ConfirmModal({
  isOpen,
  title,
  confirmedTitle,
  content,
  confirmedContent: initConfirmContent,
  onConfirmAction,
  closeAction,
  onCompletedAction,
  confirmType = '확인',
}: IConfirmModalProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmedContent, setConfirmedContent] = useState(initConfirmContent);

  // onConfirmAction이 동기/비동기 모두를 처리할 수 있도록 처리
  const onInitialOkBtnClick = async () => {
    setIsLoading(true);
    try {
      await onConfirmAction();
      setIsConfirmed(true);
    } catch (error: any) {
      setIsConfirmed(true);
      setConfirmedContent(error.message as string);
    } finally {
      setIsLoading(false);
    }
  };
  const onCompleteBtnClick = () => {
    if (onCompletedAction) {
      onCompletedAction();
    }
    setIsConfirmed(false);
    closeAction();
  };

  if (!isOpen) return null;
  return (
    <>
      <ModalBackground />
      <ModalWrapper>
        <h1 className="title">{!isConfirmed ? title : confirmedTitle}</h1>
        <p className="content">{!isConfirmed ? content : confirmedContent}</p>
        <ButtonWrapper>
          {!isConfirmed ? (
            <>
              <button className="close-btn" onClick={closeAction}>
                닫기
              </button>
              <button
                className="ok-btn initial-ok-btn"
                onClick={onInitialOkBtnClick}
              >
                {confirmType}
              </button>
            </>
          ) : (
            <button
              className="ok-btn final-ok-btn"
              onClick={onCompleteBtnClick}
            >
              확인
            </button>
          )}
        </ButtonWrapper>
      </ModalWrapper>
      {isLoading && <Spinner />}
    </>
  );
}

export default ConfirmModal;
