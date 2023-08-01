import MainLayout from "@/layouts/MainLayout";
import AddressSearchModal from "@/components/AddressSearchModal";
import type { Banner, Category, Product, User } from "@/interface";
import { withIronSessionSsr } from "iron-session/next";
import { ironSessionOptions } from "@/libs/session";
import axios from "@/libs/axios";
import { useState, useEffect, useRef } from "react";
import { KeyboardEvent } from "react";

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

  const onDelectPhoto = (idx: number) => {
    setImages([
      ...images.slice(0, idx),
      ...images.slice(idx + 1, images.length),
    ]);
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

  const [tradeLocation, setTradeLocation] = useState("");

  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const getMyLatLon = () => {
    const success = (event: any) => {
      setLongitude(event.coords.longitude); // 경도
      setLatitude(event.coords.latitude); // 위도
    };
    if (window.navigator.geolocation) {
      // geolocation 지원할 경우 현재 위치 get
      window.navigator.geolocation.getCurrentPosition(success);
    }
  };

  const getMyAddress = async () => {
    try {
      let response = await axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?&x=${longitude}&y=${latitude}`,
          {
            headers: {
              Authorization: "KakaoAK 8c968b954fec27d48c45cde969ac5cfc",
            },
          }
        )
        .then((response) => {
          const region = response.data.documents.find(
            (el: any) => el.region_type === "H"
          );
          setTradeLocation(region.address_name);
          // console.log(region.address_name);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyAddress();
  }, [longitude && latitude]);

  const [addressModal, setAddressModal] = useState(false);

  useEffect(() => {
    if (addressModal) {
      document.body.style.cssText = `overflow: hidden`;
    } else {
      document.body.style.cssText = `overflow: auto`;
    }
    return () => {
      document.body.style.cssText = `overflow: auto`;
    };
  }, [addressModal]);

  const [usedNewCheck, setUsedNewCheck] = useState("used");

  const [exchangeState, setExchangeState] = useState("notExchange");

  const [shippingFee, setShippingFee] = useState(false);

  const [money, setMoney] = useState("");

  const addComma = (price: string) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  };

  const onChangePoints = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    let str = value.replaceAll(",", "");
    setMoney(str);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [description, setDescription] = useState("");

  const onChangeDescriptionInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const [tagContainerClass, setTagContainerClass] = useState("");

  const [tagList, setTagList] = useState<string[]>([]);

  const madeTagList = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    // String.trim() : 문자열의 시작과 끝에 공백을 제거해줌.
    const newTag = (e.target as HTMLInputElement).value.trim();

    if (e.code === "Space" || e.key === "Enter") {
      if (tagList.some((el) => el === newTag)) {
        (e.target as HTMLInputElement).value = "";
      } else {
        setTagList([...tagList, newTag]);
        (e.target as HTMLInputElement).value = "";
      }
    }
  };

  const deleteTagListItem = (idx: number) => {
    setTagList([
      ...tagList.slice(0, idx),
      ...tagList.slice(idx + 1, tagList.length),
    ]);
  };

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
        <div className="mb-[48px]">
          <div className="py-[2rem] border-b border-[#dcdbe4] flex">
            <div className="w-[10.5rem] text-lg ">
              상품이미지 <span className="text-[#ff5058]">*</span>
              <small className="text-[#9b99a9] ml-[0.25rem] text-[80%]">
                ({images.length}/12)
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
                {images.map((el, i) => {
                  return (
                    <div
                      key={i}
                      className="w-[202px] h-[202px] border-[1px] border-[#e6e5ef] cursor-pointer upload_image relative overflow-hidden"
                    >
                      <img src={el} className="w-full h-full object-cover" />
                      <button
                        onClick={() => onDelectPhoto(i)}
                        className="bg-[url('/icons/upload_image_x.svg')] bg-center bg-no-repeat bg-[length:12px_12px] absolute top-[0.5rem] right-[0.5rem] rounded-[50%] bg-[#1e1d29] bg-opacity-25 w-[1.5rem] h-[1.5rem] text-white"
                      ></button>
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
                className="h-[3rem] w-full px-[1rem] border-[1px] border-[#c3c2cc] focus-visible:outline-0 hover:border-[#1e1d29] focus:border-[#1e1d29]"
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
              {/* <div className="warning_orange">
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
                <div
                  onClick={getMyLatLon}
                  className="hover:bg-[#f4f4fa] active:bg-[#eae9f1] cursor-pointer h-[3rem] w-[6.5rem] leading-[3rem] text-center border-[1px] border-[#c3c2cc] rounded-[2px] mr-[1rem]"
                >
                  내 위치
                </div>
                <div className="hover:bg-[#f4f4fa] active:bg-[#eae9f1] cursor-pointer h-[3rem] w-[6.5rem] leading-[3rem] text-center border-[1px] border-[#c3c2cc] rounded-[2px] mr-[1rem]">
                  최근 지역
                </div>
                <div
                  onClick={() => setAddressModal(true)}
                  className="hover:bg-[#f4f4fa] active:bg-[#eae9f1] cursor-pointer h-[3rem] w-[6.5rem] leading-[3rem] text-center border-[1px] border-[#c3c2cc] rounded-[2px] mr-[1rem]"
                >
                  주소 검색
                </div>
                <div
                  onClick={() => setTradeLocation("지역설정안함")}
                  className="hover:bg-[#f4f4fa] active:bg-[#eae9f1] cursor-pointer h-[3rem] w-[6.5rem] leading-[3rem] text-center border-[1px] border-[#c3c2cc] rounded-[2px]"
                >
                  지역설정안함
                </div>
              </div>
              <div className="bg-[#f4f4fa] h-[3rem] leading-[3rem] text-[100%] w-full mt-[1rem] px-[1rem] border-[1px] border-[#c3c2cc]">
                {tradeLocation}
              </div>
            </div>
          </div>
          <AddressSearchModal
            addressModal={addressModal}
            setAddressModal={setAddressModal}
            setTradeLocation={setTradeLocation}
          />
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
                    className="border-[1px] border-[#c3c2cc] h-[3rem] px-[1rem] mr-[1rem] focus-visible:outline-0 hover:border-[#1e1d29] focus:border-[#1e1d29]"
                    type="text"
                    placeholder="숫자만 입력해주세요."
                    onChange={(e) => onChangePoints(e)}
                    value={addComma(money) || ""}
                  />
                  원
                </div>
                <label
                  className={`${
                    shippingFee ? "checkCheckBox" : "noneCheckCheckBox"
                  } mt-[1rem] bm-[1.5rem] flex items-center `}
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
          <div className="py-[2rem] border-b border-[#dcdbe4] flex">
            <div className="w-[10.5rem] text-lg pt-[14px]">
              설명 <span className="text-[#ff5058]">*</span>
            </div>
            <div className="w-[856px] relative">
              <textarea
                rows={6}
                className={`${
                  description.length > 0 && description.length < 10
                    ? "border_orange"
                    : ""
                } p-[1rem] resize-none leading-[1.35] w-full border-[1px] border-[#c3c2cc] focus-visible:outline-0 hover:border-[#1e1d29] focus:border-[#1e1d29]`}
                value={description}
                onChange={onChangeDescriptionInput}
                ref={textareaRef}
              />
              <div
                onClick={() => {
                  textareaRef.current && textareaRef.current.focus();
                }}
                className={`${
                  description.length > 0 ? "hidden" : ""
                } absolute top-0 p-[1rem] leading-[16px] text-[#9b99a9]`}
              >
                여러 장의 상품 사진과 구입 연도, 브랜드, 사용감, 하자 유무 등
                구매자에게 필요한 정보를 꼭 포함해 주세요. (10자 이상)
                <br />
                <span className="inline-block mt-[8px] text-xs">
                  안전하고 건전한 거래 환경을 위해 과학기술정보통신부,
                  한국인터넷진흥원과 번개장터(주)가 함께 합니다.
                </span>
              </div>
              <div
                className={`${
                  description.length > 0 && description.length < 10
                    ? ""
                    : "hidden"
                } warning_orange`}
              >
                상품 설명을 10글자 이상 입력해주세요
              </div>
              <div className="flex items-center justify-between mt-[0.5rem]">
                <div className="text-[1rem] text-[#9b99a9]">
                  혹시 <span className="underline">카카오톡 ID</span>를
                  적으셨나요?
                </div>
                <div>{description.length}/2000</div>
              </div>
            </div>
          </div>
          <div className="py-[2rem] border-b border-[#dcdbe4] flex">
            <div className="w-[10.5rem] text-lg pt-[14px]">연관태그</div>
            <div className="w-[856px]">
              <div
                className={`${tagContainerClass} hover:border-[#1e1d29] w-full h-[3rem] border-[1px]  flex justify-between items-center`}
              >
                <div className="w-fit h-full flex items-center justify-between">
                  {tagList.map((el, i) => {
                    return (
                      <div
                        key={i}
                        className="flex justify-between items-center rounded-[1rem] bg-[#f4f4fa] h-[2rem] w-max px-[0.5rem] ml-[0.5rem] "
                      >
                        <div className="flex-shrink-0 text-[100%]">
                          #<span>{el}</span>
                        </div>
                        <div
                          onClick={() => deleteTagListItem(i)}
                          className="bg-center bg-no-repeat bg-cover bg-[url('/icons/tag_x.svg')] w-[20px] h-[20px] ml-[0.5rem] cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
                <input
                  onFocus={() => setTagContainerClass("border-[#1e1d29]")}
                  onBlur={() => setTagContainerClass("border-[#c3c2cc]")}
                  onKeyDown={(e) => madeTagList(e)}
                  placeholder="연관태그를 입력해주세요. (최대 5개)"
                  className={`${
                    tagList.length >= 5 ? "hidden" : ""
                  } w-full h-full px-[1rem] border-[0px] focus-visible:outline-0`}
                />
              </div>
              <div className="pt-[0.5rem]">
                <div className="before:content-['-'] before:inline-block before:w-[1rem] before:h-[1rem] text-[#888888] mb-[0.25rem]">
                  태그는 띄어쓰기로 구분되며 최대 9자까지 입력할 수 있습니다.
                </div>
                <div className="before:content-['-'] before:inline-block before:w-[1rem] before:h-[1rem] text-[#888888] mb-[0.25rem]">
                  태그는 검색의 부가정보로 사용 되지만, 검색 결과 노출을
                  보장하지는 않습니다.
                </div>
                <div className="before:content-['-'] before:inline-block before:w-[1rem] before:h-[1rem] text-[#888888] mb-[0.25rem]">
                  검색 광고는 태그정보를 기준으로 노출됩니다.
                </div>
                <div className="before:content-['-'] before:inline-block before:w-[1rem] before:h-[1rem] text-[#888888] mb-[0.25rem]">
                  상품과 직접 관련이 없는 다른 상품명, 브랜드, 스팸성 키워드
                  등을 입력하면 노출이 중단되거나 상품이 삭제될 수 있습니다.
                </div>
              </div>
            </div>
          </div>
          <div className="py-[2rem] flex items-center">
            <div className="w-[10.5rem] text-lg">수량</div>
            <div>
              <div className="flex justify-start items-center">
                <input
                  type="number"
                  placeholder="숫자만 입력해주세요"
                  className="border-[1px] border-[#c3c2cc] h-[3rem] px-[1rem] w-[24ppx] mr-[1rem]"
                />
                원
              </div>
            </div>
          </div>
        </div>
        <h2 className="h-[100px] text-[26px] leading-[100px] border-b-[2px] border-[#1e1d29] ">
          빠른 판매{" "}
          <span className="text-[1rem] ml-[16px] text-[#1e1d29] text-base">
            내 상품에 안전결제 배지가 표시돼요{" "}
            <span className="underline">자세히</span>
          </span>
        </h2>
        <div className="py-[2rem] flex items-center">
          <div className="w-[10.5rem] text-lg">옵션</div>
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
