import { ValuationForm } from '@/features/valuation-by-vin/ui/ValuationForm';

export const HomePage = () => {
  return (
    <div style={{ minHeight: '100vh', padding: '60px 20px', background: '#fafafa' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 16, textAlign: 'center', fontWeight: 800 }}>
          Оценка стоимости автомобиля
        </h1>
        <p style={{ fontSize: '1.3rem', color: '#555', marginBottom: 60, textAlign: 'center' }}>
          Введите VIN-код или характеристики — получите точную рыночную цену за 3 секунды
        </p>

        {/* ←←←← ВОТ ЭТО ВАЖНО — ЭТО НАША ФОРМА */}
        <ValuationForm />
      </div>
    </div>
  );
};