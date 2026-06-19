import { useBundleStore } from "../store/bundleStore";
import ReviewCard from "./ReviewCard";

const CameraReview = () => {

  const cameras = useBundleStore((state) => state.bundle.cameras.products);

  return (
    <div className="mt-3.75">
      <p className="text-[#A8B2BD] text-[12px] tracking-[3%]">CAMERAS</p>

      <div className="mt-2 flex flex-col gap-3">
        {cameras.length === 0 && (
          <p className="text-[#A8B2BD] text-[12px] text-center">
            No Cameras selected
          </p>
        )}

        {cameras.map((item) =>
          item.variants && item.variants.length > 0 ? (
            item.variants.map((variant) => (
              <ReviewCard
                key={`${item.id}-${variant.id}`}
                product={{
                  id: item.id,
                  name: item.name,
                  image: item.image,
                  price: item.price,
                  oldPrice: item.oldPrice ,
                  variant: {
                    id: variant.id,
                    label: variant.label,
                    image: variant.image,
                  },
                }}
                quantity={variant.quantity}
                category="cameras"
              />
            ))
          ) : (
            <ReviewCard
              key={item.id}
              product={item}
              quantity={item.quantity ?? 0}
              category="cameras"
            />
          ),
        )}
      </div>
    </div>
  );
};

export default CameraReview;
