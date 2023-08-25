import { useRef, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/types';
import { setInfoPost } from '@/store/slices/CreatePostSlice';
import ProcessCompo from '@components/WriteComment/CreatePost/ProcessCompo/ProcessCompo';
import write_imformation from "@Assets/offer/Write-comment/[Progress]_write_imformation.svg";
import { Container, BlueContainer } from './Progress5Styles';

const Progress5 = () => {
  const textAreaRef = useRef<number | any>(0);
  const dispatch = useDispatch();
  const selectInfo = useSelector((state: RootState) => state.createPost.info);

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setInfoPost(e.target.value))
  };

  //* TextArea 길이에 따라 일정 범위(400px)까지 Height가 늘어나다가 범위를 초과하면 Height가 고정된다.
  const handleTextAreaHeight = useCallback(() => {
    const currentHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = currentHeight < 400 ? currentHeight + "px" : '400px';
  }, []);

  // Todo : 최소 글자수 몇 글자? -> 임시 10자

  return (
    <>
      <ProcessCompo
        n={5}
        ProgessIcon={write_imformation}
        text={["전달 사항 작성", "물품에 대한 간단한 설명 및", "상대방에게 전달해야 할 내용을 작성해주세요."]}
        disabled={selectInfo.length < 10}
      />
      <Container>
        <BlueContainer
          placeholder="전달 사항 작성"
          ref={textAreaRef}
          value={selectInfo}
          onChange={handleTextArea}
          onInput={handleTextAreaHeight}
        />
      </Container>
    </>
  );
};

export default Progress5;