import { Link } from "react-router-dom";
import { Star, ImageIcon } from "lucide-react";
import { brl } from "@/lib/loja/pricing";
import { productImage, type ProductListItem } from "@/lib/loja/queries";

const ProductCard = ({ product }: { product: ProductListItem }) => {
  const image = productImage(product);
  const tiers = [...(product.quantity_pricing || [])].sort((a, b) => a.min_qty - b.min_qty);
  const bestTier = tiers[tiers.length - 1];

  return (
    <Link
      to={`/loja/produto/${product.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors"
    >
      <div className="relative aspect-square bg-secondary flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={product.product_images?.[0]?.alt || product.name}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <ImageIcon className="h-10 w-10 text-muted-foreground" />
        )}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.is_new && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">NOVO</span>
          )}
          {product.on_sale && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-destructive text-destructive-foreground">
              OFERTA
            </span>
          )}
          {product.customizable && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary text-foreground border border-border">
              PERSONALIZÁVEL
            </span>
          )}
        </div>
      </div>

      <div className="p-3 flex flex-col gap-1 flex-1">
        <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        {product.reviews_count > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-primary text-primary" />
            {Number(product.rating).toFixed(1)} ({product.reviews_count})
          </div>
        )}
        <div className="mt-auto pt-2">
          {product.compare_at_price && Number(product.compare_at_price) > Number(product.price) && (
            <div className="text-xs text-muted-foreground line-through">{brl(Number(product.compare_at_price))}</div>
          )}
          <div className="text-lg font-heading font-bold text-primary">{brl(Number(product.price))}</div>
          {bestTier && (
            <div className="text-[11px] text-muted-foreground">
              a partir de {brl(Number(bestTier.unit_price))} acima de {bestTier.min_qty} un.
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
