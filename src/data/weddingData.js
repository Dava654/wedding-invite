// Semua data undangan terpusat di sini.
// Ganti nilai di bawah untuk mengkustomisasi undangan tanpa menyentuh komponen UI.

const weddingData = {
  groom: {
    name: "Mochamad Dava Dinata",
    shortName: "Dava",
    parents: "Putra dari Bapak Hendra Wijaya & Ibu Sari Wijaya",
    instagram: "@dava.dinata",
  },
  bride: {
    name: "Marsella Agustiani",
    shortName: "Sella",
    parents: "Putri dari Bapak Anton Kirana & Ibu Maya Kirana",
    instagram: "@marsella.agustiani",
  },

  weddingDate: "2026-12-12T08:00:00+07:00",
  weddingDateLabel: "12 Desember 2026",
  tagline: "Dua hati, satu langkah menuju selamanya.",

  akad: {
    title: "Akad Nikah",
    day: "Sabtu",
    date: "12 Desember 2026",
    time: "08.00 — 10.00 WIB",
    venue: "Gedung Serba Guna Cendana",
    address: "Jl. Cendana Raya No. 21, Jakarta Selatan",
  },
  reception: {
    title: "Resepsi",
    day: "Sabtu",
    date: "12 Desember 2026",
    time: "11.00 — 14.00 WIB",
    venue: "Gedung Serba Guna Cendana",
    address: "Jl. Cendana Raya No. 21, Jakarta Selatan",
  },

  mapsUrl: "https://maps.google.com/?q=Gedung+Serba+Guna+Cendana+Jakarta+Selatan",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Jakarta%20Selatan&t=&z=14&ie=UTF8&iwloc=&output=embed",

  music: {
    src: "/audio/wedding-song.mp3",
    title: "Canon in D Major — Romantic Piano",
  },

  // Ganti `src` dengan foto asli (letakkan file di /public/gallery).
  gallery: [
    { id: "g1", src: "/gallery/g1.svg", caption: "Lamaran" },
    { id: "g2", src: "/gallery/g2.svg", caption: "Prewedding" },
    { id: "g3", src: "/gallery/g3.svg", caption: "Sesi Taman" },
    { id: "g4", src: "/gallery/g4.svg", caption: "Sesi Senja" },
    { id: "g5", src: "/gallery/g5.svg", caption: "Bersama Keluarga" },
    { id: "g6", src: "/gallery/g6.svg", caption: "Kebersamaan" },
  ],

  gift: [
    {
      id: "bca",
      bank: "BCA",
      bankFullName: "Bank Central Asia",
      accountNumber: "1234567890",
      accountName: "Mochamad Dava Dinata",
      type: "Bank Transfer",
      color: "#00529C",
    },
    {
      id: "dana",
      bank: "DANA",
      bankFullName: "Dompet Digital DANA",
      accountNumber: "081234567890",
      accountName: "Mochamad Dava Dinata",
      type: "E-Wallet",
      color: "#118EEA",
    },
    {
      id: "gopay",
      bank: "GoPay",
      bankFullName: "Dompet Digital GoPay",
      accountNumber: "081234567890",
      accountName: "Marsella Agustiani",
      type: "E-Wallet",
      color: "#00AA13",
    },
  ],

  // Konfigurasi WhatsApp RSVP ke pengantin
  whatsappRsvp: {
    // Nomor WhatsApp tujuan pengantin (format: 628xxx tanpa tanda + atau spasi)
    phoneNumber: "6281234567890",
    attendingText:
      "InsyaAllah saya akan hadir di acara pernikahannya. Terima kasih atas undangan yang telah diberikan. Semoga acara pernikahannya berjalan lancar dan kedua mempelai selalu diberikan kebahagiaan serta keberkahan.",
    notAttendingText:
      "Mohon maaf saya belum bisa hadir di acara pernikahannya. Saya turut berbahagia atas pernikahan ini. Semoga kedua mempelai selalu diberikan kebahagiaan, keharmonisan, dan keberkahan dalam menjalani kehidupan bersama. Mohon maaf karena belum bisa hadir secara langsung.",
  },

  closingMessage:
    "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi kami berdua.",
};

export default weddingData;
