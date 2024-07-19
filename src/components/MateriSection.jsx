// src/components/MateriSection.jsx
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MateriSection = ({ title, content, image, exampleCode, preview }) => {
  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md" data-aos="fade-up">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex flex-col md:flex-row">
        <img
          src={image}
          alt={title}
          className="w-full md:w-1/3 h-48 object-cover mb-4 md:mb-0 md:mr-4 rounded-lg"
        />
        <div className="flex-1">
          <p className="text-gray-700 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
      {/* Contoh Kode */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Contoh Kode</h3>
        <SyntaxHighlighter language="html" style={solarizedlight}>
          {exampleCode}
        </SyntaxHighlighter>
      </div>
      {/* Preview */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Preview</h3>
        <iframe
          title={title}
          srcDoc={preview}
          className="w-full h-60 border rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default MateriSection;
