import { useNavigate, useParams } from 'react-router-dom';
import * as P from './ProcessCompoStyles';
import CommonHeader from '@components/common/CommonHeader/CommonHeader';
import Progressbar from '@components/WriteComment/Progressbar';
import BlueButton from '@/components/common/Buttons/BlueButton';

interface IInfoComponentProps {
  children?: React.ReactNode;
  n: number;
  ProgessIcon: string;
  text: string[];
  inputRef?: React.RefObject<HTMLInputElement>;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled: boolean;
  price?: string[];
}

const InfoComponent = ({
  children, n, ProgessIcon, text, inputRef, handleSearch, placeholder = '', disabled, price }: IInfoComponentProps) => {
  const onButton = n === 2 || n === 6;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleClickNextProgress = () => {
    navigate(`/articles/${id}/write-comment/create-post/${n+1}`)
  };

  return (
    <>
      <CommonHeader />
      <Progressbar number={n} total={6} icon={ProgessIcon} />
      {/*  */}
      <P.Container>
        <P.Info>
          <div className="title">{text[0]}</div>
          <div className="description">
            <span>{text[1]}</span>
            <span>{text[2]}</span>
            <P.Input
              type={n === 3 || n == 4 ? "text" : "hidden"}
              placeholder={placeholder}
              ref={inputRef}
              onChange={handleSearch}
              disabled={n === 4}
              value={n === 4 && price ? price[0]+price[1]+price[2] : undefined}
              className={n === 4 ? 'price-input' : ''}
            />
            {n === 4 ? <div className="currency">원</div> : null}
          </div>
        </P.Info>
      </P.Container>
      {/*  */}
      {children}
      {/*  */}
      <P.ButtonsContainer>
        {!onButton ? (
        <P.BackButton
          onClick={handleBackButton}
          >이전</P.BackButton>
        ) : (<></>)
        }
          <BlueButton
            maxWidth={onButton ? '100%' : '175px'}
          disabled={disabled}
          onClick={handleClickNextProgress}
        >다음</BlueButton>
      </P.ButtonsContainer>
    </>
  );
};

export default InfoComponent;