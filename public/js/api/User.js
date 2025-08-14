/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = "/user";
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  // static setCurrent(user) {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }
  static setCurrent(user) {
    if (user === undefined || user === null) return;
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      // handle storage errors if needed
    }
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  // static unsetCurrent() {
  //   localStorage.removeItem("user");
  // }
  static unsetCurrent() {
    try {
      localStorage.removeItem("user");
    } catch (e) {
      // ignore
    }
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  // static current() {
  //   const user = localStorage.user;
  //   if (user) {
  //     return JSON.parse(user);
  //   } else {
  //     return user;
  //   }
  // }
  static current() {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : undefined;
    } catch (e) {
      return undefined;
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  //
  static fetch(callback) {
    createRequest({
      url: this.URL + "/current",
      method: "GET",
      responseType: "json",
      callback: (err, response) => {
        if (err) {
          callback(err, response);
          return;
        }
        if (response && response.success) {
          if (response.user) this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback(null, response);
      },
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  //
  static login(data, callback) {
    createRequest({
      url: this.URL + "/login",
      method: "POST",
      data,
      responseType: "json",
      callback,
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  //
  static register(data, callback) {
    createRequest({
      url: this.URL + "/register",
      method: "POST",
      data,
      responseType: "json",
      callback: (err, response) => {
        if (err) {
          callback(err, response);
          return;
        }
        if (response && response.success && response.user) {
          this.setCurrent(response.user);
        }
        callback(null, response);
      },
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    const obj = {
      method: "POST",
      url: this.URL + "/logout",
      callback: function (err, response) {
        if (response.success) {
          User.unsetCurrent(response.user);
        }
        callback(err, response);
      },
    };
    createRequest(obj);
  }
}
