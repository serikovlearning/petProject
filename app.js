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
    cardItemLeftXp.textContent = `level: ${cardData.userId}`
    cardItemLeftSubXp.textContent = `task number: ${cardData.taskId}`

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
function restoreDefaultPage() {
    contentSections[0].style.transform = `translateX(0)`
    contentSections[1].style.transform = `translateX(-200%)`
    if (singInForm.style.display !== 'block' && !userLogged) {
        showAndHidePage(singInForm, regForm)
    }
    menuItems.forEach(item => {
        item.classList.remove('active')
    })
}

navLogo.addEventListener('click', () => {
    restoreDefaultPage()
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


//region Getting data from jsonplaceholder
const requestUrl = 'https://jsonplaceholder.typicode.com/posts'

function getData(url) {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
}

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
})
//endregion

//region Add interesting feature to user account view with charts js
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
//endregion

//region Sign up and registration logic will be down
let userLogged = false,
    logout = false;

function checkUserLogged() {
    // console.log(Boolean(JSON.parse(sessionStorage.getItem('user'))))
    return Boolean(JSON.parse(sessionStorage.getItem('user')))
}

const regForm = document.querySelector('.registration__form'),
    userLoggedPage = document.querySelector('.user__logged'),
    singInForm = document.querySelector('.login__form'),
    goSignUpBtn = document.querySelector('.no_account span'),
    changePageTime = 1000;

restorePage = hiddenPage => {
    if (hiddenPage.style.display !== 'block') {
        hiddenPage.style.display = 'block'
        hiddenPage.style.transform = 'scale(0.1)'
        hiddenPage.style.opacity = '0.1'
        setTimeout(() => {
            hiddenPage.style.transform = 'scale(1)'
            hiddenPage.style.opacity = '1'
        }, 100)
    }

}

showAndHidePage = (showPage, hidePage) => {
    hidePage.style.transform = 'scale(0.1)'
    hidePage.style.opacity = '0.1'

    setTimeout(() => {
        hidePage.style.display = 'none'
        restorePage(showPage)
        showPage.style.display = 'block'
    }, changePageTime)
}

const controlAccountPage = () => {
    let userLogged = checkUserLogged()
    if (!userLogged) {
        userLoggedPage.style.display = 'none'
        if (regForm.style.display === 'block') {
            showAndHidePage(singInForm, regForm)
        }
        if (userLoggedPage.style.display === 'none' && !userLogged && logout) {
            showAndHidePage(singInForm, userLoggedPage)
        }
    } else if (userLogged) {
        showAndHidePage(userLoggedPage, singInForm)
        // regForm.style.display = 'none'
        // userLoggedPage.style.display = 'block'
    }
}


goSignUpBtn.addEventListener('click', () => {
    showAndHidePage(regForm, singInForm)
})

//region AUTH
const loginForm = document.querySelector('.login__form'),
    loginInputs = loginForm.querySelectorAll('input'),
    loginLabels = loginForm.querySelectorAll('label'),
    loginBtn = loginForm.querySelector('.login__btn'),
    userDataList = document.querySelectorAll('.main__info-text'),
    userTitle = document.querySelector('.user__title'),
    topUserBtn = document.querySelector('.another__login-btn'),
    lastBtn = document.querySelector('.last__btn')

function changeUserData(user) {
    if (user.username !== 'admin') {
        userTitle.innerHTML = `<span>${user.username}</span>`
        userDataList[0].innerHTML = `Full name: <span>${user.passport}</span>`
        userDataList[1].innerHTML = `Phone: <span>${user.user__number}</span>`
        userDataList[2].innerHTML = `Mail: <span>${user.user__email}</span>`
        userDataList[3].innerHTML = `Role: <span>just user</span>`
        userDataList[4].innerHTML = `Maximum Points: <span>0</span>`
    } else {
        userTitle.innerHTML = `<span>${user.username}</span>`
        userDataList[3].innerHTML = `Role: <span>Admin</span>`
    }
    topUserBtn.style.transform = 'translateY(-300%)'
    lastBtn.style.transform = 'translateY(-300%)'
    setTimeout(() => {
        topUserBtn.style.transform = 'translateY(0)'
        lastBtn.style.transform = 'translateY(0)'
        topUserBtn.textContent = `${user.username}`
        lastBtn.innerHTML = '<ion-icon name="enter-outline"></ion-icon>'
        lastBtn.classList.add('can__logout')
    }, 400)
}

