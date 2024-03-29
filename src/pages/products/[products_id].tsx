import MainLayout from "@/layouts/MainLayout";
import type { Banner, Category, Product, User } from "@/interface";
import ProductCarousel from "@/components/ProductCarousel";
import { withIronSessionSsr } from "iron-session/next";
import { ironSessionOptions } from "@/libs/session";
import axios from "@/libs/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BigImgModal from "@/components/BigImgModal";

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

  const [product, setProduct] = useState({
    ad: false,
    brand: { id: 0, imageUrl: "", name: "" },
    bunpayHope: false,
    care: false,
    category: { id: 0, imageUrl: "", name: "" },
    description: "",
    exchangeable: false,
    exportNaverShopping: false,
    geo: {
      address: "",
      label: "",
      lat: 0,
      lon: 0,
    },
    imageCount: 0,
    imageUrl: "",
    includeShippingCost: false,
    inspectionStatus: "NON_TARGET",
    keywordLinks: [],
    keywords: [],
    metrics: {
      favoriteCount: 0,
      buntalkCount: 0,
      viewCount: 0,
      commentCount: 0,
    },
    name: "",
    pid: 0,
    price: 0,
    qty: 1,
    saleStatus: "SELLING",
    showNaverShoppingLabel: false,
    specLabels: [],
    status: "USED",
    updatedAt: "",
    updatedBefore: "",
  });
  const showProduct = () => {
    axios.get("/product/" + router.query.products_id).then((res) => {
      setProduct(res.data);
    });
  };

  useEffect(() => {
    showProduct();
  }, []);

  const [img_arr, setImg_arr] = useState<string[]>([]);
  const madeImgArr = () => {
    let arr = [];
    for (let i = 1; i <= product.imageCount; i++) {
      arr.push(product.imageUrl.replace("{cnt}", i.toString()));
    }
    setImg_arr([...arr]);
  };
  useEffect(() => {
    madeImgArr();
  }, [product]);

  const [imgModal, setImgModal] = useState(false);

  useEffect(() => {
    if (imgModal) {
      document.body.style.cssText = `overflow: hidden`;
    } else {
      document.body.style.cssText = `overflow: auto`;
    }
    return () => {
      document.body.style.cssText = `overflow: auto`;
    };
  }, [imgModal]);

  return (
    <MainLayout categories={data.categories} user={user}>
      <BigImgModal
        imgModal={imgModal}
        setImgModal={setImgModal}
        img_arr={img_arr}
      />
      <div className="w-[1024px] mx-auto ">
        {/* <div className="text-xs flex items-center justify-start pt-[30px] pb-[20px] border-b border-[#3f3f3f]">
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
        </div> */}
        <div className="flex py-[30px]">
          <div className="w-[430px] h-[430px] mr-[40px] relative">
            <ProductCarousel img_arr={img_arr} />
            <div
              onClick={() => setImgModal(true)}
              className="absolute right-[20px] bottom-[20px] text-sm ml-[10px] py-[6px] px-[12px] rounded-[16px] bg-[#212121]/[0.35] flex items-center text-white w-max cursor-pointer"
            >
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
                {product.name}
              </div>
              <div className="text-[40px] font-medium ">
                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                <span className="ml-[5px] text-[28px] font-normal">원</span>
                {product.bunpayHope === false ? (
                  ""
                ) : (
                  <span className="inline-block ml-[10px]">
                    <img className="inline-block" src="/icons/bunpay.svg" />
                  </span>
                )}
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
                  {product.metrics.favoriteCount}
                </div>
                <div className="flex items-center text-[#cccccc] after:content-[''] after:w-px after:h-[12px] after:border-r-[1px] after:mx-[10px] after:box-border">
                  <img
                    src="/icons/product_eye.png"
                    width="21px"
                    height="13px"
                    className="mr-[5px]"
                  />
                  {product.metrics.viewCount}
                </div>
                <div className="flex items-center text-[#cccccc]">
                  <img
                    src="/icons/product_clock.png"
                    width="16px"
                    height="16px"
                    className="mr-[5px]"
                  />
                  {product.updatedBefore}
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
                <div>{product.status === "USED" ? "중고" : "새상품"}</div>
              </div>
              <div className="flex relative">
                <div className="w-[90px] text-[#999999] mb-[25px] pl-[15px] before:content-[''] before:absolute before:top-[7px] before:left-[6px] before:w-[3px] before:h-[3px] before:rounded-[50%] before:bg-[#cccccc]">
                  교환여부
                </div>
                <div>
                  {product.exchangeable === false ? "교환불가능" : "교환가능"}
                </div>
              </div>
              <div className="flex relative">
                <div className="w-[90px] text-[#999999] mb-[25px] pl-[15px] before:content-[''] before:absolute before:top-[7px] before:left-[6px] before:w-[3px] before:h-[3px] before:rounded-[50%] before:bg-[#cccccc]">
                  배송비
                </div>
                <div>
                  {product.includeShippingCost === true
                    ? "배송비 포함"
                    : "배송비 별도"}
                </div>
              </div>
              <div className="flex relative">
                <div className="w-[90px] text-[#999999] mb-[25px] pl-[15px] before:content-[''] before:absolute before:top-[7px] before:left-[6px] before:w-[3px] before:h-[3px] before:rounded-[50%] before:bg-[#cccccc]">
                  거래지역
                </div>
                <div>{product.geo ? product.geo.label : "전국"}</div>
              </div>
            </div>
            <div className="flex justify-between w-full text-lg font-semibold text-white">
              <button className="bg-[#cccccc] mr-[10px] h-[56px] flex justify-center items-center flex-1 ">
                <img
                  src="/icons/zzim_heart_white.svg"
                  width="16px"
                  height="16px"
                />
                &nbsp;찜&nbsp;<span>{product.metrics.favoriteCount}</span>
              </button>
              <button className=" mr-[10px] h-[56px] flex justify-center items-center flex-1 bg-[#ffa425]">
                <img src="/icons/talk_white.png" width="20px" height="19px" />
                &nbsp;번개톡
              </button>
              <button className=" h-[56px] flex-1 bg-[#f70000]">
                바로구매
              </button>
            </div>
          </div>
        </div>
        <div className="h-[50px] border-b border-[#212121]  flex justify-end items-center">
          <button className="w-[28px] h-[28px] bg-[#00cb2f] flex justify-center items-center mr-[10px]">
            <img src="/icons/naver_blog.png" width="22px" height="18px" />
          </button>
          <button className="w-[28px] h-[28px] bg-[#3b5998] flex justify-center items-center mr-[10px]">
            <img src="/icons/facebook_f.png" width="8px" height="15px" />
          </button>
          <button className="w-[28px] h-[28px] bg-[#55acee] flex justify-center items-center mr-[10px]">
            <img src="/icons/twitter.png" width="16px" height="13px" />
          </button>
          <button className="w-[28px] h-[28px] bg-[#7e6e6c] flex justify-center items-center">
            <img src="/icons/url.png" width="25px" height="25px" />
          </button>
        </div>
        <div className="flex justify-between">
          <div className="pr-[30px] border-r border-[#eeeeee]">
            <div className="pt-[48px] pb-[16px] border-b border-[#eeeeee] text-lg">
              상품정보
            </div>
            <div className="my-[40px] w-[663px]  text-sm leading-[1.5]">
              <pre className="description text-sm leading-[1.5]">
                {product.description}
              </pre>
            </div>
            <div className="flex border-y border-[#eeeeee] py-[20px]">
              <div className="w-[221px] border-r border-[#eeeeee]">
                <div className="mb-[15px] flex justify-center items-center text-[13px] text-[#b2b2b2]">
                  <img
                    src="/icons/region.png"
                    width="16px"
                    height="18px"
                    className="mr-[7px]"
                  />
                  거래지역
                </div>
                <div className="px-[15px] text-center text-[13px] text-[#666666] leading-normal">
                  {product.geo ? product.geo.address : "전국"}
                </div>
              </div>
              <div className="w-[221px] border-r border-[#eeeeee]">
                <div className="mb-[15px] flex justify-center items-center text-[13px] text-[#b2b2b2]">
                  <img
                    src="/icons/category.png"
                    width="16px"
                    height="18px"
                    className="mr-[7px]"
                  />
                  카테고리
                </div>
                <div className="px-[15px] text-center text-[13px] text-[#666666] leading-normal">
                  {product.category.name}
                </div>
              </div>
              <div className="w-[221px] border-r border-[#eeeeee]">
                <div className="mb-[15px] flex justify-center items-center text-[13px] text-[#b2b2b2]">
                  <img
                    src="/icons/product_tag.png"
                    width="15px"
                    height="18px"
                    className="mr-[7px]"
                  />
                  상품태그
                </div>
                <div className="px-[15px] text-center text-[13px] text-[#666666] leading-normal">
                  {product.keywords.map((el, i) => {
                    return (
                      <a
                        key={i}
                        className="mr-[5px] text-[#666666] no-underline hover:underline cursor-pointer"
                        onClick={() =>
                          router.push("/search/product?page=1&q=" + el)
                        }
                      >
                        {"#" + el}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="px-[32px] pb-[118px] w-[330px] border-r border-[#eeeeee]">
            <div className="pt-[48px] pb-[16px] border-b border-[#eeeeee] text-lg">
              상점정보
            </div>
            <div className="px-[10px]">
              <div className="flex mt-[20px] mb-[16px]">
                <div className="mr-[16px]">
                  <img src="/icons/shop.svg" width="48px" height="48px" />
                </div>
                <div>
                  <div className="mt-[4px] mb-[11px] text-[#212121] text-sm font-normal">
                    상점이름
                  </div>
                  <div className="flex text-[#999999] text-[13px]">
                    <div className="mr-[17px]">
                      상품<span>19</span>
                    </div>
                    <div>
                      팔로워<span>12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="flex justify-center items-center w-full h-[32px] border-[1px] border-[#eeeeee] rounded-sm text-[#888888] text-[13px]">
              <img src="/icons/follow.png" width="20px" height="14px" />
              &nbsp;팔로우
            </button>
            <div className="pt-[30px] pb-[16px] border-b border-[#eeeeee] text-sm">
              상점후기<span className="ml-[5px] text-[#f72f33]">1</span>
            </div>
            <div className="flex pt-[16px] border-b border-[#eeeeee]">
              <div className="mr-[12px]">
                <img src="/icons/shop.svg" width="32px" height="32px" />
              </div>
              <div className="w-fit pb-[16px]">
                <div className="flex justify-between text-[#b2b2b2] text-[13px] mb-[5px]">
                  <div>닉네임</div>
                  <div>7년전</div>
                </div>
                <div className="flex mb-[10px]">
                  <img src="/icons/star.png" width="15px" height="14px" />
                  <img src="/icons/star.png" width="15px" height="14px" />
                  <img src="/icons/star.png" width="15px" height="14px" />
                  <img src="/icons/star.png" width="15px" height="14px" />
                  <img src="/icons/star.png" width="15px" height="14px" />
                </div>
                <div className="text-[#888888] text-[13px] leading-[1.4]">
                  너무 좋은 거래 했습니다.
                </div>
              </div>
            </div>
            <div className="text-[13px] text-[#666666] h-[40px] flex justify-center items-center border-b border-[#eeeeee]">
              상점후기 더보기
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
