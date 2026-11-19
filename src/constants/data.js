/**
 * Static Data Layer for Eco-Enzyme Landing Page
 * SB7 (StoryBrand 7) Framework — updated September 2026
 * Brand Identity: SiDeta — Sanitasi Hijau Jeruklegi
 */

// ─────────────────────────────────────────────────
// Brand Identity & Metadata
// ─────────────────────────────────────────────────
export const BRAND_IDENTITY = {
  name: 'SiDeta',
  program: 'Sanitasi Hijau',
  tagline: 'Inovasi Pembersih Ramah Lingkungan Desa Jeruklegi',
  logoEmblem: '/images/brand/logo-emblem.webp',
  logoFull: '/images/brand/logo-full.webp',
};

// ─────────────────────────────────────────────────
// SB7 Element 1 — Hero Showcase (The Grunt Test)
// ─────────────────────────────────────────────────
export const HERO_SHOWCASE = {
  badgeText: 'Sabun & Pembersih Alami',
  priceTag: 'Mulai Rp 15.000',
  title: 'Fermentasi Alami Berkualitas',
  subtitle:
    'Formula higienis ramah bumi hasil pengolahan limbah organik warga Jeruklegi',
  highlightBenefit: 'Aman untuk Balita & Kulit Sensitif',
};


// ─────────────────────────────────────────────────
// SB7 Element 2 — Problem (3 Lapis Masalah)
// ─────────────────────────────────────────────────
export const PROBLEM_CARDS = [
  {
    id: 'external',
    title: 'Limbah yang Terus Menumpuk',
    description:
      'Kulit jeruk, sisa buah, dan ampas dapur setiap hari terbuang sia-sia ke tempat sampah. Di Desa Jeruklegi, kami memilih untuk tidak lagi membiarkannya mencemari tanah dan saluran air kita.',
    iconName: 'Trash2',
  },
  {
    id: 'internal',
    title: 'Khawatir Formula Kimia Keras',
    description:
      'Sebagai orang tua, kita sering cemas melihat si kecil bermain di lantai yang baru saja dipel dengan pembersih kimia berbau menyengat. Kita ingin rumah yang bersih, tapi juga aman bagi pernapasan keluarga.',
    iconName: 'Heart',
  },
  {
    id: 'philosophical',
    title: 'Seharusnya Bersih Itu Alami & Terjangkau',
    description:
      'Merawat rumah dan menjaga bumi tidak seharusnya terasa rumit apalagi mahal. Setiap keluarga berhak atas pembersih yang jujur, aman di kulit, dan lahir dari gotong royong warga desa.',
    iconName: 'Scale',
  },
];

// ─────────────────────────────────────────────────
// SB7 Element 3 — Guide / About (Proses Produksi)
// ─────────────────────────────────────────────────
export const EDUCATION_STEPS = [
  {
    step: 1,
    title: 'Pilah dari Dapur Warga',
    description:
      'Kulit jeruk manis dan sisa buah segar dikumpulkan langsung dari dapur warga Desa Jeruklegi dengan penuh ketelitian.',
    iconName: 'Apple',
  },
  {
    step: 2,
    title: 'Fermentasi Sabar 90 Hari',
    description:
      'Difermentasi secara alami bersama molase tebu murni selama 3 bulan tanpa pemutih, pengawet, atau pewangi kimia sintetis.',
    iconName: 'FlaskConical',
  },
  {
    step: 3,
    title: 'Kebaikan Enzim Murni',
    description:
      'Disaring higienis menjadi cairan pembersih serbaguna dan sabun mandi lembut yang kaya manfaat antiseptik alami.',
    iconName: 'Sparkles',
  },
  {
    step: 4,
    title: 'Aliran Air Tetap Bersih',
    description:
      'Air sisa bilasan cucianmu justru membantu mengurai bakteri di saluran pembuangan dan menjaga kelestarian ekosistem tanah.',
    iconName: 'Leaf',
  },
];

