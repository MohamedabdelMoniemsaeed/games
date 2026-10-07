import React, { useState } from 'react';
import { FarmZone } from '../types';
import { useFarm } from '../context/FarmContext';

interface FarmMapProps {
  interactive?: boolean;
  className?: string;
}

// Bounding boxes in 760 x 1000 map coordinates
const zoneViewBoxes: Record<FarmZone, string> = {
  overview: '0 0 760 1000',
  farmHouse: '10 10 340 300',
  tomatoField: '350 10 400 300',
  vegetableField: '10 340 340 400',
  cornField: '370 340 380 400',
  animalArea: '10 780 400 210',
  waterTank: '400 780 350 210',
};

export const FarmMap: React.FC<FarmMapProps> = ({ interactive = true, className = '' }) => {
  const { selectedZone, setSelectedZone, locale, t } = useFarm();
  const isRtl = locale === 'ar';

  const [hoveredZone, setHoveredZone] = useState<FarmZone | null>(null);

  const handleZoneClick = (zone: FarmZone) => {
    if (!interactive) return;
    setSelectedZone(selectedZone === zone ? 'overview' : zone);
  };

  const isSelected = (zone: FarmZone) => selectedZone === zone;
  const isDimmed = (zone: FarmZone) => selectedZone !== 'overview' && selectedZone !== zone;

  const currentViewBox = zoneViewBoxes[selectedZone] || zoneViewBoxes.overview;

  return (
    <div className={`relative w-full overflow-hidden rounded-3xl border border-[#E8EBE5] bg-[#9FCB88] shadow-sm select-none dark:border-[#354239] ${className}`}>
      <svg
        viewBox={currentViewBox}
        className="w-full h-auto transition-all duration-700 ease-in-out"
        style={{ touchAction: 'manipulation' }}
      >
        <defs>
          <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D87560" />
            <stop offset="100%" stopColor="#B84E40" />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#78C4D5" />
            <stop offset="100%" stopColor="#5598B1" />
          </linearGradient>
          <filter id="zoneGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="8" floodColor="#FFFFFF" floodOpacity="0.8" />
          </filter>

          {/* Ambient animations */}
          <style>{`
            @keyframes tractorMove {
              0% { transform: translate(374px, 755px); }
              50% { transform: translate(374px, 775px); }
              100% { transform: translate(374px, 755px); }
            }
            @keyframes rippleEffect {
              0% { r: 15px; opacity: 0.8; }
              50% { r: 40px; opacity: 0.4; }
              100% { r: 65px; opacity: 0; }
            }
            @keyframes swayCrop {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(2deg); }
            }
            @keyframes cloudDrift {
              0% { transform: translate(-100px, 100px); }
              100% { transform: translate(800px, 400px); }
            }
            .tractor-anim { animation: tractorMove 8s ease-in-out infinite; }
            .water-ripple { animation: rippleEffect 3.5s cubic-bezier(0, 0.2, 0.8, 1) infinite; }
            .cloud-shadow { animation: cloudDrift 45s linear infinite; }
          `}</style>
        </defs>

        {/* 1. Base pasture grass */}
        <rect width="760" height="1000" fill="#9FCB88" />

        {/* 2. Drifting cloud shadows */}
        <g className="cloud-shadow pointer-events-none opacity-20">
          <ellipse cx="200" cy="200" rx="140" ry="60" fill="#000000" />
          <ellipse cx="280" cy="230" rx="110" ry="50" fill="#000000" />
        </g>

        {/* 3. Main farm roads */}
        {/* Horizontal Road 1 */}
        <rect x="0" y="295" width="760" height="54" fill="#C5B38F" />
        <rect x="0" y="302" width="760" height="40" fill="#D9C8A8" />
        {/* Horizontal Road 2 */}
        <rect x="0" y="735" width="760" height="56" fill="#C5B38F" />
        <rect x="0" y="742" width="760" height="42" fill="#D9C8A8" />
        {/* Vertical Road */}
        <rect x="340" y="0" width="30" height="1000" fill="#C5B38F" />
        <rect x="345" y="0" width="20" height="1000" fill="#D9C8A8" />

        {/* Road dashes */}
        {[14, 90, 166, 242, 390, 466, 542, 618, 694].map((x) => (
          <React.Fragment key={x}>
            <rect x={x} y="320" width="34" height="4" rx="2" fill="#EFE5D1" />
            <rect x={x} y="761" width="34" height="4" rx="2" fill="#EFE5D1" />
          </React.Fragment>
        ))}

        {/* Animated Tractor */}
        <g className="tractor-anim">
          <rect x="-14" y="-8" width="28" height="16" rx="4" fill="#5B9D4B" stroke="#38433A" strokeWidth="1" />
          <rect x="-6" y="-10" width="12" height="20" rx="3" fill="#3D6836" />
          <circle cx="-9" cy="-9" r="4.5" fill="#353D38" />
          <circle cx="-9" cy="9" r="4.5" fill="#353D38" />
          <circle cx="9" cy="-8" r="3.5" fill="#353D38" />
          <circle cx="9" cy="8" r="3.5" fill="#353D38" />
          <rect x="10" y="-3" width="5" height="6" fill="#E7BE5D" />
        </g>

        {/* 4. ZONE: FARM HOUSE (x: 20, y: 20, w: 320, h: 270) */}
        <g
          className={`cursor-pointer transition-all duration-300 ${
            isDimmed('farmHouse') ? 'opacity-30' : 'opacity-100'
          }`}
          onClick={() => handleZoneClick('farmHouse')}
          onMouseEnter={() => setHoveredZone('farmHouse')}
          onMouseLeave={() => setHoveredZone(null)}
        >
          <rect
            x="20"
            y="20"
            width="320"
            height="270"
            rx="22"
            fill="#8FC67D"
            stroke={isSelected('farmHouse') ? '#FFFFFF' : hoveredZone === 'farmHouse' ? '#2F7D4E' : 'transparent'}
            strokeWidth={isSelected('farmHouse') ? '6' : '3'}
            filter={isSelected('farmHouse') ? 'url(#zoneGlow)' : undefined}
          />
          {/* Driveway */}
          <rect x="230" y="160" width="110" height="70" rx="8" fill="#B8A786" />
          {/* Pickup truck */}
          <g transform="translate(265, 185)">
            <rect x="-18" y="-10" width="36" height="20" rx="4" fill="#5B91A1" />
            <rect x="-6" y="-8" width="16" height="16" rx="2" fill="#B5D9E0" />
            <circle cx="-12" cy="-11" r="3.5" fill="#353D38" />
            <circle cx="-12" cy="11" r="3.5" fill="#353D38" />
            <circle cx="12" cy="-11" r="3.5" fill="#353D38" />
            <circle cx="12" cy="11" r="3.5" fill="#353D38" />
          </g>
          {/* House body */}
          <rect x="70" y="86" width="155" height="120" rx="8" fill="#F2E4C6" stroke="#D9C8A8" strokeWidth="2" />
          {/* House Roof */}
          <polygon points="50,95 147,30 245,95" fill="url(#roofGrad)" />
          <line x1="147" y1="35" x2="147" y2="95" stroke="#D87560" strokeWidth="3" />
          {/* Door */}
          <rect x="135" y="155" width="24" height="48" rx="2" fill="#78523A" />
          <circle cx="140" cy="180" r="2" fill="#E2CB91" />
          {/* Windows */}
          <rect x="88" y="115" width="26" height="26" rx="3" fill="#B5D9E0" stroke="#78523A" strokeWidth="2" />
          <rect x="180" y="115" width="26" height="26" rx="3" fill="#B5D9E0" stroke="#78523A" strokeWidth="2" />
          {/* Trees */}
          {[
            { cx: 52, cy: 55, r: 24 },
            { cx: 295, cy: 57, r: 20 },
            { cx: 52, cy: 235, r: 22 },
          ].map((t, idx) => (
            <g key={idx}>
              <circle cx={t.cx} cy={t.cy} r={t.r} fill="#3D824A" />
              <circle cx={t.cx - 4} cy={t.cy - 4} r={t.r * 0.7} fill="#62A85A" />
            </g>
          ))}
          {/* Zone Badge */}
          <g transform="translate(140, 255)">
            <rect x="-55" y="-12" width="110" height="24" rx="12" fill="#1E2A22" fillOpacity="0.88" />
            <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
              {t('farmHouse')}
            </text>
          </g>
        </g>

        {/* 5. ZONE: TOMATO FIELD (x: 360, y: 20, w: 380, h: 270) */}
        <g
          className={`cursor-pointer transition-all duration-300 ${
            isDimmed('tomatoField') ? 'opacity-30' : 'opacity-100'
          }`}
          onClick={() => handleZoneClick('tomatoField')}
          onMouseEnter={() => setHoveredZone('tomatoField')}
          onMouseLeave={() => setHoveredZone(null)}
        >
          <rect
            x="360"
            y="20"
            width="380"
            height="270"
            rx="22"
            fill="#8D573B"
            stroke={isSelected('tomatoField') ? '#FFFFFF' : hoveredZone === 'tomatoField' ? '#D6533E' : 'transparent'}
            strokeWidth={isSelected('tomatoField') ? '6' : '3'}
            filter={isSelected('tomatoField') ? 'url(#zoneGlow)' : undefined}
          />
          {/* Tomato rows */}
          {[55, 95, 135, 175, 215].map((y) => (
            <g key={y}>
              <line x1="385" y1={y} x2="715" y2={y} stroke="#68452F" strokeWidth="18" strokeLinecap="round" />
              {[405, 450, 495, 540, 585, 630, 675].map((x) => (
                <g key={x} transform={`translate(${x}, ${y})`}>
                  <circle cx="0" cy="0" r="10" fill="#528B42" />
                  <circle cx="-3" cy="-3" r="5" fill="#8DC05B" />
                  <circle cx="5" cy="3" r="4" fill="#D6533E" />
                  <circle cx="-5" cy="4" r="3.5" fill="#D6533E" />
                </g>
              ))}
            </g>
          ))}
          {/* Water valve */}
          <circle cx="380" cy="250" r="7" fill="#47758A" />
          {/* Zone Badge */}
          <g transform="translate(550, 255)">
            <rect x="-65" y="-12" width="130" height="24" rx="12" fill="#D6533E" fillOpacity="0.95" />
            <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
              {t('tomatoField')} (54%)
            </text>
          </g>
        </g>

        {/* 6. ZONE: VEGETABLE FIELD (x: 20, y: 355, w: 320, h: 370) */}
        <g
          className={`cursor-pointer transition-all duration-300 ${
            isDimmed('vegetableField') ? 'opacity-30' : 'opacity-100'
          }`}
          onClick={() => handleZoneClick('vegetableField')}
          onMouseEnter={() => setHoveredZone('vegetableField')}
          onMouseLeave={() => setHoveredZone(null)}
        >
          <rect
            x="20"
            y="355"
            width="320"
            height="370"
            rx="22"
            fill="#79523D"
            stroke={isSelected('vegetableField') ? '#FFFFFF' : hoveredZone === 'vegetableField' ? '#3D8D43' : 'transparent'}
            strokeWidth={isSelected('vegetableField') ? '6' : '3'}
            filter={isSelected('vegetableField') ? 'url(#zoneGlow)' : undefined}
          />
          {/* Vegetable beds */}
          {[390, 440, 490, 540, 590, 640].map((y, rowIdx) => (
            <g key={y}>
              <rect x="40" y={y - 14} width="280" height="28" rx="8" fill="#68452F" />
              {rowIdx % 2 === 0 ? (
                // Lettuce rows
                [65, 105, 145, 185, 225, 265].map((x) => (
                  <g key={x} transform={`translate(${x}, ${y})`}>
                    <circle cx="0" cy="0" r="10" fill="#3D8D43" />
                    <circle cx="0" cy="0" r="6" fill="#6DBE57" />
                    <circle cx="-1" cy="-1" r="3" fill="#8AD26A" />
                  </g>
                ))
              ) : (
                // Carrot rows
                [65, 95, 125, 155, 185, 215, 245, 275].map((x) => (
                  <g key={x} transform={`translate(${x}, ${y})`}>
                    <ellipse cx="0" cy="2" rx="4" ry="7" fill="#E6A840" />
                    <circle cx="0" cy="-4" r="4" fill="#78A948" />
                  </g>
                ))
              )}
            </g>
          ))}
          {/* Zone Badge */}
          <g transform="translate(180, 690)">
            <rect x="-65" y="-12" width="130" height="24" rx="12" fill="#3D8D43" fillOpacity="0.95" />
            <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
              {t('vegetableField')} (88%)
            </text>
          </g>
        </g>

        {/* 7. ZONE: CORN FIELD (x: 390, y: 355, w: 350, h: 370) */}
        <g
          className={`cursor-pointer transition-all duration-300 ${
            isDimmed('cornField') ? 'opacity-30' : 'opacity-100'
          }`}
          onClick={() => handleZoneClick('cornField')}
          onMouseEnter={() => setHoveredZone('cornField')}
          onMouseLeave={() => setHoveredZone(null)}
        >
          <rect
            x="390"
            y="355"
            width="350"
            height="370"
            rx="22"
            fill="#719A42"
            stroke={isSelected('cornField') ? '#FFFFFF' : hoveredZone === 'cornField' ? '#B5CD67' : 'transparent'}
            strokeWidth={isSelected('cornField') ? '6' : '3'}
            filter={isSelected('cornField') ? 'url(#zoneGlow)' : undefined}
          />
          {/* Corn rows */}
          {[390, 435, 480, 525, 570, 615, 660].map((y) => (
            <g key={y}>
              <line x1="415" y1={y} x2="715" y2={y} stroke="#5E8335" strokeWidth="14" strokeLinecap="round" />
              {[430, 470, 510, 550, 590, 630, 670, 705].map((x) => (
                <g key={x} transform={`translate(${x}, ${y})`}>
                  <ellipse cx="0" cy="0" rx="9" ry="6" fill="#B5CD67" />
                  <line x1="-7" y1="0" x2="7" y2="0" stroke="#D4D982" strokeWidth="3" />
                  <circle cx="0" cy="0" r="3" fill="#E2CB91" />
                </g>
              ))}
            </g>
          ))}
          {/* Zone Badge */}
          <g transform="translate(565, 690)">
            <rect x="-60" y="-12" width="120" height="24" rx="12" fill="#5E8335" fillOpacity="0.95" />
            <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
              {t('cornField')} (18%)
            </text>
          </g>
        </g>

        {/* 8. ZONE: ANIMAL AREA / PASTURE (x: 20, y: 800, w: 380, h: 180) */}
        <g
          className={`cursor-pointer transition-all duration-300 ${
            isDimmed('animalArea') ? 'opacity-30' : 'opacity-100'
          }`}
          onClick={() => handleZoneClick('animalArea')}
          onMouseEnter={() => setHoveredZone('animalArea')}
          onMouseLeave={() => setHoveredZone(null)}
        >
          <rect
            x="20"
            y="800"
            width="380"
            height="180"
            rx="22"
            fill="#8DC46B"
            stroke={isSelected('animalArea') ? '#FFFFFF' : hoveredZone === 'animalArea' ? '#2F7D4E' : 'transparent'}
            strokeWidth={isSelected('animalArea') ? '6' : '3'}
            filter={isSelected('animalArea') ? 'url(#zoneGlow)' : undefined}
          />
          {/* Fence outline */}
          <rect x="30" y="810" width="360" height="160" rx="14" fill="none" stroke="#ECE1C7" strokeWidth="4" strokeDasharray="8 6" />

          {/* Red Barn */}
          <rect x="45" y="825" width="85" height="60" rx="4" fill="#8D3A32" />
          <polygon points="40,830 87,815 135,830" fill="#B84E40" />
          <rect x="75" y="855" width="25" height="30" fill="#604437" />

          {/* Hay bales */}
          <rect x="145" y="830" width="22" height="14" rx="3" fill="#E7BE5D" stroke="#BD913A" strokeWidth="1.5" />
          <rect x="170" y="830" width="22" height="14" rx="3" fill="#E7BE5D" stroke="#BD913A" strokeWidth="1.5" />
          <rect x="157" y="818" width="22" height="14" rx="3" fill="#E7BE5D" stroke="#BD913A" strokeWidth="1.5" />

          {/* Cows & Sheep grazing */}
          {[
            { x: 230, y: 845, spots: true },
            { x: 300, y: 875, spots: true },
            { x: 180, y: 910, spots: false },
            { x: 250, y: 930, spots: false },
          ].map((ani, idx) => (
            <g key={idx} transform={`translate(${ani.x}, ${ani.y})`}>
              {ani.spots ? (
                <>
                  <ellipse cx="0" cy="0" rx="14" ry="9" fill="#FFF8E8" stroke="#303A34" strokeWidth="1.5" />
                  <circle cx="-5" cy="-2" r="4" fill="#303A34" />
                  <circle cx="6" cy="2" r="3" fill="#303A34" />
                  <circle cx="12" cy="-4" r="5" fill="#FFF8E8" />
                </>
              ) : (
                <>
                  <circle cx="0" cy="0" r="10" fill="#FFF8E8" stroke="#D8DDD7" strokeWidth="1" />
                  <circle cx="8" cy="-2" r="4" fill="#303A34" />
                </>
              )}
            </g>
          ))}

          {/* Chickens */}
          {[
            { x: 80, y: 925 },
            { x: 110, y: 935 },
            { x: 130, y: 920 },
          ].map((chk, idx) => (
            <g key={idx} transform={`translate(${chk.x}, ${chk.y})`}>
              <ellipse cx="0" cy="0" rx="5" ry="4" fill="#FFF8E8" />
              <polygon points="4,-1 8,0 4,2" fill="#E6AB45" />
              <circle cx="2" cy="-3" r="2" fill="#D6533E" />
            </g>
          ))}

          {/* Zone Badge */}
          <g transform="translate(200, 960)">
            <rect x="-65" y="-12" width="130" height="24" rx="12" fill="#1E2A22" fillOpacity="0.9" />
            <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
              {t('animalArea')} (48)
            </text>
          </g>
        </g>

        {/* 9. ZONE: WATER TANK (x: 420, y: 800, w: 320, h: 180) */}
        <g
          className={`cursor-pointer transition-all duration-300 ${
            isDimmed('waterTank') ? 'opacity-30' : 'opacity-100'
          }`}
          onClick={() => handleZoneClick('waterTank')}
          onMouseEnter={() => setHoveredZone('waterTank')}
          onMouseLeave={() => setHoveredZone(null)}
        >
          <rect
            x="420"
            y="800"
            width="320"
            height="180"
            rx="22"
            fill="#EAF5F7"
            stroke={isSelected('waterTank') ? '#FFFFFF' : hoveredZone === 'waterTank' ? '#4A91C5' : 'transparent'}
            strokeWidth={isSelected('waterTank') ? '6' : '3'}
            filter={isSelected('waterTank') ? 'url(#zoneGlow)' : undefined}
          />

          {/* Water reservoir / pool */}
          <rect x="440" y="820" width="280" height="140" rx="16" fill="url(#waterGrad)" />
          {/* Animated Water ripple */}
          <circle cx="580" cy="880" fill="none" stroke="#FFFFFF" strokeWidth="2" className="water-ripple" />
          <ellipse cx="580" cy="880" rx="40" ry="14" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.7" />

          {/* Pump station */}
          <g transform="translate(470, 840)">
            <rect x="-15" y="-15" width="30" height="30" rx="4" fill="#5598B1" stroke="#354239" strokeWidth="2" />
            <circle cx="0" cy="0" r="7" fill="#EAF5F7" />
          </g>

          {/* Zone Badge */}
          <g transform="translate(580, 960)">
            <rect x="-65" y="-12" width="130" height="24" rx="12" fill="#4A91C5" fillOpacity="0.95" />
            <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
              {t('waterTank')} (82%)
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
