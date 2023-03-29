const SwipeMenu = (options) => {
	const param = Object.assign(
		{
			mobileOnly: true,
			wrapper:    '.swipemenu-wrapper',
			overlay:    '.swipemenu-wrapper .swipemenu-overlay',
			menu:       '.swipemenu-wrapper .swipemenu',
			swipeArea:  15,
			menuWidth:  300,
			opener:     '[menu-opener]',
			closer:     '[menu-closer]',
		},
		options
	)

	let x1 = 0

	let action = false
	let savedPosition = 0
	let distance = 0

	// Init
	const maxDistance  = param.menuWidth
	const swipeArea    = param.swipeArea
	const $menuWrapper = document.querySelector(param.wrapper)
	const $menuOverlay = document.querySelector(param.overlay)
	const $menu        = document.querySelector(param.menu)
	const $opener      = document.querySelector(param.opener) || false
	const $closer      = document.querySelector(param.closer) || false
	const mobileOnly   = param.mobileOnly

	// Controllers
	const menuController = (value, visibility) => {
		$menuWrapper.style.visibility = visibility
		$menu.style.transform = `translateX(${value}px)`
		$menuOverlay.style.opacity = (1 / maxDistance) * value
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

	const touchstart = (value) => {
		x1 = value
		if ((savedPosition === 0 && x1 < swipeArea) || savedPosition > 0) {
			action = true
			$menuWrapper.classList.add('disable-animation')
		}
	}

	const touchend = () => {
		action = false
		savedPosition = distance

		if (savedPosition >= maxDistance / 2) {
			menuController(maxDistance, 'visible')
			savedPosition = maxDistance
		} else {
			menuController(0, 'hidden')
			savedPosition = 0
		}
		$menuWrapper.classList.remove('disable-animation')
	}

	const touchmove = (x2) => {
		distance = savedPosition + (x2 - x1)
		if (distance >= maxDistance) distance = maxDistance
		menuController(distance, 'visible')
	}

	if ($opener) $opener.addEventListener('click', () => {
		menuController(maxDistance, 'visible')
		distance = maxDistance
		savedPosition = maxDistance
	})

    
	if ($closer) $closer.addEventListener('click', () => {
		menuController(0, 'hidden')
		distance = 0
		savedPosition = 0
	})

	$menuOverlay.addEventListener('click', () => {
		menuController(0, 'hidden')
		distance = 0
		savedPosition = 0
	})
}
