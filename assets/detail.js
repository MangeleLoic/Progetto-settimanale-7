const addressBarParameters = new URLSearchParams(location.search);
const shopId = addressBarParameters.get('shopId');

const prodottoURL = 'https://striveschool-api.herokuapp.com/api/product/';
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjIzMGYyNjBjYzAwMTVjYzBkZWMiLCJpYXQiOjE3MjE5ODM1MzYsImV4cCI6MTcyMzE5MzEzNn0.OVb-e905Ih4e9Jd9qgq1e2n6q1OiP2TlwMSttriiES8"
; 


function loadProductDetails() {
    fetch(prodottoURL + shopId, {
        headers: {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjIzMGYyNjBjYzAwMTVjYzBkZWMiLCJpYXQiOjE3MjE5ODM1MzYsImV4cCI6MTcyMzE5MzEzNn0.OVb-e905Ih4e9Jd9qgq1e2n6q1OiP2TlwMSttriiES8"
                }
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(err => {
                    throw new Error('Errore nella fetch singola: ' + err.message);
                });
            }
        })
        .then((singleItem) => {
            console.log('SINGLEITEM', singleItem);

            const detailRow = document.getElementById('detail-row');
            detailRow.innerHTML = `
                <div class="col-12 col-md-4 col-lg-3">
                    <div class="card">
                        <img src="${singleItem.imageUrl}" alt="${singleItem.name}">
                        <div class="card-body text-center">
                            <h5>${singleItem.name}</h5>
                            <p>${singleItem.description}</p>
                            <p>Brand: ${singleItem.brand}</p>
                            <p>Price: ${singleItem.price} €</p>
                            <a href="#" class="btn btn-success">Compra</a>
                            <a href="./details.html?shopId=${singleItem._id}" class="btn btn-primary">Vai ai dettagli</a>
                            <button class="btn btn-danger" onclick="deleteItem()">Elimina</button>
                        </div>
                    </div>
                </div>`;
        })
        .catch((err) => {
            console.log('Errore nel caricamento del prodotto:', err);
        });
}


function deleteItem() {
    if (!confirm('Sei sicuro di voler eliminare questo prodotto?')) {
        return;
    }

    fetch(prodottoURL + shopId, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjIzMGYyNjBjYzAwMTVjYzBkZWMiLCJpYXQiOjE3MjE5ODM1MzYsImV4cCI6MTcyMzE5MzEzNn0.OVb-e905Ih4e9Jd9qgq1e2n6q1OiP2TlwMSttriiES8",
            'Content-Type': 'application/json',
        }
    })
    
        .then((response) => {
            if (response.ok) {
                alert('Prodotto eliminato con successo');
                location.assign('./index.html');
            } else {
                return response.json().then(err => {
                    throw new Error('Problema nell\'eliminazione: ' + err.message);
                });
            }
        })
        .catch((err) => {
            console.log('Errore durante l\'eliminazione del prodotto:', err);
        });
}


document.addEventListener('DOMContentLoaded', loadProductDetails);
