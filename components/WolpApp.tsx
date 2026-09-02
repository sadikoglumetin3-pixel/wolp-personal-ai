"use client";

import { FormEvent, useState } from "react";
import {
  Bell,
  Buildings,
  CalendarBlank,
  CaretDown,
  CaretLeft,
  CaretRight,
  ChatCircle,
  Check,
  CheckSquare,
  Clock,
  CloudCheck,
  Code,
  Database,
  DeviceMobile,
  EnvelopeSimple,
  Eye,
  EyeSlash,
  File,
  FileCode,
  FilePdf,
  Folder,
  GearSix,
  GithubLogo,
  GoogleDriveLogo,
  Image as ImageIcon,
  Key,
  List,
  Lock,
  Microphone,
  Paperclip,
  PaperPlaneTilt,
  Pause,
  Plug,
  Plus,
  PuzzlePiece,
  Robot,
  ShieldCheck,
  SignIn,
  Sparkle,
  Users,
  VideoCamera,
  WhatsappLogo,
  X,
  YoutubeLogo,
} from "@phosphor-icons/react";

type PageKey = "chat" | "tasks" | "projects" | "wolp" | "files" | "integrations" | "settings";

const navItems = [
  { key: "chat" as const, label: "Chat", icon: ChatCircle },
  { key: "tasks" as const, label: "Görevler", icon: CheckSquare },
  { key: "projects" as const, label: "Projeler", icon: Folder },
  { key: "wolp" as const, label: "Wolp", icon: Buildings },
  { key: "files" as const, label: "Dosyalar", icon: File },
  { key: "integrations" as const, label: "Entegrasyonlar", icon: PuzzlePiece },
  { key: "settings" as const, label: "Ayarlar", icon: GearSix },
];

const taskRows = [
  { title: "Voice Agent gecikme optimizasyonu", agent: "Coding Agent", status: "Çalışıyor", tone: "running" },
  { title: "Kuyumcu pazar araştırması", agent: "Research Agent", status: "Tamamlandı", tone: "done" },
  { title: "Wolp sitesini canlıya alma", agent: "Coding Agent", status: "Onay bekliyor", tone: "approval" },
  { title: "Haftalık çalışma özeti", agent: "CEO Agent", status: "Planlandı", tone: "queued" },
];

const projectRows = [
  { name: "Wolp Personal AI", description: "Kişisel AI yönetim merkezi", progress: 18, active: "2 aktif görev" },
  { name: "Wolp Business OS", description: "KOBİ operasyon sistemi", progress: 64, active: "5 aktif görev" },
  { name: "Wolp Voice Agent", description: "Telefon görüşme ajanı", progress: 42, active: "1 aktif görev" },
  { name: "Wolp Group", description: "Şirket, satış ve büyüme", progress: 31, active: "3 aktif görev" },
];

const fileRows = [
  { name: "Voice Agent Test Raporu.pdf", meta: "Bugün · 2,4 MB", icon: FilePdf },
  { name: "wolp-mobile-menu.patch", meta: "Bugün · 18 KB", icon: FileCode },
  { name: "Kuyumcu Demo Görseli.png", meta: "Dün · 3,8 MB", icon: ImageIcon },
  { name: "Wolp Tanıtım Videosu.mp4", meta: "30 Ağu · 48 MB", icon: VideoCamera },
];

const integrations = [
  { name: "GitHub", detail: "Kod ve proje yönetimi", icon: GithubLogo, state: "Bağlı", active: true },
  { name: "Vercel", detail: "Önizleme ve yayınlama", icon: CloudCheck, state: "Bağlı", active: true },
  { name: "Wolp Business OS", detail: "İşletme ve kullanıcı yönetimi", icon: Database, state: "Hazırlanıyor", active: false },
  { name: "Gmail", detail: "E-posta işlemleri", icon: EnvelopeSimple, state: "Yakında", active: false },
  { name: "Google Calendar", detail: "Takvim ve hatırlatıcılar", icon: CalendarBlank, state: "Yakında", active: false },
  { name: "Google Drive", detail: "Dosya saklama", icon: GoogleDriveLogo, state: "Yakında", active: false },
  { name: "YouTube", detail: "Video yükleme ve yönetim", icon: YoutubeLogo, state: "Yakında", active: false },
  { name: "WhatsApp", detail: "Mesaj ve müşteri iletişimi", icon: WhatsappLogo, state: "Yakında", active: false },
];

