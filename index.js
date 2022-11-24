const menu = document.querySelector("#mobileMenu");
const menuLinks = document.querySelector(".navMenu");

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

// ------------------------sign Up Form-------------------

const openBtn = document.querySelector(".main-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");

openBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

//form validation
const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

//show error
function showError(input, message) {
  const formValidation = input.parentElement;
  formValidation.classList = "form-validation error";

  const errorMessage = formValidation.querySelector("p");
  errorMessage.innerText = message;
  errorMessage.style.display = "block";
}

//show valid
function showValid(input) {
  const formValidation = input.parentElement;
  formValidation.classList = "form-validation valid";
}

//checkRequired
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showValid(input);
    }
  });
}

//check Length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least of ${min}  characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showValid(input);
  }
}

//match password
function matchPassword(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "password do not match");
  }
}

//get field name
function getFieldName(input) {
  return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}

//event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([name, email, password, confirmPassword]);
  checkLength(name, 5, 30);
  checkLength(password, 8, 30);
  checkLength(confirmPassword, 8, 30);
  matchPassword(password, confirmPassword);
});

// gallery;

let galleryImages = document.querySelectorAll(".services-cell");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

galleryImages.forEach(function (image, index) {
  image.onclick = function () {
    getLatestOpenedImg = index + 1;

    let container = document.body;
    let newImgWindow = document.createElement("div");
    container.appendChild(newImgWindow);
    newImgWindow.setAttribute("class", "img-window");
    newImgWindow.setAttribute("onclick", "closeImg()");

    let newImg = image.firstElementChild.cloneNode();
    newImgWindow.appendChild(newImg);
    newImg.classList.remove("services-cell_img");
    newImg.classList.add("popup-img");
    newImg.setAttribute("id", "current-img");

    newImg.onload = function () {
      let newNextBtn = document.createElement("a");
      newNextBtn.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
      container.appendChild(newNextBtn);
      newNextBtn.setAttribute("class", "img-btn-next");
      newNextBtn.setAttribute("onclick", "changeImg(1)");

      let newPrviousBtn = document.createElement("a");
      newPrviousBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
      container.appendChild(newPrviousBtn);
      newPrviousBtn.setAttribute("class", "img-btn-previous");
      newPrviousBtn.setAttribute("onclick", "changeImg(0)");
    };
  };
});

function closeImg() {
  document.querySelector(".img-window").remove();
  document.querySelector(".img-btn-next").remove();
  document.querySelector(".img-btn-previous").remove();
}

//sider-------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

function changeImg(change) {
  document.querySelector("#current-img").remove();

  let getNewImage = document.querySelector(".img-window");
  let newImg = document.createElement("img");

  getNewImage.appendChild(newImg);

  let calcNewImg;
  if (change === 1) {
    calcNewImg = getLatestOpenedImg + 1;
    if (calcNewImg > galleryImages.length) {
      calcNewImg = 1;
    }
  } else if (change === 0) {
    calcNewImg = getLatestOpenedImg - 1;
    if (calcNewImg < 1) {
      calcNewImg = galleryImages.length;
    }
  }

  newImg.setAttribute("src", `gallery/img ${calcNewImg}.jpg`);
  newImg.setAttribute("class", "popup-img");
  newImg.setAttribute("id", "current-img");

  getLatestOpenedImg = calcNewImg;
}
