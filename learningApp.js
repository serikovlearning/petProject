const controlItems = document.querySelectorAll('.controls-item'),
    cardsTitle = document.querySelector('.cards-title'),
    cardsWrapper = document.querySelector('.cards-wrapper')

const dashboardProto = {
    title: 'Just Vlogger',
    text: 'Закладывайте свою розу, чтобы накапливать плату за протокол...',
    xp: '25 XP',
    date: 'every week'
}, taskProto = {
    title: 'Another Task',
    text: 'Выполните задание, чтобы ничего не произошло, ха-ха',
    xp: '0 XP',
    date: 'every day'
}, historyProto = {
    title: 'Moment',
    text: 'В этот момент ничего не происходило, а интересных карт я не придумал',
    xp: '20 XP',
    date: '3 days ago'
}, leaderboardProto = {
    title: 'Leader',
    text: 'Самый лучший из армян это Генрих Мхитарян',
    xp: `1 pos`,
    date: 'Forever'
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const dashboardNum = getRandomArbitrary(0, 3),
    taskNum = getRandomArbitrary(0, 7),
    historyNum = getRandomArbitrary(6, 50),
    leaderboardNum = getRandomArbitrary(0, 10),
    numberArr = [dashboardNum, taskNum, historyNum, leaderboardNum]

const dashArr = createCards(0),
    taskArr = createCards(1),
    historyArr = createCards(2),
    leaderArr = createCards(3),
    arrayHolder = [dashArr, taskArr, historyArr, leaderArr]


function Card() {
}

function createCardObject(selectedPrototype) {
    Card.prototype = selectedPrototype
    return new Card()
}

function createCardNode(selectedPrototype) {
    const card = document.createElement('div'),
        cardItemRight = document.createElement('div'),
        cardItemRightTitle = document.createElement('h1'),
        cardItemRightText = document.createElement('p'),
        cardItemLeft = document.createElement('div'),
        cardItemLeftXp = document.createElement('p'),
        cardItemLeftSubXp = document.createElement('p')

    card.classList.add('card-item')
    cardItemRight.classList.add('card-item-right')
    cardItemRightTitle.classList.add('card-item-right-title')
    cardItemRightText.classList.add('card-item-right-text')
    cardItemLeft.classList.add('card-item-left')
    cardItemLeftXp.classList.add('card-item-left-xp')
    cardItemLeftSubXp.classList.add('card-item-left-sub-xp')

    let currentCard = createCardObject(selectedPrototype)

    cardItemRightTitle.textContent = `${currentCard.title}`
    cardItemRightText.textContent = `${currentCard.text}`
    cardItemLeftXp.textContent = `${currentCard.xp}`
    cardItemLeftSubXp.textContent = `${currentCard.date}`

    cardItemRight.append(cardItemRightTitle, cardItemRightText)
    cardItemLeft.append(cardItemLeftXp, cardItemLeftSubXp)
    card.append(cardItemRight, cardItemLeft)

    return card
}

function createCards(cardIndex) {
    let number = numberArr[cardIndex],
        tempArr = []

    for (let y = 0; y < number; y++) {
        if (cardIndex === 0) {
            tempArr.push(createCardNode(dashboardProto))
        } else if (cardIndex === 1) {
            tempArr.push(createCardNode(taskProto))
        } else if (cardIndex === 2) {
            tempArr.push(createCardNode(historyProto))
        } else tempArr.push(createCardNode(leaderboardProto))
    }
    return tempArr
}

function drawCards(cardIndex) {
    for (let card of arrayHolder[cardIndex]) {
        cardsWrapper.append(card)
    }
    for (let arr of arrayHolder) {
        if (arrayHolder[cardIndex] !== arr) {
            arr.forEach((card) => {
                card.remove()
            })
        }
    }
}

controlItems.forEach((item, i) => {
    let currentItem;

    item.addEventListener('click', () => {
        currentItem = item
        currentItem.classList.add('active')
        cardsTitle.innerHTML = currentItem.innerHTML

        drawCards(i)

        for (let x = 0; x < controlItems.length; x++) {
            if (x !== i) {
                controlItems[x].classList.remove('active')
            }
        }
    })
})

// console.log('Working for data')
// const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('Preparing data...')
//         const newCard = createCardObject(dashboardProto)
//
//         resolve(newCard)
//     }, 2000)
// })
//
// p.then((data) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             data.modified = true
//             resolve(data)
//         }, 2000)
//     })
// })
//     .then(newCard => {
//         console.log('Data received')
//         newCard.fromPromise = true
//         return newCard
//     })
//     .then(data => {
//         console.log('New Modified', data)
//     })
//     .catch(err => {
//         console.log('Error', err)
//     })
//     .finally(() => console.log('Finally'))


// const promCard = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         const newArr =[];
//         for (let i = 0; i < dashboardNum; i++) {
//             console.log(i)
//             const newCard = createCardNode(dashboardProto)
//             newArr.push(newCard)
//         }
//         resolve(newArr)
//     }, 2000)
// })
//
// promCard.then(data => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log(data)
//             for (let i = 0; i < dashboardNum; i++) {
//                 cardsWrapper.append(data[i])
//             }
//         }, 2000)
//     })
// })
//

const requestUrl = 'https://jsonplaceholder.typicode.com/posts'

function getData(url) {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
}

function SecondCard(cardObject) {
    this.userId = cardObject.userId
    this.postId = cardObject.postId
    this.title = cardObject.title
    this.text = cardObject.text
}

function createCardNodeSecond(cardData) {
    const card = document.createElement('div'),
        cardItemRight = document.createElement('div'),
        cardItemRightTitle = document.createElement('h1'),
        cardItemRightText = document.createElement('p'),
        cardItemLeft = document.createElement('div'),
        cardItemLeftXp = document.createElement('p'),
        cardItemLeftSubXp = document.createElement('p')

    card.classList.add('card-item')
    cardItemRight.classList.add('card-item-right')
    cardItemRightTitle.classList.add('card-item-right-title')
    cardItemRightText.classList.add('card-item-right-text')
    cardItemLeft.classList.add('card-item-left')
    cardItemLeftXp.classList.add('card-item-left-xp')
    cardItemLeftSubXp.classList.add('card-item-left-sub-xp')

    cardItemRightTitle.textContent = `${cardData.title}`
    cardItemRightText.textContent = `${cardData.text}`
    cardItemLeftXp.textContent = `user: ${cardData.userId}`
    cardItemLeftSubXp.textContent = `post number: ${cardData.postId}`

    cardItemRight.append(cardItemRightTitle, cardItemRightText)
    cardItemLeft.append(cardItemLeftXp, cardItemLeftSubXp)
    card.append(cardItemRight, cardItemLeft)

    return card
}

getData(requestUrl)
    .then(data => {
        let resultObject,
            resultArr = [];
        setTimeout(() => {
            for (let item of data) {
                resultObject = {
                    userId: item.userId,
                    postId: item.id,
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
    for (let object of newData) {
        if (object.userId === 1 && object.postId <= 7){
            cardsWrapper.append(createCardNodeSecond(object))
        }
    }
})
