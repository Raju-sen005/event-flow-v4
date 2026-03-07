import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "../../components/ui/button";
import axios from "axios";
interface Event {
  id: string;
  name: string;
  customer: string;
}

interface Deliverable {
  id: string;
  eventId: string;
  eventName: string;
  customer: string;
  fileName: string;
  type: string;
  uploadedAt: string;
  status: string;
  fileSize: string;
  fileUrl: string;
}

interface UploadDeliverableModalProps {
  events: Event[];
  onClose: () => void;
  refreshDeliverables: () => void;
}

export default function UploadDeliverableModal({ events, refreshDeliverables, onClose }: UploadDeliverableModalProps) {

  const [selectedEvent, setSelectedEvent] = useState("");
  const [file, setFile] = useState<File | null>(null);

const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    if (selected.type !== "application/pdf") {
        alert("Only PDF allowed");
        return;
    }

    setFile(selected);
};

  const handleUpload = async () => {

  if (!selectedEvent || !file) {
    alert("Select event and pdf");
    return;
  }

  const formData = new FormData();

  formData.append("eventId", selectedEvent);
  formData.append("file", file);

  try {

    await axios.post("/api/vendor/deliverables", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    refreshDeliverables();
    onClose();

  } catch (error) {
    console.error(error);
  }

};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-lg w-[400px] space-y-4">

        <h2 className="text-lg font-semibold">Upload Deliverable</h2>

        <select
          className="w-full border p-2 rounded"
          value={selectedEvent}
          onChange={(e)=>setSelectedEvent(e.target.value)}
        >
          <option value="">Select Event</option>

          {events.map(event => (
            <option key={event.id} value={event.id}>
              {event.name} - {event.customer}
            </option>
          ))}

        </select>

        <input type="file" accept="application/pdf" onChange={handleFile} />

        <div className="flex justify-end gap-2">

          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleUpload} className="gap-2">
            <Upload size={16} />
            Upload
          </Button>

        </div>

      </div>

    </div>
  );
}