
import { useBundleStore } from "../store/bundleStore";
const PlanReview = () => {
  const plan = useBundleStore((state) => state.bundle.plan);

  return (
    <div className="mt-3.75">
      <p className="text-[#A8B2BD] text-[12px] tracking-[3%]">PLAN</p>
      <div className="mt-2">
        {!plan && (
          <p className="text-[#A8B2BD] text-[12px] text-center tracking-[3%]">
            No plan selected
          </p>
        )}
        {plan && (
          <div className="flex items-center gap-0">
            <div className="size-10.25 bg-white rounded-lg flex items-center justify-center">
              <img
                src="/images/home-monitoring-service.webp"
                alt={"home-monitoring-service"}
                className="w-10 h-10 object-contain"
              />
            </div>

            <p className="flex-1 text-[16px] font-bold">
              {plan?.name.split(" ")[0]}{" "}
              <span className="text-[#4E2FD2]">
                {plan?.name.split(" ")[1]}
              </span>
            </p>

            <div className="flex flex-col items-end">
              {plan.oldPrice ? (
                <p className="text-[14px] text-[#9E9E9E] line-through">
                  ${plan?.oldPrice}/mo
                </p>
              ) : null}
              <p className="text-[14px] font-bold text-[#4E2FD2]">
                ${plan.price}/mo{" "}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanReview;
