window.onload = function() {
    console.log('程序加载完毕')
    myCarousel();
}
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
    console.log('启动轮播');
    carousel.addEventListener('mouseover', function() {
        carouselStop();
    });
    carousel.addEventListener('mouseout', function() {
        carouselStart();
    });
    for (var i = 0; i < dots.length; i++) {
        dots[i].id = i;
        dots[i].addEventListener('click', function () {
            index = this.id;
            switchImg();
        })
    }
    carouselStart();

}


function carouselStart() {
    console.log("轮播开始");
    timer = setInterval(function() {
        if (++index > len - 1) {
            index = 0;
        }
        console.log(index);
        switchImg();
    }, 3000)
}

function carouselStop() {
    console.log("轮播停止");
    clearInterval(timer)
}

// 核心函数
function switchImg() {
    console.log("图片切换了");
    for (var i = 0; i < len; i++) {
        imgs[i].style.opacity = '0';
        dots[i].className = '';
    }
    imgs[index].style.opacity = '1';
    dots[index].className = 'active';
}
