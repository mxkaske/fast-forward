import React from "react";
import { useRouter } from "next/router";

// const anchors = React.Children.toArray(content)
// .filter((child: any) => {
//   console.log(child);
//   return child.props?.mdxType && ["h2", "h3"].includes(child.props.mdxType);
// })
// .map((child: any) => ({
//   url: "#" + child.props.id,
//   depth:
//     (child.props?.mdxType &&
//       parseInt(child.props.mdxType.replace("h", ""), 0)) ??
//     0,
//   text: child.props.children,
// }));

interface Props {
  anchors: {
    url: string;
    depth: number;
    text: string;
  }[];
}

const Toc = ({ anchors }: Props) => {
  const router = useRouter();
  return (
    <div>
      {anchors.map(({ url, text }) => (
        <a key={url} href={url}>
          {text}
        </a>
      ))}
    </div>
  );
};

export default Toc;
