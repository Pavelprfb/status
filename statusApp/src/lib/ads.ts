import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";

// TODO: রিলিজের আগে এটা false করে দিন!
// true = Google test ad (সবসময় দেখায়, কোনো আয় হয় না)
// false = আপনার আসল AdMob ad unit
const USE_TEST_ADS = false;

export const INTERSTITIAL_AD_UNIT_ID = USE_TEST_ADS
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-4300319598686746/6278989925";

const RETRY_INTERVAL_MS = 30000;
const MAX_RETRIES = 20;

let interstitial: InterstitialAd | null = null;
let isLoaded = false;
let isLoading = false;
let retries = 0;
let retryTimer: ReturnType<typeof setTimeout> | null = null;

export function preloadInterstitial(): void {
  if (isLoading || isLoaded) return;
  isLoading = true;

  interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_AD_UNIT_ID, {
    requestNonPersonalizedAdsOnly: true,
  });

  interstitial.addAdEventListener(AdEventType.LOADED, () => {
    isLoading = false;
    isLoaded = true;
    retries = 0;
    console.log("[AdMob] Interstitial loaded");
  });

  interstitial.addAdEventListener(AdEventType.ERROR, error => {
    isLoading = false;
    console.log(
      `[AdMob] Interstitial error: ${(error as Error & { code?: string }).code ?? ""} ${error.message}`
    );
    scheduleRetry();
  });

  interstitial.addAdEventListener(AdEventType.CLOSED, () => {
    isLoaded = false;
    scheduleRetry();
  });

  interstitial.load();
}

function scheduleRetry(): void {
  if (retryTimer) clearTimeout(retryTimer);
  retryTimer = null;
  if (retries >= MAX_RETRIES) return;
  retries += 1;
  retryTimer = setTimeout(() => {
    preloadInterstitial();
  }, RETRY_INTERVAL_MS);
}

export function showInterstitial(): boolean {
  if (interstitial && isLoaded) {
    isLoaded = false;
    interstitial.show();
    return true;
  }
  if (!isLoading) {
    preloadInterstitial();
  }
  return false;
}
