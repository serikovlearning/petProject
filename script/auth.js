let userLogged = false,
    logout = false;

function checkUserLogged() {
    return Boolean(JSON.parse(sessionStorage.getItem('user')))
}

const regForm = document.querySelector('.registration__form'),
    userLoggedPage = document.querySelector('.user__logged'),
    singInForm = document.querySelector('.login__form'),
    goSignUpBtn = document.querySelector('.no_account span'),
    changePageTime = 1000;

const restorePage = hiddenPage => {
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

const showAndHidePage = (showPage, hidePage) => {
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
    }
}


goSignUpBtn.addEventListener('click', () => {
    showAndHidePage(regForm, singInForm)
})

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
        userDataList[4].innerHTML = `Points: <span>${user.points}</span>`
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
        loginInputs[0].value = ''
        loginInputs[1].value = ''
        sessionStorage.setItem('user', JSON.stringify(checkThisUser))
        logout = false
        changeUserData(checkThisUser)
        controlAccountPage()
        addTaskToCard()
    } else {
        loginInputs[0].value = ''
        loginInputs[1].value = ''
        createModal('info')
    }
})


let newUser;
