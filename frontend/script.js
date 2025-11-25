// Get the medicines that are already from server
fetch('http://localhost:8000/medicines')
    .then(response => response.json())
    .then(data => {
        var container = document.getElementById('medicines-list');

        for (var i = 0; i < data.medicines.length; i++) {
            var medicine = data.medicines[i];
 
            // Check if the name of the medicine actually exists, if not use "Unknown Medicine"
            var name = medicine.name;
            if (name === "" || name == null) {
                name = "Unknown Medicine";
            }

            // Check if the price does exist, if not say "No price available"
            var price = medicine.price;
            if (price === "" || price == null) {
                price = " No price available";
            }

            // Create a paragraph element for each medicine
            var paragraph = document.createElement('p');
            paragraph.textContent = name + " - £" + price;

            // Then append it to the container
            container.appendChild(paragraph);
        }
    });

document.getElementById('add-medicine-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Use this to stop this form from refershing the page, while inserting the data

    var nameInput = document.getElementById('medicine-name');
    var priceInput = document.getElementById('medicine-price');

    var name = nameInput.value;
    var price = parseFloat(priceInput.value);  // Convert the price to a float

    // Then, create the data object that should be sent to the backend
    var newMedicine = {
        name: name,
        price: price
    };

    // Now, send the data to the backend using fetch as form data
    var formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);

    fetch('http://localhost:8000/create', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Clear the input fields after it submits sucessfully
        nameInput.value = '';
        priceInput.value = '';
        // Update the medicines list to include the new medicine
        location.reload();
    })
    .catch((error) => {
        alert('Error adding medicine' +error);
    });
});