// ─────────────────────────────────────────────────
// SB7 Element 4 — Plan (3 Langkah Beli)
// ─────────────────────────────────────────────────
export const PLAN_STEPS = [
  {
    step: 1,
    title: 'Pilih Kebutuhan Rumahmu',
    description:
      'Temukan varian sabun mandi lembut atau cairan pembersih lantai alami yang paling cocok untuk keluargamu.',
    iconName: 'ShoppingBag',
  },
  {
    step: 2,
    title: 'Sapa Kami di WhatsApp',
    description:
      'Cukup satu ketukan untuk terhubung dengan pengurus komunitas Jeruklegi. Tanya takaran atau konsultasi dulu dengan ramah.',
    iconName: 'MessageCircle',
  },
  {
    step: 3,
    title: 'Pesanan Tiba dengan Hangat',
    description:
      'Produk dikemas rapi dan aman, siap menemani hari-harimu merawat rumah dengan sentuhan alami Desa Jeruklegi.',
    iconName: 'PackageCheck',
  },
];

// ─────────────────────────────────────────────────
// SB7 Element 5 — Products Catalog
// ─────────────────────────────────────────────────
export const PRODUCTS = [
  {
    id: 'sabun-batang',
    name: 'Sabun Batang',
    description: 'Lembut di kulit, wangi alami dari enzim buah.',
    benefit: 'Aman untuk kulit sensitif anak-anak.',
    detail:
      'Sabun batang alami (100 gr) berbahan dasar fermentasi eco-enzyme kulit buah sitrus dan minyak kelapa murni.\n\nBebas SLS, paraben, dan bahan kimia sintetis keras sehingga aman untuk kulit sensitif anak-anak maupun balita. Menjaga kelembapan kulit alami dan ramah lingkungan dengan kemasan kertas kraft daur ulang tanpa plastik.\n\nCara Pakai: Busakan dengan air pada telapak tangan atau spons, usapkan lembut ke seluruh tubuh atau tangan, lalu bilas hingga bersih.',
    price: 'Rp 15.000',
    images: [
      '/images/products/sabun-batang-1.webp',
      '/images/products/sabun-batang-2.webp',
      '/images/products/sabun-batang-3.webp',
    ],
    whatsappUrl:
      'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Sabun%20Batang%20Eco-Enzyme.',
  },
  {
    id: 'pembersih-lantai',
    name: 'Pembersih Lantai',
    description: 'Lantai kesat, bersih dari noda, bebas bau kimia menyengat.',
    benefit: 'Aman jika tersentuh anak-anak yang sedang merangkak.',
    detail:
      'Cairan pembersih lantai konsentrat (500 ml) dengan bio-enzim aktif nanas dan jeruk yang melarutkan kotoran serta lemak membandel.\n\nBebas dari bahan kimia beracun sehingga lantai cepat kesat tanpa residu licin, aman bagi anak-anak yang bermain atau merangkak di lantai. Cocok untuk lantai keramik, granit, marmer, hingga parket kayu dengan keharuman minyak atsiri serai alami yang menyegarkan.\n\nCara Pakai: Larutkan 1 tutup botol ke dalam 3–5 liter air bersih, pel lantai seperti biasa tanpa perlu dibilas ulang.',
    price: 'Rp 25.000',
    images: [
      '/images/products/pembersih-lantai-1.webp',
      '/images/products/pembersih-lantai-2.webp',
      '/images/products/pembersih-lantai-3.webp',
    ],
    whatsappUrl:
      'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Pembersih%20Lantai%20Eco-Enzyme.',
  },
  {
    id: 'pembersih-kaca',
    name: 'Pembersih Kaca',
    description: 'Kaca bening tanpa residu dan lapisan kimia.',
    benefit: 'Cukup semprotkan, lap sekali — selesai.',
    detail:
      'Formula pembersih kaca ramah lingkungan (250 ml) dalam botol spray ergonomis yang cepat menguap tanpa meninggalkan goresan kabur (streak-free).\n\nEfektif membersihkan debu, noda sidik jari, dan cipratan air pada kaca jendela, cermin rias, meja kaca, maupun permukaan akrilik. Bebas amonia keras dengan aroma segar minyak atsiri lemon alami.\n\nCara Pakai: Semprotkan secukupnya pada permukaan kaca dari jarak 15–20 cm, lalu usap dengan kain mikrofiber bersih hingga jernih berkilau.',
    price: 'Rp 20.000',
    images: [
      '/images/products/pembersih-kaca-1.webp',
      '/images/products/pembersih-kaca-2.webp',
      '/images/products/pembersih-kaca-3.webp',
    ],
    whatsappUrl:
      'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Pembersih%20Kaca%20Eco-Enzyme.',
  },
  {
    id: 'pembersih-kamar-mandi',
    name: 'Pembersih Kamar Mandi',
    description: 'Angkat kerak membandel dengan kekuatan enzim alami.',
    benefit: 'Tidak menyengat di hidung, tidak perlu masker.',
    detail:
      'Pembersih sanitasi kuat (500 ml) berbasis asam organik alami hasil fermentasi eco-enzyme buah segar Desa Jeruklegi.\n\nDirancang khusus untuk mengikis endapan kerak air, residu sabun, dan lumut pada keramik, kloset, dan wastafel tanpa merusak nat semen keramik. Formulanya lembut pada sistem pernapasan tanpa uap kimia menyengat, serta aman bagi saluran pembuangan septik tank.\n\nCara Pakai: Tuangkan langsung pada area berkerak, diamkan 5–10 menit agar enzim bekerja melunakkan kerak, sikat perlahan, lalu bilas dengan air bersih.',
    price: 'Rp 25.000',
    images: [
      '/images/products/pembersih-kamar-mandi-1.webp',
      '/images/products/pembersih-kamar-mandi-2.webp',
      '/images/products/pembersih-kamar-mandi-3.webp',
    ],
    whatsappUrl:
      'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Pembersih%20Kamar%20Mandi%20Eco-Enzyme.',
  },
  {
    id: 'sabun-cuci-piring',
    name: 'Sabun Cuci Piring',
    description: 'Ampuh rontokkan minyak & bau amis tanpa rasa panas di tangan.',
    benefit: 'Aman untuk botol susu bayi dan peralatan makan anak-anak.',
    detail:
      'Diformulasikan khusus untuk dapur sehat (450 ml) dengan bio-enzim nanas pemecah protein lemak, saponin alami buah lerak, dan ekstrak jeruk nipis segar.\n\nMenghasilkan busa lembut mudah bilas tanpa residu licin kimia atau bau sabun pada piring dan gelas. Mengandung gliserin nabati alami menjaga telapak tangan tetap lembut dan tidak kering mengelupas.\n\nCara Pakai: Teteskan secukupnya pada spons basah, remas hingga berbusa, usapkan ke peralatan makan, lalu bilas dengan air mengalir hingga kesat.',
    price: 'Rp 18.000',
    images: [
      '/images/products/sabun-cuci-piring-1.webp',
      '/images/products/sabun-cuci-piring-2.webp',
      '/images/products/sabun-cuci-piring-3.webp',
    ],
    whatsappUrl:
      'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Sabun%20Cuci%20Piring%20Eco-Enzyme.',
  },
  {
    id: 'deterjen-cair',
    name: 'Deterjen Cair Pakaian',
    description: 'Bersihkan noda keringat & pakaian terdalam tanpa pudarkan warna.',
    benefit: 'Pakaian wangi segar tanpa bau apek jemur di dalam ruangan.',
    detail:
      'Inovasi deterjen pakaian ramah keluarga (1000 ml) yang memanfaatkan sinergi enzim protease dan amilase alami eco-enzyme untuk mendegradasi noda darah, keringat, dan saus langsung dari serat kain.\n\nTanpa fosfat yang mencemari sungai dan tanpa pemutih sintetis keras. Busa terkontrol aman untuk mesin cuci front load, top load, maupun cuci tangan. Sangat cocok untuk pakaian bayi dan kulit sensitif.\n\nCara Pakai: Gunakan 30–40 ml (1 tutup botol) untuk 5–7 kg cucian pakaian. Tuang langsung ke laci deterjen mesin cuci atau ember cuci manual.',
    price: 'Rp 35.000',
    images: [
      '/images/products/deterjen-cair-1.webp',
      '/images/products/deterjen-cair-2.webp',
      '/images/products/deterjen-cair-3.webp',
    ],
    whatsappUrl:
      'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Deterjen%20Cair%20Pakaian%20Eco-Enzyme.',
  },
  {
    id: 'sabun-cuci-tangan',
    name: 'Sabun Cuci Tangan Busa',
    description: 'Busa mikro instan selembut awan dengan proteksi antibakteri buah.',
    benefit: 'Tangan bersih higienis tanpa rasa kering walau sering cuci tangan.',
    detail:
      'Sabun cuci tangan instan (250 ml) dengan botol pompa pembuat busa (foaming pump) yang mengubah cairan enzim menjadi jutaan gelembung busa lembut dalam satu kali tekan.\n\nMenjadikan rutinitas cuci tangan menyenangkan bagi si kecil. Diperkaya bio-asam organik eco-enzyme yang menonaktifkan kuman secara alami tanpa triclosan atau alkohol, serta aloe vera untuk kelembapan ekstra.\n\nCara Pakai: Tekan pompa 1 kali untuk mengeluarkan busa kaya pada telapak tangan basah, gosok sela-sela jari selama 20 detik, lalu bilas bersih.',
    price: 'Rp 22.000',
    images: [
      '/images/products/sabun-cuci-tangan-1.webp',
      '/images/products/sabun-cuci-tangan-2.webp',
      '/images/products/sabun-cuci-tangan-3.webp',
    ],
    whatsappUrl:
      'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Sabun%20Cuci%20Tangan%20Busa%20Eco-Enzyme.',
  },
  {
    id: 'nutrisi-tanaman',
    name: 'Nutrisi & Bio-Pestisida Tanaman',
    description: 'Semprotan siap pakai penyubur daun dan pengusir hama kutu daun.',
    benefit: 'Tanaman rimbun hijau segar tanpa pestisida kimia — pet safe.',
    detail:
      'Formula bio-nutrisi tanaman 2-in-1 siap semprot (500 ml) yang menggabungkan hormon pertumbuhan alami auksin & sitokinin dari fermentasi eco-enzyme buah dengan asam asetat pengusir hama.\n\nMerangsang tunas baru, menguatkan akar, dan mengusir kutu putih maupun semut secara biologis tanpa meracuni hewan peliharaan di rumah.\n\nCara Pakai: Kocok perlahan, semprotkan kabut halus ke permukaan atas dan bawah daun serta media tanam 1–2 kali seminggu pada pagi hari.',
    price: 'Rp 20.000',
    images: [
      '/images/products/nutrisi-tanaman-1.webp',
      '/images/products/nutrisi-tanaman-2.webp',
      '/images/products/nutrisi-tanaman-3.webp',
    ],
    whatsappUrl:
      'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Nutrisi%20Tanaman%20Eco-Enzyme.',
  },
];

