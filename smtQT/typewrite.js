console.clear();

const typing = document.querySelectorAll('.typewriter');

function randomOpacity() {
  return (Math.floor(Math.random() * 70) + 50) / 100;
}

function randomEms() {
  if (Math.random() > 0.7) {
    return (Math.floor(Math.random() * 100) - 50) / 650;
  } else {
    return 0;
  }
}


function wrap(char) {
  return '<span style="opacity:' + randomOpacity() + '; text-shadow:' + randomEms() + 'em ' + randomEms() + 'em currentColor;">' + char + '</span>';
}

typing.forEach(element => {

  const text = element.textContent;
  let wrappedText = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    wrappedText += wrap(char);
  }

  element.innerHTML = wrappedText;
});


