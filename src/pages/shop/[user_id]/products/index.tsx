import MainLayout from "@/layouts/MainLayout";
import axios from "@/libs/axios";
import type { Banner, Category, Product, User } from "@/interface";
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
  return (
    <MainLayout categories={data.categories} user={user}>
      <div className="w-[1024px] mx-auto mt-[30px]">
        <div className="mb-[30px] ">
          <div className="w-[310px] h-[310px] bg-black flex flex-col justify-center items-center">
            <img
              src="/icons/shop.svg"
              width="100px"
              height="100px"
              className="mb-[15px] cursor-pointer rounded-[50%]"
            />
            <div className="text-base mb-[10px] text-white">상점이름</div>
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
