import React from 'react';
import { useGame } from '../game/GameContext';
import { kEmoji, kPrice } from '../game/constants';
import { Panel, Pill } from './Common';

export const OrdersView: React.FC = () => {
  const { tr, inventory, orders, sell } = useGame();

  const inventoryItems = Object.entries(inventory).filter(([, qty]) => qty > 0);

  return (
    <div className="w-full max-w-lg mx-auto p-4 space-y-5">
      {/* 1. Inventory / Your harvest */}
      <section className="space-y-2.5">
        <h2 className="text-base font-extrabold text-[#1E2A22]">
          {tr('inventory')}
        </h2>

        {inventoryItems.length === 0 ? (
          <p className="text-xs text-[#7B857E] bg-white/60 p-4 rounded-xl border border-dashed border-gray-300">
            {tr('inventoryEmpty')}
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {inventoryItems.map(([item, qty]) => (
              <Pill key={item}>
                <span>{kEmoji[item] || '📦'}</span>
                <span>×{qty}</span>
              </Pill>
            ))}
          </div>
        )}
      </section>

      {/* 2. Customer orders */}
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

      {/* 3. Sell at the market */}
      <section className="space-y-2.5">
        <h2 className="text-base font-extrabold text-[#1E2A22]">
          {tr('sellTitle')}
        </h2>

        {inventoryItems.length === 0 ? (
          <p className="text-xs text-[#7B857E]">
            {tr('inventoryEmpty')}
          </p>
        ) : (
          <div className="space-y-2">
            {inventoryItems.map(([item, qty]) => {
              const priceEach = kPrice[item] || 0;
              const totalReward = qty * priceEach;

              return (
                <Panel key={item} className="flex items-center gap-3">
                  <span className="text-3xl select-none">{kEmoji[item]}</span>
                  <div className="flex-1">
                    <span className="text-sm font-bold text-[#1E2A22]">
                      {tr(item)} ×{qty}
                    </span>
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
                      className="py-1.5 px-3 rounded-lg bg-[#E8F3E9] text-[#2F7D4E] hover:bg-[#d8edd9] text-xs font-bold active:scale-95 transition cursor-pointer"
                    >
                      {tr('sellAll')} {totalReward} 🪙
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
  const { orders, inventory, tr, deliver, showToast } = useGame();
  const o = orders[index];
  const have = inventory[o.item] || 0;
  const canDeliver = have >= o.qty;

  const handleDeliver = () => {
    const err = deliver(index);
    showToast(err);
  };

  return (
    <Panel className="flex items-center gap-3">
      <span className="text-3xl select-none">{kEmoji[o.item]}</span>
      <div className="flex-1">
        <div className="text-sm font-bold text-[#1E2A22]">
          {tr(o.item)} ×{o.qty}
        </div>
        <div className="text-xs text-[#7B857E] mt-0.5">
          {have} / {o.qty}
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
        {tr('deliver')} +{o.reward} 🪙
      </button>
    </Panel>
  );
};
