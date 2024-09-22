const CartSkeleton = () => {
  return (
    <div className="flex flex-col w-11/12 mx-auto gap-5 lg:flex-row min-h-[50vh] my-4 animate-pulse">
      {/* Left Side: Cart Items */}
      <div className="lg:w-3/4 md:w-4/4 gap-4 flex flex-col">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="relative flex flex-col md:flex-row p-3 justify-between align-center bg-gray-200 rounded-md gap-3"
            >
              <div className="flex gap-4 w-3/4">
                <div className="w-[100px] h-[100px] bg-gray-300 rounded-md"></div>
                <div className="w-3/4 space-y-2">
                  <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
                  <div className="h-3 w-full bg-gray-300 rounded"></div>
                  <div className="h-3 w-full bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <div className="w-5 h-8 bg-gray-300 rounded-sm"></div>
                <div className="w-8 h-6 bg-gray-300 rounded"></div>
                <div className="w-5 h-8 bg-gray-300 rounded-sm"></div>
              </div>
              <div className="absolute right-3 top-3 w-6 h-6 bg-gray-300 rounded-sm"></div>
            </div>
          ))}
      </div>

      {/* Right Side: Order Summary */}
      <div className="lg:w-1/4 space-y-4">
        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="h-4 w-full bg-gray-300 rounded"></div>
          ))}
        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
        <div className="h-8 w-full bg-gray-300 rounded mt-5"></div>
      </div>
    </div>
  );
};

export default CartSkeleton;
