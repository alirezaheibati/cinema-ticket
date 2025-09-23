import { ClockAlert } from "lucide-react";
interface NoutFoundWarningProps {
  message: string;
}
export default function NotFoundWarning({ message }: NoutFoundWarningProps) {
  return (
    <div className="bg-gray-200 border rounded-sm p-4 my-6">
      <ClockAlert className="inline ml-3" />
      <span>{message}</span>
    </div>
  );
}
