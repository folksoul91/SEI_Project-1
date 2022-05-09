// set variables
let dogBreedList;
let activeDogBreed;
const $input = $("input[type='text']");
const URL = "https://api.thedogapi.com/v1/breeds";

// Connect the API using ajax/jquery
function fetMeData() {
  $.ajax(URL).then(
    function (data) {
      dogBreedList = data;
    },
    function (error) {
      console.log("Something is wrong...");
    }
  );
}
