"use client"

import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "lucide-react"
import type { SVGProps } from "react"

import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/logo"
import { footerLinks, shop, trustBadges } from "@/data/shop"
import { containerClass } from "@/lib/layout"

type IconProps = SVGProps<SVGSVGElement>

const socialIcons: Record<string, (props: IconProps) => React.JSX.Element> = {
  اینستاگرام: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  لینکدین: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21h-4z" />
    </svg>
  ),
  تلگرام: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.8 4.3 2.9 11.6c-1.1.44-1.09 1.06-.2 1.33l4.82 1.5 1.86 5.72c.22.62.4.86.82.86.41 0 .6-.19.83-.41l2-1.94 4.15 3.07c.76.42 1.31.2 1.5-.7l2.72-12.8c.28-1.12-.43-1.63-1.4-1.22ZM9.5 14.2l8.2-5.17c.38-.23.74-.1.45.15l-6.75 6.1-.26 2.7Z" />
    </svg>
  ),
  یوتیوب: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23 12s0-3.4-.43-5.03a2.6 2.6 0 0 0-1.83-1.84C19.1 4.7 12 4.7 12 4.7s-7.1 0-8.74.43a2.6 2.6 0 0 0-1.83 1.84C1 8.6 1 12 1 12s0 3.4.43 5.03c.24.9.94 1.6 1.83 1.84 1.64.43 8.74.43 8.74.43s7.1 0 8.74-.43a2.6 2.6 0 0 0 1.83-1.84C23 15.4 23 12 23 12ZM9.75 15.5v-7l6 3.5Z" />
    </svg>
  ),
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className={containerClass}>
        <div className="grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-6 text-muted-foreground">
              {shop.name} تأمین‌کننده تخصصی تجهیزات شبکه، سرور و ذخیره‌سازی با
              گارانتی اصالت کالا و پشتیبانی مهندسی در سراسر کشور.
            </p>

            <ul className="flex flex-col gap-2.5 text-sm">
              <li className="flex items-start gap-2">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{shop.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="size-4 shrink-0 text-primary" />
                <a
                  href={`tel:${shop.phoneHref}`}
                  className="tabular font-medium hover:text-primary"
                  dir="ltr"
                >
                  {shop.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="size-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${shop.email}`}
                  className="text-muted-foreground hover:text-primary"
                  dir="ltr"
                >
                  {shop.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <ClockIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{shop.hours}</span>
              </li>
            </ul>

            <ul className="flex items-center gap-2">
              {shop.socials.map((social) => {
                const Icon = socialIcons[social.label]
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="grid size-9 place-items-center rounded-lg border bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {Icon && <Icon className="size-4" />}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {footerLinks.map((column) => (
            <nav key={column.title} className="flex flex-col gap-3.5">
              <h3 className="font-heading text-sm font-semibold">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Separator />

        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {trustBadges.map((badge) => (
              <li
                key={badge.label}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <badge.icon className="size-4 text-emerald-600 dark:text-emerald-500" />
                {badge.label}
              </li>
            ))}
          </ul>

          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheckIcon className="size-4" />
            © ۱۴۰۴ تمامی حقوق برای {shop.name} محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  )
}
