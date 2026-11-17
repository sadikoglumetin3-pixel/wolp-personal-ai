export type NavigationItem = {
  label: string;
  href: string;
};

export type Feature = {
  number: string;
  title: string;
  description: string;
};

export type WorkflowStep = {
  title: string;
  description: string;
};

export const navigation: NavigationItem[] = [
  { label: "Özellikler", href: "#ozellikler" },
  { label: "Nasıl çalışır?", href: "#nasil-calisir" },
  { label: "Güvenlik", href: "#guvenlik" },
];

export const features: Feature[] = [
  {
    number: "01",
    title: "Tek merkezden yönet",
    description:
      "Projelerin, görevlerin ve önemli dosyaların bağlamını kaybetmeden aynı çalışma alanında kalsın.",
  },
  {
    number: "02",
    title: "AI iş akışları oluştur",
    description:
      "Tekrarlayan işleri Wolp'a aktar; ilerlemeyi, sonuçları ve onay bekleyen adımları kolayca izle.",
  },
  {
    number: "03",
    title: "Kontrol sende kalsın",
    description:
      "Kritik işlemler sen onay vermeden başlamaz. Yetkileri ve bildirimleri ihtiyacına göre düzenle.",
  },
];

export const workflow: WorkflowStep[] = [
  {
    title: "Ne istediğini anlat",
    description: "Hedefini günlük dilde yaz veya sesli komutla paylaş.",
  },
  {
    title: "Planı gözden geçir",
    description: "Wolp işi adımlara ayırır ve gereken onayları açıkça gösterir.",
  },
  {
    title: "Sonucu takip et",
    description: "İlerleme ve çıktılar tek ekranda toplanır; önemli gelişmeler sana bildirilir.",
  },
];
