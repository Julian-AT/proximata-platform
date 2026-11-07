import { faqs } from "../data";
import { SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";
import { FaqItem } from "./faq-item";

export function Faq() {
  return (
    <section
      aria-label="FAQ"
      className="relative z-[1] flex w-full flex-col items-center justify-center overflow-clip px-8 py-[100px] tablet:p-[100px]"
    >
      <div className="relative z-[1] flex w-full flex-col items-center justify-start gap-[56px] overflow-clip">
        <div className="relative z-[1] flex w-full max-w-[400px] flex-col items-center justify-center gap-4 overflow-clip">
          <SectionTag label="FAQ" />
          <SectionTitle text="FAQs Before You Attend" className="w-full [&_h2]:text-balance" />
        </div>

        <div className="flex w-full max-w-[800px] flex-col items-center justify-center gap-[21px] overflow-clip">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
