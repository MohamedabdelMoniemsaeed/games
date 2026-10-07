import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { Droplets, CheckCircle2, AlertTriangle, Layers, X } from 'lucide-react';

interface SmartWateringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartWateringModal: React.FC<SmartWateringModalProps> = ({ isOpen, onClose }) => {
  const { t, fields, weather, applySmartWatering, formatNum } = useFarm();
  const [selectedFieldId, setSelectedFieldId] = useState(fields[0]?.id || '');
  const [litersToApply, setLitersToApply] = useState(620);

  if (!isOpen) return null;

  const currentField = fields.find((f) => f.id === selectedFieldId) || fields[0];

  const handleIrrigate = () => {
    applySmartWatering(selectedFieldId, litersToApply);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:border dark:border-[#354239] dark:bg-[#243128]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="rounded-2xl bg-[#2F7D4E]/10 p-2.5 text-[#2F7D4E]">
              <Droplets className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#1E2A22] dark:text-white">
                {t('smartWateringTitle')}
              </h3>
              <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
                {t('smartWateringSubtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#7B857E] hover:bg-gray-100 dark:hover:bg-[#1E2A22]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Field Selector */}
        <div className="mt-5">
          <label className="text-xs font-bold text-[#1E2A22] dark:text-white">
            {t('fieldName')}
          </label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {fields.map((field) => (
              <button
                key={field.id}
                type="button"
                onClick={() => {
                  setSelectedFieldId(field.id);
                  setLitersToApply(field.type === 'tomato' ? 620 : 450);
                }}
                className={`rounded-2xl border p-2.5 text-center transition ${
                  selectedFieldId === field.id
                    ? 'border-[#2F7D4E] bg-[#E8F3E9] text-[#2F7D4E] font-bold dark:bg-[#2F7D4E]/25 dark:text-[#9FCB88]'
                    : 'border-[#E8EBE5] bg-white text-[#7B857E] hover:bg-gray-50 dark:border-[#354239] dark:bg-[#1E2A22] dark:text-[#A8B3AA]'
                }`}
              >
                <p className="text-xs truncate">{field.name}</p>
                <p className="text-[10px] mt-0.5">{field.growthPercent}%</p>
              </button>
            ))}
          </div>
        </div>

        {/* Telemetry info */}
        <div className="mt-4 rounded-2xl bg-[#F6F4EA] p-4 text-xs dark:bg-[#1E2A22]">
          <div className="flex justify-between items-center py-1">
            <span className="text-[#7B857E]">{t('temperature')}:</span>
            <span className="font-bold text-[#1E2A22] dark:text-white">{weather.temperature}°C ({t(weather.soilStatusKey)})</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-[#7B857E]">{t('waterReserve')}:</span>
            <span className="font-bold text-[#4A91C5]">
              {formatNum(weather.waterStoredLiters)} L ({weather.waterTankPercent}%)
            </span>
          </div>
          <div className="flex justify-between items-center py-1 border-t border-[#E8EBE5] mt-1 pt-1 dark:border-[#354239]">
            <span className="font-bold text-[#1E2A22] dark:text-white">{t('avgYield')}:</span>
            <span className="font-extrabold text-[#2F7D4E]">
              {formatNum(litersToApply)} L {t('yieldUnit')}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-[#E8EBE5] py-3 text-xs font-bold text-[#7B857E] hover:bg-gray-50 dark:border-[#354239]"
          >
            {t('cancel')}
          </button>
          <button
            type="button"
            onClick={handleIrrigate}
            className="flex-2 rounded-2xl bg-[#2F7D4E] py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#25633E] active:scale-98"
          >
            {t('irrigateNow')} ({formatNum(litersToApply)} L)
          </button>
        </div>
      </div>
    </div>
  );
};
