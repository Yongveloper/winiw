import React, { useEffect, useRef, useState } from 'react';
import * as K from './KakaoMapStyles';
import useCurrentPosition from '@/hooks/useCurrentPosition';
import CurrentLocation from '@components/common/ProfileSetupForm/CurrentLocation';
import SetCurrentLocationBtn from '@components/common/ProfileSetupForm/SetCurrentLocationBtn';

interface IKakaoMapProps {
  selectedAddress: string;
  handleAddressSelect: (address: string) => void;
  handleRegionCode: (code: string) => void;
  closeAddressModal: () => void;
}

function KakaoMap({
  selectedAddress,
  handleAddressSelect,
  handleRegionCode,
  closeAddressModal,
}: IKakaoMapProps) {
  const container = useRef<HTMLDivElement>(null);
  const currentPosition = useCurrentPosition();
  const [addressInfo, setAddressInfo] = useState({
    region_1depth_name: '',
    region_2depth_name: '',
    region_3depth_name: '',
  });

  const handleCompleteBtn = () => {
    closeAddressModal();
  };

  // 맵(지도) 생성
  const createMap = (coord: kakao.maps.LatLng) => {
    const options = {
      center: coord,
      level: 2,
    };
    const map = new kakao.maps.Map(container.current as HTMLElement, options);
    return map;
  };

  // 지도에 마커 표시, 중심 좌표로 이동
  const displayMarker = (map: kakao.maps.Map, coord: kakao.maps.LatLng) => {
    const marker = new kakao.maps.Marker({ position: coord });
    marker.setMap(map);
    map.setCenter(coord);
  };

  // 좌표 -> 주소 획득
  const geoCoordToAddress = (coord: kakao.maps.LatLng) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const longitude = coord.getLng();
    const latitude = coord.getLat();
    geocoder.coord2RegionCode(longitude, latitude, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        //result[0] == 법정동, result[1] == 행정동
        const { region_1depth_name, region_2depth_name, region_3depth_name } =
          result[1];
        handleRegionCode(result[1].code);
        setAddressInfo({
          region_1depth_name,
          region_2depth_name,
          region_3depth_name,
        });
        handleAddressSelect(
          `${region_1depth_name} ${region_2depth_name} ${region_3depth_name}`
        );
      }
    });
  };

  // 현재 위치 기반으로 지도 표시
  const displayMapBasedOnCurrentPosition = () => {
    if (container.current && currentPosition) {
      const latLng = new kakao.maps.LatLng(
        currentPosition.latitude,
        currentPosition.longitude
      );
      const map = createMap(latLng);
      displayMarker(map, latLng);
      geoCoordToAddress(latLng);
    }
  };

  // 주소 -> 좌표 획득
  const getCoordinatesFromAddress = (
    address: string
  ): Promise<kakao.maps.LatLng | null> => {
    return new Promise((resolve) => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const { x, y, region_3depth_h_name } = result[0].address;
          const latitude = Number(y);
          const longitude = Number(x);
          const coords = new kakao.maps.LatLng(latitude, longitude);
          handleRegionCode(result[0].address.h_code);
          setAddressInfo({
            region_1depth_name: address.split(' ')[0],
            region_2depth_name: address.split(' ')[1],
            region_3depth_name: region_3depth_h_name,
          });
          handleAddressSelect(
            `${address.split(' ')[0]} ${
              address.split(' ')[1]
            } ${region_3depth_h_name}`
          );
          resolve(coords);
        } else {
          resolve(null);
        }
      });
    });
  };

  // 사용자 입력 주소 기반으로 지도 표시
  const displayMapBasedOnAddress = async () => {
    const latLng = await getCoordinatesFromAddress(selectedAddress);
    if (!latLng) {
      console.error(
        'Failed to getLatLng, Function getCoordinatesFromAddress error'
      );
      return;
    }

    const map = createMap(latLng);
    displayMarker(map, latLng);
  };

  useEffect(() => {
    if (selectedAddress.length > 0) {
      displayMapBasedOnAddress();
    } else {
      displayMapBasedOnCurrentPosition();
    }
  }, [currentPosition]);

  return (
    <K.Container ref={container}>
      <SetCurrentLocationBtn onClick={displayMapBasedOnCurrentPosition} />
      <CurrentLocation
        addressInfo={`${addressInfo.region_1depth_name} ${addressInfo.region_2depth_name} ${addressInfo.region_3depth_name}`}
        handleCompleteBtn={handleCompleteBtn}
      />
    </K.Container>
  );
}

export default KakaoMap;
