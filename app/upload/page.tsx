import { FileUpload } from "@/components/FileUpload";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Upload transaction data</h1>
      <FileUpload />
    </div>
  );
}
