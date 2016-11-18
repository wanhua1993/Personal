/* time */
~function formatTime() {
    window.onload = function () {
        var $time = $('.time'),
            $date = $('.date');
        setInterval(fnTime, 1000);
        fnTime();
        function fnTime() {
            var myTime = new Date();
            var iYear = myTime.getFullYear();
            var iMonth = myTime.getMonth() + 1;
            var iDate = myTime.getDate();
            var iWeek = myTime.getDay();
            var iHours = myTime.getHours();
            var iMin = myTime.getMinutes();
            var iSec = myTime.getSeconds();
            var str = '';
            if (iWeek == 0) iWeek = "星期日";
            if (iWeek == 1) iWeek = '星期一';
            if (iWeek == 2) iWeek = '星期二';
            if (iWeek == 3) iWeek = '星期三';
            if (iWeek == 4) iWeek = '星期四';
            if (iWeek == 5) iWeek = '星期五';
            if (iWeek == 6) iWeek = '星期六';
            str = toTwo(iHours) + ' : ' + toTwo(iMin) + ' : ' + toTwo(iSec);
            var str1 = iMonth + '月' + iDate + '日 ' + iWeek;
            $time.html(str);
            $date.html(str1);
        }
    };
    function toTwo(n) {
        return n < 10 ? "0" + n : "" + n;
    }
}();
/* loading */
var loadingRender = (function () {
    var ary = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    var $loading = $('#loading'),
        $progressBox = $loading.find('.progressBox'),
        $lock = $('#lock');
    var step = 0,
        total = ary.length;
    return {
        init: function () {
            $.each(ary, function (index, item) {
                step++;
                $progressBox.css('width', step / total * 100 + '%');
                if (step === total) {
                    window.setTimeout(function () {
                        $loading.css('display', 'none');
                        $lock.css('display', 'block');
                    }, 2000);
                }
            })
        }
    }
})();
loadingRender.init();
/* locking */
var lockingRender = (function () {
    var $lock = $('#lock'),
        $first = $('#first');
    var $icon = $('#icon'),
        $iconAll = $('.iconAll');

    function touch(box) {
        box.on('touchstart', function (ev) {
            var point = ev.changedTouches[0];
            box.x = box.offset().left;
            box['strX'] = point.pageX;
        });
        box.on('touchmove', function (ev) {
            var point = ev.changedTouches[0];
            box['changeX'] = point.pageX - box['strX'];
            var left = (box['changeX'] + box.x);
            var minL = 50;
            var maxL = 240;
            left = left < minL ? minL : left > maxL ? maxL : left;
            box.css('left', left);
        });
        box.on('touchend', function (e) {
            if (box.css('left') >= '200px') {
                $lock.css('display', 'none');
                $first.css('display', 'block');
                dragAll($icon);
                $icon.css('display', 'block');
            }
        })
    }

    return {
        init: function () {
            var $slide = $('#slide');
            touch($slide);
            $icon.singleTap(function () {
                $iconAll.css('display', 'block');
            });
            $icon.doubleTap(function () {
                $iconAll.css('display', 'none');
            })
        }
    }
})();
lockingRender.init();
/* drag */
function dragAll(box) {
    box.on('touchstart', function (ev) {
        var point = ev.changedTouches[0];
        box.x = box.offset().left;
        box.y = box.offset().top;
        box['strX'] = point.pageX;
        box['strY'] = point.pageY;
    });
    box.on('touchmove', function (ev) {
        var point = ev.changedTouches[0];
        box['changeX'] = point.pageX - box['strX'];
        box['changeY'] = point.pageY - box['strY'];
        var left = (box['changeX'] + box.x);
        var top = (box['changeY'] + box.y);
        var minL = 0;
        var minT = 0;
        var maxL = 300;
        var maxT = 600;
        left = left < minL ? minL : left > maxL ? maxL : left;
        top = top < minT ? minT : top > maxT ? maxT : top;
        box.css('left', left);
        box.css('top', top);

    });
    box.on('touchend', function (e) {
        console.log(111);
    })
}
/* first */
var firstRender = (function () {
    var $personal = $('#personal'),
        $personalInfo = $('#personalInfo'),
        $hobby = $('#hobby'),
        $hobbyAll = $('#hobbyAll');
    var $first = $('#first');

    return {
        init: function () {
            $personal.singleTap(function () {
                $personalInfo.css('display', 'block');
            });
            $hobby.singleTap(function () {
                $hobbyAll.css('display', 'block');
            });
            $first.doubleTap(function () {
                $personalInfo.css('display', 'none');
            });
            $first.doubleTap(function () {
                $hobbyAll.css('display', 'none');
            });
            dragAll($personal);
            dragAll($hobby);
        }
    }
})();
firstRender.init();
/* slide */
var flag = true;
var slideRender = (function () {
    var $first = $('#first'),
        $second = $('#second');

    function touch(box) {
        box.on('touchstart', function (ev) {
            var point = ev.changedTouches[0];
            box['strX'] = point.pageX;
            box['strY'] = point.pageY;
            box['changeX'] = 0;
            box['changeY'] = 0;
        }, false);
        box.on('touchmove', function (ev) {
            var point = ev.changedTouches[0];
            box['changeX'] = point.pageX - box['strX'];
            box['changeY'] = point.pageY - box['strY'];
        }, false);
        box.on('touchend', function (ev) {
            if (box['changeX'] > 150 || box['changeY'] > 150) {
                box.css('display', 'none');
                if (flag) {
                    box.next().css('display', 'block');
                    flag = false;
                } else {
                    box.css('display', 'block');
                }
            } else if (box['changeX'] < -200 || box['changeY'] < -200) {
                box.css('display', 'none');
                if (!flag) {
                    box.prev().css('display', 'block');
                    flag = true;
                } else {
                    box.css('display', 'block');
                }
            }
        }, false);
    }

    return {
        init: function () {
            touch($first);
            touch($second);
        }
    }
})();
slideRender.init();
/* second */
var secondRender = (function () {
    var $skill = $('.skill'),
        $item = $('.item'),
        $job = $('.job');
    var $skillAll = $('.skillAll'),
        $second = $('#second');

    return {
        init: function () {
            dragAll($skill);
            dragAll($item);
            dragAll($job);
            $skill.singleTap(function () {
                $skillAll.css('display', 'block');
            });
            $second.doubleTap(function () {
                $skillAll.css('display', 'none');
            });
        }
    }
})();
secondRender.init();
/* cube */
var cubeRender = (function () {
    var $skillAll = $('#skillAll'),
        $cube = $skillAll.children('.cube'),
        $cubeLis = $cube.children('li');

    function isSwipe(changeX, changeY) {
        return Math.abs(changeX) > 30 || Math.abs(changeY) > 0;
    }

    function start(ev) {
        var point = ev.touches[0];
        $(this).attr({
            strX: point.clientX,
            strY: point.clientY,
            changeX: 0,
            changeY: 0
        });
    }

    function move(ev) {
        var point = ev.touches[0];
        var changeX = point.clientX - $(this).attr('strX'),
            changeY = point.clientY - $(this).attr('strY');
        $(this).attr({
            changeX: changeX,
            changeY: changeY
        });
    }

    function end(ev) {
        var changeX = parseFloat($(this).attr('changeX')),
            changeY = parseFloat($(this).attr('changeY'));
        var rotateX = parseFloat($(this).attr('rotateX')),
            rotateY = parseFloat($(this).attr('rotateY'));
        if (isSwipe(changeX, changeY) === false) return;
        rotateX = rotateX - changeY / 3;
        rotateY = rotateY + changeX / 3;
        $(this).attr({
            rotateX: rotateX,
            rotateY: rotateY
        }).css('transform', 'scale(0.8) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
    }

    return {
        init: function () {
            $cube.attr({
                rotateX: -35,
                rotateY: 45
            }).on('touchstart', start).on('touchmove', move).on('touchend', end);

            //->每一个页面的点击操作
            $cubeLis.singleTap(function () {
                var index = $(this).index();
                $skillAll.css('display', 'none');
                swiperRender.init(index);
            });
        }
    }
})();
cubeRender.init();
/*--SWIPER--*/
var swiperRender = (function () {
    var $swiper = $('#swiper'),
        $makisu = $('#makisu'),
        $return = $swiper.children('.return');

    function change(example) {
        var slidesAry = example.slides,
            activeIndex = example.activeIndex;
        if (activeIndex === 0) {
            $makisu.makisu({
                selector: 'dd',
                overlap: 0.6,
                speed: 0.8
            });
            $makisu.makisu('open');
        } else {
            $makisu.makisu({
                selector: 'dd',
                overlap: 0.6,
                speed: 0
            });
            $makisu.makisu('close');
        }
        $.each(slidesAry, function (index, item) {
            if (index === activeIndex) {
                item.id = 'page' + (activeIndex + 1);
                return;
            }
            item.id = null;
        });
    }

    return {
        init: function (index) {
            $swiper.css('display', 'block');
            var mySwiper = new Swiper('.swiper-container', {
                effect: 'coverflow',
                onTransitionEnd: change,
                onInit: change
            });
            index = index || 0;
            mySwiper.slideTo(index, 0);
            $return.singleTap(function () {
                $swiper.css('display', 'none');
                $('#skillAll').css('display', 'block');
            });
        }
    }
})();
/* music */
var beyond = document.querySelector('#beyond');
var music = document.querySelector('.music');
music.addEventListener('click',function (){
    window.setTimeout(function () {
        beyond.addEventListener('canplay', function () {
            music.style.opacity = 1;
            beyond.play();
        });
    }, 1000);
    music.addEventListener('click', function () {
        if (beyond.paused) {
            beyond.play();
        } else {
            beyond.pause();
        }
    });
},false);
