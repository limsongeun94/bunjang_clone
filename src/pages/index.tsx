import { Carousel } from "@/components";
import MainLayout from "@/layouts/MainLayout";
import axios from "@/libs/axios";
import type { Banner, Category, Product } from "@/interface";

interface IndexProps {
  data: {
    banners: Array<Banner>;
    products: Array<Product>;
    categories: Array<Category>;
  };
}

interface ServerSideProps {
  props: IndexProps;
}

export default ({ data }: IndexProps) => {
  console.log(data);
  axios.get("/product", { params: { page: 2, size: 100 } });
  // .then((res) => console.log(res.data));

  const banner_img: Banner[] = data.banners;

  return (
    <MainLayout categories={data.categories}>
      <div className="w-[1024px] mx-auto">
        <Carousel banner_img={banner_img} />
        <section className="pt-[56px]">
          <h2 className="text-2xl mb-6">오늘의 상품 추천</h2>
          <div className="flex flex-wrap">
            {data.products.map((product: Product) => {
              return (
                <div
                  key={product.pid}
                  className="flex-item-propduct w-[196px] h-[276px] mr-[11px] mb-[11px] border-[1px] border-[#eeeeee]"
                >
                  <div className="w-[194px] h-[194px] border-b-[1px] border-[#eeeeee]">
                    <img
                      className="w-[194px] h-[194px] object-cover"
                      src={product.product_image}
                    />
                  </div>
                  <div className="w-[194px] h-[80px] py-[15px] px-[10px] flex flex-col justify-between">
                    <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                      {product.name}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-base font-semibold after-won">
                        {product.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </div>
                      <div className="text-xs text-[#888888]">
                        {product.update_time}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="flex flex-wrap">
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
          </div> */}
        </section>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = async (): Promise<ServerSideProps> => {
  const data = (await axios.get("/landing")).data;
  return { props: { data } };
};
