const navbar = document.querySelector('.Header');
const themeswitcher = document.querySelector('.ThemeSwitcher__Wrapper');

window.addEventListener('scroll', () => {
    let scrolled = window.pageYOffset;

    if (scrolled >= 20) {
        navbar.classList.add('HeaderScrolled');
        themeswitcher.classList.add('Scrolled');
    } else {
        navbar.classList.remove('HeaderScrolled');
        themeswitcher.classList.remove('Scrolled');
    }
});