window.addEventListener('load', function() {
    var focus = this.document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    var w = focus.offsetWidth;
    var index = 0;
    // 1.定时器轮播图片
    var timer = setInterval(function() {
        index++;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + -index * w + 'px)';
        console.log(1);
    }, 2000);
    // 2.无缝滚动-监听过渡完成后
    ul.addEventListener('transitionend', function() {
        if (index >= 3) {
            index = 0;
            var translatex = -index * w;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            // 倒着走
            index = 2;
            var translatex = -index * w;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 3.小圆点跟随变化
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    });
    // 4.手指滑动效果
    var startX = 0;
    var moveX = 0;
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    });
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    });
    ul.addEventListener('touchend', function() {
        if (Math.abs(moveX) > 50) {
            if (moveX > 0) {
                index--;
            } else {
                index++;
            }
            var translatex = -index * w + moveX;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
    });

    // 返回顶部操作goback
    var goback = document.querySelector('.goback');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goback.style.display = 'block';
        } else {
            goback.style.display = 'none';
        }
    });
    goback.addEventListener('click', function() {
        window.scroll(0, 0);
    });
});