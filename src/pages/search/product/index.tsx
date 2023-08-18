import MainLayout from "@/layouts/MainLayout";
import axios from "@/libs/axios";
import type { Banner, Category, Product, User } from "@/interface";
import { withIronSessionSsr } from "iron-session/next";
import { ironSessionOptions } from "@/libs/session";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Paginator } from "@/libs/paginator";

interface IndexProps {
  data: {
    banners: Array<Banner>;
    products: Array<Product>;
    categories: Array<Category>;
  };
  user: User;
}

export default ({ data, user }: IndexProps) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const [paginator] = useState<Paginator>(
    new Paginator(parseInt(page as string), 5, { windowMode: "JUMPING" })
  );

  const [productList, setProductList] = useState<Array<Product>>([]);
  const showMoreProduct = () => {
    axios.get("/product", { params: { page: page, size: 100 } }).then((res) => {
      // 원래는 size 100
      setProductList(res.data.list);
      setLastPage(res.data.pages);
      console.log(res.data.total, res.data.pages);
      paginator.setPages(res.data.pages);
    });
  };
  const [lastPage, setLastPage] = useState(0);
  const onClickPage = (value: number) => {
    const aTag = document.createElement("a");
    aTag.setAttribute("href", "/search/product?page=" + value);
    aTag.click();
  };

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

  return (
    <MainLayout categories={data.categories} user={user}>
      <div className="pt-[30px] bg-[#f9f9f9]">
        <div className="w-[1024px] mx-auto">
          <div className="w-full flex flex-wrap">
            <div className="w-[203px] h-[48px] bg-white mr-[1px] mb-[1px] text-xs px-[20px] leading-[48px]">
              더미1
            </div>
            <div className="w-[203px] h-[48px] bg-white mr-[1px] mb-[1px] text-xs px-[20px] leading-[48px]">
              더미2
            </div>
            <div className="w-[203px] h-[48px] bg-white mr-[1px] mb-[1px] text-xs px-[20px] leading-[48px]">
              더미3
            </div>
            <div className="w-[203px] h-[48px] bg-white mr-[1px] mb-[1px] text-xs px-[20px] leading-[48px]">
              더미4
            </div>
            <div className="w-[203px] h-[48px] bg-white mr-[1px] mb-[1px] text-xs px-[20px] leading-[48px]">
              더미5
            </div>
            <div className="w-[203px] h-[48px] bg-white mr-[1px] mb-[1px] text-xs px-[20px] leading-[48px]">
              더미6
            </div>
          </div>
          <div className="mt-[50px] mb-[24px] flex justify-between items-center">
            <div>
              <span className="text-[#f70000]">00</span>의 검색결과
              <span className="ml-[5px] text-[#888888]">0000개</span>
            </div>
            <div className="flex">
              <div className="mr-[20px] relative cursor-pointer text-[13px] after:absolute after:content-[''] after:top-[4px] after:right-[-10px] after:w-[1px] after:h-[12px] after:border-r after:border-[#cccccc]">
                정확도순
              </div>
              <div className="mr-[20px] relative cursor-pointer text-[13px] after:absolute after:content-[''] after:top-[4px] after:right-[-10px] after:w-[1px] after:h-[12px] after:border-r after:border-[#cccccc]">
                최신순
              </div>
              <div className="mr-[20px] relative cursor-pointer text-[13px] after:absolute after:content-[''] after:top-[4px] after:right-[-10px] after:w-[1px] after:h-[12px] after:border-r after:border-[#cccccc]">
                저가순
              </div>
              <div className="relative cursor-pointer text-[13px]">고가순</div>
            </div>
          </div>
          <div className="flex flex-wrap mb-[40px]">
            {productList.map((product: Product) => {
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
          {/* <Pagination page={page} lastPage={lastPage} setPage={onClickPage} /> */}
          {/* <Pagination /> */}
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
