export const siteConfig = {
  name: "typecharts",
  description:
    "The perfect starter template for your next TypeScript library. Batteries included powered by PNPM Workspaces, Turborepo, tsup & Changesets.",
  mainNav: [
    {
      title: "Documentation",
      href: "/docs/introduction",
    },
  ],
  sidebarNav: [
    {
      title: "Docs",
      items: [
        {
          title: "Introduction",
          href: "/docs/introduction",
        },
        {
          title: "Core",
          href: "/docs/core",
          items: [],
        },
      ],
    },
    {
      title: "Querying",
      items: [
        {
          title: "PostHog",
          items: [
            {
              title: "Query",
              href: "/docs/posthog/query",
            },
            {
              title: "Generator",
              href: "/docs/posthog/generator",
            },
          ],
        },
      ],
    },
    {
      title: "Rendering",
      items: [
        {
          title: "React",
          href: "/docs/react",
        },
        {
          title: "Next",
          href: "/docs/next",
        },
      ],
    },
  ],
  links: {
    twitter: "https://twitter.com/rhyssullivan",
    github: "https://github.com/rhyssullivan/typecharts",
    docs: "/docs",
  },
};

export type SiteConfig = typeof siteConfig;
