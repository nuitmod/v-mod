let key = null;
let dataElement = document.getElementById('input');
let btn = document.getElementById('btn');

// Функция для загрузки API ключа с использованием async/await
async function load_api_key() {
    try {
        let response = await fetch('/api/config');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let config = await response.json();
        key = config.apiKey;
        //console.log('Loaded API Key:', key);
    } catch (error) {
        console.error('Ошибка при загрузке конфигурации:', error);
    }
}

// Загрузка API ключа при загрузке страницы
//load_api_key();
document.addEventListener('DOMContentLoaded', load_api_key);
// Функция для отправки запроса к внешнему API с использованием async/await
async function main(data_main) {
    if (!key) {
        console.error('API Key is not loaded yet.');
        return;
    }
    try {
        let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${key}`,
                "HTTP-Referer": "https://v-mod.vercel.app/qwen/", // Optional. Site URL for rankings on openrouter.ai.
                "X-Title": "v-mod", // Optional. Site title for rankings on openrouter.ai.
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "qwen/qwen-2-7b-instruct:free",
                "messages": [
                    {
                        "role": "user",
                        "content": data_main
                    }
                ]
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        let out = document.getElementById("output");
        if (data.error) {
            console.error('Ошибка:', data.error.message);
            out.innerHTML = data.error.message;
        } else {
            let qwen_answer=data.choices[0].message.content
            console.log('Ответ:', qwen_answer);
            out.innerHTML = qwen_answer;

            await blob(qwen_answer);
        }
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
    }
}


async function blob(dat) {
    let blob_res = await fetch("api/blob",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: dat }),
    })
    let data = await blob_res.json();
    console.log(data);
}

// Обработчик клика по кнопке с использованием async/await
btn.addEventListener('click', async () => {
    let dataValue = dataElement.value;
    if (!key) {
        console.warn('API Key is still loading...');
        setTimeout(() => main(dataValue), 1000);  // Повторная попытка через 1 секунду, если ключ еще не загружен
    } else {
        await main(dataValue);
    }
});

