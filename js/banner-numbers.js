// Banner Numbers Counting Animation
const DURATION = 1000;
const DELAY = 200;

let numbers = document.querySelectorAll('.banner-number__title');
numbers.forEach(number => {
    let max = Number(number.children[0].textContent);
    number.children[0].textContent = '0';

    setTimeout(() => {
        let interval = setInterval(() => {
            let current = Number(number.children[0].textContent) + 1;
            if(current >= max){
                number.children[0].textContent = `${max}`;
                clearInterval(interval);
            }
            else{
                number.children[0].textContent = `${current}`;
            }
        }, DURATION / max);
    }, DELAY)
});