lastBtn.addEventListener('click', () => {
    if (lastBtn.classList.contains('can__logout')) {
        showAndHidePage(userLoggedPage, singInForm)
        topUserBtn.style.transform = 'translateY(-200%)'
        lastBtn.style.transform = 'translateY(-200%)'
        setTimeout(() => {
            topUserBtn.style.transform = 'translateY(0)'
            lastBtn.style.transform = 'translateY(0)'
            topUserBtn.textContent = `JavaScript`
            lastBtn.innerHTML = '<ion-icon name="home-outline" class="home_btn"></ion-icon>'
        }, 400)
        sessionStorage.removeItem('user')
        logout = true;
        controlAccountPage()
        restoreDefaultPage()
        restoreCards()
    } else {
        restoreDefaultPage()
    }
})

const modalWindow = document.querySelector('.modal'),
    modalContent = modalWindow.querySelector('.modal-content'),
    modalTitle = modalWindow.querySelector('.modal-title'),
    modalTexts = modalWindow.querySelectorAll('.modal-text'),
    modalCloseBtn = modalWindow.querySelector('.close-btn .close-icon ')

function closeModalWindow() {
    modalWindow.style.opacity = '0.1'
    modalContent.style.transform = 'translate(-50%,-50%) scale(0.1)'
    setTimeout(() => {
        // modalWindow.style.display = 'none'
        modalWindow.classList.add('modal-hidden')
        modalWindow.style.opacity = '1'
        modalContent.style.transform = 'translate(-50%,-50%) scale(1)'
    }, 450)
}

modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow || e.target === modalCloseBtn) {
        closeModalWindow()
    }
})
modalWindow.addEventListener('mouseover', (e) => {
    if (e.target === modalWindow) {
        modalWindow.style.cursor = 'pointer'
    } else {
        modalWindow.style.cursor = 'initial'
    }
})


modalTexts[1].querySelector('span').addEventListener('click', () => {
    closeModalWindow()
    showAndHidePage(regForm, singInForm)

})

function createModal(info) {
    modalWindow.classList.add('modal-visible')
    modalWindow.classList.remove('modal-hidden')
}

loginBtn.addEventListener('click', () => {
    let checkThisUser = {};
    for (let i = 0; i <= localStorage.length; i++) {
        let user = JSON.parse(localStorage.getItem(`${i}`));
        if ((user && user.username === loginInputs[0].value) || (user && user.user__email === loginInputs[0].value)) {
            checkThisUser = user
            break
        }
    }
    if (checkThisUser.password === loginInputs[1].value) {
        // showAndHidePage(userLoggedPage, singInForm)
        loginInputs[0].value = ''
        loginInputs[1].value = ''
        sessionStorage.setItem('user', JSON.stringify(checkThisUser))
        logout = false
        changeUserData(checkThisUser)
        controlAccountPage()
        applyTask(true)
    } else {
        loginInputs[0].value = ''
        loginInputs[1].value = ''
        createModal('info')
    }
})


const simpleAdmin = {
    username: 'admin',
    password: 'admin',
    role: 'admin'
}

localStorage.setItem('0', JSON.stringify(simpleAdmin))
let newUser;
//endregion
//endregion

//region form validation
const form = document.querySelector('.user__registration'),
    reqInputs = document.querySelectorAll('.req__input'),
    usernameInput = document.querySelector('#username'),
    passwordInput = document.querySelector('#password'),
    passportInput = document.querySelector('#passport__data'),
    telInput = document.querySelector('#user__number'),
    emailInput = document.querySelector('#user__email'),
    personalInfoInput = document.querySelector('#personal__info'),
    submitBtn = document.querySelector('#submit-btn'),
    labels = document.querySelectorAll('.user__registration label')


function CreateUser(...arguments) {
    this.id = localStorage.length++
    this.username = arguments[0]
    this.password = arguments[1]
    this.passport = arguments[2]
    this.user__number = arguments[3]
    this.user__email = arguments[4]
    this.points = 0
    this.tasks = []
}


let textUsername = labels[0].innerHTML,
    textTel = labels[3].innerHTML,
    textEmail = labels[4].innerHTML


