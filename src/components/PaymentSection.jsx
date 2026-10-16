import React from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Lock, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export function PaymentSection() {
  const paymentMethods = [
    {
      name: 'Credit & Debit Cards',
      desc: 'Visa, Mastercard, American Express, Discover',
      badge: 'Instant Delivery',
      color: '#ff2e93',
      svg: (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontWeight: 800, color: '#1a56db', fontSize: '1.2rem', fontFamily: 'sans-serif' }}>VISA</span>
          <span style={{ fontWeight: 800, color: '#eb001b', fontSize: '1.1rem', fontFamily: 'sans-serif' }}>Mastercard</span>
        </div>
      )
    },
    {
      name: 'PayPal',
      desc: 'PayPal Balance, Linked Bank, Pay in 4',
      badge: 'Buyer Protection',
      color: '#0284c7',
      svg: (
        <span style={{ fontWeight: 900, color: '#003087', fontSize: '1.2rem', fontStyle: 'italic', fontFamily: 'sans-serif' }}>
          Pay<span style={{ color: '#0079C1' }}>Pal</span>
        </span>
      )
    },
    {
      name: 'Apple Pay & Google Pay',
      desc: '1-Touch biometrics from your phone or browser',
      badge: 'Fastest Checkout',
      color: '#10b981',
      svg: (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.95rem' }}>
          <span style={{ color: '#000000', fontWeight: 900 }}>Pay</span>
          <span style={{ color: '#1f2937', fontWeight: 900 }}>GPay</span>
        </div>
      )
    },
    {
      name: 'Paysafecard',
      desc: 'Prepaid cash voucher codes with no bank required',
      badge: '100% Anonymous',
      color: '#06b6d4',
      svg: (
        <span style={{ fontWeight: 800, color: '#0099cc', fontSize: '1rem', letterSpacing: '-0.02em' }}>
          paysafecard
        </span>
      )
    }
  ];

  return (
    <section id="payments" style={{ padding: '40px 20px', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 
          style={{ 
            fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', 
            fontWeight: 900, 
            letterSpacing: '-0.02em', 
            color: '#ffffff',
            marginBottom: '8px' 
          }}
        >
          Accepted <span style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #ff75a0 50%, #ff2e93 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Payment Methods</span> & Security
        </h2>
      </div>

      {/* 3 Step Process Bar */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}
      >
        <div style={{ background: 'rgba(23, 16, 30, 0.75)', border: '1px solid rgba(255, 46, 147, 0.2)', borderRadius: '16px', padding: '20px', display: 'flex', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255, 46, 147, 0.15)', color: '#ff75a0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', flexShrink: 0 }}>
            1
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff', marginBottom: '4px' }}>
              Select Rank or Keys
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Choose God/Elite+ ranks or custom key amounts (1, 5, 10, 20 keys).
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(23, 16, 30, 0.75)', border: '1px solid rgba(255, 46, 147, 0.2)', borderRadius: '16px', padding: '20px', display: 'flex', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255, 46, 147, 0.15)', color: '#ff75a0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', flexShrink: 0 }}>
            2
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff', marginBottom: '4px' }}>
              Enter In-Game Name (IGN)
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Sign in with your Google account and link your Minecraft character.
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(23, 16, 30, 0.75)', border: '1px solid rgba(255, 46, 147, 0.2)', borderRadius: '16px', padding: '20px', display: 'flex', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', flexShrink: 0 }}>
            3
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff', marginBottom: '4px' }}>
              Instant In-Game Delivery
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Our server automatically grants perks to your player in 30-90 seconds!
            </div>
          </div>
        </div>
      </div>

      {/* Payment Provider Cards */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}
      >
        {paymentMethods.map((pm, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(26, 18, 34, 0.75)',
              border: '1px solid rgba(255, 46, 147, 0.25)',
              borderRadius: '16px',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ background: '#ffffff', padding: '6px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', height: '36px' }}>
                  {pm.svg}
                </div>
                <span style={{ fontSize: '0.72rem', color: '#4ade80', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '2px 8px', borderRadius: '9999px', fontWeight: 700 }}>
                  {pm.badge}
                </span>
              </div>

              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#ffffff', marginBottom: '4px' }}>
                {pm.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4 }}>
                {pm.desc}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#ff75a0', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
              <Lock size={12} /> 256-Bit Encrypted & Tebex Protected
            </div>
          </div>
        ))}
      </div>

      {/* Security Guarantee Strip */}
      <div 
        style={{
          background: 'linear-gradient(90deg, rgba(255, 46, 147, 0.1) 0%, rgba(20, 10, 26, 0.8) 50%, rgba(255, 46, 147, 0.1) 100%)',
          border: '1px solid rgba(255, 46, 147, 0.3)',
          borderRadius: '16px',
          padding: '20px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: '#ff2e93', color: '#fff', padding: '10px', borderRadius: '12px', display: 'flex' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>
              100% Purchase Guarantee & Instant Delivery
            </div>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
              Every rank and crate key transaction is verified automatically by Ceylon SMP server sockets.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: '#94a3b8' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#86efac' }}>
            <CheckCircle2 size={14} /> Zero Hidden Fees
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#86efac' }}>
            <CheckCircle2 size={14} /> 24/7 Discord Ticket Desk
          </span>
        </div>
      </div>
    </section>
  );
}
