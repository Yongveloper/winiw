import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type PositionType = {
  latitude: number;
  longitude: number;
} | null;

const useCurrentPosition = (): PositionType => {
  const navigate = useNavigate();

  const [position, setPosition] = useState<PositionType>(null);

  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 0,
  };

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    console.log(pos.coords);

    setPosition({ latitude, longitude });
  };

  const handleError = (error: GeolocationPositionError) => {
    alert('현재 위치를 불러올 수 없습니다.' + error.message);
    console.error('Geolocation error:', error);
    navigate(-1);
  };

  useEffect(() => {
    let isMounted = true;

    const successCb = (pos: GeolocationPosition) => {
      if (isMounted) {
        handleSuccess(pos);
      }
    };

    const errorCb = (error: GeolocationPositionError) => {
      if (isMounted) {
        handleError(error);
      }
    };

    navigator.geolocation.getCurrentPosition(
      successCb,
      errorCb,
      geolocationOptions
    );

    return () => {
      isMounted = false;
    };
  }, []);

  return position;
};

export default useCurrentPosition;
