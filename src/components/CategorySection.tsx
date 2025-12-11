import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import TemplateCard from "./TemplateCard";
import { useState } from "react";
import TemplateModal from "./TemplateModal";

interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  trending?: boolean;
}

interface CategorySectionProps {
  title: string;
  linkTo?: string;
  templates: Template[];
}

export default function CategorySection({ title, linkTo, templates }: CategorySectionProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
        {linkTo && (
          <Link
            to={linkTo}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            See all
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 hide-scrollbar">
        {templates.map((template, index) => (
          <div
            key={template.id}
            className="flex-shrink-0 w-[160px] md:w-[200px] animate-fade-in"
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
    </section>
  );
}
