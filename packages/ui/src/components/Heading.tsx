import cn from "classnames";
import React, { FC, HTMLAttributes } from "react";

const styles = {
  element: {
    h1: "text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl mb-2",
    h2: "text-2xl tracking-tight font-bold sm:text-3xl md:text-4xl mb-2",
    h3: "text-lg font-semibold sm:text-xl md:text-2xl mb-1",
    h4: "text-md font-semibold sm:text-lg md:text-xl mb-1",
  },
};

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  as?: keyof typeof styles.element;
}

const Heading: FC<Props> = ({
  as: element = "h2",
  children,
  className,
  ...props
}) => {
  const Component = (props: HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(element, props, children);

  const rootClassName = cn(styles.element[element], className);

  return (
    <Component className={rootClassName} {...props}>
      {children}
    </Component>
  );
};

export default Heading;
