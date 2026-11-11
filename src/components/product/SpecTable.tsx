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
                className="w-1/2 px-4 py-3 text-left text-sm font-medium text-muted-foreground sm:px-6"
              >
                {spec.label}
              </th>
              <td className="px-4 py-3 text-sm text-foreground sm:px-6">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
