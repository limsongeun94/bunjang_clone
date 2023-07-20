import MainLayout from "@/layouts/MainLayout";
import type { Banner, Category, Product, User } from "@/interface";
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

  return (
    <MainLayout categories={data.categories}>
      <div className="pt-[30px] bg-[#f9f9f9] ">
        <div className="w-[1024px] mx-auto  flex flex-wrap">
          {/* 100개 출력함*/}
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
                      {showDate(product.update_time)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
