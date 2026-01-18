import Head from "next/head";
import dynamic from "next/dynamic";

const MoonScene = dynamic(() => import("../components/MoonScene"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Lunar Pre-Emptive Rights</title>
      </Head>

      <main style={{ width: "100vw", height: "100vh", background: "black" }}>
        <MoonScene />
      </main>
    </>
  );
}
