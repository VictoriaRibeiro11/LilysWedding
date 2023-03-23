// MESSAGE INPUT
const textarea = document.querySelector('.chatbox-input')
const chatboxForm = document.querySelector('.chatbox-form')

textarea.addEventListener('input', function (){
    let line = textarea.value.split('\n').length

    if(textarea.rows < 6 || line < 6){
        textarea.rows = line
    }

    if(textarea.rows > 1){
        chatboxForm.style.alignItems = 'flex-end'
    }
    else{
        chatboxForm.style.alignItems = 'center'
    }
})

// DROPDOWN TOGGLE
const dropdwonToggle = document.querySelector('.chatbox-dropdown-toggle')
const dropdownMenu = document.querySelector('.chatbox-dropdown-menu')

dropdwonToggle.addEventListener('click', function (){
    dropdownMenu.classList.toggle('show')
})

document.addEventListener('click', function (e){
    if(!e.target.matches('chatbox-dropdown, .chatbox-dropdown *')){
        dropdownMenu.classList.remove('show')
    }
})

// CHATBOX MESSAGE
const chatboxWrapper = document.querySelector('.chatbox-content')
const chatboxNoMessage = document.querySelector('.chatbox-no-message')

chatboxForm.addEventListener('submit', function (e){
    e.preventDefault()

    if(isValid(textarea.value)) {
		writeMessage()
		setTimeout(autoReply, 1000)
	}
})

function addZero(num){
    return num < 10 ? '0'+num : num
}

function writeMessage(){
    const today = new Date()
    let message = `
        <div class="chatbox-item-sent">
            <span class="chatbox-item-text">
            ${textarea.value.trim().replace(/\n/g, '<br>\n')}
            </span>
            <span class="chatbox-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
        </div>
    `
    chatboxWrapper.insertAdjacentHTML('beforeend', message)
    chatboxForm.style.alignItems = 'center'
    textarea.rows = 1
    textarea.focus()
    textarea.value = ''
    chatboxNoMessage.style.display = 'none'
    scrollBottom() 
}

function autoReply(){
    const today = new Date()
    let message = `
        <div class="chatbox-item-received">
            <span class="chatbox-item-text">
                Olá, obrigada por nos contatar!
            </span>
            <span class="chatbox-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
        </div>
    `
    chatboxWrapper.insertAdjacentHTML('beforeend', message)
    scrollBottom() 

}

//auto scroll
function scrollBottom() {
	chatboxWrapper.scrollTo(0, chatboxWrapper.scrollHeight)
}

// impede que você envie texto vazio
function isValid(value) {
	let text = value.replace(/\n/g, '')
	text = text.replace(/\s/g, '')

	return text.length > 0
}