import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import aos from 'aos';

const HTMLForBeginners = () => {
  useEffect(() => {
    aos.init({ duration: 1000 });
  }, []);

  const sections = [
    {
      title: 'Pengantar HTML',
      content: 'HTML (HyperText Markup Language) adalah bahasa markup standar yang digunakan untuk membuat dan mendesain halaman web. HTML memungkinkan Anda untuk mengatur dan memformat teks, gambar, dan elemen lainnya pada halaman web. Dengan HTML, Anda dapat membuat struktur dasar dari sebuah halaman web yang terdiri dari elemen-elemen seperti header, paragraf, tautan, gambar, dan banyak lagi. HTML mudah dipelajari dan merupakan dasar dari semua teknologi web.',
      image: 'https://i.pinimg.com/736x/ef/9d/75/ef9d75a47e953e9222bbac1e5b20a553.jpg',
    },
    {
      title: 'Elemen Dasar HTML',
      content: 'Elemen HTML terdiri dari tag pembuka dan penutup, dan kadang-kadang berisi teks atau elemen lainnya di dalamnya. Beberapa elemen dasar HTML yang sering digunakan termasuk:\n\n- <h1> hingga <h6> untuk membuat judul dengan berbagai ukuran.\n- <p> untuk membuat paragraf teks.\n- <a> untuk membuat tautan ke halaman lain atau bagian lain dari halaman yang sama.\n- <img> untuk menampilkan gambar.\n- <ul> dan <li> untuk membuat daftar tidak berurutan.\n- <ol> dan <li> untuk membuat daftar berurutan.\n\nElemen-elemen ini membantu Anda membuat dan mengatur konten pada halaman web dengan mudah.',
      image: 'https://i.pinimg.com/736x/96/d0/25/96d02512767883fb4130a494ef925e5b.jpg',
    },
    {
      title: 'Atribut HTML',
      content: 'Atribut HTML adalah informasi tambahan yang dapat ditambahkan ke elemen HTML untuk memberikan lebih banyak kontrol atau informasi tentang elemen tersebut. Beberapa atribut umum meliputi:\n\n- href: digunakan dalam tag <a> untuk menentukan URL dari tautan.\n- src: digunakan dalam tag <img> untuk menentukan sumber gambar.\n- alt: digunakan dalam tag <img> untuk memberikan teks alternatif untuk gambar.\n- title: memberikan informasi tambahan tentang elemen dalam bentuk tooltip yang muncul saat pengguna mengarahkan kursor ke elemen.\n- class dan id: digunakan untuk memberikan nama unik atau kelas pada elemen, yang dapat digunakan untuk mengatur gaya dengan CSS atau memanipulasi elemen dengan JavaScript.\n\nAtribut memberikan fleksibilitas lebih dalam membuat dan mengatur halaman web.',
      image: 'https://i.pinimg.com/736x/99/67/67/996767afa98576dc7e4ab0419984911f.jpg',
    },
    {
      title: 'Membuat Formulir HTML',
      content: 'Formulir HTML memungkinkan pengguna untuk memasukkan data yang dapat dikirim ke server untuk diproses. Elemen formulir termasuk:\n\n- <form>: elemen pembungkus untuk semua elemen formulir.\n- <input>: elemen untuk input teks, password, checkbox, radio button, dll.\n- <textarea>: elemen untuk input teks yang lebih panjang.\n- <button>: elemen untuk membuat tombol yang dapat diklik.\n- <select> dan <option>: elemen untuk membuat dropdown menu.\n\nFormulir adalah komponen penting dalam interaksi pengguna dengan aplikasi web, memungkinkan pengguna untuk mengirim data dan berinteraksi dengan server.',
      image: 'https://i.pinimg.com/736x/84/6f/8a/846f8a2a9e158499f9c5b51ff4f7fd47.jpg',
    },
    {
      title: 'Penggunaan CSS dengan HTML',
      content: 'CSS (Cascading Style Sheets) digunakan untuk menambahkan gaya pada elemen HTML. Dengan CSS, Anda dapat mengatur warna, font, layout, dan banyak aspek visual lainnya dari halaman web Anda. Beberapa cara untuk menambahkan CSS ke HTML meliputi:\n\n- Inline CSS: menambahkan gaya langsung pada elemen HTML dengan atribut style.\n- Internal CSS: menambahkan gaya dalam tag <style> di dalam <head> dari dokumen HTML.\n- External CSS: menambahkan gaya dengan menghubungkan file CSS eksternal menggunakan tag <link>.\n\nMenggunakan CSS dengan HTML membantu Anda menciptakan halaman web yang menarik dan fungsional.',
      image: 'https://i.pinimg.com/736x/27/8e/5f/278e5f6d7852eac5d64f4ff6a10c36de.jpg',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center" data-aos="fade-up">HTML untuk Pemula</h1>
      {sections.map((section, index) => (
        <div key={index} className="mb-8 p-6 bg-white rounded-lg shadow-md" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
          <div className="flex flex-col md:flex-row">
            <img src={section.image} alt={section.title} className="w-full md:w-1/3 h-48 object-cover mb-4 md:mb-0 md:mr-4 rounded-lg" />
            <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
          </div>
        </div>
      ))}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg shadow-lg text-center" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-4">Mulai Belajar HTML Sekarang!</h2>
        <p className="mb-4">Daftar sekarang dan dapatkan akses gratis ke kursus HTML kami yang lengkap dengan contoh-contoh praktis dan latihan interaktif.</p>
        <button className="px-4 py-2 bg-white text-blue-700 font-semibold rounded-md hover:bg-gray-200">
          try for free
        </button>
      </div>
    </div>
  );
};

export default HTMLForBeginners;
