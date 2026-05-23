'use client'

import React from 'react'
import { ShoppingBag, Star, Heart, ShieldAlert, Award } from 'lucide-react'
import { usePomodoro, SHOP_ITEMS } from '../context/PomodoroContext'
import type { ShopItem } from '../types'

export const Shop: React.FC = () => {
  const { coins, inventory, buyItem, useItem, pet } = usePomodoro()

  // Dynamic Lucide icon matcher
  const renderItemIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bowl':
        return <span className="text-3xl">🥣</span>
      case 'Cookie':
        return <span className="text-3xl">🍪</span>
      case 'Dribbble':
        return <span className="text-3xl">⚽</span>
      case 'Crown':
        return <span className="text-3xl">👑</span>
      default:
        return <ShoppingBag className="w-6 h-6 text-calm-primary" />
    }
  }

  // Check if item is food, toy, or accessory to show benefit label
  const renderBenefitLabel = (item: ShopItem) => {
    if (item.type === 'comida') {
      return (
        <span className="flex items-center gap-1 text-[11px] font-semibold text-calm-primary bg-calm-primary/10 px-2.5 py-0.5 rounded-full">
          +{item.benefit} Fome
        </span>
      )
    }
    if (item.type === 'brinquedo') {
      return (
        <span className="flex items-center gap-1 text-[11px] font-semibold text-red-500 bg-red-50 dark:bg-red-950/20 px-2.5 py-0.5 rounded-full">
          <Heart className="w-3 h-3 fill-red-500" /> +{item.benefit} Diversão
        </span>
      )
    }
    return (
      <span className="flex items-center gap-1 text-[11px] font-semibold text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20 px-2.5 py-0.5 rounded-full">
        <Award className="w-3 h-3" /> +{item.benefit} XP Estilo
      </span>
    )
  }

  return (
    <div className="w-full flex flex-col gap-6 p-6 rounded-3xl bg-calm-card/45 backdrop-blur-xl border border-calm-border/60 shadow-xl relative overflow-hidden transition-all duration-500">
      
      {/* Background Soft Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-calm-primary/5 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-calm-border/50 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-calm-primary/15 text-calm-primary">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-calm-text">Loja do Mascote</h3>
            <p className="text-xs text-calm-text/50">Compre mimos e nutra seu pet companion</p>
          </div>
        </div>
        
        {/* User Balance Balance */}
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/40 text-amber-600 font-bold text-sm">
          <span>🪙</span>
          <span>{coins}</span>
        </div>
      </div>

      {/* Item list deck */}
      <div className="flex flex-col gap-4">
        {SHOP_ITEMS.map(item => {
          const quantityOwned = inventory[item.id] || 0
          const canAfford = coins >= item.cost

          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-calm-bg/50 border border-calm-border/80 hover:border-calm-primary/30 transition-all duration-300"
            >
              {/* Item Info Description */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-calm-secondary/35 flex items-center justify-center flex-shrink-0 relative border border-calm-border/60">
                  {renderItemIcon(item.icon)}
                  
                  {/* Quantity owned badge */}
                  {quantityOwned > 0 && (
                    <span className="absolute -top-2 -right-2 bg-calm-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      {quantityOwned}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-calm-text text-sm truncate">{item.name}</h4>
                    {renderBenefitLabel(item)}
                  </div>
                  <p className="text-xs text-calm-text/60 leading-normal line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Purchase/Usage Actions */}
              <div className="flex items-center gap-2 sm:self-center self-end flex-shrink-0">
                {/* Buy Button */}
                <button
                  onClick={() => buyItem(item)}
                  disabled={!canAfford}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 active:scale-95 ${
                    canAfford
                      ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-transparent border-calm-border/80 text-calm-text/40 cursor-not-allowed'
                  }`}
                  title={canAfford ? 'Comprar item' : 'Moedas insuficientes'}
                >
                  <span>🪙 {item.cost}</span>
                  <span className="font-medium">Comprar</span>
                </button>

                {/* Feed/Play item button */}
                <button
                  onClick={() => useItem(item.id)}
                  disabled={quantityOwned <= 0}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                    quantityOwned > 0
                      ? 'bg-calm-primary hover:bg-calm-primary/90 text-white border-calm-primary shadow-sm'
                      : 'bg-transparent border-calm-border/80 text-calm-text/30 cursor-not-allowed'
                  }`}
                >
                  Dar ao Pet
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
