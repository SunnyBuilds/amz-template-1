import { getAllReviewsUnified } from "@/lib/api"
import { getAllCategories } from "@/lib/products-data"
import { ReviewsFilter } from "@/components/reviews-filter"
import { siteConfig } from "@/lib/site.config"

export default async function ReviewsPage() {
  const allReviews = await getAllReviewsUnified()
  const allCategories = getAllCategories()

  const categories = [
    { value: "all", label: "All Reviews" },
    ...allCategories.map(cat => ({ value: cat.slug, label: cat.name }))
  ]

  // 从配置文件获取页面文案，并替换 {count} 占位符
  const pageTitle = siteConfig.pages.reviews.title
  const pageDescription = siteConfig.pages.reviews.description.replace('{count}', allReviews.length.toString())

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{pageTitle}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {pageDescription}
          </p>
        </div>

        <ReviewsFilter reviews={allReviews} categories={categories} />
      </div>
    </main>
  )
}
