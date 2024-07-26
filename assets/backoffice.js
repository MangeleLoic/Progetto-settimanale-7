const addressBarParameters = new URLSearchParams(location.search);
const shopId = addressBarParameters.get('shopId'); 

const prodottoURL = 'https://striveschool-api.herokuapp.com/api/product/';


function loadProductDetails() {
  fetch(prodottoURL + shopId, {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjIzMGYyNjBjYzAwMTVjYzBkZWMiLCJpYXQiOjE3MjE5ODM1MzYsImV4cCI6MTcyMzE5MzEzNn0.OVb-e905Ih4e9Jd9qgq1e2n6q1OiP2TlwMSttriiES8",
        'Content-Type': 'application/json',
    }
})
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('ERRORE NELLA FETCH SINGOLA: ' + response.statusText);
      }
    })
    .then((singleItem) => {
      console.log(singleItem);
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
              <a href="#" class="btn btn-success" onclick="deleteItem()">Compra</a>
              <a href="./details.html?shopId=${singleItem._id}" class="btn btn-primary">Vai ai dettagli</a>
            </div>
          </div>
        </div>`;
    })
    .catch((err) => {
      console.log('Errore nel caricamento del prodotto:', err);
    });
}


function deleteItem() {
  fetch(prodottoURL + shopId, {
    method: 'DELETE',
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjIzMGYyNjBjYzAwMTVjYzBkZWMiLCJpYXQiOjE3MjE5ODM1MzYsImV4cCI6MTcyMzE5MzEzNn0.OVb-e905Ih4e9Jd9qgq1e2n6q1OiP2TlwMSttriiES8",
        'Content-Type': 'application/json',
    }
})
  
    .then((response) => {
      if (response.ok) {
        alert('PRODOTTO ELIMINATO');
        location.assign('./index.html'); 
      } else {
        throw new Error('Problema nell\'eliminazione: ' + response.statusText);
      }
    })
    .catch((err) => {
      console.log('Errore durante l\'eliminazione del prodotto:', err);
    });
}


document.addEventListener('DOMContentLoaded', loadProductDetails);
