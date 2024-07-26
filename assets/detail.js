const addressBarParameters = new URLSearchParams(location.search);
const shopId = addressBarParameters.get('shopId'); // questo torna l'_id nella barra degli indirizzi
console.log('shopId', shopId);

const prodottoURL = 'https://striveschool-api.herokuapp.com/api/product/';
const token = 'Bearer YOUR_TOKEN_HERE'; // Sostituisci con il tuo token

fetch(prodottoURL + shopId, {
    headers: {
        'Authorization': token
    }
})
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('ERRORE NELLA FETCH SINGOLA');
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
            <a href="#" class="btn btn-success">Compra</a>
            <a href="./details.html?shopId=${singleItem._id}" class="btn btn-primary">Vai ai dettagli</a>
            <button class="btn btn-danger" onclick="deleteItem()">Elimina</button>
          </div>
        </div>
      </div>`;
    })
    .catch((err) => {
        console.log('ERRORE', err);
    });

const deleteItem = function () {
    fetch(prodottoURL + shopId, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    })
        .then((response) => {
            if (response.ok) {
                alert('PRODOTTO ELIMINATO');
                location.assign('./index.html');
            } else {
                throw new Error("Problema nell'eliminazione");
            }
        })
        .catch((err) => {
            console.log('ERRORE', err);
        });
};
