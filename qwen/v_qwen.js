/*
let key //=process.env.API_KEY;
let data=document.getElementById('input')
console.log(data.value)
let btn=document.getElementById('btn');
//btn.addEventListener('click',()=>console.log(data.value))
// fetch('../.env')
//             .then(response => response.json())
//             .then(config => {
//                 console.log('API Key:', config.API_KEY);
//                 key=config.API_KEY;
//                 console.log(url)                
//             })
//             .catch(error => {
//                 console.error('Ошибка при загрузке конфигурации:', error);
//             });
//             console.log(key)
fetch('../api/config')
.then(response => response.json())
.then(config => {
    console.log('API Key:', config.apiKey);
    key=config.API_KEY;
    console.log(key)
})
.catch(error => {
    console.error('Ошибка при загрузке конфигурации:', error);
});
console.log(key)
function main(data_main){
fetch("https://openrouter.ai/api/v1/chat/completions", {
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
  })
  .then(response => response.json())
  .then(data => {
    let out=document.getElementById("output")
    if (data.error) {
      console.error('Ошибка:', data.error.message);
      out.innerHTML=data.error.message
    } else {
      console.log('Ответ:', data.choices[0].message.content);
      out.innerHTML=data.choices[0].message.content;
    }
  })
  .catch(error => {
    console.error('Ошибка при отправке запроса:', error);
  });
}

//main(data)

btn.addEventListener('click', ()=>main(data.value))
// let out=document.getElementById("output")
// out.innerHTML=data.value;
*/
/*
let key = null;
let dataElement = document.getElementById('input');
let btn = document.getElementById('btn');

// Функция для загрузки API ключа
function loadApiKey() {
    fetch('/api/config')
        .then(response => response.json())
        .then(config => {
            console.log('API Key:', config.apiKey);
            key = config.apiKey;
            console.log('Loaded API Key:', key);
        })
        .catch(error => {
            console.error('Ошибка при загрузке конфигурации:', error);
        });
}

// Загрузка API ключа при загрузке страницы
loadApiKey();

// Функция для отправки запроса к внешнему API
function main(data_main) {
    if (!key) {
        console.error('API Key is not loaded yet.');
        return;
    }

    fetch("https://openrouter.ai/api/v1/chat/completions", {
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
    })
    .then(response => response.json())
    .then(data => {
        let out = document.getElementById("output");
        if (data.error) {
            console.error('Ошибка:', data.error.message);
            out.innerHTML = data.error.message;
        } else {
            console.log('Ответ:', data.choices[0].message.content);
            out.innerHTML = data.choices[0].message.content;
        }
    })
    .catch(error => {
        console.error('Ошибка при отправке запроса:', error);
    });
}

// Обработчик клика по кнопке
btn.addEventListener('click', () => {
    let dataValue = dataElement.value;
    if (!key) {
        console.warn('API Key is still loading...');
        setTimeout(() => main(dataValue), 1000);  // Повторная попытка через 1 секунду, если ключ еще не загружен
    } else {
        main(dataValue);
    }
});
*/ 

let key = null;
let dataElement = document.getElementById('input');
let btn = document.getElementById('btn');

// Функция для загрузки API ключа с использованием async/await
async function loadApiKey() {
    try {
        let response = await fetch('/api/config');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let config = await response.json();
        console.log('API Key:', config.apiKey);
        key = config.apiKey;
        console.log('Loaded API Key:', key);
    } catch (error) {
        console.error('Ошибка при загрузке конфигурации:', error);
    }
}

// Загрузка API ключа при загрузке страницы
loadApiKey();

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
            console.log('Ответ:', data.choices[0].message.content);
            out.innerHTML = data.choices[0].message.content;
        }
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
    }
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