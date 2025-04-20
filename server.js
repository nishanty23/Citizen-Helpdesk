const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');

app.use(express.static('public'));
app.use(express.json());

// Serve HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));
app.get('/file-complaint.html', (req, res) => res.sendFile(path.join(__dirname, 'views/file-complaint.html')));
app.get('/view-complaints.html', (req, res) => res.sendFile(path.join(__dirname, 'views/view-complaints.html')));
app.get('/complaint-status.html', (req, res) => res.sendFile(path.join(__dirname, 'views/complaint-status.html')));
app.get('/feedback.html', (req, res) => res.sendFile(path.join(__dirname, 'views/feedback.html')));
app.get('/about.html', (req, res) => res.sendFile(path.join(__dirname, 'views/about.html')));
app.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, 'views/login.html')));
app.get('/signup.html', (req, res) => res.sendFile(path.join(__dirname, 'views/signup.html')));

// API Routes
app.post('/api/file-complaint', async (req, res) => {
    const { user_name, email, category, description } = req.body;
    if (!user_name || !email || !category || !description) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        await db.query('INSERT INTO complaints (user_name, email, category, description, status) VALUES ($1, $2, $3, $4, $5)', [user_name, email, category, description, 'Pending']);
        res.json({ message: 'Complaint filed successfully!' });
    } catch (err) {
        console.error('Error filing complaint:', err);
        res.status(500).json({ error: 'Error filing complaint' });
    }
});

app.get('/api/view-complaints', async (req, res) => {
    const { id } = req.query;
    try {
        const result = id
            ? await db.query('SELECT * FROM complaints WHERE id = $1', [id])
            : await db.query('SELECT * FROM complaints ORDER BY id DESC');
        res.json({ complaints: result.rows });
    } catch (err) {
        console.error('Error retrieving complaints:', err);
        res.status(500).json({ error: 'Error retrieving complaints' });
    }
});

// In a real application, you would have API endpoints for login and signup
// These are just placeholders for now
app.post('/api/login', (req, res) => {
    // Authentication logic would go here
    res.json({ message: 'Login API endpoint hit (authentication not implemented)' });
});

app.post('/api/signup', (req, res) => {
    // User creation logic would go here
    res.json({ message: 'Signup API endpoint hit (user creation not implemented)' });
});

// Start the server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));