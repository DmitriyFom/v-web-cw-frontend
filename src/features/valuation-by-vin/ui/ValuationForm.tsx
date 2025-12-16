import { useState } from 'react';
import { motion } from 'framer-motion';
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
          throw new Error(errData.error || 'Ошибка сервера');
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
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-4xl md:text-5xl font-black text-center text-slate-900 mb-12">
        Оценка по VIN-коду
      </h2>

      {/* Прогресс-бар */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg text-slate-600">Заполнено символов</span>
          <span className="text-xl font-bold text-slate-900">{vin.length} / 17</span>
        </div>
        <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="relative">
          <Search className="absolute left-6 top-7 text-slate-500" size={32} />
          <input
            type="text"
            value={vin}
            onChange={(e) =>
              setVin(e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/gi, ''))
            }
            placeholder="Например: XTA219000P1234567"
            maxLength={17}
            autoFocus
            className="w-full pl-16 pr-6 py-7 text-2xl font-mono tracking-widest text-center rounded-3xl border-4 border-slate-300 focus:border-indigo-500 transition-colors outline-none bg-white shadow-inner"
          />
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-300 text-red-800 text-center py-6 px-8 rounded-2xl flex items-center justify-center gap-4">
            <AlertCircle className="w-10 h-10 flex-shrink-0" />
            <div>
              <p className="font-bold text-lg">{error}</p>
              {error.includes('Используйте оценку по характеристикам') && (
                <p className="text-base mt-2">
                  Перейдите на вкладку "По характеристикам" для ручного ввода данных
                </p>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || vin.length !== 17}
          className={`w-full py-7 text-2xl font-bold rounded-2xl transition-all shadow-xl ${
            vin.length === 17 && !loading
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/40'
              : 'bg-slate-200 text-slate-500 cursor-not-allowed'
          }`}
        >
          {loading ? 'Оцениваем стоимость...' : 'Оценить стоимость'}
        </button>
      </form>
      <div className="mt-16 bg-slate-100 rounded-2xl p-8 text-center">
        <Info className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
        <p className="text-xl font-semibold text-slate-800 mb-3">Где найти VIN?</p>
        <p className="text-lg text-slate-600 leading-relaxed">
          • Под лобовым стеклом (снаружи)<br />
          • В дверном проёме водителя<br />
          • В ПТС или СТС<br />
          • Под капотом или в багажнике
        </p>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 p-12 bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-500 rounded-3xl text-center shadow-2xl"
        >
          <Car className="w-20 h-20 text-green-600 mx-auto mb-8" />
          <h3 className="text-4xl font-black text-green-800 mb-8">Оценка готова!</h3>

          <p className="text-xl mb-4">
            <strong>VIN:</strong> {result.vin}
          </p>

          <p className="text-3xl font-bold text-green-700 mb-6">
            {result.manufacturer} • {result.country} • {result.year} г.
          </p>

          {result.estimatedMileage > 0 && (
            <p className="text-lg text-slate-600 mb-10">
              Предполагаемый пробег: ~{Math.round(result.estimatedMileage / 1000)} тыс. км
            </p>
          )}

          <div className="text-6xl font-black text-green-600 my-12">
            {(result.price.avg / 1000000).toFixed(2)} млн ₽
          </div>

          <p className="text-xl text-slate-700 mb-8">
            Рыночный диапазон: от {(result.price.min / 1000000).toFixed(2)} до {(result.price.max / 1000000).toFixed(2)} млн ₽
          </p>

          <p className="text-sm text-slate-500">
            {result.source}
          </p>
        </motion.div>
      )}
    </div>
  );
};