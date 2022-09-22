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


function CreateUser(...args) {
    this.id = localStorage.length++
    this.username = args[0]
    this.password = args[1]
    this.passport = args[2]
    this.user__number = args[3]
    this.user__email = args[4]
    this.points = 0
    this.tasks = []
}

const addedUsers = []
const randomUser1 = new CreateUser('user', 'user', 'user', 8777777777, 'example@gmail.com')
randomUser1.points = getRandomArbitrary(0, 20)
const randomUser2 = new CreateUser('user1', 'user1', 'user1', 8777777777, 'example@gmail.com')
randomUser2.points = getRandomArbitrary(0, 20)
const randomUser3 = new CreateUser('example', 'example', 'example', 8777777777, 'example@gmail.com')
randomUser3.points = getRandomArbitrary(0, 20)
const randomUser4 = new CreateUser('superHero', 'superHero', 'superHero', 8777777777, 'example@gmail.com')
randomUser4.points = getRandomArbitrary(0, 20)
const randomUser5 = new CreateUser('serikovlearning', 'secret', 'Сериков Егор', 8777777777, 'egorfaresto@gmail.com')
randomUser5.points = getRandomArbitrary(20, 100)

addedUsers.push(randomUser1, randomUser2, randomUser3, randomUser4, randomUser5)
addedUsers.map(user => {
    if (localStorage.length <= 5) {
        localStorage.setItem(`${localStorage.length++}`, JSON.stringify(user))
    }
})
// addedUsers.forEach((user, index) => {
//     if (localStorage.length <= 5) {
//         localStorage.setItem(`${localStorage.length++}`, JSON.stringify(user))
//     }
// })

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

