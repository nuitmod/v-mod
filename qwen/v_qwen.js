let url="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"
let data=document.getElementById('input')
console.log(data.value)
let btn=document.getElementById('btn');
//btn.addEventListener('click',()=>console.log(data.value))

function main(data_main){
fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${url}`,
      "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
      "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
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
    if (data.error) {
      console.error('Ошибка:', data.error.message);
    } else {
      console.log('Ответ:', data.choices[0].message.content);
      let out=document.getElementById("output")
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