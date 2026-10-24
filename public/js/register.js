document.getElementById('registerForm').addEventListener('submit', async(e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const message = document.getElementById('message')

    try{
        console.log("This will run")
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({name, email, password})
        })
        console.log(response)
        const data = await response.json()
        console.log(data)
        if(response.ok){
            message.style.color = 'green'
            message.textContent = 'Registered successfully'
            localStorage.setItem('token', data.token)
            window.location.href = '/dashboard'
        }else{
            message.style.color = 'red'
            message.textContent = data.message || 'Registered failed'
        }
    }catch(error){
        console.error(error)
        message.style.color = 'red'
        message.textContent = 'An error occured. Server might be down'
    }
})