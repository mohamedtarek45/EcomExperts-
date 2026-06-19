import type { BaseProduct } from "../types/types";
import { useBundleStore } from "../store/bundleStore";

const PlanCard = ({ product }: { product: BaseProduct }) => {
  const setPlan = useBundleStore((state) => state.setPlan);
  const selectedPlan = useBundleStore((state) => state.bundle.plan);

  const isSelected = selectedPlan?.id === product.id;

  const handleSelect = () => {
    setPlan({ id: product.id, name: product.name , oldPrice: product.oldPrice, price: product.price });
  };

  return (
    <div
      className={`bg-white rounded-[10px] border p-4 h-full flex flex-col justify-between relative ${
        isSelected
          ? "border-2 border-[#7F77DD]"
          : "border-[#E5E5E5]"
      }`}
    >
      {/* Badge */}
      {product.badge && (
        <span className="self-start mb-3 bg-[#4E2FD2] text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
          {product.badge}
        </span>
      )}

      <div className="flex-1">
        <p className="font-bold text-[16px] text-[#1F1F1F] mb-1">
          {product.name}
        </p>
        <p className="text-[12px] text-[#1F1F1F]/70 font-medium leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="mt-4 flex xl:items-center justify-between  flex-col xl:flex-row">
        <div>
          {product.oldPrice && (
            <p className="text-[#D8392B] text-[13px] relative w-fit">
              ${product.oldPrice}
              <span className="absolute left-0 right-0 top-[55%] h-[0.8px] bg-[#D8392B]" />
            </p>
          )}
          <p className="text-[#1F1F1F] font-bold text-[18px]">
            {product.price === 0 ? "Free" : `$${product.price}/mo`}
          </p>
        </div>

        <button
          onClick={handleSelect}
          className={`px-4 py-1.5 rounded-[7px] border text-[13px] font-medium transition-colors duration-200 cursor-pointer ${
            isSelected
              ? "bg-[#4E2FD2] text-white border-[#4E2FD2]"
              : "border-[#4E2FD2] text-[#4E2FD2] hover:bg-[#4E2FD2] hover:text-white"
          }`}
        >
          {isSelected ? "Selected" : "Select"}
        </button>
      </div>
    </div>
  );
};

export default PlanCard;