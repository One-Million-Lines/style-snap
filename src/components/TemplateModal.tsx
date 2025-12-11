import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { X, Upload, Sparkles, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
}

interface TemplateModalProps {
  template: Template | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TemplateModal({ template, open, onOpenChange }: TemplateModalProps) {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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
    if (template && uploadedImage) {
      // Store data and navigate to results
      sessionStorage.setItem("uploadedImage", uploadedImage);
      sessionStorage.setItem("selectedTemplate", JSON.stringify(template));
      onOpenChange(false);
      navigate("/results");
    }
  };

  const handleClose = () => {
    setUploadedImage(null);
    onOpenChange(false);
  };

  if (!template) return null;

  // Generate gradient for preview
  const gradients = [
    "from-primary/30 to-secondary/30",
    "from-pink-400/30 to-purple-400/30",
    "from-amber-400/30 to-orange-400/30",
    "from-emerald-400/30 to-teal-400/30",
  ];
  const gradientIndex = template.id.charCodeAt(0) % gradients.length;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden bg-background border-border/50">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Template Preview */}
          <div className="bg-muted/30 p-6 md:p-8">
            <div className={cn(
              "aspect-square rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6",
              gradients[gradientIndex]
            )}>
              {template.imageUrl ? (
                <img
                  src={template.imageUrl}
                  alt={template.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <Sparkles className="w-16 h-16 text-foreground/30" />
              )}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-2">{template.title}</h2>
            <p className="text-muted-foreground mb-4">{template.description}</p>

            {/* Example Before/After */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <div className="absolute -top-2 left-2 px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs">
                  Before
                </div>
                <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground rounded text-xs">
                  After
                </div>
                <div className={cn(
                  "aspect-square rounded-lg bg-gradient-to-br flex items-center justify-center",
                  gradients[gradientIndex]
                )}>
                  <Sparkles className="w-8 h-8 text-foreground/50" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Upload */}
          <div className="p-6 md:p-8 flex flex-col">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            <h3 className="text-lg font-semibold text-foreground mb-6">Upload your photo</h3>

            {/* Upload Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={cn(
                "flex-1 min-h-[200px] rounded-2xl border-2 border-dashed transition-all duration-300",
                "flex flex-col items-center justify-center gap-4 cursor-pointer",
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
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-background/80 hover:bg-background shadow-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center gap-4 cursor-pointer p-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-foreground">
                      Drag & drop your photo here
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

            {/* Info text */}
            <p className="text-xs text-muted-foreground text-center mt-4 mb-6">
              This template uses optimized AI settings for best results
            </p>

            {/* Generate Button */}
            <Button
              size="lg"
              className={cn(
                "w-full btn-gradient rounded-full h-14 text-lg gap-2 group",
                !uploadedImage && "opacity-50 cursor-not-allowed"
              )}
              disabled={!uploadedImage}
              onClick={handleGenerate}
            >
              <Sparkles className="w-5 h-5" />
              Generate
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
