export default function Home() {
  return (
    <main className="my-6 max-w-7xl flex flex-col px-4 mx-auto items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-center font-extrabold text-4xl mt-12 sm:text-5xl md:text-6xl">
          End to End{" "}
          <span
            className="underline decoration-wavy decoration-red-500  text-white underline-offset-[12px] font-mono"
            style={{
              textDecorationSkipInk: "none",
            }}
          >
            typesafe
          </span>{" "}
          Analytics
        </h1>

        <div className="mt-8">
          <p className="text-xl mb-2 font-medium text-gray-300 mx-auto text-center px-4 sm:text-lg max-w-[880px] md:text-xl">
            Powerful typesafety from query to render. Types generated from your
            analytics service provider. Rendered with Tremor
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 my-6 text-lg w-full sm:flex-row">
        <a href="/docs" className="primary-button">
          Get Started
        </a>
        <a
          href="https://github.com/mokshit06/typewind"
          target="_blank"
          rel="noreferrer"
          className="secondary-button"
        >
          GitHub
        </a>
      </div>

      <video
        src="/demo.mp4"
        className="block w-full mx-auto max-w-60rem shadow-2xl rounded overflow-hidden"
        autoPlay
        controls
        loop
        muted
        playsInline
      >
        <source src="/demo.mp4" type="video/mp4" />
      </video>

      <div className="features"></div>
    </main>
  );
}
