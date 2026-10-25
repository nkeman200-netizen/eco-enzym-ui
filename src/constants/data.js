/**
 * Static Data Layer for Eco-Enzyme Landing Page
 * SB7 (StoryBrand 7) Framework — updated September 2026
 */

// ─────────────────────────────────────────────────
// SB7 Element 2 — Problem (3 Lapis Masalah)
// ─────────────────────────────────────────────────
export const PROBLEM_CARDS = [
  {
    id: 'external',
    title: 'Limbah yang Terus Menumpuk',
    description:
      'Sisa sayur, kulit buah, ampas dapur — setiap hari ada saja. Dan setiap hari kita buang begitu saja ke TPA, tanpa tahu apa jadinya nanti.',
    iconName: 'Trash2',
  },
  {
    id: 'internal',
    title: 'Rasa Bersalah yang Diam-diam Ada',
    description:
      'Kamu tahu produk kimia itu keras. Kamu ingin pilihan yang lebih aman untuk anak-anak. Tapi yang alami sering terasa mahal atau sulit dipercaya.',
    iconName: 'Heart',
  },
  {
    id: 'philosophical',
    title: 'Seharusnya Ada Cara yang Lebih Baik',
    description:
      'Tidak seharusnya memilih antara "bersih" dan "ramah lingkungan" jadi sesuatu yang sulit dijangkau. Setiap keluarga berhak atas keduanya.',
    iconName: 'Scale',
  },
];

// ─────────────────────────────────────────────────
// SB7 Element 3 — Guide / About (Proses Produksi)
// ─────────────────────────────────────────────────
export const EDUCATION_STEPS = [
  {
    step: 1,
    title: 'Limbah Organik',
    description:
      'Sisa sayur dan buah dari dapur warga dikumpulkan dengan teliti — tidak ada yang terbuang sia-sia.',
    iconName: 'Apple',
  },
  {
    step: 2,
    title: 'Inovasi Proses',
    description:
      'Fermentasi alami berlangsung tanpa bahan kimia, menjaga semua kebaikan enzim tetap aktif.',
    iconName: 'FlaskConical',
  },
  {
    step: 3,
    title: 'Produk Bernilai',
    description:
      'Diolah menjadi sabun batang dan pembersih higienis yang siap merawat rumahmu.',
    iconName: 'Sparkles',
  },
  {
    step: 4,
    title: 'Lingkungan Lestari',
    description:
      'Setiap pembelianmu mengurangi satu tumpukan limbah yang seharusnya berakhir di TPA.',
    iconName: 'Leaf',
  },
];

