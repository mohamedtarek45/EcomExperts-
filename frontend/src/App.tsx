import StepSection from "../components/stepsSection";
import ReviewSection from "../components/reviewSection";
import { useBundleStore } from "../store/bundleStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
function App() {
  const queryClient = new QueryClient();
  const loadSate = useBundleStore((state) => state.loadState);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const func = () => {
      setIsLoading(true);
      const state = localStorage.getItem("bundle");
      if (state) {
        loadSate(JSON.parse(state));
      }
      setIsLoading(false);
    };
    func();
  }, [loadSate]);
  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="size-10 border-b-2 border-[#4E2FD2] rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <p className="text-center text-[31px] font-bold text-black mt-7.75 md:hidden tracking-[0.06px] ">
        Let’s get started!
      </p>
      <div className="container grid grid-cols-1 xl:grid-cols-[1fr_399px] gap-7.25 my-5 md:my-10 font-nunito">
        <StepSection />
        <ReviewSection />
      </div>
    </QueryClientProvider>
  );
}

export default App;