// ─────────────────────────────────────────────────
// SB7 Element 7 — Success Vision
// ─────────────────────────────────────────────────
export const SUCCESS_POINTS = [
  {
    id: 'clean-home',
    title: 'Rumah Bersih, Pikiran Tenang',
    description:
      'Lantai, kaca, kamar mandi — semuanya bersih. Dan kamu tahu persis apa yang dipakai untuk membersihkannya.',
    iconName: 'Home',
  },
  {
    id: 'safe-family',
    title: 'Keluarga Lebih Aman',
    description:
      'Tidak ada lagi kekhawatiran soal residu kimia di lantai tempat anak-anak bermain, atau di peralatan makan yang dicuci tiap hari.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'meaningful-choice',
    title: 'Kamu Bagian dari Sesuatu yang Berarti',
    description:
      'Setiap pembelian mendukung komunitas lokal Jeruklegi dan mengurangi limbah yang seharusnya berakhir di tempat pembuangan akhir.',
    iconName: 'Globe',
  },
];

// ─────────────────────────────────────────────────
// SB7 Social Proof — SIMULASI PROTOTIPE / DEMO DOSEN
//
// ⚠️  CATATAN PRODUKSI:
//     Data di bawah saat ini menggunakan data dummy (simulasi skenario realistis)
//     agar section testimoni & dampak tampil sempurna saat demo/presentasi ke dosen.
//
// Syarat verifikasi sebelum rilis live ke publik (Go-Live):
//     1. Ganti dengan min. 3 testimoni nyata (nama + kutipan + foto/inisial terverifikasi).
//     2. Ganti dengan angka dampak riil dari tim lapangan Jeruklegi.
//
// Kontrol visibilitas:
//     - true  : section ditampilkan di landing page
//     - false : section disembunyikan sepenuhnya dari DOM (zero visual clutter)
// ─────────────────────────────────────────────────
export const SHOW_TESTIMONIALS = true;

