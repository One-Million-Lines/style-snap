import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import TemplateGrid from "@/components/TemplateGrid";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { portraitTemplates } from "@/data/templates";
import { cn } from "@/lib/utils";

const filters = ["All", "Professional", "Retro", "Artistic"];

export default function Portraits() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTemplates =
    activeFilter === "All"
      ? portraitTemplates
      : portraitTemplates.filter((t) => t.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Portrait Styles | SnapStyle - AI Photo Transformation</title>
        <meta
          name="description"
          content="Professional portrait transformations including LinkedIn headshots, studio lighting, retro styles, and artistic renderings."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Portrait Styles
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform your photos with professional, retro, and artistic portrait styles.
              Perfect for LinkedIn, social media, or just for fun.
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
                  "rounded-full",
                  activeFilter === filter && "btn-gradient"
                )}
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Templates Grid */}
          <TemplateGrid templates={filteredTemplates} />
        </main>

        <Footer />
        <BottomNav />
      </div>
    </>
  );
}
