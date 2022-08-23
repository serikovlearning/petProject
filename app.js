const controlItems = document.querySelectorAll('.controls-item'),
    cardsTitle = document.querySelector('.cards-title'),
    cardsWrapper = document.querySelector('.cards-wrapper'),
    menuItems = document.querySelectorAll('.menu__item'),
    mainContent = document.querySelector('.main-content > main'),
    navLogo = document.querySelector('.logo'),
    accountContent = document.querySelector('.account-content > main'),
    contentSections = document.querySelectorAll('.content__wrapper > section')


// some help functions

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function createCardNode(cardData) {
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


// Nav items add and remove class active
menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        item.classList.add('active')
        for (let i = 0; i < menuItems.length; i++) {
            if (i !== index) {
                menuItems[i].classList.remove('active')
            }
        }
        contentSections[0].style.transform = `translateX(100%)`


        if (index === 0) {
            controlAccountPage()
            contentSections[1].style.transform = `translateX(-100%)`
        }
    })
})

// Nav logo restore default page
navLogo.addEventListener('click', () => {
    contentSections[0].style.transform = `translateX(0)`
    contentSections[1].style.transform = `translateX(-200%)`
    menuItems.forEach(item => {
        item.classList.remove('active')
    })
})

// control which info will show on page with from dashboard/task/history/leaderboard
controlItems.forEach((item, i) => {
    item.addEventListener('click', () => {
        item.classList.add('active')
        cardsTitle.innerHTML = item.innerHTML
        // drawCards(i)
        for (let x = 0; x < controlItems.length; x++) {
            if (x !== i) {
                controlItems[x].classList.remove('active')
            }
        }
    })
})


// Getting data from jsonplaceholder
// const requestUrl = 'https://jsonplaceholder.typicode.com/posts'
//
// function getData(url) {
//     return fetch(url)
//         .then(response => {
//             if (response.ok) {
//                 return response.json()
//             }
//         })
// }
//
// getData(requestUrl)
//     .then(data => {
//         let resultObject,
//             resultArr = [];
//         setTimeout(() => {
//             for (let item of data) {
//                 resultObject = {
//                     userId: item.userId,
//                     postId: item.id,
//                     title: item.title.slice(0, 15),
//                     text: item.body.slice(0, 30)
//                 }
//                 resultArr.push(resultObject)
//             }
//
//         }, 1000)
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(resultArr)
//             }, 2000)
//         })
//     }).then(newData => {
//     let counter = 10;
//     for (let object of newData) {
//         // console.log(counter, object.postId)
//         if (Math.floor(object.postId % 10) === 9) {
//             cardsWrapper.append(createCardNode(object))
//             counter += 10
//         }
//     }
// })

// Add interesting feature to user account view with charts js
let userAcitivtyData = [
    getRandomArbitrary(0, 20),
    getRandomArbitrary(5, 10),
    getRandomArbitrary(0, 19),
    getRandomArbitrary(6, 20),
    getRandomArbitrary(0, 33),
    getRandomArbitrary(18, 22),
    getRandomArbitrary(12, 22)
]

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        datasets: [{
            label: false,
            data: userAcitivtyData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
});


// Sign up and registration logic will be down
let userLogged = false;

const regForm = document.querySelector('.registration__form'),
    userLoggedPage = document.querySelector('.user__logged');



function CreateUser(...arguments) {
        this.username = arguments[0]
        this.password = arguments[1]
        this.passport = arguments[2]
        this.tel = arguments[3]
        this.email = arguments[4]
}


let newUser;

const controlAccountPage = () => {
    if (!userLogged) {
        regForm.style.display = 'block'
        userLoggedPage.style.display = 'none'
    } else if (userLogged) {
        regForm.style.display = 'none'
        userLoggedPage.style.display = 'block'
    }
}

// form validation

const form = document.querySelector('.user__registration'),
    reqInputs = document.querySelectorAll('.req__input'),
    usernameInput = document.querySelector('#username'),
    passwordInput = document.querySelector('#password'),
    passportInput = document.querySelector('#passport__data'),
    telInput = document.querySelector('#user__number'),
    emailInput = document.querySelector('#user__email'),
    personalInfoInput = document.querySelector('#personal__info'),
    submitBtn = document.querySelector('#submit-btn');

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
}

function validatePwd(pwd) {
    return pwd.length >= 8
}

function validateTel(tel) {
    let re = /^[0-9\s]*$/;
    return re.test(tel.toString().toLowerCase()) && tel.length >= 11
}

function changeValidationColor(condition, input) {
    if (!condition) {
        input.classList.add('wrong__value')
        input.classList.remove('normal__value')
    } else {
        input.classList.remove('wrong__value')
        input.classList.add('normal__value')
    }
}

window.addEventListener('input', function (e) {
    let value = e.target.value;

    switch (e.target) {

        case (passwordInput) :
            changeValidationColor(validatePwd(value), e.target)
            break

        case (emailInput) :
            changeValidationColor(validateEmail(value), e.target)
            break

        case (telInput) :
            changeValidationColor(validateTel(value), e.target)
            break
    }

})

form.onsubmit = (e) => {
    e.preventDefault()
    let usernameVal = usernameInput.value,
        passwordVal = passwordInput.value,
        passportVal = passportInput.value,
        telVal = telInput.value,
        emailVal = emailInput.value;



    reqInputs.forEach((item, index) => {
        if (item.value === '') {
            item.classList.add('wrong__value')
        } else {
            item.classList.remove('wrong__value')
            console.log('all works')
        }

        if (item.classList.contains('wrong__value') && personalInfoInput.checked) {
            return false
        } else {
            newUser = new CreateUser(
                usernameVal,
                passwordVal,
                passportVal || 'Данные отсутстуют',
                telVal,
                emailVal
            )
            controlAccountPage()
            return true
        }
    })
}

