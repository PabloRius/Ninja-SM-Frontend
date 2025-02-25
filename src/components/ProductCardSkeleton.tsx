export default function ProductCardSkeleton() {
  return (
    <div className="p-4 shadow-lg rounded-xl bg-white hover:shadow-xl transition flex flex-col h-full">
      <div className="flex items-center justify-center h-48 mb-4 bg-gray-200 rounded-md animate-pulse"></div>

      <div className="flex-1">
        <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 h-10 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}
