import { useState } from "react";
import TemplateCard from "./TemplateCard";
import TemplateModal from "./TemplateModal";

interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  trending?: boolean;
}

interface TemplateGridProps {
  templates: Template[];
  columns?: 2 | 3 | 4;
}

export default function TemplateGrid({ templates, columns = 4 }: TemplateGridProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
        {templates.map((template, index) => (
          <div
            key={template.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <TemplateCard
              {...template}
              onClick={() => setSelectedTemplate(template)}
            />
          </div>
        ))}
      </div>

      <TemplateModal
        template={selectedTemplate}
        open={!!selectedTemplate}
        onOpenChange={(open) => !open && setSelectedTemplate(null)}
      />
    </>
  );
}
