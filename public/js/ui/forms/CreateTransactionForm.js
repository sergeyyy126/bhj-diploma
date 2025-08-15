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
    super(element);
    if (!element) throw new Error('CreateTransactionForm: element is required');
    this.element = element;
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    // Найти все select-ы для аккаунтов в форме (в проекте два экземпляра формы)
    const selects = this.element.querySelectorAll('select.accounts-select');
    // Очистка и загрузка списка через Account.list
    Account.list(null, (err, response) => {
      if (!response || !response.success) return;
      const accounts = response.data || [];
      // Формируем HTML для опций
      const optionsHtml = accounts.map(acc => `<option value="${acc.id}">${acc.name}</option>`).join('');
      selects.forEach(sel => {
        sel.innerHTML = optionsHtml;
      });
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    // data приходит как объект полей формы (AsyncForm обеспечивает это)
    Transaction.create(data, (err, response) => {
      if (!response) return;
      if (response.success) {
        // Закрыть модальное окно, очистить форму, обновить приложение
        const modal = App.getModal(this.element.closest('.modal')?.dataset?.modalId) || App.getModal('createTransaction');
        if (modal) modal.close();
        this.element.reset();
        App.update(); // обновить виджеты/балансы/список счетов, как требуется в проекте
      } else {
        // Обработка ошибки (можно показать сообщение)
        console.error('Transaction.create error', response.error);
      }
    });
  }
}