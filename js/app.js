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

//The checkbox that is used to change the gender and the ball container used to represent the gender.
const genderSwitch = document.querySelector("#gender");
const ball = document.querySelector("#ball");

//Container used for the next user animation
const changeContainer = document.querySelector("#changeContainer");

//Http GET request template
class Http {
  static async get(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  }
}

//Calling the first profile on page load
window.onload = () => {
  updateProfile.callUpdate();
};

const UpdateNumbers = (function () {
  //The h3 tags at the bottom of the page each representing the options
  const numberLikes = document.querySelector("#likes");
  const numberDenys = document.querySelector("#denys");
  const numberSuperLikes = document.querySelector("#superlikes");
  const matches = document.querySelector("#matches");
  const numberTotal = document.querySelector("#total");

  let total = 0;
  let match = 0;
  const numbers = {
    likes: 0,
    denys: 0,
    superLikes: 0,
    //Updates the footer of the DOM
    updateNumbers: function () {
      numberLikes.innerText = `Likes: ${this.likes} - ${
        ((this.likes / total) * 100).toFixed(1)
      }%`;
      numberDenys.innerText = `Dennies: ${this.denys} - ${
        ((this.denys / total) * 100).toFixed(1)
      }%`;
      numberSuperLikes.innerText = `Super Likes: ${this.superLikes} - ${
        ((this.superLikes / total) * 100).toFixed(1)
      }%`;
      matches.innerText = `Matches: ${match} - ${((match / total) * 100).toFixed(1)}%`;
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

//Observer Pattern
//class EventObserver {
//  constructor() {
//    this.activeEvents = [];
//  }
//
//  adicionar(fn) {
//    this.activeEvents.push(fn);
//  }
//
//  remover(fn) {
//    this.activeEvents = this.activeEvents.filter((item) => {
//      if (item !== fn) return item;
//    });
//  }
//}

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
  if (!animating) updateProfile.nextProfile("red", "thumb_down", "denys");
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

  const Update = function (response) {
    profilePicture.src = response.picture.medium;
    nome.innerText = `${response.name.first} ${
      response.name.last
    } #${randomId.novoId()}`;
    age.innerText = `${response.dob.age} Years`;
    description.innerText = `teste`;
    address.innerText = `${response.location.state}, ${response.location.city}`;
  };

  return {

    callUpdate: function () {
      Http.get(`https://randomuser.me/api/?gender=${gender}`)
        .then((res) => {
          Update(res.results[0]);
        })
        .catch((err) => {
          console.error(err);
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
      UpdateNumbers.add(type);

      setTimeout(() => {
        pessoa.classList = "next";
      }, 300);
      setTimeout(() => {
        this.callUpdate();
        changeContainer.classList = "";
      }, 700);
      setTimeout(() => {
        pessoa.classList = "";
        animating = false;
      }, 1700);
    },
  };
})();
