import Hero from "@/components/home/Hero";
import DestinationCards from "@/components/home/DestinationCards";
import Review from "@/components/home/Review";
import InteractiveMap from "@/components/home/InteractiveMap";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <DestinationCards />
      <Review />
      <InteractiveMap />
    </main>
  );
}
