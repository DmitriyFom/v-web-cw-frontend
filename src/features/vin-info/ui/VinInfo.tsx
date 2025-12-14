import { useState } from 'react';
import { Globe, Factory, Car, Calendar, CheckCircle, Lock, Hash, Info } from 'lucide-react';

export const VinInfo = () => {
  const [vin, setVin] = useState('');
  const upperVin = vin.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '').slice(0, 17);

  const positions = [
    { pos: '1-3', title: 'WMI — Производитель и страна', desc: 'Первые 3 символа: код производителя (WMI). Например, J — Япония, X — Россия, 1/4/5 — США.', icon: <Globe size={32} /> },
    { pos: '4-8', title: 'VDS — Характеристики авто', desc: 'Тип кузова, модель, двигатель, системы безопасности. Зависит от производителя.', icon: <Car size={32} /> },
    { pos: '9', title: 'Контрольная цифра', desc: 'Check digit — проверка подлинности VIN по математической формуле.', icon: <CheckCircle size={32} /> },
    { pos: '10', title: 'Год выпуска', desc: 'Код года: S=2025, T=2026, A=2010, 1=2001 и т.д. (цикл каждые 30 лет).', icon: <Calendar size={32} /> },
    { pos: '11', title: 'Завод сборки', desc: 'Код завода, где собрано авто (зависит от производителя).', icon: <Factory size={32} /> },
    { pos: '12-17', title: 'Серийный номер', desc: 'Уникальный номер конкретного автомобиля.', icon: <Hash size={32} /> },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 40 }}>
      <h2 style={{ fontSize: '48px', fontWeight: '900', textAlign: 'center', marginBottom: 32 }}>
        Что такое VIN и как его расшифровать?
      </h2>
      <p style={{ fontSize: '22px', textAlign: 'center', color: '#475569', marginBottom: 60 }}>
        VIN — это уникальный 17-значный код автомобиля, как отпечаток пальца. Он содержит информацию о производителе, характеристиках и истории авто.
      </p>

      {/* Интерактивный ввод VIN */}
      <div style={{ marginBottom: 60, textAlign: 'center' }}>
        <p style={{ fontSize: '20px', marginBottom: 16 }}>Введите VIN для подсветки расшифровки:</p>
        <input
          type="text"
          value={vin}
          onChange={e => setVin(e.target.value)}
          placeholder="Например: XTA219000P1234567"
          style={{
            padding: '20px 24px',
            fontSize: '24px',
            width: '100%',
            maxWidth: 600,
            borderRadius: 20,
            border: '3px solid #e2e8f0',
            textAlign: 'center',
            letterSpacing: '4px',
            fontFamily: 'monospace',
            transition: 'all 0.3s',
          }}
          onFocus={e => e.target.style.borderColor = '#4f46e5'}
          onBlur={e => e.target.style.borderColor = '#e2e8f0'}
        />
        {upperVin.length === 17 && (
          <p style={{ marginTop: 16, color: '#10b981', fontWeight: 'bold' }}>VIN полный — смотрите подсветку ниже!</p>
        )}
      </div>

      {/* Визуальная схема VIN */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
        {positions.map((p, i) => (
          <div
            key={i}
            style={{
              background: 'white',
              borderRadius: 32,
              padding: 32,
              boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
              textAlign: 'center',
              border: upperVin.length === 17 ? '4px solid #4f46e5' : 'none',
              transition: 'all 0.4s',
            }}
          >
            <div style={{ color: '#4f46e5', marginBottom: 20 }}>{p.icon}</div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: 16 }}>{p.title}</h3>
            <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.6' }}>{p.desc}</p>
            {upperVin && (
              <div style={{ marginTop: 20, fontFamily: 'monospace', fontSize: '28px', letterSpacing: '4px', fontWeight: 'bold', color: '#1e293b' }}>
                {p.pos.includes('-') 
                  ? upperVin.slice(parseInt(p.pos[0])-1, parseInt(p.pos[2]))
                  : upperVin[p.pos - 1] || '-'}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Дополнительная информация */}
      <div style={{ marginTop: 80, background: '#f1f5f9', borderRadius: 32, padding: 48, textAlign: 'center' }}>
        <Info size={64} style={{ color: '#4f46e5', marginBottom: 24 }} />
        <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: 20 }}>Где найти VIN?</h3>
        <p style={{ fontSize: '20px', color: '#475569', lineHeight: '1.6', maxWidth: 800, margin: '0 auto' }}>
          • На табличке под лобовым стеклом<br />
          • В дверном проёме водителя<br />
          • В ПТС или СТС<br />
          • Под капотом или в багажнике
        </p>
      </div>
    </div>
  );
};