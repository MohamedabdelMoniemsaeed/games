import React, { useState } from 'react';
import { useGame } from '../game/GameContext';
import { Panel, Bar } from './Common';
import { Trophy, Cloud, Sparkles, Copy, Check, Upload, ArrowRight } from 'lucide-react';

const QUEST_ICONS: Record<string, string> = {
  harvest: '🧺',
  sell: '💰',
  water: '💧',
  deliver: '📦',
};

export const QuestsView: React.FC = () => {
  const {
    tr,
    lang,
    streak,
    dailyAvailable,
    dailyReward,
    claimDaily,
    quests,
    claimQuest,
    achievements,
    claimAchievement,
    cloudSaveTime,
    manualCloudSave,
    exportSaveCode,
    importSaveCode,
    showToast,
  } = useGame();

  const [activeTab, setActiveTab] = useState<'daily' | 'achievements' | 'cloud'>('daily');
  const [importInput, setImportInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const handleClaimDaily = () => {
    const err = claimDaily();
    showToast(err);
  };

  const handleClaimQuest = (idx: number) => {
    const err = claimQuest(idx);
    showToast(err);
  };

  const handleCopyCode = () => {
    const code = exportSaveCode();
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(true);
      showToast(lang === 'ar' ? 'تم نسخ كود المزرعة بنجاح! 📋' : 'Farm code copied to clipboard! 📋');
      setTimeout(() => setCopiedCode(false), 2500);
    }).catch(() => {
      showToast(lang === 'ar' ? 'تعذر النسخ تلقائياً' : 'Could not copy');
    });
  };

  const handleImportSave = () => {
    if (!importInput.trim()) return;
    const res = importSaveCode(importInput.trim());
    if (res.success) {
      showToast(lang === 'ar' ? 'تم استرجاع المزرعة بنجاح! جاري التحديث...' : 'Farm restored! Reloading...');
    } else {
      showToast(lang === 'ar' ? 'كود غير صالح أو تالف!' : 'Invalid or corrupt farm code!');
    }
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="w-full max-w-lg mx-auto p-4 space-y-4">
      {/* Top Segmented Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-white/80 rounded-2xl border border-gray-200/70 shadow-2xs">
        <button
          onClick={() => setActiveTab('daily')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activeTab === 'daily'
              ? 'bg-[#2F7D4E] text-white shadow-xs'
              : 'text-[#7B857E] hover:text-[#1E2A22] hover:bg-gray-50'
          }`}
        >
          <span>🎯</span>
          <span>{lang === 'ar' ? 'المهام اليومية' : 'Daily Quests'}</span>
        </button>

        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer relative ${
            activeTab === 'achievements'
              ? 'bg-[#2F7D4E] text-white shadow-xs'
              : 'text-[#7B857E] hover:text-[#1E2A22] hover:bg-gray-50'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'أوسمة جوجل' : 'Google Play'}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-400 text-amber-950 font-black">
            {unlockedCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('cloud')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activeTab === 'cloud'
              ? 'bg-[#2F7D4E] text-white shadow-xs'
              : 'text-[#7B857E] hover:text-[#1E2A22] hover:bg-gray-50'
          }`}
        >
          <Cloud className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'السحابة' : 'Cloud'}</span>
        </button>
      </div>

      {/* ---------------- Tab 1: Daily Quests ---------------- */}
      {activeTab === 'daily' && (
        <div className="space-y-4 animate-fade-in">
          {/* Daily Gift Banner Card */}
          <Panel className="flex items-center gap-3 bg-linear-to-r from-white via-white to-[#E8F3E9]/70 border border-emerald-100 shadow-2xs">
            <span className="text-3xl select-none">🎁</span>
            <div className="flex-1">
              <h2 className="text-sm font-bold text-[#1E2A22]">{tr('dailyTitle')}</h2>
              <div className="text-xs text-[#7B857E] mt-0.5 flex items-center gap-1">
                <span>{tr('streak')}:</span>
                <span className="inline-flex items-center gap-0.5" dir="ltr">
                  <bdi>{streak}</bdi>
                  <span>🔥</span>
                </span>
              </div>
            </div>

            <button
              disabled={!dailyAvailable}
              onClick={handleClaimDaily}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold transition shadow-xs ${
                dailyAvailable
                  ? 'bg-[#2F7D4E] text-white hover:bg-[#286b43] active:scale-95 cursor-pointer animate-pulse'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {dailyAvailable ? (
                <span className="inline-flex items-center gap-1" dir="ltr">
                  <span>{tr('claim')}</span>
                  <span>+{dailyReward}</span>
                  <span>🪙</span>
                </span>
              ) : (
                tr('claimed')
              )}
            </button>
          </Panel>

          {/* Today's Quests */}
          <div className="space-y-2.5">
            <h2 className="text-base font-extrabold text-[#1E2A22]">
              {tr('questsTitle')}
            </h2>

            <div className="space-y-2.5">
              {quests.map((q, i) => {
                const shown = Math.min(q.progress, q.target);
                const isDone = q.progress >= q.target;
                const icon = QUEST_ICONS[q.type] || '🎯';

                return (
                  <Panel key={i} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl select-none">{icon}</span>
                      <div className="flex-1">
                        <span className="text-xs font-bold text-[#1E2A22]">
                          {tr(`q_${q.type}`)}
                        </span>
                        <span className="text-xs text-[#7B857E] ms-2">
                          <bdi dir="ltr">{shown} / {q.target}</bdi>
                        </span>
                      </div>

                      <button
                        disabled={!isDone || q.claimed}
                        onClick={() => handleClaimQuest(i)}
                        className={`py-1.5 px-3 rounded-xl text-xs font-bold transition ${
                          q.claimed
                            ? 'bg-gray-100 text-gray-500'
                            : isDone
                            ? 'bg-[#2F7D4E] text-white hover:bg-[#286b43] active:scale-95 cursor-pointer animate-bounce'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {q.claimed ? (
                          '✔'
                        ) : (
                          <span className="inline-flex items-center gap-0.5" dir="ltr">
                            <span>+{q.reward}</span>
                            <span>🪙</span>
                          </span>
                        )}
                      </button>
                    </div>

                    <Bar value={shown / q.target} color="#2F7D4E" height={6} />
                  </Panel>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Tab 2: Google Play Achievements & Trophies ---------------- */}
      {activeTab === 'achievements' && (
        <div className="space-y-3.5 animate-fade-in">
          {/* Header Summary */}
          <Panel className="p-3.5 bg-linear-to-r from-amber-500/10 via-amber-50 to-white border border-amber-200/80 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl select-none">🏆</span>
              <div>
                <h3 className="text-sm font-extrabold text-[#1E2A22]">
                  {lang === 'ar' ? 'أوسمة وإنجازات Google Play Games' : 'Google Play Games Achievements'}
                </h3>
                <p className="text-[11px] text-[#7B857E] mt-0.5">
                  {lang === 'ar' ? 'أكمل المهام لفتح الكؤوس والمكافآت النقدية' : 'Complete goals to unlock trophies and rewards'}
                </p>
              </div>
            </div>
            <div className="text-end">
              <span className="text-sm font-black text-amber-700" dir="ltr">
                {unlockedCount} / {achievements.length}
              </span>
            </div>
          </Panel>

          {/* Achievement Cards */}
          <div className="space-y-2.5">
            {achievements.map((a) => {
              const shown = Math.min(a.progress, a.target);
              const isRewardClaimable = a.unlocked && a.reward > 0;
              const isClaimed = a.unlocked && a.reward === 0;

              return (
                <Panel
                  key={a.id}
                  className={`space-y-2.5 transition border ${
                    a.unlocked
                      ? 'bg-white border-amber-200/80 shadow-2xs'
                      : 'bg-gray-50/60 border-gray-200/50 opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl select-none shrink-0 ${
                        a.unlocked
                          ? 'bg-amber-100/80 border border-amber-300 shadow-2xs text-amber-900'
                          : 'bg-gray-200/80 grayscale'
                      }`}
                    >
                      {a.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-sm font-black text-[#1E2A22] truncate">
                          {lang === 'ar' ? a.titleAr : a.titleEn}
                        </h4>
                        {a.unlocked && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full shrink-0">
                            🏆 {lang === 'ar' ? 'مفتوح' : 'Unlocked'}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#7B857E] mt-0.5 leading-relaxed">
                        {lang === 'ar' ? a.descAr : a.descEn}
                      </p>

                      <div className="flex items-center gap-3 mt-1.5 text-[11px] font-bold text-gray-500">
                        <span className="text-amber-600 flex items-center gap-0.5" dir="ltr">
                          <span>+{a.xp}</span>
                          <span>XP</span>
                        </span>
                        <span className="text-[#2F7D4E] flex items-center gap-0.5" dir="ltr">
                          <span>+{a.reward}</span>
                          <span>🪙</span>
                        </span>
                        <span className="ms-auto text-[#7B857E]" dir="ltr">
                          {shown} / {a.target}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <Bar
                    value={shown / a.target}
                    color={a.unlocked ? '#D97706' : '#2F7D4E'}
                    height={6}
                  />

                  {/* Claim Reward Button */}
                  {isRewardClaimable && (
                    <button
                      onClick={() => claimAchievement(a.id)}
                      className="w-full py-2 px-3 rounded-xl bg-amber-500 text-white font-black text-xs hover:bg-amber-600 active:scale-98 transition cursor-pointer shadow-xs flex items-center justify-center gap-1.5 animate-pulse"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? `استلم المكافأة (+${a.reward} 🪙)` : `Claim Reward (+${a.reward} 🪙)`}</span>
                    </button>
                  )}

                  {isClaimed && (
                    <div className="text-[10px] text-emerald-700 font-bold text-center bg-emerald-50 py-1 rounded-lg">
                      ✔ {lang === 'ar' ? 'تم استلام الجائزة بنجاح' : 'Reward claimed'}
                    </div>
                  )}
                </Panel>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------- Tab 3: Cloud Save & Transfer Code ---------------- */}
      {activeTab === 'cloud' && (
        <div className="space-y-4 animate-fade-in">
          {/* Cloud Sync Status Card */}
          <Panel className="p-4 bg-linear-to-r from-blue-500/10 via-blue-50 to-white border border-blue-200/80 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                <Cloud className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-extrabold text-[#1E2A22]">
                  {lang === 'ar' ? 'المزامنة السحابية (Google Play Saved Games)' : 'Google Play Cloud Sync'}
                </h3>
                <p className="text-[11px] text-[#7B857E] mt-0.5">
                  {lang === 'ar' ? `آخر مزامنة: ${cloudSaveTime}` : `Last synced: ${cloudSaveTime}`}
                </p>
              </div>
            </div>

            <button
              onClick={manualCloudSave}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-xs transition cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              <Cloud className="w-4 h-4" />
              <span>{lang === 'ar' ? 'مزامنة وحفظ سحابي فوري الآن' : 'Sync & Save to Cloud Now'}</span>
            </button>
          </Panel>

          {/* Export Backup Code Card */}
          <Panel className="space-y-2.5">
            <h4 className="text-sm font-bold text-[#1E2A22]">
              {lang === 'ar' ? '📋 تصدير كود المزرعة (نقل الحساب لهاتف آخر)' : '📋 Export Farm Code (Transfer to another device)'}
            </h4>
            <p className="text-xs text-[#7B857E] leading-relaxed">
              {lang === 'ar'
                ? 'انسخ كود النسخة الاحتياطية لتتمكن من استعادة مزرعتك وجميع عملاتك ومحاصيلك على أي هاتف أو جهاز كمبيوتر آخر في أي وقت.'
                : 'Copy your backup code to easily restore your farm, coins, and animals on any other phone or tablet anytime.'}
            </p>

            <button
              onClick={handleCopyCode}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                copiedCode
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 active:scale-98 border border-emerald-200'
              }`}
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? (lang === 'ar' ? 'تم نسخ الكود!' : 'Code Copied!') : (lang === 'ar' ? 'نسخ كود المزرعة بالكامل' : 'Copy Full Farm Backup Code')}</span>
            </button>
          </Panel>

          {/* Import Restore Code Card */}
          <Panel className="space-y-2.5">
            <h4 className="text-sm font-bold text-[#1E2A22]">
              {lang === 'ar' ? '🔄 استرجاع مزرعة من كود سابق' : '🔄 Restore Farm from Backup Code'}
            </h4>
            <p className="text-xs text-[#7B857E] leading-relaxed">
              {lang === 'ar'
                ? 'الصق كود المزرعة المحفوظ سابقاً لاستعادة تقدمك فوراً:'
                : 'Paste a previously exported farm backup code to restore immediately:'}
            </p>

            <div className="space-y-2">
              <textarea
                value={importInput}
                onChange={(e) => setImportInput(e.target.value)}
                placeholder={lang === 'ar' ? 'الصق كود المزرعة هنا (FARM-...)' : 'Paste farm backup code here (FARM-...)'}
                className="w-full h-18 p-2.5 text-xs font-mono rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-[#1E2A22]"
                dir="ltr"
              />

              <button
                onClick={handleImportSave}
                disabled={!importInput.trim()}
                className="w-full py-2.5 px-4 rounded-xl bg-[#2F7D4E] hover:bg-[#25633E] active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs transition cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>{lang === 'ar' ? 'استعادة وتطبيق بيانات المزرعة' : 'Restore & Load Farm'}</span>
              </button>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
};
