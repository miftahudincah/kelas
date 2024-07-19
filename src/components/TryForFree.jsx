import React from 'react';
import { materiSections } from '../data/materiData';
import MateriSection from './MateriSection';

const TryForFree = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Mulai Belajar HTML</h1>
      {materiSections.map((section, index) => (
        <MateriSection
          key={index}
          title={section.title}
          content={section.content}
          image={section.image}
          exampleCode={section.exampleCode}
          preview={section.preview}
          backgroundColor={`bg-gray-${200 + (index % 5) * 100}`} // Vary background colors
        />
      ))}
      
      <div className="flex justify-center mt-8">
        <a
          href="https://example.com/ujian"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
        >
          Mulai Ujian
        </a>
      </div>
    </div>
  );
};

export default TryForFree;
