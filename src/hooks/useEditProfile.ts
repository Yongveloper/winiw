import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/types';
import {
  setLatitude,
  setLongitude,
  setRegionCode,
} from '@store/slices/coordinateSlice';
import { useUpdateUserInfoMutation } from '@store/api/userApiSlice';
import { IUpdateUser, IUser } from '@/types/UserTypes';

export const useEditProfile = (user: IUser, open: () => void) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { regionCode, latitude, longitude } = useSelector(
    (state: RootState) => state.coordinateSetup
  );
  const initialNickname = useRef(user?.nickname);
  const newNickname = useRef(user?.nickname);
  const imgFile = useRef<File | null>(null);
  const [updateUser, { isLoading: isUpdateUserLoading }] =
    useUpdateUserInfoMutation();

  const handleSubmit = async (nickname: string, newImgFile: File) => {
    newNickname.current = nickname;
    imgFile.current = newImgFile;
    open();
  };

  const handleUpdateUser = async () => {
    const formData: IUpdateUser = {
      request: {
        addressRequest: {
          regionCode,
          latitude,
          longitude,
          type: 'main',
        },
      },
    };
    if (initialNickname.current !== newNickname.current) {
      formData.request.nickname = newNickname.current;
    }
    if (imgFile.current) {
      formData.file = imgFile.current;
    }

    try {
      await updateUser(formData).unwrap();
    } catch (error: any) {
      throw new Error(error.data.message);
    }
  };

  const onModalCompleteButtonClick = () => {
    navigate('/my-page');
  };

  useEffect(() => {
    dispatch(setRegionCode(user?.address.hdongCode));
    dispatch(setLatitude(user?.address.latitude));
    dispatch(setLongitude(user?.address.longitude));
  }, []);

  return {
    handleSubmit,
    handleUpdateUser,
    onModalCompleteButtonClick,
    isLoading: isUpdateUserLoading,
  };
};
