
const shopId = new URLSearchParams(location.search).get('shopId');

console.log('SHOPID', shopId);

if (shopId) {
    
    fetch('https://striveschool-api.herokuapp.com/api/product/' + shopId, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjIzMGYyNjBjYzAwMTVjYzBkZWMiLCJpYXQiOjE3MjE5ODM1MzYsImV4cCI6MTcyMzE5MzEzNn0.OVb-e905Ih4e9Jd9qgq1e2n6q1OiP2TlwMSttriiES8",
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Errore nel recupero del prodotto');
            }
        })
        .then(singleItem => {
            console.log('SINGLEITEM', singleItem);

            document.getElementById('name').value = singleItem.name;
            document.getElementById('description').value = singleItem.description;
            document.getElementById('brand').value = singleItem.brand;
            document.getElementById('image').value = singleItem.imageUrl; 
            document.getElementById('price').value = singleItem.price;
        })
        .catch(err => {
            console.log(err);
        });
}

class Prodotto {
    constructor(_name, _description, _brand, _image, _price) {
        this.name = _name;
        this.description = _description;
        this.brand = _brand;
        this.imageUrl = _image;
        this.price = parseFloat(_price); 
    }
}

const itemForm = document.getElementById('item-form');
itemForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const brandInput = document.getElementById('brand');
    const imageInput = document.getElementById('image');
    const priceInput = document.getElementById('price');

    const nameValue = nameInput.value.trim();
    const descriptionValue = descriptionInput.value.trim();
    const brandValue = brandInput.value.trim();
    const imageValue = imageInput.value.trim();
    const priceValue = priceInput.value.trim();

    if (!nameValue || !descriptionValue || !brandValue || !imageValue || !priceValue) {
        alert('Tutti i campi sono obbligatori.');
        return;
    }

    const newProdotto = new Prodotto(nameValue, descriptionValue, brandValue, imageValue, priceValue);

    
    const methodToUse = shopId ? 'PUT' : 'POST';
    const URLToUse = 'https://striveschool-api.herokuapp.com/api/product/' + (shopId || '');

    fetch(URLToUse, {
        method: methodToUse,
        body: JSON.stringify(newProdotto),
        headers: {
            "Authorization": "Bearer YOUR_TOKEN_HERE", // Sostituisci con il tuo token
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(err => {
                    throw new Error(`Errore nel caricamento prodotto: ${err.message}`);
                });
            }
        })
        .then(data => {
            console.log('Prodotto caricato con successo:', data);
        })
        .catch(err => {
            console.log('ERRORE', err);
            alert(`Errore: ${err.message}`);
        });
});
