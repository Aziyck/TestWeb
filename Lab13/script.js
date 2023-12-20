let dur = 5000;
let distance = -100;
let startDelay = 0;
let staggerDelay = 100;
anime({
    targets: '.mask',
    translateY: 150,
    duration: 3000,
    easing: 'linear',
    direction: 'alternate',
    endDelay: 1000,
    delay: 1000,
    loop: true
});


anime(
  {
    rotate:{
      value:180,
      duration: 0
    },
    targets: '.wave',
    translateX: 500,
    loop: true,
    duration: 4000,
    easing:'linear',
    direction: 'alternate',
  }
)


