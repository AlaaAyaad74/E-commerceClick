import { Triangle } from "react-loader-spinner";

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="text-center">
        <Triangle
          visible={true}
          height="80"
          width="80"
          // color="#191919"
          color="#fff"
          ariaLabel="triangle-loading"
        />
        <h1 className="mt-4 text-xl font-semibold text-white">Loading...</h1>
      </div>
    </div>
  );
}

export default Loading;
