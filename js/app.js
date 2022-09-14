//Elements of the DOM

//3 Main buttons for options
const likeButton = document.querySelector("#like");
const denyButton = document.querySelector("#deny");
const superButton = document.querySelector("#superlike");

//The information containers for the curent profile.
const profilePicture = document.querySelector("#profile-pic");
const nome = document.querySelector("#name");
const age = document.querySelector("#age");
const description = document.querySelector("#description");
const address = document.querySelector("#address");
const info = document.querySelector("#info");
const time = document.querySelector("#used-time");
const phoneNumber = document.querySelector("#phone");

//The checkbox that is used to change the gender and the ball container used to represent the gender.
const genderSwitch = document.querySelector("#gender");
const ball = document.querySelector("#ball");

//Container used for the next user animation
const changeContainer = document.querySelector("#changeContainer");

//Button that returns from the match to screen
const matchBack = document.querySelector("#match-back");

//Http GET request template
class Http {
  static async get(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
}

//Calling the first profile on page load
window.onload = () => {
  updateProfile.callUpdate();
};

const updateNumbers = (function () {
  //The h3 tags at the bottom of the page each representing the options
  const numberLikes = document.querySelector("#likes");
  const numberDenies = document.querySelector("#denies");
  const numberSuperLikes = document.querySelector("#superlikes");
  const matches = document.querySelector("#matches");
  const numberTotal = document.querySelector("#total");

  let total = 0;
  const numbers = {
  match: 0,
    likes: 0,
    denies: 0,
    superLikes: 0,
    //Updates the footer of the DOM
    updateNumbers: function () {
      numberLikes.innerText = `Likes: ${this.likes} - ${(
        (this.likes / total) *
        100
      ).toFixed(1)}%`;
      numberDenies.innerText = `Denies: ${this.denies} - ${(
        (this.denies / total) *
        100
      ).toFixed(1)}%`;
      numberSuperLikes.innerText = `Super Likes: ${this.superLikes} - ${(
        (this.superLikes / total) *
        100
      ).toFixed(1)}%`;
      matches.innerText = `Matches: ${this.match} - ${(
        (this.match / total) *
        100
      ).toFixed(1)}%`;
      numberTotal.innerText = `Total de pessoas: ${total}`;
    },
  };

  return {
    //Recives the option and adds the current option
    add: function (type) {
      numbers[type]++;
      total++;
      numbers.updateNumbers();
    },
  };
})();

//class that gives a unique id from the the range given.
class RandomNumber {
  constructor(max) {
    this.usedIds = [];
    this.max = max;
  }
  novoId() {
    let Id = Math.floor(Math.random() * this.max + 1);
    if (!this.usedIds.includes(Id)) {
      this.usedIds.push(Id);
      return Id;
    } else {
      return this.novoId();
    }
  }
}

// New instance of the Random number class
const randomId = new RandomNumber(150);

//Variable that is true if there is any animation playing
let animating = false;

//EventListeners for the options buttons
likeButton.addEventListener("click", () => {
  if (!animating) updateProfile.nextProfile("green", "thumb_up", "likes");
});

denyButton.addEventListener("click", () => {
  if (!animating) updateProfile.nextProfile("red", "thumb_down", "denies");
});

superButton.addEventListener("click", () => {
  if (!animating) updateProfile.nextProfile("blue", "star", "superLikes");
});

genderSwitch.addEventListener("change", () => {
  updateProfile.changeGender();
});

//Fuctions that updates DOM profile in modular pattern;
const updateProfile = (function () {
  let gender = "female";
  let currentPhoto;

  //10% chance for the current profile to be a match
  const isMatch = function () {
    const id = Math.floor(Math.random() * 10 + 1);
    if (id === 10) {
      return true;
    }
    return false;
  };

  let match = isMatch();

  const update = function (response) {
    currentPhoto = profilePicture.src = response.picture.large;
    nome.innerText = `${response.name.first} ${
      response.name.last
    } #${randomId.novoId()}`;
    age.innerText = `${response.dob.age} Years`;
    description.innerText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac tincidunt libero. Nullam ac consequat enim. Suspendisse rutrum nulla eu justo elementum, in faucibus elit iaculis.`;
    address.innerText = `${response.location.state}, ${response.location.city}`;
    time.innerText = `${response.registered.age} months`;
    phoneNumber.innerText = `${response.phone}`;
  };

  const matchAnimation = function(){
        document.querySelector('nav').style.display ='none';
        document.querySelector('#match-screen').style.display ='flex';
        document.querySelector('#match-photo').src = currentPhoto;
  }

  return {
    callUpdate: function () {
      Http.get(`https://randomuser.me/api/?gender=${gender}`)
        .then((res) => {
          update(res.results[0]);
        })
        .catch((err) => {
          alert('Api Server is down now! there may be connection problems, try again later');
          window.location = 'https://gabrielwaif.github.io/Portfolio01/';
        });
    },

    changeGender: function () {
      if (genderSwitch.checked) {
        gender = ball.classList = "male";
        ball.querySelector("span").innerHTML = "male";
      } else {
        gender = "female";
        ball.classList = "";
        ball.querySelector("span").innerHTML = "female";
      }
    },

    nextProfile: function (color, icon, type) {
      animating = true;
      changeContainer.classList = "closed";
      changeContainer.style.backgroundColor = `var(--${color})`;
      changeContainer.querySelector("span").innerHTML = icon;
      if (match && (type === "likes" || type == "superLikes")) {
        matchAnimation();
        updateNumbers.add("match");
      } else {
        updateNumbers.add(type);
      }

      setTimeout(() => {
        pessoa.classList = "next";
      }, 300);
      setTimeout(() => {
        this.callUpdate();
        match = isMatch();
        changeContainer.classList = "";
      }, 700);
      setTimeout(() => {
        pessoa.classList = "";
        animating = false;
      }, 1700);
    },
  };
})();

matchBack.addEventListener('click', () => {
        document.querySelector('nav').style.display ='flex';
        document.querySelector('#match-screen').style.display ='none';
});