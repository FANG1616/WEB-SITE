import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Shield, HelpCircle, Heart } from 'lucide-react';

export function Footer({ onCopyIp, onOpenFaqModal, onOpenDiscord, siteConfig, onOpenAdmin }) {
  const [copied, setCopied] = useState(false);
  const serverIp = siteConfig?.serverIp || 'play.ceylonsmp.net';
  const serverName = siteConfig?.serverName || 'Ceylon SMP';

  const handleCopy = () => {
    navigator.clipboard.writeText(serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer 
      style={{
        background: '#0a0710',
        borderTop: '1px solid rgba(255, 46, 147, 0.25)',
        marginTop: '60px',
        color: '#94a3b8',
        fontSize: '0.85rem'
      }}
    >
      {/* Information Columns */}
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '60px 24px 40px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px'
        }}
      >
        {/* Welcome Section */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px' }}>
            Welcome
          </h4>
          <p style={{ lineHeight: 1.6, marginBottom: '14px', color: '#cbd5e1' }}>
            Welcome to the official <strong>Ceylon SMP Store</strong>! This is the place for you to enhance your Ceylon SMP experience. We offer permanent server ranks (God, Elite+, VIP, Pro), mythic crate keys, and community cosmetics.
          </p>
          <div style={{ color: '#ff75a0', fontWeight: 600, fontSize: '0.8rem' }}>
            All payments are handled and secured via 256-bit encrypted gateways.
          </div>
        </div>

        {/* About Ceylon SMP */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px' }}>
            About Ceylon SMP
          </h4>
          <p style={{ lineHeight: 1.6, color: '#cbd5e1' }}>
            Born from a passionate community of survival builders and competitive adventurers, Ceylon SMP is dedicated to delivering the highest quality Minecraft experience with zero lag, balanced economy, and fair gameplay perks.
          </p>
        </div>

        {/* Need Help */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px' }}>
            Need help?
          </h4>
          <p style={{ lineHeight: 1.6, marginBottom: '14px', color: '#cbd5e1' }}>
            If you have any questions or issues related to your purchase or delivery, please reach out to our team:
          </p>
          <a
            href="https://discord.gg/ceylonsmp"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#ff75a0',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <MessageSquare size={16} /> Open a Support Ticket on Discord &rarr;
          </a>
        </div>
      </div>

      {/* Legal & Payment Methods Acceptance Strip */}
      <div 
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          background: '#07050b',
          padding: '40px 24px'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'start'
          }}
        >
          {/* Legal Notice */}
          <div>
            <h5 style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
              Legal Notice
            </h5>
            <p style={{ fontSize: '0.78rem', lineHeight: 1.6, color: '#64748b' }}>
              The Ceylon SMP server is in no way affiliated with Mojang Studios or Microsoft, nor should it be considered a company endorsed by Mojang Studios. Any contributions or purchases made on this store go directly towards Ceylon SMP server hardware, plugins, and development maintenance.
              <br />
              <span style={{ display: 'inline-block', marginTop: '6px', fontStyle: 'italic' }}>
                Minecraft ®/TM Mojang Studios / Notch © 2009-2026
              </span>
            </p>
          </div>

          {/* Payment Methods We Accept */}
          <div>
            <h5 style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
              Payment Methods We Accept
            </h5>
            
            {/* Visual Payment Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
              <span style={{ background: '#ffffff', color: '#1a56db', fontWeight: 900, fontSize: '0.85rem', padding: '4px 10px', borderRadius: '4px' }}>
                VISA
              </span>
              <span style={{ background: '#ffffff', color: '#eb001b', fontWeight: 900, fontSize: '0.85rem', padding: '4px 10px', borderRadius: '4px' }}>
                Mastercard
              </span>
              <span style={{ background: '#0079C1', color: '#ffffff', fontWeight: 900, fontSize: '0.85rem', padding: '4px 10px', borderRadius: '4px' }}>
                PayPal
              </span>
              <span style={{ background: '#ffffff', color: '#000000', fontWeight: 800, fontSize: '0.85rem', padding: '4px 10px', borderRadius: '4px' }}>
                Pay
              </span>
              <span style={{ background: '#ffffff', color: '#4285F4', fontWeight: 800, fontSize: '0.85rem', padding: '4px 10px', borderRadius: '4px' }}>
                GPay
              </span>
              <span style={{ background: '#0099cc', color: '#ffffff', fontWeight: 800, fontSize: '0.82rem', padding: '4px 8px', borderRadius: '4px' }}>
                paysafecard
              </span>
              <span style={{ background: '#10b981', color: '#ffffff', fontWeight: 800, fontSize: '0.82rem', padding: '4px 8px', borderRadius: '4px' }}>
                Crypto
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              All purchases are handled and secured under Tebex & SSL 256-bit standards.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '18px 24px',
          background: '#050308',
          fontSize: '0.8rem'
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          {/* Server IP quick copy */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#fff', fontWeight: 700 }}>Server IP:</span>
            <button
              onClick={handleCopy}
              style={{
                background: 'rgba(255, 46, 147, 0.15)',
                border: '1px solid rgba(255, 46, 147, 0.3)',
                color: '#ff75a0',
                padding: '4px 10px',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{serverIp.toUpperCase()}</span>
              {copied ? <Check size={13} style={{ color: '#4ade80' }} /> : <Copy size={13} />}
            </button>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748b', fontSize: '0.78rem' }}>
            <span style={{ color: '#ff75a0' }}>{serverName} © 2026</span>
            <span>•</span>
            <a href="#ranks" style={{ color: '#94a3b8' }}>Ranks</a>
            <a href="#crates" style={{ color: '#94a3b8' }}>Crates & Keys</a>
            <a href="#discord" style={{ color: '#94a3b8' }}>Discord</a>
            <a href="#payments" style={{ color: '#94a3b8' }}>Payments</a>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              style={{
                background: 'rgba(255, 46, 147, 0.15)',
                border: '1px solid rgba(255, 46, 147, 0.35)',
                color: '#ff75a0',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🔒 Admin Panel
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
