import { MDXProvider } from "@mdx-js/react";
// Drift is the chatbot - should be avaialble on all pages
import Drift from "react-driftjs";
import Layout from "components/Layout";
import { HIWHeader } from "./HIWHeader";
import Footer from "components/Footer";
import Head from "components/Head";
import Box from "components/Box";
import TOCLayout from "components/TOC";
import { HowItWorksTOC } from "components/TOC/TOCs/HowItWorksTOC";
import { HowItWorksItems } from "components/TOC/TOCs/ItemsLists";
import TryTeleport from "components/TryTeleport";
import { components } from "./components";
import wavePngUrl from "sharedAssets/images/wave-light.png";

interface Props {
  meta: {
    border?: string;
    description?: string;
    headerColor?: string;
    headerDescription: string;
    headerSubtitle: string;
    headerTitle: string;
    hideWave?: boolean;
    shortFooter?: boolean;
    title?: string;
  };
  children: React.ReactNode;
}

const background = `url(${wavePngUrl}) 0 0 no-repeat`;

export default function HowItWorksPage({ meta, children }: Props) {
  return (
    <>
      <Head title={meta.title} description={meta.description} />
      <Layout
        background={meta.hideWave ? "none" : background}
        border={meta.border}
      >
        <HIWHeader
          subtitle="How Teleport Works"
          title={meta.headerTitle}
          description={meta.headerDescription}
        />
        <TOCLayout
          TOC1={
            <HowItWorksTOC
              title="TABLE OF CONTENTS"
              itemList={HowItWorksItems}
            />
          }
          TOC2={
            <HowItWorksTOC
              title="HOW TELEPORT WORKS"
              header="What's Next"
              footer={true}
              itemList={HowItWorksItems}
            />
          }
        >
          <Box color="text" lineHeight="28px">
            <MDXProvider components={components}>{children}</MDXProvider>
          </Box>
        </TOCLayout>

        <TryTeleport />
      </Layout>
      <Footer short={Boolean(meta.shortFooter)} />
      <Drift appId={process.env.NEXT_PUBLIC_DRIFT_ID} />
    </>
  );
}
