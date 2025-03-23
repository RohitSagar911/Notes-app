const addNote = document.querySelector(".add-note");
const writeNotes = document.querySelector(".write-note");

// Function to load saved notes from localStorage
function loadNotes() {
    writeNotes.innerHTML = ""; // Clear previous notes
    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    
    savedNotes.forEach(text => {
        createNote(text);
    });
}

// Function to create a new note
function createNote(text = "") {
    let newNote = document.createElement("p");
    let img = document.createElement("img");

    newNote.className = "textarea";
    newNote.setAttribute("contenteditable", true);
    newNote.style.textAlign = "left";
    newNote.innerText = text; // Load existing text if provided

    img.src = "/images/delete.png";
    img.classList.add("deletee-icon");

    newNote.appendChild(img);
    writeNotes.prepend(newNote);

    // Save notes on every edit
    newNote.addEventListener("input", saveNotes);

    // Delete note on clicking delete icon
    img.addEventListener("click", () => {
        newNote.remove();
        saveNotes(); // Update saved notes after deletion
    });
}

// Function to save notes to localStorage
function saveNotes() {
    let allNotes = document.querySelectorAll(".textarea");
    let notesArray = [];

    allNotes.forEach(note => {
        notesArray.push(note.innerText.trim());
    });

    localStorage.setItem("notes", JSON.stringify(notesArray));
}

// Event Listener to add a new note
addNote.addEventListener("click", () => createNote());

// Load saved notes on page load
window.addEventListener("load", loadNotes);
