// UploadModal.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-guests", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message || "Success");
    onClose();
    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-96 p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Upload Guest Excel
          </DialogTitle>
          <DialogDescription className="mb-4">
            Please select a file to upload (xlsx/csv format).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="file">File (xlsx/csv)</Label>
          <Input
            id="file"
            type="file"
            accept=".xlsx,.csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <Button onClick={handleUpload} className="w-full mt-4">
          Upload
        </Button>

        {message && (
          <p className="text-sm text-green-600 text-center mt-2">{message}</p>
        )}

        <div className="mt-4 flex justify-end">
          <Button
            variant="link"
            onClick={() => onClose()}
            className="text-red-500"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
