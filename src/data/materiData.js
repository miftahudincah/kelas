export const materiSections = [
    {
      title: 'Pengantar HTML',
      content: `
        <p>HTML (HyperText Markup Language) adalah bahasa markup standar yang digunakan untuk membuat dan mendesain halaman web. HTML memungkinkan Anda untuk mengatur dan memformat teks, gambar, dan elemen lainnya pada halaman web. Dengan HTML, Anda dapat membuat struktur dasar dari sebuah halaman web yang terdiri dari elemen-elemen seperti header, paragraf, tautan, gambar, dan banyak lagi.</p>
        <p>HTML mudah dipelajari dan merupakan dasar dari semua teknologi web.</p>
      `,
      image: 'https://i.pinimg.com/736x/ef/9d/75/ef9d75a47e953e9222bbac1e5b20a553.jpg',
      exampleCode: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <h1>Hello, World!</h1>
        <p>This is a simple HTML document.</p>
      </body>
      </html>
      `,
      preview: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <h1>Hello, World!</h1>
        <p>This is a simple HTML document.</p>
      </body>
      </html>`,
      bgClass: 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
    },
    {
      title: 'Elemen Dasar HTML',
      content: `
        <p>Elemen HTML terdiri dari tag pembuka dan penutup, dan kadang-kadang berisi teks atau elemen lainnya di dalamnya. Beberapa elemen dasar HTML yang sering digunakan termasuk:</p>
        <ul>
          <li><code>&lt;h1&gt; hingga &lt;h6&gt;</code> untuk membuat judul dengan berbagai ukuran.</li>
          <li><code>&lt;p&gt;</code> untuk membuat paragraf teks.</li>
          <li><code>&lt;a&gt;</code> untuk membuat tautan ke halaman lain atau bagian lain dari halaman yang sama.</li>
          <li><code>&lt;img&gt;</code> untuk menampilkan gambar.</li>
          <li><code>&lt;ul&gt; dan &lt;li&gt;</code> untuk membuat daftar tidak berurutan.</li>
          <li><code>&lt;ol&gt; dan &lt;li&gt;</code> untuk membuat daftar berurutan.</li>
        </ul>
      `,
      image: 'https://i.pinimg.com/736x/96/d0/25/96d02512767883fb4130a494ef925e5b.jpg',
      exampleCode: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTML Elements</title>
      </head>
      <body>
        <h1>Judul Utama</h1>
        <p>Ini adalah paragraf teks.</p>
        <a href="https://example.com">Tautan ke halaman lain</a>
        <img src="https://via.placeholder.com/150" alt="Placeholder Image">
        <ul>
          <li>Item Daftar 1</li>
          <li>Item Daftar 2</li>
        </ul>
        <ol>
          <li>Item Daftar Berurutan 1</li>
          <li>Item Daftar Berurutan 2</li>
        </ol>
      </body>
      </html>
      `,
      preview: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTML Elements</title>
      </head>
      <body>
        <h1>Judul Utama</h1>
        <p>Ini adalah paragraf teks.</p>
        <a href="https://example.com">Tautan ke halaman lain</a>
        <img src="https://via.placeholder.com/150" alt="Placeholder Image">
        <ul>
          <li>Item Daftar 1</li>
          <li>Item Daftar 2</li>
        </ul>
        <ol>
          <li>Item Daftar Berurutan 1</li>
          <li>Item Daftar Berurutan 2</li>
        </ol>
      </body>
      </html>`,
      bgClass: 'bg-gradient-to-r from-red-400 to-yellow-500 text-white'
    },
    {
      title: 'Atribut HTML',
      content: `
        <p>Atribut HTML adalah informasi tambahan yang dapat ditambahkan ke elemen HTML untuk memberikan lebih banyak kontrol atau informasi tentang elemen tersebut. Beberapa atribut umum meliputi:</p>
        <ul>
          <li><code>href</code>: digunakan dalam tag <code>&lt;a&gt;</code> untuk menentukan URL dari tautan.</li>
          <li><code>src</code>: digunakan dalam tag <code>&lt;img&gt;</code> untuk menentukan sumber gambar.</li>
          <li><code>alt</code>: digunakan dalam tag <code>&lt;img&gt;</code> untuk memberikan teks alternatif untuk gambar.</li>
          <li><code>title</code>: memberikan informasi tambahan tentang elemen dalam bentuk tooltip yang muncul saat pengguna mengarahkan kursor ke elemen.</li>
          <li><code>class</code> dan <code>id</code>: digunakan untuk memberikan nama unik atau kelas pada elemen, yang dapat digunakan untuk mengatur gaya dengan CSS atau memanipulasi elemen dengan JavaScript.</li>
        </ul>
      `,
      image: 'https://i.pinimg.com/736x/99/67/67/996767afa98576dc7e4ab0419984911f.jpg',
      exampleCode: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTML Attributes</title>
      </head>
      <body>
        <a href="https://example.com" title="Go to Example">Contoh Tautan</a>
        <img src="https://via.placeholder.com/150" alt="Placeholder Image" />
        <div id="uniqueId" class="my-class">Hello, World!</div>
      </body>
      </html>
      `,
      preview: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTML Attributes</title>
      </head>
      <body>
        <a href="https://example.com" title="Go to Example">Contoh Tautan</a>
        <img src="https://via.placeholder.com/150" alt="Placeholder Image" />
        <div id="uniqueId" class="my-class">Hello, World!</div>
      </body>
      </html>`,
      bgClass: 'bg-gradient-to-r from-purple-400 to-pink-500 text-white'
    },
    {
      title: 'Membuat Formulir HTML',
      content: `
        <p>Formulir HTML memungkinkan pengguna untuk memasukkan data yang dapat dikirim ke server untuk diproses. Elemen formulir termasuk:</p>
        <ul>
          <li><code>&lt;form&gt;</code>: elemen kontainer untuk seluruh formulir.</li>
          <li><code>&lt;input&gt;</code>: elemen untuk berbagai jenis input, seperti teks, email, atau password.</li>
          <li><code>&lt;textarea&gt;</code>: elemen untuk input teks multiline.</li>
          <li><code>&lt;button&gt;</code>: elemen tombol untuk mengirim formulir atau tindakan lainnya.</li>
          <li><code>&lt;select&gt;</code>: elemen dropdown untuk memilih satu atau beberapa opsi.</li>
        </ul>
      `,
      image: 'https://i.pinimg.com/736x/7e/84/6b/7e846bdebd08a2837f7a589f28e91b73.jpg',
      exampleCode: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTML Form</title>
      </head>
      <body>
        <form action="/submit" method="post">
          <label for="name">Nama:</label>
          <input type="text" id="name" name="name" required>
          <br>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
          <br>
          <label for="message">Pesan:</label>
          <textarea id="message" name="message"></textarea>
          <br>
          <button type="submit">Kirim</button>
        </form>
      </body>
      </html>
      `,
      preview: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTML Form</title>
      </head>
      <body>
        <form action="/submit" method="post">
          <label for="name">Nama:</label>
          <input type="text" id="name" name="name" required>
          <br>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
          <br>
          <label for="message">Pesan:</label>
          <textarea id="message" name="message"></textarea>
          <br>
          <button type="submit">Kirim</button>
        </form>
      </body>
      </html>`,
      bgClass: 'bg-gradient-to-r from-teal-400 to-cyan-500 text-white'
    },
  ];
  