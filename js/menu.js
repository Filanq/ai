// Burger Menu And Scroll Checker Script
let menu = document.querySelector('.menu__section');

function checkScrollForMenu(event) {
    if(window.scrollY >= 100){
        menu.classList.add('menu__section_filled');
    }
    else{
        menu.classList.remove('menu__section_filled');
    }
}
checkScrollForMenu();

window.addEventListener("scroll", checkScrollForMenu);

// GPT Window Open
let gpt_window = document.querySelector('.gpt__section');
let gpt_open = document.querySelectorAll('.gpt-open')
let gpt_close = document.querySelector('.gpt__close');

gpt_close.addEventListener("click", () => {
    gpt_window.classList.remove('gpt__section_active');
    document.body.style.overflowY = '';
});
gpt_open.forEach(btn => {
    btn.addEventListener("click", () => {
        gpt_window.classList.add('gpt__section_active');
        document.body.style.overflowY = 'hidden';
    });
});
