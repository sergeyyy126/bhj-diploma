/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    if (options.method === 'GET') {
        let url = options.url;
        if (options.data) {
            url += '?'
            for (let [key, value] of Object.entries(options.data)) {
                url += `${key}=${value}&&`
            }
        }
        xhr.open(options.method, url);
        xhr.responseType = 'json';
        xhr.send();
    } else {
        xhr.open(options.method, options.url);
        xhr.responseType = 'json';
        if (options.data) {
            const formData = new FormData();
            for (let [key, value] of Object.entries(options.data)) {
                formData.append(key, value);
            }
            xhr.send(formData);
        } else {
            xhr.send();
        }
    }

    xhr.addEventListener('load', () => {
        options.callback(xhr.response.error, xhr.response);
    });
};
