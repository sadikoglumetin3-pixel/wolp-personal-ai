import { useEffect, useId, useState } from "react";
import { features, navigation, workflow } from "./content";

function Brand() {
  return (
    <a className="brand" href="#baslangic" aria-label="Wolp ana sayfa">
      <span className="brand-mark" aria-hidden="true">W</span>
      <span>WOLP</span>
    </a>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function ArrowIcon() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigationId = useId();

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#ana-icerik">Ana içeriğe geç</a>

      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls={navigationId}
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <MenuIcon open={menuOpen} />
          </button>
          <nav
            id={navigationId}
            className={`site-navigation ${menuOpen ? "is-open" : ""}`}
            aria-label="Ana menü"
          >
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <a className="nav-action" href="#demo" onClick={closeMenu}>
              Demoyu keşfet
              <ArrowIcon />
            </a>
          </nav>
        </div>
      </header>

      <main id="ana-icerik">
        <section className="hero" id="baslangic" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span /> KİŞİSEL AI YÖNETİM MERKEZİ</p>
              <h1 id="hero-title">İşlerin sen dinlenirken de <em>akışta kalsın.</em></h1>
              <p className="hero-intro">
                Wolp, projelerini ve günlük işlerini anlayan; planlayan, takip eden ve kontrolü her zaman sana bırakan kişisel AI çalışma alanın.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#demo">
                  Örnek alanı incele
                  <ArrowIcon />
                </a>
                <a className="text-link" href="#nasil-calisir">Nasıl çalıştığını gör <span aria-hidden="true">↓</span></a>
              </div>
              <ul className="trust-list" aria-label="Ürün özellikleri">
                <li><span aria-hidden="true">✓</span> Onaylı işlemler</li>
                <li><span aria-hidden="true">✓</span> Her cihazda erişim</li>
              </ul>
            </div>

            <div className="product-preview" id="demo" aria-label="Wolp görev ekranı örneği">
              <div className="preview-topbar">
                <div className="mini-brand"><span>W</span> WOLP</div>
                <div className="preview-status"><i /> Buluta bağlı</div>
              </div>
              <div className="preview-body">
                <div className="preview-heading">
                  <div>
                    <small>GÜNAYDIN, METİN</small>
                    <h2>Bugünün odağı</h2>
                  </div>
                  <span className="avatar">M</span>
                </div>
                <article className="focus-card">
                  <div className="focus-card-head">
                    <span className="task-icon" aria-hidden="true">⌁</span>
                    <span className="live-pill"><i /> Çalışıyor</span>
                  </div>
                  <h3>Mobil deneyimi iyileştir</h3>
                  <p>Coding Agent bileşenleri inceliyor ve test planını hazırlıyor.</p>
                  <div className="progress-label"><span>İlerleme</span><strong>%68</strong></div>
                  <div className="progress-bar"><span /></div>
                </article>
                <div className="preview-row">
                  <div><span className="row-icon">✓</span><span><strong>12 görev</strong><small>Bu hafta tamamlandı</small></span></div>
                  <div><span className="row-icon warm">!</span><span><strong>2 onay</strong><small>Yanıtını bekliyor</small></span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section features-section" id="ozellikler" aria-labelledby="features-title">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow"><span /> DAHA SAKİN BİR İŞ AKIŞI</p>
                <h2 id="features-title">Karmaşayı azalt.<br />Önemli olana odaklan.</h2>
              </div>
              <p>Wolp yalnızca yanıt üretmez; işin bağlamını korur, sonraki adımları görünür kılar ve karar anlarında seni sürece dahil eder.</p>
            </div>
            <div className="feature-grid">
              {features.map((feature) => (
                <article className="feature-card" key={feature.number}>
                  <span className="feature-number">{feature.number}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section workflow-section" id="nasil-calisir" aria-labelledby="workflow-title">
          <div className="container workflow-grid">
            <div className="workflow-copy">
              <p className="eyebrow light"><span /> BASİT VE ŞEFFAF</p>
              <h2 id="workflow-title">Bir hedef söyle.<br />Wolp akışı kursun.</h2>
              <p>Her adımı görebilir, yönünü değiştirebilir veya süreci durdurabilirsin. Otomasyon hız kazandırır; son söz daima sende kalır.</p>
            </div>
            <ol className="workflow-list">
              {workflow.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{step.title}</h3><p>{step.description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section security-section" id="guvenlik" aria-labelledby="security-title">
          <div className="container security-card">
            <div className="security-mark" aria-hidden="true">W</div>
            <div>
              <p className="eyebrow"><span /> GÜVENLİ KONTROL</p>
              <h2 id="security-title">Kritik kararlar otomatikleşmez.</h2>
              <p>Yayınlama, ödeme veya kalıcı değişiklik gibi önemli işlemler açık onayın olmadan uygulanmaz. Wolp ne yaptığını ve neden yaptığını görünür tutar.</p>
            </div>
            <ul>
              <li><span>01</span> Açık işlem geçmişi</li>
              <li><span>02</span> Yönetilebilir yetkiler</li>
              <li><span>03</span> Onay gerektiren adımlar</li>
            </ul>
          </div>
        </section>

        <section className="cta-section" aria-labelledby="cta-title">
          <div className="container cta-inner">
            <div><p className="eyebrow"><span /> WOLP PERSONAL AI</p><h2 id="cta-title">Daha az takip et.<br />Daha çok ilerle.</h2></div>
            <a className="button button-primary" href="#demo">Örnek alanı keşfet <ArrowIcon /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <Brand />
          <p>Projelerin ve günlük işlerin için kişisel AI yönetim merkezi.</p>
          <a href="#baslangic">Başa dön <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </div>
  );
}
