const slides = document.querySelectorAll('#slides .slide');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const controls = document.querySelectorAll('.controls');

let currentSlide = 0;

// осуществляет переход к слайду номер n (начиная с 0)
function goToSlide(n){
    slides[currentSlide].className = 'slide';
    currentSlide = (n+slides.length)%slides.length; // остаток от деления
    slides[currentSlide].className = 'slide showing';
}

// навешивает обработчики событий на элементы next и previous
function setupListeners(){
    next.onclick = function(){
        goToSlide(currentSlide+1);
    }   
    previous.onclick = function(){
        goToSlide(currentSlide-1);
    }
    dot_1.onclick = function(){
        let currentSlide = 0;
        goToSlide(currentSlide);
    }
    dot_2.onclick = function(){
        let currentSlide = 1;
        goToSlide(currentSlide);
    }
    dot_3.onclick = function(){
        let currentSlide = 2;
        goToSlide(currentSlide);
    }
    dot_4.onclick = function(){
        let currentSlide = 3;
        goToSlide(currentSlide);
    }
}

// показывает кнопки для навигации
function showButtons(){
    for(var i=0; i<controls.length; i++){
        controls[i].style.display = 'inline-block';
    }  
}

// инициализация слайдера
function sliderInit(){
    if (slides.length !== 0){ // если на странице есть нужный html код 
        setupListeners();
        showButtons();
    }
}

module.exports = sliderInit;