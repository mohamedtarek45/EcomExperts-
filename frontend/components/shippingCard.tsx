
const ShippingCard = () => {
  return (
    <div className="mt-2">
      <div className="flex items-center gap-3">
        <div className="size-10.25 bg-white rounded-lg flex items-center justify-center">
          <img
            src= "/shipping.svg"
            alt={"home-monitoring-service"}
            className="w-10 h-10 object-contain"
          />
        </div>

        <p className="flex-1 text-[14px] font-medium tracking-[0.5px] text-[#0B0D10]">
          Fast Shipping
        </p>

        <div className="flex flex-col items-end">
          <p className="text-[14px] text-[#9E9E9E] line-through">$5.99</p>
          <p className="text-[14px] font-bold text-[#4E2FD2]">FREE </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingCard;
