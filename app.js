// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact){
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}

// Create Dino Objects



const Dinos = () => (() => {
  let dinos = []; 
  (() => {
    // Set HTTP request
    const request = {
      httpMethod : 'GET',
      endPoint : './dino.json',
      isAsync : false
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
    
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        dinos = [].concat(response.Dinos);
      } else {
        console.log("somethng wrong");
      }
    
    };
    
    // Process HTTP request
    xhr.open(request.httpMethod, request.endPoint, request.isAsync);
    xhr.send();
    
  })();
  return {
    compareByDiet(diet){
      return [dinos[0], dinos[1], dinos[2]];
    },
    compareByHeight(height){
      return [dinos[3], dinos[4]];
    },
    compareByWeight(weight){
      return [dinos[5], dinos[6], dinos[7]];
    }

  };
})();

// Create Human Object
const Human = (nameElt, feetElt, inchesElt, weightElt, dietElt)=>((nameElt, feetElt, inchesElt, weightElt, dietElt)=> {
  const name = nameElt;
  const feet = feetElt;
  const inches = inchesElt;
  const weight = weightElt;
  const diet = dietElt;
  return {
    retreiveData(){
      return {
        name: name.value,
        height: feet.value * 12 + inches.value,
        weight: weight.value,
        diet: diet.value
      }
    }
  };
})(nameElt, feetElt, inchesElt, weightElt, dietElt);

let  human = Human(
  // Use IIFE to get human data from form
  document.getElementById('name'),
  document.getElementById('feet'),
  document.getElementById('inches'),
  document.getElementById('weight'),
  document.getElementById('diet')
);

// Generate Tiles for each Dino in Array
    const HumanTile = (user) => {
      const  tile =  document.createElement('div');
      const  name = document.createElement('h3');
      const  graphic = document.createElement('img');

      tile.classList.add('grid-item');
      graphic.src = "./avatar.png";
      name.textContent = user.name;
      tile.appendChild(name);
      tile.appendChild(graphic);
      return tile;
    };

    const DinoTile = (dino) => {
      const  tile =  document.createElement('div');
      const  species = document.createElement('h3');
      const  image = document.createElement('img');
      const  fact = document.createElement('p');

      tile.classList.add('grid-item');
      image.src = "./image.jpeg";
      species.textContent = dino.species;
      tile.appendChild(species);
      tile.appendChild(image);
      fact.textContent = dino.fact;
      tile.appendChild(fact);
      
      return tile;
    };

    // Add tiles to DOM
    const grid = document.getElementById('grid');
    const addTiles = (user) => {
      const dinos = Dinos();
      const dinosByDiet = dinos.compareByDiet(user.diet);
      const dinosByHeight = dinos.compareByHeight(user.height);
      const dinosByWeight = dinos.compareByWeight(user.weight);

      dinosByDiet.map(dino => grid.appendChild(DinoTile(dino)));
      dinosByHeight.map(dino => grid.appendChild(DinoTile(dino)));
      dinosByWeight.map(dino => grid.appendChild(DinoTile(dino)));
      grid.insertBefore(HumanTile(user), grid.children[4]);
    }

// Remove form from screen
    const form = document.getElementById('dino-compare');
    const removeForm = () => {
      form.style.display = "none";
    }

// On button click, prepare and display infographic
const btn = document.getElementById('btn');
btn.addEventListener('click', function(){
    const user = human.retreiveData();
    removeForm();
    addTiles(user);
});