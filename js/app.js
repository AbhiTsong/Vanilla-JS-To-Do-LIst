// Add Note Action Function in the local storage on the button click
let addBtn = document.querySelector("#addBtn");
showTheNote();

addBtn.addEventListener('click', function(e){
  let addText = document.querySelector("#addTxt");
  
  let prevNotes = localStorage.getItem('notes');
  if(prevNotes === null){
    notesArr = []
  }else{
    notesArr = JSON.parse(prevNotes)
  }
  if(addText.value.length === 0){
    return '';
  }
  else{
    notesArr.push(addText.value);
    localStorage.setItem('notes', JSON.stringify(notesArr));
    addText.value = '';
  }

  showTheNote();
})

// Show the note in the form of card as the click action takes place
function showTheNote(){
  let notesDiv = document.querySelector('#notes');
  let html = '';
  let prevNotes = JSON.parse(localStorage.getItem('notes'));
 
  if(prevNotes !== null){

    Array.from(prevNotes).forEach(function(element, index){
      html += `
    <div class="cardNotes mx-2 my-2" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">To Do ${index + 1}</h5>
    <p class="card-text">${element}</p>
    <button id=${index} onclick= handleDelete(this.id) class="btn btn-primary">Delete Task</button>
    </div>
    </div>
    `
  });
}

  if(prevNotes.length === 0){
    notesDiv.innerHTML = "You dont have no tasks yet..!!!"
  }else{
    notesDiv.innerHTML = html
  }
}

// Function for deleting the task as its gets completed

function handleDelete(id){
    let allNotes = JSON.parse(localStorage.getItem('notes'));

    allNotes.splice(id, 1);
    localStorage.setItem('notes', JSON.stringify(allNotes));
    showTheNote();
}


// function for filtering the cards

let filterEvent = document.querySelector('#seartchText');

filterEvent.addEventListener("input", function(event){
  
  let typeCar = event.target.value;

  let noteCards = document.getElementsByClassName("cardNotes");
  
  Array.from(noteCards).forEach(function(element){
    let cardText = element.getElementsByTagName('p')[0].innerText;

    if(cardText.includes(typeCar)){
      element.style.display = "block"
    }else{
      element.style.display = "none"
    }
  })
})