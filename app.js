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
document.getElementById("btn").addEventListener("click", render);
// Need to sort throught the API array within the objects
// 1. create a fn that filters the array
// 2. create a condition to match the dogbreed name with the user input values
// 3. set it to a variable and return it so you can use it somewhere else
function filterDogBreedList() {
  let filteredBreeds = dogBreedList.filter((dogBreed) => {
    return (
      dogBreed.name.toLowerCase().indexOf($input.val().toLowerCase()) !== -1
    );
  });
  return filteredBreeds;
}

// Need to access the info from the list
// 1. create a render fn
// 2. set filterDogBreedList inside of the render fn and set it to a variable
// 3. update the h3 tags by navigating the thru the filtered list
function render() {
  const dogBreedLists = filterDogBreedList();
  $("#name").text(dogBreedLists[0].name);
  $("#origin").text(dogBreedLists[0].origin);
  $("#lifespan").text(dogBreedLists[0].lifespan);
  $("#weight").text(dogBreedLists[0].weight.metric + " cm");
  $("#height").text(dogBreedLists[0].height.metric + " kg");
  $("#temperament").text(dogBreedLists[0].temperament);
  $("#dog-image").attr("src", dogBreedLists[0].image.url);
}

fetchMeData();
