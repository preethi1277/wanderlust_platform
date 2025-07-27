import { ShimmerLoader } from "@/components/shimmer-loader"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <ShimmerLoader height="40px" width="250px" />
          <div className="mt-2">
            <ShimmerLoader height="20px" width="300px" />
          </div>
        </div>
        <div className="flex gap-2">
          <ShimmerLoader height="40px" width="100px" />
          <ShimmerLoader height="40px" width="100px" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <ShimmerLoader height="600px" />
        <div className="space-y-6">
          <ShimmerLoader height="250px" />
          <ShimmerLoader height="250px" />
        </div>
      </div>
    </div>
  )
}
