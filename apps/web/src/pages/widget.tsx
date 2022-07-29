import DefaultLayout from "@/components/layout/DefaultLayout";
import { Heading } from "@fast-forward/ui";
import Script from "next/script";
import React from "react";

const Widget = () => {
  return (
    <DefaultLayout>
      <Heading>Widget</Heading>
      <Script src="./js/widget.js"></Script>
      {/* @ts-ignore */}
      <feedback-widget username="mxkaske">feedback</feedback-widget>
    </DefaultLayout>
  );
};

export default Widget;
