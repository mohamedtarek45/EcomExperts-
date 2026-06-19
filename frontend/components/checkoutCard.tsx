import { useBundleStore } from "../store/bundleStore";
import type { ProductItem } from "../types/types";
import toast from "react-hot-toast";

const sumPrice = (products: ProductItem[]) =>
  products.reduce((acc, curr) => {
    if (curr.variants) {
      curr.variants.forEach((variant) => {
        acc += curr.price * variant.quantity;
      });
    } else {
      acc += curr.price * (curr.quantity ?? 1);
    }
    return acc;
  }, 0);

const sumOldPrice = (products: ProductItem[]) =>
  products.reduce((acc, curr) => {
    if (curr.variants) {
      curr.variants.forEach((variant) => {
        acc += (curr.oldPrice ?? curr.price) * variant.quantity;
      });
    } else {
      acc += (curr.oldPrice ?? curr.price) * (curr.quantity ?? 1);
    }
    return acc;
  }, 0);

const CheckoutCard = () => {
  const bundle = useBundleStore((state) => state.bundle);
  console.log("bundle", bundle.cameras.products);
  const reset = useBundleStore((state) => state.reset);

  const cameraTotal = sumPrice(bundle.cameras.products);
  const sensorTotal = sumPrice(bundle.sensors.products);
  const accessoryTotal = sumPrice(bundle.accessories.products);
  const planTotal = bundle.plan?.price ?? 0;

  const oldCameraTotal = sumOldPrice(bundle.cameras.products);
  const oldSensorTotal = sumOldPrice(bundle.sensors.products);
  const oldAccessoryTotal = sumOldPrice(bundle.accessories.products);
  const oldPlanTotal = bundle.plan?.oldPrice ?? bundle.plan?.price ?? 0;

  const SHIPPING = 5.99;

  const total = cameraTotal + sensorTotal + accessoryTotal + planTotal;
  const oldTotal =
    oldCameraTotal + oldSensorTotal + oldAccessoryTotal + oldPlanTotal;
  const savings = oldTotal - total + SHIPPING;
  console.log("bundle", bundle);
  const handleCheckout = () => {
    const hasItems =
      bundle.plan ||
      bundle.cameras.products.length > 0 ||
      bundle.sensors.products.length > 0 ||
      bundle.accessories.products.length > 0;

    if (!hasItems) {
      toast.error("Please add products to your cart ");
      return;
    }

    reset();
    localStorage.removeItem("bundle");
    toast.success("Checkout Successful!");
  };

  return (
    <div className="mt-2.5">
      <div className="flex justify-between items-center">
        <div className="size-19.5">
          <img
            src="/Satisfaction.svg"
            alt="satisfaction"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="rounded-[3px] bg-[#4E2FD2] text-white text-[12px] tracking-[-5%] text-center py-1.25 font-medium">
            {planTotal ? "as low as " + planTotal + "/mo" : "Select a plan"}
          </div>

          <div className="flex gap-2 items-end">
            <p className="text-[18px] text-[#6F7882] font-medium line-through tracking-[-0.25%]">
              {total > 0 ? "$" + (oldTotal + SHIPPING).toFixed(2) : ""}
            </p>

            <p className="text-[24px] font-bold text-[#4E2FD2] tracking-[-0.13%]">
              ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {savings > 0 && (
        <p className="text-[#0AA288] mx-auto text-[12px] font-semibold w-fit mt-2.5">
          Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
        </p>
      )}

      <button
        type="button"
        onClick={handleCheckout}
        className="w-full cursor-pointer font-bold text-[17px] rounded-[1px] text-white flex justify-center items-center bg-[#4E2FD2] py-3.25 mt-2.5"
      >
        Checkout
      </button>
    </div>
  );
};

export default CheckoutCard;
