
# SwipeMenu

Lightweight JS library for implementing a panel menu using swipes

## How to use

Use date attributes to open / close menu: [menu-opener], [menu-closer]

#### Use an html structure like this:

You can rename classes in your own way.

```
<div class="swipemenu-wrapper">
    <div class="swipemenu-overlay"></div>
    <div class="swipemenu">
        <!-- Your content -->
        <button menu-closer>Close menu</button>
    </div>
</div>

<script src="js/SwipeMenu.min.js"></script>
```

#### You also can use CDN:

```
<script src="https://cdn.jsdelivr.net/gh/wladislaw353/SwipeMenu@2.1.0/js/SwipeMenu.min.js"></script>
```

#### Initialization:

```
SwipeMenu()
```
#### Options:

Use options if you need. Indicate the width of the menu, class names, if you changed them.
Switch ```mobileOnly``` to false if the swipe should work on deskop.


```
SwipeMenu({
    mobileOnly: true,
    wrapper:    '.swipemenu-wrapper',
    overlay:    '.swipemenu-wrapper .swipemenu-overlay',
    menu:       '.swipemenu-wrapper .swipemenu',
    menuWidth:  300,
    opener:     '[menu-opener]',
    closer:     '[menu-closer]'
})
```

#### Use these styles for your menu in SASS/LESS:

Control the transition of the menu: ```all .3s ease```, change it for classes ```.swipemenu-overlay``` and ```.swipemenu```.

```
.swipemenu-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    visibility: hidden;
    .swipemenu-overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0;
        background-color: rgba(12, 12, 12, 0.5);
        backdrop-filter: blur(5px);
        transition: all .3s ease;
    }
    .swipemenu {
        background-color: #fff;
        position: fixed;
        top: 0;
        bottom: 0;
        left: -300px;
        width: 300px;
        padding: 15px;
        box-sizing: border-box;
        transition: all .3s ease;
    }
    &.disable-animation {
        .swipemenu-overlay, .swipemenu {
            transition: none;
        }
    }
}
```
