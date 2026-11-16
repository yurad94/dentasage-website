import type { ProductSpec } from "@/lib/data/products";

export function SpecTable({ specs }: { specs: ProductSpec[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <table className="w-full">
        <tbody>
          {specs.map((spec, i) => (
            <tr
              key={spec.label}
              className={i % 2 === 0 ? "bg-muted/50" : "bg-white"}
            >
              <th
                scope="row"
                className="w-1/2 break-words px-3 py-3 text-left text-xs font-medium text-muted-foreground sm:px-6 sm:text-sm"
              >
                {spec.label}
              </th>
              <td className="break-words px-3 py-3 text-xs text-foreground sm:px-6 sm:text-sm">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
