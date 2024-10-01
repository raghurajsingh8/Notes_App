const addBtn = document.querySelector("#add");
const main = document.querySelector("#main");

// Load notes from localStorage
const loadNotes = () => {
 const lsnotes = localStorage.getItem("notes");
 if (lsnotes) {
  const data = JSON.parse(lsnotes);
  data.forEach(noteContent => {
   Addnote(noteContent.text, noteContent.date, noteContent.title); // Pass the title to the Addnote function
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
  const title = note.querySelector(".title");
  data.push({ text: textarea.value, date: dateElem.textContent, title: title.value }); // Save the title as well
 });
 localStorage.setItem("notes", JSON.stringify(data));
};

const Addnote = (text = "", date = "", title = "") => {
 const note = document.createElement("div");
 note.classList.add("notes");
 note.innerHTML = `
 <div class="tool">
 <input class="title" type="text" placeholder="Title" value="${title}"> <!-- Use type="text" and set the value -->
  <button class="delete" title="Delete">
   <i class="fas fa-trash trash-icon"></i>
  </button>
  <button class="save" title="Save">
   <i class="fas fa-save save-icon"></i>
  </button>
  <button class="print" title="Print">
   <i class="fas fa-download download-icon"></i>
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

 // Print note
 note.querySelector(".print").addEventListener("click", function () {
  printNote(textarea.value);
 });

 main.appendChild(note);
 savenote();
};

// Function to print the note
const printNote = (noteContent) => {
 const printWindow = window.open('', '', 'height=400,width=600');
 printWindow.document.write('<html><head><title>Print Note</title>');
 printWindow.document.write('</head><body>');
 printWindow.document.write('<pre>' + noteContent + '</pre>'); // Use <pre> to keep the formatting of the note
 printWindow.document.write('</body></html>');
 printWindow.document.close();
 printWindow.print();
};

// Load existing notes on page load
window.addEventListener("DOMContentLoaded", loadNotes);
