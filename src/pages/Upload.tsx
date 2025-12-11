import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import TemplateCard from "@/components/TemplateCard";
import { Button } from "@/components/ui/button";
import { topTemplates, Template } from "@/data/templates";
import { Upload as UploadIcon, X, Sparkles, ArrowRight, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Upload() {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleGenerate = () => {
    if (uploadedImage && selectedTemplate) {
      sessionStorage.setItem("uploadedImage", uploadedImage);
      sessionStorage.setItem("selectedTemplate", JSON.stringify(selectedTemplate));
      navigate("/results");
    }
  };

  const canGenerate = uploadedImage && selectedTemplate;

  return (
    <>
      <Helmet>
        <title>Upload Photo | SnapStyle - AI Photo Transformation</title>
        <meta name="description" content="Upload your photo and choose a style to transform it." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Create Your Transformation
              </h1>
              <p className="text-muted-foreground">
                Upload a photo, pick a style, and let the magic happen
              </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Step 1: Upload */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Upload Photo</h2>
                </div>

                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  className={cn(
                    "aspect-square rounded-xl border-2 border-dashed transition-all duration-300",
                    "flex flex-col items-center justify-center cursor-pointer",
                    isDragOver
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/30",
                    uploadedImage && "border-primary bg-primary/5"
                  )}
                >
                  {uploadedImage ? (
                    <div className="relative w-full h-full p-4">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <button
                        onClick={(e) => { e.stopPropagation(); setUploadedImage(null); }}
                        className="absolute top-6 right-6 p-2 rounded-full bg-background/80 hover:bg-background shadow-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center gap-4 cursor-pointer p-8">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <UploadIcon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-foreground">
                          Drag & drop your photo
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          or click to browse
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Step 2: Select Template */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Pick a Style</h2>
                </div>

                {selectedTemplate ? (
                  <div className="aspect-square rounded-xl bg-muted/30 flex flex-col items-center justify-center p-4 relative">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center mb-4">
                          <Sparkles className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {selectedTemplate.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedTemplate.category}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedTemplate(null)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background shadow-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="aspect-square rounded-xl bg-muted/30 flex flex-col items-center justify-center p-4">
                    <ImageIcon className="w-12 h-12 text-muted-foreground/50 mb-4" />
                    <p className="text-sm text-muted-foreground text-center">
                      Select a style from below
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <div className="mb-8">
              <Button
                size="lg"
                className={cn(
                  "w-full btn-gradient rounded-full h-14 text-lg gap-2 group",
                  !canGenerate && "opacity-50 cursor-not-allowed"
                )}
                disabled={!canGenerate}
                onClick={handleGenerate}
              >
                <Sparkles className="w-5 h-5" />
                Generate Transformation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              {!canGenerate && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                  {!uploadedImage && !selectedTemplate
                    ? "Upload a photo and select a style to continue"
                    : !uploadedImage
                    ? "Upload a photo to continue"
                    : "Select a style to continue"}
                </p>
              )}
            </div>

            {/* Template Selection */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Choose a Style</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {topTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={cn(
                      "relative rounded-xl overflow-hidden transition-all duration-200",
                      selectedTemplate?.id === template.id
                        ? "ring-2 ring-primary ring-offset-2"
                        : "hover:scale-105"
                    )}
                  >
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-foreground/40" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-2">
                      <p className="text-xs text-background font-medium truncate">
                        {template.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </>
  );
}