// ─────────────────────────────────────────────────
// SB7 Element 4 — Plan (3 Langkah Beli)
// ─────────────────────────────────────────────────
export const PLAN_STEPS = [
  {
    step: 1,
    title: 'Pilih Produkmu',
    description:
      'Lihat katalog kami dan pilih produk yang paling kamu butuhkan saat ini.',
    iconName: 'ShoppingBag',
  },
  {
    step: 2,
    title: 'Hubungi via WhatsApp',
    description:
      'Klik tombol pesan, dan tim kami akan merespons dalam waktu singkat.',
    iconName: 'MessageCircle',
  },
  {
    step: 3,
    title: 'Terima di Tanganmu',
    description:
      'Produk segar langsung dari dapur komunitas Jeruklegi, siap merawat rumahmu.',
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
    detail: 'Sabun batang alami berbahan dasar eco-enzyme fermentasi buah. Bebas SLS, paraben, dan bahan kimia sintetis keras. Menjaga kelembapan kulit alami dan ramah bagi lingkungan.',
    price: 'Rp 15.000',
    images: [
      '/images/products/sabun-batang-1.webp',
      '/images/products/sabun-batang-2.webp',
      '/images/products/sabun-batang-3.webp',
    ],
    specs: {
      netto: '100 gr',
      packaging: 'Kertas Kraft Daur Ulang (Zero Plastic)',
      shape: 'Batang Padat (Cetakan Bunga, Daun, & Hexagonal)',
      suitability: 'Semua Jenis Kulit (Termasuk Kulit Sensitif & Anak-anak)',
      stock: 'Tersedia (Ready Stock)',
      certification: '100% Organik & Biodegradable',
      ingredients: 'Fermentasi eco-enzyme kulit buah citrus, minyak kelapa murni, sari lerak alami',
      usage: 'Busakan dengan air pada telapak tangan atau spons, usapkan ke kulit tubuh/tangan, bilas hingga bersih.',
    },
    whatsappUrl:
      'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Sabun%20Batang%20Eco-Enzyme.',
  },
  {
    id: 'pembersih-lantai',
    name: 'Pembersih Lantai',
    description: 'Lantai kesat, bersih dari noda, bebas bau kimia menyengat.',
    benefit: 'Aman jika tersentuh anak-anak yang sedang merangkak.',
    detail: 'Cairan pembersih lantai konsentrat dengan enzim aktif yang melarutkan kotoran dan lemak tanpa meninggalkan residu licin atau beracun. Membuat lantai higienis dan harum segar.',
    price: 'Rp 25.000',
    images: [
      '/images/products/pembersih-lantai-1.webp',
      '/images/products/pembersih-lantai-2.webp',
      '/images/products/pembersih-lantai-3.webp',
    ],
    specs: {
      netto: '500 ml',
      packaging: 'Botol Daur Ulang Segel Aman',
      suitability: 'Lantai Keramik, Granit, Marmer, Vinil, & Parket Kayu',
      stock: 'Tersedia (Ready Stock)',
      certification: 'Formula Ramah Lingkungan (Standar PKRT Rumah Tangga)',
      ingredients: 'Ekstrak fermentasi eco-enzyme nanas & jeruk, air sulasi murni, minyak atsiri serai alami',
      usage: 'Larutkan 1 tutup botol ke dalam 3–5 liter air bersih untuk mengepel lantai tanpa perlu dibilas lagi.',
    },
    whatsappUrl:
      'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Pembersih%20Lantai%20Eco-Enzyme.',
  },
  {
    id: 'pembersih-kaca',
    name: 'Pembersih Kaca',
    description: 'Kaca bening tanpa residu dan lapisan kimia.',
    benefit: 'Cukup semprotkan, lap sekali — selesai.',
    detail: 'Formula pembersih kaca ramah lingkungan yang cepat menguap tanpa meninggalkan goresan kabur (streak-free). Efektif menghilangkan debu, sidik jari, dan noda cipratan air.',
    price: 'Rp 20.000',
    images: [
      '/images/products/pembersih-kaca-1.webp',
      '/images/products/pembersih-kaca-2.webp',
      '/images/products/pembersih-kaca-3.webp',
    ],
    specs: {
      netto: '250 ml',
      packaging: 'Botol Spray Ergonomis',
      suitability: 'Kaca Jendela, Cermin Rias, Meja Kaca, & Permukaan Akrilik',
      stock: 'Tersedia (Ready Stock)',
      certification: 'Bebas Amonia & Bahan Kimia Keras',
      ingredients: 'Cairan fermentasi eco-enzyme terfiltrasi mikro, asam asetat alami buah, minyak atsiri lemon',
      usage: 'Semprotkan secukupnya pada permukaan kaca dari jarak 15–20 cm, lalu usap dengan kain mikrofiber bersih.',
    },
    whatsappUrl:
      'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Pembersih%20Kaca%20Eco-Enzyme.',
  },
  {
    id: 'pembersih-kamar-mandi',
    name: 'Pembersih Kamar Mandi',
    description: 'Angkat kerak membandel dengan kekuatan enzim alami.',
    benefit: 'Tidak menyengat di hidung, tidak perlu masker.',
    detail: 'Pembersih sanitasi kuat berbahan asam organik alami hasil fermentasi eco-enzyme. Mampu mengikis endapan kerak air, sabun, dan lumut tanpa merusak nat keramik atau mengiritasi pernapasan.',
    price: 'Rp 25.000',
    images: [
      '/images/products/pembersih-kamar-mandi-1.webp',
      '/images/products/pembersih-kamar-mandi-2.webp',
      '/images/products/pembersih-kamar-mandi-3.webp',
    ],
    specs: {
      netto: '500 ml',
      packaging: 'Botol Tutup Fliptop Anti-Tumpah',
      suitability: 'Keramik Kamar Mandi, Kloset, Wastafel, & Nat Lantai',
      stock: 'Tersedia (Ready Stock)',
      certification: 'Asam Organik Fermentasi Aman Saluran Pembuangan',
      ingredients: 'Ekstrak fermentasi eco-enzyme pekat asam organik tinggi, minyak kelapa saponifikasi',
      usage: 'Tuangkan langsung pada kerak keramik/kloset, diamkan 5–10 menit agar enzim melunakkan kerak, sikat perlahan lalu bilas.',
    },
    whatsappUrl:
      'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Pembersih%20Kamar%20Mandi%20Eco-Enzyme.',
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
  //   avatarInitial: '[Inisial Nama]',
  // },
  {
    id: 'testimoni-1',
    name: 'Ibu Endang Rahayu',
    location: 'Cilacap',
    quote:
      'Aroma lantainya segar alami tanpa bikin pusing. Yang paling penting, anak balita saya aman merangkak di lantai tanpa khawatir residu zat kimia keras.',
    avatarInitial: 'ER',
  },
  {
    id: 'testimoni-2',
    name: 'Pak Bambang Sutrisno',
    location: 'Purwokerto',
    quote:
      'Pupuk cair organiknya sangat membantu menyuburkan aglaonema dan cabai di pekarangan. Tanaman jauh lebih hijau segar dan tanahnya tetap gembur.',
    avatarInitial: 'BS',
  },
  {
    id: 'testimoni-3',
    name: 'Siti Nurjanah',
    location: 'Jeruklegi Kulon',
    quote:
      'Senang sekali limbah kulit buah dapur warga tidak lagi menumpuk sia-sia di tempat sampah, tapi diolah menjadi produk pembersih bermanfaat.',
    avatarInitial: 'SN',
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
// Contact Info (Footer)
// ─────────────────────────────────────────────────
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

