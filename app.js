const express = require('express');
const bodyparser = require("body-parser");
const path = require('path');
const { connectToDatabase } = require('./public/database'); // Sesuaikan dengan path file database.js

const app = express(); // Inisialisasi aplikasi Express

// Middleware untuk menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk mengizinkan parsing data JSON dari body permintaan
app.use(express.json());

// Rute untuk menangani pembelian
app.post('/order', async (req, res) => {
  const { username, package, orderInfo } = req.body;
  try {

    // Membuat koneksi ke MongoDB
    const { client, ordersCollection } = await connectToDatabase();

    // Menyimpan data pembelian ke koleksi

    const result = await ordersCollection.insertOne({
      username,
      package,
      orderInfo,
    });

    // Menutup koneksi ke MongoDB
    await client.close();

    // Mengirim respons ke klien
    res.status(201).json({ status: 'success', message: 'Pembelian berhasil', orderID: result.insertedId });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan dalam pembelian' });
  }
  
});

app.get('/order', (req, res) => {
  res.render("order", {
    username: req.query.username || '',
    package: req.query.package || '',
    orderInfo: req.query.orderInfo || '',
  })
});

app.post('/post-feedback', (req, res) => {
  const { nama, email, telepon, pesan } = req.body;

  if (!nama) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Nama wajib diisi' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Format email tidak valid' });
  }

  if (!validateTelepon(telepon)) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Format telepon tidak valid' });
  }

  if (!pesan || pesan.length < 50) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Pesan wajib diisi minimal 20 karakter' });
  }

  const newFeedback = { nama, email, telepon, pesan };
  feedbacks.push(newFeedback);

  res.status(201).json({ 
    status: 'success', 
    message: 'Feedback berhasil diposting', 
    feedback: newFeedback });
});


// Menangani rute untuk halaman HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Menangani rute untuk halaman pembelian
app.get('/pembelian', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'pembelian.html'));
});


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

