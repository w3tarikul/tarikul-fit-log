import { Suspense } from "react";
import { Hero } from "@/components/home/hero";
import { LibrarySection } from "@/components/home/library-section";
import { Spinner } from "@/components/ui/spinner";
import { getWorkouts } from "@/lib/api";

// Rendered on each request so the library always reflects the live API.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<Spinner label="Loading workouts…" />}>
        <Library />
      </Suspense>
    </>
  );
}

async function Library() {
  const workouts = await getWorkouts();

  return <LibrarySection workouts={workouts} />;
}
