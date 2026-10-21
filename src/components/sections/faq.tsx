"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionHeading } from "@/components/shop/section-heading"
import { containerClass } from "@/lib/layout"

const faqs = [
  {
    value: "warranty",
    question: "گارانتی محصولات چگونه است؟",
    answer:
      "تمام محصولات با گارانتی اصالت کالا و ضمانت کتبی عرضه می‌شوند. مدت و شرایط گارانتی بر اساس برند و نوع محصول متفاوت است و در صفحه هر محصول ذکر می‌شود.",
  },
  {
    value: "shipping",
    question: "ارسال به شهرستان چگونه انجام می‌شود؟",
    answer:
      "سفارش‌ها با هماهنگی قبلی و از طریق پست پیشتاز، تیپاکس یا باربری تخصصی ارسال می‌شوند. تجهیزات حساس با بسته‌بندی ضدضربه و بیمه ارسال می‌شوند.",
  },
  {
    value: "invoice",
    question: "امکان صدور پیش‌فاکتور و فاکتور رسمی وجود دارد؟",
    answer:
      "بله. برای خریدهای سازمانی، پیش‌فاکتور تخصصی و فاکتور رسمی با مهر و امضا صادر می‌شود. کافی است درخواست خود را از طریق فرم مشاوره ثبت کنید.",
  },
  {
    value: "support",
    question: "پشتیبانی فنی شامل چه خدماتی است؟",
    answer:
      "پشتیبانی فنی شامل مشاوره پیش از خرید، کمک در انتخاب مدل مناسب، راهنمایی پیکربندی اولیه و پیگیری مسائل فنی پس از فروش است.",
  },
  {
    value: "refurbished",
    question: "محصولات استوک چه تفاوتی دارند؟",
    answer:
      "محصولات استوک تجهیزات بازسازی‌شده با کیفیت کنترل‌شده هستند که با قیمت مناسب‌تر و گارانتی مشخص عرضه می‌شوند. وضعیت دقیق هر کالا در توضیحات درج شده است.",
  },
  {
    value: "payment",
    question: "روش‌های پرداخت کدام‌اند؟",
    answer:
      "پرداخت آنلاین از طریق درگاه بانکی، کارت به کارت و برای سفارش‌های سازمانی تسویه اعتباری و پرداخت در چند مرحله امکان‌پذیر است.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-28 py-16 lg:py-20">
      <div className={containerClass}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="سوالات متداول"
            title="پاسخ پرسش‌های رایج خریداران"
            description="اگر پاسخ سوال خود را پیدا نکردید، کارشناسان ما آماده پاسخگویی هستند."
          />

          <Accordion
            multiple
            defaultValue={["warranty"]}
            className="rounded-xl border bg-card px-5"
          >
            {faqs.map((faq) => (
              <AccordionItem key={faq.value} value={faq.value}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
