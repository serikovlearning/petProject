const applyTaskBtn = document.createElement('a')
applyTaskBtn.classList.add('apply-task-btn')
applyTaskBtn.textContent = 'Apply'

function addTaskToCard() {
    if (checkUserLogged()) {
        let currentUser = JSON.parse(sessionStorage.getItem('user'))
        for (let i = 1; i < cardsWrapper.childNodes.length; i++) {
            let card = cardsWrapper.childNodes[i]
            let taskNumber = card.querySelector('.card-item-left-sub-xp').textContent,
                currentTaskNumber = Number(taskNumber.slice(13, taskNumber.length).trim()),
                cardIsTaken = currentUser.tasks.includes(currentTaskNumber)
            if (cardIsTaken) {
                changeCardColor(card, false)
            }
        }
        cardsWrapper.addEventListener('mouseover', (event) => {
            if (checkUserLogged()) {
                for (let i = 1; i < cardsWrapper.childNodes.length; i++) {
                    let card = cardsWrapper.childNodes[i]
                    if (event.target === card) {
                        let taskNumber = card.querySelector('.card-item-left-sub-xp').textContent,
                            currentTaskNumber = Number(taskNumber.slice(13, taskNumber.length).trim())
                        let cardIsTaken = currentUser.tasks.includes(currentTaskNumber)
                        if (!cardIsTaken) {
                            event.target.appendChild(applyTaskBtn)
                            event.target.addEventListener('mouseleave', () => {
                                if (event.target.contains(applyTaskBtn)) {
                                    event.target.removeChild(applyTaskBtn)
                                }
                            })
                        }
                    }
                }
            }
        })
        cardsWrapper.addEventListener('click', (event) => {
            if (checkUserLogged()) {
                for (let i = 1; i < cardsWrapper.childNodes.length; i++) {
                    let card = cardsWrapper.childNodes[i]
                    if (event.target === applyTaskBtn && card.contains(event.target)) {
                        let taskNumber = event.target.parentNode.querySelector('.card-item-left-sub-xp').textContent,
                            currentTaskNumber = Number(taskNumber.slice(13, taskNumber.length).trim())

                        currentUser.tasks.push(currentTaskNumber)
                        sessionStorage.setItem('user', JSON.stringify(currentUser))
                        localStorage.setItem(`${currentUser.id}`, JSON.stringify(currentUser))
                        let cardIsTaken = currentUser.tasks.includes(currentTaskNumber)
                        if (cardIsTaken) {
                            changeCardColor(card)
                        }
                    }
                }
            }
        })
    }
}


function restoreCards() {
    if (!checkUserLogged()) {
        for (let i = 1; i < cardsWrapper.childNodes.length; i++) {
            let card = cardsWrapper.childNodes[i]
            changeCardColor(card, true)
        }
    }
}

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