import Page from "@/components/layout/page";
import Body from "@/components/pages/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Stateless | @stateless_barbershop",
  description: "Stateless Barbershop & Education🇨🇼",
};

export default function Home() {
  return (
    <Page>
      <Body />
    </Page>
  );
}
