import SectionHeader from "../components/SectionHeader";
import StepCards from "../components/StepCards";

const TheProcess = () => {
  return (
    <section id="how-it-works" className=" py-24 px-5 w-full  bg-[#FFF9F0]">
      <div className="w-full container mx-auto">
        <SectionHeader
          eyebrow="AVAILABLE NOW"
          titlePart1={<span>Four steps</span>}
          titlePart2={<span>to getting paid.</span>}
          description="Register, submit your car in minutes, we handle the rest — inspection, offer, collection, payment."
        />
        <StepCards/>
      </div>
    </section>
  );
};

export default TheProcess;
