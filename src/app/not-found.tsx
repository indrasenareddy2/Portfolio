import Link from "next/link";
import { ArrowLeft } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pt-[var(--header-h)]">
      <p className="font-mono text-[0.78rem] text-faint">
        <span className="text-cyan">retrieval</span> · 0 documents matched · score 0.00
      </p>
      <h1 className="display mt-6 text-[clamp(3rem,10vw,8rem)]">404</h1>
      <p className="mt-4 max-w-md text-[1.1rem] leading-relaxed text-muted">
        This route isn&apos;t in the index. The guardrails held: nothing was hallucinated in its place.
      </p>
      <Link href="/" className="btn btn-ghost mt-10 w-fit">
        <ArrowLeft /> Back to the portfolio
      </Link>
    </section>
  );
}
