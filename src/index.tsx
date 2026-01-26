import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Use renderer for HTML pages
app.use(renderer)

// API route for contact form
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, phone, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return c.json({ success: false, error: 'すべての必須項目を入力してください' }, 400)
    }

    // In production, you would save to D1 database or send email
    console.log('Contact form submission:', { name, email, phone, message })

    return c.json({ 
      success: true, 
      message: 'お問い合わせありがとうございます。担当者より折り返しご連絡させていただきます。' 
    })
  } catch (error) {
    return c.json({ success: false, error: 'エラーが発生しました' }, 500)
  }
})

// Main page route
app.get('/', (c) => {
  return c.render(
    <div>
      {/* Navigation */}
      <nav class="bg-white shadow-md fixed w-full top-0 z-50">
        <div class="container mx-auto px-6 py-4">
          <div class="flex justify-between items-center">
            <div class="text-2xl font-bold text-pink-600">
              <i class="fas fa-spa mr-2"></i>
              Salon de Beauté
            </div>
            <div class="hidden md:flex space-x-8">
              <a href="#home" class="text-gray-700 hover:text-pink-600 transition">ホーム</a>
              <a href="#services" class="text-gray-700 hover:text-pink-600 transition">サービス</a>
              <a href="#menu" class="text-gray-700 hover:text-pink-600 transition">メニュー・料金</a>
              <a href="#gallery" class="text-gray-700 hover:text-pink-600 transition">ギャラリー</a>
              <a href="#contact" class="text-gray-700 hover:text-pink-600 transition">お問い合わせ</a>
            </div>
            <button class="md:hidden text-gray-700" id="mobile-menu-button">
              <i class="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" class="pt-20 bg-gradient-to-r from-pink-50 to-purple-50 min-h-screen flex items-center">
        <div class="container mx-auto px-6">
          <div class="text-center">
            <h1 class="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              あなたの美しさを<br />引き出すサロン
            </h1>
            <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              上質な空間で、心も身体もリラックス。<br />
              一人ひとりに寄り添った丁寧な施術で、最高の仕上がりをお約束します。
            </p>
            <div class="flex justify-center space-x-4">
              <a href="#contact" class="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition transform hover:scale-105">
                <i class="fas fa-calendar-check mr-2"></i>
                ご予約はこちら
              </a>
              <a href="#menu" class="bg-white text-pink-600 px-8 py-3 rounded-full hover:bg-gray-50 transition border-2 border-pink-600">
                メニューを見る
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" class="py-20 bg-white">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold text-center text-gray-800 mb-4">
            <i class="fas fa-magic text-pink-600 mr-3"></i>
            サービス
          </h2>
          <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            お客様一人ひとりのニーズに合わせた、多彩なサービスをご用意しています
          </p>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-gradient-to-br from-pink-50 to-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div class="text-5xl text-pink-600 mb-4">
                <i class="fas fa-cut"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-3">ヘアカット</h3>
              <p class="text-gray-600 mb-4">
                トレンドを取り入れた最新のカット技術で、あなたに似合うスタイルをご提案します。
              </p>
              <ul class="text-sm text-gray-600 space-y-2">
                <li><i class="fas fa-check text-pink-600 mr-2"></i>カット＆ブロー</li>
                <li><i class="fas fa-check text-pink-600 mr-2"></i>前髪カット</li>
                <li><i class="fas fa-check text-pink-600 mr-2"></i>キッズカット</li>
              </ul>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div class="text-5xl text-purple-600 mb-4">
                <i class="fas fa-fill-drip"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-3">カラーリング</h3>
              <p class="text-gray-600 mb-4">
                髪へのダメージを最小限に抑えた、高品質なカラー剤を使用しています。
              </p>
              <ul class="text-sm text-gray-600 space-y-2">
                <li><i class="fas fa-check text-purple-600 mr-2"></i>フルカラー</li>
                <li><i class="fas fa-check text-purple-600 mr-2"></i>ハイライト</li>
                <li><i class="fas fa-check text-purple-600 mr-2"></i>グラデーション</li>
              </ul>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div class="text-5xl text-blue-600 mb-4">
                <i class="fas fa-hand-sparkles"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-3">ネイル</h3>
              <p class="text-gray-600 mb-4">
                豊富なデザインから選べるネイルアート。特別な日にもおすすめです。
              </p>
              <ul class="text-sm text-gray-600 space-y-2">
                <li><i class="fas fa-check text-blue-600 mr-2"></i>ジェルネイル</li>
                <li><i class="fas fa-check text-blue-600 mr-2"></i>ネイルアート</li>
                <li><i class="fas fa-check text-blue-600 mr-2"></i>ネイルケア</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Menu & Pricing Section */}
      <section id="menu" class="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold text-center text-gray-800 mb-4">
            <i class="fas fa-list-ul text-pink-600 mr-3"></i>
            メニュー・料金
          </h2>
          <p class="text-center text-gray-600 mb-12">明朗会計で安心してご利用いただけます</p>

          <div class="max-w-4xl mx-auto">
            {/* Hair Menu */}
            <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 class="text-2xl font-bold text-pink-600 mb-6 flex items-center">
                <i class="fas fa-cut mr-3"></i>
                ヘアメニュー
              </h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center border-b pb-3">
                  <div>
                    <h4 class="font-semibold text-gray-800">カット</h4>
                    <p class="text-sm text-gray-600">シャンプー・ブロー込み</p>
                  </div>
                  <span class="text-xl font-bold text-pink-600">¥4,500</span>
                </div>
                <div class="flex justify-between items-center border-b pb-3">
                  <div>
                    <h4 class="font-semibold text-gray-800">カラー</h4>
                    <p class="text-sm text-gray-600">カット・シャンプー・ブロー込み</p>
                  </div>
                  <span class="text-xl font-bold text-pink-600">¥8,800</span>
                </div>
                <div class="flex justify-between items-center border-b pb-3">
                  <div>
                    <h4 class="font-semibold text-gray-800">パーマ</h4>
                    <p class="text-sm text-gray-600">カット・シャンプー・ブロー込み</p>
                  </div>
                  <span class="text-xl font-bold text-pink-600">¥9,900</span>
                </div>
                <div class="flex justify-between items-center">
                  <div>
                    <h4 class="font-semibold text-gray-800">トリートメント</h4>
                    <p class="text-sm text-gray-600">髪質改善トリートメント</p>
                  </div>
                  <span class="text-xl font-bold text-pink-600">¥3,300〜</span>
                </div>
              </div>
            </div>

            {/* Nail Menu */}
            <div class="bg-white rounded-xl shadow-lg p-8">
              <h3 class="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                <i class="fas fa-hand-sparkles mr-3"></i>
                ネイルメニュー
              </h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center border-b pb-3">
                  <div>
                    <h4 class="font-semibold text-gray-800">ジェルネイル（ワンカラー）</h4>
                    <p class="text-sm text-gray-600">オフ・ケア込み</p>
                  </div>
                  <span class="text-xl font-bold text-blue-600">¥5,500</span>
                </div>
                <div class="flex justify-between items-center border-b pb-3">
                  <div>
                    <h4 class="font-semibold text-gray-800">ジェルネイル（デザイン）</h4>
                    <p class="text-sm text-gray-600">アート10本まで</p>
                  </div>
                  <span class="text-xl font-bold text-blue-600">¥7,700</span>
                </div>
                <div class="flex justify-between items-center border-b pb-3">
                  <div>
                    <h4 class="font-semibold text-gray-800">フットネイル</h4>
                    <p class="text-sm text-gray-600">ケア・カラー込み</p>
                  </div>
                  <span class="text-xl font-bold text-blue-600">¥6,600</span>
                </div>
                <div class="flex justify-between items-center">
                  <div>
                    <h4 class="font-semibold text-gray-800">ネイルケア</h4>
                    <p class="text-sm text-gray-600">爪の形整え・甘皮処理</p>
                  </div>
                  <span class="text-xl font-bold text-blue-600">¥3,300</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" class="py-20 bg-white">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold text-center text-gray-800 mb-4">
            <i class="fas fa-images text-pink-600 mr-3"></i>
            ギャラリー
          </h2>
          <p class="text-center text-gray-600 mb-12">施術例をご紹介します</p>

          <div class="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div class="relative overflow-hidden rounded-xl shadow-lg group">
                <div class="bg-gradient-to-br from-pink-200 to-purple-200 h-64 flex items-center justify-center">
                  <i class="fas fa-camera text-6xl text-white opacity-50"></i>
                </div>
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
                  <span class="text-white opacity-0 group-hover:opacity-100 transition text-xl font-semibold">
                    スタイル {i}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" class="py-20 bg-gradient-to-b from-gray-50 to-pink-50">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold text-center text-gray-800 mb-4">
            <i class="fas fa-envelope text-pink-600 mr-3"></i>
            お問い合わせ・ご予約
          </h2>
          <p class="text-center text-gray-600 mb-12">お気軽にお問い合わせください</p>

          <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div class="bg-white rounded-xl shadow-lg p-8">
              <h3 class="text-2xl font-bold text-gray-800 mb-6">お問い合わせフォーム</h3>
              <form id="contact-form" class="space-y-4">
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">お名前 *</label>
                  <input type="text" name="name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600" placeholder="山田 太郎" />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">メールアドレス *</label>
                  <input type="email" name="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600" placeholder="example@email.com" />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">電話番号</label>
                  <input type="tel" name="phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600" placeholder="090-1234-5678" />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">お問い合わせ内容 *</label>
                  <textarea name="message" required rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600" placeholder="ご予約希望日時やご質問などをご記入ください"></textarea>
                </div>
                <button type="submit" class="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-semibold">
                  <i class="fas fa-paper-plane mr-2"></i>
                  送信する
                </button>
              </form>
              <div id="form-message" class="mt-4 hidden"></div>
            </div>

            {/* Contact Info */}
            <div>
              <div class="bg-white rounded-xl shadow-lg p-8 mb-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-6">店舗情報</h3>
                <div class="space-y-4">
                  <div class="flex items-start">
                    <i class="fas fa-map-marker-alt text-pink-600 text-xl mr-4 mt-1"></i>
                    <div>
                      <h4 class="font-semibold text-gray-800">住所</h4>
                      <p class="text-gray-600">〒150-0001<br />東京都渋谷区神宮前1-2-3</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <i class="fas fa-phone text-pink-600 text-xl mr-4 mt-1"></i>
                    <div>
                      <h4 class="font-semibold text-gray-800">電話番号</h4>
                      <p class="text-gray-600">03-1234-5678</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <i class="fas fa-clock text-pink-600 text-xl mr-4 mt-1"></i>
                    <div>
                      <h4 class="font-semibold text-gray-800">営業時間</h4>
                      <p class="text-gray-600">
                        平日: 10:00 - 20:00<br />
                        土日祝: 9:00 - 19:00<br />
                        定休日: 毎週火曜日
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-8">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                  <i class="fas fa-gift text-pink-600 mr-2"></i>
                  初回限定キャンペーン
                </h3>
                <p class="text-gray-700 mb-2">初めてのお客様限定で</p>
                <p class="text-3xl font-bold text-pink-600 mb-2">20% OFF</p>
                <p class="text-sm text-gray-600">※一部メニューを除く</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-6">
          <div class="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 class="text-2xl font-bold mb-4">
                <i class="fas fa-spa mr-2"></i>
                Salon de Beauté
              </h3>
              <p class="text-gray-400">
                あなたの美しさを引き出す、上質なサロン体験をお届けします。
              </p>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">クイックリンク</h4>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#home" class="hover:text-pink-400 transition">ホーム</a></li>
                <li><a href="#services" class="hover:text-pink-400 transition">サービス</a></li>
                <li><a href="#menu" class="hover:text-pink-400 transition">メニュー・料金</a></li>
                <li><a href="#contact" class="hover:text-pink-400 transition">お問い合わせ</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">フォローする</h4>
              <div class="flex space-x-4">
                <a href="#" class="text-2xl hover:text-pink-400 transition">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="text-2xl hover:text-pink-400 transition">
                  <i class="fab fa-facebook"></i>
                </a>
                <a href="#" class="text-2xl hover:text-pink-400 transition">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="text-2xl hover:text-pink-400 transition">
                  <i class="fab fa-line"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Salon de Beauté. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Form JavaScript */}
      <script dangerouslySetInnerHTML={{__html: `
        document.getElementById('contact-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const formData = new FormData(e.target);
          const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
          };
          
          const messageDiv = document.getElementById('form-message');
          
          try {
            const response = await fetch('/api/contact', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
              messageDiv.className = 'mt-4 p-4 bg-green-100 text-green-700 rounded-lg';
              messageDiv.textContent = result.message;
              messageDiv.classList.remove('hidden');
              e.target.reset();
            } else {
              messageDiv.className = 'mt-4 p-4 bg-red-100 text-red-700 rounded-lg';
              messageDiv.textContent = result.error;
              messageDiv.classList.remove('hidden');
            }
          } catch (error) {
            messageDiv.className = 'mt-4 p-4 bg-red-100 text-red-700 rounded-lg';
            messageDiv.textContent = 'エラーが発生しました。もう一度お試しください。';
            messageDiv.classList.remove('hidden');
          }
        });

        // Mobile menu toggle
        document.getElementById('mobile-menu-button')?.addEventListener('click', () => {
          alert('モバイルメニューは実装中です');
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
