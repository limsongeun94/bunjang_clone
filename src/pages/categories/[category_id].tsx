import MainLayout from "@/layouts/MainLayout";
import type { Banner, Category, Product, User } from "@/interface";
import { withIronSessionSsr } from "iron-session/next";
import { ironSessionOptions } from "@/libs/session";
import axios from "@/libs/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination_library";

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

  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1"; // (어쩌면 null) || (널인 경우 값)

  const [productList, setProductList] = useState<Array<Product>>([]);
  const showMoreProduct = () => {
    axios
      .get("/products", {
        params: {
          page: page,
          size: 100,
          category: router.query.category_id,
        },
      })
      .then((res) => {
        // 원래는 size 100
        setProductList(res.data.list);
        // setLastPage(res.data.pages);
        // console.log(res.data.total, res.data.pages);
        console.log(res.data.list);
        console.log("안녕");
      });
  };
  const [lastPage, setLastPage] = useState(0);

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

  useEffect(() => {
    showMoreProduct();
  }, [page]); // 여기에 [] 안에 쿼리 변환 들어가야함

  console.log("dkssud");

  return (
    <MainLayout categories={data.categories} user={user}></MainLayout>
    // <MainLayout categories={data.categories} user={user}>
    //   <div className="pt-[30px] bg-[#f9f9f9] ">
    //     <div className="w-[1024px] mx-auto  flex flex-wrap">
    //       {/* 100개 출력함*/}
    //       {productList.map((product: Product) => {
    //         return (
    //           <div
    //             key={product.pid}
    //             className="flex-item-propduct w-[196px] h-[276px] mr-[11px] mb-[11px] border-[1px] border-[#eeeeee]"
    //           >
    //             <div className="w-[194px] h-[194px] border-b-[1px] border-[#eeeeee]">
    //               <img
    //                 className="w-[194px] h-[194px] object-cover"
    //                 src={product.product_image}
    //               />
    //             </div>
    //             <div className="w-[194px] h-[80px] py-[15px] px-[10px] flex flex-col justify-between">
    //               <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
    //                 {product.name}
    //               </div>
    //               <div className="flex justify-between items-center">
    //                 <div className="text-base font-semibold after-won">
    //                   {product.price
    //                     .toString()
    //                     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    //                 </div>
    //                 <div className="text-xs text-[#888888]">
    //                   {showDate(product.update_time)}
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         );
    //       })}
    //       <Pagination
    //         lastPage={lastPage}
    //         onClickPage={(value) =>
    //           router.push(
    //             "/categories/" + router.query.category_id + "?page=" + value
    //           )
    //         }
    //       />
    //     </div>
    //   </div>
    // </MainLayout>
  );
};

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const data = (await axios.get("/landing")).data;
  const user = req.session.user ?? null;
  return { props: { data, user } };
}, ironSessionOptions);
