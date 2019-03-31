const getHeaders = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
}

const checkStatus = (status) => {
    const accessStatus = [200];
    return accessStatus.includes(status);
}


export function request(path, method, params) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/${path}`, {
            method: method,
            credentials: 'include',
            headers: getHeaders(),
            body: JSON.stringify(params)
        })
            .then(response => checkStatus(response.status)
                ? response.json().then(resp =>resolve(resp))
                : response.json().then(resp => reject(resp))
            )

    })
}