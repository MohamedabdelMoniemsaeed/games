import React, { useState } from 'react';
import {
  useGame,
  MAX_PLOTS,
  MAX_TANK_LEVEL,
  MAX_PEN,
  MAX_BARN,
  MAX_SILO,
} from '../game/GameContext';
import { UpgradeType } from '../game/models';
import { Panel, WatchAdModal, Bar } from './Common';

interface UpgradeDisplay {
  icon: string;
  nameKey: string;
  descKey: string;
  countText: React.ReactNode;
}

export const ShopView: React.FC = () => {
  const {
    tr,
    tankLevel,
    plots,
    sprinkler,
    penSize,
    barnLevel,
    silo,
    siloCap,
    siloLevel,
    seasonFeedPrice,
    buyFeed,
    upgradeCost,
    upgradeMaxed,
    buyUpgrade,
    rewardRefill,
    showToast,
    lang,
  } = useGame();

  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const upgrades: Record<UpgradeType, UpgradeDisplay> = {
    tank: {
      icon: '🛢️',
      nameKey: 'upTank',
      descKey: 'upTankD',
      countText: <bdi dir="ltr">{tankLevel} / {MAX_TANK_LEVEL}</bdi>,
    },
    plot: {
      icon: '🟫',
      nameKey: 'upPlot',
      descKey: 'upPlotD',
      countText: <bdi dir="ltr">{plots.length} / {MAX_PLOTS}</bdi>,
    },
    sprinkler: {
      icon: '💦',
      nameKey: 'upSprinkler',
      descKey: 'upSprinklerD',
      countText: sprinkler ? tr('owned') : '',
    },
    pen: {
      icon: '🏠',
      nameKey: 'upPen',
      descKey: 'upPenD',
      countText: <bdi dir="ltr">{penSize} / {MAX_PEN}</bdi>,
    },
    barn: {
      icon: '🏚️',
      nameKey: 'upBarn',
      descKey: 'upBarnD',
      countText: <bdi dir="ltr">{barnLevel} / {MAX_BARN}</bdi>,
    },
    silo: {
      icon: '🌾',
      nameKey: 'upSilo',
      descKey: 'upSiloD',
      countText: <bdi dir="ltr">{siloLevel} / {MAX_SILO}</bdi>,
    },
  };

  const handleBuy = (u: UpgradeType) => {
    const err = buyUpgrade(u);
    showToast(err);
  };

  const handleBuyFeed = (bulk: boolean) => {
    const err = buyFeed(bulk);
    showToast(err);
  };

  const handleWatchAd = () => {
    rewardRefill();
    showToast('tankFull');
  };

  const cost1 = seasonFeedPrice;
  const cost5 = Math.round(5 * seasonFeedPrice * 0.85);

  return (
    <>
      <div className="w-full max-w-lg mx-auto p-4 space-y-4">
        {/* 1. Finance Panel */}
        <FinancePanel />

        {/* 2. Feed System: Buy Feed Panel */}
        <Panel className="space-y-3 border border-amber-200/60 bg-linear-to-b from-white to-amber-50/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl select-none">🌾</span>
              <div>
                <h3 className="text-sm font-extrabold text-[#1E2A22]">
                  {tr('buyFeed')}
                </h3>
                <span className="text-[11px] text-[#7B857E] flex items-center gap-1">
                  <span>{tr('feedPriceNote')}:</span>
                  <span className="font-bold inline-flex items-center gap-0.5" dir="ltr">
                    <span>{seasonFeedPrice}</span>
                    <span>🪙</span>
                  </span>
                </span>
              </div>
            </div>
            <div className="text-end">
              <span className="text-xs font-bold text-[#2F7D4E]">
                <bdi dir="ltr">{silo} / {siloCap}</bdi>
              </span>
              <div className="w-20 mt-1">
                <Bar value={silo / siloCap} color="#D97706" height={6} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => handleBuyFeed(false)}
              className="py-2 px-3 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#1E2A22] hover:bg-amber-50/50 active:scale-95 transition cursor-pointer shadow-2xs flex flex-col items-center"
            >
              <span>{tr('buyFeed1')}</span>
              <span className="inline-flex items-center gap-0.5 text-[#2F7D4E] font-black mt-0.5" dir="ltr">
                <span>{cost1}</span>
                <span>🪙</span>
              </span>
            </button>
            <button
              onClick={() => handleBuyFeed(true)}
              className="py-2 px-3 rounded-xl bg-[#2F7D4E] text-white text-xs font-bold hover:bg-[#286b43] active:scale-95 transition cursor-pointer shadow-2xs flex flex-col items-center"
            >
              <span>{tr('buyFeed5')}</span>
              <span className="inline-flex items-center gap-0.5 text-amber-200 font-black mt-0.5" dir="ltr">
                <span>{cost5}</span>
                <span>🪙</span>
              </span>
            </button>
          </div>
        </Panel>

        {/* 3. Upgrades List */}
        <div className="space-y-2.5">
          <h2 className="text-base font-extrabold text-[#1E2A22]">
            {tr('shop')}
          </h2>

          {(Object.keys(upgrades) as UpgradeType[]).map((key) => {
            const item = upgrades[key];
            const isMaxed = upgradeMaxed(key);
            const cost = upgradeCost(key);

            return (
              <Panel key={key} className="flex items-center gap-3">
                <span className="text-3xl select-none">{item.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#1E2A22]">
                    {tr(item.nameKey)}
                  </div>
                  <div className="text-xs text-[#7B857E] mt-0.5">
                    {tr(item.descKey)}
                  </div>
                  {item.countText && (
                    <div className="text-xs font-bold text-[#2F7D4E] mt-0.5">
                      {item.countText}
                    </div>
                  )}
                </div>

                <button
                  disabled={isMaxed}
                  onClick={() => handleBuy(key)}
                  className={`py-2 px-3.5 rounded-xl text-xs font-bold transition shadow-xs ${
                    isMaxed
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#2F7D4E] text-white hover:bg-[#286b43] active:scale-95 cursor-pointer'
                  }`}
                >
                  {isMaxed ? (
                    tr('max')
                  ) : (
                    <span className="inline-flex items-center gap-1" dir="ltr">
                      <span>{cost}</span>
                      <span>🪙</span>
                    </span>
                  )}
                </button>
              </Panel>
            );
          })}

          {/* Refill Tank via Ad panel */}
          <Panel className="flex items-center gap-3 bg-linear-to-r from-white to-[#E8F3E9]/50">
            <span className="text-3xl select-none">📺</span>
            <div className="flex-1">
              <span className="text-sm font-bold text-[#1E2A22]">
                {tr('watchAd')}
              </span>
            </div>
            <button
              onClick={() => setIsAdModalOpen(true)}
              className="py-2 px-3.5 rounded-xl bg-[#E8F3E9] text-[#2F7D4E] text-xs font-bold hover:bg-[#d5ebd7] active:scale-95 transition cursor-pointer"
            >
              {tr('watch')}
            </button>
          </Panel>

          {/* Privacy Policy & Google Play Family Safety link */}
          <div className="pt-2 text-center">
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="text-xs text-[#7B857E] hover:text-[#2F7D4E] underline font-medium cursor-pointer transition"
            >
              {lang === 'ar' ? '🛡️ سياسة الخصوصية وأمان العائلة (Google Play)' : '🛡️ Privacy Policy & Family Safety'}
            </button>
          </div>
        </div>
      </div>

      <WatchAdModal
        isOpen={isAdModalOpen}
        onClose={() => setIsAdModalOpen(false)}
        onWatch={handleWatchAd}
        tr={tr}
      />

      {isPrivacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-gray-100 text-[#1E2A22] space-y-3.5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-base font-extrabold flex items-center gap-1.5">
                <span>🛡️</span>
                <span>{lang === 'ar' ? 'سياسة الخصوصية وأمان العائلة' : 'Privacy & Family Safety'}</span>
              </h3>
              <button
                onClick={() => setIsPrivacyOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-[#7B857E] space-y-2.5 leading-relaxed">
              <p>
                {lang === 'ar'
                  ? 'تلتزم لعبة أصدقاء المزرعة (Farm Friends) بأعلى معايير الخصوصية وأمان الأطفال والعائلات وفق متطلبات متجر Google Play وسياسات حماية بيانات الأسرة.'
                  : 'Farm Friends complies with Google Play Families Policy and strict COPPA / GDPR child privacy requirements.'}
              </p>
              <div className="rounded-2xl bg-emerald-50/70 border border-emerald-100 p-3 text-[#2F7D4E] font-medium space-y-1.5 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span>✔</span>
                  <span>{lang === 'ar' ? 'لا يتم جمع أو تخزين أي بيانات شخصية أو معلومات تعريفية.' : 'Zero personal data collection or behavioral tracking.'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>✔</span>
                  <span>{lang === 'ar' ? 'حفظ تقدم المزرعة يتم محلياً وبأمان تام على ذاكرة جهازك فقط.' : 'Progress is stored 100% locally on your device.'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>✔</span>
                  <span>{lang === 'ar' ? 'محتوى آمن ونقي تماماً لجميع الفئات العمرية والأطفال.' : '100% kid-safe, wholesome, and family-friendly.'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>✔</span>
                  <span>{lang === 'ar' ? 'اللعبة تعمل بالكامل أوفلاين دون الحاجة للاتصال بالإنترنت.' : 'Fully playable offline without continuous internet.'}</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 text-center">
                {lang === 'ar' ? 'الإصدار 1.0.0 · معتمدة لمتجر Google Play Store' : 'Version 1.0.0 · Google Play Ready'}
              </p>
            </div>

            <button
              onClick={() => setIsPrivacyOpen(false)}
              className="w-full py-2.5 rounded-2xl bg-[#2F7D4E] text-white font-bold text-xs hover:bg-[#25633E] active:scale-95 transition cursor-pointer shadow-sm"
            >
              {lang === 'ar' ? 'حسناً، فهمت' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const FinancePanel: React.FC = () => {
  const {
    tr,
    incomeToday,
    expenseToday,
    lastIncome,
    lastExpense,
    feedExpenseToday,
    lastFeedExpense,
    upkeep,
  } = useGame();

  const renderColumn = (label: string, income: number, expense: number, feedCost: number) => {
    const profit = income - expense;
    return (
      <div className="flex-1 text-center bg-gray-50/70 p-2.5 rounded-xl">
        <div className="text-xs font-bold text-[#1E2A22] mb-1">{label}</div>
        <div className="text-xs text-[#2F7D4E] font-semibold">
          <bdi dir="ltr">+{income}</bdi>
        </div>
        <div className="text-xs text-red-600 font-semibold">
          <bdi dir="ltr">-{expense}</bdi>
        </div>
        {feedCost > 0 && (
          <div className="text-[10px] text-amber-700 font-medium">
            <span className="inline-flex items-center gap-0.5" dir="ltr">
              <span>🌾</span>
              <bdi>-{feedCost}</bdi>
            </span>
          </div>
        )}
        <div
          className={`text-xs font-extrabold mt-1 pt-1 border-t border-gray-200 ${
            profit >= 0 ? 'text-[#2F7D4E]' : 'text-red-600'
          }`}
        >
          <bdi dir="ltr">{profit >= 0 ? `+${profit}` : profit}</bdi>
        </div>
      </div>
    );
  };

  return (
    <Panel className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-extrabold text-[#1E2A22]">
          📊 {tr('finance')}
        </h2>
        <span className="text-[11px] text-[#7B857E]">
          {tr('income')} / {tr('expenses')} / {tr('profit')}
        </span>
      </div>

      <div className="flex gap-2">
        {renderColumn(tr('today'), incomeToday, expenseToday, feedExpenseToday)}
        {renderColumn(tr('yesterday'), lastIncome, lastExpense, lastFeedExpense)}
      </div>

      <div className="text-xs text-[#7B857E] pt-1 border-t border-gray-100 flex items-center justify-between">
        <span>{tr('upkeepNote')}:</span>
        <span className="font-bold text-[#1E2A22] inline-flex items-center gap-1" dir="ltr">
          <span>{upkeep}</span>
          <span>🪙</span>
          <span>/</span>
          <span>{tr('day')}</span>
        </span>
      </div>
    </Panel>
  );
};
