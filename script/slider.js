function createUserTasksPage() {
    let currentUserTasks = JSON.parse(sessionStorage.getItem('user')).tasks
    if (currentUserTasks.length > 0) {

        const userTasksPage = document.querySelector('.user__tasks-wrapper'),
            slider = userTasksPage.querySelector('.slider__wrapper')

        slider.innerHTML = ''

        function CreateUserTasks(cardObject) {
            this.id = cardObject.taskId
            this.title = cardObject.title
            this.text = cardObject.text
        }

        function createTaskCard(task) {
            const userTaskCard = document.createElement('div'),
                userTaskTitle = document.createElement('h3'),
                userTaskText = document.createElement('p'),
                userTaskBtn = document.createElement('a')

            userTaskCard.classList.add('user__task-card')
            userTaskTitle.classList.add('user__task-title')
            userTaskText.classList.add('user__task-text')
            userTaskBtn.classList.add('user__task-btn')

            userTaskTitle.textContent = `${task.title}`
            userTaskText.innerHTML = `<span class="task__number">${task.id}</span><br><span>Описание задачи:</span> ${task.text}`
            userTaskBtn.textContent = 'Завершить'

            userTaskCard.appendChild(userTaskTitle)
            userTaskCard.appendChild(userTaskText)
            userTaskCard.appendChild(userTaskBtn)

            return userTaskCard
        }

        for (let task of currentUserTasks) {
            setTimeout(() => {
                for (let item of cardsArr) {
                    if (task === item.taskId) {
                        let userTask = new CreateUserTasks(item)
                        let currentUserTask = createTaskCard(userTask)
                        slider.appendChild(currentUserTask)
                        break
                    }
                }
            }, 200)
        }

        setTimeout(() => {
            enableSlider()
        }, 300)

        function enableSlider() {
            const sliderLeftBtn = userTasksPage.querySelector('.slide-left'),
                sliderRightBtn = userTasksPage.querySelector('.slide-right'),
                userTasksCards = userTasksPage.querySelectorAll('.user__task-card')
            let commonCardWidth = (parseFloat(userTasksCards[0].clientWidth) + 50) / 1.15
            let translateNum = 0
            let indexActive = translateNum / commonCardWidth
            userTasksCards[0].classList.add('active')
            sliderRightBtn.addEventListener('click', () => {
                if (indexActive <= userTasksCards.length - 2) {
                    translateNum -= commonCardWidth
                    indexActive += 1
                    for (let card of userTasksCards) {
                        if (card !== undefined) {
                            card.classList.remove('active')
                        }
                    }
                    userTasksCards[indexActive].classList.add('active')
                    slider.style.transform = `translateX(${translateNum}px)`
                }
            })

            sliderLeftBtn.addEventListener('click', () => {
                if (translateNum < 0) {
                    translateNum += commonCardWidth
                    indexActive -= indexActive > 0 ? 1 : 0
                    for (let card of userTasksCards) {
                        if (card !== undefined) {
                            card.classList.remove('active')
                        }
                    }
                    if (indexActive >= 0) {
                        userTasksCards[indexActive].classList.add('active')
                        slider.style.transform = `translateX(${translateNum}px)`
                    }
                }
            })
        }

        slider.addEventListener('click', (e) => {
            if (e.target.classList.contains('user__task-btn')) {
                e.target.parentNode.style.opacity = '0'
                setTimeout(() => {
                    e.target.parentNode.style.display = 'none'
                    let currentUser = JSON.parse(sessionStorage.getItem('user'))
                    for (let part of e.target.childNodes) {

                    }
                }, 500)
            }
        })
    }
}