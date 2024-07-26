const shopItems = function () {
    const Url = 'https://striveschool-api.herokuapp.com/api/product/'
    fetch(Url, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjIzMGYyNjBjYzAwMTVjYzBkZWMiLCJpYXQiOjE3MjE5ODM1MzYsImV4cCI6MTcyMzE5MzEzNn0.OVb-e905Ih4e9Jd9qgq1e2n6q1OiP2TlwMSttriiES8'
        }
    })
    .then((response) => {
        console.log(response)
        if(response.ok) {
 return response.json()
        } else {
            throw new Error('hai toppatp fre')
        }
    })
    .then((itemsArr) => {
        console.log('itens già presenti', itemsArr)
    })
    .catch((error) => {
        console.log('Error', error)
    })
}

shopItems()