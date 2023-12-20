// Variables

const $input = $('input[type="text"]');
var dogBreedList;
var activeDogBreed;

function fetchMeData() {
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

async function fetchImageURL(imageId) {
  try {
    const imageData = await $.ajax({
      url: `https://api.thedogapi.com/v1/images/${imageId}`,
      method: "GET",
    });
    return imageData.url;
  } catch (error) {
    console.error("Error fetching image: ", error);
  }
}

async function render() {
  const dogBreedLists = filterDogBreedList();

  if (dogBreedList.length === 0) {
    console.log("No matching breeds found");
    return;
  }

  const imageId = dogBreedLists[0].reference_image_id;
  const imageUrl = await fetchImageURL(imageId);

  //access the info from the list(s)
  $("#name").text(dogBreedLists[0].name);
  $("#bred").text(dogBreedLists[0].bred_for);
  $("#lifespan").text(dogBreedLists[0].life_span);
  $("#weight").text(dogBreedLists[0].weight.metric + " kg");
  $("#height").text(dogBreedLists[0].height.metric + " cm");
  $("#temperament").text(dogBreedLists[0].temperament);
  $("#dog-image").attr("src", imageUrl);
}

fetchMeData();
