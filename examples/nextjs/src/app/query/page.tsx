import { runsOnServer } from "./server";
import { cookies } from "next/headers";

export default function Page() {
  if (!cookies().get("token")) {
    return <>Nothing</>;
  }
  return (
    <div className="flex h-screen items-center justify-center bg-neutral-100">
      <button
        onClick={async () => {
          const result = await runsOnServer();
          console.log("Result from server:", result);
        }}
      >
        Click me
      </button>
    </div>
  );
}
