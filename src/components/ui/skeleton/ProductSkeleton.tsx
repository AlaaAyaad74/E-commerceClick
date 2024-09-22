const ProductSkeleton = () => (
  <div className="bg-white animate-pulse">
    <div className="pt-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <li className="text-sm w-32 h-4 bg-gray-200 rounded"></li>
        </ol>
      </nav>

      {/* Image Gallery */}
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg bg-gray-200 lg:block"></div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg bg-gray-200"></div>
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg bg-gray-200"></div>
        </div>
        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 bg-gray-200 sm:overflow-hidden sm:rounded-lg"></div>
      </div>

      {/* Product Info */}
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <div className="h-8 w-24 bg-gray-200 rounded mb-4"></div>
          <div className="mt-10 flex w-full items-center justify-center rounded-md bg-gray-300 px-8 py-3"></div>
        </div>

        {/* Description */}
        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          <div className="space-y-6">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default ProductSkeleton;
