import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TemplateGrid from "@/components/TemplateGrid";
import CategorySection from "@/components/CategorySection";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import {
  topTemplates,
  portraitTemplates,
  viralTemplates,
  businessTemplates,
} from "@/data/templates";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>SnapStyle - AI Photo Transformation | Transform Your Photos Instantly</title>
        <meta
          name="description"
          content="Transform your photos instantly with 100+ AI-powered style templates. No prompts needed - just pick a style and upload your photo."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <HeroSection />

          {/* Top Templates Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Popular Templates
                </h2>
                <p className="text-muted-foreground">
                  Start with our most-loved styles
                </p>
              </div>
              <TemplateGrid templates={topTemplates} />
            </div>
          </section>

          {/* Category Sections */}
          <div className="container mx-auto px-4">
            <CategorySection
              title="Portrait Styles"
              linkTo="/portraits"
              templates={portraitTemplates.slice(0, 6)}
            />

            <CategorySection
              title="Social & Viral"
              linkTo="/trending"
              templates={viralTemplates.slice(0, 6)}
            />

            <CategorySection
              title="Business Templates"
              linkTo="/business"
              templates={businessTemplates.slice(0, 6)}
            />
          </div>
        </main>

        <Footer />
        <BottomNav />
      </div>
    </>
  );
}
