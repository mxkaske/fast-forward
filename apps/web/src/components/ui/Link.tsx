import React, { FC } from "react";
import NextLink from "next/link";
import { Link as UiLink, LinkProps } from "@fast-forward/ui";

const Link: FC<LinkProps> = ({ children, href, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <UiLink {...props}>{children}</UiLink>
    </NextLink>
  );
};

export default Link;