export const TESTIMONIALS = [
  // Template format jika nanti diganti data nyata:
  // {
  //   id: 'testimoni-1',
  //   name: '[Nama Pelanggan]',
  //   location: '[Kota / Kelurahan]',
  //   quote: '[Kalimat singkat pengalaman nyata. Maks 2 kalimat.]',
  // },
  {
    id: 'testimoni-1',
    name: 'Ibu Endang Rahayu',
    location: 'Cilacap',
    quote:
      'Aroma lantainya segar alami tanpa bikin pusing. Yang paling penting, anak balita saya aman merangkak di lantai tanpa khawatir residu zat kimia keras.',
  },
  {
    id: 'testimoni-2',
    name: 'Pak Bambang Sutrisno',
    location: 'Purwokerto',
    quote:
      'Pupuk cair organiknya sangat membantu menyuburkan aglaonema dan cabai di pekarangan. Tanaman jauh lebih hijau segar dan tanahnya tetap gembur.',
  },
  {
    id: 'testimoni-3',
    name: 'Siti Nurjanah',
    location: 'Jeruklegi Kulon',
    quote:
      'Senang sekali limbah kulit buah dapur warga tidak lagi menumpuk sia-sia di tempat sampah, tapi diolah menjadi produk pembersih bermanfaat.',
  },
];

