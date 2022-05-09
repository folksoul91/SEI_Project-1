// set variables
let dogBreedList;
let activeDogBreed;
const $input = $("input[type='text']");
const URL = "https://api.thedogapi.com/v1/breeds";

// Connect the API using ajax/jquery
function fetchMeData() {
  $.ajax(URL).then(
    function (data) {
      dogBreedList = data;
    },
    function (error) {
      console.log("Something is wrong...");
    }
  );
}

// Add event listener to the button

// Need to sort throught the API array within the objects
// 1. create a fn that filters the array
// 2. create a condition to match the dogbreed name with the user input values
// 3. set it to a variable and return it so you can use it somewhere else
function filterDogBreedList() {
  let filteredBreeds = dogBreedList.filter(
    (dogBreed) => dogBreed.name === $input.val()
  );
  return filteredBreeds;
}

// Need to access the info from the list
// 1. create a render fn
// 2. update the h3 tags by navigating the thru the filtered list
function render() {
  $("#name").text(dogBreedLists[0].name);
}
