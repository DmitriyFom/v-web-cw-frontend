import { useState } from 'react';

export const ValuationForm = () => {
  const [vin, setVin] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    // Валидация VIN (17 символов, только разрешённые буквы и цифры)
    if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(vin)) {
      setError('VIN должен содержать ровно 17 символов (без I, O, Q)');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/valuation/vin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vin: vin.toUpperCase() }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || `Ошибка ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Не удалось связаться с сервером');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ marginBottom: 24, fontSize: '1.8rem' }}>Оценка по VIN-коду</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={vin}
          onChange={(e) =>
            setVin(e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/gi, ''))
          }
          placeholder="Введите VIN (17 символов)"
          maxLength={17}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '1.2rem',
            borderRadius: 8,
            border: '2px solid #ddd',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        />

        {error && <p style={{ color: '#d32f2f', marginTop: 10, fontWeight: 500 }}>{error}</p>}

        <button
          type="submit"
          disabled={loading || vin.length !== 17}
          style={{
            marginTop: 20,
            padding: '16px 32px',
            fontSize: '1.2rem',
            background: vin.length === 17 && !loading ? '#1976d2' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: vin.length === 17 && !loading ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s',
          }}
        >
          {loading ? 'Оцениваем...' : 'Оценить стоимость'}
        </button>
      </form>

      {/* Результат */}
      {result && (
        <div
          style={{
            marginTop: 40,
            padding: 28,
            background: '#f8fff8',
            border: '1px solid #4caf50',
            borderRadius: 12,
          }}
        >
          <h3 style={{ color: '#2e7d32', marginBottom: 16 }}>Результат оценки</h3>
          <p><strong>VIN:</strong> {result.vin}</p>
          <p><strong>Автомобиль:</strong> {result.brand} {result.model} {result.year} г.</p>
          {result.source && <p style={{ fontSize: '0.9rem', color: '#666' }}><em>{result.source}</em></p>}

          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: '1.4rem' }}>Рыночная цена:</p>
            <p style={{ fontSize: '2.4rem', color: '#2e7d32', fontWeight: 'bold' }}>
              {(result.priceAvg / 1000000).toFixed(2)} млн ₽
            </p>
            <p style={{ color: '#555' }}>
              Диапазон: от {(result.priceMin / 1000000).toFixed(2)} до{' '}
              {(result.priceMax / 1000000).toFixed(2)} млн ₽
            </p>
          </div>
        </div>
      )}
    </div>
  );
};