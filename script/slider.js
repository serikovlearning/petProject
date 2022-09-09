//  Easter for the most attentive
function qSort(array) {
    const less = []
    const greater = []
    if (array.length < 2) {
        return array
    } else {
        let pivot = array[0]
        for (let i = 1; i < array.length; i++) {
            if (array[i] <= pivot) {
                less.push(array[i])
            } else if (array[i] > pivot) {
                greater.push(array[i])
            }
        }
        return [...qSort(less), ...[pivot], ...qSort(greater)]
    }
}

function createUserTasksPage() {
    let currentUserTasks = JSON.parse(sessionStorage.getItem('user')).tasks
    const userTasksPage = document.querySelector('.user__tasks-wrapper'),
        slider = userTasksPage.querySelector('.slider__wrapper'),
        sliderLeftBtn = userTasksPage.querySelector('.slide-left'),
        sliderRightBtn = userTasksPage.querySelector('.slide-right'),
        userTasksCards = userTasksPage.querySelectorAll('.user__task-card')
    if (currentUserTasks.length > 0) {
        slider.innerHTML = ''
        sliderLeftBtn.style.display = 'block'
        sliderRightBtn.style.display = 'block'

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
                const currentParent = e.target.parentNode
                currentParent.style.opacity = '0'


                setTimeout(() => {
                    e.target.parentNode.style.display = 'none'
                    let taskToRemove = '';
                    for (let part of currentParent.childNodes) {
                        if (part.classList.contains('user__task-text')) {
                            for (const partElement of part.childNodes) {
                                if (partElement.classList.contains('task__number')) {
                                    let taskItem = partElement
                                    taskToRemove = taskItem.textContent.trim()
                                    removeUserTask(taskToRemove)
                                    break
                                }
                            }
                            break
                        }
                        if (part.classList.contains('task_number')) {
                        }
                    }
                }, 500)
            }
        })
    } else {
        sliderLeftBtn.style.display = 'none'
        sliderRightBtn.style.display = 'none'
        slider.innerHTML = '<h1 class="content-part-title" style="text-shadow: 5px 5px 50px black">У вас ещё нет задач :(</h1>'
    }
}

function removeUserTask(taskNumber) {
    let currentUser = JSON.parse(sessionStorage.getItem('user'))
    const userTaskList = currentUser.tasks
    taskNumber = Number(taskNumber)
    if (userTaskList.includes(taskNumber)) {
        const taskIndex = userTaskList.indexOf(taskNumber)
        userTaskList.splice(taskIndex, 1)
        currentUser.tasks = userTaskList
        currentUser.points += 1
        sessionStorage.setItem(`user`, JSON.stringify(currentUser))
        localStorage.setItem(`${currentUser.id}`, JSON.stringify(currentUser))
    }

    currentUser = JSON.parse(sessionStorage.getItem('user'))
    for (let i = 1; i < cardsWrapper.childNodes.length; i++) {
        let card = cardsWrapper.childNodes[i]
        let taskNumber = card.querySelector('.card-item-left > .card-item-left-sub-xp').textContent,
            currentTaskNumber = Number(taskNumber.slice(13, taskNumber.length).trim())
        let cardIsTaken = currentUser.tasks.includes(currentTaskNumber)
        if (cardIsTaken) {
            changeCardColor(card, false)
        } else {
            changeCardColor(card, true)
        }
    }
    addTaskToCard()
}
