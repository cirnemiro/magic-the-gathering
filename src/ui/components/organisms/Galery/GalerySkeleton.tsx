"use client";
import { useSearchParams } from "next/navigation";

interface GalerySkeletonProps {
  gridCols?: string;
}

export default function GalerySkeleton({
  gridCols = "4",
}: GalerySkeletonProps) {
  const searchParams = useSearchParams();

  return (
    <div className={`w-full grid grid-cols-${gridCols} gap-4`}>
      {[...Array(parseInt(searchParams.get("pageSize") || "20"))].map(
        (_, index) => (
          <div
            key={index}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white animate-pulse opacity-1"
          >
            <div className="h-[260px] bg-gray-300 rounded-md"></div>
          </div>
        )
      )}
    </div>
  );
}
