console.log('Я JavaScript');

const $ = require('jquery');

// Hamburger
$(document).ready(function() {
    $('.hamburger').on('click touchstart', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        console.log('clicked here');
    });
});

// Nav
$(document).ready(() => {
    $('.nav__link').on('click touchstart', (e) => {
        e.preventDefault();
        
        var elem = $(e.target),
            items = elem.closest('.nav__item').siblings().children('.nav__link');

        if (!elem.hasClass('active')) {
            items.removeClass('active')
            elem.addClass('active')
        }  
    });
});

// Flip
$(document).ready(() => {
    var item = $('.wrapper').find('.flip-effect'),
        front = item.find('.front');

    $('.auth__button').on('click touchstart', (e) => {
        e.preventDefault();
        item.css('transform', 'rotateY(180deg)');
        front.css('opacity', '0');        
    });
    $('.auth-form__button-main').on('click touchstart', (e) => {
        e.preventDefault();
        item.css('transform', 'rotateY(0deg)');
        front.css('opacity', '1');
    });
});
