const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const studentId = document.getElementById("studentId");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const studentsTable = document.querySelector("#studentsTable tbody");
const noDataMsg = document.getElementById("noDataMsg");
const submitBtn = document.getElementById("submitBtn");
const formMsg = document.getElementById("formMsg");


let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;


// Render Students
function renderStudents() {
studentsTable.innerHTML = "";


if (students.length === 0) {
noDataMsg.style.display = "block";
return;
} else {
noDataMsg.style.display = "none";
}


students.forEach((student, index) => {
const row = document.createElement("tr");
row.innerHTML = `
<td>${student.name}</td>
<td>${student.id}</td>
<td>${student.email}</td>
<td>${student.contact}</td>
<td>
<button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
<button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
</td>
`;
studentsTable.appendChild(row);
});


const recordsWrap = document.getElementById("records-wrap");
if (students.length > 5) {
recordsWrap.style.maxHeight = "300px";
recordsWrap.style.overflowY = "scroll";
} else {
recordsWrap.style.maxHeight = "none";
recordsWrap.style.overflowY = "visible";
}
}


// Form Submit Handler
studentForm.addEventListener("submit", function (e) {
e.preventDefault();


const nameRegex = /^[A-Za-z ]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactRegex = /^[0-9]{10,}$/;


if (!nameRegex.test(studentName.value)) {
formMsg.textContent = "Name must contain letters only.";
return;
}
if (studentId.value.trim() === "" || isNaN(studentId.value)) {
formMsg.textContent = "Student ID must be a number.";
return;
}
if (!emailRegex.test(email.value)) {
formMsg.textContent = "Invalid email format.";
return;
}
if (!contactRegex.test(contact.value)) {
formMsg.textContent = "Contact must be at least 10 digits.";
return;
}


const student = {
name: studentName.value.trim(),
id: studentId.value.trim(),
email: email.value.trim(),
contact: contact.value.trim(),
};


if (editIndex === null) {
students.push(student);
} else {
students[editIndex] = student;
editIndex = null;
submitBtn.textContent = "Add Student";
}


localStorage.setItem("students", JSON.stringify(students));
studentForm.reset();
formMsg.textContent = "Student saved successfully!";
renderStudents();
});


// Edit Student
function editStudent(index) {
const student = students[index];
studentName.value = student.name;
studentId.value = student.id;
email.value = student.email;
contact.value = student.contact;
editIndex = index;
submitBtn.textContent = "Update Student";
}


// Delete Student
function deleteStudent(index) {
if (confirm("Are you sure you want to delete this record?")) {
students.splice(index, 1);
localStorage.setItem("students", JSON.stringify(students));
renderStudents();
}
}


// Initial Render
renderStudents();