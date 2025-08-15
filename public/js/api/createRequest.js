/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const method = (options.method || "GET").toUpperCase();
  const urlBase = options.url || "";
  const callback =
    typeof options.callback === "function" ? options.callback : () => {};
  const xhr = new XMLHttpRequest();

  let url = urlBase;

  if (method === "GET" && options.data && typeof options.data === "object") {
    const params = Object.keys(options.data)
      .map(
        (k) => encodeURIComponent(k) + "=" + encodeURIComponent(options.data[k])
      )
      .join("&");
    if (params) {
      url += (url.indexOf("?") === -1 ? "?" : "&") + params;
    }
  }

  xhr.open(method, url);
  xhr.responseType = "json";
  xhr.timeout = options.timeout || 10000;

  xhr.onload = () => {
    const status = xhr.status;
    
    if (status >= 200 && status < 300) {
      callback(null, xhr.response);
    } else {
        const err = new Error("HTTP error: " + status);
        err.status = status;
        err.response = xhr.response;
        callback(err, xhr.response);
      }
  };

  xhr.onerror = () => {
    callback(new Error("Network error"), null);
  };

  xhr.ontimeout = () => {
    callback(new Error("Request timed out"), null);
  };

  if (method === "GET" || !options.data) {
    xhr.send();
  } else {
      const formData = new FormData();
      if (typeof options.data === "object") {
        Object.keys(options.data).forEach((key) => {
        formData.append(key, options.data[key]);
        });
      }
      xhr.send(formData);
    }
};