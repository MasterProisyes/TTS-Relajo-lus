import requests

# Reemplaza 'YOUR_API_KEY' con tu clave API de Eleven Labs
API_KEY = '22fa48c63ca4881ec17df120eec0033c'
API_URL = 'https://api.elevenlabs.io/v1/voices'

# Función para obtener todas las voces disponibles
def get_voices(api_key):
    headers = {
        'xi-api-key': api_key,  # Este puede ser el formato correcto del encabezado, según la documentación de Eleven Labs
        'Content-Type': 'application/json'
    }
    try:
        response = requests.get(API_URL, headers=headers)
        response.raise_for_status()  # Esto lanzará un error para códigos de estado 4xx/5xx
        return response.json()
    except requests.exceptions.HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')  # Detalles del error HTTP
        print(f'Response body: {response.text}')  # Cuerpo de la respuesta
    except requests.exceptions.RequestException as err:
        print(f'Error occurred: {err}')  # Otros errores de la solicitud
    return None

# Función para encontrar el ID de voz de "Martin Osborne 2"
def find_voice_id(voices, voice_name):
    for voice in voices['voices']:
        if voice['name'].lower() == voice_name.lower():
            return voice['voice_id']
    return None

# Obtener la lista de voces
voices_response = get_voices(API_KEY)
if voices_response:
    # Buscar el ID de la voz "Martin Osborne 2"
    voice_id = find_voice_id(voices_response, 'Martin Osborne 2')
    if voice_id:
        print(f'ID de la voz "Martin Osborne 2": {voice_id}')
    else:
        print('Voz "Martin Osborne 2" no encontrada.')
else:
    print('No se pudieron obtener las voces.')
