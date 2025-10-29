import { columns } from "@/components/home-report/Columns";
import { DataTable } from "@/components/home-report/DataTable";

export default function YourPage() {
  // Example data
  const data = [
    {
      "region-name": "Region 1",
      area: "Area 1",
      territory: "Territory 1",
      Target: 1000,
      "total-value": 950,
      "variance-cum-target-vs": -50,
      "sale-percentage": 95,
      "pc-target": 100,
      "total-pc": 95,
      "given-wd": 10,
      wd: 9,
      "wd-variance": -1,
      "avg-with-direct": 105,
    },
    {
      "region-name": "Region 1",
      area: "Area 1",
      territory: "Territory 1",
      Target: 1000,
      "total-value": 950,
      "variance-cum-target-vs": -50,
      "sale-percentage": 95,
      "pc-target": 100,
      "total-pc": 95,
      "given-wd": 10,
      wd: 9,
      "wd-variance": -1,
      "avg-with-direct": 105,
    },
    {
      "region-name": "Region 1",
      area: "Area 1",
      territory: "Territory 1",
      Target: 1000,
      "total-value": 950,
      "variance-cum-target-vs": -50,
      "sale-percentage": 95,
      "pc-target": 100,
      "total-pc": 95,
      "given-wd": 10,
      wd: 9,
      "wd-variance": -1,
      "avg-with-direct": 105,
    },
    {
      "region-name": "Region 1",
      area: "Area 1",
      territory: "Territory 1",
      Target: 1000,
      "total-value": 950,
      "variance-cum-target-vs": -50,
      "sale-percentage": 95,
      "pc-target": 100,
      "total-pc": 95,
      "given-wd": 10,
      wd: 9,
      "wd-variance": -1,
      "avg-with-direct": 105,
    },
    {
      "region-name": "Region 1",
      area: "Area 1",
      territory: "Territory 1",
      Target: 1000,
      "total-value": 950,
      "variance-cum-target-vs": -50,
      "sale-percentage": 95,
      "pc-target": 100,
      "total-pc": 95,
      "given-wd": 10,
      wd: 9,
      "wd-variance": -1,
      "avg-with-direct": 105,
    },

    // Add more data rows as needed
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
