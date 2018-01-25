console.log('Я JavaScript');

const slider = require('./common/slider');
const $ = require('jquery'); 

slider(); // инициализируем слайдер






// Hamburger
$(document).ready(function() {
    $('.hamburger').on('click touchstart', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.wrapper').find('.hamb').toggleClass('active');
    });
});

// Flip
$(document).ready(function() {
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

// Scroll
$(document).ready(function() {
    $('.scroll').on('click touchstart', function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
        top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 800);
    });
});

// Nav
$(document).ready(function() {
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

// Mobile sidebar
$(document).ready(function() {
    var wrap = $('.wrapper'),
        hamb = wrap.find('.nav-hamb'),
        swipe = wrap.find('.nav__swipe');

    $('.nav__swipe').on('click touchstart', function(e) {
        e.preventDefault;
        $(this).toggleClass('active');
        hamb.addClass('active');
    });

    $('.nav-hamb__link').on('click touchstart', function(e) {
        e.preventDefault();

        var elem = $(e.target),
        items = elem.closest('.nav-hamb__item').siblings().children('.nav-hamb__link');

        if (!elem.hasClass('active')) {
            items.removeClass('active')
            elem.addClass('active')
        }
        hamb.removeClass('active');
        swipe.removeClass('active');
    });
});




// Этот пример из методички

// Parallax
// var section = $('.hero');

// $(window).scroll(function () {
//     var scrollTop = -($(window).scrollTop());
//     var speed = section.data('speed');
//     var coords = "50%" + scrollTop / speed + "px";
//     section.css('background-position', coords);
// });





// Пример из видео 

var parallax = (function() {
    var bg = document.querySelector('.hero__bg');
    var user = document.querySelector('.hero__user');
    var sectionText = document.querySelector('.hero__title');

    return {
        move: function(block, windowScroll, strafeAmount) {
            var strafe = windowScroll / -strafeAmount + '%';
            var transformString = 'translate3d(0,' + strafe + ', 0)';

            var style = block.style;

            // style.top = strafe;
            style.transform = transformString;
            style.webkitTransform = transformString;
        },

        init: function(wScroll) {
            this.move(bg, wScroll, 45);
            this.move(sectionText, wScroll, 20);
            this.move(user, wScroll, 3);
        }
    }
}());

window.onscroll = function() {
    var wScroll = window.pageYOffset;

    parallax.init(wScroll);
}

// Preloader
  var preloader = (function () {
    var
      preloader = $('.preloader'),
      persentsTotal = 0;
    var imgPath = $('*').map(function (ind, element) {
  
      var
        background = $(element).css('background-image'),
        path = '';
      var isImg = $(element).is('img');
  
      if (background != 'none') {
        path = background.replace('url("', '').replace('")','')
      }
  
      if (isImg) {
        path = $(element).attr('src')
      }
  
      if (path) return path;
    });
  
    var setPersents = function (total, current) {
  
      var persents = Math.ceil(current / total *100);
      $('.preloader__percents').text(persents + '%');
  
      if (persents >= 100) {
        preloader.fadeOut();
      }
    };
  
    var loadImages = function (images) {
      if (!images.length) preloader.fadeOut();
  
      images.forEach(function (img, i, images) {
        var fakeImages = $('<img>', {
          attr: {
            src: img
          }
        });
  
        fakeImages.on('load error', function () {
          persentsTotal++;
          setPersents(images.length, persentsTotal);
        })
      });
  
    };
  
    return {
      init: function () {
        var imgs = imgPath.toArray();
        loadImages(imgs);
      }
    }
  }());
  
  $(function () {
    preloader.init();
  });

//Form 
$(document).ready(function() {
  $('#auth').on('submit', function(e){
    e.preventDefault();
    var login = $('#login-input'),
        passw = $('#password-input'),
        user = $('#user-icon'),
        key = $('#key-icon'),
        log_icon = $('#login-icon'),
        pass_icon = $('#password-icon'),
        check = $('#check'),
        robot = $('#notrobot'),
        field = $('#field'),
        fail = $('#fail');

    if (login.val() === '' || login.val() === ' ') {
      login.css('border', '1px solid #e44845');
      log_icon.css('border-right', '1px solid #e44845');
      user.css('color', '#e44845');
      user.css('opacity', '1');
      login.removeClass('valid');
      login.addClass('invalid');
    } else {
      login.css('border', '1px solid #00bfa5');
      log_icon.css('border-right', '1px solid #00bfa5');
      user.css('color', '#00bfa5');
      user.css('opacity', '1');
      login.removeClass('invalid');
      login.addClass('valid');
    }

    if (passw.val() === '' || passw.val() === ' ') {
      passw.css('border', '1px solid #e44845');
      pass_icon.css('border-right', '1px solid #e44845');
      key.css('color', '#e44845');
      key.css('opacity', '1');
      passw.removeClass('valid');
      passw.addClass('invalid');
    }
    else {
      passw.css('border', '1px solid #00bfa5');
      pass_icon.css('border-right', '1px solid #00bfa5');
      key.css('color', '#00bfa5');
      key.css('opacity', '1');
      passw.removeClass('invalid');
      passw.addClass('valid');
    }

    if (login.hasClass('invalid') || (passw.hasClass('invalid'))) {
      field.text('Не все поля заполнены!');
    } else {
      field.text('');
    }

    if ( !(check.prop('checked') && (robot.prop('checked')))) {
      fail.text('Роботам тут не место!');
    } 
    else if (login.hasClass('valid') && (passw.hasClass('valid')) && !!(check.prop('checked') && (robot.prop('checked')))) {
      fail.text('К сабмиту готов!!!');
    }
  });
});

// Parallax main
var parallaxContainer = document.getElementById('parallax'),
    layers = parallaxContainer.children;

var moveLayers = function(e) {
  var initialX = (window.innerWidth / 2) - e.pageX;
  var initialY = (window.innerHeight / 2) - e.pageY;

  [].slice.call(layers).forEach(function(layer, index) {
    var
      divider = index / 100,
      positionX = initialX * divider,
      positionY = initialY * divider,
      bottomPosition = (window.innerHeight / 2) * divider,
      transformString = 'translate(' + positionX + 'px,' + positionY + 'px)',
      image = layer.firstElementChild;

    layer.style.transform = transformString;
    image.style.bottom = '-' + bottomPosition + 'px';
  });

};

window.addEventListener('mousemove', moveLayers);

