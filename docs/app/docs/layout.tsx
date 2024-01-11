import { tree } from "../source";
import { DocsLayout } from "next-docs-ui/layout";
import type { ReactNode } from "react";

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={tree}
      nav={{
        title: "typelytics",
        githubUrl: "https://github.com/RhysSullivan/typelytics",
      }}
      sidebar={{
        defaultOpenLevel: 3,
      }}
    >
      {children}
    </DocsLayout>
  );
}
