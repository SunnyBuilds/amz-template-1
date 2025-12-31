import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"
import { Search, ArrowRight } from "lucide-react"
import * as LucideIcons from "lucide-react"
import Link from "next/link"
import { getFeaturedProducts } from "@/lib/products-data"
import { siteConfig } from "@/lib/site.config"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(6)

  return (
    <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative bg-primary py-20 md:py-32"
          style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            outline: 'none',
            border: 'none'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 text-balance">
                {siteConfig.homepage.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                {siteConfig.homepage.hero.subtitle}
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={siteConfig.homepage.hero.searchPlaceholder}
                  className="pl-12 h-14 text-base bg-background text-foreground"
                />
                <Button
                  size="lg"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative bottom wave */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              overflow: 'hidden',
              lineHeight: 0
            }}
          >
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              style={{
                display: 'block',
                verticalAlign: 'bottom'
              }}
            >
              <path
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="currentColor"
                className="text-background"
              />
            </svg>
          </div>
        </section>

        {/* Best Gear Picks Categories */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{siteConfig.homepage.categories.title}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {siteConfig.homepage.categories.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteConfig.homepage.categories.items.map((category) => {
                const IconComponent = (LucideIcons as any)[category.icon]
                return (
                  <Link key={category.slug} href={`/category/${category.slug}`} className="group">
                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-4 rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                            {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                            {category.description}
                          </p>
                          <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                            View Products <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-0 transition-all" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Reviews Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{siteConfig.homepage.featuredProducts.title}</h2>
                <p className="text-muted-foreground">{siteConfig.homepage.featuredProducts.subtitle}</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/reviews">View All Reviews</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.asin}
                  title={product.shortTitle || product.title}
                  image={product.imageUrl}
                  rating={product.rating || 4.5}
                  reviewCount={0}
                  price=""
                  summary={product.summary || `Tested and reviewed for outdoor enthusiasts. ${product.features[0]}`}
                  amazonUrl={product.amazonUrl}
                  asin={product.asin}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center bg-primary rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
                Never Miss a Review
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                Get our latest gear reviews and buying guides delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-12 bg-background text-foreground"
                />
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}
