function createBasicLeaderboard() {
    const leaderboardContent = document.createElement('div'),
        leadersList = document.createElement('ul'),
        leaderListItem = document.createElement('li')

    leaderboardContent.classList.add('leaderboard-content')
    leadersList.classList.add('leaders-list')
    leaderListItem.classList.add('leaders-list-item')
    leaderListItem.innerHTML = `<span class="leader-id">id</span>
                <span class="leader-username">username</span>
                <span class="leader-fullname">fullname</span>
                <span class="leader-score">score</span>`
    leadersList.appendChild(leaderListItem)
    leaderboardContent.appendChild(leadersList)
    cardsWrapper.appendChild(leaderboardContent)
}

function appendLeaderboardItems() {
    getSortedUsers()
    createBasicLeaderboard()
    for (let user of sortedUserList) {
        createLeaderRow(user)
    }
}

function createLeaderRow(user) {
    const leadersList = document.querySelector('.leaders-list'),
        leaderListItem = document.createElement('li')

    leaderListItem.classList.add('leaders-list-item')
    leaderListItem.innerHTML = `<span class="leader-id">${sortedUserList.indexOf(user) + 1}</span>
                <span class="leader-username">${user.username}</span>
                <span class="leader-fullname">${user.passport}</span>
                <span class="leader-score">${user.points}</span>`

    leadersList.appendChild(leaderListItem)
}

let sortedUserList = []

function getSortedUsers() {
    sortedUserList = []
    let userArray = [];
    for (let i = 0; i <= localStorage.length; i++) {
        const user = JSON.parse(localStorage.getItem(`${i}`))
        if (user !== null && user !== undefined) {
            userArray.push(user)
        }
    }
    const userPoints = []
    for (let user of userArray) {
        if (user.tasks !== null && user.tasks !== undefined) {
            userPoints.push(user.points)
        }
    }
    let sortedUserPoint = qSort(userPoints).reverse()
    for (let index in sortedUserPoint) {
        for (let user of userArray) {
            if (user.points === sortedUserPoint[index]) {
                sortedUserList.push(user)
                userArray.splice(userArray.indexOf(user), 1)
            }
        }
    }
}

