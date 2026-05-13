(async () => {
  try {
    console.log('Registering user...');
    const userRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User ' + Date.now(),
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      })
    });
    const userData = await userRes.json();
    const token = userData.token;
    console.log('User registered. Token:', token.substring(0, 10) + '...');

    console.log('Adding site...');
    const siteRes = await fetch('http://localhost:5000/api/sites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ url: 'https://example.com' })
    });
    const siteData = await siteRes.json();
    console.log('Site added:', siteData);
  } catch (error) {
    console.error('Error:', error);
  }
})();
