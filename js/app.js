//Elements of the DOM
const likeButton = document.querySelector("#like");
const denyButton = document.querySelector("#deny");
const pessoa = document.querySelector("#pessoa");
const profilePicture = document.querySelector("#profile-pic");
const nome = document.querySelector("#name");
const age = document.querySelector("#age");
const description = document.querySelector("#description");
const address = document.querySelector("#address");
const info = document.querySelector("#info");
const genderSwitch = document.querySelector("#gender");

//Http GET request template
class Http {
  static async get(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  }
}

window.onload = () => {
  UpdateProfile.callUpdate();
}

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

//class that gives a unique id from the range(1, 150)
class RandomNumber {
  constructor() {
    this.usedIds = [];
  }
  novoId() {
    let Id = Math.floor(Math.random() * 150 + 1);
    if (!this.usedIds.includes(Id)) {
      this.usedIds.push(Id);
      return Id;
    } else {
      return this.novoId();
    }
  }
}
const randomId = new RandomNumber();

let animating = false;

//Function that calls the like animation and goes to the next profile.
const likeProfile = function () {
  animating = true;
  info.classList = "closed";
  setTimeout(() => {
    pessoa.classList = "liked";
  }, 300);
  setTimeout(() => {
    UpdateProfile.callUpdate();
    info.classList = "";
  }, 700);
  setTimeout(() => {
    pessoa.classList = "";
    animating = false;
  }, 1500);
};

likeButton.addEventListener("click", () => {
  if(!animating) likeProfile();
});

genderSwitch.addEventListener('change', () => {
  UpdateProfile.changeGender();
});

//const eventos = new EventObserver();
//eventos.adicionar(likeProfile);
//eventos.remover(likeProfile);

//Fuctions that updates DOM profile in modular pattern;
const UpdateProfile = (function () {
  let gender = 'female';
  const Update = function (response) {
    profilePicture.src = response.picture.medium;
    nome.innerText = `${response.name.first} ${response.name.last} #${randomId.novoId()}`;
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
    changeGender: function(){
      if(genderSwitch.checked){
      genderSwitch.parentElement.classList = gender = 'male';
      }
      else{
       gender = 'female';
      genderSwitch.parentElement.classList = "";
      }
    }
  };
})();