import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Factory, Car, Calendar, CheckCircle, Hash, Info } from 'lucide-react';

export const VinInfo = () => {
  const [vin, setVin] = useState('');

  const handleVinChange = (value: string) => {
    const cleaned = value
      .toUpperCase()
      .replace(/[^A-HJ-NPR-Z0-9]/g, '')
      .slice(0, 17);
    setVin(cleaned);
  };

  const upperVin = vin;
  const isFullVin = upperVin.length === 17;

  const positions = [
    { pos: '1-3', title: 'WMI — Производитель и страна', desc: 'Первые 3 символа: код производителя (WMI). Например, J — Япония, X — Россия, 1/4/5 — США.', icon: <Globe className="w-12 h-12" /> },
    { pos: '4-8', title: 'VDS — Характеристики авто', desc: 'Тип кузова, модель, двигатель, системы безопасности. Зависит от производителя.', icon: <Car className="w-12 h-12" /> },
    { pos: '9', title: 'Контрольная цифра', desc: 'Check digit — проверка подлинности VIN по математической формуле.', icon: <CheckCircle className="w-12 h-12" /> },
    { pos: '10', title: 'Год выпуска', desc: 'Код года: S=2025, T=2026, A=2010, 1=2001 и т.д. (цикл каждые 30 лет).', icon: <Calendar className="w-12 h-12" /> },
    { pos: '11', title: 'Завод сборки', desc: 'Код завода, где собрано авто (зависит от производителя).', icon: <Factory className="w-12 h-12" /> },
    { pos: '12-17', title: 'Серийный номер', desc: 'Уникальный номер конкретного автомобиля.', icon: <Hash className="w-12 h-12" /> },
  ];

  const getVinPart = (pos: string) => {
    if (pos.includes('-')) {
      const [start, end] = pos.split('-').map(Number);
      return upperVin.slice(start - 1, end);
    }
    const num = Number(pos);
    return upperVin[num - 1] || '-';
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-black text-center text-slate-900 mb-8"
      >
        Что такое VIN и как его расшифровать?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl text-center text-slate-600 max-w-4xl mx-auto mb-16 leading-relaxed"
      >
        VIN — это уникальный 17-значный код автомобиля, как отпечаток пальца. Он содержит информацию о производителе, характеристиках и истории авто.
      </motion.p>

      <div className="max-w-2xl mx-auto mb-20">
        <p className="text-xl text-center text-slate-700 mb-6">
          Введите VIN для интерактивной расшифровки:
        </p>

        <input
          type="text"
          value={vin}
          onChange={(e) => handleVinChange(e.target.value)}
          placeholder="Например: XTA219000P1234567"
          maxLength={17}
          className="w-full px-8 py-8 text-3xl font-mono tracking-widest text-center rounded-3xl border-4 border-slate-300 focus:border-indigo-500 transition-all bg-white shadow-2xl outline-none"
          autoFocus
        />

        <div className="mt-6 text-center">
          <p className="text-lg text-slate-600">
            Введено: <span className="font-bold text-indigo-600">{upperVin.length}/17</span> символов
          </p>

          {isFullVin && (
            <p className="mt-4 text-2xl font-bold text-green-600 animate-pulse">
              VIN полный — смотрите расшифровку ниже!
            </p>
          )}

          {upperVin.length > 0 && upperVin.length < 17 && (
            <p className="mt-4 text-xl font-semibold text-red-600">
              Введите все 17 символов для полной расшифровки
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
        {positions.map((p, i) => {
          const part = getVinPart(p.pos);
          const isHighlighted = isFullVin && part !== '-';

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl p-10 text-center transition-all duration-500 flex flex-col ${
                isHighlighted
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-2xl ring-4 ring-indigo-400/50 scale-105'
                  : 'bg-white text-slate-900 shadow-xl border border-slate-200'
              }`}
            >
              <div className="flex flex-col items-center flex-grow">
                <div className={`mb-8 ${isHighlighted ? 'text-white' : 'text-indigo-600'}`}>
                  {p.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6 break-words">{p.title}</h3>
                <p className={`text-lg leading-relaxed mb-8 break-words text-balance ${isHighlighted ? 'text-indigo-100' : 'text-slate-600'}`}>
                  {p.desc}
                </p>
              </div>

              {upperVin && (
                <div className={`text-4xl font-black font-mono tracking-widest break-all ${isHighlighted ? 'text-white' : 'text-slate-900'}`}>
                  {part || '-'}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-gradient-to-r from-slate-100 to-indigo-50 rounded-3xl p-12 text-center shadow-2xl border border-slate-200"
      >
        <Info className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
        <h3 className="text-3xl font-black text-slate-800 mb-6">Где найти VIN?</h3>
        <p className="text-xl text-slate-700 leading-relaxed">
          • На табличке под лобовым стеклом (снаружи)<br />
          • В дверном проёме водителя<br />
          • В ПТС или СТС<br />
          • Под капотом или в багажнике
        </p>
      </motion.div>
    </div>
  );
};