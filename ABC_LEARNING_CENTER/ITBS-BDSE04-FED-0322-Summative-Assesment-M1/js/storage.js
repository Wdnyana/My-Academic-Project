/* selecting element like tag, id, class in HTML */
let newStorageData = localStorage.getItem("newCourseData"),
    form = document.querySelector("form"),
    fname = document.querySelector("#fname"),
    lname = document.querySelector("#lname"),
    email = document.querySelector("#email"),
    password = document.querySelector("#password"),
    crname = document.querySelector("#crname"),
    tname = document.querySelector("#tname"),
    btnSubmit = document.querySelector("[type='submit']"),
    btnCancel = document.querySelector("[type='button']"),
    showHideForm = document.querySelector("#showHide");

showCourseData = () => {
  /* reinitialize, update, create the value of data array */
  newStorageData = JSON.parse(localStorage.getItem("newCourseData"));

  /* assert the data array is not empty */
  if(newStorageData != null && newStorageData.length > 0) {
    /* selecting the tag tbody HTML */
    var resultData = document.querySelector("tbody");
    /* loop through the data array and display the data in the table */
    newStorageData.map((data , i) => {
      /* display the data to tabel admin */
      resultData.innerHTML += `
      <tr>
        <td>${data.fname}</td>
        <td>${data.lname}</td>
        <td>${data.email}</td>
        <td>${data.password}</td>
        <td>${data.crname}</td>
        <td>${data.tname}</td>
        <td>
          <button type="button" class="btn edit" onclick="viewDataEdit(${i})"><i class="fa fa-edit"></i></button>
        </td>
        <td>
          <button type="button" class="btn del" onclick="removeDataTable(${i})"><i class="fa fa-trash"></i></button>
        </td>
      </tr>
    `;
    })
  }
}

createUser = () => {
  /* showing popup modal create new in admin */
  showHideForm.style.display = "block";
};

const saveNewData = () => {
  newStorageData = newStorageData ?? [];
  /* if the data same the data is push to localStorage and create new */
  if(newStorageData.findIndex(newCourseData => newCourseData.fname === fname.value) < 0){
    /* getting and storing the values of the form input user in data array */
    newStorageData = [...newStorageData, {
      fname:
        fname.value,
      lname:
        lname.value,
      email:
        email.value,
      password:
        password.value,
      crname:
        crname.value,
      tname:
        tname.value
    }];

    /* checking the attribute of the submit button to see if it is set or not and calling the appropriate function */
    localStorage.setItem("newCourseData", JSON.stringify(newStorageData));

    /* showing all data in tabel admin */
    showCourseData();
    /* clearing input form */
    form.reset();
    /* focus in fname */
    fname.focus();
    /* reload location */
    location.reload();
    /* remove dataId attribute from the submit button */
    btnSubmit.removeAttribute("dataId");

  }else{
    /* if the data is not same will showing alert */
    confirm("Oooppsss... You are already registered...");
    /* focus in fname */
    fname.focus();
  }
}

viewDataEdit = (i) => {
  showHideForm.style.display = "block";

  /* get the data from local storage */
  newStorageData = JSON.parse(localStorage.getItem("newCourseData"));
  /* showing data values to be update in form  */
  fname.value = newStorageData[i].fname;
  lname.value = newStorageData[i].lname;
  crname.value = newStorageData[i].crname;
  tname.value = newStorageData[i].tname;
  email.value = newStorageData[i].email;

  /* setting the *dataID attribute of the submit button */
  btnSubmit.setAttribute('dataId', i);
}

updateDataEdit = (id) => {
  /* set updating with new values of the array */
  newStorageData[id].fname = fname.value;
  newStorageData[id].lname = lname.value;
  newStorageData[id].email = email.value;
  newStorageData[id].password = password.value;
  newStorageData[id].crname = crname.value;
  newStorageData[id].tname = tname.value;
  /* set new updating the localStorage to */
  localStorage.setItem("newCourseData", JSON.stringify(newStorageData));

  /* showing all data in tabel admin again */
  showCourseData();

  /* clearing input form */
  form.reset();
  /* focus in fname */
  fname.focus();
  /* reload location */
  location.reload();
}


removeDataTable = (j) => {
  /* confirmation before delete data */
  if (confirm("Are you sure you want delete?")) {

    /* get the data from local storage */
    newStorageData = JSON.parse(localStorage.getItem("newCourseData"));

    /* delete the data using splice this is same like .removeItem() */
    newStorageData.splice(j, 1);
    /* set new data after delete the localStorage */
    localStorage.setItem("newCourseData", JSON.stringify(newStorageData));

    /* showing all data in tabel admin again */
    showCourseData();
    /* reload location */
    location.reload();
  }
}

/* call the function again to show what is done in it  */
showCourseData();

form.addEventListener("submit", e => {
  /* preventing the default behavior of the form */
  e.preventDefault();
  /* submit data to localStorage */
  !btnSubmit.getAttribute("dataId") ? saveNewData() : updateDataEdit(btnSubmit.getAttribute("dataId"));

})

// close form icon and button
function closeXbtn() {
  /* close the popup display */
  showHideForm.style.display = "none";
}

// function button close
function btnClose() {
  /* close the popup display */
  showHideForm.style.display = "none";
  showHideForm.style.display = "none";
}