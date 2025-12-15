import { useState } from 'react';
import { Car, Search, AlertCircle, Info } from 'lucide-react';

export const ValuationForm = () => {
  const [vin, setVin] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(vin)) {
      setError('VIN должен содержать ровно 17 символов (без I, O, Q)');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/valuation/vin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vin: vin.toUpperCase() }),
      });

      if (!response.ok) {
        const errData = await response.json();
        if (response.status === 404) {
          setError(errData.message || errData.error);
        } else {
          throw new Error(errData.error || `Ошибка сервера`);
        }
      } else {
        const data = await response.json();
        setResult(data);
        
      }
    } catch (err: any) {
      setError(err.message || 'Не удалось связаться с сервером');
    } finally {
      setLoading(false);
    }
  };

  const progress = (vin.length / 17) * 100;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ fontSize: '2.2rem', fontWeight: '900', textAlign: 'center', marginBottom: 32, color: '#1e293b' }}>
        Оценка по VIN-коду
      </h2>

      {/* Прогресс-бар */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: '1rem', color: '#64748b' }}>Заполнено символов</span>
          <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e293b' }}>
            {vin.length} / 17
          </span>
        </div>
        <div style={{ height: 12, background: '#e2e8f0', borderRadius: 6, overflow: 'hidden' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
              borderRadius: 6,
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ position: 'relative', marginBottom: 24 }}>
          <Search style={{ position: 'absolute', left: 16, top: 20, color: '#64748b' }} size={28} />
          <input
            type="text"
            value={vin}
            onChange={(e) =>
              setVin(e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/gi, ''))
            }
            placeholder="Введите VIN (например: XTA219000P1234567)"
            maxLength={17}
            autoFocus
            style={{
              width: '100%',
              padding: '20px 20px 20px 60px',
              fontSize: '1.4rem',
              fontFamily: 'monospace',
              letterSpacing: '4px',
              borderRadius: 16,
              border: '3px solid #e2e8f0',
              textAlign: 'center',
              transition: 'all 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
            onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
          />
        </div>

        {/* Ошибка или подсказка от бэкенда */}
        {error && (
          <div
            style={{
              padding: 20,
              background: '#fef2f2',
              border: '2px solid #fecaca',
              borderRadius: 16,
              color: '#991b1b',
              textAlign: 'center',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}
          >
            <AlertCircle size={32} />
            <div>
              <p style={{ fontWeight: 'bold', margin: 0 }}>{error}</p>
              {error.includes('Используйте оценку по характеристикам') && (
                <p style={{ fontSize: '0.95rem', margin: '8px 0 0' }}>
                  Перейдите на вкладку "По характеристикам" для ручного ввода данных
                </p>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || vin.length !== 17}
          style={{
            width: '100%',
            padding: '20px',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            background: vin.length === 17 && !loading ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : '#cbd5e1',
            color: 'white',
            border: 'none',
            borderRadius: 16,
            cursor: vin.length === 17 && !loading ? 'pointer' : 'not-allowed',
            boxShadow: vin.length === 17 ? '0 12px 30px rgba(79,70,229,0.4)' : 'none',
            transition: 'all 0.4s',
          }}
        >
          {loading ? 'Оцениваем стоимость...' : 'Оценить стоимость'}
        </button>
      </form>

      {/* Подсказка "Где найти VIN?" */}
      <div
        style={{
          marginTop: 40,
          padding: 24,
          background: '#f1f5f9',
          borderRadius: 16,
          textAlign: 'center',
          color: '#475569',
        }}
      >
        <Info size={28} style={{ marginBottom: 12, color: '#6366f1' }} />
        <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: 8 }}>Где найти VIN?</p>
        <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
          • Под лобовым стеклом (снаружи)<br />
          • В дверном проёме водителя<br />
          • В ПТС или СТС<br />
          • Под капотом или в багажнике
        </p>
      </div>

      {/* Результат */}
      {result && (
        <div
          style={{
            marginTop: 48,
            padding: 48,
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            border: '4px solid #22c55e',
            borderRadius: 32,
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(34,197,94,0.2)',
            animation: 'slideUp 0.8s ease-out',
          }}
        >
          <Car size={64} style={{ color: '#16a34a', marginBottom: 24 }} />
          <h3 style={{ fontSize: '2.4rem', color: '#166534', marginBottom: 24 }}>
            Оценка готова!
          </h3>

          <p style={{ fontSize: '1.4rem', marginBottom: 12 }}>
            <strong>VIN:</strong> {result.vin}
          </p>

          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#166534', margin: '24px 0' }}>
            {result.manufacturer} • {result.country} • {result.year} г.
          </p>

          {result.estimatedMileage > 0 && (
            <p style={{ fontSize: '1.2rem', color: '#4b5563', marginBottom: 32 }}>
              Предполагаемый пробег: ~{Math.round(result.estimatedMileage / 1000)} тыс. км
            </p>
          )}

          <div style={{ fontSize: '4.5rem', fontWeight: 900, color: '#16a34a', margin: '40px 0' }}>
            {(result.price.avg / 1000000).toFixed(2)} млн ₽
          </div>

          <p style={{ fontSize: '1.5rem', color: '#374151' }}>
            Рыночный диапазон: от {(result.price.min / 1000000).toFixed(2)} до {(result.price.max / 1000000).toFixed(2)} млн ₽
          </p>

          <p style={{ fontSize: '1rem', color: '#6b7280', marginTop: 32 }}>
            {result.source}
          </p>
        </div>
      )}
    </div>
  );
};