import type { LogoName } from "./AnnouncementBar";

interface RenderableCompany {
  imageName: LogoName;
  url?: string;
}

export type LogoRow = Array<LogoName>;
export type CaseStudyRow = Array<RenderableCompany>;

//STANDARD GRAY SET
export const Gray1: LogoRow = [
  "google",
  "nasdaq",
  "crypto",
  "samsung",
  "hp",
  "ibm",
];
export const Gray2: LogoRow = [
  "carta",
  "square",
  "snowflake",
  "sumologic",
  "doordash",
];

export const Gray3: LogoRow = [
  "dk",
  "accenture",
  "gitlab",
  "freshworks",
  "zynga",
];

// SAAS PAGE
export const SaaS1: LogoRow = [
  "colorSnowflake",
  "colorAirtable",
  "colorElastic",
  "colorAuth0",
];

export const SaaS2: LogoRow = [
  "colorCastor",
  "colorKaltura",
  "colorSumologic",
  "colorGladly",
];

export const SaaS3: LogoRow = ["colorGusto", "colorOrbit", "colorFlywheel"];

//Finance Page
export const Finance1: LogoRow = [
  "colorNasdaq",
  "colorCarta",
  "colorCrypto",
  "colorSquare",
];
export const Finance2: LogoRow = [
  "colorSpotOn",
  "colorMX",
  "colorGSR",
  "colorMayStreet",
];
export const Finance3: LogoRow = ["colorWise", "colorMoodys", "colorFolio"];

//Internet & Entertainment Page
export const Internet1: LogoRow = [
  "colorZynga",
  "colorDraftKings",
  "colorDoorDash",
  "colorTwitch",
];

export const Internet2: LogoRow = [
  "colorRushStreet",
  "colorEpicGames",
  "colorWish",
  "colorCoupang",
];

export const Internet3: LogoRow = [
  "colorTokopedia",
  "colorBigCommerce",
  "colorThredUp",
  "colorShadeStore",
];

// CompactClientsList
// When determining order, make sure logos with case-study urls always appear in the first 3 positions
// otherwise they are not displayed on mobile

export const CompactClients1: Array<RenderableCompany> = [
  { imageName: "colorAuth0", url: "/case-study/auth0/" },
  { imageName: "colorAirtable" },
  {
    imageName: "colorElastic",
    url: "/case-study/elastic-testimonial/",
  },
  { imageName: "colorCrypto" },
  { imageName: "colorDoorDash" },
];
export const CompactClients2: Array<RenderableCompany> = [
  { imageName: "colorGitlab" },
  { imageName: "colorGusto" },
  {
    imageName: "colorNasdaq",
    url: "/case-study/nasdaq-testimonial/",
  },
  { imageName: "hpe" },
  { imageName: "ibm" },
];

export const CompactClients3: Array<RenderableCompany> = [
  { imageName: "samsung" },
  {
    imageName: "colorSumologic",
    url: "/case-study/sumologic-testimonial/",
  },
  { imageName: "swisscom" },
  { imageName: "threatstack" },
  { imageName: "colorTwitch" },
];
