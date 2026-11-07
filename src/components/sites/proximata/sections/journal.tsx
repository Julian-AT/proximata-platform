import Image from "next/image";
import { type Article, articles, journalCopy, journalUrl } from "../content/journal";
import { ButtonLink } from "../framer-button";
import { SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";

/** Black card with a dashed outline: cover image, then category, title link, and excerpt. */
function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="dashed-frame flex h-full flex-col items-start gap-4 overflow-clip bg-ink pb-6">
      <figure className="relative h-[220px] w-full shrink-0 overflow-clip">
        <Image
          src={article.image}
          alt={article.alt}
          fill
          sizes="(min-width: 1200px) 397px, (min-width: 810px) 400px, calc(100vw - 64px)"
          className="object-cover"
        />
      </figure>
      <div className="flex w-full flex-col items-start gap-[10px] overflow-clip px-6">
        <p className="font-mono text-[16px] leading-[1.4] text-highlight">
          {article.category}
        </p>
        <h6 className="font-display text-[16px] leading-[1.2] text-white tablet:text-[19px] desktop:text-[24px]">
          <a href={article.href}>{article.title}</a>
        </h6>
        <p className="font-mono text-[16px] leading-[1.4] text-balance text-soft">
          {article.excerpt}
        </p>
      </div>
    </article>
  );
}

/** Recaps and write-ups; renders nothing until content/journal.ts lists some. */
export function Journal() {
  if (articles.length === 0) return null;

  return (
    <section
      aria-label="Journal Highlights"
      className="relative z-[1] flex flex-col items-center gap-14 overflow-clip px-8 py-[100px] tablet:p-[100px]"
    >
      <div className="flex w-full max-w-[560px] flex-col items-center gap-4 overflow-clip">
        <SectionTag label={journalCopy.tag} />
        <SectionTitle text={journalCopy.title} className="w-full [&_h2]:text-balance" />
      </div>

      <div className="grid w-full grid-cols-1 gap-6 overflow-clip tablet:auto-rows-fr tablet:grid-cols-2 desktop:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.href} article={article} />
        ))}
      </div>

      {journalUrl ? (
        <ButtonLink variant="unfilled" href={journalUrl} className="h-10 w-[138px] px-0">
          {journalCopy.moreLabel}
        </ButtonLink>
      ) : null}
    </section>
  );
}
