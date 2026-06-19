import ProductCard from "./productCard";
import { useSensors } from "../hooks/useSensors";
import { FiAlertCircle } from "react-icons/fi";
import { IoMdArrowDropup } from "react-icons/io";
import useSectionStore from "../store/sectionStroe";
import { useBundleStore } from "../store/bundleStore";
const SensorSection = () => {
  const sensors = useBundleStore((state) => state.bundle.sensors.products);
  const section = useSectionStore((state) => state.section);
  const setSection = useSectionStore((state) => state.setSection);
  const { data, isLoading, isPending, error } = useSensors();
  if (error) {
    return (
      <div className="bg-white rounded-[10px] p-6 flex  items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="mx-auto text-red-500 size-12 mb-2" />
          <h3 className="font-bold text-lg">Something went wrong</h3>
          <p className="text-gray-500 text-sm">Failed to load sensors.</p>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`rounded-[10px] p-3.75 relative`}
      style={{
        backgroundColor: section === 3 ? "#EDF4FF" : "white",
      }}
    >
      <p className="text-2xl font-medium text-[12px] tracking-[1.6px] text-[#484848] ">
        STEP 3 OF 4
      </p>
      <hr className="block w-full absolute left-0 border-[#1F1F1F] mt-1.25" />
      <div className="mt-5 mb-3.75">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => {
            if (section === 3) {
              setSection(0);
            } else {
              setSection(3);
            }
          }}
        >
          <div className="flex gap-2 items-center">
            <img src="/Sensor.svg" alt="camera" className="size-6.5" />
            <p className="text-[#0B0D10] text-[22px] font-bold">
              Choose your Sensors
            </p>
          </div>
          <div className="flex gap-1 items-center text-[#4E2FD2] text-[14px] ">
            <p className="font-medium  ">{sensors.length} selected</p>
            <IoMdArrowDropup
              className="size-3 duration-300 transition"
              style={{ rotate: section === 3 ? "180deg" : "0deg" }}
            />
          </div>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${section === 3 ? "max-h-250 opacity-100" : "max-h-0 opacity-0"}
            `}
      >
        {(isLoading || isPending) && (
          <div className="rounded-[10px] p-6 flex flex-col items-center justify-center gap-3">
            <div className="size-10 border-b-2 border-[#4E2FD2] rounded-full animate-spin" />
            <p className="text-[#4E2FD2] font-medium">Loading sensors...</p>
          </div>
        )}

        {data && data.length === 0 && (
          <p className="text-center text-2xl font-medium text-[#4E2FD2]">
            No sensors found
          </p>
        )}

        {data && data.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:hidden gap-3.75">
              {data?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  category="cameras"
                />
              ))}
            </div>
            <div className="hidden xl:grid grid-cols-2 gap-3.75">
              {data.map((product, index) => {
                const isLastItem = index === data.length - 1;
                const isOddLength = data.length % 2 !== 0;

                return (
                  <div
                    key={product.id}
                    className={
                      isOddLength && isLastItem
                        ? "col-span-2 flex justify-center"
                        : ""
                    }
                  >
                    {isOddLength && isLastItem ? (
                      <div className="w-1/2">
                        <ProductCard product={product} category="sensors" />
                      </div>
                    ) : (
                      <ProductCard product={product} category="sensors" />
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
        <div
          onClick={() => setSection(4)}
          className="mx-auto mt-6 px-6 py-1.75 w-fit border border-[#4E2FD2] rounded-[7px] text-[#4E2FD2] font-bold text-[18px] cursor-pointer "
        >
          Next: Choose extra protection
        </div>
      </div>
      {section !== 3 && (
        <hr className="block w-full absolute left-0 border-[#1F1F1F] mt-1.25 bottom-2" />
      )}
    </div>
  );
};

export default SensorSection;