function showItemIsIaken(value, label) {
    let labelNumber;
    switch (label) {
        case ('username'):
            labelNumber = 0
            labels[labelNumber].innerHTML = `Данное имя пользователя занято`
            labels[labelNumber].classList.add('invalid__value')
            if (value) {
                labels[labelNumber].innerHTML = textUsername
                labels[labelNumber].classList.remove('invalid__value')

            }
            break

        case ('user__number'):
            labelNumber = 3
            labels[labelNumber].innerHTML = `Данный номер занят`
            labels[labelNumber].classList.add('invalid__value')
            if (value) {
                labels[labelNumber].innerHTML = textTel
                labels[labelNumber].classList.remove('invalid__value')
            }
            break

        case ('user__email'):
            labelNumber = 4
            labels[labelNumber].innerHTML = `Данный email занят`
            labels[labelNumber].classList.add('invalid__value')
            if (value) {
                labels[labelNumber].innerHTML = `${textEmail}`
                labels[labelNumber].classList.remove('invalid__value')
            }
            break
    }


}

function checkInSavedData(item, userFields) {
    let savedData = [];
    let resultValue = true;
    for (let i = 0; i <= localStorage.length; i++) {
        let user = JSON.parse(localStorage.getItem(`${i}`));
        if (user !== null) {
            savedData.push(user[`${userFields}`])
        }
    }
    for (let userData of savedData) {
        if (userData == item) {
            resultValue = false
            break
        }
    }
    showItemIsIaken(resultValue, userFields)
    return resultValue
}

function validateEmail(email, input) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) && checkInSavedData(email, input.attributes.name.value)
}

function validatePwd(pwd) {
    return pwd.length >= 8
}

function validateTel(tel, input) {
    let re = /^[0-9\s]*$/;
    return re.test(tel.toString().toLowerCase()) && tel.length >= 11 && checkInSavedData(tel, input.attributes.name.value)
}


