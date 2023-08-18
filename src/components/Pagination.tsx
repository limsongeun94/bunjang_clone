import { useEffect, useState } from "react";

interface IndexProps {
  page: string;
  lastPage: number;
  setPage: (value: number) => void;
}

export default (props: IndexProps) => {
  let [active, setActive] = useState(parseInt(props.page));

  let [num, setNum] = useState({
    first_num: 1,
    last_num: 5,
  });

  let currentPageArr = Array(num.last_num - num.first_num + 1)
    .fill()
    .map((el, i) => {
      return num.first_num + i;
    });

  useEffect(() => {
    props.lastPage < 5
      ? setNum({ ...num, last_num: props.lastPage })
      : setNum({ ...num, last_num: 5 });
  }, [props.lastPage]);

  useEffect(() => {
    setActive(parseInt(props.page));
  }, [props.page]);

  const onClickPrev = () => {
    if (num.first_num == 1) {
      return;
    } else {
      if (num.last_num % 5 == 0) {
        setNum({
          first_num: num.first_num - 5,
          last_num: num.last_num - 5,
        });
        setActive(num.first_num - 5);
        props.setPage(num.first_num - 5);
      } else {
        for (let x = 1; x <= 4; x++) {
          if (num.last_num % 5 == x) {
            setNum({
              first_num: num.first_num - 5,
              last_num: num.last_num - x,
            });
            setActive(num.first_num - 5);
            props.setPage(num.first_num - 5);
          }
        }
      }
    }
  };

  const onClickNext = () => {
    if (num.last_num == props.lastPage) {
    } else {
      setNum({
        first_num: num.first_num + 5,
        last_num:
          props.lastPage < num.last_num + 5 ? props.lastPage : num.last_num + 5,
        // props.lastPage가 num + 5 보다 작으면 props.lastPage로 되게.
      });
      setActive(num.first_num + 5);
      props.setPage(num.first_num + 5);
    }
  };

  return (
    <div className="flex justify-center pb-[100px]">
      {num.first_num == 1 ? null : (
        <button className="prev_page_btn" onClick={onClickPrev}>
          &lt;
        </button>
      )}
      {num.last_num == props.lastPage
        ? currentPageArr.map((el, i) => {
            return (
              <button className="pageBtn" style={{ marginRight: "0px" }}>
                {el}
              </button>
            );
          })
        : currentPageArr.map((el, i) => {
            return <button className="pageBtn">{el}</button>;
          })}
      {num.last_num == props.lastPage ? null : (
        <button className="next_page_btn" onClick={onClickNext}>
          &gt;
        </button>
      )}
    </div>
  );
};
