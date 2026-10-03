import { ExploreContent } from "./_components/explore-content"
import { parseExploreState } from "@/lib/explore-filters"

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const initialState = parseExploreState(await searchParams)
  return (
    <ExploreContent
      key={JSON.stringify(initialState)}
      initialState={initialState}
    />
  )
}
