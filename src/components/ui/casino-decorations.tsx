
import React from 'react';

// Floating casino elements SVG components - Gold/Black theme
export const PokerChip = ({ className, color = "gold" }: { className?: string; color?: "gold" | "green" | "red" | "blue" }) => {
    const colors = {
        gold: { main: "hsl(var(--primary))", accent: "hsl(var(--accent))" },
        green: { main: "#00A86B", accent: "#00C77B" },
        red: { main: "#DC143C", accent: "#FF1744" },
        blue: { main: "#4169E1", accent: "#5C7CFA" },
    };
    const c = colors[color] || colors.gold;

    return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
            <circle cx="50" cy="50" r="45" fill={c.main} stroke="#000" strokeWidth="4" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="8 4" />
            <circle cx="50" cy="50" r="28" fill="#000" stroke={c.accent} strokeWidth="2" />
            <text x="50" y="56" textAnchor="middle" fill={c.accent} fontSize="14" fontWeight="bold">500</text>
        </svg>
    );
};

export const PlayingCard = ({ suit, value, className }: { suit: string; value: string; className?: string }) => (
    <svg viewBox="0 0 60 84" className={className}>
        <defs>
            <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f0f0f0" />
            </linearGradient>
        </defs>
        <rect x="2" y="2" width="56" height="80" rx="4" fill="url(#cardGradient)" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="8" y="20" fill={suit === "♥" || suit === "♦" ? "#DC143C" : "#000"} fontSize="14" fontWeight="bold">{value}</text>
        <text x="30" y="52" textAnchor="middle" fill={suit === "♥" || suit === "♦" ? "#DC143C" : "#000"} fontSize="24">{suit}</text>
        <text x="52" y="76" textAnchor="end" fill={suit === "♥" || suit === "♦" ? "#DC143C" : "#000"} fontSize="14" fontWeight="bold" transform="rotate(180, 52, 70)">{value}</text>
    </svg>
);

export const RouletteWheel = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 120 120" className={className}>
        <defs>
            <linearGradient id="rouletteGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--accent))" />
                <stop offset="50%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary))" />
            </linearGradient>
            <filter id="goldGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <circle cx="60" cy="60" r="55" fill="url(#rouletteGoldGradient)" stroke="#000" strokeWidth="4" filter="url(#goldGlow)" />
        <circle cx="60" cy="60" r="45" fill="#000" stroke="hsl(var(--primary))" strokeWidth="2" />
        {[...Array(12)].map((_, i) => (
            <rect
                key={i}
                x="58"
                y="18"
                width="4"
                height="12"
                fill={i % 2 === 0 ? "#DC143C" : "#000"}
                transform={`rotate(${i * 30} 60 60)`}
            />
        ))}
        <circle cx="60" cy="60" r="20" fill="hsl(var(--primary))" stroke="#000" strokeWidth="2" />
        <circle cx="60" cy="60" r="8" fill="hsl(var(--accent))" />
    </svg>
);

export const Dice = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 60 60" className={className}>
        <defs>
            <linearGradient id="diceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DC143C" />
                <stop offset="100%" stopColor="#8B0000" />
            </linearGradient>
        </defs>
        <rect x="5" y="5" width="50" height="50" rx="8" fill="url(#diceGradient)" stroke="hsl(var(--accent))" strokeWidth="2" />
        <circle cx="20" cy="20" r="4" fill="white" />
        <circle cx="40" cy="20" r="4" fill="white" />
        <circle cx="30" cy="30" r="4" fill="white" />
        <circle cx="20" cy="40" r="4" fill="white" />
        <circle cx="40" cy="40" r="4" fill="white" />
    </svg>
);
