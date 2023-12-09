import { LinkButton } from "@/components/ui/link-button";
import { siteConfig } from "./site-config";

export default function Home() {
  return (
    <main className="my-6 max-w-7xl flex flex-col px-4 mx-auto items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-center font-extrabold text-3xl mt-12 sm:text-5xl md:text-5xl">
          <span
            className="underline decoration-wavy decoration-red-500  text-white underline-offset-[12px] font-mono"
            style={{
              textDecorationSkipInk: "none",
            }}
          >
            typesafe
          </span>{" "}
          Analytics from query to render
        </h1>

        <div className="mt-8">
          <p className="text-xl mb-2 font-medium text-gray-300 mx-auto text-center px-4 sm:text-lg max-w-[880px] md:text-xl">
            Filling the gap in your analytics pipeline, giving you the power to
            query all of your analytics in your own applications.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 my-6 text-lg w-full sm:flex-row">
        <LinkButton
          href={siteConfig.links.github}
          variant={"outline"}
          className="h-12"
          size={"lg"}
        >
          ⭐ Star
        </LinkButton>

        <LinkButton
          href="/docs/getting-started"
          variant={"default"}
          className="h-12"
        >
          📖 Read the docs
        </LinkButton>
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

      <div className="max-w-5xl text-center">
        <div>
          <h3 className="text-2xl font-bold mt-12 mb-4 text-center">
            Motivation
          </h3>
          <p>
            There's a gap missing in the current analytics ecosystem. We have
            powerful tools to collect data, and view that data in internal
            dashboards, but current tooling is lacking for exposing those
            analytics back to users.
          </p>
          <p></p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mt-12 mb-4 text-center">
            Use Cases
          </h3>
        </div>
      </div>
    </main>
  );
}
