import { registeredType } from './type-system.js';
import {
  HourMinuteTime,
  Tzid,
  UTCDateTimeMs,
  UnixTimeMs,
  isHourMinuteTime,
  isTzid,
  isUTCDateTimeMs,
  isUnixTimeMs,
} from './core.types.tmp.js';

export const UTCDateTimeExample = '2025-12-31T23:59:59.999Z';
export const UTCDateTimePattern = '^[1-2]\\d{3}-[0-1]\\d-[0-3]\\dT\\d{2}:\\d{2}:\\d{2}.\\d{3}Z$';

/**
 *
 */

export const UTCDateTimeMsType = registeredType<UTCDateTimeMs>('UTCDateTimeMs', (_options, value) => isUTCDateTimeMs(value));

/** */
export const UTCDateTimeMsSchema = UTCDateTimeMsType({
  description: 'An ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).',
  example: UTCDateTimeExample,
  pattern: UTCDateTimePattern,
});

/**
 *
 */
export const UnixTimeMsType = registeredType<UnixTimeMs>('UnixTimeMs', (_options, value) => isUnixTimeMs(value));

/**
 *
 */
export const TzidType = registeredType<Tzid>('Tzid', (_options, value) => isTzid(value));

export const HourMinuteTimeType = registeredType<HourMinuteTime>('HourMinuteTime', (_options, value) => isHourMinuteTime(value));
