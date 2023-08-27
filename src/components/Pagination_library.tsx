import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Paginator } from "@seoly/paginator"; // 라이브러리 새로 설치했으니 이거 말고 그거 써야해

interface IndexProps {
  lastPage: number;
  onClickPage: (x: number) => void;
  q: string;
}

function App(props: IndexProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1"; // (어쩌면 null) || (널인 경우 값)

  const [paginator] = useState<Paginator>(
    new Paginator(parseInt(page as string), props.lastPage, {
      windowMode: "JUMPING",
    })
  );
  const [current, setCurrent] = useState(parseInt(page as string));
  const [items, setItems] = useState<Array<number>>([]);
  useEffect(() => {
    // console.log("안녕", page);
    paginator.setTotal(props.lastPage);
    paginator.setCurrent(parseInt(page));
    setCurrent(paginator.getCurrent());
    // console.log(paginator.getCurrent(), paginator.getItems());
    setItems(paginator.getItems());
  }, [paginator, props.lastPage, props.q]);

  const onClickPrevBtn = () => {
    paginator.prevPage();
    setItems(paginator.getItems());
    setCurrent(paginator.getCurrent());
  };

  const onClickNextBtn = () => {
    paginator.nextPage();
    setItems(paginator.getItems());
    setCurrent(paginator.getCurrent());
  };

  const onClickPrevWindowBtn = () => {
    paginator.prevWindwow();
    setItems(paginator.getItems());
    setCurrent(paginator.getCurrent());
    props.onClickPage(paginator.getCurrent());
  };

  const onClickNextWindowBtn = () => {
    paginator.nextWindow();
    setItems(paginator.getItems());
    setCurrent(paginator.getCurrent());
    props.onClickPage(paginator.getCurrent());
  };

  const onClickFirstBtn = () => {
    paginator.first();
    setItems(paginator.getItems());
    setCurrent(paginator.getCurrent());
  };

  const onClickLastBtn = () => {
    paginator.last();
    setItems(paginator.getItems());
    setCurrent(paginator.getCurrent());
  };

  const onClickToBtn = (page: number) => {
    paginator.setCurrent(page);
    setItems(paginator.getItems());
    setCurrent(paginator.getCurrent());
  };

  paginator.getItems().some((el) => el === parseInt(page));

  return (
    <div className="flex justify-center pb-[100px]">
      {paginator.getItems().some((el) => el === 1) ? null : (
        <button className="prev_page_btn" onClick={onClickPrevWindowBtn}>
          &lt;
        </button>
      )}
      {items.map((x) => (
        <button
          className={`${
            paginator.getItems().some((el) => el === props.lastPage)
              ? "last_pageBtn"
              : "pageBtn"
          } pageBtn`}
          style={{
            backgroundColor: current === x ? "rgb(255, 80, 88)" : "",
            color: current === x ? "white" : "",
          }}
          key={x}
          onClick={() => {
            onClickToBtn(x);
            props.onClickPage(x);
          }}
        >
          {x}
        </button>
      ))}
      {paginator.getItems().some((el) => el === props.lastPage) ? null : (
        <button className="next_page_btn" onClick={onClickNextWindowBtn}>
          &gt;
        </button>
      )}
    </div>
  );
}

export default App;
