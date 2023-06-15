// Get all the buttons inside the button container

const buttons = document.querySelectorAll('.button');

// Loop through each button and assign animation delays
  buttons.forEach((button, index) => {
    button.style.opacity = 0;
    button.style.animationDelay = `${index * 0.2}s`;
});