function Login({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onLogin();
  }

  return (
    <main className="login-page">
      <section className="login-brand" aria-label="Wolp Personal AI tanıtımı">
        <div className="brand-lockup brand-lockup-large">
          <span className="brand-mark">W</span>
          <span>WOLP</span>
        </div>
        <div className="login-brand-copy">
          <p className="eyebrow">PERSONAL AI</p>
          <h1>İşlerin sen uyurken de devam etsin.</h1>
          <p>Projelerini, görevlerini ve Wolp sistemlerini tek bir AI yönetim merkezinden kontrol et.</p>
        </div>
        <div className="login-cloud"><CloudCheck size={20} weight="duotone" /> Bulut sistemi hazır</div>
      </section>

      <section className="login-panel">
        <form className="login-form" onSubmit={submit}>
          <div className="login-mobile-logo brand-lockup"><span className="brand-mark">W</span><span>WOLP</span></div>
          <p className="eyebrow">YÖNETİM MERKEZİ</p>
          <h2>Tekrar hoş geldin, Metin.</h2>
          <p className="muted">Devam etmek için hesabına giriş yap.</p>

          <label className="field-label" htmlFor="username">Kullanıcı adı</label>
          <div className="field-wrap"><Users size={19} /><input id="username" name="username" defaultValue="metospor" autoComplete="username" required /></div>

          <label className="field-label" htmlFor="password">Parola</label>
          <div className="field-wrap"><Lock size={19} /><input id="password" name="password" type={showPassword ? "text" : "password"} defaultValue="preview" autoComplete="current-password" required /><button type="button" className="field-icon" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Parolayı gizle" : "Parolayı göster"}>{showPassword ? <EyeSlash size={19} /> : <Eye size={19} />}</button></div>

          <button className="primary-button login-button" type="submit">Yönetim merkezine gir <SignIn size={19} /></button>
          <p className="preview-note"><ShieldCheck size={16} /> Bu aşamada giriş ekranı yalnızca arayüz önizlemesidir.</p>
        </form>
      </section>
    </main>
  );
}

