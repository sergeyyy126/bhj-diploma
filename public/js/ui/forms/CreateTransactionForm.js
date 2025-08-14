/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(null, (error, response) => {
      if (response && response.success && response.data.length) {
        const accountsSelect = this.element.getElementsByClassName('accounts-select')[0];
        accountsSelect.innerHTML = '';
        for (let item of response.data) {
          accountsSelect.insertAdjacentHTML('afterbegin', `<option value="${item.id}">${item.name}</option>`);
        }
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (error, response) => {
      if (response && response.success) {
        this.element.reset();
        App.update();
        const modal = App.getModal(`new${data.type.charAt(0).toUpperCase() + data.type.slice(1)}`);
        modal.close();
      }
    });
  }
}