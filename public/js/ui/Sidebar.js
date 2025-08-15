/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
  const btn = document.querySelector('.sidebar-toggle');
  const body = document.body;

  if (!btn || !body) return;

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    body.classList.toggle('sidebar-open');
    body.classList.toggle('sidebar-collapse');
  });
}

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registerBtn = document.getElementsByClassName('menu-item_register')[0].children[0];
    
    registerBtn.addEventListener('click', () => {
      App.getModal('register').open();
    });

    const loginBtn = document.getElementsByClassName('menu-item_login')[0].children[0];
    
    loginBtn.addEventListener('click', () => {
      App.getModal('login').open();
    });

    const logoutBtn = document.getElementsByClassName('menu-item_logout')[0].children[0];
    
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      User.logout((err, response) => {
        if (err) {
          console.error(err);
          return;
        }
        if (response && response.success) {
          App.setState('init');
        }
      });
    });
  }
   
}