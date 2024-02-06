import React, { useState, memo } from 'react';
import { useDaumPostcodePopup, Address } from 'react-daum-postcode';
import styled from 'styled-components';
import * as S from '@Pages/SingUp/SignUpStyles';
import BigTitle from '@components/common/BigTitle';
import BlueButton from '@components/common/Buttons/BlueButton';
import { size } from '@styles/theme';
import CommonHeader from '@components/common/CommonHeader/CommonHeader';
import ActionButton from '@components/common/Buttons/ActionButton';
import KakaoMap from './KakaoMap';

const MapContainer = styled.div`
  position: fixed;
  max-width: ${size.mobile};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 999;
  animation: bottomUp 0.3s ease;

  @keyframes bottomUp {
    from {
      transform: translate(-50%, calc(100% + (100vh - ${size.mobile}) / 2));
    }
    to {
      transform: translate(-50%, -${size.mobile} / 2);
    }
  }
`;

interface IAddressSettingProps {
  defaultAddress: string;
  handleRegionCode: (code: string) => void;
}

function AddressSetting({
  defaultAddress,
  handleRegionCode,
}: IAddressSettingProps) {
  const open = useDaumPostcodePopup();

  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress || '');

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
  };

  const closeAddressModal = () => {
    setAddressModalOpen(false);
  };

  const handelCurrentLocationBtnClick = () => {
    if (selectedAddress.length > 0) {
      handleAddressSelect('');
    }
    setAddressModalOpen(true);
  };

  const handleComplete = (data: Address) => {
    setAddressModalOpen(true);
    handleAddressSelect(data.address);
  };

  const handleSearchBtnClick = () => {
    open({ onComplete: handleComplete, shorthand: false });
  };

  return (
    <S.Section>
      <BigTitle>동네 설정</BigTitle>
      <S.InputContainer>
        <S.Input
          type="text"
          placeholder="지번, 도로명, 건물명으로 검색"
          value={selectedAddress}
          disabled={true}
        />
        <BlueButton disabled={false} onClick={handleSearchBtnClick}>
          검색
        </BlueButton>
      </S.InputContainer>
      <ActionButton
        onClick={handelCurrentLocationBtnClick}
        $backgroundColor="white"
        $borderColor="Mainblue"
      >
        현재 동네로 설정
      </ActionButton>
      {addressModalOpen && (
        <MapContainer>
          <CommonHeader
            onClick={() => {
              handleAddressSelect('');
              closeAddressModal();
            }}
          >
            현재 동네
          </CommonHeader>
          <KakaoMap
            selectedAddress={selectedAddress}
            handleAddressSelect={handleAddressSelect}
            handleRegionCode={handleRegionCode}
            closeAddressModal={closeAddressModal}
          />
        </MapContainer>
      )}
    </S.Section>
  );
}

export default memo(AddressSetting);
