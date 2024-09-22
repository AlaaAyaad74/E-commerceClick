const SkeletonCard = () => {
  return (
    <div className="group relative animate-pulse w-3/4 m-auto">
      {/* Skeleton Image */}
      <div className="aspect-h-1 aspect-w-1  overflow-hidden rounded-md bg-gray-300 lg:aspect-none h-40 sm:h-80"></div>

      {/* Skeleton Text */}
      <div className="mt-4 flex justify-between">
        <div className="w-[95%]">
          {/* Skeleton Title */}
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
        {/* Skeleton Price */}
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>

      {/* Skeleton Button */}
      <div className="mt-1 w-full h-8 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
