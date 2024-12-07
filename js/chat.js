// GPT Functional
let gpt_query = document.getElementById('gpt_input');
let form = document.querySelector('.gpt__form');
let error = document.querySelector('.gpt__error');
let chat_window = document.querySelector('.gpt__chat');
let key = '';
let history = [
    {
        "role": 'assistant',
        'content': "Привет! Я - ChatGPT! Задавай мне любой вопрос, и я отвечу на него!"
    }
];

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let message = gpt_query.value.trim();
    if(!message){
        error.textContent = 'Введите запрос';
        error.classList.add('gpt__error_active');
    }
    else{
        gpt_query.value = '';
        error.classList.remove('gpt__error_active');

        chat_window.innerHTML += `
            <div data-aos="fade-left" class="gpt__message gpt__message_user grid grid-row js-e jc-e ai-c">
                <p class="gpt-message__inner h7 w-200 ta-e">
                    ${message}
                </p>
                <img src="img/icons/user.png" alt="User">
            </div>
        `;
        history.push({
            "role": 'user',
            "content": message
        });

        chat_window.scrollBy(0, 1000);
        let results = await fetch(window.origin + '/api/gpt', {
            method: 'POST',
            body: JSON.stringify({
                history: history,
                key: key
            }),
            headers: {"Content-Type": 'application/json'}
        });

        results = await results.json();

        if(results.success){
            let unique_animation_id = `${Math.round(Math.random() * 9999999999999) + 10000}`;
            chat_window.innerHTML += `
                <div data-aos="fade-right" class="gpt__message gpt__message_bot grid grid-row js-s jc-s ai-c">
                    <img src="img/icons/gigachat.png" alt="GPT">
                    <p data-gsap="${unique_animation_id}" class="gpt-message__inner h7 w-200"></p>
                </div>
            `;

            let msgs = document.querySelectorAll('.gpt-message__inner');
            gsap.to(`.gpt-message__inner[data-gsap="${unique_animation_id}"]`, {
                duration: results.message.length / 50,
                text: results.message,
                ease: "none",
                delay: 0.3
            });

            key = results.key;

            history.push({
                "role": 'assistant',
                "content": results.message
            });

            chat_window.scrollBy(0, 1000);
        }
        else{
            error.textContent = results.message;
            error.classList.add('gpt__error_active');
        }
    }
})