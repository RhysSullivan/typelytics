import {
  LineChart as ClientLineChart,
  LineChartProps as ClientLineChartProps,
} from "@typecharts/react";
import { Suspense } from "react";
export function SuspenseLineChart<const Labels extends string>(props: {
  promise: Promise<ClientLineChartProps<Labels>>;
}) {
  return (
    <Suspense
      fallback={
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <LineChart promise={props.promise} />
    </Suspense>
  );
}

async function LineChart<const Labels extends string>(props: {
  promise: Promise<ClientLineChartProps<Labels>>;
}) {
  const awaited = await props.promise;
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return <ClientLineChart {...awaited} />;
}
