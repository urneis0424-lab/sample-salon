import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'

const app = new Hono()

app.use('/api/*', cors())
app.use(renderer)

// API route for reservation
app.post('/api/reservation', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, phone, date, time, menu } = body

    if (!name || !email || !phone || !date || !time) {
      return c.json({ success: false, error: 'すべての必須項目を入力してください' }, 400)
    }

    console.log('Reservation:', { name, email, phone, date, time, menu })

    return c.json({ 
      success: true, 
      message: 'ご予約を承りました。担当者より確認のご連絡をさせていただきます。' 
    })
  } catch (error) {
    return c.json({ success: false, error: 'エラーが発生しました' }, 500)
  }
})

app.get('/', (c) => {
  return c.render(
    <div class="font-sans">
      {/* Minimalist Navigation */}
      <nav class="fixed w-full top-0 bg-white border-b border-gray-200 z-50">
        <div class="max-w-7xl mx-auto px-8 py-6">
          <div class="flex justify-between items-center">
            <div class="text-xl tracking-widest font-light">SALON</div>
            <div class="hidden md:flex space-x-12 text-sm tracking-wider">
              <a href="#home" class="hover:text-gray-600 transition">HOME</a>
              <a href="#about" class="hover:text-gray-600 transition">ABOUT</a>
              <a href="#service" class="hover:text-gray-600 transition">SERVICE</a>
              <a href="#gallery" class="hover:text-gray-600 transition">GALLERY</a>
              <a href="#reservation" class="hover:text-gray-600 transition">RESERVATION</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Hero */}
      <section id="home" class="relative h-screen flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0">
          <img src="/hero-salon.jpg" alt="Beauty Salon Interior" class="w-full h-full object-cover" />
        </div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        <div class="relative z-10 text-center text-white px-6">
          <p class="text-sm tracking-[0.3em] mb-8 font-light">Be Yourself, Beautifully</p>
          <h1 class="text-6xl md:text-8xl font-light tracking-wider mb-12 leading-tight">
            BEAUTY<br />SALON
          </h1>
          <p class="text-base md:text-lg tracking-widest font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            あなたらしい美しさを引き出す空間<br />
            丁寧な施術とこだわりの技術で、最高の仕上がりをお約束します
          </p>
          <a href="#reservation" class="inline-block border border-white px-12 py-4 text-sm tracking-widest hover:bg-white hover:text-black transition">
            RESERVATION
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" class="py-32 bg-white">
        <div class="max-w-6xl mx-auto px-8">
          <div class="text-center mb-20">
            <p class="text-xs tracking-[0.3em] text-gray-500 mb-4">ABOUT US</p>
            <h2 class="text-4xl md:text-5xl font-light tracking-wider mb-8">Designing Beauty for Modern Life.</h2>
            <div class="w-16 h-px bg-black mx-auto mb-12"></div>
            <p class="text-base leading-loose text-gray-700 max-w-2xl mx-auto">
              私たちは、お客様一人ひとりのライフスタイルに寄り添った<br />
              美しさをデザインすることを大切にしています。<br />
              上質な空間と丁寧な技術で、心も身体もリラックスできる<br />
              特別な時間をお過ごしください。
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-16 mt-24">
            <div class="text-center">
              <div class="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span class="text-3xl">01</span>
              </div>
              <h3 class="text-lg tracking-wider mb-4">HAIR</h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                トレンドを取り入れた<br />最新のカット技術
              </p>
            </div>
            <div class="text-center">
              <div class="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span class="text-3xl">02</span>
              </div>
              <h3 class="text-lg tracking-wider mb-4">COLOR</h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                髪へのダメージを最小限に<br />抑えた高品質なカラー
              </p>
            </div>
            <div class="text-center">
              <div class="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span class="text-3xl">03</span>
              </div>
              <h3 class="text-lg tracking-wider mb-4">TREATMENT</h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                髪質改善のための<br />こだわりのトリートメント
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Section with Images */}
      <section id="service" class="py-32 bg-gray-50">
        <div class="max-w-6xl mx-auto px-8">
          <div class="text-center mb-20">
            <p class="text-xs tracking-[0.3em] text-gray-500 mb-4">SERVICE</p>
            <h2 class="text-4xl font-light tracking-wider">メニュー</h2>
          </div>

          <div class="space-y-24">
            {/* Service Item 1 */}
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div class="bg-gray-200 h-96 flex items-center justify-center">
                <span class="text-gray-400 text-sm tracking-wider">HAIR STYLE IMAGE</span>
              </div>
              <div>
                <h3 class="text-2xl tracking-wider mb-6">CUT</h3>
                <p class="text-sm text-gray-600 leading-loose mb-8">
                  お客様の骨格や髪質、ライフスタイルに合わせた<br />
                  オーダーメイドのカットをご提供いたします。<br />
                  トレンドを取り入れながらも、扱いやすさを重視した<br />
                  スタイルをご提案します。
                </p>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between border-b border-gray-300 pb-3">
                    <span>カット</span>
                    <span>¥4,500</span>
                  </div>
                  <div class="flex justify-between border-b border-gray-300 pb-3">
                    <span>カット + ブロー</span>
                    <span>¥5,500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Item 2 */}
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div class="order-2 md:order-1">
                <h3 class="text-2xl tracking-wider mb-6">COLOR</h3>
                <p class="text-sm text-gray-600 leading-loose mb-8">
                  髪へのダメージを最小限に抑えた、<br />
                  高品質なカラー剤を使用しています。<br />
                  豊富なカラーバリエーションの中から<br />
                  お客様に最適な色をご提案いたします。
                </p>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between border-b border-gray-300 pb-3">
                    <span>フルカラー</span>
                    <span>¥8,800</span>
                  </div>
                  <div class="flex justify-between border-b border-gray-300 pb-3">
                    <span>ハイライト</span>
                    <span>¥12,000</span>
                  </div>
                </div>
              </div>
              <div class="bg-gray-200 h-96 flex items-center justify-center order-1 md:order-2">
                <span class="text-gray-400 text-sm tracking-wider">COLOR IMAGE</span>
              </div>
            </div>

            {/* Service Item 3 */}
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div class="bg-gray-200 h-96 flex items-center justify-center">
                <span class="text-gray-400 text-sm tracking-wider">TREATMENT IMAGE</span>
              </div>
              <div>
                <h3 class="text-2xl tracking-wider mb-6">TREATMENT</h3>
                <p class="text-sm text-gray-600 leading-loose mb-8">
                  髪質改善に特化したトリートメントで<br />
                  ダメージを受けた髪を内側から補修します。<br />
                  サロン専売の高品質なトリートメントを使用し<br />
                  艶やかで健康的な髪へと導きます。
                </p>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between border-b border-gray-300 pb-3">
                    <span>ベーシックトリートメント</span>
                    <span>¥3,300</span>
                  </div>
                  <div class="flex justify-between border-b border-gray-300 pb-3">
                    <span>プレミアムトリートメント</span>
                    <span>¥6,600</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" class="py-32 bg-white">
        <div class="max-w-7xl mx-auto px-8">
          <div class="text-center mb-20">
            <p class="text-xs tracking-[0.3em] text-gray-500 mb-4">GALLERY</p>
            <h2 class="text-4xl font-light tracking-wider">スタイルギャラリー</h2>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div class="bg-gray-200 aspect-square flex items-center justify-center group cursor-pointer overflow-hidden">
                <div class="transform group-hover:scale-110 transition duration-500 w-full h-full flex items-center justify-center">
                  <span class="text-gray-400 text-xs tracking-wider">STYLE {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" class="py-32 bg-gray-50">
        <div class="max-w-3xl mx-auto px-8">
          <div class="text-center mb-20">
            <p class="text-xs tracking-[0.3em] text-gray-500 mb-4">RESERVATION</p>
            <h2 class="text-4xl font-light tracking-wider mb-8">ご予約</h2>
            <p class="text-sm text-gray-600 leading-loose">
              お電話またはオンラインフォームにてご予約を承っております。<br />
              ご希望の日時をお選びください。
            </p>
          </div>

          <form id="reservation-form" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs tracking-wider text-gray-600 mb-3">お名前 *</label>
                <input type="text" name="name" required class="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:border-black transition text-sm" placeholder="山田 太郎" />
              </div>
              <div>
                <label class="block text-xs tracking-wider text-gray-600 mb-3">メールアドレス *</label>
                <input type="email" name="email" required class="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:border-black transition text-sm" placeholder="example@email.com" />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs tracking-wider text-gray-600 mb-3">電話番号 *</label>
                <input type="tel" name="phone" required class="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:border-black transition text-sm" placeholder="090-1234-5678" />
              </div>
              <div>
                <label class="block text-xs tracking-wider text-gray-600 mb-3">メニュー</label>
                <select name="menu" class="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:border-black transition text-sm">
                  <option>カット</option>
                  <option>カラー</option>
                  <option>トリートメント</option>
                  <option>カット + カラー</option>
                  <option>カット + トリートメント</option>
                  <option>その他</option>
                </select>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs tracking-wider text-gray-600 mb-3">ご希望日 *</label>
                <input type="date" name="date" required class="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:border-black transition text-sm" />
              </div>
              <div>
                <label class="block text-xs tracking-wider text-gray-600 mb-3">ご希望時間 *</label>
                <input type="time" name="time" required class="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:border-black transition text-sm" />
              </div>
            </div>

            <div>
              <label class="block text-xs tracking-wider text-gray-600 mb-3">備考</label>
              <textarea name="note" rows="4" class="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:border-black transition text-sm" placeholder="ご要望やご質問などございましたらご記入ください"></textarea>
            </div>

            <button type="submit" class="w-full bg-black text-white py-5 text-sm tracking-widest hover:bg-gray-800 transition">
              予約する
            </button>
            
            <div id="form-message" class="hidden mt-4"></div>
          </form>

          <div class="mt-20 pt-12 border-t border-gray-300">
            <div class="grid md:grid-cols-3 gap-8 text-center text-sm">
              <div>
                <p class="text-xs tracking-wider text-gray-500 mb-3">ADDRESS</p>
                <p class="text-gray-700">東京都渋谷区神宮前1-2-3</p>
              </div>
              <div>
                <p class="text-xs tracking-wider text-gray-500 mb-3">PHONE</p>
                <p class="text-gray-700">03-1234-5678</p>
              </div>
              <div>
                <p class="text-xs tracking-wider text-gray-500 mb-3">HOURS</p>
                <p class="text-gray-700">10:00 - 20:00<br />定休日: 火曜日</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-gray-900 text-white py-16">
        <div class="max-w-7xl mx-auto px-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="text-xl tracking-widest font-light mb-8 md:mb-0">SALON</div>
            <div class="flex space-x-8 text-sm">
              <a href="#home" class="hover:text-gray-400 transition">HOME</a>
              <a href="#about" class="hover:text-gray-400 transition">ABOUT</a>
              <a href="#service" class="hover:text-gray-400 transition">SERVICE</a>
              <a href="#gallery" class="hover:text-gray-400 transition">GALLERY</a>
              <a href="#reservation" class="hover:text-gray-400 transition">RESERVATION</a>
            </div>
          </div>
          <div class="text-center mt-12 pt-8 border-t border-gray-700 text-xs text-gray-500 tracking-wider">
            &copy; 2024 SALON. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* JavaScript */}
      <script dangerouslySetInnerHTML={{__html: `
        // Reservation form submission
        document.getElementById('reservation-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const formData = new FormData(e.target);
          const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            date: formData.get('date'),
            time: formData.get('time'),
            menu: formData.get('menu')
          };
          
          const messageDiv = document.getElementById('form-message');
          
          try {
            const response = await fetch('/api/reservation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
              messageDiv.className = 'mt-4 p-6 bg-gray-100 text-gray-800 text-sm text-center';
              messageDiv.textContent = result.message;
              messageDiv.classList.remove('hidden');
              e.target.reset();
            } else {
              messageDiv.className = 'mt-4 p-6 bg-red-50 text-red-800 text-sm text-center';
              messageDiv.textContent = result.error;
              messageDiv.classList.remove('hidden');
            }
          } catch (error) {
            messageDiv.className = 'mt-4 p-6 bg-red-50 text-red-800 text-sm text-center';
            messageDiv.textContent = 'エラーが発生しました。もう一度お試しください。';
            messageDiv.classList.remove('hidden');
          }
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        });
      `}} />
    </div>
  )
})

export default app
