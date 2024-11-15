import Image from "next/image";
import Hero from "../components/layout/home/Hero";
import Features from "@/components/layout/home/Features";
import { Logos } from "@/components/layout/home/Logo";
import PricingTable from "@/components/layout/PricingTable";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Hero />
      <Logos/>
      <Features/>
      <PricingTable/>
    </div>
  );
}
