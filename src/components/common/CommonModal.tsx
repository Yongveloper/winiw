import React from 'react';
import styled from 'styled-components';
import ModalBackground from './ModalBackground';

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 300px;
  width: 100%;
  height: 163px;
  z-index: 999;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: ${({ theme }) => theme.color.bgColor};
  box-shadow: 0px 0px 12px 0px rgba(33, 86, 242, 0.1);

  .title {
    font-size: ${({ theme }) => theme.font.size.medium};
    font-weight: 600;
    position: absolute;
    width: 100%;
    text-align: center;
  }

  .close-btn {
    position: absolute;
    bottom: -38px;
    width: 100%;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.Mainblue};
    padding: 11px;
    border: none;
  }
`;

interface ICommonModalProps {
  isOpen: boolean;
  title: string;
  closeAction: () => void;
}

function CommonModal({ isOpen, title, closeAction }: ICommonModalProps) {
  if (!isOpen) return null;

  const titleLines = title.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <>
      <ModalBackground />
      <ModalWrapper>
        <h1 className="title">{titleLines}</h1>
        <button className="close-btn" onClick={closeAction}>
          확인
        </button>
      </ModalWrapper>
    </>
  );
}

export default CommonModal;
