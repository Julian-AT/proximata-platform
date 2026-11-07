import Image from "next/image";
import { articles, SOURCE_ORIGIN } from "../data";
import { ButtonLink } from "../framer-button";
import { SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";

type Article = (typeof articles)[number];

/** Black card with a dashed outline: cover image, then category, title link, and excerpt. */
function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="dashed-frame flex h-full flex-col items-start gap-4 overflow-clip bg-black pb-6">
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
        <p className="font-vietnam text-[16px] leading-[1.4] text-confer-green">
          {article.category}
        </p>
        <h6 className="font-clash-bold text-[16px] leading-[1.2] text-white tablet:text-[19px] desktop:text-[24px]">
          <a href={article.href}>{article.title}</a>
        </h6>
        <p className="font-vietnam text-[16px] leading-[1.4] text-balance text-confer-muted">
          {article.excerpt}
        </p>
      </div>
    </article>
  );
}

export function Journal() {
  return (
    <section
      aria-label="Journal Highlights"
      className="relative z-[1] flex flex-col items-center gap-14 overflow-clip px-8 py-[100px] tablet:p-[100px]"
    >
      <div className="flex w-full max-w-[400px] flex-col items-center gap-4 overflow-clip">
        <SectionTag label="BLOGS" />
        <SectionTitle text="Ideas worth carrying forward" className="w-full [&_h2]:text-balance" />
      </div>

      <div className="grid w-full grid-cols-1 gap-6 overflow-clip tablet:auto-rows-fr tablet:grid-cols-2 desktop:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.href} article={article} />
        ))}
      </div>

      <ButtonLink variant="unfilled" href={`${SOURCE_ORIGIN}/blog`} className="h-10 w-[138px] px-0">
        Explore All
      </ButtonLink>
    </section>
  );
}
