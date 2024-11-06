function placeOrder(product) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Send order data to backend server
    fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, product })
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
    })
    .then(data => {
        // Display confirmation
        const confirmationDiv = document.getElementById("orderConfirmation");
        confirmationDiv.innerHTML = `
            <p>Thank you, ${name}! Your order for ${product} has been placed.</p>
            <p>Your Order ID is <strong>${Math.floor(Math.random() * 10000)}</strong>. You can use this ID to track your order status.</p>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error placing your order. Please try again.');
    });
}

