import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import aos from 'aos';

const Courses = () => {
  useEffect(() => {
    aos.init({ duration: 1000 });
  }, []);

  const courses = [
    {
      title: 'HTML untuk Pemula',
      description: 'Pelajari dasar-dasar HTML dan bagaimana membangun struktur halaman web yang solid.',
      image: 'https://i.pinimg.com/736x/ef/9d/75/ef9d75a47e953e9222bbac1e5b20a553.jpg',
    },
    {
      title: 'CSS untuk Pemula',
      description: 'Pelajari cara menggunakan CSS untuk menambahkan gaya pada halaman web Anda.',
      image: 'https://i.pinimg.com/736x/96/d0/25/96d02512767883fb4130a494ef925e5b.jpg',
    },
    {
      title: 'JavaScript Dasar',
      description: 'Pelajari dasar-dasar JavaScript dan bagaimana menambahkan interaktivitas pada halaman web.',
      image: 'https://i.pinimg.com/736x/99/67/67/996767afa98576dc7e4ab0419984911f.jpg',
    },
    {
      title: 'React.js Lanjutan',
      description: 'Pelajari teknik-teknik lanjutan dalam React, termasuk hooks dan context API.',
      image: 'https://i.pinimg.com/736x/84/6f/8a/846f8a2a9e158499f9c5b51ff4f7fd47.jpg',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center" data-aos="fade-up">Kursus Kami</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="p-6 rounded-lg shadow-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            data-aos="fade-up"
          >
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-bold mb-2">{course.title}</h2>
            <p className="text-sm">{course.description}</p>
            <button className="mt-4 px-4 py-2 bg-white text-gray-800 font-semibold rounded-md hover:bg-gray-200">
              Pelajari Selengkapnya
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
