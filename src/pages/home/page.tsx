import { ValuationForm } from '@/features/valuation-by-vin/ui/ValuationForm';

export const HomePage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 20px',
        fontFamily: '"Inter", system-ui, sans-serif',
      }}
    >
      {/* Фоновое авто */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'ur[](https://images.unsplash.com/photo-1544636331-80100aa0af82?w=1600&q=80) center/cover no-repeat',
          opacity: 0.15,
          zIndex: -1,
        }}
      />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
        {/* Заголовок */}
        <div style={{ textAlign: 'center', color: 'white', marginBottom: 48 }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, textShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
            Оценка авто
          </h1>
          <p style={{ fontSize: '1.5rem', marginTop: 16, opacity: 0.95 }}>
            Узнайте реальную рыночную стоимость за 3 секунды
          </p>
        </div>

        {/* Табы */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
          <button
            style={{
              padding: '12px 32px',
              fontSize: '1.1rem',
              background: 'rgba(255,255,255,0.95)',
              color: '#333',
              border: 'none',
              borderRadius: 12,
              fontWeight: 600,
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
            }}
          >
            По VIN-коду
          </button>
          <button
            disabled
            style={{
              padding: '12px 32px',
              fontSize: '1.1rem',
              background: 'rgba(255,255,255,0.6)',
              color: '#999',
              border: 'none',
              borderRadius: 12,
              cursor: 'not-allowed',
            }}
          >
            По характеристикам (скоро)
          </button>
        </div>

        {/* Форма в карточке */}
        <div
          style={{
            background: 'rgba(255,255,255,0.98)',
            borderRadius: 24,
            padding: 40,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <ValuationForm />
        </div>
      </div>
    </div>
  );
};