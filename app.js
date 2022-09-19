// GET REFRESH INFO ON PAGE LOAD//
window.onload = LoadEntries;

function LoadEntries(){
  COLoadEntries();
  WLLoadEntries();
}


// PAGE 1 START //

const valueName = document.querySelector('#value-co');
const gameName = document.querySelector('#game-co');
const addItemCO = document.querySelector('#btn-add-co');

const collectionList = document.querySelector('#card-output-co');
const totalValue = document.querySelector('#co-value-output');
let total = 0;

addItemCO.addEventListener('click', addItemToCollection);

function addItemToCollection(){

  if (valueName.value.length == 0 || gameName.value.length == 0){
    const alert = document.createElement('ion-alert');
    alert.header = 'Alert';
    alert.message = 'Game Title or Price missing';
    alert.buttons = ['Return'];

    document.body.appendChild(alert);
    return alert.present();

  } else {

  let outputCO = `${gameName.value} worth £${valueName.value}`;

  //console.log(output);

  const newItem = document.createElement('ion-card-content');

  newItem.textContent = outputCO;

  collectionList.appendChild(newItem);
  total += +valueName.value;
  //console.log(total);
  
  // output the value and string to label
  totalValue.textContent = "Total Collection value is £" + total.toFixed(2);
  
  saveCOEntry(); //function call
  // save all inputs form page
  function saveCOEntry(){
    if (localStorage.getItem('COEntry') === null ){
      COEntryArray = [];
    } else {
      COEntryArray = JSON.parse(localStorage.getItem('COEntry'));
    }

    COEntryArray.push(newItem.textContent);

    localStorage.setItem('COEntry', JSON.stringify(COEntryArray));
 
  }

  clearItemCO();

}}

function clearItemCO(){
  valueName.value = "";
  gameName.value = "";
}

// get all previous saved collection function
function COLoadEntries(){
  if (localStorage.getItem('COEntry') === null){

  } else {
    COEntryArray = JSON.parse(localStorage.getItem('COEntry'));

    //console.log(COEntryArray)

    for(var i = 0; i < COEntryArray.length; i++){
      var COEntry = COEntryArray[i];

      //console.log(COEntry)

      const newItem = document.createElement('ion-card-content');
      newItem.textContent = COEntry
      collectionList.appendChild(newItem);
    }
  }
}

// CLEAR ALL ENTRIES COLLECTION //

const clearCO = document.querySelector('#btn-clear-co');
clearCO.addEventListener('click', clearCOArray);

function clearCOArray(){
  localStorage.removeItem('COEntry')
  var valueName = 0;
  total = valueName;

  const CODelete = document.querySelector('#card-output-co');

  if (CODelete === null){

  } else {
    CODelete.remove(); //remove all entries
    totalValue.textContent = "Total Collection value is £" + total.toFixed(2); // clear total collection value £0
  }
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

// CLEAR ALL ENTRIES WATCHLIST //

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

const gamesList = "https://api.rawg.io/api/games?key=#yourAPIKeyHere&dates=2022-09-01,2022-09-30&platforms=18,1,7"; // dates can be changed to your own filter, also platforms. Your key is self explanatory.

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