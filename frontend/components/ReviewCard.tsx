
import { FaMinus, FaPlus } from "react-icons/fa";
import { useBundleStore } from "../store/bundleStore";
import type { Category, ReviewCardProduct } from "../types/types";

interface ReviewCardProps {
  product: ReviewCardProduct;
  quantity: number;
  category: Category;
}

const ReviewCard = ({ product, quantity, category }: ReviewCardProps) => {
  const increase = useBundleStore((state) => state.increase);
  const decrease = useBundleStore((state) => state.decrease);

  const exceedsMaxQuantity =
    product.MaxQuantity && quantity >= product.MaxQuantity;

  const handleIncrease = () => {
    if (exceedsMaxQuantity) return;
    if (product.variant) {
      increase(category, product.id, product.variant.id);
    } else {
      increase(category, product.id);
    }
  };

  const handleDecrease = () => {
    if (product.variant) {
      decrease(category, product.id, product.variant.id);
    } else {
      decrease(category, product.id);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="size-10.25 bg-white rounded-lg flex items-center justify-center">
        <img
          src={product.variant ? product.variant.image : product.image}
          alt={product.name}
          className="w-10 h-10 object-contain"
        />
      </div>

      <p className="flex-1 text-[14px] font-medium text-[#0B0D10]">
        {product.name}
        {product.variant && ` (${product.variant.label})`}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          className="size-5 bg-white flex justify-center items-center rounded-sm cursor-pointer"
        >
          <FaMinus color="#525963" size={8} />
        </button>
        <span className="text-[14px] font-medium w-4 text-center">
          {quantity}
        </span>
        <button
          onClick={handleIncrease}
          disabled={!!exceedsMaxQuantity}
          className="disabled:opacity-50 size-5 bg-white flex justify-center items-center rounded-sm cursor-pointer"
        >
          <FaPlus color="#525963" size={8} />
        </button>
      </div>

      <div className="flex flex-col items-end">
        {product.oldPrice && (
          <p className="text-[12px] text-[#9E9E9E] line-through">
            ${quantity * product.oldPrice}
          </p>
        )}

        <p className="text-[14px] font-bold text-[#4E2FD2]">
          {product.price ? 
             `${quantity * product.price}`
            : "Free"}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
