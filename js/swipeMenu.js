$.fn.swipeMenu = function (options) {

    const param = $.extend({
        mobileOnly: true,
        wrapper: '.swipemenu-wrapper',
        overlay: '.swipemenu-wrapper .swipemenu-overlay',
        menu: '.swipemenu-wrapper .swipemenu',
        menuWidth: 300,
        opener: '[menu-opener]',
        closer: '[menu-closer]'
    }, options)

    let x1 = 0

    let action        = false
    let savedPosition = 0
    let distance      = 0

    // Init
    const maxDistance  = param.menuWidth
    const $menuWrapper = $(param.wrapper)
    const $menuOverlay = $(param.overlay)
    const $menu        = $(param.menu)
    const $opener      = $(param.opener)
    const $closer      = $(param.closer)
    const mobileOnly   = param.mobileOnly

    // Controllers
    function menuController(value, visibility) {
        $menuWrapper.css('visibility', visibility)
        $menu.css('transform', `translateX(${value}px)`)
        $menuOverlay.css('opacity', (1 / maxDistance * value))
    }

    // Actions
    window.addEventListener('mousedown', (e) => {
        if (!mobileOnly) touchstart(e.pageX)
    })
    window.addEventListener('touchstart', (e) => {
        touchstart(e.touches[0].pageX)
    })

    window.addEventListener('mouseup', (e) => {
        if (!mobileOnly) touchend()
    })
    window.addEventListener('touchend', (e) => {
        touchend()
    })

    window.addEventListener('mousemove', (e) => {
        if (!mobileOnly && action) touchmove(e.pageX)
    })
    window.addEventListener('touchmove', (e) => {
        if (action) touchmove(e.touches[0].pageX)
    })

    function touchstart(value) {
        x1 = value
        if (savedPosition == 0 && x1 < 50 || savedPosition > 0) {
            action = true
            $menuWrapper.addClass('disable-animation')
        }
    }

    function touchend() {
        action = false
        savedPosition = distance

        if (savedPosition >= (maxDistance / 2)) {
            menuController(maxDistance, 'visible')
            savedPosition = maxDistance
        } else {
            menuController(0, 'hidden')
            savedPosition = 0
        }
        $menuWrapper.removeClass('disable-animation')
    }

    function touchmove(x2) {
        distance = savedPosition + (x2 - x1)
        if (distance >= maxDistance) distance = maxDistance
        menuController(distance, 'visible')
    }

    $opener.click(()=> {
        menuController(maxDistance, 'visible')
        distance = maxDistance
        savedPosition = maxDistance
    })
    
    $closer.click(()=> {
        menuController(0, 'hidden')
        distance = 0
        savedPosition = 0
    })
    
    $menuOverlay.click(()=> {
        menuController(0, 'hidden')
        distance = 0
        savedPosition = 0
    })

}