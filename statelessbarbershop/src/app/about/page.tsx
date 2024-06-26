import Page from "@/components/layout/page";
import Body from "@/components/pages/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Stateless | @stateless_barbershop",
  description: "Stateless Barbershop & Education🇨🇼",
};

export default function Home() {

  return (
    <Page>
      <Body />
    </Page>
  );
}
