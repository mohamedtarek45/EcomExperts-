import ReviewCard from "./ReviewCard";
import { useBundleStore } from "../store/bundleStore";

const SensorsReview = () => {
  const sensors = useBundleStore((state) => state.bundle.sensors.products);

  return (
    <div className="mt-3.75">
      <p className="text-[#A8B2BD] text-[12px] tracking-[3%]">SENSORS</p>
      <div className="mt-2 flex flex-col gap-3">
        {sensors.length === 0 && (
          <p className="text-[#A8B2BD] text-[12px] text-center tracking-[3%]">
            No sensors selected
          </p>
        )}
        {sensors.map((item) => (
          <ReviewCard
            key={item.id}
            product={item}
            quantity={item.quantity ?? 0}
            category="sensors"
          />
        ))}
      </div>
    </div>
  );
};

export default SensorsReview;
