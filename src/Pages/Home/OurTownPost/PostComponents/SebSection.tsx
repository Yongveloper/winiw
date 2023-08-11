import Icon_like from '@Assets/Icons/Home/Post/Icon_like.svg';
import Icon_unlike from '@Assets/Icons/Home/Post/Icon_unlike.svg';

interface ISebSectionProps {
  like: boolean;
  location: string;
  date: string;
}

const SebSection = ({ like, location, date }: ISebSectionProps) => {
  return (
    <section className="seb-section">
      <div>
        <img className="like-icon" src={like ? Icon_like : Icon_unlike} />
        <div className="subImpo">
          <div>{location}</div>
          <div>{date}</div>
        </div>
      </div>
    </section>
  );
};

export default SebSection;

// todo : 기능 구현 시 like 상태를 가져와 API를 통해 true, false 를 송신하고 다시 값을 가져와 렌더링한다.
