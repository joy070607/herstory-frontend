import Image from "next/image";
import type { Product } from "@/types/api.types";
import { formatKRW } from "@/utils/format";

export function ProductRow({ product }: { product: Product }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-neutral-100">
        <Image
          src={product.thumbnailUrl}
          alt={product.name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <span className="text-sm font-medium">{product.name}</span>
        <span className="text-xs text-neutral-500">{formatKRW(product.priceKrw)}</span>
      </div>
    </div>
  );
}
