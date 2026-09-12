/**
 * Static Data Layer for Eco-Enzyme Landing Page
 * Following clean architecture guidelines from .agentrules and architecture-and-copy.md
 */

export const EDUCATION_STEPS = [
  {
    step: 1,
    title: 'Limbah Organik',
    description: 'Mengumpulkan sisa sayur dan buah dari dapur warga.',
    iconName: 'Apple',
  },
  {
    step: 2,
    title: 'Inovasi Proses',
    description: 'Fermentasi alami tanpa bahan kimia berbahaya.',
    iconName: 'FlaskConical',
  },
  {
    step: 3,
    title: 'Produk Bernilai',
    description: 'Diolah menjadi sabun dan pembersih higienis.',
    iconName: 'Sparkles',
  },
  {
    step: 4,
    title: 'Lingkungan Lestari',
    description: 'Mengurangi tumpukan sampah di tempat pembuangan akhir.',
    iconName: 'Leaf',
  },
];

export const PRODUCTS = [
  {
    id: 'sabun-batang',
    name: 'Sabun Batang',
    description: 'Lembut di kulit, wangi alami.',
    badge: 'Favorit Keluarga',
    whatsappUrl: 'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Sabun%20Batang%20Eco-Enzyme.',
  },
  {
    id: 'pembersih-lantai',
    name: 'Pembersih Lantai',
    description: 'Efektif hilangkan noda, lantai kesat.',
    badge: 'Higienis Alami',
    whatsappUrl: 'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Pembersih%20Lantai%20Eco-Enzyme.',
  },
  {
    id: 'pembersih-kaca',
    name: 'Pembersih Kaca',
    description: 'Kaca bening tanpa residu kimia.',
    badge: 'Bebas Noda',
    whatsappUrl: 'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Pembersih%20Kaca%20Eco-Enzyme.',
  },
  {
    id: 'pembersih-kamar-mandi',
    name: 'Pembersih Kamar Mandi',
    description: 'Angkat kerak dengan kekuatan enzim alami.',
    badge: 'Aksi Tangguh',
    whatsappUrl: 'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Pembersih%20Kamar%20Mandi%20Eco-Enzyme.',
  },
];

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
