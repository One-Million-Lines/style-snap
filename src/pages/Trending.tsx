import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import TemplateGrid from "@/components/TemplateGrid";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { viralTemplates, trendingTemplates } from "@/data/templates";
import { cn } from "@/lib/utils";
import { TrendingUp, Sparkles } from "lucide-react";

const filters = ["Trending Now", "Viral", "Fun", "Holiday"];

export default function Trending() {
  const [activeFilter, setActiveFilter] = useState("Trending Now");

  const getFilteredTemplates = () => {
    if (activeFilter === "Trending Now") {
      return trendingTemplates;
    }
    return viralTemplates.filter((t) => t.category === activeFilter);
  };

  return (
    <>
      <Helmet>
        <title>Trending & Viral | SnapStyle - AI Photo Transformation</title>
        <meta
          name="description"
          content="Discover trending and viral photo transformations. AI Yearbook, Baby Generator, Holiday themes, and more viral content."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>Updated Daily</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Trending & Viral
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The hottest styles everyone's using right now. From viral yearbook trends
              to holiday transformations — get in on the action!
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-full gap-1",
                  activeFilter === filter && "btn-gradient"
                )}
              >
                {filter === "Trending Now" && <Sparkles className="w-3 h-3" />}
                {filter}
              </Button>
            ))}
          </div>

          {/* Templates Grid */}
          <TemplateGrid templates={getFilteredTemplates()} />
        </main>

        <Footer />
        <BottomNav />
      </div>
    </>
  );
}
