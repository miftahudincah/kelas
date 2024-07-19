import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import aos from 'aos';

const Home = () => {
  useEffect(() => {
    aos.init({ duration: 1000 });
  }, []);

  const cards = [
    { 
      title: 'Pelajari Teknik HTML', 
      description: 'Mulai dari dasar hingga mahir dengan tutorial praktis dan latihan interaktif.',
      image: 'https://i.pinimg.com/736x/ef/9d/75/ef9d75a47e953e9222bbac1e5b20a553.jpg' 
    },
    { 
      title: 'Pengenalan CSS Modern', 
      description: 'Pelajari trend terbaru dalam desain web dengan efek-efek CSS modern.',
      image: 'https://i.pinimg.com/736x/96/d0/25/96d02512767883fb4130a494ef925e5b.jpg' 
    },
    { 
      title: 'React.js: Beyond the Basics', 
      description: 'Pelajari React Hooks, Context API, dan teknik-teknik canggih dalam pengembangan React.',
      image: 'https://i.pinimg.com/736x/99/67/67/996767afa98576dc7e4ab0419984911f.jpg' 
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mt-8 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJFVG01EJJujDe-_agHTKtdiHnHm5sqYAXjw&s"
            alt="Promosi Alat Trainer SMK"
            className="w-48 h-48 object-cover rounded-lg md:mr-8 mb-4 md:mb-0"
          />
          <div>
            <h2 className="text-2xl font-bold mb-4">Penjualan Alat Trainer SMK</h2>
            <p className="mb-4">Temukan alat-alat pelatihan terbaik untuk SMK dengan kualitas terjamin. Diskon khusus untuk pembelian bulk!</p>
            <button className="px-4 py-2 bg-white text-green-600 font-semibold rounded-md hover:bg-gray-200">
              Lihat Produk
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-4 px-6 mb-6 rounded-md shadow-lg" data-aos="fade-up">
        <h2 className="text-xl font-bold">Bergabunglah Sekarang!</h2>
        <p className="mt-2">Daftar sekarang dan dapatkan uji coba gratis untuk semua kursus kami.</p>
        <button className="mt-4 px-4 py-2 bg-white text-gray-800 font-semibold rounded-md hover:bg-gray-200">
          Daftar Sekarang
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg text-white bg-gradient-to-r 
              ${index === 0 ? 'from-green-500 via-green-600 to-green-700' :
               index === 1 ? 'from-blue-500 via-blue-600 to-blue-700' :
               'from-yellow-500 via-yellow-600 to-yellow-700'}`}
            data-aos="fade-up"
          >
            <img src={card.image} alt={card.title} className="w-full h-64 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
            <p className="text-sm">{card.description}</p>
            <button className="mt-4 px-4 py-2 bg-white text-gray-800 font-semibold rounded-md hover:bg-gray-200">
              Selengkapnya
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg shadow-md text-white" data-aos="fade-up">
          <h2 className="text-xl font-bold mb-4">Fasilitas Kami</h2>
          <ul className="list-disc list-inside">
            <li>Ruang kelas yang nyaman dan dilengkapi dengan teknologi terkini.</li>
            <li>Akses ke materi pembelajaran online sepanjang waktu.</li>
            <li>Bimbingan langsung dari instruktur berpengalaman.</li>
          </ul>
        </div>
        <div className="p-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-md text-white" data-aos="fade-up">
          <h2 className="text-xl font-bold mb-4">Jadwal</h2>
          <p>Kami menyediakan jadwal fleksibel untuk memenuhi kebutuhan belajar Anda.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
