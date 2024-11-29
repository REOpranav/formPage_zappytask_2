const form = document.querySelector('form')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const email = document.querySelector('#email')

// success Check
const setSuccess = (element) => {
    const parentAccess = element.parentElement
    parentAccess.firstElementChild.className = 'success'
    const captureCreateElement = parentAccess.querySelector('span')
    captureCreateElement.innerText = ''

    const input = parentAccess.querySelector('input')
    input.style.borderColor = 'green'

}

// Error check
const setError = (element, message) => {
    let parentAccess = element.parentElement
    parentAccess.firstElementChild.className = 'inputError'
    const accessChild = parentAccess.querySelector('#span');
    accessChild.innerText = message
    accessChild.className = "error"

    const input = parentAccess.querySelector('input')
    input.style.borderColor = 'red'

    const acessChilds = parentAccess.querySelector('.error-Indicator')
    let eight_char_error = acessChilds?.querySelector('.must-eight-char');
    let must_Spacial_Char = acessChilds?.querySelector('.must-spacial-char')
    let must_Upper_Lower_Case = acessChilds?.querySelector('.must-upper-lower-case')

    if (message == 'must be in 8 charector') {
        accessChild.style.color = 'red'
    }

    if (message == 'Weak') {
        eight_char_error && (eight_char_error.id = 'must_eight_char_success')
        accessChild.style.color = 'orange'
        input.style.borderColor = 'green'
    } else {
        eight_char_error && (eight_char_error.id = 'must_eight_char_error')
    }

    if (message == 'Medium') {
        eight_char_error && (eight_char_error.id = 'must_eight_char_success')
        must_Spacial_Char && (must_Spacial_Char.id = 'must_special_char_success')
        accessChild.style.color = 'Yellow'
        input.style.borderColor = 'green'

    } else {
        must_Spacial_Char && (must_Spacial_Char.id = 'must_special_char_error')
    }

    if (message == 'Strong') {
        eight_char_error && (eight_char_error.id = 'must_eight_char_success')
        must_Spacial_Char && (must_Spacial_Char.id = 'must_special_char_success')
        must_Upper_Lower_Case && (must_Upper_Lower_Case.id = 'must_upper_lower_case_success')
        accessChild.style.color = 'greenYellow'
        input.style.borderColor = 'green'

    } else {
        must_Upper_Lower_Case && (must_Upper_Lower_Case.id = 'must_upper_lower_case_error')
    }
}

// Mail check
const emailCheck = (value) => {
    return String(value).match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

// validation 
const validatingInputs = () => {
    const usernameVal = username.value.trim()
    const passwordVal = password.value.trim()
    const emailVal = email.value.trim()
    const state = 'requires'
    let errorValue = {}
    const specialChars = ['#', '!', '$', '%', '~', '?', '&', '*', '^', '_'];

    if (usernameVal === '') {
        setError(username, state)
        errorValue.name = `${username?.placeholder} is ${state}`
    } else {
        setSuccess(username)
    }

    if (passwordVal === '') {
        setError(password, state)
        errorValue.password = `${password?.placeholder} is ${state}`
    }

    if (passwordVal.length < 8) {
        setError(password, 'must be in 8 charector')
        errorValue.password = `${password?.placeholder} is ${state}`
    } else if (!specialChars?.some(val => passwordVal.includes(val))) {
        setError(password, 'Weak')
    } else if (/[A-Z]/.test(passwordVal)) {
        setError(password, 'Strong')
    } else if (specialChars?.some(val => passwordVal.includes(val))) {
        setError(password, 'Medium')
    } else {
        setSuccess(password)
    }

    if (emailVal == '') {
        setError(email, state)
        errorValue.email = `${email?.placeholder} is ${state}`
    } else if (!emailCheck(emailVal)) {
        setError(email, 'not in correct formate')
        errorValue.email = `${email?.placeholder} is ${state}`
    } else {
        setSuccess(email)
    }

    return errorValue
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    form.addEventListener('input', (e) => {
        e.preventDefault()
        validatingInputs()
    })

    if (Object.keys(validatingInputs()).length == 0) {
        window.location.href = `http://127.0.0.1:5500/ThankyouPage%20.html`
    }
})