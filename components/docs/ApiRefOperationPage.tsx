import type { ApiOperation } from "@/lib/openapi/types";

const BASE_URL = "https://api.infraredaml.com";

function ParamTable({ params }: { params: unknown[] }) {
  if (!params?.length) return null;
  const list = params as Array<{ name?: string; in?: string; required?: boolean; schema?: { type?: string }; description?: string }>;
  return (
    <div className="my-6">
      <h3 className="mb-2 text-lg font-semibold text-slate-1200">Parameters</h3>
      <table className="w-full text-base">
        <thead>
          <tr className="border-b border-slate-600 text-left">
            <th className="py-2 font-medium text-slate-1200">Name</th>
            <th className="py-2 font-medium text-slate-1200">Location</th>
            <th className="py-2 font-medium text-slate-1200">Type</th>
            <th className="py-2 font-medium text-slate-1200">Description</th>
          </tr>
        </thead>
        <tbody>
          {list.map((p, i) => (
            <tr key={i} className="border-b border-slate-600">
              <td className="py-2 font-mono text-slate-1100">{p.name}</td>
              <td className="py-2 text-slate-1100">{p.in}</td>
              <td className="py-2 text-slate-1100">{p.schema?.type ?? "—"}</td>
              <td className="py-2 text-slate-1100">{p.description ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ApiRefOperationPage({ op, servers }: { op: ApiOperation; servers?: Array<{ url: string }> }) {
  const baseUrl = servers?.[0]?.url ?? BASE_URL;
  const fullUrl = `${baseUrl}${op.path}`;
  const curlExample = `curl -X ${op.method} ${fullUrl} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"document_type":"identity","source":"base64","payload":"<base64_encoded_document>"}'`;

  return (
    <div className="flex">
      <article className="min-w-0 flex-1 px-8 py-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded bg-green-1100 px-2 py-0.5 text-xs font-semibold uppercase text-white">
            {op.method}
          </span>
          <code className="text-slate-1200">{op.path}</code>
        </div>
        {op.summary && (
          <h1 className="mb-2 text-2xl font-semibold text-slate-1200">{op.summary}</h1>
        )}
        {op.description && (
          <p className="mb-6 text-slate-1100">{op.description}</p>
        )}
        <ParamTable params={op.parameters ?? []} />
        <div className="my-6">
          <h3 className="mb-2 text-lg font-semibold text-slate-1200">Request</h3>
          <p className="mb-2 text-base text-slate-1100">
            Endpoint: <code className="rounded bg-slate-300 px-1">{fullUrl}</code>
          </p>
          <pre className="overflow-x-auto rounded-lg bg-slate-1200 p-4 text-base text-gray-100">
            <code>{curlExample}</code>
          </pre>
        </div>
        {op.responses && Object.keys(op.responses).length > 0 && (
          <div className="my-6">
            <h3 className="mb-2 text-lg font-semibold text-slate-1200">Responses</h3>
            <ul className="list-inside list-disc text-slate-1100">
              {Object.entries(op.responses).map(([code, res]) => (
                <li key={code}>
                  <strong>{code}</strong> — {(res as { description?: string })?.description ?? "—"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </div>
  );
}
