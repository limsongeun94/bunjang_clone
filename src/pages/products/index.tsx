import MainLayout from "@/layouts/MainLayout";
import type { Banner, Category, Product, User } from "@/interface";
import ProductCarousel from "@/components/ProductCarousel";
import { withIronSessionSsr } from "iron-session/next";
import { ironSessionOptions } from "@/libs/session";
import axios from "@/libs/axios";

interface IndexProps {
  data: {
    banners: Array<Banner>;
    products: Array<Product>;
    categories: Array<Category>;
  };
  user?: User;
}

export default ({ data, user }: IndexProps) => {
  return (
    <MainLayout categories={data.categories}>
      <div>
        <div className="text-xs flex items-center justify-start pt-[30px] pb-[20px] border-b border-[#3f3f3f]">
          <div className="flex items-center">
            <img
              src="/icons/home.png"
              width="15px"
              height="15px"
              className="mr-[5px]"
            />
            홈
          </div>
          <img
            src="/icons/right_arrow_category.png"
            width="6px"
            height="10px"
            className=" mx-[10px]"
          />
          <div className="w-[154px]">
            <div className="flex justify-start items-center border-[1px] border-[#eeeeee] w-full h-[28px] pl-[10px] pr-[25px] relative">
              스포츠/레저
              <img
                src="/icons/down_arrow_category.png"
                width="10px"
                height="6px"
                className="absolute right-[10px] top-1/2 translate-y-[-50%]"
              />
            </div>
          </div>
          <img
            src="/icons/right_arrow_category.png"
            width="6px"
            height="10px"
            className=" mx-[10px]"
          />
          <div className="w-[154px]">
            <div className="flex justify-start items-center border-[1px] border-[#eeeeee] w-full h-[28px] pl-[10px] pr-[25px] relative">
              캠핑
              <img
                src="/icons/down_arrow_category.png"
                width="10px"
                height="6px"
                className="absolute right-[10px] top-1/2 translate-y-[-50%]"
              />
            </div>
          </div>
          <img
            src="/icons/right_arrow_category.png"
            width="6px"
            height="10px"
            className=" mx-[10px]"
          />
          <div className="w-[154px]">
            <div className="flex justify-start items-center border-[1px] border-[#eeeeee] w-full h-[28px] pl-[10px] pr-[25px] relative">
              텐트/그늘막
              <img
                src="/icons/down_arrow_category.png"
                width="10px"
                height="6px"
                className="absolute right-[10px] top-1/2 translate-y-[-50%]"
              />
            </div>
          </div>
        </div>
        <div className="flex py-[30px]">
          <div className="w-[430px] h-[430px] mr-[40px] relative">
            <ProductCarousel />
            <div className="absolute right-[20px] bottom-[20px] text-sm ml-[10px] py-[6px] px-[12px] rounded-[16px] bg-[#212121]/[0.35] flex items-center text-white w-max cursor-pointer">
              <img
                src="/icons/enlarge.png"
                width="16px"
                height="16px"
                className="mr-[5px]"
              />
              확대
            </div>
          </div>
          <div className="w-full">
            <div className="pb-[30px] border-b border-[#eeeeee]">
              <div className="text-2xl font-semibold leading-[1.4] mb-[25px]">
                상품 이름
              </div>
              <div className="text-[40px] font-medium">
                300,000
                <span className="ml-[5px] text-[28px] font-normal">원</span>
              </div>
            </div>
            <div className="flex justify-between mt-[15px] mb-[25px]">
              <div className="flex">
                <div className="flex items-center text-[#cccccc] after:content-[''] after:w-px after:h-[12px] after:border-r-[1px] after:mx-[10px] after:box-border">
                  <img
                    src="/icons/product_heart.png"
                    width="16px"
                    height="16px"
                    className="mr-[5px]"
                  />
                  63
                </div>
                <div className="flex items-center text-[#cccccc] after:content-[''] after:w-px after:h-[12px] after:border-r-[1px] after:mx-[10px] after:box-border">
                  <img
                    src="/icons/product_eye.png"
                    width="21px"
                    height="13px"
                    className="mr-[5px]"
                  />
                  2599
                </div>
                <div className="flex items-center text-[#cccccc]">
                  <img
                    src="/icons/product_clock.png"
                    width="16px"
                    height="16px"
                    className="mr-[5px]"
                  />
                  14시간 전
                </div>
              </div>
              <div className="flex items-center text-[#cccccc]">
                <img
                  src="/icons/siren.png"
                  width="15px"
                  height="15px"
                  className="mr-[5px]"
                />
                신고하기
              </div>
            </div>
            <div className="text-sm leading-none">
              <div className="flex relative">
                <div className="w-[90px] text-[#999999] mb-[25px] pl-[15px] before:content-[''] before:absolute before:top-[7px] before:left-[6px] before:w-[3px] before:h-[3px] before:rounded-[50%] before:bg-[#cccccc]">
                  상품상태
                </div>
                <div>중고</div>
              </div>
              <div className="flex relative">
                <div className="w-[90px] text-[#999999] mb-[25px] pl-[15px] before:content-[''] before:absolute before:top-[7px] before:left-[6px] before:w-[3px] before:h-[3px] before:rounded-[50%] before:bg-[#cccccc]">
                  교환여부
                </div>
                <div>교환불가능</div>
              </div>
              <div className="flex relative">
                <div className="w-[90px] text-[#999999] mb-[25px] pl-[15px] before:content-[''] before:absolute before:top-[7px] before:left-[6px] before:w-[3px] before:h-[3px] before:rounded-[50%] before:bg-[#cccccc]">
                  배송비
                </div>
                <div>배송비 별도</div>
              </div>
              <div className="flex relative">
                <div className="w-[90px] text-[#999999] mb-[25px] pl-[15px] before:content-[''] before:absolute before:top-[7px] before:left-[6px] before:w-[3px] before:h-[3px] before:rounded-[50%] before:bg-[#cccccc]">
                  거래지역
                </div>
                <div>일심해장국</div>
              </div>
            </div>
            <div className="flex justify-between w-full text-lg font-semibold text-white">
              <button className="bg-[#cccccc] mr-[10px] h-[56px] flex justify-center items-center flex-1 ">
                <img
                  src="icons/zzim_heart_white.svg"
                  width="16px"
                  height="16px"
                />
                &nbsp;찜&nbsp;<span>0</span>
              </button>
              <button className=" mr-[10px] h-[56px] flex justify-center items-center flex-1 bg-[#ffa425]">
                <img src="icons/talk_white.png" width="20px" height="19px" />
                &nbsp;번개톡
              </button>
              <button className=" h-[56px] flex-1 bg-[#f70000]">
                바로구매
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const data = (await axios.get("/landing")).data;
  const user = req.session.user ?? null;
  return { props: { data, user } };
}, ironSessionOptions);
