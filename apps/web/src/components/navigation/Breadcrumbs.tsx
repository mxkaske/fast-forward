import { useRouter } from "next/router";
import { Badge } from "@fast-forward/ui";
import Link from "@/components/ui/Link";

const emojiDB = {
  projects: "🚀",
  settings: "⚙️",
  team: "👨‍👩‍👧‍👦",
};

export interface BreadcrumbsProps {
  messages?: Record<string, string | null | undefined>;
  badges?: string[];
  // by knowing the next router, we can display a slightly lighter
}

const Breadcrumbs = ({ messages, badges }: BreadcrumbsProps) => {
  const router = useRouter();

  // TODO: clean up - this is so bad
  const [routeString, queries] = router.asPath.split("?");

  const paths = router.isReady ? routeString.split("/") : [];

  // because it starts with "/..."
  const [e, ...crumbs] = paths.map((path) => ({
    href: router.asPath.slice(0, router.asPath.indexOf(path) + path.length),
    name: Object.keys(emojiDB).includes(path)
      ? // append emoji
        `${path} ${emojiDB[path as keyof typeof emojiDB]}`
      : path,
  }));

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
      <ol role="list" className="flex items-center text-sm">
        <li className="flex-shrink-0">🏡</li>
        {bread.map((page) => {
          return (
            <li
              key={page.name}
              className="flex items-center text-sm flex-shrink-0"
            >
              <div className="mx-4">/</div>
              <Link href={page.href}>
                {page.name.length > 16
                  ? `${page.name.slice(0, 14)}...`
                  : page.name}
              </Link>
            </li>
          );
        })}
        <li className="flex space-x-2 ml-2">
          {badges?.map((i) => (
            <Badge key={i} color="primary" size="sm">
              {i}
            </Badge>
          ))}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
