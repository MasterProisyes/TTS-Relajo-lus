// document.getElementById('convertBtn').addEventListener('click', async () => {
//     const text = document.getElementById('paragraph').innerText;
//     const apiKey = 'fe65a8d86934a8c2a6dc494065e6ec8a'; // Reemplaza con tu clave API
//     const voiceId = 'N2lVS1w4EtoT3dr4eOWO'; // ID de la voz que deseas usar

//     const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'xi-api-key': apiKey
//         },
//         body: JSON.stringify({
//             text: text,
//             model_id: 'eleven_multilingual_v2'
//         })
//     });

//     if (!response.ok) {
//         console.error('Error:', response.statusText);
//         return;
//     }

//     const audioBlob = await response.blob();
//     const audioUrl = URL.createObjectURL(audioBlob);
//     const audioElement = document.getElementById('audio');
//     audioElement.src = audioUrl;
// });

document.getElementById('convertBtnOsborne').addEventListener('click', async () => {
    const text = document.getElementById('paragraph').innerText;
    const apiKey = 'fe65a8d86934a8c2a6dc494065e6ec8a'; // Reemplaza con tu clave API
    const voiceId = 'Vpv1YgvVd6CHIzOTiTt8'; // ID de la voz que deseas usar

    const MAX_CHARACTERS = 864; // Máximo número de caracteres por solicitud

    // Función para dividir el texto en partes más pequeñas
    function splitTextIntoChunks(text, chunkSize) {
        const chunks = [];
        let startIndex = 0;
        while (startIndex < text.length) {
            chunks.push(text.slice(startIndex, startIndex + chunkSize));
            startIndex += chunkSize;
        }
        return chunks;
    }

    const textChunks = splitTextIntoChunks(text, MAX_CHARACTERS);

    for (let i = 0; i < textChunks.length; i++) {
        try {
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': apiKey // Verifica que el nombre de la cabecera sea el correcto según la documentación
                },
                body: JSON.stringify({
                    text: textChunks[i],
                    model_id: 'eleven_multilingual_v2' // Asegúrate de que este model_id sea el correcto si es necesario
                })
            });

            if (!response.ok) {
                // Log detallado del error
                console.error('Error:', response.status, response.statusText);
                const errorText = await response.text();
                console.error('Error details:', errorText);
                return;
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioElement = document.createElement('audio');
            audioElement.src = audioUrl;
            audioElement.controls = true;
            document.body.appendChild(audioElement);

        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
});

document.getElementById('playBtn').addEventListener('click', () => {
    const audioUrl = 'Leccion1Milagro.mp3'; // Reemplaza con la ruta real de tu archivo MP3
    const audioElement = document.getElementById('audioPlayer');
    audioElement.src = audioUrl;
    audioElement.play(); // Reproduce el audio automáticamente
});

