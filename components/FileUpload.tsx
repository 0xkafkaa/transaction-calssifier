"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setResponse(null); // Clear previous response
    }
  };

  const handleUpload = async () => {
    if (file) {
      setIsUploading(true);
      setResponse(null);

      const formData = new FormData();
      formData.append("file", file);

      try {
        // Replace with your API endpoint
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json(); // Parse the JSON response

        if (response.ok) {
          setResponse(data);
        } else {
          setResponse({ error: "Error uploading file." });
        }
      } catch (error) {
        setResponse({ error: "An unexpected error occurred." });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF1919",
    "#19FF19",
    "#1919FF",
  ];

  return (
    <div className="space-y-8">
      {/* File Input and Upload Button */}
      <div className="flex items-center gap-2">
        <Label htmlFor="file-upload" className="cursor-pointer">
          <Button asChild variant="outline">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>Choose File</span>
            </div>
          </Button>
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </Label>
        <Button onClick={handleUpload} disabled={!file || isUploading}>
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Upload"
          )}
        </Button>
      </div>

      {/* Selected File Name */}
      {file && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-gray-600">Selected file:</span>
          <span className="text-sm font-medium text-gray-900">{file.name}</span>
        </div>
      )}

      {/* Response Message */}
      {response?.error && (
        <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
          <XCircle className="h-4 w-4" />
          <span>{response.error}</span>
        </div>
      )}

      {/* Transaction List */}
      {response?.classified_transactions && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Transactions</h2>
          <Table>
            <TableCaption>List of classified transactions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Transaction Details</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {response.classified_transactions.map(
                (transaction: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.Date}</TableCell>
                    <TableCell>{transaction.Time}</TableCell>
                    <TableCell>{transaction["Transaction Details"]}</TableCell>
                    <TableCell
                      className={
                        transaction.Amount < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {transaction.Amount}
                    </TableCell>
                    <TableCell>{transaction.Category}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Insights Summary */}
      {response?.insights && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Insights</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Total Spent</h3>
              <p className="text-2xl font-bold text-red-500">
                {response.insights.total_spent}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Total Transactions</h3>
              <p className="text-2xl font-bold">
                {response.insights.total_transactions}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Most Frequent Category</h3>
              <p className="text-2xl font-bold">
                {response.insights.most_frequent_category}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">
                Average Transaction Amount
              </h3>
              <p className="text-2xl font-bold">
                {response.insights.average_transaction_amount}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Spending Distribution */}
      {response?.insights?.spending_distribution && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Spending Distribution</h2>
          <div className="flex justify-center">
            <PieChart width={600} height={600}>
              <Pie
                data={Object.entries(
                  response.insights.spending_distribution
                ).map(([name, value]) => ({
                  name,
                  value,
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {Object.entries(response.insights.spending_distribution).map(
                  (_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      )}
    </div>
  );
}
