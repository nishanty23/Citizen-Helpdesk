document.addEventListener('DOMContentLoaded', () => {
    // --- Utility Function for Displaying Messages ---
    function displayMessage(container, text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        container.insertBefore(messageDiv, container.firstChild);
        setTimeout(() => {
            messageDiv.remove();
        }, 5000); // Remove message after 5 seconds
    }

    // --- Handle File Complaint Form Submission ---
    const complaintForm = document.getElementById('complaintForm');
    if (complaintForm) {
        complaintForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(complaintForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/file-complaint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                if (response.ok) {
                    displayMessage(complaintForm.parentNode, result.message, 'success');
                    complaintForm.reset();
                } else {
                    displayMessage(complaintForm.parentNode, result.error || 'Error filing complaint.', 'error');
                }
            } catch (error) {
                console.error('Error submitting complaint:', error);
                displayMessage(complaintForm.parentNode, 'Failed to submit complaint. Please try again later.', 'error');
            }
        });
    }

    // --- Handle View Complaints ---
    const complaintsListDiv = document.getElementById('complaintsList');
    if (complaintsListDiv) {
        fetch('/api/view-complaints')
            .then(response => response.json())
            .then(data => {
                if (data.complaints && data.complaints.length > 0) {
                    const table = document.createElement('table');
                    const thead = document.createElement('thead');
                    const tbody = document.createElement('tbody');
                    thead.innerHTML = `
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    `;
                    data.complaints.forEach(complaint => {
                        const row = tbody.insertRow();
                        row.innerHTML = `
                            <td>${complaint.id}</td>
                            <td>${complaint.user_name}</td>
                            <td>${complaint.email}</td>
                            <td>${complaint.category}</td>
                            <td>${complaint.status}</td>
                            <td><a href="/complaint-status.html?id=${complaint.id}" class="btn btn-sm btn-info">View Details</a></td>
                        `;
                    });
                    table.appendChild(thead);
                    table.appendChild(tbody);
                    complaintsListDiv.appendChild(table);
                } else {
                    complaintsListDiv.innerHTML = '<p class="text-center">No complaints found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching complaints:', error);
                complaintsListDiv.innerHTML = '<p class="text-center error">Failed to load complaints.</p>';
            });
    }

    // --- Handle Complaint Status Page ---
    const statusForm = document.getElementById('statusForm');
    const complaintDetailsDiv = document.getElementById('complaintDetails');
    if (statusForm && complaintDetailsDiv) {
        statusForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const complaintId = document.getElementById('id').value;
            complaintDetailsDiv.innerHTML = '<p class="text-center">Loading complaint details...</p>';

            try {
                const response = await fetch(`/api/view-complaints?id=${complaintId}`);
                const data = await response.json();
                if (data.complaints && data.complaints.length > 0) {
                    const complaint = data.complaints[0];
                    complaintDetailsDiv.innerHTML = `
                        <h3>Complaint Details</h3>
                        <p><strong>ID:</strong> ${complaint.id}</p>
                        <p><strong>Name:</strong> ${complaint.user_name}</p>
                        <p><strong>Email:</strong> ${complaint.email}</p>
                        <p><strong>Category:</strong> ${complaint.category}</p>
                        <p><strong>Description:</strong> ${complaint.description}</p>
                        <p><strong>Status:</strong> ${complaint.status}</p>
                    `;
                } else {
                    complaintDetailsDiv.innerHTML = '<p class="text-center error">Complaint not found.</p>';
                }
            } catch (error) {
                console.error('Error fetching complaint details:', error);
                complaintDetailsDiv.innerHTML = '<p class="text-center error">Failed to load complaint details.</p>';
            }
        });
    }

    // --- Handle Feedback Form Submission ---
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackMessageDiv = document.getElementById('feedbackMessage');
    if (feedbackForm && feedbackMessageDiv) {
        feedbackForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(feedbackForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // In a real application, you would send this data to a server endpoint
                console.log('Feedback submitted:', data);
                displayMessage(feedbackMessageDiv.parentNode, 'Thank you for your feedback!', 'success');
                feedbackForm.reset();
            } catch (error) {
                console.error('Error submitting feedback:', error);
                displayMessage(feedbackMessageDiv.parentNode, 'Failed to submit feedback. Please try again later.', 'error');
            }
        });
    }

    // --- Handle Login Form Submission ---
    const loginForm = document.getElementById('loginForm');
    const loginMessageDiv = document.getElementById('loginMessage');
    if (loginForm && loginMessageDiv) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // In a real application, you would send this data to a server for authentication
                console.log('Login attempt:', data);
                // Simulate successful login for now
                displayMessage(loginMessageDiv.parentNode, 'Login successful!', 'success');
                // Redirect in a real app: window.location.href = '/dashboard.html';
                loginForm.reset();
            } catch (error) {
                console.error('Login error:', error);
                displayMessage(loginMessageDiv.parentNode, 'Login failed. Please check your credentials.', 'error');
            }
        });
    }

    // --- Handle Signup Form Submission ---
    const signupForm = document.getElementById('signupForm');
    const signupMessageDiv = document.getElementById('signupMessage');
    if (signupForm && signupMessageDiv) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(signupForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // In a real application, you would send this data to a server for user creation
                console.log('Signup attempt:', data);
                displayMessage(signupMessageDiv.parentNode, 'Account created successfully! Please log in.', 'success');
                signupForm.reset();
                // Redirect in a real app: window.location.href = '/login.html';
            } catch (error) {
                console.error('Signup error:', error);
                displayMessage(signupMessageDiv.parentNode, 'Signup failed. Please try again.', 'error');
            }
        });
    }
});