import { useState } from 'react';
import { motion } from 'framer-motion';
import { ValuationForm } from '@/features/valuation-by-vin/ui/ValuationForm';
import { ParamsForm } from '@/features/valuation-by-params/ui/ParamsForm';
import { VinInfo } from '@/features/vin-info/ui/VinInfo';
import { Car, Zap, Shield, Target, TrendingUp } from 'lucide-react';

export const HomePage = () => {
  const [tab, setTab] = useState<'vin' | 'params' | 'info'>('params');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="bg-white shadow-md py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Car className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900">AutoPrice</h1>
              <p className="text-lg text-slate-600">Профессиональная рыночная оценка</p>
            </div>
          </div>
        </div>
      </header>
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight mb-8"
          >
            Узнайте реальную цену<br />
            автомобиля за 3 секунды
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-16 leading-relaxed"
          >
            Профессиональная оценка на основе анализа 500 000+ объявлений<br />
            с популярных площадок по продаже автомобилей
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            {(['vin', 'params', 'info'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-10 py-5 text-xl font-bold rounded-2xl transition-all shadow-md hover:shadow-xl ${
                  tab === t
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-purple-500/40'
                    : 'bg-white text-slate-800 border border-slate-300'
                }`}
              >
                {t === 'vin' && 'По VIN-коду'}
                {t === 'params' && 'По характеристикам'}
                {t === 'info' && 'Что такое VIN?'}
              </button>
            ))}
          </motion.div>

          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 max-w-4xl mx-auto"
          >
            {tab === 'vin' && <ValuationForm />}
            {tab === 'params' && <ParamsForm />}
            {tab === 'info' && <VinInfo />}
          </motion.div>
        </div>
      </section>

      <section className="py-28 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black text-center text-slate-900 mb-20">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: Target, title: 'Максимальная точность', desc: 'Анализ реальных сделок и объявлений с учётом региона, состояния и комплектации' },
              { icon: TrendingUp, title: 'Актуальные данные', desc: 'Обновление базы — самые свежие цены рынка РФ' },
              { icon: Zap, title: 'Мгновенный результат', desc: 'Оценка за 3 секунды — быстрее, чем на любом другом сервисе' },
              { icon: Shield, title: 'Полностью бесплатно', desc: 'Без регистрации, SMS и скрытых платежей' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -12 }}
                className="bg-white p-10 rounded-3xl shadow-xl text-center border border-slate-200 min-h-[380px] flex flex-col justify-between"
              >
                <div>
                  <div className={`w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center shadow-2xl bg-gradient-to-br ${
                    i === 0 ? 'from-purple-500 to-purple-700' :
                    i === 1 ? 'from-blue-500 to-blue-700' :
                    i === 2 ? 'from-emerald-500 to-emerald-700' :
                    'from-amber-500 to-amber-700'
                  }`}>
                    <item.icon className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">{item.title}</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed flex-grow">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Car className="w-12 h-12" />
            <h3 className="text-4xl font-black">AutoPrice</h3>
          </div>
          <p className="text-xl text-slate-300 mb-6">
            Декабрь 2025 · Все данные основаны на анализе рынка РФ
          </p>
          <p className="text-slate-500">
            Не является публичной офертой. Цены ориентировочные.
          </p>
        </div>
      </footer>
    </div>
  );
};