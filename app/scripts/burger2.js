// Hamburger Menu
const burger = document.querySelector('.HamburgerMenu__Hamburger');
const topBun = document.querySelector('.HamburgerMenu__TopBun');
const bottomBun = document.querySelector('.HamburgerMenu__BottomBun');
const dropDown = document.querySelector('.HamburgerMenu__Dropdown');
const html = document.querySelector('html');
let isOpen = false;

burger.addEventListener('click', () => {
    if (!isOpen) {
        burger.classList.add('open');
        topBun.classList.add('open');
        bottomBun.classList.add('open');
        dropDown.classList.add('open');
        html.classList.add('noScroll');
        isOpen = true;
    } else {
        burger.classList.remove('open');
        topBun.classList.remove('open');
        bottomBun.classList.remove('open');
        dropDown.classList.remove('open');
        html.classList.remove('noScroll');
        isOpen = false;
    }
});

// Mobile Theme Switcher for cart.html 
const icon = document.querySelector('.HamburgerMenu__ThemeWrapper');
const sunIcon = document.querySelector('.HamburgerMenu__SunIcon');
const moonIcon = document.querySelector('.HamburgerMenu__MoonIcon');
const footer = document.querySelector('.FooterGroup');
let clicked = false;

icon.addEventListener('click', () => {
    if (!clicked) {
        sunIcon.classList.remove('switch1');
        moonIcon.classList.add('switch2');
        html.classList.add('dark');
        footer.classList.add('dark');
        clicked = true;
    } else {
        sunIcon.classList.add('switch1');
        moonIcon.classList.remove('switch2');
        html.classList.remove('dark');
        footer.classList.remove('dark');
        clicked = false;
    }
});

// Desktop Theme Switching for cart.html

const desktopSunIcon = document.querySelector('.ThemeSwitcher__SunIcon');
const desktopMoonIcon = document.querySelector('.ThemeSwitcher__MoonIcon');
const desktopIcon = document.querySelector('.ThemeSwitcher__Wrapper');
let selected = false;

desktopIcon.addEventListener('click', () => {
    if (!selected) {
        desktopSunIcon.classList.remove('switch1');
        desktopMoonIcon.classList.add('switch2');
        html.classList.add('dark');
        footer.classList.add('dark');
        selected = true;
    } else {
        desktopSunIcon.classList.add('switch1');
        desktopMoonIcon.classList.remove('switch2');
        html.classList.remove('dark');
        footer.classList.remove('dark');
        selected = false;
    }
})

