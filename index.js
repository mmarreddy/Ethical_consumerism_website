//Dark mode button functionality
let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode)

//Signatures section functionality
let count = 3;
let signNowButton = document.getElementById("sign-now-button")

const addSignature = (person) => {
  //create new signature
  const newSign = document.createElement('p');
  newSign.textContent = `🖊️${person.name} from ${person.hometown} supports this.`;

  const signaturesSection = document.querySelector('.signatures');
  signaturesSection.appendChild(newSign);

  //counter
  const counter =
    document.getElementById('counter');
  counter.remove();
  count = count + 1;
  const newCounter = document.createElement('p');
  newCounter.id = 'counter';
  newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause`;
  signaturesSection.appendChild(newCounter);
}

const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;
  let person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value,
  }
  // TODO: Loop through all inputs
  for (let key in person) {
    if (person.hasOwnProperty(key)) { // Check if the property exists in person
      let inputValue = person[key];
      if (inputValue.length < 2) {
        containsErrors = true;
        petitionInputs[key].classList.add('error'); // Check if petitionInputs[key] exists before accessing classList
      } else {
        petitionInputs[key].classList.remove('error');
      }
    }
  }
  const email = document.getElementById('email');
  if (!email.value.includes('.com')) {
    email.classList.add('error');
    containsErrors = true;
  } else {
    email.classList.remove('error');
  }
  
  if (!containsErrors) {
    addSignature(person);
    toggleModal(person);
    document.getElementById("sign-petition").reset();
  }
}
signNowButton.addEventListener('click', validateForm);


//Modal functionality
let modal = document.getElementById("thanks-modal");
toggleModal = (person) => {
  let modalContent = document.getElementById("thanks-modal-content");
  modalContent.textContent = `Thank you for signing ${person.name}! ${person.hometown} represent!`
  modal.style.display = "flex";
  setTimeout(()=>{
    modal.style.display= "none";
    clearInterval(intervalId);
  }, 4000);
  //add beating
  let intervalId = setInterval(scaleImage, 500);
}
//make image animated
let scaleFactor = 1;
modalImage = document.getElementById("modal-img");
scaleImage = () => {
  if(scaleFactor===1){
    scaleFactor = 0.8;
  }else{
    scaleFactor = 1;
  }
  modalImage.style.transform = `scale(${scaleFactor})`;
  }
//adding a close button
let closeButton = document.getElementById("close-button");

close = () => {
  modal.style.display = "none";
}

closeButton.addEventListener('click', close);

  
//Animation fucntionality
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease',
}

let revealableContainers = document.querySelectorAll('.revealable');

let reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
}
window.addEventListener('scroll', reveal);



//reduce motion button
let reduceButton = document.getElementById("motion-button");


reduceMotion = () => {
  animation.transitionDuration = '0.5s';
  animation.transitionProperty = 'none';
  animation.transitionTimingFunction = 'ease';
  animation.transitionDelay = '0.5s';
  animation.revealDistance = 0;
  animation.initialOpacity = 1;

  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transitionDuration = animation.transitionDuration;
    revealableContainers[i].style.transitionProperty = animation.transitionProperty;
    revealableContainers[i].style.transitionTimingFunction = animation.transitionTimingFunction;
    revealableContainers[i].style.transitionDelay = animation.transitionDelay;
    revealableContainers[i].style.opacity = animation.initialOpacity;
  }
}

reduceButton.addEventListener('click', reduceMotion);

