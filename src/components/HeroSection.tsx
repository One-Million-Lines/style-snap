import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Photo Transformation</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Transform your photos{" "}
            <span className="text-gradient">instantly</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Choose from 100+ stunning templates and watch the magic happen. 
            No prompts needed — just pick a style and upload your photo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/upload">
              <Button size="lg" className="btn-gradient rounded-full px-8 h-14 text-lg gap-2 group">
                <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Start with a template
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg">
              See examples
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-12 mt-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground">100+</div>
              <div className="text-sm text-muted-foreground">Templates</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground">50M+</div>
              <div className="text-sm text-muted-foreground">Photos Created</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground">4.9★</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>

        {/* Hero Image Preview */}
        <div className="mt-12 md:mt-16 max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-muted to-muted/50 aspect-[16/9]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 p-8 w-full max-w-lg">
                {/* Before */}
                <div className="relative">
                  <div className="absolute -top-3 left-3 px-3 py-1 bg-background rounded-full text-xs font-medium shadow-sm">
                    Before
                  </div>
                  <div className="aspect-square rounded-xl bg-muted-foreground/10 flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                    <div className="w-16 h-16 rounded-full bg-muted-foreground/20" />
                  </div>
                </div>
                {/* After */}
                <div className="relative">
                  <div className="absolute -top-3 left-3 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium shadow-sm">
                    After
                  </div>
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-primary/30">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40" />
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 animate-bounce-soft">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
