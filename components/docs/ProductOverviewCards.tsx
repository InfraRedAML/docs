import Link from "next/link";

export interface OverviewCard {
  title: string;
  href: string;
  description: string;
}

export function ProductOverviewCards({
  title = "Getting started",
  cards,
}: {
  title?: string;
  cards: OverviewCard[];
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-slate-1200">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="flex flex-col rounded-lg border border-slate-600 bg-gray-100 p-5 transition hover:border-blue-1000 hover:bg-blue-300"
          >
            <span className="mb-1 font-medium text-blue-1000">{card.title}</span>
            <span className="text-base text-slate-1100">{card.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
