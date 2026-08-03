import ContactPage from "@/components/ContactPage";

export const metadata = {
  title: "Contact — StatusBox",
  description:
    "Contact StatusBox developer Pabel Islam at pabelprfb@gmail.com. Send feedback, questions or status suggestions.",
  openGraph: {
    title: "Contact StatusBox",
    description: "Send us a message — feedback, questions and status suggestions are welcome.",
    type: "website",
  },
};

export default function Page() {
  return <ContactPage />;
}
