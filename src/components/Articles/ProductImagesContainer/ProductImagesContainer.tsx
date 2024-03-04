import { IImage } from '@/types/PostTypes';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

export const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
`;

interface IProductImagesContainerProps {
  images: IImage[];
}

function ProductImagesContainer({ images }: IProductImagesContainerProps) {
  return (
    <Swiper spaceBetween={5} slidesPerView={1} style={{ marginTop: '12px' }}>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <ProductImage src={image.imageUrl} alt={`제품 이미지 ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ProductImagesContainer;
