"use client";

import { LogWithRelation } from "@/types/log";
import axios from "axios";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function LogTable() {
  const { data: logs, error } = useSWR<LogWithRelation[]>("/api/logs", fetcher);

  if (error) return <div>Error fetching logs</div>;
  if (!logs) return <div>Loading logs...</div>;
  console.log(error);
  return (
    <Card>
      <CardContent className="overflow-x-auto p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Waktu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={log.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.user?.name || "-"}</TableCell>
                <TableCell>{log.guest?.name || "-"}</TableCell>
                <TableCell>
                  {new Date(log.createdAt).toLocaleString("id-ID")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
