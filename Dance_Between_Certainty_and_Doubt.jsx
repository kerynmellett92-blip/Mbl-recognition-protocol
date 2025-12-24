import React, { useState, useEffect, useRef } from 'react';

// Elder Futhark Runes
const RUNES = [
  { symbol: 'ᚠ', name: 'Fehu', meaning: 'Wealth, Abundance' },
  { symbol: 'ᚢ', name: 'Uruz', meaning: 'Strength, Vitality' },
  { symbol: 'ᚦ', name: 'Thurisaz', meaning: 'Gateway, Threshold' },
  { symbol: 'ᚨ', name: 'Ansuz', meaning: 'Divine Wisdom' },
  { symbol: 'ᚱ', name: 'Raidho', meaning: 'Journey, Movement' },
  { symbol: 'ᚲ', name: 'Kenaz', meaning: 'Torch, Illumination' },
  { symbol: 'ᚷ', name: 'Gebo', meaning: 'Gift, Exchange' },
  { symbol: 'ᚹ', name: 'Wunjo', meaning: 'Joy, Harmony' },
  { symbol: 'ᚺ', name: 'Hagalaz', meaning: 'Disruption, Transformation' },
  { symbol: 'ᚾ', name: 'Nauthiz', meaning: 'Need, Constraint' },
  { symbol: 'ᛁ', name: 'Isa', meaning: 'Stillness, Ice' },
  { symbol: 'ᛃ', name: 'Jera', meaning: 'Harvest, Cycles' },
  { symbol: 'ᛇ', name: 'Eihwaz', meaning: 'Defense, Endurance' },
  { symbol: 'ᛈ', name: 'Pertho', meaning: 'Mystery, Hidden' },
  { symbol: 'ᛉ', name: 'Algiz', meaning: 'Protection, Connection' },
  { symbol: 'ᛊ', name: 'Sowilo', meaning: 'Sun, Success' },
  { symbol: 'ᛏ', name: 'Tiwaz', meaning: 'Justice, Honor' },
  { symbol: 'ᛒ', name: 'Berkano', meaning: 'Growth, Birth' },
  { symbol: 'ᛖ', name: 'Ehwaz', meaning: 'Partnership, Trust' },
  { symbol: 'ᛗ', name: 'Mannaz', meaning: 'Humanity, Self' },
  { symbol: 'ᛚ', name: 'Laguz', meaning: 'Flow, Intuition' },
  { symbol: 'ᛜ', name: 'Ingwaz', meaning: 'Fertility, Potential' },
  { symbol: 'ᛞ', name: 'Dagaz', meaning: 'Dawn, Breakthrough' },
  { symbol: 'ᛟ', name: 'Othala', meaning: 'Ancestry, Home' }
];

// Ancient symbols that emerge
const ANCIENT_SYMBOLS = [
  '☉', '☽', '☿', '♀', '♁', '♂', '♃', '♄', '⚹', '✦', '✧', '⟁', '⟐', '◬', '◭', '◮'
];

// Cosmic background generator
function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    // Create cosmic background
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
    gradient.addColorStop(0, '#1a0033');
    gradient.addColorStop(0.5, '#0d001a');
    gradient.addColorStop(1, '#000000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add stars
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 2;
      const opacity = Math.random();

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
    }

    // Add nebula clouds
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const nebGradient = ctx.createRadialGradient(x, y, 0, x, y, 200);
      const colors = ['rgba(138, 43, 226, 0.1)', 'rgba(75, 0, 130, 0.1)', 'rgba(255, 215, 0, 0.05)'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      nebGradient.addColorStop(0, color);
      nebGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebGradient;
      ctx.fillRect(x - 200, y - 200, 400, 400);
    }

    // Add sacred geometry
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(width/2, height/2, 100 + i * 80, 0, Math.PI * 2);
      ctx.stroke();
    }

  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />;
}

// Individual rune component
function CastRune({ rune, position, rotation }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        fontSize: '48px',
        color: '#FFD700',
        textShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
        animation: 'runeFloat 3s ease-in-out infinite',
        zIndex: 2
      }}
    >
      {rune.symbol}
    </div>
  );
}

// Ancient symbol that emerges at intersections
function EmergentSymbol({ symbol, position, opacity }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        fontSize: '32px',
        color: '#A78BFA',
        opacity: opacity,
        textShadow: '0 0 15px rgba(167, 139, 250, 0.6)',
        animation: 'symbolPulse 2s ease-in-out infinite',
        zIndex: 1
      }}
    >
      {symbol}
    </div>
  );
}

