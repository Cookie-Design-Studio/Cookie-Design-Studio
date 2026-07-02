import { lazy, Suspense } from "react";
import { PetCollarHome } from "./pet-collar/PetCollarHome";

const StudioApp = lazy(() => import("./StudioApp"));

const isStudioHome =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("studio");

export default function App() {
  if (isStudioHome) {
    return (
      <Suspense fallback={null}>
        <StudioApp />
      </Suspense>
    );
  }
  return <PetCollarHome />;
}
