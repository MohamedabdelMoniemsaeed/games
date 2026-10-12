import React from 'react';
import { useGame } from '../game/GameContext';
import { kEmoji, kSpoil } from '../game/constants';
import { Panel, Pill, Bar } from './Common';

export const OrdersView: React.FC = () => {
  const { tr, inventory, storedCount, storageCap, orders, demand, priceOf, sell } = useGame();

  const inventoryItems = Object.entries(inventory).filter(([, qty]) => qty > 0);

  return (
    <div className="w-full max-w-lg mx-auto p-4 space-y-5">
      {/* 1. Inventory / Barn Storage */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#1E2A22]">
            {tr('inventory')} · {tr('storage')} <bdi dir="ltr">{storedCount} / {storageCap}</bdi>
          </h2>
          {storedCount >= storageCap && (
            <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
              {tr('storageFull')}
            </span>
          )}
        </div>

        {inventoryItems.length === 0 ? (
          <p className="text-xs text-[#7B857E] bg-white/60 p-4 rounded-xl border border-dashed border-gray-300">
            {tr('inventoryEmpty')}
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {inventoryItems.map(([item, qty]) => (
              <Pill key={item}>
                <span>{kEmoji[item] || '📦'}</span>
                <bdi dir="ltr">×{qty}</bdi>
                {(kSpoil[item] || 0) >= 0.3 && (
                  <span className="text-[10px] opacity-75" title={tr('perishable')}>
                    ⏳
                  </span>
                )}
              </Pill>
            ))}
          </div>
        )}

        {/* Silo feed stock preview */}
        <SiloFeedCard />
      </section>

      {/* 2. Customer orders with deadlines */}
      <section className="space-y-2.5">
        <h2 className="text-base font-extrabold text-[#1E2A22]">
          {tr('ordersTitle')}
        </h2>

        <div className="space-y-2">
          {orders.map((_, i) => (
            <OrderCard key={i} index={i} />
          ))}
        </div>
      </section>

      {/* 3. Market / Live Selling */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#1E2A22]">
            {tr('sellTitle')}
          </h2>
          <span className="text-[11px] text-[#7B857E]">
            {tr('market')}
          </span>
        </div>

        {inventoryItems.length === 0 ? (
          <p className="text-xs text-[#7B857E]">
            {tr('inventoryEmpty')}
          </p>
        ) : (
          <div className="space-y-2">
            {inventoryItems.map(([item, qty]) => {
              const currentPrice = priceOf(item);
              const totalEarnings = qty * currentPrice;
              const d = demand[item] ?? 1.0;
              const arrow = d > 1.05 ? '▲' : d < 0.95 ? '▼' : '•';
              const arrowColor =
                d > 1.05 ? 'text-[#2F7D4E]' : d < 0.95 ? 'text-red-600' : 'text-[#7B857E]';
              const spoils = (kSpoil[item] || 0) >= 0.3;

              return (
                <Panel key={item} className="flex items-center gap-3">
                  <span className="text-3xl select-none">{kEmoji[item]}</span>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-[#1E2A22] flex items-center gap-1">
                      <span>{tr(item)}</span>
                      <bdi dir="ltr">×{qty}</bdi>
                    </div>
                    <div className={`text-xs font-semibold mt-0.5 ${arrowColor} flex items-center gap-1`}>
                      <span className="inline-flex items-center gap-0.5" dir="ltr">
                        <span>{currentPrice}</span>
                        <span>🪙</span>
                        <span>{arrow}</span>
                      </span>
                      {spoils && <span>⏳</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => sell(item, false)}
                      className="py-1.5 px-3 rounded-lg text-xs font-bold text-[#2F7D4E] hover:bg-[#2F7D4E]/10 active:scale-95 transition cursor-pointer"
                    >
                      {tr('sellOne')}
                    </button>

                    <button
                      onClick={() => sell(item, true)}
                      className="py-1.5 px-3 rounded-lg bg-[#E8F3E9] text-[#2F7D4E] hover:bg-[#d8edd9] text-xs font-bold active:scale-95 transition cursor-pointer flex items-center gap-1"
                    >
                      <span>{tr('sellAll')}</span>
                      <span className="inline-flex items-center gap-0.5" dir="ltr">
                        <span>{totalEarnings}</span>
                        <span>🪙</span>
                      </span>
                    </button>
                  </div>
                </Panel>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

const OrderCard: React.FC<{ index: number }> = ({ index }) => {
  const { orders, inventory, dayCount, tr, deliver, showToast } = useGame();
  const o = orders[index];
  const have = inventory[o.item] || 0;
  const left = o.due - dayCount;
  const canDeliver = have >= o.qty;

  const handleDeliver = () => {
    const err = deliver(index);
    showToast(err);
  };

  return (
    <Panel className="flex items-center gap-3">
      <span className="text-3xl select-none">{kEmoji[o.item]}</span>
      <div className="flex-1">
        <div className="text-sm font-bold text-[#1E2A22] flex items-center gap-1">
          <span>{tr(o.item)}</span>
          <bdi dir="ltr">×{o.qty}</bdi>
        </div>
        <div
          className={`text-xs font-medium mt-0.5 flex items-center gap-1.5 flex-wrap ${
            left <= 0 ? 'text-red-600 font-bold' : 'text-[#7B857E]'
          }`}
        >
          <bdi dir="ltr">{have} / {o.qty}</bdi>
          <span>·</span>
          <span>{left <= 0 ? tr('dueToday') : <><bdi dir="ltr">{left}</bdi> {tr('daysLeft')}</>}</span>
        </div>
      </div>

      <button
        disabled={!canDeliver}
        onClick={handleDeliver}
        className={`py-2 px-3.5 rounded-xl text-xs font-bold transition shadow-xs ${
          canDeliver
            ? 'bg-[#2F7D4E] text-white hover:bg-[#286b43] active:scale-95 cursor-pointer'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        <span className="inline-flex items-center gap-0.5" dir="ltr">
          <span>{tr('deliver')}</span>
          <span>+{o.reward}</span>
          <span>🪙</span>
        </span>
      </button>
    </Panel>
  );
};

const SiloFeedCard: React.FC = () => {
  const { tr, silo, siloCap, seasonFeedPrice, buyFeed, showToast } = useGame();

  const handleBuy = (bulk: boolean) => {
    const err = buyFeed(bulk);
    showToast(err);
  };

  const cost1 = seasonFeedPrice;
  const cost5 = Math.round(5 * seasonFeedPrice * 0.85);

  return (
    <Panel className="p-3 bg-amber-50/40 border border-amber-200/50 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="text-2xl select-none">🌾</span>
        <div>
          <div className="text-xs font-extrabold text-[#1E2A22]">
            {tr('silo')}: <bdi dir="ltr">{silo} / {siloCap}</bdi>
          </div>
          <div className="w-24 mt-1">
            <Bar value={silo / siloCap} color="#D97706" height={6} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => handleBuy(false)}
          className="py-1 px-2.5 rounded-lg bg-white border border-gray-200 text-[11px] font-bold text-[#1E2A22] hover:bg-amber-100/50 active:scale-95 transition cursor-pointer shadow-2xs"
          title={tr('buyFeed1')}
        >
          <span className="inline-flex items-center gap-0.5" dir="ltr">
            <span>+10</span>
            <span>(</span>
            <span className="text-[#2F7D4E] font-extrabold">{cost1}</span>
            <span>🪙</span>
            <span>)</span>
          </span>
        </button>
        <button
          onClick={() => handleBuy(true)}
          className="py-1 px-2.5 rounded-lg bg-[#2F7D4E] text-white text-[11px] font-bold hover:bg-[#286b43] active:scale-95 transition cursor-pointer shadow-2xs"
          title={tr('buyFeed5')}
        >
          <span className="inline-flex items-center gap-0.5" dir="ltr">
            <span>+50</span>
            <span>(</span>
            <span className="text-amber-200 font-extrabold">{cost5}</span>
            <span>🪙</span>
            <span>)</span>
          </span>
        </button>
      </div>
    </Panel>
  );
};
