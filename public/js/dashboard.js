document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Not logged in? Redirect to login page
        window.location.href = '/login';
        return;
    }

    try {
        // Fetch user profile from backend using the token
        const response = await fetch('/api/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Authentication failed');
        }

        // Display user info and show role-specific panels
        const roleText = document.getElementById('userRoleText');
        const adminView = document.getElementById('adminView');
        const stylistView = document.getElementById('stylistView');

        roleText.textContent = `Logged in as: ${data.email} (${data.role.toUpperCase()})`;

        if (data.role === 'admin') {
            adminView.style.display = 'block';
        } else if (data.role === 'stylist') {
            stylistView.style.display = 'block';
        } else {
            roleText.textContent += ' — Access restricted to Admins and Stylists.';
        }

    } catch (err) {
        console.error('Dashboard error:', err);
        localStorage.removeItem('token');
    }

    // Handle Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    });
});