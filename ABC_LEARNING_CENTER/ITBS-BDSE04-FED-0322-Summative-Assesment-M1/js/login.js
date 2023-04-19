function login(e) {
    /* selecting id form input from HTML */
    let email = document.getElementById("email").value,
        password = document.getElementById("password").value;

     /* getting and storing the values of the form input user in data array */
    let newStorageData= JSON.parse(localStorage.getItem("newCourseData")) || [];

    /* check the amount of data */
    let dataStorage = newStorageData.length &&
    JSON.parse(localStorage.getItem("newCourseData")).some(data => data.email.toLowerCase() == email && data.password.toLowerCase() == password);
    if(!dataStorage){
        /* if the data is really not the same showing alert */
        alert("Incorrect login, please try again!!");
    }
    else{
        /* if the data is really the same showing teachingprofgondo.html */
        window.location.href = "./teachingprofgondo.html";
    }
    /* preventing the default behavior of the form */
    e.preventDefault();
}