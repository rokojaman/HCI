import type { Metadata } from "next"
import { ArrowDown } from "lucide-react"

import { FAQ_GROUPS, FaqSection } from "@/components/help/faq-section"
import { PoliciesSection } from "@/components/help/policies-section"
import { SupportSection } from "@/components/help/support-section"

export const metadata: Metadata = {
  title: "Help — QuickBuy",
  description:
    "Answers to common questions about orders, shipping, and returns, plus how to reach QuickBuy support.",
}

const JUMP_LINKS = [
  ...FAQ_GROUPS.map((group) => ({ label: group.title, href: `#${group.id}` })),
  { label: "Policies", href: "#policies" },
  { label: "Contact support", href: "#contact" },
]

export default function HelpPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How can we help?
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            Search our FAQs, review the policies that cover your order, or reach
            the support team directly.
          </p>
          <nav
            aria-label="Jump to section"
            className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {JUMP_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
              >
                <span className="underline-offset-4 group-hover:underline">
                  {link.label}
                </span>
                <ArrowDown className="size-3.5 text-muted-foreground transition-transform group-hover:translate-y-0.5" />
              </a>
            ))}
          </nav>
        </div>
      </section>

      <FaqSection />
      <PoliciesSection />
      <SupportSection />
    </>
  )
}
