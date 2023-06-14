import Carousel from "@/components/Carousel";
import axios from "@/libs/axios";

export default ({ data }: any) => {
  console.log(data);
  axios
    .get("/product", { params: { page: 2, size: 100 } })
    .then((res) => console.log(res.data));

  return (
    <div className="w-[1024px] mx-auto">
      <Carousel />
      <section className="pt-[56px]">
        <h2 className="text-2xl mb-6">오늘의 상품 추천</h2>
        <div className="flex flex-wrap">
          <div className="flex-item-propduct w-[196px] h-[276px] mr-[11px] mb-[11px] border-[1px] border-[#eeeeee]">
            <div className="w-[194px] h-[194px] border-b-[1px] border-[#eeeeee]"></div>
            <div className="w-[194px] h-[80px] py-[15px] px-[10px] flex flex-col justify-between">
              <div className="text-sm">상품제목</div>
              <div className="flex justify-between items-center">
                <div className="text-base font-semibold after-won">4,000</div>
                <div className="text-xs text-[#888888]">3시간 전</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps = async () => {
  const init = (await axios.get("/landing")).data;
  return { props: { data: { init } } };
};
