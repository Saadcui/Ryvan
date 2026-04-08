import { SkeletonProductGrid } from '@/component/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white font-sans">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar Skeleton */}
        <aside className="w-full lg:w-72 p-6 lg:p-10 lg:h-screen lg:sticky lg:top-0 bg-white/5 dark:bg-black/5 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border border-gray-200/30 dark:border-white/10">
          <div className="space-y-10 animate-pulse">
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
            </div>
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12">
          <div className="mb-10 space-y-3 animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
          </div>
          <SkeletonProductGrid count={12} />
        </main>
      </div>
    </div>
  );
}
