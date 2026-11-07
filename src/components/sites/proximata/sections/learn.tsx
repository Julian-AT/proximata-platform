import Image from "next/image";
import { cn } from "@/lib/utils";
import { learnCards } from "../data";
import { SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";

/**
 * Copy of the invisible placeholder cards that fill the other two columns of
 * each sticky row. They never show, but on tablet their longer text sets the
 * row height, so they are kept to reproduce the source spacing.
 */
const PLACEHOLDER_BODY =
  "The First AI Summit is the ultimate gathering for tech enthusiasts and industry leaders.";

type LearnCardProps = {
  title: string;
  body: string;
  image?: string;
  className?: string;
};

function LearnCard({ title, body, image, className }: LearnCardProps) {
  return (
    <article
      className={cn("dashed-frame flex flex-col items-center gap-5 overflow-clip bg-black pb-6", className)}
    >
      <figure className="relative aspect-[400/211] w-full overflow-clip">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1200px) 400px, (min-width: 810px) 34vw, calc(100vw - 64px)"
            className="object-cover"
          />
        ) : null}
      </figure>
      <div className="flex w-full flex-col gap-[10px] px-6">
        <h5 className="text-balance font-clash-bold text-[18px] leading-[1.2] text-white tablet:text-[22px] desktop:text-[28px]">
          {title}
        </h5>
        <p className="text-balance font-vietnam text-[16px] leading-[1.4] text-confer-muted">{body}</p>
      </div>
    </article>
  );
}

export function Learn() {
  return (
    <section
      aria-label="Learn"
      className="relative z-[1] flex justify-center overflow-clip px-8 py-[100px] tablet:px-[60px] desktop:px-[100px]"
    >
      <div className="relative z-[1] flex w-full max-w-[1200px] flex-col items-center gap-14 overflow-clip">
        <div className="relative z-[1] flex w-full flex-col items-center gap-4 overflow-clip tablet:sticky tablet:top-[100px]">
          <SectionTag label="LEARN" />
          <SectionTitle
            text="Three Perfect Days. One Mission. Endless AI."
            className="w-full max-w-[560px] text-balance"
          />
        </div>

        {/* One sticky row per card; each shows its card in its own column so the
            rows settle into a single row of three as they stack. */}
        {learnCards.map((card, row) => (
          <div
            key={card.title}
            className="relative z-[1] grid w-full grid-cols-1 items-start overflow-clip tablet:sticky tablet:top-[300px] tablet:grid-cols-3"
          >
            {learnCards.map((slot, column) =>
              column === row ? (
                <LearnCard key={slot.title} {...slot} />
              ) : (
                <LearnCard
                  key={slot.title}
                  title={slot.title}
                  body={PLACEHOLDER_BODY}
                  className="pointer-events-none invisible hidden opacity-0 tablet:flex"
                />
              ),
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
