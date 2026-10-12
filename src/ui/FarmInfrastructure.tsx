import React from 'react';

// -------------------------------------------------------------------
// 1. Elevated Steel Water Tank on Tower with Ladder, Gauge & Pipes
// -------------------------------------------------------------------
export const ElevatedWaterTank: React.FC<{
  water: number;
  capacity: number;
  tankLevel: number; // 0..5
}> = ({ water, capacity, tankLevel }) => {
  const fillPct = Math.min(1.0, Math.max(0, water / (capacity || 200)));
  const isDoubleTank = tankLevel >= 2;

  // Gauge liquid height
  const gaugeHeight = 28;
  const liquidY = 16 + (1 - fillPct) * gaugeHeight;
  const liquidH = fillPct * gaugeHeight;

  return (
    <svg viewBox="0 0 100 120" className="w-full h-full select-none overflow-visible">
      <defs>
        <radialGradient id="tankTowerShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tankSteelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B0BEC5" />
          <stop offset="25%" stopColor="#ECEFF1" />
          <stop offset="70%" stopColor="#90A4AE" />
          <stop offset="100%" stopColor="#607D8B" />
        </linearGradient>
        <linearGradient id="waterLevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>

      {/* Ground contact shadow */}
      <ellipse cx="50" cy="112" rx="36" ry="7" fill="url(#tankTowerShadow)" />

      {/* Sturdy steel lattice tower legs */}
      <g stroke="#455A64" strokeWidth="2.5" strokeLinecap="round">
        {/* Four legs */}
        <line x1="24" y1="50" x2="16" y2="110" />
        <line x1="76" y1="50" x2="84" y2="110" />
        <line x1="38" y1="50" x2="34" y2="110" strokeWidth="1.8" stroke="#546E7A" />
        <line x1="62" y1="50" x2="66" y2="110" strokeWidth="1.8" stroke="#546E7A" />

        {/* Cross bracing struts */}
        <line x1="22" y1="65" x2="78" y2="65" strokeWidth="1.8" />
        <line x1="19" y1="88" x2="81" y2="88" strokeWidth="1.8" />
        <line x1="22" y1="65" x2="81" y2="88" strokeWidth="1.4" stroke="#607D8B" />
        <line x1="78" y1="65" x2="19" y2="88" strokeWidth="1.4" stroke="#607D8B" />
        <line x1="19" y1="88" x2="84" y2="110" strokeWidth="1.4" stroke="#607D8B" />
        <line x1="81" y1="88" x2="16" y2="110" strokeWidth="1.4" stroke="#607D8B" />
      </g>

      {/* Access ladder */}
      <g stroke="#37474F" strokeWidth="1.5">
        <line x1="47" y1="50" x2="47" y2="110" />
        <line x1="53" y1="50" x2="53" y2="110" />
        {[58, 66, 74, 82, 90, 98, 106].map((y) => (
          <line key={y} x1="47" y1={y} x2="53" y2={y} />
        ))}
      </g>

      {/* Outlet pipe connecting down with red valve wheel */}
      <path
        d="M 68 48 L 68 108 L 98 108"
        fill="none"
        stroke="#546E7A"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Red valve wheel */}
      <circle cx="68" cy="80" r="4.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
      <line x1="68" y1="76" x2="68" y2="84" stroke="#FFFFFF" strokeWidth="1" />
      <line x1="64" y1="80" x2="72" y2="80" stroke="#FFFFFF" strokeWidth="1" />

      {/* Tank Platform */}
      <rect x="18" y="46" width="64" height="5" rx="2" fill="#37474F" stroke="#263238" strokeWidth="1" />

      {/* Main Steel Water Tank Cylinder */}
      <g>
        <rect
          x={isDoubleTank ? 18 : 22}
          y="12"
          width={isDoubleTank ? 64 : 56}
          height="35"
          rx="6"
          fill="url(#tankSteelGrad)"
          stroke="#455A64"
          strokeWidth="1.5"
        />
        {/* Steel compression bands */}
        <line x1={isDoubleTank ? 18 : 22} y1="20" x2={isDoubleTank ? 82 : 78} y2="20" stroke="#37474F" strokeWidth="1.5" />
        <line x1={isDoubleTank ? 18 : 22} y1="30" x2={isDoubleTank ? 82 : 78} y2="30" stroke="#37474F" strokeWidth="1.5" />
        <line x1={isDoubleTank ? 18 : 22} y1="40" x2={isDoubleTank ? 82 : 78} y2="40" stroke="#37474F" strokeWidth="1.5" />

        {/* Dome roof */}
        <path
          d={`M ${isDoubleTank ? 18 : 22} 13 Q 50 2 ${isDoubleTank ? 82 : 78} 13 Z`}
          fill="#546E7A"
          stroke="#37474F"
          strokeWidth="1.2"
        />

        {/* Second upper tank for Level 2+ */}
        {isDoubleTank && (
          <g transform="translate(14, -14)">
            <rect x="14" y="10" width="44" height="15" rx="3" fill="url(#tankSteelGrad)" stroke="#455A64" strokeWidth="1.2" />
            <line x1="14" y1="18" x2="58" y2="18" stroke="#37474F" strokeWidth="1" />
          </g>
        )}
      </g>

      {/* Vertical Sight-Glass Water Level Gauge */}
      <g transform="translate(30, 0)">
        {/* Gauge backing & frame */}
        <rect x="0" y="15" width="7" height="30" rx="3.5" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
        {/* Water inside gauge */}
        <rect
          x="1.5"
          y={liquidY}
          width="4"
          height={liquidH}
          rx="2"
          fill="url(#waterLevelGrad)"
        />
        {/* Glass glare highlight */}
        <line x1="2" y1="16" x2="2" y2="43" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" strokeLinecap="round" />
        {/* Tick marks */}
        <line x1="5.5" y1="22" x2="6.5" y2="22" stroke="#FFF" strokeWidth="0.8" />
        <line x1="5.5" y1="30" x2="6.5" y2="30" stroke="#FFF" strokeWidth="0.8" />
        <line x1="5.5" y1="38" x2="6.5" y2="38" stroke="#FFF" strokeWidth="0.8" />
      </g>
    </svg>
  );
};

