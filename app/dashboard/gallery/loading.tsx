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

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <ShimmerLoader height="40px" className="flex-1" />
        <ShimmerLoader height="40px" width="150px" />
      </div>

      <ShimmerGrid columns={3} count={9} />
    </div>
  )
}
