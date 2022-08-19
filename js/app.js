"use strict";

const inputName = document.querySelector(".name");
const inputCourse = document.querySelector(".course");
const inputAuthor = document.querySelector(".author");
const container = document.querySelector(".customer-list");
const submitButton = document.querySelector(".submitBtn");
const loadingGif = document.querySelector(".loading");
const resetApp = document.querySelector(".clear-btn");
let cName, course, author;

let data;
let number = 0;

class Person {
  constructor(fullName) {
    this.fullName = fullName;
  }

  _setID() {
    this.id = Math.trunc(Math.random() * 1000 + 1);
  }
}

class Course extends Person {
  constructor(fullName, course, author, no) {
    super(fullName);
    this.course = course;
    this.author = author;
    this.no = no;
    this._ID();
  }

  _ID() {
    super._setID();
  }
}

class FormApp {
  #details = [];
  constructor() {
    this._getInfo();

    submitButton.addEventListener("click", this._submitInfo.bind(this));

    resetApp.addEventListener("click", this._clear);

    container.addEventListener("click", this._editForms.bind(this));
  }

  _submitInfo(e) {
    e.preventDefault();

    cName = inputName.value;
    course = inputCourse.value;
    author = inputAuthor.value;

    if (!this._checkForValidInput()) return;

    const newForm = new Course(cName, course, author, number);
    number = number + 1;
    this.#details.push(newForm);
    console.log(this.#details);
    // Set the values in details array to the local storage
    this._setInfo();

    this._renderOutputs(newForm);
  }

  _renderOutputs(form) {
    // this._showLoadingGIF();
    setTimeout(() => {
      const html = `
        <div class="col-11 mx-auto col-md-6 col-lg-4 my-3" data-id="${form.id}">
        <div class="card text-left">
        <img src="./img/cust-${form.no}.jpg" class="card-img-top" alt="" />
        <a href="" class="edit-icon"><i class="fa-solid fa-pen-to-square"></i></a>
        <div class="card-body">
          <!-- customer name -->
          <h6 class="text-capitalize">
            <span class="badge badge-warning mr-2">name :</span
            ><span id="customer-name"> ${form.fullName} </span>
          </h6>
          <!-- end of customer name -->
          <!-- customer name -->
          <h6 class="text-capitalize my-3">
            <span class="badge badge-success mr-2">course :</span
            ><span id="customer-course"> ${form.course} </span>
          </h6>
          <!-- end of customer name -->
          <!-- customer name -->
          <h6 class="text-capitalize">
            <span class="badge badge-danger mr-2">author :</span
            ><span id="course-author"> ${form.author}</span>
          </h6>
          <!-- end of customer name -->
        </div>
      </div>
      </div>
      `;

      container.insertAdjacentHTML("beforeend", html);
    }, 1);
  }

  _checkForValidInput() {
    if (/\d/.test(cName)) {
      alert("Dont be silly! A name cannot contain number.");
      return;
    } else if (cName === "" || /^\s*$/.test(cName)) {
      alert("Please enter a valid name");
      return;
    } else if (course === "" || /^\s*$/.test(course)) {
      alert("Please enter a valid course");
      return;
    } else if (author === "" || /^\s*$/.test(author)) {
      alert("Please enter a valid author name");
      return;
    } else return true;
  }

  _editForms(e) {
    e.preventDefault();
    let obj;
    console.log(e.target);
    if (!e.target.classList.contains("fa-solid")) return;
    const parent = e.target.closest(".col-md-6");
    // const allContainers = document.querySelectorAll('.text-left')
    console.log(parent);
    // console.log(newArr);
    this.#details.forEach((detail) => {
      console.log("Hi");
      console.log(this.#details);

      if (parseInt(parent.dataset.id) === detail.id) {
        parent.remove();
        cName = inputName.value = detail.fullName;
        course = inputCourse.value = detail.course;
        author = inputAuthor.value = detail.author;
        number = detail.no;
        obj = detail;
      }
    });

    submitButton.addEventListener("click", function (e) {
      e.preventDefault();
      this._renderOutputs(obj);
    });
  }

  // _formDetailsForEdit() {

  // }

  _showLoadingGIF() {
    loadingGif.style.display = "block";
    setTimeout(() => {
      loadingGif.style.display = "none";
    }, 1500);
  }

  _setInfo() {
    localStorage.setItem("details", JSON.stringify(this.#details));
  }

  _getInfo() {
    data = JSON.parse(localStorage.getItem("details"));
    console.log(data);

    if (!data) return;

    this.#details = data;

    this.#details.forEach((element) => {
      this._renderOutputs(element);
    });
  }

  _clear() {
    localStorage.removeItem("details");
    const allInputs = document.querySelectorAll(".col-md-6");
    allInputs.forEach((input) => input.remove());
    number = 0;
    inputName.value = "";
    inputCourse.value = "";
    inputAuthor.value = "";
  }
}

const app = new FormApp();
