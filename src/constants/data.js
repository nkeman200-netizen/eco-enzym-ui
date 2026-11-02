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
  {
    id: 'sabun-cuci-piring',
    name: 'Sabun Cuci Piring',
    description: 'Ampuh rontokkan minyak & bau amis tanpa rasa panas di tangan.',
    benefit: 'Aman untuk botol susu bayi dan peralatan makan anak-anak.',
    detail: 'Diformulasikan khusus untuk dapur sehat dengan bio-enzim nanas pemecah protein lemak, saponin alami buah lerak, dan ekstrak jeruk nipis segar. Menghasilkan busa lembut mudah bilas tanpa residu licin kimia atau bau sabun pada piring dan gelas. Mengandung gliserin nabati alami menjaga telapak tangan tetap lembut dan tidak kering mengelupas.',
    price: 'Rp 18.000',
    images: [
      '/images/products/sabun-cuci-piring-1.webp',
      '/images/products/sabun-cuci-piring-2.webp',
      '/images/products/sabun-cuci-piring-3.webp',
    ],
    specs: {
      netto: '450 ml',
      packaging: 'Botol Tutup Flip-top Anti-Bocor',
      suitability: 'Peralatan Makan, Panci, Wajan Antilengket, Botol Susu Bayi, & Wadah Silikon',
      stock: 'Tersedia (Ready Stock)',
      certification: 'Food-Grade Contact Safe & 100% Biodegradable',
      ingredients: 'Enzim fermentasi nanas & jeruk nipis, saponin lerak murni, gliserin kelapa, minyak atsiri jeruk pekat',
      usage: 'Teteskan secukupnya pada spons basah, remas hingga berbusa, usapkan ke peralatan makan, lalu bilas dengan air mengalir hingga kesat.',
    },
    whatsappUrl:
      'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Sabun%20Cuci%20Piring%20Eco-Enzyme.',
  },
  {
    id: 'deterjen-cair',
    name: 'Deterjen Cair Pakaian',
    description: 'Bersihkan noda keringat & pakaian terdalam tanpa pudarkan warna.',
    benefit: 'Pakaian wangi segar tanpa bau apek jemur di dalam ruangan.',
    detail: 'Inovasi deterjen pakaian ramah keluarga yang memanfaatkan sinergi enzim protease dan amilase alami eco-enzyme untuk mendegradasi noda darah, keringat, dan saus langsung dari serat kain. Tanpa fosfat yang mencemari sungai dan tanpa pemutih sintetis keras. Busa terkontrol aman untuk mesin cuci front load, top load, maupun cuci tangan. Sangat cocok untuk pakaian bayi dan kulit sensitif.',
    price: 'Rp 35.000',
    images: [
      '/images/products/deterjen-cair-1.webp',
      '/images/products/deterjen-cair-2.webp',
      '/images/products/deterjen-cair-3.webp',
    ],
    specs: {
      netto: '1000 ml',
      packaging: 'Jerigen Botol HDPE dengan Tutup Takar Ergonomis',
      suitability: 'Pakaian Bayi, Katun, Linen, Sutra, Wol, & Pakaian Olahraga (Dri-fit)',
      stock: 'Tersedia (Ready Stock)',
      certification: 'Hipoalergenik, Bebas Fosfat & Pemutih Klorin',
      ingredients: 'Bio-enzim multi-aktif eco-enzyme, saponin nabati, surfaktan non-ionik kelapa sawit lestari, minyak atsiri lavender',
      usage: 'Gunakan 30–40 ml (1 tutup botol) untuk 5–7 kg cucian pakaian. Tuang langsung ke laci deterjen mesin cuci atau ember cuci manual.',
    },
    whatsappUrl:
      'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Deterjen%20Cair%20Pakaian%20Eco-Enzyme.',
  },
  {
    id: 'sabun-cuci-tangan',
    name: 'Sabun Cuci Tangan Busa',
    description: 'Busa mikro instan selembut awan dengan proteksi antibakteri buah.',
    benefit: 'Tangan bersih higienis tanpa rasa kering walau sering cuci tangan.',
    detail: 'Sabun cuci tangan instan dengan botol pompa pembuat busa (foaming pump) yang mengubah cairan enzim menjadi jutaan gelembung busa lembut dalam satu kali tekan. Menjadikan rutinitas cuci tangan menyenangkan bagi si kecil. Diperkaya bio-asam organik eco-enzyme yang menonaktifkan kuman secara alami tanpa triclosan atau alkohol, serta aloe vera untuk kelembapan ekstra.',
    price: 'Rp 22.000',
    images: [
      '/images/products/sabun-cuci-tangan-1.webp',
      '/images/products/sabun-cuci-tangan-2.webp',
      '/images/products/sabun-cuci-tangan-3.webp',
    ],
    specs: {
      netto: '250 ml',
      packaging: 'Botol Pompa Busa Ergonomis (Reusable Foaming Pump)',
      suitability: 'Wastafel Dapur, Kamar Mandi, Ruang Makan, & Meja Kasir',
      stock: 'Tersedia (Ready Stock)',
      certification: 'Hipoalergenik, Antibakteri Alami Non-Triclosan',
      ingredients: 'Filtrat eco-enzyme murni, saponin lerak cair, sari lidah buaya organik (Aloe Vera), minyak atsiri tea tree & sweet orange',
      usage: 'Tekan pompa 1 kali untuk mengeluarkan busa kaya pada telapak tangan basah, gosok sela-sela jari selama 20 detik, lalu bilas bersih.',
    },
    whatsappUrl:
      'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Sabun%20Cuci%20Tangan%20Busa%20Eco-Enzyme.',
  },
  {
    id: 'nutrisi-tanaman',
    name: 'Nutrisi & Bio-Pestisida Tanaman',
    description: 'Semprotan siap pakai penyubur daun dan pengusir hama kutu daun.',
    benefit: 'Tanaman rimbun hijau segar tanpa pestisida kimia — pet safe.',
    detail: 'Formula bio-nutrisi tanaman 2-in-1 siap semprot yang menggabungkan hormon pertumbuhan alami auksin & sitokinin dari fermentasi eco-enzyme buah dengan asam asetat pengusir hama. Merangsang tunas baru, menguatkan akar, dan mengusir kutu putih maupun semut secara biologis tanpa meracuni hewan peliharaan di rumah.',
    price: 'Rp 20.000',
    images: [
      '/images/products/nutrisi-tanaman-1.webp',
      '/images/products/nutrisi-tanaman-2.webp',
      '/images/products/nutrisi-tanaman-3.webp',
    ],
    specs: {
      netto: '500 ml',
      packaging: 'Botol Trigger Spray Mist Halus Anti-Mampet',
      suitability: 'Tanaman Hias Daun (Indoor/Outdoor), Tanaman Bunga, Sayur Pekarangan, & Kebun Buah',
      stock: 'Tersedia (Ready Stock)',
      certification: '100% Organik & Aman Hewan Peliharaan (Pet-Safe)',
      ingredients: 'Cairan fermentasi eco-enzyme matang mikro-terfiltrasi, asam amino organik tanaman, kalium nabati, ekstrak daun mimba alami',
      usage: 'Kocok perlahan, semprotkan kabut halus ke permukaan atas dan bawah daun serta media tanam 1–2 kali seminggu pada pagi hari.',
    },
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

