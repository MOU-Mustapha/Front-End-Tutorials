let selectedRow = null;
let studentInfo = document.querySelector(".student-list");

function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  const divText = document.createTextNode(message);
  div.appendChild(divText);
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}

function clearFields() {
  document.getElementById("first-name").value = "";
  document.getElementById("last-name").value = "";
  document.getElementById("roll-no").value = "";
}

document.getElementById("student-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const rollNo = document.getElementById("roll-no").value;
  if (firstName == "" || lastName == "" || rollNo == "") {
    showAlert("Please Fill In All Fields ", "danger");
  } else {
    if (selectedRow === null) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${rollNo}</td>
        <td>
          <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
          <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
        </td>
      `;
      studentInfo.appendChild(row);
      selectedRow = null;
      showAlert("Student Added", "success");
      clearFields();
      window.localStorage.setItem("First Name", firstName);
      window.localStorage.setItem("Last Name", lastName);
      window.localStorage.setItem("Roll No", rollNo);
      AddInfoToArray();
      console.log(studentsInfoArray);
    } else {
      selectedRow.children[0].textContent = firstName;
      selectedRow.children[1].textContent = lastName;
      selectedRow.children[2].textContent = rollNo;
      selectedRow = null;
      showAlert("Student Info Edited", "info");
      clearFields();
    }
  }
});

studentInfo.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    studentInfo.remove();
    showAlert("Student Data Deleted", "danger");
  }
  if (e.target.classList.contains("edit")) {
    selectedRow = e.target.parentElement.parentElement;
    document.getElementById("first-name").value =
      selectedRow.children[0].textContent;
    document.getElementById("last-name").value =
      selectedRow.children[1].textContent;
    document.getElementById("roll-no").value =
      selectedRow.children[2].textContent;
  }
});
