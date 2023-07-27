import MainLayout from "@/layouts/MainLayout";
import type { Banner, Category, Product, User } from "@/interface";
import { withIronSessionSsr } from "iron-session/next";
import { ironSessionOptions } from "@/libs/session";
import axios from "@/libs/axios";
import { useState, useEffect } from "react";

interface IndexProps {
  data: {
    banners: Array<Banner>;
    products: Array<Product>;
    categories: Array<Category>;
  };
  user?: User;
}

export default ({ data, user }: IndexProps) => {
  console.log(data.categories);

  const [images, setImages] = useState<string[]>([]);
  const onChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (!files[0]) return;
    if (images.length + files.length > 12) {
      return alert("최대 10개 사진만 첨부할 수 있습니다.");
    }
    const readAndPreview = (file: any) => {
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onload = () =>
          setImages((prev) => [reader.result as string, ...prev]);
        reader.readAsDataURL(file);
      }
    };
    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  };

  const [currentMainMenu, setCurrentMainMenu] = useState<string>("");
  const [currentSubMenu, setCurrentSubMenu] = useState<string>("");
  const [currentThirdMenu, setCurrentThirdMenu] = useState<string>("");
  const mainMenuCategories = data.categories.find(
    (el) => el.id === currentMainMenu
  );
  const subMenuCategories = mainMenuCategories
    ? mainMenuCategories.categories
      ? mainMenuCategories.categories.find((el) => el.id === currentSubMenu)
      : ""
    : "";
  const thirdMenuCategories = subMenuCategories
    ? subMenuCategories.categories
      ? subMenuCategories.categories.find((el) => el.id === currentThirdMenu)
      : ""
    : "";

  const [usedNewCheck, setUsedNewCheck] = useState("used");

  const [exchangeState, setExchangeState] = useState("notExchange");

  const [shippingFee, setShippingFee] = useState(false);

  return (
    <MainLayout categories={data.categories}>
      <div className="w-[1024px] mx-auto">
        <div className="h-[4rem] border-b border-[#f4f4fa] flex items-center text-[13px]">
          <div className="text-[#ff5058] cursor-pointer ml-[-0.5rem] mr-[2rem] after:content-[''] after:w-[1px] after:h-[14px] after:border-r after:ml-[2rem]">
            상품등록
          </div>
          <div className="cursor-pointer ml-[-0.5rem] mr-[2rem] after:content-[''] after:w-[1px] after:h-[14px] after:border-r after:ml-[2rem]">
            상품관리
          </div>
          <div className="cursor-pointer ml-[-0.5rem] mr-[2rem] ">
            구매/판매 내역
          </div>
        </div>
        <h2 className="h-[100px] text-[26px] leading-[100px] border-b-[2px] border-[#1e1d29] ">
          기본정보{" "}
          <span className="text-[#ff5058] text-[1rem] ml-[2rem]">
            *필수항목
          </span>
        </h2>
        <div>
          <div className="py-[2rem] border-b border-[#dcdbe4] flex">
            <div className="w-[10.5rem] text-lg w-[168px]">
              상품이미지 <span className="text-[#ff5058]">*</span>
              <small className="text-[#9b99a9] ml-[0.25rem] text-[80%]">
                (0/12)
              </small>
            </div>
            <div>
              <div className="w-[856px] flex flex-wrap">
                <div className="upload_image before:bg-center before:bg-no-repeat before:bg-cover before:w-[2rem] before:h-[2rem] before:bg-[url('/icons/camera.svg')] before:mb-[1rem] w-[202px] h-[202px] border-[1px] border-[#e6e5ef] bg-[#fafafd] text-[#9b99a9] flex flex-col justify-center items-center relative">
                  이미지 등록
                  <input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    multiple={true}
                    onChange={(e) => onChangePhoto(e)}
                    className="w-full h-full border-[1px] border-[#c3c2cc] absolute top-0 left-0 cursor-pointer text-[0px] opacity-0"
                  />
                </div>
                {images.map((el) => {
                  return (
                    <div className="w-[202px] h-[202px] border-[1px] border-[#e6e5ef] cursor-pointer upload_image relative">
                      <img src={el} />
                      <button className="absolute top-[0.5rem] right-[0.5rem] rounded-[50%] bg-[#1e1d29] bg-opacity-25 w-[1.5rem] h-[1.5rem] text-white">
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="mt-[1.5rem] text-[#4aa4ff] text-sm">
                <b>* 상품 이미지는 640x640에 최적화 되어 있습니다.</b>
                <br />
                - 상품 이미지는 PC에서는 1:1, 모바일에서는 1:1.23 비율로
                보여집니다.
                <br />
                - 이미지는 상품 등록 시 정사각형으로 잘려서 등록됩니다.
                <br />
                - 이미지를 클릭할 경우 원본 이미지를 확인할 수 있습니다.
                <br />
                - 이미지를 클릭 후 이동하여 등록순서를 변경할 수 있습니다.
                <br />
                - 큰 이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다.
                <br />
                최대 지원 사이즈인 640 X 640으로 리사이즈 해서 올려주세요.(개당
                이미지 최대 10M)
                <br />
              </div>
            </div>
          </div>
          <div className="py-[2rem] border-b border-[#dcdbe4] flex items-center">
            <div className="w-[10.5rem] text-lg">
              제목 <span className="text-[#ff5058]">*</span>
            </div>
            <div className="flex flex-1 items-center">
              <input
                className="h-[3rem] w-full px-[1rem] border-[1px] border-[#c3c2cc]"
                type="text"
                maxLength={40}
                placeholder="상품 제목을 입력해주세요."
              />
              <div className="ml-[1.5rem] text-[1rem]">
                <span>0</span>/40
              </div>
            </div>
          </div>
          <div className="py-[2rem] border-b border-[#dcdbe4] flex">
            <div className="w-[10.5rem] text-lg ">
              카테고리 <span className="text-[#ff5058]">*</span>
            </div>
            <div>
              <div className="border-[1px] border-[#dcdbe4] h-[19rem] flex">
                <div className="w-[284px] h-full">
                  <ul className="py-[0.5rem] w-full h-full pl-0 overflow-y-auto">
                    {data.categories.map((el) => {
                      return (
                        <li
                          key={el.id}
                          className="w-full h-[40px] leading-[40px]"
                        >
                          <button
                            onClick={() => {
                              setCurrentMainMenu(el.id);
                            }}
                            className={`${
                              el.id === currentMainMenu ? "text-[#ff5058]" : ""
                            } hover:bg-[#f4f4fa] w-full h-full px-[1.5rem] text-left`}
                          >
                            {el.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="w-[284px] h-full border-r border-[#dcdbe4] flex justify-center items-center ">
                  {mainMenuCategories ? (
                    mainMenuCategories.categories ? (
                      <ul className="py-[0.5rem] w-full h-full pl-0 overflow-y-auto">
                        {mainMenuCategories.categories.map((el) => {
                          return (
                            <li
                              key={el.id}
                              className="w-full h-[40px] leading-[40px]"
                            >
                              <button
                                onClick={() => {
                                  setCurrentSubMenu(el.id);
                                }}
                                className={`${
                                  currentSubMenu === el.id
                                    ? "text-[#ff5058]"
                                    : ""
                                } hover:bg-[#f4f4fa] w-full h-full px-[1.5rem] text-left`}
                              >
                                {el.title}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      ""
                    )
                  ) : (
                    <div className="text-[#c3c2cc] text-[16px]">
                      중분류 선택
                    </div>
                  )}
                </div>
                <div className="w-[284px] h-full flex justify-center items-center ">
                  {subMenuCategories ? (
                    subMenuCategories.categories ? (
                      <ul className="py-[0.5rem] w-full h-full pl-0 overflow-y-auto">
                        {subMenuCategories.categories.map((el) => {
                          return (
                            <li
                              key={el.id}
                              className="w-full h-[40px] leading-[40px]"
                            >
                              <button
                                onClick={() => setCurrentThirdMenu(el.id)}
                                className={`${
                                  currentThirdMenu === el.id
                                    ? "text-[#ff5058]"
                                    : ""
                                } hover:bg-[#f4f4fa] w-full h-full px-[1.5rem] text-left`}
                              >
                                {el.title}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      ""
                    )
                  ) : (
                    <div className="text-[#c3c2cc] text-[16px]">
                      소분류 선택
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="category_select">
                 상세 카테고리를 선택해주세요.
              </div> */}
              <div className="mt-[24px]">
                <h2 className="text-[#ff5058] text-base">
                  선택한 카테고리 :&nbsp;
                  <b>{mainMenuCategories ? mainMenuCategories.title : ""}</b>
                  &nbsp;
                  <b>
                    {subMenuCategories ? "> " + subMenuCategories.title : ""}
                  </b>
                  &nbsp;
                  <b>
                    {thirdMenuCategories
                      ? "> " + thirdMenuCategories.title
                      : ""}
                  </b>
                </h2>
              </div>
            </div>
          </div>
          <div className="py-[2rem] border-b border-[#dcdbe4] flex">
            <div className="w-[10.5rem] text-lg">
              거래지역 <span className="text-[#ff5058]">*</span>
            </div>
            <div className="w-[856px]">
              <div className="flex">
                <div className="hover:bg-[#f4f4fa] active:bg-[#eae9f1] cursor-pointer h-[3rem] w-[6.5rem] leading-[3rem] text-center border-[1px] border-[#c3c2cc] rounded-[2px] mr-[1rem]">
                  내 위치
                </div>
                <div className="hover:bg-[#f4f4fa] active:bg-[#eae9f1] cursor-pointer h-[3rem] w-[6.5rem] leading-[3rem] text-center border-[1px] border-[#c3c2cc] rounded-[2px] mr-[1rem]">
                  최근 지역
                </div>
                <div className="hover:bg-[#f4f4fa] active:bg-[#eae9f1] cursor-pointer h-[3rem] w-[6.5rem] leading-[3rem] text-center border-[1px] border-[#c3c2cc] rounded-[2px] mr-[1rem]">
                  주소 검색
                </div>
                <div className="hover:bg-[#f4f4fa] active:bg-[#eae9f1] cursor-pointer h-[3rem] w-[6.5rem] leading-[3rem] text-center border-[1px] border-[#c3c2cc] rounded-[2px]">
                  지역설정안함
                </div>
              </div>
              <div className="bg-[#f4f4fa] h-[3rem] w-full mt-[1rem] px-[1rem] border-[1px] border-[#c3c2cc]"></div>
            </div>
          </div>
          <div className="py-[2rem] border-b border-[#dcdbe4] flex">
            <div className="w-[10.5rem] text-lg">
              상태 <span className="text-[#ff5058]">*</span>
            </div>
            <div className="flex">
              <label
                htmlFor="중고상품"
                className={`${
                  usedNewCheck === "used" ? "checkRadio" : "noneCheckRadio"
                } mr-[32px] text-[1rem] relative flex items-center`}
              >
                <input
                  className="hidden"
                  onClick={() => setUsedNewCheck("used")}
                  id="중고상품"
                  type="radio"
                  value="0"
                  defaultChecked={usedNewCheck === "used" ? true : false}
                />
                중고상품
              </label>
              <label
                htmlFor="새상품"
                className={`${
                  usedNewCheck === "new" ? "checkRadio" : "noneCheckRadio"
                }                
                text-[1rem] relative flex items-center`}
              >
                <input
                  className="hidden"
                  onClick={() => setUsedNewCheck("new")}
                  id="새상품"
                  type="radio"
                  value="0"
                  defaultChecked={usedNewCheck === "new" ? true : false}
                />
                새상품
              </label>
            </div>
          </div>
          <div className="py-[2rem] border-b border-[#dcdbe4] flex">
            <div className="w-[10.5rem] text-lg ">
              교환 <span className="text-[#ff5058]">*</span>
            </div>
            <div className="flex">
              <label
                htmlFor="교환불가"
                className={`${
                  exchangeState === "notExchange"
                    ? "checkRadio"
                    : "noneCheckRadio"
                } mr-[32px] text-[1rem] relative flex items-center`}
              >
                <input
                  className="hidden"
                  id="교환불가"
                  type="radio"
                  value="0"
                  onClick={() => setExchangeState("notExchange")}
                  defaultChecked={
                    exchangeState === "notExchange" ? true : false
                  }
                />
                교환불가
              </label>
              <label
                htmlFor="교환가능"
                className={`${
                  exchangeState === "exchange" ? "checkRadio" : "noneCheckRadio"
                } text-[1rem] relative flex items-center`}
              >
                <input
                  className="hidden"
                  id="교환가능"
                  type="radio"
                  value="0"
                  onClick={() => setExchangeState("exchange")}
                  defaultChecked={exchangeState === "exchange" ? true : false}
                />
                교환가능
              </label>
            </div>
          </div>
          <div className="py-[2rem] border-b border-[#dcdbe4] flex">
            <div className="w-[10.5rem] text-lg pt-[14px]">
              가격 <span className="text-[#ff5058]">*</span>
            </div>
            <div>
              <div>
                <div>
                  <input
                    className="border-[1px] text-[#c3c2cc] h-[3rem] px-[1rem] mr-[1rem]"
                    type="number"
                    placeholder="숫자만 입력해주세요."
                  />
                  원
                </div>
                <label
                  className={`${
                    shippingFee ? "checkCheckBox" : "noneCheckCheckBox"
                  } mt-[1rem] bm-[1.5rem] flex items-center`}
                >
                  배송비 포함
                  <input
                    type="checkbox"
                    className="hidden"
                    onClick={() => setShippingFee(!shippingFee)}
                    defaultChecked={shippingFee}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[300px]"></div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const data = (await axios.get("/landing")).data;
  const user = req.session.user ?? null;
  return { props: { data, user } };
}, ironSessionOptions);
