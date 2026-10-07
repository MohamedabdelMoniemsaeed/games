import React from 'react';

export const Pill: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#1E2A22] text-sm font-bold shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#E8EBE5]/60 select-none ${className}`}
  >
    {children}
  </div>
);

export const Panel: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = '', onClick }) => (
  <div
    onClick={onClick}
    className={`w-full p-4 rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-[#E8EBE5]/70 transition ${
      onClick ? 'cursor-pointer active:scale-[0.99]' : ''
    } ${className}`}
  >
    {children}
  </div>
);

export const Bar: React.FC<{
  value: number; // 0..1
  color?: string;
  height?: number;
  className?: string;
}> = ({ value, color = '#2F7D4E', height = 8, className = '' }) => {
  const clamped = Math.max(0, Math.min(1, isNaN(value) ? 0 : value));
  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-black/8 relative ${className}`}
      style={{ height: `${height}px` }}
    >
      <div
        className="h-full rounded-full transition-all duration-300 ease-out"
        style={{
          width: `${clamped * 100}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export const WatchAdModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onWatch: () => void;
  tr: (key: string) => string;
}> = ({ isOpen, onClose, onWatch, tr }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 text-[#1E2A22]">
        <div className="text-3xl mb-3 text-center">📺</div>
        <h3 className="text-lg font-black text-center mb-2">{tr('adTitle')}</h3>
        <p className="text-sm text-[#7B857E] text-center mb-6 leading-relaxed">
          {tr('adBody')}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-[#7B857E] hover:bg-gray-50 active:scale-98 transition"
          >
            {tr('cancel')}
          </button>
          <button
            onClick={() => {
              onWatch();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-[#2F7D4E] text-white text-sm font-bold shadow-md hover:bg-[#276a42] active:scale-98 transition"
          >
            {tr('watch')}
          </button>
        </div>
      </div>
    </div>
  );
};
