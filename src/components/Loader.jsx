import { CirclesWithBar } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <CirclesWithBar
        height="60"
        width="60"
        color="rgb(17 24 40)"
        outerCircleColor="rgb(17 24 40)"
        innerCircleColor="rgb(17 24 40)"
        barColor="rgb(17 24 40)"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
