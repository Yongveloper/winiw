import React, { useRef, memo } from 'react';
import styled from 'styled-components';
import BigTitle from '@components/common/BigTitle';
import { useLocation } from 'react-router-dom';
import { useImageCompress } from '@hooks/useImageCompress';
import Spinner from '@components/Auth/Spinner';
import useModal from '@hooks/useModal';
import CommonModal from '../CommonModal';

const Container = styled.div`
  margin: 28px 0;
  text-align: center;

  .image-icon {
    width: 110px;
    height: 110px;
    cursor: pointer;
  }

  .border-radius-50 {
    border-radius: 50%;
  }
`;

interface IProfileImgSettingProps {
  imgSrc: string;
  handleProfileImgSetting: (imgSrc: string, imgFile: File) => void;
}

function ProfileImgSetting({
  imgSrc,
  handleProfileImgSetting,
}: IProfileImgSettingProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { compressImage, isLoading } = useImageCompress();
  const {
    isOpen: isOpenErrorModal,
    open: openErrorModal,
    close: closeErrorModal,
  } = useModal();
  const { pathname } = useLocation();

  const isValidatedImageType = (type: string) => {
    const validTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    return validTypes.includes(type);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const imageFile = e.target.files[0];
    if (!isValidatedImageType(imageFile.type)) {
      openErrorModal();
      return;
    }

    try {
      const { compressedFile, imageUrl } = await compressImage({
        maxSizeMB: 1,
        maxWidthOrHeight: 400,
        imageFile,
      });
      const blobToFile = new File([compressedFile], `${compressedFile.name}`, {
        type: compressedFile.type,
      });
      handleProfileImgSetting(imageUrl, blobToFile);
    } catch (error) {
      console.error(error);
      // 압축에 실패했을 때는 원본 이미지를 사용
      const imageUrl = URL.createObjectURL(imageFile);
      handleProfileImgSetting(imageUrl, imageFile);
    }
  };

  const handleImgClick = () => {
    if (pathname === '/signup') {
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <>
      <BigTitle>프로필 이미지 설정</BigTitle>
      <Container>
        <img
          src={imgSrc}
          alt="profileImg"
          className={`image-icon ${
            imgSrc.includes('default_profile') ? '' : 'border-radius-50'
          }`}
          onClick={handleImgClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/jpg,image/png,image/jpeg"
          onChange={handleImageChange}
        />
      </Container>
      {isLoading && <Spinner />}
      <CommonModal
        title={`잘못된 파일 형식입니다.\njpg, jpeg, png 이미지 파일만 선택해주세요.`}
        isOpen={isOpenErrorModal}
        closeAction={closeErrorModal}
      />
    </>
  );
}

export default memo(ProfileImgSetting);
