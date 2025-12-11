import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, Globe, Image, Sparkles, FileText, Shield } from "lucide-react";

interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SettingsSheet({ open, onOpenChange }: SettingsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Settings</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Preferences */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Preferences
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="default-style" className="text-sm">Default Style</Label>
                <Select defaultValue="auto">
                  <SelectTrigger id="default-style" className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="quality" className="text-sm">Output Quality</Label>
                <Select defaultValue="high">
                  <SelectTrigger id="quality" className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="ultra">Ultra HD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Data & Privacy */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Data & Privacy
            </h3>

            <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
              Delete uploaded photos
            </Button>
          </div>

          <Separator />

          {/* Display */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Image className="w-4 h-4 text-primary" />
              Display
            </h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="watermark" className="text-sm">Show Watermark</Label>
                <p className="text-xs text-muted-foreground">Pro removes watermark</p>
              </div>
              <Switch id="watermark" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="language" className="text-sm flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Language
              </Label>
              <Select defaultValue="en">
                <SelectTrigger id="language" className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Links */}
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-2 h-10 text-muted-foreground hover:text-foreground">
              <FileText className="w-4 h-4" />
              Terms of Service
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 h-10 text-muted-foreground hover:text-foreground">
              <Shield className="w-4 h-4" />
              Privacy Policy
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
