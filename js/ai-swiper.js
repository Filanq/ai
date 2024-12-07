// Setup AI Swiper
const ai_swiper = new Swiper('.ai__inner', {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: {
        nextEl: '.ai-button-next',
        prevEl: '.ai-button-prev',
    },
    speed: 500
});