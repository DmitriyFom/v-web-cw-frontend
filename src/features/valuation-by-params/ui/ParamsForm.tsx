import { useState } from 'react';

const brands = [
  'Toyota', 'Lada (ВАЗ)', 'Hyundai', 'Kia', 'Volkswagen', 'Renault',
  'Nissan', 'Skoda', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi', 'Chevrolet', 'Mitsubishi'
];

const modelsByBrand: Record<string, string[]> = {
  'Toyota': ['Camry', 'RAV4', 'Corolla', 'Land Cruiser 200', 'Land Cruiser Prado', 'Hilux'],
  'Lada (ВАЗ)': ['Vesta', 'Granta', 'Niva Legend', 'XRAY', 'Largus'],
  'Hyundai': ['Solaris', 'Creta', 'Tucson', 'Santa Fe', 'Palisade'],
  'Kia': ['Rio', 'Sportage', 'Seltos', 'Sorento', 'K5'],
  'Volkswagen': ['Polo', 'Tiguan', 'Passat', 'Touareg'],
  'Renault': ['Logan', 'Duster', 'Kaptur', 'Arkana'],
  'Nissan': ['Qashqai', 'X-Trail', 'Terrano', 'Almera'],
  'Skoda': ['Octavia', 'Kodiaq', 'Rapid', 'Karoq'],
  'Ford': ['Focus', 'Kuga', 'Mondeo', 'Explorer'],
  'BMW': ['3 Series', '5 Series', 'X3', 'X5'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE'],
  'Audi': ['A4', 'A6', 'Q5', 'Q7'],
  'Chevrolet': ['Niva', 'Cruze', 'Captiva'],
  'Mitsubishi': ['Outlander', 'Pajero Sport', 'L200'],
};

const bodyTypes = [
  'Седан', 'Хэтчбек', 'Универсал', 'Внедорожник', 'Кроссовер', 'Минивэн', 'Купе', 'Пикап', 'Кабриолет'
];

const engineTypes = [
  'Бензин', 'Дизель', 'Электро', 'Гибрид'
];

const transmissionTypes = [
  'Механика', 'Автомат', 'Робот', 'Вариатор'
];

const doorCounts = ['2', '3', '4', '5'];

export const ParamsForm = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [engine, setEngine] = useState('');
  const [transmission, setTransmission] = useState('');
  const [doors, setDoors] = useState('');
  const [accident, setAccident] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    await new Promise(r => setTimeout(r, 1200));

    const priceMap: Record<string, number> = {
      'Toyota Camry': 3200000,
      'Toyota RAV4': 3400000,
      'Lada Vesta': 1300000,
      'Lada Granta': 850000,
      'Hyundai Solaris': 1950000,
      'Hyundai Creta': 2400000,
      'Kia Rio': 2000000,
      'Volkswagen Polo': 2100000,
      'Renault Duster': 1800000,
      'Skoda Octavia': 2600000,
      'BMW 5 Series': 5200000,
      'Mercedes-Benz E-Class': 5800000,
    };

    const key = `${brand} ${model}`;
    let basePrice = priceMap[key] || 2200000;

    const age = 2025 - Number(year || 2025);
    basePrice *= (1 - age * 0.1); // Больше возраст - больше снижение (10% в год)

    const km = Number(mileage) || 0;
    basePrice *= (1 - km / 150000); // Больше пробег - больше снижение (полное обесценивание за 150к км)

    // Корректировка по ДТП
    if (accident) basePrice *= 0.75; // -25% если в ДТП

    // Корректировка по кузову
    const bodyAdjustment: Record<string, number> = {
      'Седан': 1.0,
      'Хэтчбек': 0.95,
      'Универсал': 0.98,
      'Внедорожник': 1.15,
      'Кроссовер': 1.10,
      'Минивэн': 1.05,
      'Купе': 1.05,
      'Пикап': 1.1,
      'Кабриолет': 1.08,
    };
    basePrice *= bodyAdjustment[bodyType] || 1.0;

    // Корректировка по двигателю
    const engineAdjustment: Record<string, number> = {
      'Бензин': 1.0,
      'Дизель': 1.05,
      'Электро': 1.2,
      'Гибрид': 1.15,
    };
    basePrice *= engineAdjustment[engine] || 1.0;

    // Корректировка по коробке
    const transmissionAdjustment: Record<string, number> = {
      'Механика': 0.95,
      'Автомат': 1.1,
      'Робот': 1.0,
      'Вариатор': 1.05,
    };
    basePrice *= transmissionAdjustment[transmission] || 1.0;

    // Корректировка по дверям
    const doorsAdjustment: Record<string, number> = {
      '2': 0.95,
      '3': 0.98,
      '4': 1.05,
      '5': 1.1,
    };
    basePrice *= doorsAdjustment[doors] || 1.0;

    const priceAvg = Math.max(300000, Math.round(basePrice));
    const priceMin = Math.round(priceAvg * 0.85);
    const priceMax = Math.round(priceAvg * 1.15);

    setResult({
      brand,
      model,
      year,
      mileage: Number(mileage).toLocaleString('ru'),
      bodyType,
      engine,
      transmission,
      doors,
      accident: accident ? 'Да' : 'Нет',
      priceMin,
      priceAvg,
      priceMax,
    });

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ marginBottom: 32, fontSize: '2rem', textAlign: 'center' }}>
        Оценка по характеристикам
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: '1fr 1fr', marginBottom: 24 }}>
          <select value={brand} onChange={e => { setBrand(e.target.value); setModel(''); }} required
            style={{ padding: 16, fontSize: '1.1rem', borderRadius: 12, border: '2px solid #ddd' }}>
            <option value="">Марка</option>
            {brands.map(b => <option key={b}>{b}</option>)}
          </select>

          <select value={model} onChange={e => setModel(e.target.value)} required disabled={!brand}
            style={{ padding: 16, fontSize: '1.1rem', borderRadius: 12, border: '2px solid #ddd' }}>
            <option value="">Модель</option>
            {(modelsByBrand[brand] || []).map(m => <option key={m}>{m}</option>)}
          </select>

          <input type="number" min="2000" max="2025" placeholder="Год выпуска" value={year} onChange={e => setYear(e.target.value)} required
            style={{ padding: 16, fontSize: '1.1rem', borderRadius: 12, border: '2px solid #ddd' }} />

          <input type="number" min="0" placeholder="Пробег, км" value={mileage} onChange={e => setMileage(e.target.value)} required
            style={{ padding: 16, fontSize: '1.1rem', borderRadius: 12, border: '2px solid #ddd' }} />

          <select value={bodyType} onChange={e => setBodyType(e.target.value)} required
            style={{ padding: 16, fontSize: '1.1rem', borderRadius: 12, border: '2px solid #ddd' }}>
            <option value="">Тип кузова</option>
            {bodyTypes.map(t => <option key={t}>{t}</option>)}
          </select>

          <select value={engine} onChange={e => setEngine(e.target.value)} required
            style={{ padding: 16, fontSize: '1.1rem', borderRadius: 12, border: '2px solid #ddd' }}>
            <option value="">Двигатель</option>
            {engineTypes.map(e => <option key={e}>{e}</option>)}
          </select>

          <select value={transmission} onChange={e => setTransmission(e.target.value)} required
            style={{ padding: 16, fontSize: '1.1rem', borderRadius: 12, border: '2px solid #ddd' }}>
            <option value="">Коробка передач</option>
            {transmissionTypes.map(t => <option key={t}>{t}</option>)}
          </select>

          <select value={doors} onChange={e => setDoors(e.target.value)} required
            style={{ padding: 16, fontSize: '1.1rem', borderRadius: 12, border: '2px solid #ddd' }}>
            <option value="">Количество дверей</option>
            {doorCounts.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        <label style={{ display: 'block', marginBottom: 24, fontSize: '1.1rem' }}>
          <input type="checkbox" checked={accident} onChange={e => setAccident(e.target.checked)} />
          Было в ДТП
        </label>

        <button type="submit" disabled={loading || !model || !year || !bodyType || !engine || !transmission || !doors}
          style={{
            width: '100%',
            padding: 18,
            fontSize: '1.3rem',
            background: (!model || !year || !bodyType || !engine || !transmission || !doors) ? '#ccc' : '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: 16,
            cursor: (!model || !year || !bodyType || !engine || !transmission || !doors) ? 'not-allowed' : 'pointer',
          }}>
          {loading ? 'Оцениваем...' : 'Оценить стоимость'}
        </button>
      </form>

      {result && (
        <div style={{
          marginTop: 40,
          padding: 32,
          background: 'linear-gradient(135deg, #e8f5e8 0%, #f8fff8 100%)',
          border: '2px solid #4caf50',
          borderRadius: 20,
          textAlign: 'center',
        }}>
          <h3 style={{ color: '#2e7d32', fontSize: '2rem' }}>Оценка готова!</h3>
          <p style={{ fontSize: '1.5rem', margin: '16px 0' }}>
            <strong>{result.brand} {result.model} {result.year} г.</strong>
          </p>
          <p style={{ color: '#666' }}>Пробег: {result.mileage} км</p>
          <p style={{ color: '#666' }}>Тип кузова: {result.bodyType}</p>
          <p style={{ color: '#666' }}>Двигатель: {result.engine}</p>
          <p style={{ color: '#666' }}>Коробка: {result.transmission}</p>
          <p style={{ color: '#666' }}>Двери: {result.doors}</p>
          <p style={{ color: '#666' }}>В ДТП: {result.accident}</p>

          <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#2e7d32', margin: '20px 0' }}>
            {result.priceAvg < 1000000 ? 
              (result.priceAvg / 1000).toFixed(0) + ' тыс ₽' :
              (result.priceAvg / 1000000).toFixed(2) + ' млн ₽'
            }
          </div>
          <p style={{ color: '#555' }}>
            Диапазон: от {result.priceMin < 1000000 ? 
              (result.priceMin / 1000).toFixed(0) + ' тыс' : 
              (result.priceMin / 1000000).toFixed(2) + ' млн'
            } до {result.priceMax < 1000000 ? 
              (result.priceMax / 1000).toFixed(0) + ' тыс' : 
              (result.priceMax / 1000000).toFixed(2) + ' млн'
            } ₽
          </p>
        </div>
      )}
    </div>
  );
};