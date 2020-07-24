var headerMenu = document.querySelector (".page-header__navigation")
console.log(headerMenu)

var headerMenuToggle = document.querySelector (".page-header__toggle")
console.log(headerMenuToggle)

headerMenuToggle.addEventListener("click", function() {
  headerMenu.classList.toggle("site-list")
  headerMenuToggle.classList.toggle("page-header__toggle--close")
})
