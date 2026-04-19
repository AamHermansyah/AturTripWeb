import { ExploreSearch } from "./_components/explore-search"
import { CategoryFilter } from "./_components/category-filter"
import { FeaturedJourneys } from "./_components/featured-journeys"
import { FeaturedGuides } from "./_components/featured-guides"
import { SafetyBanner } from "./_components/safety-banner"
import { GuideGroups } from "./_components/guide-groups"
import { HowItWorks } from "./_components/how-it-works"
import { GuideCta } from "./_components/guide-cta"

export default function ExplorePage() {
  return (
    <div>
      {/* Hero */}
      <div className="px-5 py-5">
        <h1 className="font-heading text-3xl font-extrabold leading-tight text-foreground">
          Temukan petualangan <span className="text-primary">berikutmu</span>
        </h1>
      </div>

      <div className="space-y-4">
        <ExploreSearch />
        <CategoryFilter />
        <FeaturedJourneys />
        <FeaturedGuides />
        <div className="px-5">
          <SafetyBanner />
        </div>
        <GuideGroups />
        <div className="px-5">
          <HowItWorks />
          <GuideCta />
        </div>
      </div>
    </div>
  )
}
