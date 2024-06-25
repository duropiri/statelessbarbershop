import Page from "@/components/layout/page";
import Body from "@/components/pages/Home";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Axcel Raul | @shotsbyaxcel",
  description: "Photography | Videography",
};

export default function Home() {
  return (
      <Page>
        <Body />
      </Page>
  );
}
