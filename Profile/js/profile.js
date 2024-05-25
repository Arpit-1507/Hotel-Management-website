//all global variable declearation
let userInfo;
let user;
let allBData = [];
let navBrand = document.querySelector(".navbar-brand");
let logoutBtn = document.querySelector(".logout-Btn");
let bookingForm = document.querySelector(".booking-form");
let allBInput = bookingForm.querySelectorAll("input");
let bTexteria = bookingForm.querySelector("textarea");
let bCloseBtn = document.querySelector(".b-modal-close-btn");
let bListTBody = document.querySelector(".booking-list");
let bRegBtn = document.querySelector(".b-register-btn");
//check user is login or not
if (sessionStorage.getItem("--au--") == null) {
  window.location = "../index.html";
}
userInfo = JSON.parse(sessionStorage.getItem("--au--"));
navBrand.innerHTML = userInfo.HouseName;
user = userInfo.email.split("@")[0];

// getting data from storage
const fetchData = (key) => {
  if (localStorage.getItem(key) != null) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  } else {
    return [];
  }
};

//formate date

const formatDate = (data, istime) => {
  const date = new Date();
  let yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let time = date.toLocaleTimeString();

  dd = dd < 10 ? "0" + dd : dd;
  mm = mm < 10 ? "0" + mm : mm;
  return `${dd}-${mm}-${yy} ${istime ? time : " "}`;
};
console.log(formatDate());

allBData = fetchData(user + "_allBData");
console.log(allBData);

// logout coding
logoutBtn.onclick = () => {
  logoutBtn.innerHTML = "Please wait....";
  setTimeout(() => {
    logoutBtn.innerHTML = "logout";
    sessionStorage.removeItem("--au--");
    window.location = "../index.html";
  }, 3000);
};

// booking-form coding
bookingForm.onsubmit = (e) => {
  e.preventDefault();
  let data = {
    notice: bTexteria.value,
    createdAt: new Date(),
  };

  for (let el of allBInput) {
    let key = el.name;
    let value = el.value;
    data[key] = value;
  }
  allBData.push(data);
  localStorage.setItem(user + "_allBData", JSON.stringify(allBData));
  swal("Good Job !", "Successfully registered !", "success");
  bookingForm.reset(" ");
  bCloseBtn.click();
  ShowBookingData();
};

//show booking data
const ShowBookingData = () => {
  bListTBody.innerHTML = " ";
  allBData.forEach((item, index) => {
    bListTBody.innerHTML += `
    <tr>
    <td class = "text-nowrap">${index + 1}</td>
    <td class = "text-nowrap">${item.location}</td>
    <td class = "text-nowrap">${item.roomNumber}</td>
    <td class = "text-nowrap">${item.fullName}</td>
    <td class = "text-nowrap">${formatDate(item.checkInDate)}</td>
    <td class = "text-nowrap">${formatDate(item.checkOutDate)}</td>
    <td class = "text-nowrap">${item.toatalPeople}</td>
    <td class = "text-nowrap">${item.mobile}</td>
    <td class = "text-nowrap">${item.Price}</td>
    <td class = "text-nowrap">${item.notice}</td>
    <td class = "text-nowrap">${formatDate(item.createdAt, true)}</td>
    <td class = "text-nowrap">
        <button class="btn p-1 edit-btn px-2 btn-primary">
            <i class="fa fa-edit"></i>
        </button>
        <button class="btn p-1 px-2 checkin-btn text-white btn-info">
            <i class="fa fa-check"></i>
        </button>
        <button class="btn p-1 del-btn px-2 btn-danger">
            <i class="fa fa-trash"></i>
        </button>
    </td>
</tr>
    `;
  });

  deleteBFun();
  updateBDatafun();
};

ShowBookingData();

// Booking Delete coding
function deleteBFun() {
  allBdelBtn = bListTBody.querySelectorAll(".del-btn");
  allBdelBtn.forEach((btn, index) => {
    btn.onclick = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          allBData.splice(index, 1);
          localStorage.setItem(user + "_allBData", JSON.stringify(allBData));
          ShowBookingData();
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    };
  });
}

//Booking update coding
function updateBDatafun() {
  let allBEditBtn = bListTBody.querySelectorAll(".edit-btn");
  allBEditBtn.forEach((btn, index) => {
    btn.onclick = () => {
      bRegBtn.click();
      let allBBtn = bookingForm.querySelectorAll("button");
      allBBtn[0].classList.add("d-none");
      allBBtn[1].classList.remove("d-none");
      let obj = allBData[index];
      allBInput[0].value = obj.fullName;
      allBInput[1].value = obj.location;
      allBInput[2].value = obj.roomNumber;
      allBInput[3].value = obj.toatalPeople;
      allBInput[4].value = obj.checkInDate;
      allBInput[5].value = obj.checkOutDate;
      allBInput[6].value = obj.Price;
      allBInput[7].value = obj.mobile;
      bTexteria.value = obj.notice;
      allBBtn[1].onclick = () => {
        let formData = {
          notice: bTexteria.value,
          createdAt: new Date(),
        };
        console.log(formData);

        for (let el of allBInput) {
          let key = el.name;
          let value = el.value;
          formData[key] = value;
        }
        allBData[index] = formData;
        allBBtn[0].classList.remove("d-none");
        allBBtn[1].classList.add("d-none");
        bookingForm.reset();
        bCloseBtn.click();
        localStorage.setItem(user + "_allBData", JSON.stringify(allBData));
        ShowBookingData();
      };
    };
  });
}
