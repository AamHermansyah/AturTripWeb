import assert from "node:assert/strict"
import { test } from "node:test"
import {
  DEFAULT_TRIP_FILTERS,
  countTripFilters,
  exploreUrl,
  filterExploreJourneys,
  parseExploreState,
} from "./explore-filters.ts"

const journeys = [
  {
    id: "hike",
    title: "Pendakian Rinjani",
    location: "Lombok, NTB",
    category: "Petualangan alam",
    categoryIds: ["mountains"],
    type: "Private",
    price: 1750000,
    rating: 4.9,
    duration: { type: "day", value: 3 },
  },
  {
    id: "river",
    title: "Arung Jeram",
    location: "Sukabumi, Jabar",
    category: "Olahraga air",
    categoryIds: ["rivers"],
    type: "Shared",
    price: 500000,
    rating: 4.0,
    duration: { type: "hour", value: 4 },
  },
  {
    id: "city",
    title: "Kota Tua",
    location: "Jakarta",
    category: "Tur budaya",
    categoryIds: ["city"],
    type: "Shared",
    price: 150000,
    rating: 4.6,
    duration: { type: "hour", value: 5 },
  },
]
const ids = (query = "", category = "all", filters = DEFAULT_TRIP_FILTERS) =>
  filterExploreJourneys(journeys, query, category, filters).map(
    (journey) => journey.id
  )

test("tanpa pilihan menampilkan semua, pencarian menormalisasi kapital dan spasi", () => {
  assert.deepEqual(ids(), ["hike", "river", "city"])
  assert.deepEqual(ids("  RINJANI  lombok  "), ["hike"])
  assert.deepEqual(ids("budaya"), ["city"])
  assert.deepEqual(ids("tidak ada"), [])
})

test("kategori dan seluruh filter diterapkan bersama", () => {
  assert.deepEqual(ids("", "mountains"), ["hike"])
  assert.deepEqual(ids("", "camping"), [])
  assert.deepEqual(
    ids("", "city", {
      type: "shared",
      duration: "1",
      rating: "4.5",
      price: "500",
    }),
    ["city"]
  )
  assert.deepEqual(
    ids("Lombok", "all", { ...DEFAULT_TRIP_FILTERS, type: "shared" }),
    []
  )
})

test("filter harga memakai batas kurang dari yang ditampilkan", () => {
  assert.deepEqual(ids("", "all", { ...DEFAULT_TRIP_FILTERS, price: "500" }), [
    "city",
  ])
  assert.deepEqual(ids("", "all", { ...DEFAULT_TRIP_FILTERS, price: "2000" }), [
    "hike",
    "river",
    "city",
  ])
})

test("trip per jam termasuk durasi hingga satu hari", () => {
  assert.deepEqual(ids("", "all", { ...DEFAULT_TRIP_FILTERS, duration: "1" }), [
    "river",
    "city",
  ])
  assert.deepEqual(
    ids("", "all", { ...DEFAULT_TRIP_FILTERS, duration: "2-3" }),
    ["hike"]
  )
  assert.deepEqual(
    ids("", "all", { ...DEFAULT_TRIP_FILTERS, duration: "4+" }),
    []
  )
})

test("URL menyimpan pencarian dan pilihan sehingga dapat dipulihkan", () => {
  const state = {
    query: "Kota Tua",
    category: "city",
    filters: { ...DEFAULT_TRIP_FILTERS, price: "500" },
    viewAll: true,
  }
  const url = exploreUrl(state)
  assert.deepEqual(
    parseExploreState(
      Object.fromEntries(new URL(url, "http://localhost").searchParams)
    ),
    state
  )
  assert.equal(countTripFilters(state.filters), 1)
  assert.equal(exploreUrl(parseExploreState({})), "/explore")
})

test("nilai URL yang tidak sah kembali ke pilihan semua", () => {
  const state = parseExploreState({
    type: "other",
    duration: "-1",
    rating: "100",
    price: "-500",
    category: "other",
    q: ["a", "b"],
  })
  assert.deepEqual(state, {
    query: "",
    category: "all",
    filters: DEFAULT_TRIP_FILTERS,
    viewAll: false,
  })
})
