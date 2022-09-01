//Elements of the DOM
const likeButton = document.querySelector("#like");
const pessoa = document.querySelector("#pessoa");
const profilePicture = document.querySelector("#profile-pic");
const nome = document.querySelector("#name");
const age = document.querySelector("#age");
const description = document.querySelector("#description");
const address = document.querySelector("#address");

//Http GET request template
class Http {
    static async get(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  }
}

//Observer Pattern
class EventObserver {
  constructor() {
    this.activeEvents = [];
  }

  adicionar(fn) {
    this.activeEvents.push(fn);
  }

  remover(fn) {
    this.activeEvents = this.activeEvents.filter((item) => {
      if (item !== fn) return item;
    });
  }
}

class RandomNumber{
  constructor(){
    this.usedIds = [];
  }
  NovoId(){
    let Id = Math.floor(Math.random() * 150 + 1);
    if(this.userIds.includes(Id)){
      userIds.push(Id)
      return Id;
    }
    else{
      return this.NovoId();
    }
  }
}

//Function that calls the like animation and goes to the next profile.
const likeProfile = function () {
  pessoa.classList = "liked";
};

likeButton.addEventListener("click", likeProfile);

const eventos = new EventObserver();
eventos.adicionar(likeProfile);

//Fuctions that updates DOM profile in modular pattern;
const UpdateProfile = (function () {
  const Update = function (response) {
    profilePicture.src = response.picture.medium;
    nome.innerText = `${response.name.first} ${response.name.last}`;
    age.innerText = `${response.dob.age} Years`;
    description.innerText = `teste`;
    address.innerText = `${response.location.state}, ${response.location.city}`;
  };

  return {
    callUpdate: function () {
      Http
        .get("https://randomuser.me/api/?gender=female")
        .then((res) => {
          Update(res.results[0]);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  };
})();

UpdateProfile.callUpdate();
