import SectionHeader from "../components/SectionHeader";
import TrustPoints from "../components/TrustPoints";

const AboutRevela = () => {
  return (
    <section id="about" className="w-full py-24 px-5 bg-[#F5F2EC]">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 w-full container mx-auto items-center justify-between ">
        <div>
          <SectionHeader
            eyebrow="AVAILABLE NOW"
            titlePart1={
              <span>
                Building <br /> Nigeria's <br /> formal <br /> infrastructure
              </span>
            }
            titlePart2={
              <span>
                {" "}
                <span className="text-(--ink)">for</span> end-of-life vehicles.
              </span>
            }
            description="Revela is a Nigerian technology company creating a structured, transparent, and legally compliant ecosystem for the end-of-life vehicle market."
          />

          <div className="w-full font-cabinet text-(--ink) bg-[#FFFFFFBF] border-[#FFFFFFBF] px-7 pt-7 pb-8 rounded-[14px] ">
            <span className="  text-[12px] font-normal uppercase tracking-[1px]">
              Corporate backing
            </span>
            <p className="text-[14px]">
              A subsidiary of Brix & Towers Nigeria Ltd • Backed by BTG Infraco
              Ltd
            </p>
          </div>
        </div>

        <TrustPoints />
      </div>
    </section>
  );
};

export default AboutRevela;
