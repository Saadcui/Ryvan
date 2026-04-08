import { SkeletonProductDetail } from '@/component/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-4 sm:px-10 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-4"></div>
        </div>
        <SkeletonProductDetail />
      </div>
    </div>
  );
}
