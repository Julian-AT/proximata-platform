"use client";

import { useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * "Get summit updates" signup. The source posts to Framer's form backend,
 * which isn't available here, so submitting just confirms inline.
 */
export function FooterNewsletter() {
  const [submitted, setSubmitted] = useState(false);
  const inputId = useId();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <p
        aria-live="polite"
        className={cn(
          "font-vietnam text-[16px] leading-[1.4]",
          submitted ? "text-confer-green" : "text-white/90",
        )}
      >
        {submitted ? "Thanks! You’re on the list." : "Get summit updates"}
      </p>
      <form onSubmit={onSubmit} className="flex shrink-0 items-start gap-5 overflow-hidden">
        <label
          htmlFor={inputId}
          className="relative flex h-[50px] w-[199px] shrink-0 cursor-text items-center bg-confer-panel p-3 after:pointer-events-none after:absolute after:inset-0 after:border after:border-dashed after:border-white/20 focus-within:after:border-solid focus-within:after:border-confer-green"
        >
          <span className="sr-only">Email</span>
          <input
            id={inputId}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            onChange={() => setSubmitted(false)}
            className="h-[26px] w-full min-w-0 bg-transparent font-vietnam text-[16px] leading-[1.6] text-white caret-white outline-none placeholder:text-white/14"
          />
        </label>
        <button
          type="submit"
          className="relative flex h-[50px] w-[124px] shrink-0 cursor-pointer items-center justify-center bg-confer-button px-6 font-vietnam text-[16px] leading-[1.4] text-confer-green shadow-[inset_0_0_8px_4px_rgba(32,179,147,0.73)] after:pointer-events-none after:absolute after:inset-0 after:border after:border-white/20 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-confer-green"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
