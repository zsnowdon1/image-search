const BASE_URL = 'http://localhost:8080/photo';

export async function uploadPhoto(photo: any) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({photo})
    })
    return await response.json();
}