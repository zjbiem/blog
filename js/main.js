/**
 * some JavaScript code for this blog theme
 */
/* jshint asi:true */

/////////////////////////header////////////////////////////
/**
 * clickMenu
 */
(function () {
    if (window.innerWidth <= 770) {
        var menuBtn = document.querySelector('#headerMenu')
        var nav = document.querySelector('#headerNav')
        menuBtn.onclick = function (e) {
            e.stopPropagation()
            if (menuBtn.classList.contains('active')) {
                menuBtn.classList.remove('active')
                nav.classList.remove('nav-show')
            } else {
                nav.classList.add('nav-show')
                menuBtn.classList.add('active')
            }
        }
        document.querySelector('body').addEventListener('click', function () {
            nav.classList.remove('nav-show')
            menuBtn.classList.remove('active')
        })
    }
}());

//////////////////////////back to top////////////////////////////
(function () {
    var backToTop = document.querySelector('.back-to-top')
    var backToTopA = document.querySelector('.back-to-top a')
    // console.log(backToTop);
    window.addEventListener('scroll', function () {

        // 页面顶部滚进去的距离
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)

        if (scrollTop > 200) {
            backToTop.classList.add('back-to-top-show')
        } else {
            backToTop.classList.remove('back-to-top-show')
        }
    })

    // backToTopA.addEventListener('click',function (e) {
    //     e.preventDefault()
    //     window.scrollTo(0,0)
    // })
}());


//////////////////////////scrollPos//////////////////////////////
(function () {
    if (document.getElementById('content-side')) {
        var $navs = document.getElementById('content-side').querySelectorAll('a'),          // 导航
            $sections = document.querySelector('.left').querySelectorAll('h1,h2,h3,h4,h5'),       // 模块
            navLength = $navs.length - 1;
        window.addEventListener('scroll', function (e) {
            e.stopPropagation()
            var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
                len = navLength;

            function getOffset(el) {
                const box = el.getBoundingClientRect();
                return {
                    top: box.top + window.pageYOffset - document.documentElement.clientTop,
                    left: box.left + window.pageXOffset - document.documentElement.clientLeft
                }
            }

            for (; len > -1; len--) {
                var that = $sections[len];
                if (scrollTop >= getOffset(that).top) {
                    $navs.forEach(function (e) {
                        e.classList.remove('current')
                    })
                    $navs[len].classList.add('current')
                    // console.log($navs[len].getAttribute('href'))
                    // location.href = $navs[len].getAttribute('href');
                    var navATop = $navs[len].offsetTop,
                        navBox = document.getElementById('content-side'),
                        navBoxClientHeight = navBox.clientHeight,
                        navBoxScrollTop = navBox.scrollTop,
                        navBoxScrollHeight = navBox.scrollHeight
                    // console.log(document.getElementById('content-side').scrollHeight)
                    // console.log('navATop:' + navATop)
                    // console.log('navBoxTop:' + navBoxTop)
                    // console.log(document.getElementById('content-side').scrollTop)
                    if (navATop >= navBoxClientHeight) {
                        // if (navATop < navBoxScrollHeight - navBoxClientHeight) {
                        //     console.log(navATop/navBoxScrollHeight)
                        //     navBox.scrollTop = navBoxClientHeight
                        // } else {
                        //     navBox.scrollTop = navBoxScrollTop
                        // }

                    } else {
                        // if (navATop > navBoxScrollHeight - navBoxClientHeight) {
                        //     navBoxScrollTop -= navBoxClientHeight
                        // } else {
                        //     navBoxScrollTop = 0
                        // }
                    }
                    if (navATop < 0) {
                        // document.getElementById('content-side').scrollTop = -navATop
                    }
                    break;
                }
            }
        })
    }
}())