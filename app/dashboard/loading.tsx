import { ShimmerLoader } from "@/components/shimmer-loader"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <ShimmerLoader height="40px" width="250px" />
          <div className="mt-2">
            <ShimmerLoader height="20px" width="180px" />
          </div>
        </div>
        <ShimmerLoader height="50px" width="150px" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ShimmerLoader key={i} height="150px" />
        ))}
      </div>

      <ShimmerLoader height="200px" />
      <ShimmerLoader height="150px" />
    </div>
  )
}
