// creating all local variable

let alluserInfo = [];
let regForm = document.querySelector(".reg-form");
let loginForm = document.querySelector(".login-form");

let allInput = regForm.querySelectorAll("input");
let allLoginInput = loginForm.querySelectorAll("input");
let rgBtn = regForm.getElementsByTagName("button");
let loginBtn = loginForm.querySelector("button");

// console.log(allLoginInput);

//getting data from local storage
if (localStorage.getItem("alluserInfo") != null) {
  alluserInfo = JSON.parse(localStorage.getItem("alluserInfo"));
}
console.log(alluserInfo);

// Registration coding
regForm.onsubmit = (e) => {
  e.preventDefault();
  let checkEmail = alluserInfo.find((data) => {
    return data.email == allInput[4].value;
  });

  if (checkEmail == undefined) {
    let data = {};

    for (let el of allInput) {
      let key = el.name;
      data[key] = el.value;
    }

    rgBtn.innerText = "processing";
    setTimeout(() => {
      rgBtn.innerText = "Register";
      alluserInfo.push(data);
      localStorage.setItem("alluserInfo", JSON.stringify(alluserInfo));
      swal("Good Job !", "Registration Success", "success");
    }, 2000);
  } else {
    swal("Failed !", "Email already registered !", "warning");
  }
};

// Login coding

loginForm.onsubmit = (e) => {
  e.preventDefault();

  if (allLoginInput[0].value != "") {
    if (allLoginInput[1].value != "") {
      //check email in your database
      let checkEmail = alluserInfo.find((data) => {
        return data.email == allLoginInput[0].value;
      });
      if (checkEmail != undefined) {
        if (checkEmail.Password == allLoginInput[1].value) {
          loginBtn.innerText = "Please wait....";
          setTimeout(() => {
            loginBtn.innerText = "Login";
            window.location = "profile/profile.html";
            checkEmail.Password = null;
            sessionStorage.setItem("--au--", JSON.stringify(checkEmail));
          }, 2000);
          // alert("login success");
        } else {
          swal("Warning !", "wrong passward", "warning");
        }
      } else {
        swal("Warning !", "wrong email", "warning");
      }
    } else {
      swal("Warning !", "password is empty", "warning");
    }
  } else {
    swal("Warning !", "email is empty", "warning");
  }
};