export const IMPACT_STATS = [
  // Template format jika nanti diganti data nyata terverifikasi:
  // { id: 'limbah', value: '[X]+ kg', label: 'Limbah organik sudah diolah' },
  // { id: 'keluarga', value: '[X]+', label: 'Keluarga sudah merasakan manfaatnya' },
  // { id: 'warga', value: '[X]+', label: 'Warga komunitas terlibat dalam produksi' },
  {
    id: 'limbah',
    value: '350+ kg',
    label: 'Limbah kulit buah dapur berhasil diolah kembali',
  },
  {
    id: 'keluarga',
    value: '85+',
    label: 'Keluarga beralih ke solusi pembersih ramah lingkungan',
  },
  {
    id: 'warga',
    value: '24',
    label: 'Ibu rumah tangga berdaya dalam komunitas Jeruklegi',
  },
];

// ─────────────────────────────────────────────────
// Navigation Links (Navbar & Footer Single Source of Truth)
// ─────────────────────────────────────────────────
export const NAV_LINKS = [
  { name: 'Beranda', href: '#hero' },
  { name: 'Tentang Kami', href: '#tentang' },
  { name: 'Produk', href: '#produk' },
  { name: 'Cara Pesan', href: '#cara-pesan' },
  { name: 'Kontak', href: '#kontak' },
];

// ─────────────────────────────────────────────────
// Footer Information Links (Konsumen & Edukasi)
// ─────────────────────────────────────────────────
export const FOOTER_INFO_LINKS = [
  { name: 'Pusat Bantuan & FAQ', href: '#faq', description: 'Tanya jawab seputar produk & pesanan' },
  { name: 'Panduan Dosis & Pemakaian', href: '#faq', description: 'Takaran campur air & aplikasi rumah' },
  { name: 'Standar Kualitas Alami', href: '#tentang', description: 'Proses fermentasi 90 hari & non-kimia' },
  { name: 'Ketentuan Order & Retur WA', href: '#faq', description: 'Garansi botol aman sampai tujuan' },
];

