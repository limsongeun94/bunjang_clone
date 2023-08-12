import MainLayout from "@/layouts/MainLayout";
import SellingTab from "@/components/SellingTab";
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
  user: User;
}

export default ({ data, user }: IndexProps) => {
  return (
    <MainLayout categories={data.categories} user={user}>
      <div className="w-[1024px] mx-auto">
        <SellingTab tab="manage" />
        <div className="mt-[2.5rem] mb-[2rem] flex">
          <form className="w-[400px] h-[3rem] relative mr-[16px]">
            <input
              placeholder="상품명을 입력해주세요."
              className="w-full h-full pl-[1rem] pr-[68px] border-[1px] border-[#c3c2cc] rounded-[2px] focus-visible:outline-0 hover:border-[#1e1d29] focus:border-[#1e1d29]"
            />
            <button className="absolute top-0 right-0 bg-center bg-no-repeat bg-[length:20px_20px] bg-[url('/icons/address_search_modal_search.svg')] w-[52px] h-full" />
          </form>
          <div className="w-[7rem] h-[3rem] border-[1px] border-[#c3c2cc] rounded-[2px] mr-[1rem]  focus-visible:outline-0 hover:border-[#1e1d29] focus:border-[#1e1d29]">
            <div className="flex items-center justify-between flex-1 py-[2px] px-[8px] overflow-hidden w-full h-full">
              <div className="">10개씩</div>
              <div className="bg-[0px_center] bg-no-repeat bg-[length:1rem_1rem] bg-[url('/icons/down_arrow_product_manage.svg')] w-[2rem] h-full" />
            </div>
            <div></div>
          </div>
          <div className="w-[7rem] h-[3rem] border-[1px] border-[#c3c2cc] rounded-[2px] mr-[1rem]  focus-visible:outline-0 hover:border-[#1e1d29] focus:border-[#1e1d29]">
            <div className="flex items-center justify-between flex-1 py-[2px] px-[8px] overflow-hidden w-full h-full">
              <div className="">전체</div>
              <div className="bg-[0px_center] bg-no-repeat bg-[length:1rem_1rem] bg-[url('/icons/down_arrow_product_manage.svg')] w-[2rem] h-full" />
            </div>
            <div></div>
          </div>
        </div>
        <table className="w-full text-center table-fixed border-collapse border-spacing-0">
          <thead className="font-normal border-t border-b border-[#1e1d29]">
            <tr className="h-[2.5rem]">
              <th className="w-[10.5rem] align-middle">사진</th>
              <th className="w-[8rem] align-middle">판매상태</th>
              <th className="w-[15.5rem] align-middle">상품명</th>
              <th className="w-[6.5rem] align-middle">가격</th>
              <th className="w-[7.5rem] align-middle">안전결제 환영</th>
              <th className="w-[4.5rem] align-middle">찜</th>
              <th className="w-[7.5rem] align-middle">최근수정일</th>
              <th className="w-[4rem] align-middle">기능</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#dcdbe4] h-[9.5rem]">
              <td className="w-[10.5rem] align-middle"></td>
              <td className="w-[8rem] align-middle"></td>
              <td className="w-[15.5rem] align-middle"></td>
              <td className="w-[6.5rem] align-middle"></td>
              <td className="w-[7.5rem] align-middle"></td>
              <td className="w-[4.5rem] align-middle"></td>
              <td className="w-[7.5rem] align-middle"></td>
              <td className="w-[4rem] h-[9.5rem] align-middle flex flex-col justify-center items-center">
                <button className="w-[3.25rem] h-[2rem] text-center rounded-[2px] border-[1px] border-[#c3c2cc] text-[#ff5058] mb-[0.5rem]">
                  UP
                </button>
                <button className="w-[3.25rem] h-[2rem] text-center rounded-[2px] border-[1px] border-[#c3c2cc] text-[#0072e6]">
                  수정
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const data = (await axios.get("/landing")).data;
  const user = req.session.user ?? null;
  return { props: { data, user } };
}, ironSessionOptions);
