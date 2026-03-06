import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getDocBySlug, getAllDocSlugs } from "@/lib/docs/get-doc-by-slug";
import { getHeadings } from "@/lib/docs/get-headings";
import { getDocNav } from "@/lib/docs/get-doc-nav";
import { OPENAPI_SPEC_PATH } from "@/lib/docs/config";
import { loadOpenAPISpec } from "@/lib/openapi/load-spec";
import { getApiRefSlugs, getOperationBySlug } from "@/lib/openapi/generate-pages";
import { renderMarkdoc } from "@/lib/markdoc/render";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { ProductOverviewCards } from "@/components/docs/ProductOverviewCards";
import { ApiRefOperationPage } from "@/components/docs/ApiRefOperationPage";
import type { Metadata } from "next";

const CARD_TITLE_CLASS = "mb-1 font-medium text-lg text-slate-1200";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

const API_CONTENT_PAGES = ["introduction", "authentication", "errors"] as const;

export async function generateStaticParams() {
  const contentSlugs = getAllDocSlugs();
  const spec = loadOpenAPISpec(OPENAPI_SPEC_PATH);
  const apiSlugs: { slug: string[] }[] = [
    { slug: ["api"] },
    { slug: ["api", "introduction"] },
    { slug: ["api", "authentication"] },
    { slug: ["api", "errors"] },
    ...getApiRefSlugs(spec).map(({ slug }) => ({ slug })),
  ];
  return [
    { slug: [] },
    ...contentSlugs.map((slug) => ({ slug })),
    ...apiSlugs,
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  if (slug.length === 0) {
    return {
      title: "InfraRed API Documentation",
      description: "Document extraction, fraud detection, and document collection APIs",
    };
  }
  if (slug[0] === "api") {
    if (slug.length === 1) {
      redirect("/docs/api/introduction");
    }
    const contentSlug = slug[1];
    if (slug.length === 2 && API_CONTENT_PAGES.includes(contentSlug as typeof API_CONTENT_PAGES[number])) {
      const doc = getDocBySlug(["api", contentSlug]);
      return doc
        ? {
            title: doc.frontmatter.title ? `${doc.frontmatter.title} | InfraRed API` : "API Reference | InfraRed API",
            description: doc.frontmatter.description,
          }
        : { title: "API Reference | InfraRed API", description: "InfraRed REST API endpoints" };
    }
    const spec = loadOpenAPISpec(OPENAPI_SPEC_PATH);
    const op = getOperationBySlug(spec, slug);
    const title = op?.summary ?? op?.operationId ?? "API Reference";
    return { title: `${title} | InfraRed API`, description: op?.description };
  }
  const doc = getDocBySlug(slug);
  if (!doc) return { title: "Docs" };
  return {
    title: doc.frontmatter.title
      ? `${doc.frontmatter.title} | InfraRed API`
      : "InfraRed API",
    description: doc.frontmatter.description,
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug = [] } = await params;
  if (slug.length === 0) {
    return (
      <div className="flex">
        <div className="min-w-0 flex-1 px-8 py-8">
          <h1 className="mb-4 text-3xl font-semibold text-slate-1200">
            InfraRed Documentation
          </h1>
          <p className="mb-8 max-w-2xl text-slate-1100">
            Welcome to InfraRed. This documentation covers the product end to end—using
            the dashboard at{" "}
            <a href="https://app.infraredaml.com" className="text-blue-1000 hover:underline">
              app.infraredaml.com
            </a>{" "}
            and integrating with the API. For endpoint reference, authentication, and
            request/response details, use the API section in the nav.
          </p>
          <h2 className="mb-4 text-xl font-semibold text-slate-1200">
            Quick start
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/docs/guides/getting-started"
              className="flex flex-col rounded-lg border border-slate-600 bg-gray-100 p-5 transition hover:border-blue-1000 hover:bg-blue-300"
            >
              <span className={CARD_TITLE_CLASS}>
                Getting Started
              </span>
              <span className="text-base text-slate-1100">
                Accounts, API keys, base URLs, and your first request
              </span>
            </Link>
            <Link
              href="/docs/guides/document-validation-and-extraction"
              className="flex flex-col rounded-lg border border-slate-600 bg-gray-100 p-5 transition hover:border-blue-1000 hover:bg-blue-300"
            >
              <span className={CARD_TITLE_CLASS}>
                Document extraction
              </span>
              <span className="text-base text-slate-1100">
                Validate document types and extract structured information
              </span>
            </Link>
            <Link
              href="/docs/guides/errors"
              className="flex flex-col rounded-lg border border-slate-600 bg-gray-100 p-5 transition hover:border-blue-1000 hover:bg-blue-300"
            >
              <span className={CARD_TITLE_CLASS}>
                Errors
              </span>
              <span className="text-base text-slate-1100">
                Error responses, status codes, and handling
              </span>
            </Link>
            <Link
              href="/docs/api"
              className="flex flex-col rounded-lg border border-slate-600 bg-gray-100 p-5 transition hover:border-blue-1000 hover:bg-blue-300"
            >
              <span className={CARD_TITLE_CLASS}>
                API Reference
              </span>
              <span className="text-base text-slate-1100">
                Using the API: endpoints, auth, and request/response schemas
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  if (slug[0] === "api") {
    if (slug.length === 1) {
      redirect("/docs/api/introduction");
    }
    const contentSlug = slug[1];
    if (slug.length === 2 && API_CONTENT_PAGES.includes(contentSlug as typeof API_CONTENT_PAGES[number])) {
      const doc = getDocBySlug(["api", contentSlug]);
      if (!doc) notFound();
      const headings = getHeadings(doc.body);
      const content = renderMarkdoc(doc.body);
      return (
        <div>
          <article className="min-w-0 flex-1 px-8 py-8">
            <div className="flex items-start justify-between gap-6 mb-6">
              <div className="min-w-0">
                {doc.frontmatter.title && (
                  <h1 className="mb-4 text-3xl font-semibold text-slate-1200">
                    {doc.frontmatter.title}
                  </h1>
                )}
                {doc.frontmatter.description && (
                  <p className="max-w-2xl text-slate-1100">
                    {doc.frontmatter.description}
                  </p>
                )}
              </div>
              <TableOfContents headings={headings} />
            </div>
            <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-slate-1200 prose-a:text-blue-1000 prose-code:rounded prose-code:bg-slate-300 prose-code:px-1 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none">
              {content}
            </div>
          </article>
        </div>
      );
    }
    const spec = loadOpenAPISpec(OPENAPI_SPEC_PATH);
    const op = getOperationBySlug(spec, slug);
    if (!op) notFound();
    return (
      <ApiRefOperationPage
        op={op}
        servers={spec?.servers}
      />
    );
  }
  const doc = getDocBySlug(slug);
  if (!doc) notFound();
  const headings = getHeadings(doc.body);
  const content = renderMarkdoc(doc.body);
  const nav = getDocNav();
  const productSection = nav.find(
    (item) => item.children && slug.length > 0 && item.href === `/docs/${slug[0]}`
  );
  const overviewCards =
    productSection?.children?.filter((c) => c.title !== "Overview").map((c) => ({
      title: c.title,
      href: c.href,
      description:
        c.title === "Upload a Document"
          ? "Submit a document (image or PDF) for validation and extraction."
          : c.title === "Extract Data"
            ? "Validate document types and extract structured fields."
            : c.title === "Detect Fraud"
              ? "Run fraud detection on documents and interpret results."
              : c.title === "Getting Started"
                ? "Base URLs, API keys, and your first request."
                : c.title === "Document Validation & Extraction"
                  ? "Validate document types and extract structured information."
                  : c.title === "Errors"
                    ? "Error responses, status codes, and handling."
                    : "",
    })) ?? [];

  return (
    <div>
      <article className="min-w-0 flex-1 px-8 py-8">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="min-w-0">
            {doc.frontmatter.title && (
              <h1 className="mb-4 text-3xl font-semibold text-slate-1200">
                {doc.frontmatter.title}
              </h1>
            )}
            {doc.frontmatter.description && (
              <p className="max-w-2xl text-slate-1100">
                {doc.frontmatter.description}
              </p>
            )}
          </div>
          <TableOfContents headings={headings} />
        </div>
        <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-slate-1200 prose-a:text-blue-1000 prose-code:rounded prose-code:bg-slate-300 prose-code:px-1 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none">
          {content}
        </div>
        {overviewCards.length > 0 && (
          <ProductOverviewCards cards={overviewCards} />
        )}
      </article>
    </div>
  );
}
