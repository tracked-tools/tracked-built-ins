import { setTrackedBuiltInsConfig } from 'tracked-built-ins';
import config from '../config/environment';

setTrackedBuiltInsConfig(config.trackedBuiltIns);

export default {
  // Do nothing
  initialize() {},
};
