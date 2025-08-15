/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Modal: element is required");
    }
    
    this.element = element;
    this._dismissHandler = this.onClose.bind(this);
    this.registerEvents();
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    const dismissors = this.element.querySelectorAll('[data-dismiss="modal"]');

    dismissors.forEach((el) => {
      el.removeEventListener("click", this._dismissHandler);
    });

    dismissors.forEach((el) => {
      el.addEventListener("click", this._dismissHandler);
    });
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(event) {
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }
    this.close();
  }

  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = "block";
  }

  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.style.display = "";
  }
}