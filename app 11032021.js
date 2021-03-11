
// PAGE 1 START //

const valueName = document.querySelector('#value-co');
const gameName = document.querySelector('#game-co');
const addItem = document.querySelector('#btn-add-co');

const collectionList = document.querySelector('#card-output-co');
const totalValue = document.querySelector('#co-value-output');
let total = 0;

addItem.addEventListener('click', addItemToCollection);

function addItemToCollection(){

  let outputCO = `${gameName.value} for: £${valueName.value}`;

  //console.log(output);

  const newItem = document.createElement('ion-card-content');

  newItem.textContent = outputCO;

  collectionList.appendChild(newItem);
  total += +valueName.value;
  //console.log(total);
  
  // output the value and string to label
  totalValue.textContent = "Total Collection value is £" + total.toFixed(2);

  clearItemCO();

}

function clearItemCO(){
  valueName.value = "";
  gameName.value = "";
}

// PAGE 1 END //

// WATCHLIST PAGE START //

const consoleSelection = document.querySelector('#console-select-wl');
const gameNameInput = document.querySelector('#game-input-wl');
const addItemWL = document.querySelector('#btn-add-wl');

const watchList = document.querySelector('#card-output-wl');

addItemWL.addEventListener('click', addItemToWatchlist);

function addItemToWatchlist(){

    if (gameNameInput.value.length == 0 || consoleSelection.value.length == 0){
      const alert = document.createElement('ion-alert');
      alert.header = 'Alert';
      alert.message = 'Console or Game Title missing';
      alert.buttons = ['Return'];

      document.body.appendChild(alert);
      return alert.present();

    } else {

      let output = `${consoleSelection.value}: ${gameNameInput.value}`;

    //console.log(output);

    const newItem = document.createElement('ion-card-content');

    newItem.textContent = output;

    watchList.appendChild(newItem);

    saveWLEntry(); //call WL Save entries

    // save all inputs in this page
    function saveWLEntry(){
      if (localStorage.getItem('WLEntry') === null ){
        WLEntryArray = [];
      } else {
        WLEntryArray = JSON.parse(localStorage.getItem('WLEntry'));
      }
 
      WLEntryArray.push(newItem.textContent);
 
      localStorage.setItem('WLEntry', JSON.stringify(WLEntryArray));
    }

    clearGameInputWL();
      
    }

    

}

// CLEAR INPUT
function clearGameInputWL(){
    gameNameInput.value = "";
}

// GET REFRESH INFO ON PAGE LOAD//

window.onload = WLLoadEntries

// get all previous saved watchlist function
function WLLoadEntries(){
  if (localStorage.getItem('WLEntry') === null ){
    
  } else {
    WLEntryArray = JSON.parse(localStorage.getItem('WLEntry'));

    //console.log(WLEntryArray)

    for(var i = 0; i < WLEntryArray.length; i++){
      var WLEntry = WLEntryArray[i];
      //console.log(WLEntry)

      const newItem = document.createElement('ion-card-content');
      newItem.textContent = WLEntry
      watchList.appendChild(newItem);
      
    }
    
  }
}

// CLEAR ALL ENTRIES W //

const clearWL = document.querySelector('#btn-clear-wl');
clearWL.addEventListener('click', clearWLArray);

function clearWLArray(){
  localStorage.removeItem('WLEntry')

  const WLDelete = document.querySelector('#card-output-wl');
  if (WLDelete === null){
   } else { 
     WLDelete.remove() 
    }
}


// WATCHLIST PAGE END

// DATABASE PAGE START // 

const imageDisplay = document.getElementById("img-display-db");
const gameTitle = document.getElementById("title-name-db");
const outputSelect = document.querySelector('#select-output-db');

const outputList = document.querySelector('#list-output-db');

const gamesList = "https://rawg-video-games-database.p.rapidapi.com/games?rapidapi-key=64ecbcb32emshb46c813445d7eb3p1b5ef1jsna3e7a4a44987";

getSelectData();

outputSelect.addEventListener('ionChange', getGames);

//-------------------------------------------------------------------

function getGames(){
  //API json object from RAWG API
  fetch(gamesList).then(getJson).then(updateDisplay).catch(reportError);
}

//-------------------------------------------------------------------
function getJson(aResponse){
  return aResponse.json();
}


//update display//

function updateDisplay(jsonObj){

    let gameObjectArray = jsonObj.results;
    let gameObject;

    for (let aGameObject of gameObjectArray){

      if (aGameObject.name === outputSelect.value){
        gameObject = aGameObject;
      }
    }
    
    let gameName = gameObject.name;
    gameTitle.textContent = gameName;

    let gameImageURL = gameObject.background_image;
    imageDisplay.src = gameImageURL; 
    
    removeAllItems();
    makeDetailsList(gameObject);
}


function reportError(anError){
  console.log(anError);
}

// DETAILS

function makeDetailsList(aGameObject){
  
  let gamePropertyList = ["released","rating","added", "playtime", "suggestions_count"]

  for (let gameProperty of gamePropertyList){

    const newItem = document.createElement('ion-item');

    let outputText = gameProperty.toUpperCase() + ": " + aGameObject[gameProperty];

    newItem.textContent = outputText

    outputList.appendChild(newItem);
  }
}

//GET DETAILS FOR SELECTION

function getSelectData(){
  
  fetch(gamesList).then(getJson).then(getListofGames).catch(reportError);
}

function getListofGames(jsonObj){
 
  let gameObjectArray = jsonObj.results;
  let gameNamesArray = [];

  for (let gameObject of gameObjectArray){
    gameNamesArray.push(gameObject.name);
  }

  buildSelectOptions(gameNamesArray)
}

// build select options

function buildSelectOptions(anArrayOfGameNames){

  for (let gameName of anArrayOfGameNames){
    createSelectOption(gameName);
  }
}

// create select option

function createSelectOption(aGameName){
  const newItem = document.createElement('ion-select-option');
  newItem.value = aGameName;
  newItem.textContent = aGameName.toUpperCase();
  
  outputSelect.appendChild(newItem)
}

//clear list

function removeAllItems(){

  while(outputList.lastElementChild){
    outputList.removeChild(outputList.lastElementChild);
  }
}

// DATABASE PAGE END //