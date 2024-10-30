import mysql from 'mysql2/promise';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); 
app.use(express.json()); 

// Fungsi untuk membuat koneksi ke database
let db;
async function connectDB() {
    try {
        db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'makan100kali', 
            database: 'gym_membership'
        });
        console.log("Connected to MySQL!");
    } catch (err) {
        console.error("Error connecting to MySQL:", err);
        process.exit(1);
    }
}


await connectDB();

// Endpoint untuk cek koneksi server
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Endpoint untuk menambahkan anggota baru
app.post('/create-members', async (req, res) => {
    const { name, email, membership_type, join_date } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO members (name, email, membership_type, join_date) VALUES (?, ?, ?, ?)',
            [name, email, membership_type, join_date]
        );
        res.json({
            message: "User created successfully",
            name,
            email,
            membership_type,
            join_date
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint untuk mendapatkan semua anggota
app.get('/members', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM members');
        const formattedResults = results.map(member => ({
            ...member,
            join_date: new Date(member.join_date).toISOString().split('T')[0] // Format tanggal
        }));
        res.json(formattedResults);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint untuk mendapatkan anggota berdasarkan ID
app.get('/members/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM members WHERE id = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Member tidak ditemukan / sudah mengundurkan diri' });
        }
        const formattedResult = {
            ...result[0],
            join_date: new Date(result[0].join_date).toISOString().split('T')[0]
        };

        res.json(formattedResult);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint untuk mengupdate data anggota
app.put('/members/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, membership_type, join_date } = req.body;
    try {
        await db.query(
            'UPDATE members SET name = ?, email = ?, membership_type = ?, join_date = ? WHERE id = ?',
            [name, email, membership_type, join_date, id]
        );
        res.json({ message: 'Member berhasil diperbarui' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint untuk menghapus anggota
app.delete('/members/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM members WHERE id = ?', [id]);
        res.json({ message: 'Member berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Menjalankan server
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/');
});
