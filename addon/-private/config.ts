export let USE_PROXY = false;
export let STRICT_PROXY_ACCESS = false;

export function setTrackedBuiltInsConfig(settings: {
  USE_PROXY?: boolean;
  STRICT_PROXY_ACCESS?: boolean;
}) {
  USE_PROXY = settings.USE_PROXY || false;
  STRICT_PROXY_ACCESS = settings.STRICT_PROXY_ACCESS || false;
}
