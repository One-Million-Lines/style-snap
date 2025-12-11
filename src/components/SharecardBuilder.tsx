import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share2, Instagram, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SharecardBuilderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: string;
  beforeImage?: string;
}

type LayoutType = "single" | "side-by-side" | "vertical";

export default function SharecardBuilder({
  open,
  onOpenChange,
  image,
  beforeImage,
}: SharecardBuilderProps) {
  const [layout, setLayout] = useState<LayoutType>("single");
  const [bgColor, setBgColor] = useState("#ffffff");

  const bgColors = [
    "#ffffff",
    "#f8fafc",
    "#0f172a",
    "#0891b2",
    "#ec4899",
    "#f59e0b",
  ];

  const layouts: { value: LayoutType; label: string }[] = [
    { value: "single", label: "Single" },
    { value: "side-by-side", label: "Side by Side" },
    { value: "vertical", label: "Vertical" },
  ];

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement("a");
    link.download = "snapstyle-creation.png";
    link.href = image;
    link.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create Sharecard</DialogTitle>
        </DialogHeader>

        {/* Preview Canvas */}
        <div
          className="relative rounded-2xl overflow-hidden aspect-square max-h-[400px] mx-auto transition-colors duration-300"
          style={{ backgroundColor: bgColor }}
        >
          {layout === "single" && (
            <div className="absolute inset-4 flex items-center justify-center">
              <img
                src={image}
                alt="Generated"
                className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
              />
            </div>
          )}

          {layout === "side-by-side" && (
            <div className="absolute inset-4 flex items-center justify-center gap-4">
              {beforeImage && (
                <div className="flex-1 relative">
                  <span className="absolute -top-2 left-2 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                    Before
                  </span>
                  <img
                    src={beforeImage}
                    alt="Before"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex-1 relative">
                <span className="absolute -top-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded">
                  After
                </span>
                <img
                  src={image}
                  alt="After"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          )}

          {layout === "vertical" && (
            <div className="absolute inset-4 flex flex-col items-center justify-center gap-4">
              {beforeImage && (
                <div className="flex-1 relative w-full">
                  <span className="absolute -top-2 left-2 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                    Before
                  </span>
                  <img
                    src={beforeImage}
                    alt="Before"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex-1 relative w-full">
                <span className="absolute -top-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded">
                  After
                </span>
                <img
                  src={image}
                  alt="After"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Watermark */}
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-foreground/10 backdrop-blur-sm rounded text-xs text-foreground/60">
            Made with SnapStyle
          </div>
        </div>

        {/* Layout Options */}
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Layout</p>
            <div className="flex gap-2">
              {layouts.map((l) => (
                <Button
                  key={l.value}
                  variant={layout === l.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLayout(l.value)}
                  className={cn(
                    "rounded-full",
                    layout === l.value && "btn-gradient"
                  )}
                >
                  {l.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Background Colors */}
          <div>
            <p className="text-sm font-medium mb-2">Background</p>
            <div className="flex gap-2">
              {bgColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setBgColor(color)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all",
                    bgColor === color
                      ? "border-primary scale-110"
                      : "border-border hover:scale-105"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            size="lg"
            className="flex-1 btn-gradient rounded-full gap-2"
            onClick={handleDownload}
          >
            <Download className="w-5 h-5" />
            Download Sharecard
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 rounded-full gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Directly
          </Button>
        </div>

        {/* Quick Share */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Instagram className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.47 2H3.53a1.45 1.45 0 0 0-1.47 1.43v17.14A1.45 1.45 0 0 0 3.53 22h16.94a1.45 1.45 0 0 0 1.47-1.43V3.43A1.45 1.45 0 0 0 20.47 2zM8.09 18.74h-3v-9h3v9zM6.59 8.48a1.56 1.56 0 1 1 0-3.12 1.57 1.57 0 1 1 0 3.12zm12.32 10.26h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0 0 12.85 13a2 2 0 0 0-.1.73v5h-3v-9h3v1.2a3 3 0 0 1 2.71-1.5c2 0 3.45 1.29 3.45 4.06v5.25z"/>
            </svg>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
