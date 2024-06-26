import Page from "@/components/layout/page";
import Body from "@/components/pages/Work";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Work | Stateless | @stateless_barbershop",
  description: "Stateless Barbershop & Education🇨🇼",
};

export default function Home() {

  return (
    <Page>
      <Body />
    </Page>
  );
}
