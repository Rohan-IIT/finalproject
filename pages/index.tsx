// pages/index.tsx
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the CityInputPage
    router.push("/CityInputPage");
  }, []);

  return null; // This page doesn't have any UI, it's just for redirection.
};

export default Home;
