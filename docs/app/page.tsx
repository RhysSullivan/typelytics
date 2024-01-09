import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AsEasyAs } from "../components/component/as-easy-as";
import { DocsLayout } from "next-docs-ui/layout";
import { tree } from "./source";
import { Metadata } from "next";
export const metadata = {
  icons: ["favicon.png"],
  title: "typecharts",
  description: "typesafe analytics from query to render",
} satisfies Metadata;
export default function Home() {
  return (
    <DocsLayout
      tree={tree}
      nav={{
        title: "typecharts",
        githubUrl: "https://github.com/RhysSullivan/typecharts",
      }}
      sidebar={{
        enabled: false,
      }}
      links={[
        {
          url: "/docs",
          text: "Docs",
        },
      ]}
    >
      <main className="my-6 max-w-7xl flex flex-col px-4 mx-auto items-center">
        <div className="w-full max-w-5xl">
          <h1
            className="text-center font-extrabold text-3xl mt-12 sm:text-5xl md:text-4xl font-mono "
            style={{
              lineHeight: "1.2",
            }}
          >
            <span
              className="underline decoration-wavy decoration-red-500 text-black  dark:text-white underline-offset-[10px]  font-mono"
              style={{
                textDecorationSkipInk: "none",
              }}
            >
              typesafe analytics
            </span>
            &nbsp;from query to render
          </h1>

          <div className="mt-8">
            <p className="text-xl mb-2 text-gray-700 dark:text-gray-300 mx-auto text-center px-4 sm:text-lg max-w-[880px] md:text-xl font-mono">
              Filling the gap in your analytics pipeline by giving you the power
              to query all of your analytics from your own applications and
              render them as charts
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-4 my-6 text-lg w-full sm:flex-row">
          <Link
            className={`${buttonVariants({
              variant: "outline",
            })} h-14 w-42 text-base`}
            href={"https://github.com/RhysSullivan/typecharts"}
            target="_blank"
          >
            ⭐ Star
          </Link>

          <Link
            className={`${buttonVariants({
              variant: "default",
            })} h-14 w-42 text-base`}
            href="/docs"
          >
            📖 Read the docs
          </Link>
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

        <div className="max-w-3xl text-center">
          <div>
            <h3 className="text-2xl font-bold mt-12 mb-4 text-center">
              The Problem
            </h3>
            <p>
              There's a gap in the current analytics ecosystem. We have powerful
              tools to collect data and it data in internal dashboards, but
              current tooling is lacking for exposing those analytics back to
              users.
            </p>
          </div>
        </div>
        <div className="max-w-3xl text-center">
          <AsEasyAs />
        </div>
      </main>
    </DocsLayout>
  );
}
