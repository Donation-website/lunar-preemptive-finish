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
        <meta
          name="description"
          content="Secure a speculative pre-emptive position on the Moon. A future-facing conceptual initiative."
        />
      </Head>

      <main style={{ width: "100vw", height: "100vh", background: "black" }}>
        <MoonScene />
      </main>
    </>
  );
}
