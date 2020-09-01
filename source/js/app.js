//Variables
var headerMenu = document.querySelector(".page-header__navigation")
var headerMenuToggle = document.querySelector(".page-header__toggle")
var inputName = document.getElementById("cat-name")
var inputWeight = document.getElementById("cat-weight")
var inputEmail = document.getElementById("e-mail")
var inputTel = document.getElementById("tel")
var form = document.getElementById("form")

//Start Js

var jsStart = () => {
  headerMenu.classList.remove("site-list--open")
  headerMenuToggle.classList.add("page-header__toggle--js")
}

jsStart()

//Open & close menu

headerMenuToggle.addEventListener("click", function () {
  headerMenu.classList.toggle("site-list--open")
  headerMenuToggle.classList.toggle("page-header__toggle--close")
})

//Form error

if (document.contains(form)) {
  form.addEventListener("submit", function (evt) {

    let classRemove = () => {
      inputName.classList.remove("inputs__field--error")
      inputWeight.classList.remove("inputs__field--error")
      inputEmail.classList.remove("inputs__field--error")
      inputTel.classList.remove("inputs__field--error")
    }

    if (!inputName.value) {
      evt.preventDefault()
      classRemove()
      inputName.offsetWidth = inputName.offsetWidth
      inputName.classList.add("inputs__field--error")
      inputName.focus()
    } else if (!inputWeight.value) {
      evt.preventDefault()
      classRemove()
      inputWeight.offsetWidth = inputWeight.offsetWidth
      inputWeight.classList.add("inputs__field--error")
      inputWeight.focus()
    } else if (!inputEmail.value) {
      evt.preventDefault()
      classRemove()
      inputEmail.offsetWidth = inputEmail.offsetWidth
      inputEmail.classList.add("inputs__field--error")
      inputEmail.focus()
    } else if (!inputTel.value) {
      evt.preventDefault()
      classRemove()
      inputTel.offsetWidth = inputTel.offsetWidth
      inputTel.classList.add("inputs__field--error")
      inputTel.focus()
    }
  })
}
