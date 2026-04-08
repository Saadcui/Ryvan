/**
 * Reusable Skeleton Loader Component
 * Displays animated placeholder while content is loading
 */
export function SkeletonProductCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded"></div>
      </div>
    </div>
  );
}

export function SkeletonProductGrid({ count = 12 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonProductDetail() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
      
      {/* Details Skeleton */}
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
        </div>
        
        {/* Price */}
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
        
        {/* Sizes */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
        
        {/* Buttons */}
        <div className="space-y-2">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
        </div>
        
        {/* Description */}
        <div className="space-y-2 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonCheckoutForm() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Form Fields */}
        <div className="space-y-12">
          {/* Section 1 */}
          <div className="space-y-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
            </div>
          </div>
          
          {/* Section 2 */}
          <div className="space-y-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 dark:bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - Summary */}
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
            ))}
          </div>
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded mt-8"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonCart() {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
          <div className="h-24 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonOrdersList() {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg space-y-3">
          <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
}
