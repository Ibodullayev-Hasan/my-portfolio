document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Formani standart yuborilishini bloklash

    // Form ma'lumotlarini olish
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Telefon raqamini tekshirish
    const phoneRegex = /^\+998\d{9}$/; // Telefon raqam formati: +998901234567
    if (!phoneRegex.test(data.mobile)) {
        alert("Invalid phone number. Please use the format: +998901234567");
        return; // Agar noto'g'ri bo'lsa, yuborishni to'xtatamiz
    }

    try {
        // Form ma'lumotlarini yuborish
        const response = await fetch('', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Message sent successfully!');
        } else {
            alert('Failed to send the message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});
