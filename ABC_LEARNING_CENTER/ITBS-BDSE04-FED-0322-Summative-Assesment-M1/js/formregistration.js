/* selecting element like tag, id, class in HTML */
let form = document.querySelector("form"),
    btnSubmit = document.querySelector("[type='submit']");

const saveNewData = () => {
  /* selecting id form input from HTML */
  let fname = document.getElementById("fname").value,
      lname = document.getElementById("lname").value,
      email = document.getElementById("email").value,
      password = document.getElementById("password").value,
      crname = document.getElementById("crname").value,
      tname = document.getElementById("tname").value;
  /* getting and storing the values of the form input user in data array */
  let newStorageData = JSON.parse(localStorage.getItem("newCourseData")) || [];

  /* check and set data, if the data is same jump to else, if not the data is push */
  let dataStorage = newStorageData.length &&
      JSON.parse(localStorage.getItem("newCourseData")).some(data =>
          data.fname.toLowerCase() == fname.toLowerCase() &&
          data.lname.toLowerCase() == lname.toLowerCase()
      );
  /* if the data not same data is push to localStorage */
  if(!dataStorage){
      newStorageData.push({ fname, lname, email, password, crname, tname });
      /* set data to localStorage */
      localStorage.setItem("newCourseData", JSON.stringify(newStorageData));
      /* clearing input form */
      form.reset();
      /* focus in fname */
      document.getElementById("fname").focus();
      /* remove dataId attribute from the submit button */
      btnSubmit.removeAttribute("dataId");
  }
  /* if the data is same will showing confirmation */
  else{
    confirm("Oooppsss... You are already registered...");
  }
}

form.addEventListener("submit", e => {
  /* preventing the default behavior of the form */
  e.preventDefault();
  /* submit data to localStorage */
  !btnSubmit.getAttribute("dataId") ? saveNewData() : updateDataEdit(btnSubmit.getAttribute("dataId"));
  /* after registered, redirect to thank page */
  window.location.href = "./thankyoupage.html";
})