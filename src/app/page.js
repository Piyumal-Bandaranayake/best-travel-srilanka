import Hero from "@/components/home/Hero";
import DestinationCards from "@/components/home/DestinationCards";
import Review from "@/components/home/Review";
import FeaturesBanner from "@/components/home/FeaturesBanner";
import InteractiveMap from "@/components/home/InteractiveMap";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <DestinationCards />
      <Review />
      <FeaturesBanner />
      <InteractiveMap />
    </main>
  );
}