// -------------------------------------------------------------------
// 2. Grain Silo with Fill Gauge, Feed Sacks & Hay Bales
// -------------------------------------------------------------------
export const GrainSilo: React.FC<{
  silo: number;
  siloCap: number;
  siloLevel: number;
}> = ({ silo, siloCap, siloLevel }) => {
  const fillPct = Math.min(1.0, Math.max(0, silo / (siloCap || 40)));
  const gaugeHeight = 44;
  const grainH = fillPct * gaugeHeight;
  const grainY = 24 + (1 - fillPct) * gaugeHeight;

  return (
    <svg viewBox="0 0 110 120" className="w-full h-full select-none overflow-visible">
      <defs>
        <radialGradient id="siloShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="siloMetalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#CFD8DC" />
          <stop offset="30%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#B0BEC5" />
          <stop offset="100%" stopColor="#78909C" />
        </linearGradient>
        <linearGradient id="grainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="50" cy="112" rx="42" ry="8" fill="url(#siloShadow)" />

      {/* Main Silo Body (corrugated galvanized steel) */}
      <g>
        {/* Concrete foundation base */}
        <rect x="22" y="104" width="48" height="8" rx="2" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />

        {/* Cylinder body */}
        <rect
          x="24"
          y="20"
          width="44"
          height="85"
          rx="4"
          fill="url(#siloMetalGrad)"
          stroke="#546E7A"
          strokeWidth="1.5"
        />

        {/* Corrugated horizontal lines */}
        {[30, 40, 50, 60, 70, 80, 90, 100].map((y) => (
          <line key={y} x1="24" y1={y} x2="68" y2={y} stroke="#78909C" strokeWidth="1" />
        ))}

        {/* Conical metal dome roof */}
        <path d="M 23 21 Q 46 0 69 21 Z" fill="#607D8B" stroke="#455A64" strokeWidth="1.4" />
        {/* Roof vent cap */}
        <rect x="43" y="1" width="6" height="5" rx="1.5" fill="#37474F" />

        {/* Exterior ladder */}
        <g stroke="#37474F" strokeWidth="1.2">
          <line x1="28" y1="21" x2="28" y2="104" />
          <line x1="33" y1="21" x2="33" y2="104" />
          {[27, 35, 43, 51, 59, 67, 75, 83, 91, 99].map((y) => (
            <line key={y} x1="28" y1={y} x2="33" y2={y} />
          ))}
        </g>
      </g>

      {/* Vertical Grain Fill Gauge on Silo */}
      <g transform="translate(56, 0)">
        <rect x="0" y="23" width="7" height="46" rx="3.5" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
        <rect x="1.5" y={grainY} width="4" height={grainH} rx="2" fill="url(#grainGrad)" />
        <line x1="2" y1="24" x2="2" y2="67" stroke="#FFF" strokeWidth="0.8" opacity="0.6" strokeLinecap="round" />
      </g>

      {/* Stack of Feed Sacks beside Silo */}
      <g transform="translate(72, 88)">
        {/* Sack 1 (bottom left) */}
        <rect x="0" y="12" width="16" height="11" rx="4" fill="#D97706" stroke="#92400E" strokeWidth="0.8" />
        <line x1="2" y1="14" x2="14" y2="21" stroke="#B45309" strokeWidth="1" />
        <text x="8" y="20" textAnchor="middle" fontSize="6" fill="#FFF" fontWeight="bold">🌾</text>

        {/* Sack 2 (bottom right) */}
        <rect x="13" y="13" width="16" height="10" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="0.8" />

        {/* Sack 3 (top) */}
        <rect x="6" y="2" width="15" height="10" rx="4" fill="#F59E0B" stroke="#92400E" strokeWidth="0.8" />
      </g>

      {/* Stack of Golden Hay Bales */}
      <g transform="translate(4, 90)">
        {/* Bale 1 */}
        <rect x="0" y="10" width="18" height="11" rx="2" fill="#EAB308" stroke="#CA8A04" strokeWidth="0.8" />
        <line x1="5" y1="10" x2="5" y2="21" stroke="#A16207" strokeWidth="1" />
        <line x1="13" y1="10" x2="13" y2="21" stroke="#A16207" strokeWidth="1" />

        {/* Bale 2 */}
        <rect x="3" y="0" width="16" height="10" rx="2" fill="#FACC15" stroke="#CA8A04" strokeWidth="0.8" />
        <line x1="8" y1="0" x2="8" y2="10" stroke="#A16207" strokeWidth="1" />
      </g>
    </svg>
  );
};

// -------------------------------------------------------------------
// 3. Wooden Feed Trough for Animals (visibly fills and empties)
// -------------------------------------------------------------------
export const WoodenFeedTrough: React.FC<{
  feedTrough: number; // 0..20
}> = ({ feedTrough }) => {
  const fillPct = Math.min(1.0, Math.max(0, feedTrough / 20));
  const grainW = fillPct * 46;

  return (
    <svg viewBox="0 0 60 30" className="w-full h-full select-none overflow-visible">
      <defs>
        <radialGradient id="troughShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="30" cy="27" rx="26" ry="3.5" fill="url(#troughShadow)" />

      {/* Wooden support legs */}
      <polygon points="10,20 6,28 10,28 13,20" fill="#4E342E" />
      <polygon points="50,20 54,28 50,28 47,20" fill="#4E342E" />

      {/* Trough timber basin */}
      <polygon points="6,12 54,12 48,22 12,22" fill="#6D4C41" stroke="#3E2723" strokeWidth="1.2" />

      {/* Inner basin cavity */}
      <polygon points="8,13 52,13 46,20 14,20" fill="#3E2723" />

      {/* Visible Grain Feed inside */}
      {fillPct > 0 && (
        <ellipse
          cx="30"
          cy="16.5"
          rx={grainW * 0.48}
          ry={3.2 * fillPct}
          fill="#F59E0B"
          stroke="#D97706"
          strokeWidth="0.6"
        />
      )}

      {/* Timber grain lines */}
      <line x1="8" y1="16" x2="52" y2="16" stroke="#4E342E" strokeWidth="0.8" />
    </svg>
  );
};

// -------------------------------------------------------------------
// 4. Animal Water Trough (fills from tank & uses reserve)
// -------------------------------------------------------------------
export const AnimalWaterTrough: React.FC<{
  tankWater: number;
}> = ({ tankWater }) => {
  const hasWater = tankWater >= 10;
  const waterLevel = Math.min(1.0, tankWater / 60);

  return (
    <svg viewBox="0 0 60 30" className="w-full h-full select-none overflow-visible">
      <defs>
        <radialGradient id="waterTroughShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="troughWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="30" cy="27" rx="26" ry="3.5" fill="url(#waterTroughShadow)" />

      {/* Stone / Timber Basin Legs */}
      <rect x="8" y="20" width="5" height="7" rx="1.5" fill="#475569" />
      <rect x="47" y="20" width="5" height="7" rx="1.5" fill="#475569" />

      {/* Main Basin Structure */}
      <rect x="6" y="11" width="48" height="11" rx="3" fill="#64748B" stroke="#334155" strokeWidth="1.2" />

      {/* Inner Basin */}
      <rect x="8" y="13" width="44" height="7" rx="2" fill="#1E293B" />

      {/* Water Surface */}
      {hasWater && (
        <g>
          <rect
            x="9"
            y={17 - waterLevel * 3}
            width="42"
            height={3 + waterLevel * 3}
            rx="2"
            fill="url(#troughWaterGrad)"
          />
          {/* Sparkle highlight */}
          <line x1="12" y1={18 - waterLevel * 3} x2="28" y2={18 - waterLevel * 3} stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />
        </g>
      )}

      {/* Supply pipe connected to main water tank */}
      <path d="M -8 13 L 8 13" fill="none" stroke="#546E7A" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

// -------------------------------------------------------------------
// 5. Classic Red Country Barn (animals sleep inside at night & rain)
// -------------------------------------------------------------------
export const RedBarn: React.FC<{
  isOpen: boolean; // doors open during day, closed at night / rain
  darkness: number;
}> = ({ isOpen, darkness }) => {
  const isNight = darkness > 0.35;

  return (
    <svg viewBox="0 0 120 110" className="w-full h-full select-none overflow-visible">
      <defs>
        <radialGradient id="barnGroundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="barnRedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B91C1C" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
      </defs>

      {/* Ground Shadow */}
      <ellipse cx="60" cy="106" rx="54" ry="8" fill="url(#barnGroundShadow)" />

      {/* Barn Main Walls */}
      <rect x="15" y="44" width="90" height="60" fill="url(#barnRedGrad)" stroke="#7F1D1D" strokeWidth="1.5" />

      {/* White trim vertical boards */}
      {[28, 42, 78, 92].map((x) => (
        <line key={x} x1={x} y1="44" x2={x} y2="104" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
      ))}

      {/* Gambrel Roof (classic barn shape) */}
      <polygon
        points="10,46 32,22 60,10 88,22 110,46"
        fill="#991B1B"
        stroke="#7F1D1D"
        strokeWidth="1.5"
      />
      {/* Roof trim edge */}
      <polyline
        points="8,47 31,21 60,8 89,21 112,47"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Weather Vane with Rooster on top */}
      <g transform="translate(60, 4)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="#1E293B" strokeWidth="1.5" />
        <line x1="-5" y1="3" x2="5" y2="3" stroke="#1E293B" strokeWidth="1.2" />
        {/* Tiny rooster */}
        <path d="M -3 0 Q 0 -4 3 0" fill="#1E293B" />
      </g>

      {/* Hayloft Window in Attic */}
      <g transform="translate(48, 22)">
        <polygon points="0,14 12,3 24,14" fill="#334155" />
        <rect x="3" y="14" width="18" height="10" fill={isNight ? '#FEF08A' : '#1E293B'} stroke="#FFFFFF" strokeWidth="1.2" />
        {/* Hay sticking out */}
        <path d="M 6 24 C 8 28 12 28 14 25" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* Double Barn Sliding Doors */}
      <g transform="translate(38, 62)">
        {/* Door frame */}
        <rect x="0" y="0" width="44" height="42" fill="#1E293B" stroke="#FFFFFF" strokeWidth="1.8" />

        {/* Sliding Left Door */}
        <g transform={isOpen ? 'translate(-10, 0)' : 'translate(0, 0)'} className="transition-transform duration-500">
          <rect x="1" y="1" width="20" height="40" fill="#B91C1C" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* X cross brace */}
          <line x1="3" y1="3" x2="19" y2="39" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="19" y1="3" x2="3" y2="39" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* Sliding Right Door */}
        <g transform={isOpen ? 'translate(10, 0)' : 'translate(0, 0)'} className="transition-transform duration-500">
          <rect x="23" y="1" width="20" height="40" fill="#B91C1C" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* X cross brace */}
          <line x1="25" y1="3" x2="41" y2="39" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="41" y1="3" x2="25" y2="39" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* Warm cozy lantern glow inside if doors open or night */}
        {isNight && (
          <circle cx="22" cy="18" r="8" fill="#FDE047" opacity="0.4" />
        )}
      </g>
    </svg>
  );
};

