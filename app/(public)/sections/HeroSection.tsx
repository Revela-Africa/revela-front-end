import CustomCta from "@/app/components/CustomCta";
import FloatingStatCard from "../components/FloatingStatCard";
import HeroMainCard from "../components/HeroMainCard";
import OrbitCanvas from "../components/OrbitCanvas";
import FloatingCard from "../components/FloatingStatCard";
import ScrollIndicator from "@/app/components/ScrollIndicator";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      {/* <OrbitCanvas /> */}

      <div className="absolute w-175 h-175 rounded-full bg-[radial-gradient(circle,rgba(255,190,0,0.18),transparent_65%)]" />

      <div className="relative z-10 grid grid-cols-2 gap-16 w-full container ">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/60 w-fit text-[10px] tracking-[0.22em] uppercase font-semibold text-[var(--gold-d)]">
            <span className="w-2 h-2 bg-(--gold) rounded-full animate-pulse" />
            Nigeria's Circular Vehicle Economy
          </div>

          <h1 className=" text-[65px] leading-[0.9]  font-bold font-clash  text-(--ink) mb-10">
            Unlock Your <br />
            <span className="text-(--gold)">Vehicle’s</span> <br />
            <span className="text-(--gold)">Circular</span> <br />
            <span className="">Value.</span>
          </h1>

          <p className="text-(--ink3) font-cabinet font-light max-w-lg mb-10 text-[18px]">
            Got a{" "}
            <span className="font-medium text-(--ink)">
               dated, accidented or damaged car? 
            </span>{" "}
            Sell it through the Revela platform — fast, transparent, and
            straight to your bank account.
          </p>

          <div className="flex items-center gap-5">
            <CustomCta
              label=" Sell your car →"
              className="py-5 px-10 text-white"
            />

            <CustomCta
              label="See how it works →"
              className="bg-transparent font-cabinet font-medium  normal-case shadow-none text-[#71717A] hover:translate-y-0 hover:bg-transparent hover:shadow-none"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex items-center justify-center">
          <HeroMainCard />
          <FloatingStatCard
            title="Cars Purchased"
            value="1,300"
            suffix="+"
            sub="Nationwide"
            width="w-[170px]"
            duration={4}
            delay={0}
            className="top-[5%] right-[-10%]"
          />

          <FloatingStatCard
            title="Paid Out"
            value="₦2B"
            suffix="+"
            sub="Direct transfers"
            width="w-[155px]"
            duration={5}
            delay={-2}
            className="bottom-[12%] right-[-8%]"
          />

          <FloatingStatCard
            title="Avg. Payout"
            value="48"
            suffix="hrs"
            sub="Bank to bank"
            duration={4.5}
            delay={-1}
            className="top-[30%] left-[-10%]"
          />
        </div>
      </div>
      <ScrollIndicator/>
    </section>
  );
}
