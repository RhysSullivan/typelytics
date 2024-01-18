import {
  Table as TremorTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { Table as TypeChartsTable } from "@typelytics/core";

export type TableProps<Labels extends string> = TypeChartsTable<Labels> & {
  renderHeader?: ((label: Labels) => React.ReactNode) | Record<string, string>;
  renderCell?: Record<
    string,
    (props: {
      value: string | number | undefined;
      label: Labels | string;
      index: number;
    }) => React.ReactNode
  >;
  skipLabel?: boolean;
};
export function Table<Labels extends string>(props: TableProps<Labels>) {
  const data = props.data;
  const labels = new Set(Object.keys(data[0] ?? {}));
  return (
    <TremorTable className="mt-5">
      <TableHead>
        <TableRow>
          {Array.from(labels).map((label) => {
            console.log(labels);
            if (props.skipLabel && label === "label") {
              return null;
            }
            if (props.renderHeader) {
              if (typeof props.renderHeader === "object") {
                return (
                  <TableHeaderCell key={label}>
                    {props.renderHeader[label] ?? label}
                  </TableHeaderCell>
                );
              }
              return (
                <TableHeaderCell key={label}>
                  {props.renderHeader(label as Labels)}
                </TableHeaderCell>
              );
            }
            return <TableHeaderCell key={label}>{label}</TableHeaderCell>;
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={`${item.label} - ${index}`}>
            {Object.keys(item).map((key, index) => {
              if (props.skipLabel && key === "label") {
                return null;
              }
              return (
                <TableCell key={`${key}-${index}-${item[key]}`}>
                  {props.renderCell?.[key]?.({
                    value: item[key],
                    label: item.label,
                    index,
                  }) ?? item[key]}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </TremorTable>
  );
}
