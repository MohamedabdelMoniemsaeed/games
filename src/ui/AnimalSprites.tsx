import React from 'react';
import { AnimalType } from '../game/models';

export interface AnimalSpriteProps {
  type: AnimalType;
  growth: number; // 0..1 (0 young, 1 adult)
  fullness: number; // 0..1
  health: number; // 0..1
  stored: number; // 0..3 uncollected products
  animTime: number; // continuously running float for smooth 60fps cycles
  isMoving: boolean;
  facingRight: boolean;
  isSleeping: boolean;
  isEating?: boolean;
}

// -------------------------------------------------------------
// 1. Holstein Cow & Calf
// -------------------------------------------------------------
export const HolsteinCowSprite: React.FC<{
  growth: number;
  health: number;
  animTime: number;
  isMoving: boolean;
  facingRight: boolean;
  isSleeping: boolean;
  isEating?: boolean;
}> = ({ growth, health, animTime, isMoving, facingRight, isSleeping, isEating }) => {
  const isAdult = growth >= 0.85;
  const isSick = health < 0.3;

  // Animation angles
  const walkCycle = isMoving ? Math.sin(animTime * 8) : 0;
  const legAngle1 = walkCycle * 18;
  const legAngle2 = -walkCycle * 18;
  const tailAngle = Math.sin(animTime * 4) * 22;
  const earAngle = Math.sin(animTime * 3) * 6;
  const chewOffset = isEating || (!isSleeping && !isSick) ? Math.sin(animTime * 6) * 1.5 : 0;
  const headBob = isSleeping
    ? 8
    : isSick
    ? 10
    : isEating
    ? 12
    : isMoving
    ? Math.abs(Math.sin(animTime * 8)) * 3
    : 0;

  // Blink every ~4 seconds
  const isBlinking = !isSleeping && Math.sin(animTime * 1.5) > 0.95;

  // Scale & head size: Young calf has larger head (scale 1.25) & shorter legs
  const bodyWidth = isAdult ? 80 : 54;
  const bodyHeight = isAdult ? 48 : 36;
  const headScale = isAdult ? 1.0 : 1.2;
  const legHeight = isAdult ? 26 : 17;

  return (
    <svg
      viewBox="-60 -60 120 100"
      className="w-full h-full overflow-visible select-none pointer-events-none"
      style={{
        transform: `scaleX(${facingRight ? 1 : -1})`,
        transition: 'transform 0.15s ease',
      }}
    >
      <defs>
        <radialGradient id="cowShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cowWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E6E3" />
        </linearGradient>
        <linearGradient id="cowBlackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2A2A2E" />
          <stop offset="100%" stopColor="#151518" />
        </linearGradient>
        <linearGradient id="cowMuzzleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F8BAC3" />
          <stop offset="100%" stopColor="#EE9AA7" />
        </linearGradient>
      </defs>

      {/* Ground Contact Shadow */}
      <ellipse
        cx={0}
        cy={legHeight + 4}
        rx={bodyWidth * 0.58}
        ry={11}
        fill="url(#cowShadow)"
      />

      <g transform={isSick ? 'rotate(5, 0, 10)' : isSleeping ? 'translate(0, 10)' : ''}>
        {/* Rear Tail */}
        <g transform={`translate(${-bodyWidth * 0.44}, ${-bodyHeight * 0.25}) rotate(${tailAngle})`}>
          <path
            d="M 0 0 C -6 12 -4 24 -2 30"
            fill="none"
            stroke="#D0D5D1"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Black brush tip */}
          <path
            d="M -2 28 C -5 34 -1 38 -2 41 C 1 38 1 34 0 28 Z"
            fill="#1E1E22"
          />
        </g>

        {/* Back Legs (left side) */}
        <g transform={`translate(${-bodyWidth * 0.3}, ${bodyHeight * 0.2}) rotate(${legAngle2})`}>
          <rect x="-4" y="0" width="8" height={legHeight} rx="3" fill="#D0D5D1" />
          {/* Hoof */}
          <path d={`M -4 ${legHeight - 4} L 4 ${legHeight - 4} L 3.5 ${legHeight} L -3.5 ${legHeight} Z`} fill="#3A3835" />
        </g>
        <g transform={`translate(${bodyWidth * 0.24}, ${bodyHeight * 0.2}) rotate(${legAngle1})`}>
          <rect x="-4" y="0" width="8" height={legHeight} rx="3" fill="#D0D5D1" />
          <path d={`M -4 ${legHeight - 4} L 4 ${legHeight - 4} L 3.5 ${legHeight} L -3.5 ${legHeight} Z`} fill="#3A3835" />
        </g>

        {/* Cow Udder (adult only) */}
        {isAdult && (
          <g transform={`translate(${-bodyWidth * 0.16}, ${bodyHeight * 0.3})`}>
            <ellipse cx="0" cy="0" rx="9" ry="6" fill="#F8B4BD" />
            <circle cx="-4" cy="5" r="1.5" fill="#E8929E" />
            <circle cx="0" cy="6" r="1.5" fill="#E8929E" />
            <circle cx="4" cy="5" r="1.5" fill="#E8929E" />
          </g>
        )}

        {/* Main Body Torso */}
        <g>
          {/* Base white barrel body */}
          <ellipse
            cx="0"
            cy="0"
            rx={bodyWidth * 0.48}
            ry={bodyHeight * 0.44}
            fill="url(#cowWhiteGrad)"
            stroke="#C0C6C2"
            strokeWidth="1.2"
          />
          {/* Holstein Black Patches */}
          {/* Patch 1: back rump */}
          <path
            d={`M ${-bodyWidth * 0.45} ${-bodyHeight * 0.1}
               C ${-bodyWidth * 0.35} ${-bodyHeight * 0.42} ${-bodyWidth * 0.15} ${-bodyHeight * 0.4} ${-bodyWidth * 0.12} ${-bodyHeight * 0.2}
               C ${-bodyWidth * 0.1} ${-bodyHeight * 0.05} ${-bodyWidth * 0.2} ${bodyHeight * 0.25} ${-bodyWidth * 0.38} ${bodyHeight * 0.2}
               Z`}
            fill="url(#cowBlackGrad)"
          />
          {/* Patch 2: mid side flank */}
          <path
            d={`M ${-bodyWidth * 0.05} ${-bodyHeight * 0.35}
               C ${bodyWidth * 0.12} ${-bodyHeight * 0.42} ${bodyWidth * 0.22} ${-bodyHeight * 0.18} ${bodyWidth * 0.15} ${bodyHeight * 0.1}
               C ${bodyWidth * 0.05} ${bodyHeight * 0.28} ${-bodyWidth * 0.12} ${bodyHeight * 0.12} ${-bodyWidth * 0.08} ${-bodyHeight * 0.1}
               Z`}
            fill="url(#cowBlackGrad)"
          />
          {/* Patch 3: shoulder spot */}
          <circle cx={bodyWidth * 0.28} cy={-bodyHeight * 0.12} r={isAdult ? 8 : 5} fill="url(#cowBlackGrad)" />
        </g>

        {/* Front Legs (foreground) */}
        <g transform={`translate(${-bodyWidth * 0.22}, ${bodyHeight * 0.2}) rotate(${legAngle1})`}>
          <rect x="-4.5" y="0" width="9" height={legHeight} rx="3" fill="#FFFFFF" stroke="#C5CBC6" strokeWidth="0.8" />
          <path d={`M -4.5 ${legHeight - 4} L 4.5 ${legHeight - 4} L 4 ${legHeight} L -4 ${legHeight} Z`} fill="#2E2C29" />
        </g>
        <g transform={`translate(${bodyWidth * 0.32}, ${bodyHeight * 0.2}) rotate(${legAngle2})`}>
          <rect x="-4.5" y="0" width="9" height={legHeight} rx="3" fill="#FFFFFF" stroke="#C5CBC6" strokeWidth="0.8" />
          <path d={`M -4.5 ${legHeight - 4} L 4.5 ${legHeight - 4} L 4 ${legHeight} L -4 ${legHeight} Z`} fill="#2E2C29" />
        </g>

        {/* Head & Neck Group */}
        <g
          transform={`translate(${bodyWidth * 0.42}, ${-bodyHeight * 0.2 + headBob}) scale(${headScale})`}
        >
          {/* Neck connection */}
          <path
            d={`M ${-14} ${8} C ${-6} ${-6} ${4} ${-8} ${10} ${0} L ${6} ${14} Z`}
            fill="#FFFFFF"
          />

          {/* Horns (adult cow only) */}
          {isAdult && (
            <g>
              <path
                d="M -2 -14 C -4 -22 -10 -22 -12 -18"
                fill="none"
                stroke="#E2D6C0"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <path
                d="M 6 -14 C 8 -22 14 -22 16 -18"
                fill="none"
                stroke="#E2D6C0"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Ears with soft twitch */}
          <g transform={`translate(-8, -10) rotate(${-12 + earAngle})`}>
            <ellipse cx="0" cy="0" rx="9" ry="4.5" fill="#FFFFFF" stroke="#C5CBC6" strokeWidth="0.8" />
            <ellipse cx="0" cy="0" rx="6" ry="2.5" fill="#F8B4BD" />
          </g>
          <g transform={`translate(10, -10) rotate(${12 - earAngle})`}>
            <ellipse cx="0" cy="0" rx="9" ry="4.5" fill="#1E1E22" />
            <ellipse cx="0" cy="0" rx="6" ry="2.5" fill="#F8B4BD" />
          </g>

          {/* Head Base */}
          <ellipse cx="1" cy="-4" rx="14" ry="14" fill="#FFFFFF" stroke="#C5CBC6" strokeWidth="0.8" />

          {/* Head black patch across forehead & right eye */}
          <path
            d="M -12 -8 C -4 -16 12 -14 14 -4 C 15 4 8 8 2 2 C -3 -3 -8 -2 -12 -8 Z"
            fill="url(#cowBlackGrad)"
          />

          {/* Eyes */}
          {isSleeping ? (
            <path d="M 4 -4 Q 8 -1 12 -4" fill="none" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
          ) : isBlinking ? (
            <line x1="4" y1="-3" x2="12" y2="-3" stroke="#222" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <g>
              <ellipse cx="8" cy="-4" rx="3.5" ry="4" fill="#201C19" />
              <circle cx="9.2" cy="-5.2" r="1.3" fill="#FFFFFF" />
              <circle cx="7" cy="-2.8" r="0.6" fill="#FFFFFF" />
            </g>
          )}

          {/* Pink Muzzle with subtle chewing motion */}
          <g transform={`translate(${chewOffset}, 4)`}>
            <ellipse cx="1" cy="4" rx="12" ry="8" fill="url(#cowMuzzleGrad)" stroke="#DF8A97" strokeWidth="1" />
            {/* Nostrils */}
            <ellipse cx="-4" cy="4" rx="2" ry="1.6" fill="#6B333B" />
            <ellipse cx="6" cy="4" rx="2" ry="1.6" fill="#6B333B" />
            {/* Gentle smile/chew line */}
            <path d="M -4 8 Q 1 11 6 8" fill="none" stroke="#9E4D5A" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        </g>
      </g>
    </svg>
  );
};

