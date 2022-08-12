export const drinkType = Object.freeze({
  MILD: 'MILD',
  WINE: 'WINE',
  LIQUEUR: 'LIQUEUR',
  BOOZE:'BOOZE'
})

export const diaryTabs = Object.freeze({
  ALL_ENTRIES_TAB: "ALL_ENTRIES_TAB",
  WEEKLY_VIEW_TAB: "WEEKLY_VIEW_TAB",
  MONTHLY_VIEW_TAB: "MONTHLY_VIEW_TAB"
})

export const DATATABLE_PAGE_SIZE_OPTIONS = Object.freeze([
  { value: -1, label: 'Kaikki'},
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" }
])

export const SWIPE_STARTED_THRESHOLD = 4;
export const SWIPE_COMPLETED_THRESHOLD = 36;
