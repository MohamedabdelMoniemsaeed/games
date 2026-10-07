import React from 'react';
import { useFarm } from '../context/FarmContext';
import {
  Sun,
  Cloud,
  Wind,
  CloudRain,
  CloudSun,
  RefreshCw,
  Droplets,
  Gauge,
  Compass,
  Sprout,
  Check,
  Calendar,
  Layers,
  Radio,
  Sparkles,
} from 'lucide-react';

export const WeatherScreen: React.FC = () => {
  const {
    t,
    formatNum,
    weather,
    isLiveWeather,
    toggleLiveWeather,
    cycleWeather,
    scheduleWatering,
    skipIrrigation,
    plantCrop,
  } = useFarm();

  const getConditionIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="h-12 w-12 text-[#FFD36B] animate-spin-slow" />;
      case 'clouds':
        return <Cloud className="h-12 w-12 text-[#AEBFCA]" />;
      case 'wind':
        return <Wind className="h-12 w-12 text-[#798B96]" />;
      case 'rainshower':
        return <CloudRain className="h-12 w-12 text-[#8FD5EC]" />;
      case 'clearingUp':
        return <CloudSun className="h-12 w-12 text-[#FFD36B]" />;
    }
  };

  const getConditionSentence = () => {
    switch (weather.condition) {
      case 'sunny':
        return t('weatherSentenceSunny');
      case 'clouds':
        return t('weatherSentenceClouds');
      case 'wind':
        return t('weatherSentenceWind');
      case 'rainshower':
        return t('weatherSentenceRain');
      case 'clearingUp':
        return t('weatherSentenceClearing');
    }
  };

  const getSkyBackground = () => {
    switch (weather.condition) {
      case 'sunny':
        return 'from-[#DDF0F1] via-[#E8F5F7] to-[#F4EFD7]';
      case 'clouds':
        return 'from-[#AEBFCA] via-[#CAD6DF] to-[#EAF5F7]';
      case 'wind':
        return 'from-[#798B96] via-[#A0B0BB] to-[#CBD5E1]';
      case 'rainshower':
        return 'from-[#627587] via-[#7B8E9F] to-[#94A3B8]';
      case 'clearingUp':
        return 'from-[#A9DCE4] via-[#C9ECF1] to-[#F4EFD7]';
    }
  };

  return (
    <div className="space-y-5 pb-14">
      {/* Header with Live Open-Meteo & Demo Cycle toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-[#1E2A22] dark:text-white">
            {t('weatherScreenTitle')}
          </h1>
          <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
            {t('farmWeather')} · {t('localName')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Live API toggle */}
          <button
            onClick={toggleLiveWeather}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition shadow-2xs ${
              isLiveWeather
                ? 'bg-[#2F7D4E] text-white'
                : 'border border-[#E8EBE5] bg-white text-[#7B857E] hover:bg-[#F6F4EA] dark:border-[#354239] dark:bg-[#243128] dark:text-[#A8B3AA]'
            }`}
          >
            <Radio className="h-3 w-3" />
            {t('liveForecast')}
          </button>

          {/* Demo Cycle Button */}
          <button
            onClick={cycleWeather}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E8EBE5] bg-white px-3 py-1.5 text-xs font-bold text-[#1E2A22] shadow-2xs hover:bg-[#F6F4EA] transition active:scale-95 dark:border-[#354239] dark:bg-[#243128] dark:text-white"
          >
            <RefreshCw className="h-3 w-3 text-[#2F7D4E]" />
            {t('demoCycle')}
          </button>
        </div>
      </div>

      {/* Animated Illustrated Farm Weather Scene */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-b ${getSkyBackground()} p-6 shadow-md transition-all duration-700 select-none min-h-[220px] flex flex-col justify-between`}
      >
        {/* Animated Particles / Rainbow for specific weather states */}
        {weather.condition === 'rainshower' && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-6 bg-[#8FD5EC] rounded-full opacity-70 animate-bounce"
                style={{
                  left: `${(i * 6.25) + Math.random() * 3}%`,
                  top: `${Math.random() * 40}%`,
                  animationDuration: `${0.6 + Math.random() * 0.4}s`,
                }}
              />
            ))}
          </div>
        )}

        {weather.condition === 'clearingUp' && (
          <div className="pointer-events-none absolute -top-8 right-12 h-36 w-36 rounded-full border-4 border-t-[#D96465] border-r-[#E9A95A] border-b-[#EBCF6A] border-l-transparent opacity-80 blur-2xs" />
        )}

        {/* Scene Header */}
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-0.5 text-xs font-bold text-[#1E2A22] backdrop-blur-xs">
              <span className="h-2 w-2 rounded-full bg-[#2F7D4E] animate-pulse"></span>
              {isLiveWeather ? 'Open-Meteo Live' : t('live')}
            </span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-5xl font-black text-[#1E2A22]">
                {formatNum(weather.temperature)}°
              </span>
              <span className="text-sm font-semibold text-[#1E2A22]/80">
                {t('feelsLike', { value: formatNum(weather.feelsLike) })}
              </span>
            </div>
            <h2 className="mt-1 text-lg font-bold text-[#1E2A22]">
              {t(
                weather.condition === 'sunny'
                  ? 'weatherSunny'
                  : weather.condition === 'clouds'
                  ? 'weatherClouds'
                  : weather.condition === 'wind'
                  ? 'weatherWind'
                  : weather.condition === 'rainshower'
                  ? 'weatherRainshower'
                  : 'weatherClearingUp'
              )}
            </h2>
          </div>
          <div className="p-2">{getConditionIcon()}</div>
        </div>

        {/* Forecast narrative bar */}
        <p className="relative z-10 mt-4 rounded-2xl bg-white/60 p-3.5 text-xs font-medium text-[#1E2A22] backdrop-blur-xs">
          {getConditionSentence()}
        </p>

        {/* Rolling Hills bottom illustration */}
        <div className="pointer-events-none absolute -bottom-10 -left-10 -right-10 h-28 rounded-[50%] bg-[#5CA66A]/30 blur-xs"></div>
        <div className="pointer-events-none absolute -bottom-14 -left-5 -right-5 h-24 rounded-[50%] bg-[#438355]/40 blur-xs"></div>
      </div>

      {/* Conditions Details Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {/* Humidity */}
        <div className="rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7B857E] dark:text-[#A8B3AA]">
            <Droplets className="h-4 w-4 text-[#4A91C5]" />
            {t('humidity')}
          </div>
          <p className="mt-2 text-2xl font-black text-[#1E2A22] dark:text-white">
            {formatNum(weather.humidity)}%
          </p>
          <p className="text-[11px] text-[#7B857E]">
            {t('dewPoint', { value: formatNum(17) })}
          </p>
        </div>

        {/* Wind */}
        <div className="rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7B857E] dark:text-[#A8B3AA]">
            <Wind className="h-4 w-4 text-[#798B96]" />
            {t('wind')}
          </div>
          <p className="mt-2 text-2xl font-black text-[#1E2A22] dark:text-white">
            {formatNum(weather.windSpeed)} <span className="text-xs font-normal">km/h</span>
          </p>
          <p className="text-[11px] text-[#7B857E]">
            {t('gustsValue', { value: `${formatNum(weather.gustSpeed)} km/h` })}
          </p>
        </div>

        {/* Rain Chance */}
        <div className="rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7B857E] dark:text-[#A8B3AA]">
            <CloudRain className="h-4 w-4 text-[#4A91C5]" />
            {t('rainChance')}
          </div>
          <p className="mt-2 text-2xl font-black text-[#1E2A22] dark:text-white">
            {formatNum(weather.rainChance)}%
          </p>
          <p className="text-[11px] text-[#7B857E]">
            {t('expectedRain', { value: formatNum(weather.expectedRainMm) })}
          </p>
        </div>

        {/* Soil Moisture */}
        <div className="rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7B857E] dark:text-[#A8B3AA]">
            <Gauge className="h-4 w-4 text-[#2F7D4E]" />
            {t('soilMoisture')}
          </div>
          <p className="mt-2 text-2xl font-black text-[#1E2A22] dark:text-white">
            {formatNum(weather.soilMoisture)}%
          </p>
          <p className="text-[11px] text-[#2F7D4E] font-medium">
            {t(weather.soilStatusKey)}
          </p>
        </div>

        {/* Water Tank */}
        <div className="rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7B857E] dark:text-[#A8B3AA]">
            <Layers className="h-4 w-4 text-[#4A91C5]" />
            {t('waterReserve')}
          </div>
          <p className="mt-2 text-2xl font-black text-[#1E2A22] dark:text-white">
            {formatNum(weather.waterTankPercent)}%
          </p>
          <p className="text-[11px] text-[#7B857E]">
            {t('storedLitersValue', { value: formatNum(weather.waterStoredLiters) })}
          </p>
        </div>

        {/* Temperature Sparkline */}
        <div className="rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <span className="text-xs font-bold text-[#7B857E] dark:text-[#A8B3AA]">
            {t('overview')} (7d)
          </span>
          <div className="mt-3 flex items-end justify-between gap-1 h-12">
            {weather.temperatureHistory.map((temp, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full rounded-t-sm bg-[#D78A32]"
                  style={{ height: `${(temp / 35) * 100}%` }}
                ></div>
                <span className="text-[9px] text-[#7B857E] mt-0.5">{formatNum(temp)}°</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Farm Recommendations Rules Engine */}
      <section className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
        <div>
          <h2 className="text-base font-bold text-[#1E2A22] dark:text-white">
            {t('farmRecommendations')}
          </h2>
          <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
            {t('recommendationsSubtitle')}
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {/* Recommendation 1: Water tomorrow */}
          <div className="flex flex-col gap-2 rounded-2xl border border-[#E8EBE5] bg-[#FFF2DF]/50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-[#354239] dark:bg-[#1E2A22]">
            <div>
              <h3 className="text-xs font-bold text-[#1E2A22] dark:text-white">
                {t('recommendWaterTitle')}
              </h3>
              <p className="mt-0.5 text-xs text-[#7B857E] dark:text-[#A8B3AA]">
                {t('recommendWaterBody')}
              </p>
            </div>
            <button
              onClick={scheduleWatering}
              className="inline-flex items-center gap-1.5 self-start rounded-xl bg-[#D78A32] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#B97223] active:scale-95 shrink-0"
            >
              <Calendar className="h-3.5 w-3.5" />
              {t('schedule')}
            </button>
          </div>

          {/* Recommendation 2: Skip irrigation */}
          <div className="flex flex-col gap-2 rounded-2xl border border-[#E8EBE5] bg-[#EAF5F7]/50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-[#354239] dark:bg-[#1E2A22]">
            <div>
              <h3 className="text-xs font-bold text-[#1E2A22] dark:text-white">
                {t('recommendSkipTitle')}
              </h3>
              <p className="mt-0.5 text-xs text-[#7B857E] dark:text-[#A8B3AA]">
                {t('recommendSkipBody')}
              </p>
            </div>
            <button
              onClick={skipIrrigation}
              className="inline-flex items-center gap-1.5 self-start rounded-xl bg-[#4A91C5] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#3978A6] active:scale-95 shrink-0"
            >
              <Droplets className="h-3.5 w-3.5" />
              {t('skipIrrigation')}
            </button>
          </div>

          {/* Recommendation 3: Plant crop */}
          <div className="flex flex-col gap-2 rounded-2xl border border-[#E8EBE5] bg-[#E8F3E9]/50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-[#354239] dark:bg-[#1E2A22]">
            <div>
              <h3 className="text-xs font-bold text-[#1E2A22] dark:text-white">
                {t('recommendPlantTitle')}
              </h3>
              <p className="mt-0.5 text-xs text-[#7B857E] dark:text-[#A8B3AA]">
                {t('recommendPlantBody')}
              </p>
            </div>
            <button
              onClick={plantCrop}
              className="inline-flex items-center gap-1.5 self-start rounded-xl bg-[#2F7D4E] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#25633E] active:scale-95 shrink-0"
            >
              <Sprout className="h-3.5 w-3.5" />
              {t('plantCrop')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
