import { TRADE_TIME, TradeTimeType } from '@/types/PostTypes';
import * as P from './ProductInfoStyles';
import Title from '@components/common/BigTitle';

interface IProductInfoProps {
  title: string;
  category: string;
  uploadTime: string;
  deadLine: string;
  desiredCategory: string;
  tradeTime: TradeTimeType;
  price: number[];
  description: string;
}

function ProductInfo({
  title,
  category,
  uploadTime,
  deadLine,
  desiredCategory,
  tradeTime,
  price,
  description,
}: IProductInfoProps) {
  let tradeTimeText = '';

  switch (tradeTime) {
    case TRADE_TIME.EARLY_MORNING:
      tradeTimeText = '이른 아침(06시 ~ 09시)';
      break;
    case TRADE_TIME.MORNING:
      tradeTimeText = '오전(09시 ~ 12시)';
      break;
    case TRADE_TIME.AFTERNOON:
      tradeTimeText = '오후(12시 ~ 18시)';
      break;
    case TRADE_TIME.EVENING:
      tradeTimeText = '저녁(18시 ~ 00시)';
      break;
  }

  return (
    <P.Container>
      <P.TitleContainer>
        <P.leftContainerInTitle>
          <Title>{title}</Title>
          <P.Category>{category}</P.Category>
        </P.leftContainerInTitle>
        <P.Date>{uploadTime}</P.Date>
      </P.TitleContainer>
      <P.InfoContainer>
        <div>
          <P.InfoTitle>거래 마감일</P.InfoTitle>
          <P.InfoDate>{deadLine}</P.InfoDate>
        </div>
        <div>
          <P.InfoTitle>희망 물품</P.InfoTitle>
          <div className="category">{desiredCategory}</div>
        </div>
        <div>
          <P.InfoTitle>거래 가능 시간</P.InfoTitle>
          <P.InfoDate>{tradeTimeText}</P.InfoDate>
        </div>
        <div>
          <P.InfoTitle>가격 제안</P.InfoTitle>
          <div className="price">
            {price.map((item) => item.toLocaleString('kr-KR') + '원').join('~')}
          </div>
        </div>
      </P.InfoContainer>
      <P.Description>{description}</P.Description>
    </P.Container>
  );
}

export default ProductInfo;