// -------------------------------------------------------------------
// 6. Spinning Rustic Windmill (spins faster when windy/cloudy/rain)
// -------------------------------------------------------------------
export const Windmill: React.FC<{
  animTime: number;
  windSpeedMultiplier: number;
}> = ({ animTime, windSpeedMultiplier }) => {
  const rotation = (animTime * 60 * windSpeedMultiplier) % 360;

  return (
    <svg viewBox="0 0 90 120" className="w-full h-full select-none overflow-visible">
      <defs>
        <radialGradient id="windmillShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="45" cy="112" rx="30" ry="6" fill="url(#windmillShadow)" />

      {/* Windmill stone/wood tower */}
      <polygon points="32,36 58,36 66,110 24,110" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="1.5" />
      {/* Wooden roof cap */}
      <polygon points="28,36 45,22 62,36" fill="#5D4037" stroke="#3E2723" strokeWidth="1.2" />

      {/* Small windows */}
      <rect x="42" y="48" width="6" height="8" rx="1" fill="#3E2723" />
      <rect x="42" y="76" width="6" height="8" rx="1" fill="#3E2723" />

      {/* Rotating 4-blade Rotor Hub */}
      <g transform="translate(45, 34)">
        {/* Center hub */}
        <g transform={`rotate(${rotation})`}>
          {[0, 90, 180, 270].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              {/* Wooden spar */}
              <line x1="0" y1="0" x2="38" y2="0" stroke="#4E342E" strokeWidth="2" strokeLinecap="round" />
              {/* Canvas sail lattice */}
              <rect x="10" y="-8" width="26" height="8" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.8" opacity="0.9" />
              <line x1="16" y1="-8" x2="16" y2="0" stroke="#94A3B8" strokeWidth="0.6" />
              <line x1="22" y1="-8" x2="22" y2="0" stroke="#94A3B8" strokeWidth="0.6" />
              <line x1="28" y1="-8" x2="28" y2="0" stroke="#94A3B8" strokeWidth="0.6" />
            </g>
          ))}
        </g>
        <circle cx="0" cy="0" r="4.5" fill="#3E2723" stroke="#D7CCC8" strokeWidth="1" />
      </g>
    </svg>
  );
};

