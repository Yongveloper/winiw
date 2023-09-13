import * as H from "./HomeStyles";
import SwiperBanner from "@components/Home/Swiper/SwiperBanner";
import ExchangeMenu from "@components/Home/Exchange/ExchangeMenu/ExchangeMenu";
import OurTownPost from "@components/Home/OurTownPost/OurTownPost";

const Main = () => {
  return (
    <H.Wrapper>
      <SwiperBanner />
      <ExchangeMenu />
      <OurTownPost />
    </H.Wrapper>
  );
};

export default Main;