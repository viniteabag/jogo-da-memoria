const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')


const membros = [
    'burgues',
    'dai',
    'devin',
    'helena',
    'joao',
    'juci',
    'juvenas',
    'orea',
    'romero',
    'vini',
    'kika',
    'paulo'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');

    if (disableCards.length === 24) {
        clearInterval(this.loop)
        setTimeout(() => {

            window.location.href = "../pages/congratulations.html" 
           
            // alert(`Ótimo trabalho ${spanPlayer.innerHTML}, Agora você é um verdadeiro Membro da Digitasuki! Seu tempo foi de ${timer.innerHTML} segundos`)

            congrat()

        }, 900) 
    }
}

const checkCards = () => {
    const primeiroMembro = firstCard.getAttribute('data-membro');
    const segundoMembro = secondCard.getAttribute('data-membro');

    if (primeiroMembro === segundoMembro) {

        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        firstCard = '';
        secondCard = '';

        checkEndGame()

    } else {
        
        setTimeout(() => {
            
            firstCard.classList.remove('revelar-carta')
            secondCard.classList.remove('revelar-carta')

            firstCard = '';
            secondCard = '';

        }, 800);
    }
}

const revelarCarta = ({ target }) => {
    
    if (target.parentNode.className.includes('revelar-carta')) {
        return;
    }

    if (firstCard === '') {

        target.parentNode.classList.add('revelar-carta');
        firstCard = target.parentNode;

    } else if (secondCard === '') {
        target.parentNode.classList.add('revelar-carta');
        secondCard = target.parentNode;

        checkCards()
    }

    }



const createCard = (membro) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img/fotos/${membro}.jpeg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revelarCarta);
    card.setAttribute('data-membro', membro);

    return card;
}

const loadGame = () => {

    const duplicarMembros = [ ...membros, ...membros];

    const embaralharMembros = duplicarMembros.sort(() => Math.random() - 0.5)
    
    duplicarMembros.forEach((membro) => {

        const card = createCard(membro)
        grid.appendChild(card)
    })
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

window.onload = () => {

    spanPlayer.innerHTML = 'Nukenin: ' + localStorage.getItem('player')
    
    startTimer()
    loadGame()
}


