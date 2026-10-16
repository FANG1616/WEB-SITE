import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, MessageSquare, Headphones } from 'lucide-react';
import { FAQS } from '../data/storeData';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
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
          Frequently Asked <span style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #ff75a0 50%, #ff2e93 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Questions</span>
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              style={{
                background: 'rgba(23, 16, 30, 0.75)',
                border: isOpen ? '1px solid #ff2e93' : '1px solid rgba(255, 46, 147, 0.2)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.2s ease'
              }}
            >
              <button
                onClick={() => toggleFaq(index)}
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  textAlign: 'left',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  gap: '12px'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#ff75a0', fontWeight: 800 }}>Q:</span>
                  {faq.q}
                </span>
                {isOpen ? <ChevronUp size={18} style={{ color: '#ff75a0' }} /> : <ChevronDown size={18} style={{ color: '#64748b' }} />}
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '0 20px 20px 42px',
                    color: '#cbd5e1',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '14px'
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
