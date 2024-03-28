
export const UserRooms = (url, body) => {
    var request = fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    return request;
}