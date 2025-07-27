import { ShimmerLoader, ShimmerGrid } from "@/components/shimmer-loader"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <ShimmerLoader height="40px" width="250px" />
        <div className="mt-2">
          <ShimmerLoader height="20px" width="300px" />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <ShimmerLoader height="40px" className="flex-1" />
        <ShimmerLoader height="40px" width="150px" />
      </div>

      <div className="flex w-full overflow-auto">
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <ShimmerLoader key={i} height="40px" width="120px" />
          ))}
        </div>
      </div>

      <ShimmerGrid columns={3} count={6} />
    </div>
  )
}
