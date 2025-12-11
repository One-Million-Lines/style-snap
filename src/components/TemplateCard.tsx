import { useState } from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  id: string;
  title: string;
  category: string;
  imageUrl?: string;
  trending?: boolean;
  onClick?: () => void;
}

export default function TemplateCard({
  id,
  title,
  category,
  imageUrl,
  trending,
  onClick,
}: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate a gradient based on the template id for visual variety
  const gradients = [
    "from-primary/30 to-secondary/30",
    "from-pink-400/30 to-purple-400/30",
    "from-amber-400/30 to-orange-400/30",
    "from-emerald-400/30 to-teal-400/30",
    "from-blue-400/30 to-indigo-400/30",
    "from-rose-400/30 to-pink-400/30",
  ];
  const gradientIndex = id.charCodeAt(0) % gradients.length;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative w-full rounded-2xl overflow-hidden bg-card shadow-card transition-all duration-300",
        "hover:shadow-card-hover hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/50"
      )}
    >
      {/* Image/Preview Area */}
      <div className={cn(
        "aspect-[4/5] bg-gradient-to-br",
        gradients[gradientIndex],
        "flex items-center justify-center relative overflow-hidden"
      )}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-background/50 flex items-center justify-center">
            <Sparkles className={cn(
              "w-8 h-8 text-foreground/50 transition-all duration-300",
              isHovered && "text-primary scale-110"
            )} />
          </div>
        )}

        {/* Trending Badge */}
        {trending && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium text-primary">
            <TrendingUp className="w-3 h-3" />
            Trending
          </div>
        )}

        {/* Hover overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        )} />

        {/* Try Now button on hover */}
        <div className={cn(
          "absolute bottom-4 left-4 right-4",
          "transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
          "transition-all duration-300"
        )}>
          <div className="px-4 py-2 rounded-full bg-background text-foreground text-sm font-medium text-center shadow-lg">
            Try this style
          </div>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4 text-left">
        <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{category}</p>
      </div>
    </button>
  );
}
