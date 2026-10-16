import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Tag, Check, ArrowRight } from 'lucide-react';

export function BannerSale({ onExploreClick, siteConfig }) {
  if (siteConfig && siteConfig.saleBannerActive === false) {
    return null;
  }

  const [timeLeft, setTimeLeft] = useState({
    days: siteConfig?.saleCountdownDays || 18,
    hours: 4,
    minutes: 39,
    seconds: 22
  });
  const [copiedCode, setCopiedCode] = useState(false);

  const couponCode = siteConfig?.saleCouponCode || 'PINK20';
  const saleTitle = siteConfig?.saleTitle || 'SPRING PINK SALE IS LIVE!';
  const serverName = siteConfig?.serverName || 'Ceylon SMP';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div 
      style={{
        margin: '18px auto 30px auto',
        maxWidth: '1280px',
        padding: '0 20px'
      }}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at 70% 50%, rgba(255, 46, 147, 0.35) 0%, rgba(33, 14, 45, 0.95) 70%, #0d0914 100%)',
          border: '1px solid rgba(255, 46, 147, 0.45)',
          boxShadow: '0 16px 40px -10px rgba(255, 46, 147, 0.35)',
          padding: '28px 36px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}
      >
        {/* Subtle decorative glow overlay */}
        <div 
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '260px',
            height: '260px',
            background: 'radial-gradient(circle, rgba(255, 46, 147, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Left text and banner details */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '650px' }}>
          {/* Sale countdown ticker */}
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 46, 147, 0.2)',
              border: '1px solid rgba(255, 46, 147, 0.4)',
              padding: '6px 14px',
              borderRadius: '9999px',
              color: '#ffe4ed',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '12px',
              boxShadow: '0 0 14px rgba(255, 46, 147, 0.3)'
            }}
          >
            <Clock size={16} style={{ color: '#ff75a0' }} />
            <span>ENDS IN:</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#ffffff', letterSpacing: '0.04em' }}>
              {timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.7rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              margin: '0 0 10px 0',
              color: '#ffffff'
            }}
          >
            {saleTitle.includes('PINK SALE') ? (
              <>
                {saleTitle.split('PINK SALE')[0]}
                <span style={{ 
                  background: 'linear-gradient(135deg, #ff75a0 0%, #ff2e93 50%, #f43f5e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 25px rgba(255, 46, 147, 0.5)'
                }}>PINK SALE</span>
                {saleTitle.split('PINK SALE')[1]}
              </>
            ) : (
              saleTitle
            )}
          </h2>

          <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
            Elevate your {serverName} adventure with limited-time discount rates on all ranks (God down to Noob) and mythic crate key bundles!
          </p>
        </div>

        {/* Right CTA and Coupon code box */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div 
            style={{
              background: 'rgba(15, 10, 20, 0.75)',
              border: '1px dashed rgba(255, 46, 147, 0.5)',
              borderRadius: '12px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                Store Coupon Code:
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 800, color: '#ff75a0', letterSpacing: '0.08em' }}>
                {couponCode}
              </div>
            </div>

            <button
              onClick={handleCopyCode}
              style={{
                background: 'rgba(255, 46, 147, 0.2)',
                border: '1px solid rgba(255, 46, 147, 0.4)',
                borderRadius: '8px',
                padding: '6px 12px',
                color: '#fff',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {copiedCode ? (
                <>
                  <Check size={14} style={{ color: '#4ade80' }} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Tag size={14} />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={onExploreClick}
            className="btn-primary"
            style={{
              padding: '12px 24px',
              fontSize: '0.95rem',
              borderRadius: '10px'
            }}
          >
            <Sparkles size={18} />
            <span>Browse Ranks & Crates</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
