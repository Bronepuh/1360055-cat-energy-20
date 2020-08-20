var headerMenu = document.querySelector (".page-header__navigation")

var headerMenuToggle = document.querySelector (".page-header__toggle")

headerMenuToggle.addEventListener("click", function() {
  headerMenu.classList.toggle("site-list--open")
  headerMenuToggle.classList.toggle("page-header__toggle--close")
})