function validateUsername(username, input) {
    return checkInSavedData(username, input.attributes.name.value)
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

function changeBtnColor() {
    reqInputs.forEach(item => {
        if (item.classList.contains('normal__value') && personalInfoInput.checked) {
            submitBtn.style.backgroundColor = `rgba(57, 196, 47, 0.22)`
        } else {
            submitBtn.style.backgroundColor = ` #c42f4c`
        }
    })
}

window.addEventListener('input', function (e) {
    let value = e.target.value;
    let validBool;

    switch (e.target) {

        case (passwordInput) :
            validBool = validatePwd(value, e.target)
            changeValidationColor(validBool, e.target)
            break

        case (emailInput) :
            validBool = validateEmail(value, e.target)
            changeValidationColor(validBool, e.target)
            break

        case (telInput) :
            validBool = validateTel(value, e.target)
            changeValidationColor(validBool, e.target)
            break

        case (usernameInput) :
            validBool = validateUsername(value, e.target)
            changeValidationColor(validBool, e.target)
            break
    }
    changeBtnColor()

})


personalInfoInput.addEventListener('click', () => {
    changeBtnColor()
})

function checkFinalVal() {
    let wrongInputs = [],
        result = true;
    reqInputs.forEach(item => {
        wrongInputs.push(item)
    })
    reqInputs.forEach((item, index) => {
        if (item.value === '') {
            item.classList.add('wrong__value')
        } else {
            item.classList.remove('wrong__value')
        }

        if (!item.classList.contains('wrong__value') && personalInfoInput.checked) {
            wrongInputs.splice(wrongInputs.indexOf(item), 1)
        }
    })
    for (let input of reqInputs) {
        if (input.attributes.name.value !== 'password') {
            if (!checkInSavedData(input.value, input.attributes['name'].value)) {
                result = false
                changeValidationColor(result, input)
            }
        }
    }
    return wrongInputs.length <= 0 && result
}

form.onsubmit = (e) => {
    e.preventDefault()
    let usernameVal = usernameInput.value,
        passwordVal = passwordInput.value,
        passportVal = passportInput.value,
        telVal = telInput.value,
        emailVal = emailInput.value;


    if (checkFinalVal()) {
        newUser = new CreateUser(
            usernameVal,
            passwordVal,
            passportVal || 'Данные отсутстуют',
            telVal,
            emailVal
        )

        localStorage.setItem(`${localStorage.length++}`, JSON.stringify(newUser))
        controlAccountPage()
        let myUser = JSON.parse(localStorage.getItem(`${newUser.id}`))
        form.querySelectorAll('input').forEach(item => {
            if (item.attributes.type.value !== 'submit') {
                if (item.attributes.type.value === 'checkbox') {
                    item.checked = false
                } else {
                    item.value = ''
                    item.classList.remove('normal__value')
                }
            } else {
                item.style.backgroundColor = ` #c42f4c`
            }
        })
        return true
    }

}

let usersList = [];
for (let i = 0; i <= localStorage.length; i++) {
    let user = JSON.parse(localStorage.getItem(`${i}`));
    usersList.push(user)
}
//endregion
// let currentUserTasks = []

function changeCardColor(cardToChange, clear) {
    cardToChange.style.opacity = '0'
    setTimeout(() => {
        if (clear) {
            cardToChange.style.background = 'linear-gradient(10.22deg, #274D72 6.74%, rgba(39, 77, 114, 0.2) 120.6%)'
        } else {
            cardToChange.style.background = 'linear-gradient(to bottom, #274d72, #4d4d84, #7d4485)'
        }
    }, 333)
    setTimeout(() => {
        cardToChange.style.opacity = '1'
    }, 888)
}

//region add hover to cards if user is logged

function checkCardIsTaken(card) {
    let currentUser = JSON.parse(sessionStorage.getItem('user'))
    let taskNumber = card.querySelector('.card-item-left-sub-xp').textContent
    let currentTask = Number(taskNumber.slice(13, taskNumber.length).trim())
    return currentUser.tasks.includes(currentTask)
}


const applyTaskBtn = document.createElement('a')
applyTaskBtn.classList.add('apply-task-btn')
applyTaskBtn.textContent = 'Apply'

function applyTask(firstCall) {

    // userLogged = checkUserLogged()

    let currentUser = JSON.parse(sessionStorage.getItem('user'))
    let takenCards = [];

    (function cardActions(firstCall) {
        if (checkUserLogged() && currentUser.role !== 'admin') {


            for (let i = 1; i < cardsWrapper.childNodes.length; i++) {
                let card = cardsWrapper.childNodes[i]
                let taskNumber = card.querySelector('.card-item-left-sub-xp').textContent
                let currentTask = Number(taskNumber.slice(13, taskNumber.length).trim())
                let cardIsTaken = checkCardIsTaken(card)

                if (cardIsTaken && !takenCards.includes(card)) {
                    takenCards.push(card)
                    if (firstCall) {
                        changeCardColor(card)
                    }
                }
                if (!takenCards.includes(card)) {
                    card.addEventListener('mouseover', (e) => {
                        if (!takenCards.includes(card)) {
                            card.appendChild(applyTaskBtn)
                        }
                    })

                    card.addEventListener('mouseleave', () => {
                        if (card !== null && card.contains(applyTaskBtn)) {
                            card.removeChild(applyTaskBtn)
                        }
                    })
                    card.addEventListener('click', (e) => {
                        if (e.target === applyTaskBtn) {
                            card = e.target.parentNode
                            // card.removeChild(applyTaskBtn)
                            for (let obj of cardsArr) {
                                if (obj.taskId === currentTask) {
                                    changeCardColor(card, false)
                                    currentUser.tasks.push(currentTask)
                                    sessionStorage.setItem('user', JSON.stringify(currentUser))
                                    localStorage.setItem(`${currentUser.id}`, JSON.stringify(currentUser))
                                    break
                                }
                            }
                            takenCards.push(card)
                            changeCardColor(card, false)
                            cardActions(false)
                        }
                    })
                }
            }
        }
    })(firstCall)
}

function restoreCards() {
    if (!checkUserLogged()) {
        for (let i = 1; i < cardsWrapper.childNodes.length; i++) {
            let card = cardsWrapper.childNodes[i]
            // console.log(card.childNodes)
            // if (card.childNodes.contains(applyTaskBtn))
            changeCardColor(card, true)
            // card.removeEventListener('click', () => {})
            // card.removeEventListener('mouseover', () => {})
            // card.removeEventListener('mouseleave', () => {})
        }
    }
}

sessionStorage.clear()