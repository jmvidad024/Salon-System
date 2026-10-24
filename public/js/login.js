document.getElementById('loginForm').addEventListener('submit', async(e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const message = document.getElementById('message')

    try{
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const data = await response.json()
        if(response.ok){
            message.style.color = 'green'
            message.textContent = 'Login successful'
            localStorage.setItem('token', data.token)
            window.location.href = '/dashboard'
        }else{
            message.style.color = 'red'
            message.textContent = data.error || 'Login failed'
        }
    }catch(error){
        console.error(error)
        message.style.color = 'red'
        message.textContent = 'An error occured. Server might be down'
    }
})