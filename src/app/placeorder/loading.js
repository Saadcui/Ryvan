import { SkeletonCheckoutForm } from '@/component/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-4 sm:px-10 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 border-b border-gray-200/30 dark:border-white/10 pb-8 animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
        </div>
        <SkeletonCheckoutForm />
      </div>
    </div>
  );
}
