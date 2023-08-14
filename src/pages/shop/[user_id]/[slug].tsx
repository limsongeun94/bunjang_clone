import MainLayout from "@/layouts/MainLayout";
import axios from "@/libs/axios";
import type { Banner, Category, Product, User } from "@/interface";
import { withIronSessionSsr } from "iron-session/next";
import { ironSessionOptions } from "@/libs/session";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface IndexProps {
  data: {
    banners: Array<Banner>;
    products: Array<Product>;
    categories: Array<Category>;
  };
  user: User;
}

export default ({ data, user }: IndexProps) => {
  const router = useRouter();
  const [routerType, setRouterType] = useState("");
  useEffect(() => {
    if (router.query.slug === "products") {
      setRouterType("products");
    } else if (router.query.slug === "reviews") {
      setRouterType("reviews");
    } else if (router.query.slug === "favorites") {
      setRouterType("favorites");
    } else if (router.query.slug === "followings") {
      setRouterType("followings");
    } else if (router.query.slug === "followers") {
      setRouterType("followers");
    }
  });

  const [categoriesFilter, setCategoriesFilter] = useState(false);

  return (
    <MainLayout categories={data.categories} user={user}>
      <div className="w-[1024px] mx-auto mt-[30px]">
        <div className="mb-[30px] flex">
          <div className="w-[310px] h-[310px] bg-[#b5b5b5] flex flex-col justify-center items-center bg-center bg-no-repeat bg-[length:310px_310px] bg-[url('/icons/shop_bg.png')]">
            <img
              src="/icons/shop.svg"
              width="100px"
              height="100px"
              className="mb-[15px] cursor-pointer rounded-[50%]"
            />
            <div className="text-base mb-[10px] text-white">상점이름</div>
            <div className="flex">
              <img src="/icons/star.png" width="15px" height="14px" />
              <img src="/icons/star.png" width="15px" height="14px" />
              <img src="/icons/star.png" width="15px" height="14px" />
              <img src="/icons/star.png" width="15px" height="14px" />
              <img src="/icons/star.png" width="15px" height="14px" />
            </div>
            <div className="mt-[20px] w-[106px] h-[40px] border-[1px] border-[#ffffff] text-[13px] text-white flex justify-center items-center cursor-pointer">
              내 상점 관리
            </div>
          </div>
          <div className="flex-[1_0_0%] px-[30px] border-t border-r border-b border-[#eeeeee] h-[310px]">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-lg font-semibold h-[75px]">
                상점이름{" "}
                <button className="ml-[10px] h-[20px] leading-[20px] text-center px-[5px] text-[#888888] border-[1px] border-[#eeeeee] text-[11px] font-normal cursor-pointer">
                  {" "}
                  상점명 수정
                </button>
              </div>
              <div className="after:absolute after:top-[2px] after:left-[-25px] after:content-['OK'] after:text-white after:bg-[#ffc322] after:px-[4px] after:text-[9px] after:rounded-[6px] text-[11px] text-[#4d4d4d] relative">
                본인인증 완료
              </div>
            </div>
            <div className="flex items-center h-[45px] border-t border-b border-[#fafafa] mb-[20px]">
              <div className="flex items-center mr-[30px] text-[13px] text-[#888888]">
                <img
                  src="/icons/shop_open.png"
                  width="14px"
                  height="13px"
                  className="mr-[10px]"
                />
                상점오픈일
                <div className="ml-[5px] text-[#212121]">203 일 전</div>
              </div>
              <div className="flex items-center mr-[30px] text-[13px] text-[#888888]">
                <img
                  src="/icons/shop_visited.png"
                  width="14px"
                  height="13px"
                  className="mr-[10px]"
                />
                상점방문수
                <div className="ml-[5px] text-[#212121]">45 명</div>
              </div>
              <div className="flex items-center mr-[30px] text-[13px] text-[#888888]">
                <img
                  src="/icons/product_sale.png"
                  width="14px"
                  height="13px"
                  className="mr-[10px]"
                />
                상품판매
                <div className="ml-[5px] text-[#212121]">1 회</div>
              </div>
              <div className="flex items-center mr-[30px] text-[13px] text-[#888888]">
                <img
                  src="/icons/courier_delivery.png"
                  width="14px"
                  height="13px"
                  className="mr-[10px]"
                />
                택배발송
                <div className="ml-[5px] text-[#212121]">0 회</div>
              </div>
            </div>
            <div className="h-[112px]" />
            <div className="h-[56px] flex items-center">
              <button className="h-[20px] flex items-center px-[5px] text-[#888888] border-[1px] border-[#eeeeee] text-[11px]">
                소개글 수정
              </button>
            </div>
          </div>
        </div>
        <div className="flex h-[50px]">
          <div
            onClick={() => router.push("/shop/[user_id]/products")}
            className={`${
              routerType === "products"
                ? "bg-white border-l border-t border-r border-[#212121]"
                : "bg-[#fafafa] border-b border-[#212121]"
            } flex-1 flex justify-center items-center text-sm cursor-pointer`}
          >
            상품
          </div>
          <div
            onClick={() => router.push("/shop/[user_id]/reviews")}
            className={`${
              routerType === "reviews"
                ? "bg-white border-l border-t border-r border-[#212121]"
                : "bg-[#fafafa] border-b border-[#212121]"
            } flex-1 flex justify-center items-center text-sm cursor-pointer`}
          >
            상점후기
          </div>
          <div
            onClick={() => router.push("/shop/[user_id]/favorites")}
            className={`${
              routerType === "favorites"
                ? "bg-white border-l border-t border-r border-[#212121]"
                : "bg-[#fafafa] border-b border-[#212121]"
            } flex-1 flex justify-center items-center text-sm cursor-pointer`}
          >
            찜
          </div>
          <div
            onClick={() => router.push("/shop/[user_id]/followings")}
            className={`${
              routerType === "followings"
                ? "bg-white border-l border-t border-r border-[#212121]"
                : "bg-[#fafafa] border-b border-[#212121]"
            } flex-1 flex justify-center items-center text-sm cursor-pointer`}
          >
            팔로잉
          </div>
          <div
            onClick={() => router.push("/shop/[user_id]/followers")}
            className={`${
              routerType === "followers"
                ? "bg-white border-l border-t border-r border-[#212121]"
                : "bg-[#fafafa] border-b border-[#212121]"
            } flex-1 flex justify-center items-center text-sm cursor-pointer`}
          >
            팔로워
          </div>
        </div>
        <div className={`${routerType === "products" ? "" : "hidden"}`}>
          <div className="text-lg pt-[50px] pb-[20px] border-b border-[#eeeeee] flex justify-between items-center">
            <div>
              상품
              <span className="text-[#f72f33]">38</span>
            </div>
            <div
              onMouseOver={() => setCategoriesFilter(true)}
              onMouseOut={() => setCategoriesFilter(false)}
              className="border-[1px] border-[#eeeeee] w-[140px] h-[28px] text-xs relative"
            >
              <div className="h-full pr-[10px] pl-[10px] flex items-center justify-between">
                전체
                <img
                  src="/icons/down_arrow_category.png"
                  width="10px"
                  height="6px"
                  alt="카테고리 화살표 아이콘"
                />
              </div>
              <div
                className={`${
                  categoriesFilter ? "" : "hidden"
                } absolute top-[27px] left-[-1px] w-[calc(100%+2px)] bg-white border-l border-b border-r border-[#eeeeee]`}
              >
                <div className="w-full h0[28px] px-[10px] leading-[28px] cursor-pointer">
                  카테고리1
                </div>
                <div className="w-full h0[28px] px-[10px] leading-[28px] cursor-pointer">
                  카테고리2
                </div>
                <div className="w-full h0[28px] px-[10px] leading-[28px] cursor-pointer">
                  카테고리3
                </div>
                <div className="w-full h0[28px] px-[10px] leading-[28px] cursor-pointer">
                  카테고리4
                </div>
              </div>
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
