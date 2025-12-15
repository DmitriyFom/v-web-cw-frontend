import { useState } from 'react';
import { Car, Gauge, Wrench, Fuel, Settings, AlertTriangle, Calendar, Globe, Package } from 'lucide-react';

const brands = [
  'Toyota', 'Lada (ВАЗ)', 'Hyundai', 'Kia', 'Volkswagen', 'Renault',
  'Nissan', 'Skoda', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi', 'Chevrolet', 'Mitsubishi',
  'Citroën', 'Peugeot', 'Volvo', 'Mazda', 'Subaru', 'Honda', 'Suzuki', 'Chery', 'Geely', 'Haval'
];

const modelsByBrand: Record<string, string[]> = {
  'Toyota': ['Camry', 'RAV4', 'Corolla', 'Land Cruiser', 'Prado', 'Hilux'],
  'Lada (ВАЗ)': ['Vesta', 'Granta', 'Niva', 'XRAY', 'Largus'],
  'Hyundai': ['Solaris', 'Creta', 'Tucson', 'Santa Fe'],
  'Kia': ['Rio', 'Sportage', 'Seltos', 'Sorento', 'K5'],
  'Volkswagen': ['Polo', 'Tiguan', 'Passat', 'Touareg'],
  'Renault': ['Logan', 'Duster', 'Kaptur', 'Arkana'],
  'Nissan': ['Qashqai', 'X-Trail', 'Almera'],
  'Skoda': ['Octavia', 'Kodiaq', 'Rapid', 'Karoq'],
  'Ford': ['Focus', 'Kuga', 'Explorer'],
  'BMW': ['3 Series', '5 Series', 'X3', 'X5'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE'],
  'Audi': ['A4', 'A6', 'Q5', 'Q7'],
  'Citroën': ['C4', 'C5 Aircross', 'Berlingo'],
  'Peugeot': ['308', '3008', '5008'],
};

const bodyTypes = ['Седан', 'Хэтчбек', 'Универсал', 'Внедорожник', 'Кроссовер', 'Минивэн', 'Купе', 'Пикап'];
const engineTypes = ['Бензин', 'Дизель', 'Электро', 'Гибрид'];
const transmissionTypes = ['Механика', 'Автомат', 'Робот', 'Вариатор'];
const doorCounts = ['2', '3', '4', '5'];
const regions = ['Москва', 'СПб', 'Регионы России']; 
const conditions = ['Отличное', 'Хорошее', 'Среднее']; 
const complectations = ['Базовая', 'Средняя', 'Премиум']; 

export const ParamsForm = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [engine, setEngine] = useState('');
  const [transmission, setTransmission] = useState('');
  const [doors, setDoors] = useState('');
  const [region, setRegion] = useState(''); 
  const [condition, setCondition] = useState(''); 
  const [complectation, setComplectation] = useState(''); 
  const [accident, setAccident] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const filled = [brand, model, year, mileage, bodyType, engine, transmission, doors, region, condition, complectation].filter(Boolean).length;
  const progress = (filled / 11) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (filled < 11) {
      setError('Заполните все обязательные поля для точной оценки');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/valuation/params', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand,
          model,
          year: Number(year),
          mileage: Number(mileage),
          bodyType,
          engine,
          transmission,
          doors,
          region,
          condition,
          complectation,
          accident,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Ошибка сервера');
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
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ fontSize: '2.4rem', fontWeight: '900', textAlign: 'center', marginBottom: 32, color: '#1e293b' }}>
        Оценка по характеристикам
      </h2>

      {/* Прогресс-бар */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: '1.1rem', color: '#64748b' }}>Заполнено полей</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b' }}>{filled}/11</span>
        </div>
        <div style={{ height: 14, background: '#e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
              borderRadius: 8,
              transition: 'width 0.5s ease',
            }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
          {/* Марка */}
          <div style={{ position: 'relative' }}>
            <Car style={{ position: 'absolute', left: 16, top: 20, color: '#64748b' }} size={28} />
            <select
              value={brand}
              onChange={(e) => { setBrand(e.target.value); setModel(''); }}
              required
              style={{
                padding: '20px 20px 20px 60px',
                fontSize: '1.2rem',
                borderRadius: 16,
                border: '3px solid #e2e8f0',
                width: '100%',
                transition: 'border 0.3s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            >
              <option value="">Марка автомобиля</option>
              {brands.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>

          {/* Модель */}
          <div style={{ position: 'relative' }}>
            <Wrench style={{ position: 'absolute', left: 16, top: 20, color: '#64748b' }} size={28} />
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              disabled={!brand}
              style={{
                padding: '20px 20px 20px 60px',
                fontSize: '1.2rem',
                borderRadius: 16,
                border: '3px solid #e2e8f0',
                width: '100%',
                transition: 'border 0.3s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            >
              <option value="">Модель</option>
              {(modelsByBrand[brand] || []).map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>

          {/* Год */}
          <div style={{ position: 'relative' }}>
            <Calendar style={{ position: 'absolute', left: 16, top: 20, color: '#64748b' }} size={28} />
            <input
              type="number"
              min="1980"
              max="2025"
              placeholder="Год выпуска"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              style={{
                padding: '20px 20px 20px 60px',
                fontSize: '1.2rem',
                borderRadius: 16,
                border: '3px solid #e2e8f0',
                width: '100%',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            />
          </div>

          {/* Пробег */}
          <div style={{ position: 'relative' }}>
            <Gauge style={{ position: 'absolute', left: 16, top: 20, color: '#64748b' }} size={28} />
            <input
              type="number"
              min="0"
              placeholder="Пробег, км"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              required
              style={{
                padding: '20px 20px 20px 60px',
                fontSize: '1.2rem',
                borderRadius: 16,
                border: '3px solid #e2e8f0',
                width: '100%',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            />
          </div>

          {/* Тип кузова */}
          <div style={{ position: 'relative' }}>
            <Car style={{ position: 'absolute', left: 16, top: 20, color: '#64748b' }} size={28} />
            <select
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
              required
              style={{
                padding: '20px 20px 20px 60px',
                fontSize: '1.2rem',
                borderRadius: 16,
                border: '3px solid #e2e8f0',
                width: '100%',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            >
              <option value="">Тип кузова</option>
              {bodyTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Двигатель */}
          <div style={{ position: 'relative' }}>
            <Fuel style={{ position: 'absolute', left: 16, top: 20, color: '#64748b' }} size={28} />
            <select
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
              required
              style={{
                padding: '20px 20px 20px 60px',
                fontSize: '1.2rem',
                borderRadius: 16,
                border: '3px solid #e2e8f0',
                width: '100%',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            >
              <option value="">Двигатель</option>
              {engineTypes.map((e) => <option key={e}>{e}</option>)}
            </select>
          </div>

          {/* Коробка */}
          <div style={{ position: 'relative' }}>
            <Settings style={{ position: 'absolute', left: 16, top: 20, color: '#64748b' }} size={28} />
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              required
              style={{
                padding: '20px 20px 20px 60px',
                fontSize: '1.2rem',
                borderRadius: 16,
                border: '3px solid #e2e8f0',
                width: '100%',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            >
              <option value="">Коробка передач</option>
              {transmissionTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Двери */}
          <div style={{ position: 'relative' }}>
            <Car style={{ position: 'absolute', left: 16, top: 20, color: '#64748b' }} size={28} />
            <select
              value={doors}
              onChange={(e) => setDoors(e.target.value)}
              required
              style={{
                padding: '20px 20px 20px 60px',
                fontSize: '1.2rem',
                borderRadius: 16,
                border: '3px solid #e2e8f0',
                width: '100%',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            >
              <option value="">Количество дверей</option>
              {doorCounts.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>

          {/* Регион */}
          <div style={{ position: 'relative' }}>
            <Globe style={{ position: 'absolute', left: 16, top: 20, color: '#64748b' }} size={28} />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
              style={{
                padding: '20px 20px 20px 60px',
                fontSize: '1.2rem',
                borderRadius: 16,
                border: '3px solid #e2e8f0',
                width: '100%',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            >
              <option value="">Регион</option>
              {regions.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>

          {/* Состояние */}
          <div style={{ position: 'relative' }}>
            <Wrench style={{ position: 'absolute', left: 16, top: 20, color: '#64748b' }} size={28} />
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
              style={{
                padding: '20px 20px 20px 60px',
                fontSize: '1.2rem',
                borderRadius: 16,
                border: '3px solid #e2e8f0',
                width: '100%',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            >
              <option value="">Состояние</option>
              {conditions.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Комплектация */}
          <div style={{ position: 'relative' }}>
            <Package style={{ position: 'absolute', left: 16, top: 20, color: '#64748b' }} size={28} />
            <select
              value={complectation}
              onChange={(e) => setComplectation(e.target.value)}
              required
              style={{
                padding: '20px 20px 20px 60px',
                fontSize: '1.2rem',
                borderRadius: 16,
                border: '3px solid #e2e8f0',
                width: '100%',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            >
              <option value="">Комплектация</option>
              {complectations.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* ДТП */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '1.2rem', marginBottom: 40, cursor: 'pointer' }}>
          <AlertTriangle size={32} color={accident ? '#ef4444' : '#64748b'} />
          <span>Автомобиль был в ДТП</span>
          <input
            type="checkbox"
            checked={accident}
            onChange={(e) => setAccident(e.target.checked)}
            style={{ width: 28, height: 28, accentColor: '#ef4444' }}
          />
        </label>

        {/* Ошибка */}
        {error && (
          <div style={{
            padding: 20,
            background: '#fee2e2',
            border: '2px solid #fca5a5',
            borderRadius: 16,
            color: '#991b1b',
            textAlign: 'center',
            marginBottom: 24,
          }}>
            {error}
          </div>
        )}

        {/* Кнопка */}
        <button
          type="submit"
          disabled={loading || filled < 11}
          style={{
            width: '100%',
            padding: '24px',
            fontSize: '1.6rem',
            fontWeight: 'bold',
            background: filled === 11 && !loading ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : '#e2e8f0',
            color: 'white',
            border: 'none',
            borderRadius: 20,
            cursor: filled === 11 && !loading ? 'pointer' : 'not-allowed',
            boxShadow: filled === 11 ? '0 20px 50px rgba(79,70,229,0.4)' : 'none',
            transition: 'all 0.4s',
          }}
        >
          {loading ? 'Оцениваем...' : 'Оценить стоимость'}
        </button>
      </form>

      {/* Результат */}
      {result && (
        <div
          style={{
            marginTop: 60,
            padding: 48,
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            border: '4px solid #22c55e',
            borderRadius: 32,
            textAlign: 'center',
            boxShadow: '0 30px 80px rgba(34,197,94,0.2)',
          }}
        >
          <Car size={80} style={{ color: '#16a34a', marginBottom: 32 }} />
          <h3 style={{ fontSize: '2.8rem', color: '#166534', marginBottom: 32 }}>
            Оценка готова!
          </h3>

          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#166534', marginBottom: 24 }}>
            {result.brand} {result.model} • {result.year} г.
          </p>

          <p style={{ fontSize: '1.4rem', color: '#4b5563', marginBottom: 40 }}>
            Пробег: {Number(result.mileage).toLocaleString('ru-RU')} км • ДТП: {result.accident ? 'Да' : 'Нет'}
          </p>

          <div style={{ fontSize: '5rem', fontWeight: 900, color: '#16a34a', margin: '40px 0' }}>
            {(result.price.avg / 1000000).toFixed(2)} млн ₽
          </div>

          <p style={{ fontSize: '1.6rem', color: '#374151' }}>
            Рыночный диапазон: от {(result.price.min / 1000000).toFixed(2)} до {(result.price.max / 1000000).toFixed(2)} млн ₽
          </p>

          <p style={{ fontSize: '1rem', color: '#6b7280', marginTop: 40 }}>
            {result.source}
          </p>
        </div>
      )}
    </div>
  );
};