function getWeatherForCity() {
  const city = $("#cityName").val();

  if (city == "") {
    toast("Geben Sie eine Stadt ein");
    $(".result").hide();
    return;
  }

  var apiKey = $("#apiKey").val();
  var localApiUrl = $("#apiUrl").val();

  if (apiKey != "") {
    $.get("https://api.openweathermap.org/geo/1.0/direct?q=" + $("#cityName").val() + "&limit=1&appid=" + apiKey, onLocationFound, "json");
  }
  else if (localApiUrl != "") {
    $.get(fixUrl(localApiUrl) + "direct?q=" + $("#cityName").val() + "&limit=1&appid=" + apiKey, onLocationFound, "json");
  }
  else {
    toast("Es muss mindestens die apiUrl oder der apiKey angegeben werden.");
  }
}

function onLocationFound(locations) {
  if (locations.length == 0) {
    toast("Diese Stadt wurde nicht gefunden");
    $(".result").hide();
    return;
  }

  const location = locations[0];
  $(".result").show();
  $(".result .title").text("Aktuelle Wetterlage in " + location.name + ", " + location.country);

  var apiKey = $("#apiKey").val();
  var localApiUrl = $("#apiUrl").val();

  if (apiKey != "") {
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + location.lat + "&lon=" + location.lon + "&units=metric&lang=de&appid=" + apiKey, onWeatherFound);
  }
  else if (localApiUrl != "") {
    $.getJSON(fixUrl(localApiUrl) + "weather?lat=" + location.lat + "&lon=" + location.lon + "&units=metric&lang=de&appid=" + apiKey, onWeatherFound);
  }
}

function onWeatherFound(result) {

  $(".result .measurement").each(function () {
    $(this).find(".value").text(eval("result." + $(this).attr("source")));
  });
}

function toast(message) {
  Toastify({
    text: message,
    duration: 5000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: "#4AA1F3",
    }
  }).showToast();
}

function fixUrl(url) {
  if (!url.endsWith("/")) {
    url += "/";
  }

  return url;
}