export function WolpApp() {
  const [authenticated, setAuthenticated] = useState(false);
  const [page, setPage] = useState<PageKey>("chat");
  const [taskPanelOpen, setTaskPanelOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [draft, setDraft] = useState("");

  if (!authenticated) return <Login onLogin={() => setAuthenticated(true)} />;

  function selectPage(nextPage: PageKey) {
    setPage(nextPage);
    setMobileMenuOpen(false);
  }

  const activeLabel = navItems.find((item) => item.key === page)?.label ?? "Chat";

  return (
    <main className={`app-shell ${taskPanelOpen && page === "chat" ? "task-panel-is-open" : ""}`}>
      <aside className={`sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-head">
          <div className="brand-lockup"><span className="brand-mark">W</span><span>WOLP</span></div>
          <button className="mobile-close" type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Menüyü kapat"><X size={23} /></button>
        </div>
        <nav className="main-nav" aria-label="Ana menü">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button key={key} type="button" className={page === key ? "active" : ""} onClick={() => selectPage(key)}><Icon size={23} weight={page === key ? "duotone" : "regular"} /><span>{label}</span></button>
          ))}
        </nav>
        <div className="sidebar-date"><CalendarBlank size={22} /><span>2 Eylül 2026<small>Çarşamba</small></span></div>
      </aside>

      {mobileMenuOpen && <button className="mobile-scrim" type="button" aria-label="Menüyü kapat" onClick={() => setMobileMenuOpen(false)} />}

      <section className="workspace">
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu-button" type="button" onClick={() => setMobileMenuOpen(true)} aria-label="Menüyü aç"><List size={24} /></button>
            <h1>{page === "chat" ? "Wolp Personal AI" : activeLabel}</h1>
          </div>
          <div className="topbar-actions">
            <span className="cloud-state"><CloudCheck size={20} weight="duotone" /> <span>Buluta bağlı</span></span>
            {page === "chat" && !taskPanelOpen && <button className="topbar-button task-toggle" type="button" onClick={() => setTaskPanelOpen(true)}><CheckSquare size={19} /> <span>Aktif görev</span></button>}
            <div className="popover-wrap">
              <button className="icon-button notification-button" type="button" onClick={() => setNotificationsOpen((value) => !value)} aria-label="Bildirimleri aç"><Bell size={22} /><span className="notification-dot" /></button>
              {notificationsOpen && <div className="popover notification-popover"><div className="popover-title"><strong>Bildirimler</strong><span>2 yeni</span></div><button type="button"><span className="notification-icon success"><Check size={16} /></span><span><strong>Araştırma tamamlandı</strong><small>Kuyumcu pazar raporu Dosyalar’a kaydedildi.</small></span></button><button type="button"><span className="notification-icon approval"><ShieldCheck size={16} /></span><span><strong>Onayın gerekiyor</strong><small>Wolp sitesi canlıya alınmaya hazır.</small></span></button></div>}
            </div>
            <div className="profile-wrap">
              <button className="profile-button" type="button" onClick={() => setProfileOpen((value) => !value)}><span className="avatar">M</span><span>Metin</span><CaretDown size={15} /></button>
              {profileOpen && <div className="popover profile-popover"><button type="button" onClick={() => selectPage("settings")}><GearSix size={18} /> Ayarlar</button><button type="button" onClick={() => setAuthenticated(false)}><SignIn size={18} /> Çıkış yap</button></div>}
            </div>
          </div>
        </header>

        <section className="page-area">
          {page === "chat" ? <ChatPage draft={draft} setDraft={setDraft} /> : <SectionPage page={page} />}
        </section>
      </section>

      {page === "chat" && taskPanelOpen && <TaskInspector onClose={() => setTaskPanelOpen(false)} />}
    </main>
  );
}

function ChatPage({ draft, setDraft }: { draft: string; setDraft: (value: string) => void }) {
  return (
    <div className="chat-page">
      <div className="chat-stream">
        <div className="date-divider"><span>Bugün</span></div>
        <div className="user-message">Ben yatacağım. Voice Agent kodundaki gecikmeyi azalt, testleri çalıştır ve bitince telefonuma bildir.<small>22:42 <Check size={14} weight="bold" /></small></div>
        <article className="assistant-message">
          <div className="assistant-avatar"><span>W</span></div>
          <div className="assistant-content">
            <div className="assistant-name">Wolp AI <small>22:42</small></div>
            <div className="assistant-card">
              <p>Tamam Metin. Voice Agent kodundaki gecikmeyi azaltmak için optimizasyon yapacağım, testleri çalıştıracağım ve tamamlanınca telefonuna bildirim göndereceğim.</p>
              <div className="assistant-facts">
                <div><CloudCheck size={25} weight="duotone" /><span><strong>Görev bulutta başlatıldı.</strong><small>Telefonunu kapatsan da çalışmaya devam edecek.</small></span></div>
                <div><Bell size={24} weight="duotone" /><span><strong>Tamamlandığında bildirim göndereceğim.</strong><small>Bildirim tercihlerin geçerli.</small></span></div>
                <div><ShieldCheck size={25} weight="duotone" /><span><strong>Canlıya alma onay gerektirir.</strong><small>Dağıtım yalnızca sen onaylarsan başlayacak.</small></span></div>
              </div>
              <time>22:42</time>
            </div>
          </div>
        </article>
      </div>
      <form className="composer" onSubmit={(event) => { event.preventDefault(); setDraft(""); }}>
        <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Wolp’a bir şey sor..." aria-label="Wolp AI mesajı" rows={2} />
        <div className="composer-actions">
          <div><button type="button" aria-label="Dosya ekle"><Paperclip size={21} /></button><button type="button" aria-label="Sesli komut"><Microphone size={21} /><span>Sesli komut</span></button></div>
          <button className="send-button" type="submit" aria-label="Mesajı gönder"><PaperPlaneTilt size={22} weight="fill" /></button>
        </div>
      </form>
    </div>
  );
}

function TaskInspector({ onClose }: { onClose: () => void }) {
  return (
    <aside className="task-inspector" aria-label="Aktif görev ayrıntıları">
      <button className="panel-collapse" type="button" onClick={onClose} aria-label="Görev panelini kapat"><CaretRight size={18} /><span>Paneli kapat</span></button>
      <div className="task-title"><div className="task-icon"><Code size={27} /></div><h2>Voice Agent Gecikme<br />Optimizasyonu ve Test</h2></div>
      <dl className="task-meta"><div><dt>Durum</dt><dd className="live"><span />Bulutta çalışıyor</dd></div><div><dt>Ajan</dt><dd><Robot size={19} weight="duotone" /> Coding Agent</dd></div><div><dt>Başlatıldı</dt><dd>2 Eylül 2026 22:42</dd></div></dl>
      <div className="task-progress"><h3>İlerleme</h3><ol><li className="current"><span>1</span><div><strong>Kodu inceliyor</strong><small>22:42</small></div><em>Devam ediyor</em></li><li><span>2</span><div><strong>Optimizasyon</strong></div><em>Beklemede</em></li><li><span>3</span><div><strong>Test</strong></div><em>Beklemede</em></li><li><span>4</span><div><strong>Sonuç</strong></div><em>Beklemede</em></li></ol></div>
      <div className="task-inspector-bottom"><button className="pause-button" type="button"><Pause size={20} weight="fill" /> Görevi duraklat</button><div className="approval-note"><ShieldCheck size={27} weight="duotone" /><span><strong>Canlıya alma onay gerektirir.</strong><small>Dağıtım senin onayına bağlıdır.</small></span></div></div>
    </aside>
  );
}

function SectionPage({ page }: { page: Exclude<PageKey, "chat"> }) {
  const content = {
    tasks: { eyebrow: "AI İŞ AKIŞLARI", title: "Görevler", intro: "Wolp AI’ın planladığı ve bulutta yürüttüğü bütün işleri buradan kontrol et." },
    projects: { eyebrow: "ÇALIŞMA ALANLARI", title: "Projeler", intro: "Kararlarını, dosyalarını ve görevlerini proje bağlamında bir arada tut." },
    wolp: { eyebrow: "İŞLETME YÖNETİMİ", title: "Wolp", intro: "Business OS müşterilerini, kullanıcılarını ve sistem durumunu tek merkezden yönet." },
    files: { eyebrow: "AI ÇIKTILARI", title: "Dosyalar", intro: "AI’ın hazırladığı ve senin yüklediğin bütün içeriklere ulaş." },
    integrations: { eyebrow: "BAĞLANTILAR", title: "Entegrasyonlar", intro: "Wolp Personal AI’ın kullanabileceği servisleri güvenli biçimde bağla." },
    settings: { eyebrow: "KONTROL MERKEZİ", title: "Ayarlar", intro: "Bildirimleri, cihazları, güvenliği ve AI yetkilerini yönet." },
  }[page];

  return (
    <div className="section-page">
      <header className="section-heading"><div><p className="eyebrow">{content.eyebrow}</p><h2>{content.title}</h2><p>{content.intro}</p></div>{page !== "settings" && <button className="primary-button" type="button"><Plus size={18} /> Yeni {page === "tasks" ? "görev" : page === "projects" ? "proje" : page === "files" ? "dosya" : "kayıt"}</button>}</header>
      {page === "tasks" && <TasksView />}
      {page === "projects" && <ProjectsView />}
      {page === "wolp" && <WolpView />}
      {page === "files" && <FilesView />}
      {page === "integrations" && <IntegrationsView />}
      {page === "settings" && <SettingsView />}
    </div>
  );
}

function TasksView() {
  return <div className="content-surface"><div className="filter-row"><button className="selected" type="button">Tümü <span>4</span></button><button type="button">Çalışıyor <span>1</span></button><button type="button">Onay bekliyor <span>1</span></button><button type="button">Tamamlandı <span>1</span></button></div><div className="data-list">{taskRows.map((task) => <button className="data-row" type="button" key={task.title}><span className={`status-indicator ${task.tone}`}><Clock size={18} /></span><span className="data-main"><strong>{task.title}</strong><small>{task.agent}</small></span><span className={`status-pill ${task.tone}`}>{task.status}</span><CaretRight size={18} /></button>)}</div></div>;
}

function ProjectsView() {
  return <div className="project-grid">{projectRows.map((project) => <button className="project-card" type="button" key={project.name}><div className="project-card-top"><span className="project-icon"><Folder size={22} weight="duotone" /></span><CaretRight size={18} /></div><h3>{project.name}</h3><p>{project.description}</p><div className="project-progress"><span><small>İlerleme</small><strong>%{project.progress}</strong></span><div><i style={{ width: `${project.progress}%` }} /></div></div><small className="active-work">{project.active}</small></button>)}</div>;
}

function WolpView() {
  return <div className="content-surface"><div className="summary-row"><div><small>Aktif işletme</small><strong>3</strong></div><div><small>Toplam kullanıcı</small><strong>27</strong></div><div><small>Onay bekleyen</small><strong>2</strong></div></div><div className="table-list"><div className="table-head"><span>İşletme</span><span>Paket</span><span>Kullanıcı</span><span>Durum</span></div>{["Swan Fashion", "Enza Beauty", "Wolp Demo"].map((name, index) => <button className="table-row" type="button" key={name}><span><span className="business-avatar">{name.charAt(0)}</span><strong>{name}</strong></span><span>{index === 2 ? "Demo" : "Business OS"}</span><span>{index === 0 ? 15 : index === 1 ? 8 : 4}</span><span className={index === 1 ? "warning-text" : "success-text"}>{index === 1 ? "Kurulum" : "Aktif"}</span></button>)}</div></div>;
}

function FilesView() {
  return <div className="content-surface"><div className="file-toolbar"><div><button className="selected" type="button">Tüm dosyalar</button><button type="button">Görseller</button><button type="button">Raporlar</button><button type="button">Kod</button></div><button type="button"><List size={19} /></button></div><div className="file-list">{fileRows.map(({ name, meta, icon: Icon }) => <button className="file-row" type="button" key={name}><span className="file-type"><Icon size={24} weight="duotone" /></span><span><strong>{name}</strong><small>{meta}</small></span><CaretRight size={18} /></button>)}</div></div>;
}

function IntegrationsView() {
  return <div className="integration-grid">{integrations.map(({ name, detail, icon: Icon, state, active }) => <article className="integration-card" key={name}><div className="integration-icon"><Icon size={27} weight="duotone" /></div><div><h3>{name}</h3><p>{detail}</p></div><button className={active ? "connected" : "coming-soon"} type="button" disabled={!active}>{active && <Check size={15} weight="bold" />}{state}</button></article>)}</div>;
}

function SettingsView() {
  return <div className="settings-layout"><nav aria-label="Ayar kategorileri"><button className="active" type="button"><Bell size={19} /> Bildirimler</button><button type="button"><ShieldCheck size={19} /> Güvenlik</button><button type="button"><Sparkle size={19} /> AI yetkileri</button><button type="button"><DeviceMobile size={19} /> Cihazlar</button><button type="button"><Database size={19} /> Hafıza</button></nav><section className="settings-panel"><h3>Bildirimler</h3><p>Hangi gelişmelerde ve hangi cihazlarda haberdar olmak istediğini seç.</p>{["Görev tamamlandığında", "Bir işlem onay beklediğinde", "Bir görev başarısız olduğunda", "Wolp’a yeni müşteri geldiğinde"].map((label, index) => <label className="switch-row" key={label}><span><strong>{label}</strong><small>{index === 0 ? "Telefon ve bilgisayarda göster" : "Önemli sistem bildirimleri"}</small></span><input type="checkbox" defaultChecked={index !== 2} /><i /></label>)}</section></div>;
}
