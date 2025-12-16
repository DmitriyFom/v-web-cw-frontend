import { useState} from 'react';
import { motion } from 'framer-motion';
import { ValuationForm } from '@/features/valuation-by-vin/ui/ValuationForm';
import { ParamsForm } from '@/features/valuation-by-params/ui/ParamsForm';
import { VinInfo } from '@/features/vin-info/ui/VinInfo';
import { Car, Zap, Shield, Target, TrendingUp } from 'lucide-react';

export const HomePage = () => {
  const [tab, setTab] = useState<'vin' | 'params' | 'info'>('params');

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
   
      <header style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', padding: '24px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Car size={36} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '34px', fontWeight: '900', margin: 0, color: '#1e293b' }}>AutoPrice</h1>
              <p style={{ fontSize: '17px', color: '#64748b', margin: 0 }}>Профессиональная рыночная оценка</p>
            </div>
          </div>
          <p style={{ fontSize: '17px', color: '#64748b', fontWeight: '500' }}></p>
        </div>
      </header>

      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '64px', fontWeight: '900', lineHeight: '1.1', color: '#1e293b', marginBottom: 24 }}
          >
            Узнайте реальную цену<br />автомобиля за 3 секунды
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ fontSize: '26px', color: '#475569', lineHeight: '1.6', maxWidth: 900, margin: '0 auto 60px' }}
          >
            Профессиональная оценка на основе анализа 500 000+ объявлений с популярных площадок по продаже автомобилей
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 60, flexWrap: 'wrap' }}
          >
            <button
              onClick={() => setTab('vin')}
              style={{
                padding: '20px 48px',
                fontSize: '22px',
                fontWeight: '700',
                background: tab === 'vin' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#e2e8f0',
                color: tab === 'vin' ? 'white' : '#1e293b',
                border: 'none',
                borderRadius: 20,
                cursor: 'pointer',
                boxShadow: tab === 'vin' ? '0 15px 40px rgba(99,102,241,0.4)' : '0 4px 15px rgba(0,0,0,0.05)',
                transition: 'all 0.4s',
              }}
            >
              По VIN-коду
            </button>
            <button
              onClick={() => setTab('params')}
              style={{
                padding: '20px 48px',
                fontSize: '22px',
                fontWeight: '700',
                background: tab === 'params' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#e2e8f0',
                color: tab === 'params' ? 'white' : '#1e293b',
                border: 'none',
                borderRadius: 20,
                cursor: 'pointer',
                boxShadow: tab === 'params' ? '0 15px 40px rgba(99,102,241,0.4)' : '0 4px 15px rgba(0,0,0,0.05)',
                transition: 'all 0.4s',
              }}
            >
              По характеристикам
            </button>
            <button
              onClick={() => setTab('info')}
              style={{
                padding: '20px 48px',
                fontSize: '22px',
                fontWeight: '700',
                background: tab === 'info' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#e2e8f0',
                color: tab === 'info' ? 'white' : '#1e293b',
                border: 'none',
                borderRadius: 20,
                cursor: 'pointer',
                boxShadow: tab === 'info' ? '0 15px 40px rgba(99,102,241,0.4)' : '0 4px 15px rgba(0,0,0,0.05)',
                transition: 'all 0.4s',
              }}
            >
              Что такое VIN?
            </button>
          </motion.div>

          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'white',
              borderRadius: 40,
              padding: tab === 'info' ? 0 : 60,
              boxShadow: '0 30px 80px rgba(0,0,0,0.12)',
              maxWidth: tab === 'info' ? 'none' : 900,
              margin: '0 auto',
            }}
          >
            {tab === 'vin' && <ValuationForm />}
            {tab === 'params' && <ParamsForm />}
            {tab === 'info' && <VinInfo />}
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '120px 0', background: '#ffffff' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <h2 style={{ fontSize: '52px', fontWeight: '900', textAlign: 'center', color: '#1e293b', marginBottom: 100 }}>
            Почему выбирают нас
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48 }}>
            <motion.div whileHover={{ y: -10 }} style={{ textAlign: 'center' }}>
              <div style={{ width: 140, height: 140, background: 'linear-gradient(135deg, #c084fc, #a78bfa)', borderRadius: '50%', margin: '0 auto 36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Target size={70} color="white" />
              </div>
              <h3 style={{ fontSize: '30px', fontWeight: '700', marginBottom: 20 }}>Максимальная точность</h3>
              <p style={{ fontSize: '20px', color: '#64748b', lineHeight: '1.6' }}>
                Анализ реальных сделок и объявлений с учётом региона, состояния и комплектации
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} style={{ textAlign: 'center' }}>
              <div style={{ width: 140, height: 140, background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', borderRadius: '50%', margin: '0 auto 36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={70} color="white" />
              </div>
              <h3 style={{ fontSize: '30px', fontWeight: '700', marginBottom: 20 }}>Актуальные данные</h3>
              <p style={{ fontSize: '20px', color: '#64748b', lineHeight: '1.6' }}>
                Обновление базы — самые свежие цены рынка РФ
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} style={{ textAlign: 'center' }}>
              <div style={{ width: 140, height: 140, background: 'linear-gradient(135deg, #34d399, #10b981)', borderRadius: '50%', margin: '0 auto 36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={70} color="white" />
              </div>
              <h3 style={{ fontSize: '30px', fontWeight: '700', marginBottom: 20 }}>Мгновенный результат</h3>
              <p style={{ fontSize: '20px', color: '#64748b', lineHeight: '1.6' }}>
                Оценка за 3 секунды — быстрее, чем на любом другом сервисе
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} style={{ textAlign: 'center' }}>
              <div style={{ width: 140, height: 140, background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', borderRadius: '50%', margin: '0 auto 36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={70} color="white" />
              </div>
              <h3 style={{ fontSize: '30px', fontWeight: '700', marginBottom: 20 }}>Полностью бесплатно</h3>
              <p style={{ fontSize: '20px', color: '#64748b', lineHeight: '1.6' }}>
                Без регистрации, SMS и скрытых платежей
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <h2 style={{ fontSize: '52px', fontWeight: '900', textAlign: 'center', color: '#1e293b', marginBottom: 100 }}>
            Кому помогает оценка
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 60 }}>
            <motion.div whileHover={{ scale: 1.05 }} style={{ background: 'white', borderRadius: 32, padding: 56, boxShadow: '0 15px 50px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '120px', marginBottom: 40 }}>💰</div>
              <h3 style={{ fontSize: '34px', fontWeight: '700', marginBottom: 24 }}>Продавцу</h3>
              <p style={{ fontSize: '22px', color: '#64748b', lineHeight: '1.6' }}>
                Назначьте правильную цену — продайте быстро и без торга ниже рынка
              </p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} style={{ background: 'white', borderRadius: 32, padding: 56, boxShadow: '0 15px 50px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '120px', marginBottom: 40 }}>🔍</div>
              <h3 style={{ fontSize: '34px', fontWeight: '700', marginBottom: 24 }}>Покупателю</h3>
              <p style={{ fontSize: '22px', color: '#64748b', lineHeight: '1.6' }}>
                Понимайте реальную стоимость — торгуйтесь уверенно и не переплачивайте
              </p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} style={{ background: 'white', borderRadius: 32, padding: 56, boxShadow: '0 15px 50px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '120px', marginBottom: 40 }}>📊</div>
              <h3 style={{ fontSize: '34px', fontWeight: '700', marginBottom: 24 }}>Рынку</h3>
              <p style={{ fontSize: '22px', color: '#64748b', lineHeight: '1.6' }}>
                Делаем рынок автомобилей с пробегом прозрачным и предсказуемым
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', background: '#ffffff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
          <h2 style={{ fontSize: '52px', fontWeight: '900', textAlign: 'center', color: '#1e293b', marginBottom: 100 }}>
            Вопросы и ответы
          </h2>
          <div style={{ background: '#f1f5f9', borderRadius: 32, padding: 56, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            <details style={{ marginBottom: 40 }}>
              <summary style={{ fontSize: '26px', fontWeight: '600', cursor: 'pointer', padding: '24px 0', borderBottom: '1px solid #e2e8f0' }}>
                Откуда берутся данные?
              </summary>
              <p style={{ fontSize: '20px', color: '#475569', padding: '24px 0', lineHeight: '1.6' }}>
                Из анализа реальных объявлений на площадках по продаже автомобилей. Мы учитываем регион, пробег, состояние, комплектацию и динамику рынка.
              </p>
            </details>
            <details style={{ marginBottom: 40 }}>
              <summary style={{ fontSize: '26px', fontWeight: '600', cursor: 'pointer', padding: '24px 0', borderBottom: '1px solid #e2e8f0' }}>
                Почему цена отличается от объявлений?
              </summary>
              <p style={{ fontSize: '20px', color: '#475569', padding: '24px 0', lineHeight: '1.6' }}>
                Мы показываем среднюю рыночную цену. Конкретное объявление может быть выше (срочная продажа) или ниже (торг, состояние).
              </p>
            </details>
            <details>
              <summary style={{ fontSize: '26px', fontWeight: '600', cursor: 'pointer', padding: '24px 0', borderBottom: '1px solid #e2e8f0' }}>
                Можно ли доверять оценке?
              </summary>
              <p style={{ fontSize: '20px', color: '#475569', padding: '24px 0', lineHeight: '1.6' }}>
                Да. Модель учитывает 10+ параметров и показывает диапазон, в котором 90% автомобилей продаются в течение 30 дней.
              </p>
            </details>
          </div>
        </div>
      </section>

      <footer style={{ background: '#0f172a', color: 'white', padding: '80px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
            <Car size={48} />
            <h3 style={{ fontSize: '36px', fontWeight: '900', margin: 0 }}>Оценка Авто</h3>
          </div>
          <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: 40 }}>
              Декабрь 2025 · Все данные основаны на анализе рынка РФ
          </p>
          <p style={{ fontSize: '18px', color: '#64748b' }}>
            Не является публичной офертой. Цены ориентировочные.
          </p>
        </div>
      </footer>
    </div>
  );
};