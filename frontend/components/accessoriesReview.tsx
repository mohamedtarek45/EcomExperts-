import ReviewCard from "./ReviewCard";
import { useBundleStore } from "../store/bundleStore";

const AccessoriesReview = () => {
  const accessories = useBundleStore(
    (state) => state.bundle.accessories.products,
  );

  return (
    <div className="mt-3.75">
      <p className="text-[#A8B2BD] text-[12px] tracking-[3%]">ACCESSORIES</p>
      <div className="mt-2 flex flex-col gap-3">
        {accessories.length === 0 && (
          <p className="text-[#A8B2BD] text-[12px] text-center">
            No Cameras selected
          </p>
        )}
        {accessories.map((item) => (
          <ReviewCard
              key={item.id}
              product={item}
              quantity={item.quantity ?? 0}
              category="accessories"
            />
        ))}
      </div>
    </div>
  );
};

export default AccessoriesReview;
