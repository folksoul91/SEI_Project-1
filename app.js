// Variables

const $input = $('input[type="text"]');
var dogBreedList;
var activeDogBreed;

function fetchMeData() {
  // evt.preventDefault();
  $.ajax((URL = "https://api.thedogapi.com/v1/breeds")).then(
    function (data) {
      dogBreedList = data;
    },
    function (error) {
      console.log("something is wrong");
    }
  );
}
// Event Listener - click button
$("#btn").on("click", render);

//keypress
$("#input-form").keypress(function (evt) {
  let keycode = evt.keycode ? evt.keycode : evt.key;
  console.log(keycode);
  if (keycode === 13 || keycode === "Enter") {
    evt.preventDefault();
    render();
  }
});

function hasDogBreedNamePart(dogBreed, dogBreedNamePart) {
  let dogBreedName = dogBreed.name.toLowerCase();
  return dogBreedName.indexOf(dogBreedNamePart) !== -1;
}

function filterDogBreedList() {
  let filteredBreeds = dogBreedList.filter((dogBreed) => {
    return hasDogBreedNamePart(dogBreed, $input.val().toLowerCase());
  });
  return filteredBreeds;
}

function render() {
  const dogBreedLists = filterDogBreedList();
  //access the info from the list(s)
  $("#name").text(dogBreedLists[0].name);
  $("#bred").text(dogBreedLists[0].bred_for);
  $("#lifespan").text(dogBreedLists[0].life_span);
  $("#weight").text(dogBreedLists[0].weight.metric);
  $("#height").text(dogBreedLists[0].height.metric);
  $("#temperament").text(dogBreedLists[0].temperament);
  $("#dog-image").attr("src", dogBreedLists[0].image.url);
}

fetchMeData();