// -------------------------------------------------------------
// 2. Brown Hen & Chick
// -------------------------------------------------------------
export const BrownHenSprite: React.FC<{
  growth: number;
  health: number;
  animTime: number;
  isMoving: boolean;
  facingRight: boolean;
  isSleeping: boolean;
  isEating?: boolean;
}> = ({ growth, health, animTime, isMoving, facingRight, isSleeping, isEating }) => {
  const isAdult = growth >= 0.85;
  const isSick = health < 0.3;

  // Pecking / Walking dynamics
  const walkCycle = isMoving ? Math.sin(animTime * 12) : 0;
  const legAngle1 = walkCycle * 25;
  const legAngle2 = -walkCycle * 25;
  const pecking = isEating || (!isMoving && !isSleeping && !isSick && Math.sin(animTime * 4) > 0.3);
  const peckAngle = pecking ? 28 : isSick ? 18 : isSleeping ? 14 : 0;
  const tailBob = Math.sin(animTime * 6) * 6;
  const isBlinking = !isSleeping && Math.sin(animTime * 2) > 0.96;

  // Chick styling (baby chicken)
  if (!isAdult) {
    return (
      <svg
        viewBox="-40 -40 80 70"
        className="w-full h-full overflow-visible select-none pointer-events-none"
        style={{
          transform: `scaleX(${facingRight ? 1 : -1})`,
          transition: 'transform 0.15s ease',
        }}
      >
        <defs>
          <radialGradient id="chickShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="0" cy="18" rx="18" ry="6" fill="url(#chickShadow)" />

        {/* Legs */}
        <g transform={`translate(-4, 10) rotate(${legAngle1})`}>
          <line x1="0" y1="0" x2="0" y2="8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <path d="M 0 8 L -3 10 M 0 8 L 0 11 M 0 8 L 3 10" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        </g>
        <g transform={`translate(4, 10) rotate(${legAngle2})`}>
          <line x1="0" y1="0" x2="0" y2="8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <path d="M 0 8 L -3 10 M 0 8 L 0 11 M 0 8 L 3 10" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Fluffy Round Body */}
        <ellipse cx="0" cy="2" rx="16" ry="14" fill="#FDE047" stroke="#EAB308" strokeWidth="1" />
        {/* Little wing */}
        <ellipse cx="-2" cy="3" rx="8" ry="6" fill="#FACC15" />

        {/* Head & Peck Group */}
        <g transform={`translate(8, ${-6 + (peckAngle > 0 ? 5 : 0)}) rotate(${peckAngle * 0.6})`}>
          <circle cx="2" cy="-4" r="11" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />
          {/* Eye */}
          {isSleeping ? (
            <line x1="4" y1="-5" x2="8" y2="-5" stroke="#1E2A22" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <circle cx="6" cy="-5" r="2.2" fill="#1E2A22">
              <circle cx="6.8" cy="-5.8" r="0.8" fill="#FFF" />
            </circle>
          )}
          {/* Tiny Orange Beak */}
          <polygon points="12,-4 19,-2 12,1" fill="#F97316" />
        </g>
      </svg>
    );
  }

  // Adult Brown Hen
  return (
    <svg
      viewBox="-50 -50 100 80"
      className="w-full h-full overflow-visible select-none pointer-events-none"
      style={{
        transform: `scaleX(${facingRight ? 1 : -1})`,
        transition: 'transform 0.15s ease',
      }}
    >
      <defs>
        <radialGradient id="henShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="henBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#964B28" />
          <stop offset="100%" stopColor="#6C2E17" />
        </linearGradient>
        <linearGradient id="henWingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A8572A" />
          <stop offset="100%" stopColor="#5A220F" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="0" cy="22" rx="26" ry="8" fill="url(#henShadow)" />

      {/* Tail Feathers */}
      <g transform={`translate(-22, -4) rotate(${tailBob})`}>
        <path d="M 0 0 C -12 -12 -18 -4 -24 -14 C -18 6 -12 10 0 10 Z" fill="#4A180B" />
        <path d="M 0 2 C -8 -6 -14 2 -18 -6 C -12 8 -8 10 0 8 Z" fill="#6C2E17" />
      </g>

      {/* Thin Chicken Legs & Claws */}
      <g transform={`translate(-6, 12) rotate(${legAngle1})`}>
        <line x1="0" y1="0" x2="0" y2="12" stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 0 12 L -5 15 M 0 12 L 0 16 M 0 12 L 5 15" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g transform={`translate(6, 12) rotate(${legAngle2})`}>
        <line x1="0" y1="0" x2="0" y2="12" stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 0 12 L -5 15 M 0 12 L 0 16 M 0 12 L 5 15" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Hen Torso */}
      <ellipse cx="0" cy="4" rx="23" ry="17" fill="url(#henBodyGrad)" stroke="#5A220F" strokeWidth="1" />

      {/* Layered Wing */}
      <g transform="translate(-2, 2)">
        <path
          d="M -12 -4 C -2 -14 16 -10 14 6 C 10 14 -8 14 -14 4 Z"
          fill="url(#henWingGrad)"
          stroke="#4A180B"
          strokeWidth="0.8"
        />
        {/* Wing feather detailing */}
        <path d="M -4 2 Q 4 10 10 6" fill="none" stroke="#D97736" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M -8 -1 Q 2 6 8 2" fill="none" stroke="#D97736" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* Neck & Head Group (rotates on peck) */}
      <g transform={`translate(14, ${-6 + (peckAngle > 0 ? 8 : 0)}) rotate(${peckAngle})`}>
        {/* Neck feathers */}
        <path d="M -6 12 C 0 2 8 0 8 6 L 2 16 Z" fill="#964B28" />

        {/* Head */}
        <circle cx="8" cy="-2" r="9" fill="#B45309" stroke="#78350F" strokeWidth="0.8" />

        {/* Red Comb on top */}
        <path
          d="M 2 -9 C 2 -16 6 -16 7 -10 C 9 -17 13 -17 13 -10 C 15 -14 18 -12 16 -8 Z"
          fill="#DC2626"
        />

        {/* Red Wattle below beak */}
        <ellipse cx="14" cy="5" rx="3.5" ry="5.5" fill="#DC2626" />

        {/* Eye */}
        {isSleeping ? (
          <path d="M 8 -3 Q 11 -1 13 -3" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
        ) : isBlinking ? (
          <line x1="8" y1="-2" x2="13" y2="-2" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" />
        ) : (
          <g>
            <circle cx="10" cy="-2.5" r="2.5" fill="#1C1917" />
            <circle cx="11" cy="-3.3" r="0.9" fill="#FFFFFF" />
          </g>
        )}

        {/* Beak */}
        <polygon points="15,-4 24,-1 15,2" fill="#F59E0B" stroke="#B45309" strokeWidth="0.6" />
      </g>
    </svg>
  );
};

// -------------------------------------------------------------
// 3. Woolly Sheep & Lamb
// -------------------------------------------------------------
export const WoollySheepSprite: React.FC<{
  growth: number;
  health: number;
  animTime: number;
  isMoving: boolean;
  facingRight: boolean;
  isSleeping: boolean;
  isEating?: boolean;
}> = ({ growth, health, animTime, isMoving, facingRight, isSleeping, isEating }) => {
  const isAdult = growth >= 0.85;
  const isSick = health < 0.3;

  const walkCycle = isMoving ? Math.sin(animTime * 9) : 0;
  const legAngle1 = walkCycle * 20;
  const legAngle2 = -walkCycle * 20;
  const tailWag = Math.sin(animTime * 7) * 15;
  const isGrazing = isEating || (!isMoving && !isSleeping && !isSick && Math.sin(animTime * 2.5) > 0.1);
  const headAngle = isGrazing ? 25 : isSick ? 16 : isSleeping ? 10 : 0;
  const headY = isGrazing ? 10 : 0;
  const isBlinking = !isSleeping && Math.sin(animTime * 1.8) > 0.95;

  const bodyW = isAdult ? 34 : 24;
  const bodyH = isAdult ? 25 : 18;
  const legH = isAdult ? 18 : 12;

  return (
    <svg
      viewBox="-55 -55 110 90"
      className="w-full h-full overflow-visible select-none pointer-events-none"
      style={{
        transform: `scaleX(${facingRight ? 1 : -1})`,
        transition: 'transform 0.15s ease',
      }}
    >
      <defs>
        <radialGradient id="sheepShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="woolGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E7E4" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="0" cy={legH + 2} rx={bodyW * 1.1} ry={10} fill="url(#sheepShadow)" />

      {/* Cute tail */}
      <g transform={`translate(${-bodyW * 0.8}, -2) rotate(${tailWag})`}>
        <ellipse cx="-4" cy="0" rx="5" ry="4" fill="#F1F5F2" stroke="#CBD5E1" strokeWidth="1" />
      </g>

      {/* Dark slender legs with tiny hooves */}
      <g transform={`translate(${-bodyW * 0.45}, ${bodyH * 0.4}) rotate(${legAngle2})`}>
        <rect x="-3" y="0" width="6" height={legH} rx="2" fill="#2E2E33" />
        <rect x="-3" y={legH - 3} width="6" height="3" fill="#17171A" />
      </g>
      <g transform={`translate(${bodyW * 0.35}, ${bodyH * 0.4}) rotate(${legAngle1})`}>
        <rect x="-3" y="0" width="6" height={legH} rx="2" fill="#2E2E33" />
        <rect x="-3" y={legH - 3} width="6" height="3" fill="#17171A" />
      </g>
      <g transform={`translate(${-bodyW * 0.3}, ${bodyH * 0.4}) rotate(${legAngle1})`}>
        <rect x="-3" y="0" width="6" height={legH} rx="2" fill="#3A3A40" />
        <rect x="-3" y={legH - 3} width="6" height="3" fill="#17171A" />
      </g>
      <g transform={`translate(${bodyW * 0.48}, ${bodyH * 0.4}) rotate(${legAngle2})`}>
        <rect x="-3" y="0" width="6" height={legH} rx="2" fill="#3A3A40" />
        <rect x="-3" y={legH - 3} width="6" height="3" fill="#17171A" />
      </g>

      {/* Fluffy Cloud-like Wool Body (overlapping circles) */}
      <g>
        {/* Wool cloud base clusters */}
        <circle cx={-bodyW * 0.5} cy={-4} r={isAdult ? 14 : 9} fill="url(#woolGrad)" />
        <circle cx={-bodyW * 0.25} cy={-10} r={isAdult ? 16 : 10} fill="url(#woolGrad)" />
        <circle cx={bodyW * 0.1} cy={-11} r={isAdult ? 16 : 10} fill="url(#woolGrad)" />
        <circle cx={bodyW * 0.4} cy={-5} r={isAdult ? 14 : 9} fill="url(#woolGrad)" />
        <circle cx={-bodyW * 0.35} cy={8} r={isAdult ? 14 : 9} fill="url(#woolGrad)" />
        <circle cx={0} cy={10} r={isAdult ? 15 : 10} fill="url(#woolGrad)" />
        <circle cx={bodyW * 0.3} cy={7} r={isAdult ? 14 : 9} fill="url(#woolGrad)" />
        <ellipse cx="0" cy="0" rx={bodyW * 0.75} ry={bodyH * 0.7} fill="url(#woolGrad)" />
      </g>

      {/* Sheep Head & Neck (Dark Face with Wool Crown) */}
      <g transform={`translate(${bodyW * 0.65}, ${-bodyH * 0.2 + headY}) rotate(${headAngle}) scale(${isAdult ? 1.0 : 1.15})`}>
        {/* Soft Floppy Ears */}
        <g transform="translate(-4, -6) rotate(-24)">
          <ellipse cx="-4" cy="0" rx="7" ry="3.5" fill="#2E2E33" />
          <ellipse cx="-4" cy="0" rx="4" ry="1.8" fill="#F472B6" opacity="0.6" />
        </g>
        <g transform="translate(6, -6) rotate(24)">
          <ellipse cx="4" cy="0" rx="7" ry="3.5" fill="#2E2E33" />
          <ellipse cx="4" cy="0" rx="4" ry="1.8" fill="#F472B6" opacity="0.6" />
        </g>

        {/* Dark Face */}
        <ellipse cx="1" cy="2" rx="11" ry="13" fill="#2E2E33" />

        {/* Fluffy wool crown on head */}
        <circle cx="-5" cy="-9" r="6" fill="#FFFFFF" />
        <circle cx="1" cy="-11" r="7" fill="#FFFFFF" />
        <circle cx="7" cy="-9" r="6" fill="#FFFFFF" />

        {/* Eyes */}
        {isSleeping ? (
          <path d="M 4 0 Q 7 2 10 0" fill="none" stroke="#FFF" strokeWidth="1.5" />
        ) : isBlinking ? (
          <line x1="4" y1="1" x2="10" y2="1" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
        ) : (
          <g>
            <ellipse cx="7" cy="1" rx="2.5" ry="3" fill="#FFFFFF" />
            <ellipse cx="7" cy="1" rx="1.5" ry="1.8" fill="#0F172A" />
            <circle cx="7.7" cy="0.3" r="0.6" fill="#FFFFFF" />
          </g>
        )}

        {/* Muzzle tip */}
        <ellipse cx="1" cy="10" rx="5" ry="3.5" fill="#222226" />
        <path d="M 0 10 L 2 10 M 1 10 L 1 12" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
      </g>
    </svg>
  );
};

// -------------------------------------------------------------
// Unified Animal Component Router with Product & Status Badges
// -------------------------------------------------------------
export const RealisticAnimal: React.FC<AnimalSpriteProps> = ({
  type,
  growth,
  fullness,
  health,
  stored,
  animTime,
  isMoving,
  facingRight,
  isSleeping,
  isEating,
}) => {
  const isSick = health < 0.3;
  const isHungry = fullness < 0.3;

  const productEmoji = type === 'chicken' ? '🥚' : type === 'cow' ? '🥛' : '🧶';

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {type === 'cow' && (
        <HolsteinCowSprite
          growth={growth}
          health={health}
          animTime={animTime}
          isMoving={isMoving}
          facingRight={facingRight}
          isSleeping={isSleeping}
          isEating={isEating}
        />
      )}
      {type === 'chicken' && (
        <BrownHenSprite
          growth={growth}
          health={health}
          animTime={animTime}
          isMoving={isMoving}
          facingRight={facingRight}
          isSleeping={isSleeping}
          isEating={isEating}
        />
      )}
      {type === 'sheep' && (
        <WoollySheepSprite
          growth={growth}
          health={health}
          animTime={animTime}
          isMoving={isMoving}
          facingRight={facingRight}
          isSleeping={isSleeping}
          isEating={isEating}
        />
      )}

      {/* Status Overlays */}
      {isSick && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-sm animate-bounce" title="Sick">
          🤒
        </div>
      )}
      {!isSick && isHungry && !isSleeping && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-amber-100/90 text-amber-900 font-extrabold px-1 rounded-full shadow-2xs border border-amber-300">
          🍽️
        </div>
      )}
      {isSleeping && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-black text-indigo-300 animate-pulse">
          💤
        </div>
      )}

      {/* Stored uncollected products (up to 3) */}
      {stored > 0 && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-white/90 px-1 py-0.5 rounded-full shadow-md border border-gray-200">
          {Array.from({ length: stored }).map((_, i) => (
            <span key={i} className="text-[11px] leading-none">
              {productEmoji}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
