/* eslint-disable */
import "@babel/polyfill";
import { login, logout } from "./login";

const logOutBtn = document.querySelector(".nav__el nav__el--logout");
const logIn = document.querySelector(".form--login");
const map = document.getElementById("map");
if (logOutBtn) logOutBtn.addEventListener("click", logout);
if (logIn) {
  // đăng nhập
  logIn.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (map) {
  const googleMap = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: {
      lat: -34.397,
      lng: 150.644,
    },
  });

  // array.forEach((element) => {
  //   const point = element.coordinates.split(",");
  //   addMarker(point, googleMap);
  // });
}
function addMarker(marker, googleMap) {
  const map = new google.maps.Marker({
    map: googleMap,
    position: {
      lat: parseInt(marker[0]),
      lng: parseInt(marker[1]),
    },
  });

  const infowindow = new google.maps.InfoWindow({
    content: "hello",
  });
  map.addListener("click", () => {
    infowindow.open({
      anchor: map,
      map: googleMap,
      shouldFocus: false,
    });
  });
}
