document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Telefon raqamini tekshirish
    const phoneRegex = /^\+998\d{9}$/; 
    if (!phoneRegex.test(data.mobile)) {
        alert("Invalid phone number. Please use the format: +998901234567");
        return; 
    }

    try {
        // Form ma'lumotlarini yuborish
        const response = await fetch('https://send-gmail.up.railway.app/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        console.log(response.body);
        
        if (response.ok) {
            showMessage('Message sent successfully!');
            setTimeout(() => location.reload(), 2500); 
            window.scrollY = -5
        } else {
            showMessage('Failed to send the message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});


// 
function showMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    document.body.appendChild(messageElement);

    // Xabarni ko'rsatish
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 100); // Bir oz kutgach xabarni ko'rsatish

    // Xabarni 3 soniyadan so'ng yashirish
    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => messageElement.remove(), 300); // 0.3 soniya ichida xabarni o'chirish
    }, 3000);
}