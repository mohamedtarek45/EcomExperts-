
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import type { Product, Category } from "../types/types";
import { useBundleStore } from "../store/bundleStore";

const ProductCard = ({
  product,
  category,
}: {
  product: Product;
  category: Category;
}) => {
  const [variants_id, setVariantsId] = useState(product.variants?.[0]?.id);

  const increase = useBundleStore((state) => state.increase);
  const decrease = useBundleStore((state) => state.decrease);
  const addProduct = useBundleStore((state) => state.addProduct);

  const storedProduct = useBundleStore((state) =>
    state.bundle[category].products.find((p) => p.id === product.id),
  );

  const qty = product.variants
    ? (storedProduct?.variants?.find((v) => v.id === variants_id)?.quantity ?? 0)
    : (storedProduct?.quantity ?? 0);

  const isSelected = qty > 0;
  const exceedsMaxQuantity = product.MAX_QUANTITY && qty >= product.MAX_QUANTITY;

  const handleIncrease = () => {
    if (exceedsMaxQuantity) return;

    if (qty === 0) {
      if (product.variants && variants_id) {
        const selectedVariant = product.variants.find((v) => v.id === variants_id);

        addProduct(category, {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          oldPrice: product.oldPrice,
          MaxQuantity: product.MAX_QUANTITY,
          variant: selectedVariant
            ? { id: selectedVariant.id, label: selectedVariant.label, image: selectedVariant.image }
            : undefined,
        });
      } else {
        addProduct(category, {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          MaxQuantity: product.MAX_QUANTITY,
          oldPrice: product.oldPrice,
        });
      }
    } else {
      if (product.variants) {
        increase(category, product.id, variants_id);
      } else {
        increase(category, product.id);
      }
    }
  };

  const handleDecrease = () => {
    if (product.variants) {
      decrease(category, product.id, variants_id);
    } else {
      decrease(category, product.id);
    }
  };

  return (
    <div
      className={`bg-white rounded-[10px] p-2.75 h-full flex items-center border-2 relative ${
        isSelected ? "border-[#7F77DD]" : "border-[#E5E5E5]/0"
      }`}
    >
      {product.badge && (
        <span className="absolute top-2 left-2 bg-[#4E2FD2] text-white text-[12px] font-medium px-2 py-0.5 rounded-full">
          {product.badge}
        </span>
      )}

      <div className="flex gap-4.75 mb-3 flex-col xl:flex-row items-center">
        <div className="min-w-25">
          <img src={product.image} alt={product.name} className="w-25 h-full object-contain mt-4" />
        </div>

        <div className="flex-1 tracking-[0.6px]">
          <p className="font-bold text-[14px] xl:text-[16px] text-[#1F1F1F]">{product.name}</p>

          <p className="text-[10px] xl:text-[12px] text-[#1F1F1F]/75 font-medium mb-2">
            {product.description}
            <span className="text-[#0000EE] font-medium cursor-pointer underline"> Learn More</span>
          </p>

          {product.variants && (
            <div className="flex gap-2 mt-2.5 flex-wrap">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setVariantsId(variant.id)}
                  className={`cursor-pointer flex items-center px-0.75 py-px rounded-xs text-[10px] border ${
                    variants_id === variant.id
                      ? "border-[#0AA288] bg-[#1DF0BB]/4"
                      : "border-[#CCCCCC] bg-white"
                  }`}
                >
                  <img src={variant.image} alt={variant.label} className="size-7" />
                  <p className="text-[10px] text-[#1F1F1F] font-medium">{variant.label}</p>
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-2.5 pl-1.75">
            <div className="flex gap-2.5 items-center">
              <button
                className="size-5 bg-[#F0F4F7] flex justify-center items-center rounded-sm cursor-pointer"
                onClick={handleDecrease}
                disabled={qty === 0}
              >
                <FaMinus color="#525963" size={8} />
              </button>

              <span className="text-[14px] font-medium w-4 text-center">{qty}</span>

              <button
                className="size-5 bg-[#F0F4F7] flex justify-center items-center rounded-sm cursor-pointer disabled:opacity-50"
                onClick={handleIncrease}
                disabled={!!exceedsMaxQuantity}
              >
                <FaPlus color="#525963" size={8} />
              </button>
            </div>

            <div className="flex justify-end flex-col">
              {product.oldPrice && (
                <p className="text-[#D8392B] relative -mb-1">
                  ${product.oldPrice}
                  <span className="absolute left-0 right-0 top-[55%] h-[0.8px] bg-[#D8392B]" />
                </p>
              )}
              <p className="text-[#575757] -mt-1">${product.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;