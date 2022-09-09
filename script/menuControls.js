const controlItems = document.querySelectorAll('.controls-item'),
    cardsTitle = document.querySelector('.main-info-title'),
    cardsWrapper = document.querySelector('.main-info-wrapper'),
    menuItems = document.querySelectorAll('.menu__item'),
    mainContent = document.querySelector('.main-content > main'),
    navLogo = document.querySelector('.logo'),
    accountContent = document.querySelector('.account-content > main'),
    contentSections = document.querySelectorAll('.content__wrapper > section')


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

let cardsLoaded = false;

// Nav items add and remove class active
menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {

        document.querySelector('body').style.overflowY = 'hidden'

        for (let i = 0; i < menuItems.length; i++) {
            if (i !== index) {
                menuItems[i].classList.remove('active')
            }
        }
        item.classList.add('active')
        cardsWrapper.innerHTML = allShowedCardsNode
        for (let i = 0; i < controlItems.length; i++) {
            if (i !== 1) {
                controlItems[i].classList.remove('active')
            }
        }
        addTaskToCard()

        if (!checkUserLogged()) {
            menuItems[0].classList.add('active')
            controlItems[1].classList.add('active')

            for (let i = 0; i < menuItems.length; i++) {
                if (i !== 0) {
                    menuItems[i].classList.remove('active')
                }
            }
        }
        let transformLength = (index + 1) * 100
        if (checkUserLogged()) {
            contentSections[0].style.transform = `translateX(${transformLength}%)`

            if (index === 0) {
                controlAccountPage()
                contentSections[1].style.transform = `translateX(-${transformLength}%)`
                contentSections[2].style.transform = `translateX(-300%)`
            } else if (index === 1) {
                createUserTasksPage()
                contentSections[2].style.transform = `translateX(-${transformLength}%)`
                contentSections[1].style.transform = `translateX(-200%)`
            }
        } else {
            contentSections[0].style.transform = `translateX(100%)`
            controlAccountPage()
            contentSections[1].style.transform = `translateX(-100%)`
        }
    })
})


// Nav logo restore default page
function restoreDefaultPage() {
    document.querySelector('body').style.overflowY = 'initial'
    contentSections[0].style.transform = `translateX(0)`
    contentSections[1].style.transform = `translateX(-200%)`
    contentSections[2].style.transform = `translateX(-300%)`
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

const dashboardContent = `
<div class="dashboard-content">
            <p class="main-info-text">
              Данное приложение является игровой платформой.<br>
              Авторизованные пользователи получают расширенный функционал.<br>
              На данной странице можно наблюдать сводку, задачи и список лидеров.
            </p>
            <ul class="actions">
              <span class="actions-title">NAV-MENU</span>
              <li class="actions-item"><b><span>JS</span></b> для вовзрата на стартовую страницу</li>
              <li class="actions-item"><b><span>ACCOUNT</span></b> для входа и регистрации</li>
              <li class="actions-item"><b><span>TASKS</span></b> для просмотра и выполнения задач</li>
            </ul>
          </div>`

// control which info will show on page with from dashboard/task/history/leaderboard
function menuControlFunction() {
    controlItems.forEach((item, i) => {
        if (cardsLoaded) {
            const taskList = cardsWrapper.innerHTML
            item.addEventListener('click', () => {
                item.classList.add('active')
                cardsTitle.innerHTML = item.innerHTML
                for (let x = 0; x < controlItems.length; x++) {
                    if (x !== i) {
                        controlItems[x].classList.remove('active')
                    }
                }

                if (i === 0) {
                    cardsWrapper.innerHTML = dashboardContent
                }
                if (i === 1) {
                    cardsWrapper.innerHTML = allShowedCardsNode
                    addTaskToCard()
                }

                if (i === 2) {
                    cardsWrapper.innerHTML = ''
                    appendLeaderboardItems()
                }
            })
        }
    })
}

