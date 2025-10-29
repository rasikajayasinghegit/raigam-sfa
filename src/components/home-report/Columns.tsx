"use client";

import { ColumnDef } from "@tanstack/react-table";

export type SalesData = {
  "region-name": string;
  area: string;
  territory: string;
  Target: number;
  "total-value": number;
  "variance-cum-target-vs": number;
  "sale-percentage": number;
  "pc-target": number;
  "total-pc": number;
  "given-wd": number;
  wd: number;
  "wd-variance": number;
  "avg-with-direct": number;
};

export const columns: ColumnDef<SalesData>[] = [
  {
    accessorKey: "region-name",
    header: "Region Name",
  },
  {
    accessorKey: "area",
    header: "Area",
  },
  {
    accessorKey: "territory",
    header: "Territory",
  },
  {
    accessorKey: "Target",
    header: "Target",
  },
  {
    accessorKey: "total-value",
    header: "Total Value",
  },
  {
    accessorKey: "variance-cum-target-vs",
    header: "Variance - Cum Target vs",
  },
  {
    accessorKey: "sale-percentage",
    header: () => <div className="text-right">Sale (%)</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("sale-percentage"));
      return <div className="text-right">{amount.toFixed(2)}%</div>;
    },
  },
  {
    accessorKey: "pc-target",
    header: "PC Target",
  },
  {
    accessorKey: "total-pc",
    header: "Total PC",
  },
  {
    accessorKey: "given-wd",
    header: "Given WD",
  },
  {
    accessorKey: "wd",
    header: "WD",
  },
  {
    accessorKey: "wd-variance",
    header: "WD Variance",
  },
  {
    accessorKey: "avg-with-direct",
    header: "Avg (With Direct)",
  },
];
