'use strict';

window.onload = function () {
    console.log('程序加载完毕');
    myCarousel();
};
/*********
*导航变色
*********/
var scroll_position = 0,
    ticking = false,
    header = document.getElementsByClassName('header')[0];
// console.log(header);
function changHeaderClass() {
    if (scroll_position > 20) {
        addClassName(header, 'srolled');
    } else {
        removeClassName(header, 'srolled');
    }
}
function addClassName(el, className) {
    if (!hasClassName(el, className)) {
        el.className = el.className.concat(' ' + className);
    }
}
function removeClassName(el, className) {
    if (hasClassName(el, className)) {
        el.className = el.className.replace(className, '');
    }
}
function hasClassName(el, className) {
    if (el.className.indexOf(className) >= 0) {
        return true;
    } else {
        return false;
    }
}
window.addEventListener('scroll', function () {
    // console.log('滚动了');
    scroll_position = window.scrollY;
    // console.log(scroll_position);
    // 事件节流
    if (!ticking) {
        window.requestAnimationFrame(function () {
            changHeaderClass();
            ticking = false;
        });
    }
    ticking = true;
});

/*********
* 轮播图
*********/
// 全局参数
var index = 0,
    carousel = document.getElementById('carousel'),
    banner = document.getElementById('carouselBanner'),
    imgs = banner.getElementsByClassName('banner-item'),
    dots = document.getElementById('carouselDots').getElementsByTagName('li'),
    len = imgs.length,
    timer;

// 配置参数
// TODO

function myCarousel() {
    // console.log('启动轮播');
    carousel.addEventListener('mouseover', function () {
        carouselStop();
    });
    carousel.addEventListener('mouseout', function () {
        carouselStart();
    });
    for (var i = 0; i < dots.length; i++) {
        dots[i].id = i;
        dots[i].addEventListener('click', function () {
            index = this.id;
            switchImg();
        });
    }
    carouselStart();
}

function carouselStart() {
    // console.log("轮播开始");
    timer = setInterval(function () {
        if (++index > len - 1) {
            index = 0;
        }
        // console.log(index);
        switchImg();
    }, 3000);
}

function carouselStop() {
    // console.log("轮播停止");
    clearInterval(timer);
}

// 核心函数
function switchImg() {
    // console.log("图片切换了");
    for (var i = 0; i < len; i++) {
        imgs[i].style.opacity = '0';
        dots[i].className = '';
    }
    imgs[index].style.opacity = '1';
    dots[index].className = 'active';
}
