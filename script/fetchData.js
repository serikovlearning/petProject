const requestUrl = 'https://jsonplaceholder.typicode.com/posts'

function getData(url) {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
}
const loader = document.querySelector('.loader')
let allShowedCardsNode;
let cardsArr = []
getData(requestUrl)
    .then(data => {
        let resultObject,
            resultArr = [];
        setTimeout(() => {
            for (let item of data) {
                resultObject = {
                    userId: item.userId,
                    taskId: item.id,
                    title: item.title.slice(0, 15),
                    text: item.body.slice(0, 30)
                }
                resultArr.push(resultObject)
            }

        }, 1000)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(resultArr)
            }, 2000)
        })
    }).then(newData => {
    let counter = 10;
    for (let object of newData) {
        if (Math.floor(object.taskId % 10) === 9) {
            cardsArr.push(object)
            cardsWrapper.append(createCardNode(object))
            counter += 10
        }
    }
    allShowedCardsNode = cardsWrapper.innerHTML
    cardsLoaded = true
    menuControlFunction()
    loader.style.opacity = '0'
    setTimeout(() => {
        loader.style.display = `none`
    }, 510)

})