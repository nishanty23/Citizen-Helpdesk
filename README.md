# Citizen Grievance Redressal System with Feedback

A web-based application built using **Node.js**, **JavaScript**, and **PostgreSQL** that allows citizens to file grievances, track their status, and submit feedback after resolution. This project aims to provide a transparent and streamlined redressal mechanism for public service complaints.

---

## 🚀 Features

- ✅ File grievances with name, contact, department, and issue description
- ✅ View a list of all submitted complaints
- ✅ Track the status of a complaint using its ID
- ✅ Submit feedback after resolution
- ✅ Admins can update complaint statuses (pending, in progress, resolved)
- ✅ Clean and intuitive user interface
- ✅ Backend powered by Express.js with PostgreSQL integration

---

## 📁 Folder Structure

Citizen-Grievance-Redressal-System/
├── db.js                   # Handles PostgreSQL database connection and queries
├── server.js               # Main Express server file with route handling
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Exact versions of installed packages
├── public/                 # Folder for static assets (if any)
│   ├── css/                # CSS files for styling (optional)
│   └── js/                 # Client-side JavaScript files (optional)
├── views/                  # HTML files rendered by Express routes
│   ├── index.html          # Home page
│   ├── file-complaint.html # Complaint form
│   ├── view.html           # View all complaints
│   ├── status.html         # Track complaint status
│   ├── feedback.html       # Submit feedback form
│   ├── about.html          # About page
│   ├── login.html          # (Placeholder) Login form
│   └── signup.html         # (Placeholder) Signup form


---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Runtime:** Node.js (v18+)

---

🛠️ How to Run Locally
Follow these steps to run the Citizen Grievance Redressal System with Feedback on your local machine:

1. Clone the Repository

git clone https://github.com/your-username/citizen-grievance-system.git
cd citizen-grievance-system

2. Install Dependencies
Make sure you have Node.js installed. Then, run:

npm install

3. Set Up the PostgreSQL Database
Open pgAdmin or your PostgreSQL terminal.

Create a new database (e.g., grievance_db).

Create a table for storing complaints and feedback (schema based on your db.js file).

Update the database credentials in db.js:

const client = new Client({
  user: 'your_username',
  host: 'localhost',
  database: 'grievance_db',
  password: 'your_password',
  port: 5432,
});

4. Start the Server

node server.js

5. Access the App
Open your browser and go to:

http://localhost:3000

🤝 Contributing
Contributions are welcome! Feel free to fork this repo, make improvements, and open a pull request.
