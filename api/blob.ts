
import { put } from "@vercel/blob";
import { VercelRequest, VercelResponse } from '@vercel/node';
//console.log('test')
// export default async (req: VercelRequest, res: VercelResponse) => {
//     //const name = req.query.name || 'World';
//     //console.log('blob js connected')
//     if (req.method === 'POST') {
//         const body = JSON.parse(req.body);
//         res.status(200).json({ message: `Received: ${body.text}` });
//     } else {
//         res.status(405).json({ error: 'Method not allowed' });
//     }
//     // let msg = 'Hello vii!'
//     // const { url } = await put('articles/blob.txt', msg, { access: 'public' });
//     // res.status(200).json({ message: msg });
// };


export default async (req: VercelRequest, res: VercelResponse) => {
    if (req.method === 'POST') {
        try {
            const body = req.body as { text: string }; // Указываем тип для тела запроса
            let msg = body.text;
            const { url } = await put('articles/blob.txt', msg, { access: 'public' });
            res.status(200).json({ message: msg });
            //res.status(200).json({ message: `Received: ${body.text}` });
        } catch (error) {
            res.status(400).json({ error: 'Invalid JSON' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};



//добавить
// document.getElementById('uploadForm').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const fileInput = document.getElementById('fileInput');
//     const file = fileInput.files[0];

//     if (!file) {
//         alert('Выберите файл для загрузки.');
//         return;
//     }

//     try {
//         const blob = await put(file.name, file, {
//             access: 'public',
//         });

//         document.getElementById('output').innerHTML = `Файл загружен: <a href="${blob.url}" target="_blank">${blob.url}</a>`;
//     } catch (error) {
//         console.error('Ошибка при загрузке файла:', error);
//     }
// });

//показать все
// import { list } from '@vercel/blob';

// async function listFiles() {
//     const files = await list();
//     console.log('Файлы в Blob Storage:', files);
// }

// //удалить
// import { del } from '@vercel/blob';

// async function deleteFile(filePath) {
//     await del(filePath);
//     console.log(`Файл ${filePath} удален.`);
// }