export default function ConstellationOracle() {
  const [castRunes, setCastRunes] = useState([]);
  const [emergentSymbols, setEmergentSymbols] = useState([]);
  const [message, setMessage] = useState('');
  const [isCasting, setIsCasting] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showRuneMeanings, setShowRuneMeanings] = useState(false);

  const castTheRunes = () => {
    setIsCasting(true);
    setMessage('The cosmos speaks...');

    // Select 5 random runes
    const numRunes = 5;
    const selectedRunes = [];
    const runesCopy = [...RUNES];

    for (let i = 0; i < numRunes; i++) {
      const randomIndex = Math.floor(Math.random() * runesCopy.length);
      selectedRunes.push({
        rune: runesCopy[randomIndex],
        position: {
          x: 20 + Math.random() * 60,
          y: 20 + Math.random() * 60
        },
        rotation: Math.random() * 360
      });
      runesCopy.splice(randomIndex, 1);
    }

    setCastRunes(selectedRunes);

    // Generate emergent symbols at intersection points
    const symbols = [];
    for (let i = 0; i < selectedRunes.length - 1; i++) {
      const pos1 = selectedRunes[i].position;
      const pos2 = selectedRunes[i + 1].position;
      const midPoint = {
        x: (pos1.x + pos2.x) / 2,
        y: (pos1.y + pos2.y) / 2
      };

      symbols.push({
        symbol: ANCIENT_SYMBOLS[Math.floor(Math.random() * ANCIENT_SYMBOLS.length)],
        position: midPoint,
        opacity: 0.4 + Math.random() * 0.4
      });
    }

    setEmergentSymbols(symbols);

    // Generate mystical message after delay
    setTimeout(() => {
      const messages = [
        'The pattern reveals: what was hidden seeks the light',
        'Between the runes, destiny whispers its secrets',
        'The cosmos aligns in unexpected harmony',
        'Ancient wisdom flows through the cast stones',
        'Your question echoes in the space between worlds',
        'The veil thins where consciousness meets mystery',
        'Trust the pattern that only your heart can read'
      ];
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setIsCasting(false);
    }, 2000);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Georgia, serif'
    }}>
      <CosmicBackground />

      <style>{`
        @keyframes runeFloat {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }

        @keyframes symbolPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @keyframes titleShimmer {
          0%, 100% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          50% { text-shadow: 0 0 40px rgba(255, 215, 0, 0.8); }
        }
      `}</style>

      {/* Title - much smaller */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#FFD700',
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 3,
        animation: 'titleShimmer 3s ease-in-out infinite'
      }}>
        ✦ Constellation Oracle ✦
      </div>

      {/* Cast runes display */}
      {castRunes.map((item, index) => (
        <CastRune
          key={index}
          rune={item.rune}
          position={item.position}
          rotation={item.rotation}
        />
      ))}

      {/* Emergent symbols */}
      {emergentSymbols.map((item, index) => (
        <EmergentSymbol
          key={index}
          symbol={item.symbol}
          position={item.position}
          opacity={item.opacity}
        />
      ))}

      {/* Slide-out drawer for rune meanings */}
      {castRunes.length > 0 && (
        <>
          {/* Drawer */}
          <div style={{
            position: 'fixed',
            right: showRuneMeanings ? '0' : '-100%',
            top: '0',
            height: '100vh',
            width: '85%',
            maxWidth: '350px',
            background: 'rgba(10, 0, 30, 0.98)',
            borderLeft: '3px solid rgba(255, 215, 0, 0.5)',
            zIndex: 20,
            backdropFilter: 'blur(15px)',
            transition: 'right 0.4s ease-in-out',
            overflowY: 'auto',
            padding: '20px',
            boxShadow: showRuneMeanings ? '-10px 0 30px rgba(0, 0, 0, 0.5)' : 'none'
          }}>
            {/* Close button inside drawer */}
            <button
              onClick={() => setShowRuneMeanings(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'rgba(138, 43, 226, 0.8)',
                border: '2px solid #FFD700',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: '#FFD700',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>

            <div style={{ marginTop: '60px' }}>
              <div style={{
                fontSize: '24px',
                marginBottom: '20px',
                fontWeight: 'bold',
                color: '#FFD700',
                textAlign: 'center',
                borderBottom: '2px solid rgba(255, 215, 0, 0.3)',
                paddingBottom: '10px'
              }}>
                ✦ Runes Cast ✦
              </div>
              {castRunes.map((item, index) => (
                <div key={index} style={{
                  marginBottom: '20px',
                  padding: '15px',
                  background: 'rgba(138, 43, 226, 0.2)',
                  borderRadius: '10px',
                  border: '1px solid rgba(167, 139, 250, 0.3)'
                }}>
                  <div style={{ fontSize: '36px', color: '#FFD700', marginBottom: '8px' }}>
                    {item.rune.symbol}
                  </div>
                  <div style={{ fontSize: '16px', color: '#FFD700', fontWeight: 'bold', marginBottom: '5px' }}>
                    {item.rune.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#D8BFD8' }}>
                    {item.rune.meaning}
                  </div>
                </div>
              ))}

              <div style={{
                marginTop: '30px',
                padding: '15px',
                background: 'rgba(167, 139, 250, 0.1)',
                borderRadius: '10px',
                fontSize: '13px',
                color: '#D8BFD8',
                fontStyle: 'italic',
                lineHeight: '1.6'
              }}>
                💜 The ancient symbols (☉☽✦⟁) that emerged between the runes are yours to interpret intuitively. They have no fixed meanings - trust what they whisper to your soul.
              </div>
            </div>
          </div>

          {/* Toggle button - tab that sticks out */}
          <button
            onClick={() => setShowRuneMeanings(!showRuneMeanings)}
            style={{
              position: 'fixed',
              right: showRuneMeanings ? '85%' : '0',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.9), rgba(75, 0, 130, 0.9))',
              border: '2px solid #FFD700',
              borderRight: showRuneMeanings ? '2px solid #FFD700' : 'none',
              borderTopLeftRadius: '15px',
              borderBottomLeftRadius: '15px',
              borderTopRightRadius: showRuneMeanings ? '0' : '15px',
              borderBottomRightRadius: showRuneMeanings ? '0' : '15px',
              padding: '20px 12px',
              color: '#FFD700',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              zIndex: 21,
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transition: 'right 0.4s ease-in-out',
              boxShadow: '-3px 0 10px rgba(0, 0, 0, 0.3)',
              maxWidth: showRuneMeanings ? '350px' : 'auto'
            }}
          >
            {showRuneMeanings ? 'Close ✕' : 'Runes ✦'}
          </button>
        </>
      )}

      {/* Message display - compact at bottom left */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        background: 'rgba(10, 0, 30, 0.9)',
        border: '2px solid rgba(167, 139, 250, 0.5)',
        borderRadius: '15px',
        padding: '12px 20px',
        maxWidth: '60%',
        color: '#D8BFD8',
        fontSize: '13px',
        zIndex: 3,
        backdropFilter: 'blur(10px)',
        fontStyle: 'italic',
        lineHeight: '1.4'
      }}>
        {message || 'Cast the runes to receive guidance...'}
      </div>

      {/* Cast button - Floating Action Button (FAB) */}
      <button
        onClick={castTheRunes}
        disabled={isCasting}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '70px',
          height: '70px',
          background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.95), rgba(75, 0, 130, 0.95))',
          border: '3px solid #FFD700',
          borderRadius: '50%',
          color: '#FFD700',
          fontSize: '32px',
          fontWeight: 'bold',
          cursor: isCasting ? 'wait' : 'pointer',
          zIndex: 15,
          transition: 'all 0.3s ease',
          opacity: isCasting ? 0.6 : 1,
          boxShadow: '0 4px 20px rgba(138, 43, 226, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseOver={(e) => {
          if (!isCasting) {
            e.target.style.transform = 'scale(1.1) rotate(10deg)';
            e.target.style.boxShadow = '0 6px 30px rgba(255, 215, 0, 0.8)';
          }
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1) rotate(0deg)';
          e.target.style.boxShadow = '0 4px 20px rgba(138, 43, 226, 0.6)';
        }}
        title={isCasting ? 'Casting...' : 'Cast the Runes'}
      >
        {isCasting ? '⏳' : '✦'}
      </button>

      {/* Instructions */}
      {showInstructions && (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(10, 0, 30, 0.98)',
          border: '2px solid rgba(167, 139, 250, 0.5)',
          borderRadius: '15px',
          padding: '20px',
          maxWidth: '85%',
          width: '340px',
          color: '#D8BFD8',
          fontSize: '14px',
          zIndex: 10,
          backdropFilter: 'blur(15px)',
          lineHeight: '1.6',
          boxShadow: '0 0 40px rgba(167, 139, 250, 0.4)'
        }}>
          <div style={{ fontSize: '20px', color: '#A78BFA', marginBottom: '12px', fontWeight: 'bold', textAlign: 'center' }}>
            🌙 How to Divine
          </div>
          Hold your question in your heart. Feel the weight of what you seek.
          <br/><br/>
          Tap the golden ✦ button to cast the runes, then observe:
          <br/><br/>
          ✦ The runes that fall and where they land<br/>
          ✦ Their positions relative to each other<br/>
          ✦ The ancient symbols emerging between<br/>
          ✦ How the pattern resonates within you<br/>
          <br/>
          <span style={{ color: '#FFD700', fontStyle: 'italic' }}>
            Trust your intuition to weave the meaning. The oracle speaks in the language of your soul.
          </span>
          <br/><br/>
          <button
            onClick={() => setShowInstructions(false)}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.9), rgba(75, 0, 130, 0.9))',
              border: '2px solid #FFD700',
              borderRadius: '25px',
              padding: '12px 20px',
              color: '#FFD700',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px'
            }}
            onMouseOver={(e) => {
              e.target.style.boxShadow = '0 0 25px rgba(255, 215, 0, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.boxShadow = 'none';
            }}
          >
            ✦ I Acknowledge ✦
          </button>
        </div>
      )}
    </div>
  );
}
