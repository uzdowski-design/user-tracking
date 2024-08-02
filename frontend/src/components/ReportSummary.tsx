import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export function ReportSummary({
  totalUsers,
  scrollPercentage
}: {
  totalUsers: number;
  scrollPercentage: number;
}) {
  return (
    <Table className="text-2xl">
      <TableHeader>
        <TableRow>
          <TableHead>Total Users</TableHead>
          <TableHead>Scroll Percentage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="">{totalUsers}</TableCell>
          <TableCell>{scrollPercentage.toFixed(2)}%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
