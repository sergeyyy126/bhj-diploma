/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = "";
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    let params = "";
    if (data.account_id) {
      params = "?account_id=" + data.account_id;
    }

    createRequest({
      url: this.URL + params,
      method: "GET",
      responseType: "json",
      callback: (err, response) => {
        callback(err, response);
      },
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    // Метод PUT /account - body(name) - вернет success = true
    // Метод PUT /transaction - body(type, name, sum и account_id) - вернет success = true,
    // если в поле сумма было передано не число то вернет ошибку "Недопустимые символы в поле Сумма" и success = false
    createRequest({
      url: this.URL,
      method: "PUT",
      responseType: "json",
      data,
      callback: (err, response) => {
        callback(err, response);
      },
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback) {
    createRequest({
      url: this.URL,
      method: "DELETE",
      responseType: "json",
      data,
      callback: (err, response) => {
        callback(err, response);
      },
    });
  }
}
