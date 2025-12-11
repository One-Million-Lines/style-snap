import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import CategorySection from "@/components/CategorySection";
import SharecardBuilder from "@/components/SharecardBuilder";
import { Button } from "@/components/ui/button";
import { topTemplates, Template } from "@/data/templates";
import {
  Download,
  Share2,
  RefreshCw,
  Heart,
  SplitSquareVertical,
  Sparkles,
  ArrowLeft,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Results() {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [template, setTemplate] = useState<Template | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [sharecardOpen, setSharecardOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedImage = sessionStorage.getItem("uploadedImage");
    const storedTemplate = sessionStorage.getItem("selectedTemplate");

    if (storedImage && storedTemplate) {
      setUploadedImage(storedImage);
      setTemplate(JSON.parse(storedTemplate));

      // Simulate loading
      setTimeout(() => setIsLoading(false), 2000);
    } else {
      navigate("/upload");
    }
  }, [navigate]);

  // Generate fake result variations
  const results = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    url: uploadedImage || "",
  }));

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement("a");
    link.download = `snapstyle-${template?.title || "result"}.png`;
    link.href = uploadedImage || "";
    link.click();
  };

  if (!uploadedImage || !template) return null;

  return (
    <>
      <Helmet>
        <title>Your Results | SnapStyle - AI Photo Transformation</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-6 pb-24 md:pb-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/upload")}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            New transformation
          </Button>

          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              Your Results
            </h1>
            <p className="text-muted-foreground">
              Style: <span className="text-foreground font-medium">{template.title}</span>
            </p>
          </div>

          {isLoading ? (
            // Loading State
            <div className="max-w-2xl mx-auto">
              <div className="aspect-square rounded-2xl bg-muted animate-pulse flex flex-col items-center justify-center">
                <Sparkles className="w-12 h-12 text-primary animate-bounce-soft mb-4" />
                <p className="text-muted-foreground font-medium">Creating your transformation...</p>
                <p className="text-sm text-muted-foreground mt-1">This usually takes a few seconds</p>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Image */}
              <div className="lg:col-span-2">
                <div className="relative rounded-2xl overflow-hidden bg-muted shadow-card">
                  {showBeforeAfter ? (
                    // Before/After View
                    <div className="grid grid-cols-2 aspect-[2/1]">
                      <div className="relative">
                        <div className="absolute top-3 left-3 px-3 py-1 bg-background/90 rounded-full text-xs font-medium">
                          Before
                        </div>
                        <img
                          src={uploadedImage}
                          alt="Before"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                          After
                        </div>
                        <img
                          src={results[selectedImage].url}
                          alt="After"
                          className="w-full h-full object-cover"
                          style={{ filter: "saturate(1.2) contrast(1.1)" }}
                        />
                      </div>
                    </div>
                  ) : (
                    // Single Image View
                    <div className="aspect-square">
                      <img
                        src={results[selectedImage].url}
                        alt="Result"
                        className="w-full h-full object-cover"
                        style={{ filter: "saturate(1.2) contrast(1.1)" }}
                      />
                    </div>
                  )}
                </div>

                {/* Image Actions */}
                <div className="flex items-center justify-between mt-4 gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full gap-2"
                      onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                    >
                      <SplitSquareVertical className="w-4 h-4" />
                      {showBeforeAfter ? "Single View" : "Before/After"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Variation
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full gap-2"
                      onClick={handleDownload}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      className="btn-gradient rounded-full gap-2"
                      onClick={() => setSharecardOpen(true)}
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Gallery */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  All Variations
                </h3>
                <div className="grid grid-cols-3 lg:grid-cols-2 gap-3">
                  {results.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "relative aspect-square rounded-xl overflow-hidden transition-all",
                        selectedImage === index
                          ? "ring-2 ring-primary ring-offset-2"
                          : "hover:opacity-80"
                      )}
                    >
                      <img
                        src={result.url}
                        alt={`Result ${index + 1}`}
                        className="w-full h-full object-cover"
                        style={{
                          filter: `saturate(${1 + index * 0.1}) hue-rotate(${index * 10}deg)`,
                        }}
                      />
                      {selectedImage === index && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(result.id);
                        }}
                        className="absolute bottom-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-background"
                      >
                        <Heart
                          className={cn(
                            "w-4 h-4",
                            favorites.has(result.id)
                              ? "fill-destructive text-destructive"
                              : "text-muted-foreground"
                          )}
                        />
                      </button>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Similar Styles */}
          {!isLoading && (
            <CategorySection
              title="Try Similar Styles"
              templates={topTemplates.filter((t) => t.id !== template.id).slice(0, 6)}
            />
          )}
        </main>

        <BottomNav />

        <SharecardBuilder
          open={sharecardOpen}
          onOpenChange={setSharecardOpen}
          image={results[selectedImage]?.url || ""}
          beforeImage={uploadedImage}
        />
      </div>
    </>
  );
}
