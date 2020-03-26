export const apiGet = url => fetch(url, {
    headers: new Headers({
        'Accept': 'application/json'
    })
}).then(response => response.json())
    .then(responseJson => {
        if (responseJson.error) {
            return Promise.reject(responseJson)
        }
        return responseJson;
    });

export const apiPost = (url, obj) => fetch(`${url}`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json'
    })
}).then(response => response.json())
    .then(responseJson => {
        if (responseJson.error) {
            return Promise.reject(responseJson)
        }
        return responseJson;
    });

export const apiPostFormData = (url, formData) => fetch(url, {
    mode: 'no-cors',
    method: "POST",
    headers: new Headers({
        'Accept': 'application/json'
    }),
    body: formData
}).then(response => response.json())
    .then(responseJson => {
        if (responseJson.error) {
            return Promise.reject(responseJson)
        }

        return responseJson;
    });

export const apiPut = (url, id, obj) => fetch(`${url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(obj),
    headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json'
    })
}).then(response => response.json())
    .then(responseJson => {
        if (responseJson.error) {
            return Promise.reject(responseJson)
        }
        return responseJson;
    });

export const apiPutFormData = (url, id, formData) => fetch(`${url}/${id}`, {
    method: "PUT",
    body: formData,
    headers: new Headers({
        'Accept': 'application/json'
    })
}).then(response => response.json())
    .then(responseJson => {
        if (responseJson.error) {
            return Promise.reject(responseJson)
        }
        return responseJson;
    });

export const apiDelete = (url, id) => fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json'
    })
}).then(response => response.json())
    .then(responseJson => {
        if (responseJson.error) {
            return Promise.reject(responseJson)
        }

        return responseJson;
    });