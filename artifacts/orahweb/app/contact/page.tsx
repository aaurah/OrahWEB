import type { Metadata } from "next";
import ContactForm from "./_contact-form";

export const metadata: Metadata = {
  title: "Contact — OrahWeb",
  description:
    "Get in touch with OrahWeb. Tell us about your project and we'll get back to you within one business day.",
};

export default function ContactPage() {
  return <ContactForm />;
}
