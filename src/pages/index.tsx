import { Carousel } from "@/components";
import MainLayout from "@/layouts/MainLayout";
import axios from "@/libs/axios";
import type { Banner, Category, Product, User } from "@/interface";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { ironSessionOptions } from "@/libs/session";

interface IndexProps {
  data: {
    banners: Array<Banner>;
    products: Array<Product>;
    categories: Array<Category>;
  };
  user: User;
}

export default ({ data, user }: IndexProps) => {
  // axios
  //   .get("/product", { params: { page: 2, size: 50 } })
  //   .then((res) => console.log(res.data));

  // console.log(data.products);

  const banner_img: Banner[] = data.banners;

  const { ref, inView } = useInView();

  const showDate = (update_time: number): string => {
    const myDate = new Date(update_time * 1000);
    return (
      myDate.getFullYear() +
      "." +
      (myDate.getMonth() + 1 > 9
        ? (myDate.getMonth() + 1).toString()
        : "0" + (myDate.getMonth() + 1)) +
      "." +
      (myDate.getDate() > 9
        ? myDate.getDate().toString()
        : "0" + myDate.getDate().toString())
    );
  };

  const [productPage, setProductPage] = useState(2);
  const [productList, setProductList] = useState<Array<Product>>([]);
  const showMoreProduct = () => {
    if (inView) {
      axios
        .get("/product", { params: { page: productPage, size: 50 } })
        .then((res) => {
          setProductList([...productList, ...res.data.list]);
          setProductPage(productPage + 1);
        });
    }
  };

  useEffect(() => {
    showMoreProduct();
  }, [inView]);

  const onClickNewTap = (id: string) => {
    const aTag = document.createElement("a");
    aTag.setAttribute("href", "/products/" + id);
    aTag.setAttribute("target", "_blank");
    aTag.click();
  };

  return (
    <MainLayout categories={data.categories} user={user}>
      <div className="w-[1024px] mx-auto">
        <Carousel banner_img={banner_img} />
        <img
          src="/banners/app_install_banner.png"
          className="align-bottom w-full h-full mt-[16px]"
        />
        <section className="pt-[56px]">
          <h2 className="text-2xl mb-6">오늘의 상품 추천</h2>
          <div className="flex flex-wrap">
            {data.products.map((product: Product) => {
              return (
                <div
                  key={product.pid}
                  onClick={() => onClickNewTap(product.pid)}
                  className="flex-item-propduct w-[196px] h-[276px] mr-[11px] mb-[11px] border-[1px] border-[#eeeeee] cursor-pointer"
                >
                  <div className="w-[194px] h-[194px] border-b-[1px] border-[#eeeeee] relative">
                    <img
                      className="w-[194px] h-[194px] object-cover"
                      src={product.product_image.replace("{res}", "194")}
                    />
                    <div className="absolute bottom-[10px] left-[10px] flex gap-[5px]">
                      {product.bun_pay_filter_enabled === true ? (
                        <img
                          src="/icons/bunpay.svg"
                          width="35px"
                          height="16px"
                        />
                      ) : (
                        ""
                      )}
                      {product.free_shipping === true ? (
                        <div className="px-[3px] py-[2px] leading-none rounded-[2px] text-[10px] text-white bg-black/[.4]">
                          배송비포함
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
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
                        {showDate(product.update_time)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {productList.map((product: Product) => {
              return (
                <div
                  key={product.pid}
                  onClick={() => onClickNewTap(product.pid)}
                  className="flex-item-propduct w-[196px] h-[276px] mr-[11px] mb-[11px] border-[1px] border-[#eeeeee] cursor-pointer"
                >
                  <div className="w-[194px] h-[194px] border-b-[1px] border-[#eeeeee] relative">
                    <img
                      className="w-[194px] h-[194px] object-cover"
                      src={product.product_image.replace("{res}", "194")}
                    />
                    <div className="absolute bottom-[10px] left-[10px] flex gap-[5px]">
                      {product.bun_pay_filter_enabled === true ? (
                        <img
                          src="/icons/bunpay.svg"
                          width="35px"
                          height="16px"
                        />
                      ) : (
                        ""
                      )}
                      {product.free_shipping === true ? (
                        <div className="px-[3px] py-[2px] leading-none rounded-[2px] text-[10px] text-white bg-black/[.4]">
                          배송비포함
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
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
                        {showDate(product.update_time)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <div ref={ref} />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const data = (await axios.get("/landing")).data;
  const user = req.session.user ?? null;
  return { props: { data, user } };
}, ironSessionOptions);
