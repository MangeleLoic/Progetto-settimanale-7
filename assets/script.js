const shopItems = function () {
    const Url = 'https://striveschool-api.herokuapp.com/api/product/'
    fetch(Url, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjIzMGYyNjBjYzAwMTVjYzBkZWMiLCJpYXQiOjE3MjE5ODM1MzYsImV4cCI6MTcyMzE5MzEzNn0.OVb-e905Ih4e9Jd9qgq1e2n6q1OiP2TlwMSttriiES8'
        }
    })
        .then((response) => {
            console.log(response)
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('hai toppatp fre')
            }
        })
        .then((itemsArr) => {
            console.log('items già presenti', itemsArr)

            itemsArr.forEach(shop => {
                const newItem = `<div class="col-12 col-md-4 col-lg-3">
                    <div class="card">
    <img src="${shop.imageUrl}" alt="${shop.name}">
                        <div class="card-body text-center">
                            <h5>${shop.name}</h5>
            
            <p>${shop.description}</p>
            <p>Brand: ${shop.brand}</p>
            <p>Price: ${shop.price} €</p>
                            
                            <a href="#" class="btn btn-success">Compra</a>
                            <a href="./details.html?shopId=${shop._id}" class="btn btn-primary">Vai ai dettagli</a>

                        </div>
                    </div>
                </div>`

                const itemsRow = document.getElementById('items-row')
                itemsRow.innerHTML = itemsRow.innerHTML + newItem
            })

        })
        .catch((error) => {
            console.log('Error', error)



        })
}

shopItems()