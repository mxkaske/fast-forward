import { useRouter } from "next/router";
import Link from "../ui/Link";

const emojiDB = {
  projects: "🚀",
  settings: "⚙️",
  team: "👨‍👩‍👧‍👦",
};

export interface BreadcrumbsProps {
  messages?: Record<string, string | null | undefined>;
  // by knowing the next router, we can display a slightly lighter
}

const Breadcrumbs = ({ messages }: BreadcrumbsProps) => {
  const router = useRouter();

  // TODO: clean up - this is so bad
  const [routeString, queries] = router.asPath.split("?");

  const paths = router.isReady ? routeString.split("/") : [];

  // because it starts with "/..."
  const [e, a, ...crumbs] = paths.map((path) => ({
    href: router.asPath.slice(0, router.asPath.indexOf(path) + path.length),
    name: Object.keys(emojiDB).includes(path)
      ? // append emoji
        `${path} ${emojiDB[path as keyof typeof emojiDB]}`
      : path,
  }));

  console.log(crumbs);
  // we convert the params into readable messages
  const bread = crumbs.map((c) => {
    const value = c;
    Object.entries(router.query).forEach(([k, v]) => {
      if (v === c.name) {
        value.name = messages?.[k] || c.name;
      }
    });
    return value;
  });

  return (
    <nav className="flex overflow-x-scroll" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4 text-sm">
        <li className="flex-shrink-0">
          <Link href="/app">home 🏡</Link>
        </li>
        {bread.map((page) => {
          return (
            <li key={page.name} className="flex items-center text-sm">
              <div className="mr-4">
                <span className="flex-shrink-0">/</span>
              </div>
              <Link href={page.href} className="flex-shrink-0">
                {page.name.length > 16
                  ? `${page.name.slice(0, 14)}...`
                  : page.name}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
