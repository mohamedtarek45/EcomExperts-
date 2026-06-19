import CameraSection from "./cameraSection";
import PlanSection from "./planSection";
import SensorSection from "./sensorSectoin";
import ExtraProtectionSection from './extraProtectionSection';
const stepsSection = () => {
  return (
    <div>
      <CameraSection />
      <PlanSection />
      <SensorSection />
      <ExtraProtectionSection />
    </div>
  );
};

export default stepsSection;
