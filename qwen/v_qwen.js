let key //=process.env.API_KEY;
let data=document.getElementById('input')
console.log(data.value)
let btn=document.getElementById('btn');
//btn.addEventListener('click',()=>console.log(data.value))
fetch('../.env')
            .then(response => response.json())
            .then(config => {
                console.log('API Key:', config.API_KEY);
                key=config.API_KEY;
                console.log(url)                
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