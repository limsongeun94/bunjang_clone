import Carousel from "@/components/Carousel";
import axios from "@/libs/axios";

export default ({ data }: any) => {
  console.log(data);
  axios
    .get("/product", { params: { page: 2, size: 100 } })
    .then((res) => console.log(res.data));

  return (
    <div className="w-[1024px] mx-auto">
      {/* <div className="w-full h-[30px] bg-black" /> */}
      <Carousel />
    </div>
  );
};

export const getServerSideProps = async () => {
  const init = (await axios.get("/landing")).data;
  return { props: { data: { init } } };
};