// ─────────────────────────────────────────────────
// Footer Copywriting & Metadata
// ─────────────────────────────────────────────────
export const FOOTER_CONTENT = {
  missionDescription:
    'SiDeta adalah wujud nyata hilirisasi riset pengabdian masyarakat Desa Jeruklegi, menghadirkan formula pembersih alami berbasis eco-enzyme yang aman untuk keluarga dan ramah bagi ekosistem air.',
  commitmentBadge: '100% Fermentasi Alami • Bebas SLS & Paraben',
  quickLinksTitle: 'Jelajahi',
  infoLinksTitle: 'Informasi & Bantuan',
  contactTitle: 'Hubungi Kami',
  contactSubtitle: 'Ada Pertanyaan? Kami Siap Membantu.',
  contactDescription:
    'Ingin tahu lebih banyak tentang produk, cara pembuatan, atau peluang kolaborasi? Jangan ragu untuk menghubungi kami.',
  copyrightText:
    'Inovasi Produk Pembersih Ramah Lingkungan Program Pengabdian Masyarakat Sanitasi Hijau Desa Jeruklegi.',
};

// ─────────────────────────────────────────────────
// Frequently Asked Questions (FAQ) Data
// ─────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    id: 'takaran-dosis',
    category: 'Dosis & Pemakaian',
    question: 'Bagaimana takaran campur air untuk pembersih lantai dan serbaguna?',
    answer:
      'Untuk mengepel lantai harian, cukup tuangkan 1–2 tutup botol (sekitar 20–30 ml) cairan SiDeta ke dalam 5 liter air bersih. Untuk membersihkan noda minyak dapur, kerak meja, atau kaca jendela, campurkan dengan rasio 1:10 di botol semprot, semprotkan langsung ke permukaan, lalu usap dengan lap bersih. Tidak perlu dibilas lagi dan tidak meninggalkan rasa licin lengket.',
  },
  {
    id: 'keamanan-keluarga',
    category: 'Keamanan Anak & Kulit',
    question: 'Apakah aman jika terkena kulit sensitif anak atau terjilat hewan peliharaan?',
    answer:
      'Sangat aman. Formula SiDeta 100% berbasis fermentasi asam organik alami buah dan gula tebu tanpa senyawa SLS, paraben, pemutih klorin, atau pewangi sintetis keras. Permukaan lantai yang sudah kering sepenuhnya ramah bagi balita yang sedang aktif merangkak serta anabul kesayangan yang sering menjilat lantai rumah.',
  },
  {
    id: 'masa-simpan',
    category: 'Penyimpanan & Mutu',
    question: 'Berapa lama masa simpan produk dan bagaimana cara menyimpannya?',
    answer:
      'Produk SiDeta memiliki masa simpan aktif hingga 12 bulan sejak botol dibuka. Cukup simpan di tempat yang sejuk dan kering pada suhu ruang, serta hindari paparan sinar matahari terik langsung. Karena merupakan produk enzim aktif tanpa pengawet kimia artifisial, aroma segar citrus alami akan tetap terjaga optimal.',
  },
  {
    id: 'garansi-pemesanan',
    category: 'Pemesanan & Garansi',
    question: 'Bagaimana ketentuan pemesanan dan garansi jika botol bocor atau rusak di jalan?',
    answer:
      'Setiap botol dikemas dengan segel ganda dan pelindung kardus tebal ramah lingkungan. Jika paket pesananmu mengalami kebocoran atau kerusakan akibat perjalanan ekspedisi, cukup kirimkan foto atau video singkat unboxing ke WhatsApp admin kami. Tim komunitas Jeruklegi akan langsung mengirimkan botol pengganti baru tanpa biaya tambahan.',
  },
];

// ─────────────────────────────────────────────────
// Contact Info (Footer)
// ─────────────────────────────────────────────────
export const SHOW_CONTACT = true;
export const DEFAULT_WHATSAPP_NUMBER = '6288802457102';

export const CONTACT_INFO = [
  {
    type: 'location',
    label: 'Lokasi',
    value: 'Desa Jeruklegi, Jawa Tengah',
    href: null,
    iconName: 'MapPin',
  },
  {
    type: 'email',
    label: 'Email',
    value: 'halo@ecoenzyme-jeruklegi.id',
    href: 'mailto:halo@ecoenzyme-jeruklegi.id',
    iconName: 'Mail',
  },
  {
    type: 'whatsapp',
    label: 'WhatsApp',
    value: '+62 888 0245 7102',
    href: 'https://wa.me/6288802457102',
    iconName: 'Phone',
  },
];
