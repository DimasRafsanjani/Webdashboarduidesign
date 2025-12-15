import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileQuestion } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1>{title}</h1>
        <p className="text-gray-500 mt-2">{description}</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <FileQuestion className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-gray-600 mb-2">Page Under Development</h3>
          <p className="text-sm text-gray-500 text-center max-w-md">
            This page is currently being developed. More features and functionality will be added soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
