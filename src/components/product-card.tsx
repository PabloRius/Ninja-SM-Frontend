import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/schemas";
import Image from "next/image";
import Link from "next/link";
import { Tesco } from "./icons/tesco";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="relative h-full overflow-hidden hover:shadow-md transition-shadow pb-0">
        <div className="min-w-36 w-36 aspect-square self-center">
          <Image
            src={product.img}
            alt={product.name}
            width={144}
            height={144}
            className="object-cover"
          />
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-white text-black hover:bg-white w-fit">
              {/* {product.supermarket} */}
              <Tesco />
            </Badge>
          </div>
        </div>
        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <h3 className="font-medium line-clamp-2 mb-1">{product.name}</h3>
          <div className="flex justify-between items-end mt-2">
            <div>
              <p className="text-lg font-bold">£{product.price.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">
                £{product.relativePrice} per{" "}
                {product.units.split("per_")[1] || product.units}
              </p>
            </div>
            {/* {product.discount && (
              <Badge variant="destructive" className="ml-2">
                Save {product.discount}
              </Badge>
            )} */}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
