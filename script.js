const addBtn = document.querySelector("#add");
const main = document.querySelector("#main");

// Load notes from localStorage
const loadNotes = () => {
 const lsnotes = localStorage.getItem("notes");
 if (lsnotes) {
  const data = JSON.parse(lsnotes);
  data.forEach(noteContent => {
   Addnote(noteContent.text, noteContent.date);
  });
 }
};

addBtn.addEventListener("click", function () {
  Addnote();
});

const savenote = () => {
 const notes = document.querySelectorAll(".notes");
 const data = [];
 notes.forEach(note => {
  const textarea = note.querySelector("textarea");
  const dateElem = note.querySelector(".date");
  data.push({ text: textarea.value, date: dateElem.textContent });
 });
 localStorage.setItem("notes", JSON.stringify(data));
};

const Addnote = (text = "", date = "") => {
 const note = document.createElement("div");
 note.classList.add("notes");
 note.innerHTML = `
 <div class="tool">
  <button class="delete" title="Delete">
   <i class="fas fa-trash trash-icon"></i>
  </button>
  <button class="save" title="Save">
   <i class="fas fa-save save-icon"></i>
  </button>
 </div>
 <textarea>${text}</textarea>
 <div class="date">${date ? date : new Date().toLocaleString()}</div>
 `;

 // Select the textarea for this specific note
 const textarea = note.querySelector("textarea");

// Delete note
 note.querySelector(".delete").addEventListener("click", function () {
 note.remove();
 savenote();
 });

 // Save note
 note.querySelector(".save").addEventListener("click", function () {
 savenote();
 // Change the background and text color of the textarea
 textarea.style.backgroundColor = "green";
 textarea.style.color = "white";
 });

 main.appendChild(note);
 savenote();
};

// Load existing notes on page load
window.addEventListener("DOMContentLoaded", loadNotes);
