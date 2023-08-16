import { useEffect, useState } from "react";

type IndexProps = {
  totalPageCnt: number;
};

export default (props: IndexProps) => {
  // 1부터 10까지의 배열
  const tenPageArr: number[] = new Array(10).fill().map((el, i) => {
    return i + 1;
  });
  // 총 페이지수 까지의 숫자로 이루어진 배열
  const totalPageArr: number[] = new Array(props.totalPageCnt)
    .fill()
    .map((el, i) => {
      return i + 1;
    });

  // 현재 페이지에 표시되는 페이지 버튼 숫자의 배열
  const [currentPageBtn, setCurrentPageBtn] = useState<number[]>(
    props.totalPageCnt > 10 ? tenPageArr : totalPageArr
    // () => {
    //   if (props.totalPageCnt > 10) {
    //     return tenPageArr;
    //   } else {
    //     return totalPageArr;
    //   }
    // }
  );

  console.log("안녕", currentPageBtn);

  return (
    <div id="pagenation" className="pb-[100px]">
      <div className="flex justify-center">
        {/* {props.totalPageCnt > 10
          ? tenPageArr.map((el, i) => {
              return <button key={i}>{el}</button>;
            })
          : totalPageArr.map((el, i) => {
              return (
                <button key={i} className="pageBtn">
                  {el}
                </button>
              );
            })} */}
        {currentPageBtn.map((el, i) => {
          return (
            <button key={i} className="pageBtn">
              {el}
            </button>
          );
        })}
      </div>
    </div>
  );
};
