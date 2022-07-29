import React, { FC } from "react";
import ThemeSelect from "../common/ThemeSelect";
import Link from "@/components/ui/Link";
import { Text } from "@fast-forward/ui";

const Footer: FC = () => {
  return (
    <footer className="w-full max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0">
      <div className="pb-8 gap-8 grid grid-cols-2 sm:grid-cols-3">
        <div className="space-y-4">
          <p className="uppercase text-sm font-semibold">Sitemap</p>
          <div>
            <Link href="/open">open</Link>
          </div>
          <div>
            <Link href="/imprint">imprint</Link>
          </div>
        </div>
        <div className="space-y-4">
          <p className="uppercase text-sm font-semibold">Community</p>
          <div>
            <Link
              href="https://twitter.com/mxkaske"
              target="_blank"
              rel="noreferrer"
            >
              twitter
            </Link>
          </div>
          <div>
            <Link
              href="https://github.com/maximiliankaske/fast-forward"
              target="_blank"
              rel="noreferrer"
            >
              github
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <p className="uppercase text-sm font-semibold">Theme</p>
          <ThemeSelect />
        </div>
      </div>
      <div className="text-center pb-8">
        <Text variant="description">
          fast-forward - © {new Date().getFullYear().toString()}
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