// -------------------------------------------------------------------
// 7. Vintage Farm Tractor (chugs smoothly along path)
// -------------------------------------------------------------------
export const FarmTractor: React.FC<{
  animTime: number;
}> = ({ animTime }) => {
  const wheelRotate = (animTime * 240) % 360;
  const exhaustPuff = Math.sin(animTime * 12) * 2;

  return (
    <svg viewBox="0 0 80 50" className="w-full h-full select-none overflow-visible">
      <defs>
        <radialGradient id="tractorShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="40" cy="46" rx="35" ry="5" fill="url(#tractorShadow)" />

      {/* Exhaust pipe & smoke puff */}
      <g transform="translate(62, 10)">
        <line x1="0" y1="12" x2="0" y2="0" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        {/* Tiny smoke puff */}
        <circle cx="0" cy={-4 + exhaustPuff} r="3" fill="#94A3B8" opacity="0.6" />
      </g>

      {/* Engine Hood (Classic Red Vintage body) */}
      <rect x="42" y="20" width="28" height="16" rx="3" fill="#DC2626" stroke="#991B1B" strokeWidth="1.4" />
      {/* Front chrome radiator grill */}
      <rect x="68" y="21" width="2.5" height="13" rx="1" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
      {/* Yellow headlight */}
      <circle cx="70" cy="24" r="2.8" fill="#FACC15" stroke="#CA8A04" strokeWidth="0.8" />

      {/* Driver seat & steering wheel */}
      <path d="M 28 17 L 34 17 L 36 28 L 26 28 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="0.8" />
      <line x1="38" y1="19" x2="44" y2="24" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
      <ellipse cx="38" cy="18" rx="3.2" ry="1.4" fill="#334155" />

      {/* Rear Fender (Matching Red) */}
      <path d="M 12 28 C 12 15 32 15 32 28" fill="none" stroke="#DC2626" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M 12 28 C 12 15 32 15 32 28" fill="none" stroke="#991B1B" strokeWidth="1.2" strokeLinecap="round" />

      {/* Big Rear Tire with spokes */}
      <g transform="translate(22, 32)">
        <circle cx="0" cy="0" r="14" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
        <circle cx="0" cy="0" r="8" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
        <g transform={`rotate(${wheelRotate})`}>
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#475569" strokeWidth="1.5" />
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#475569" strokeWidth="1.5" />
        </g>
        <circle cx="0" cy="0" r="3" fill="#1E293B" />
      </g>

      {/* Front Small Tire */}
      <g transform="translate(64, 37)">
        <circle cx="0" cy="0" r="8" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="4" fill="#FACC15" stroke="#CA8A04" strokeWidth="0.8" />
        <g transform={`rotate(${wheelRotate * 1.75})`}>
          <line x1="-6" y1="0" x2="6" y2="0" stroke="#475569" strokeWidth="1" />
          <line x1="0" y1="-6" x2="0" y2="6" stroke="#475569" strokeWidth="1" />
        </g>
        <circle cx="0" cy="0" r="2" fill="#1E293B" />
      </g>
    </svg>
  );
};

// -------------------------------------------------------------------
// 8. Field Scarecrow
// -------------------------------------------------------------------
export const Scarecrow: React.FC = () => {
  return (
    <svg viewBox="0 0 50 65" className="w-full h-full select-none overflow-visible">
      {/* Ground contact shadow */}
      <ellipse cx="25" cy="62" rx="12" ry="3.5" fill="#000" opacity="0.25" />

      {/* Wooden cross post */}
      <line x1="25" y1="12" x2="25" y2="62" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="4" y1="24" x2="46" y2="24" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />

      {/* Straw sticking out from sleeves */}
      <path d="M 4 24 L -1 22 M 4 24 L 0 27 M 46 24 L 51 22 M 46 24 L 50 27" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" />

      {/* Plaid / Patched Denim Shirt */}
      <polygon points="17,20 33,20 38,44 12,44" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1" />
      {/* Shirt patch */}
      <rect x="26" y="28" width="5" height="5" fill="#DC2626" stroke="#991B1B" strokeWidth="0.6" />

      {/* Burlap Head */}
      <circle cx="25" cy="14" r="8" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
      {/* Stitched smile and button eyes */}
      <circle cx="22" cy="13" r="1.2" fill="#78350F" />
      <circle cx="28" cy="13" r="1.2" fill="#78350F" />
      <path d="M 21 17 Q 25 20 29 17" fill="none" stroke="#78350F" strokeWidth="1" strokeLinecap="round" />

      {/* Straw Hat */}
      <ellipse cx="25" cy="8" rx="14" ry="3.5" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
      <polygon points="18,8 32,8 29,1 21,1" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
      {/* Red hat ribbon */}
      <line x1="18" y1="7" x2="32" y2="7" stroke="#DC2626" strokeWidth="1.5" />
    </svg>
  );
};

// -------------------------------------------------------------------
// 9. Field Sprinkler Head (sprays animated water arcs when active)
// -------------------------------------------------------------------
export const SprinklerHead: React.FC<{
  animTime: number;
  active: boolean;
}> = ({ animTime, active }) => {
  const arcOffset = Math.sin(animTime * 14) * 22;

  return (
    <svg viewBox="0 0 50 40" className="w-full h-full select-none overflow-visible">
      {/* Metallic sprinkler head base */}
      <rect x="23" y="28" width="4" height="12" fill="#475569" rx="1" />
      <circle cx="25" cy="28" r="3.5" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
      <line x1="25" y1="28" x2="25" y2="23" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />

      {/* Spraying Water Arcs & Mist droplets */}
      {active && (
        <g opacity="0.85">
          {/* Left arc */}
          <path
            d={`M 25 24 Q ${12 + arcOffset * 0.3} 12 ${4 + arcOffset} 18`}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeDasharray="2,2"
          />
          {/* Right arc */}
          <path
            d={`M 25 24 Q ${38 - arcOffset * 0.3} 12 ${46 - arcOffset} 18`}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeDasharray="2,2"
          />
          {/* Mist droplets */}
          <circle cx={14 + arcOffset * 0.2} cy="10" r="1.2" fill="#0EA5E9" />
          <circle cx={36 - arcOffset * 0.2} cy="10" r="1.2" fill="#0EA5E9" />
        </g>
      )}
    </svg>
  );
};
