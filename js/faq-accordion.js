// FAQ Accordion Functional
const GAP = 0;

let accordions = document.querySelectorAll('.faq__accordion');
accordions.forEach(accordion => {
    let head = accordion.querySelector('.faq-accordion__head');
    let content = accordion.querySelector('.faq-accordion__content');
    let head_box = head.getBoundingClientRect();

    content.style.top = `${head_box.height + GAP}px`;

    let content_box = content.getBoundingClientRect();

    accordion.style.height = `${head_box.height}px`;
    accordion.style.backgroundPosition = `center ${head_box.height + 150}px`;

    head.addEventListener("click", () => {
        if(accordion.className.includes('faq__accordion_active')){
            accordion.style.height = `${head_box.height}px`;
            accordion.style.backgroundPosition = `center ${head_box.height + 150}px`;
            accordion.classList.remove('faq__accordion_active');
        }
        else{
            accordions.forEach(accordion_for_close => {
                if(accordion_for_close !== accordion){
                    let head = accordion_for_close.querySelector('.faq-accordion__head');
                    let head_box = head.getBoundingClientRect();
                    accordion_for_close.classList.remove('faq__accordion_active');
                    accordion_for_close.style.height = `${head_box.height}px`;
                    accordion_for_close.style.backgroundPosition = `center ${head_box.height + 150}px`;
                }
            });
            accordion.classList.add('faq__accordion_active');
            accordion.style.height = `${head_box.height + content_box.height + GAP}px`;
            accordion.style.backgroundPosition = `center ${head_box.height + content_box.height + GAP - 150}px`;
        }
    });
});