import CameraReview from "./cameraReview";
import SensorReview from "./sensorsReview";
import Accessories from "./accessoriesReview";
import Plan from "./planReview";
import ShippingCard from "./shippingCard";
import CheckoutCard from "./checkoutCard";
import { useBundleStore } from "../store/bundleStore";
import toast from "react-hot-toast";
const ReviewSection = () => {
  const bundle = useBundleStore((state) => state.bundle);
  const handleSave = () => {
    if (bundle) {
      localStorage.setItem("bundle", JSON.stringify(bundle));
      toast.success("Saved successfully");
    } else {
      toast.error("Please add products to your bundle");
    }
  };
  return (
    <div className="bg-[#EDF4FF] rounded-[10px] p-3.75 relative h-fit">
      <p className="text-2xl font-medium text-[12px] tracking-[1.6px] text-[#484848]  ">
        REVIEW
      </p>
      <div className="px-1.25 py-5">
        <p className="text-[22px] font-semibold tracking-[0.6px]">
          Your security system
        </p>
        <p className="text-[14px] font-medium text-[#1F1F1F]/70 ">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
        <hr className="border-[#CED6DE] mt-2.5" />
        <CameraReview />
        <hr className="border-[#CED6DE] mt-2.5" />
        <SensorReview />
        <hr className="border-[#CED6DE] mt-2.5" />
        <Accessories />
        <hr className="border-[#CED6DE] mt-2.5" />
        <Plan />
        <hr className="border-[#CED6DE] mt-2.5" />
        <ShippingCard />
        <CheckoutCard />
        <p
          className="text-[#484848] text-[14px] text-center italic cursor-pointer"
          onClick={handleSave}
        >
          Save my system for later
        </p>
      </div>
    </div>
  );
};

export default ReviewSection;
