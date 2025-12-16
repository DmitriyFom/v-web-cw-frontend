import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-4xl md:text-5xl font-black text-center text-slate-900 mb-12">
        Оценка по характеристикам
      </h2>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg text-slate-600">Заполнено полей</span>
          <span className="text-xl font-bold text-slate-900">{filled}/11</span>
        </div>
        <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative">
          <Car className="absolute left-5 top-6 text-slate-500" size={28} />
          <select
            value={brand}
            onChange={(e) => { setBrand(e.target.value); setModel(''); }}
            required
            className="w-full pl-14 pr-5 py-6 text-lg rounded-2xl border-3 border-slate-300 focus:border-indigo-500 transition-colors appearance-none bg-white"
          >
            <option value="">Марка автомобиля</option>
            {brands.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>

        <div className="relative">
          <Wrench className="absolute left-5 top-6 text-slate-500" size={28} />
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            disabled={!brand}
            className="w-full pl-14 pr-5 py-6 text-lg rounded-2xl border-3 border-slate-300 focus:border-indigo-500 transition-colors appearance-none bg-white disabled:opacity-60"
          >
            <option value="">Модель</option>
            {(modelsByBrand[brand] || []).map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>

        <div className="relative">
          <Calendar className="absolute left-5 top-6 text-slate-500" size={28} />
          <input
            type="number"
            min="1980"
            max="2025"
            placeholder="Год выпуска"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="w-full pl-14 pr-5 py-6 text-lg rounded-2xl border-3 border-slate-300 focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="relative">
          <Gauge className="absolute left-5 top-6 text-slate-500" size={28} />
          <input
            type="number"
            min="0"
            placeholder="Пробег, км"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            required
            className="w-full pl-14 pr-5 py-6 text-lg rounded-2xl border-3 border-slate-300 focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="relative">
          <Car className="absolute left-5 top-6 text-slate-500" size={28} />
          <select
            value={bodyType}
            onChange={(e) => setBodyType(e.target.value)}
            required
            className="w-full pl-14 pr-5 py-6 text-lg rounded-2xl border-3 border-slate-300 focus:border-indigo-500 transition-colors appearance-none bg-white"
          >
            <option value="">Тип кузова</option>
            {bodyTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div className="relative">
          <Fuel className="absolute left-5 top-6 text-slate-500" size={28} />
          <select
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
            required
            className="w-full pl-14 pr-5 py-6 text-lg rounded-2xl border-3 border-slate-300 focus:border-indigo-500 transition-colors appearance-none bg-white"
          >
            <option value="">Двигатель</option>
            {engineTypes.map((e) => <option key={e}>{e}</option>)}
          </select>
        </div>

        <div className="relative">
          <Settings className="absolute left-5 top-6 text-slate-500" size={28} />
          <select
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            required
            className="w-full pl-14 pr-5 py-6 text-lg rounded-2xl border-3 border-slate-300 focus:border-indigo-500 transition-colors appearance-none bg-white"
          >
            <option value="">Коробка передач</option>
            {transmissionTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div className="relative">
          <Car className="absolute left-5 top-6 text-slate-500" size={28} />
          <select
            value={doors}
            onChange={(e) => setDoors(e.target.value)}
            required
            className="w-full pl-14 pr-5 py-6 text-lg rounded-2xl border-3 border-slate-300 focus:border-indigo-500 transition-colors appearance-none bg-white"
          >
            <option value="">Количество дверей</option>
            {doorCounts.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>

        <div className="relative">
          <Globe className="absolute left-5 top-6 text-slate-500" size={28} />
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
            className="w-full pl-14 pr-5 py-6 text-lg rounded-2xl border-3 border-slate-300 focus:border-indigo-500 transition-colors appearance-none bg-white"
          >
            <option value="">Регион</option>
            {regions.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>

        <div className="relative">
          <Wrench className="absolute left-5 top-6 text-slate-500" size={28} />
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
            className="w-full pl-14 pr-5 py-6 text-lg rounded-2xl border-3 border-slate-300 focus:border-indigo-500 transition-colors appearance-none bg-white"
          >
            <option value="">Состояние</option>
            {conditions.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="relative">
          <Package className="absolute left-5 top-6 text-slate-500" size={28} />
          <select
            value={complectation}
            onChange={(e) => setComplectation(e.target.value)}
            required
            className="w-full pl-14 pr-5 py-6 text-lg rounded-2xl border-3 border-slate-300 focus:border-indigo-500 transition-colors appearance-none bg-white"
          >
            <option value="">Комплектация</option>
            {complectations.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </form>

      <label className="flex items-center gap-5 text-xl mb-12 cursor-pointer">
        <AlertTriangle size={36} className={accident ? 'text-red-500' : 'text-slate-500'} />
        <span className="text-slate-800">Автомобиль был в ДТП</span>
        <input
          type="checkbox"
          checked={accident}
          onChange={(e) => setAccident(e.target.checked)}
          className="w-8 h-8 accent-red-500 rounded"
        />
      </label>

      {error && (
        <div className="bg-red-100 border-2 border-red-300 text-red-800 text-center py-5 px-8 rounded-2xl mb-8 text-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || filled < 11}
        onClick={handleSubmit}
        className={`w-full py-7 text-2xl font-bold rounded-2xl transition-all shadow-xl ${
          filled === 11 && !loading
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/40'
            : 'bg-slate-200 text-slate-500 cursor-not-allowed'
        }`}
      >
        {loading ? 'Оцениваем...' : 'Оценить стоимость'}
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-20 p-12 bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-500 rounded-3xl text-center shadow-2xl"
        >
          <Car className="w-20 h-20 text-green-600 mx-auto mb-8" />
          <h3 className="text-4xl font-black text-green-800 mb-8">Оценка готова!</h3>
          <p className="text-2xl font-bold text-green-700 mb-6">
            {result.brand} {result.model} • {result.year} г.
          </p>
          <p className="text-lg text-slate-600 mb-10">
            Пробег: {Number(result.mileage).toLocaleString('ru-RU')} км • ДТП: {result.accident ? 'Да' : 'Нет'}
          </p>
          <div className="text-6xl font-black text-green-600 my-10">
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