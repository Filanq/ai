// GPT Functional
let gpt_query = document.getElementById('gpt_query');
let form = document.querySelector('.gpt__query');
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
            <div class="gpt__message gpt__message_user grid grid-row js-e jc-e ai-c">
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
            chat_window.innerHTML += `
                <div class="gpt__message gpt__message_bot grid grid-row jc-s ai-c">
                    <img src="img/icons/gigachat.png" alt="GPT">
                    <p class="gpt-message__inner h7 w-200"></p>
                </div>
            `;
            let msgs = document.querySelectorAll('.gpt-message__inner');
            msgs[msgs.length - 1].textContent = results.message;
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