/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = options.responseType;

  try {
    if (options.method === "GET") {
      xhr.open(options.method, options.url);
      xhr.send();
    } else {
      // данные из объекта data должны передаваться через объект FormData
      let formData = new FormData();
      for (const key in options.data) {
        formData.append(key, options.data[key]);
      }
      xhr.open(options.method, options.url);
      xhr.send(formData);
    }
  } catch (error) {
    console.log(error);
  }

  xhr.addEventListener("load", () => {
    if (xhr.response.success) {
      options.callback(null, xhr.response);
    } else {
      options.callback(xhr.response.error, xhr.response);
    }
  });

  xhr.addEventListener("error", () => {
    options.callback(`Ошибка загрузки: ${xhr.statusText}`);
  });
};
