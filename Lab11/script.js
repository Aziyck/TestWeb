// anime({
//     targets: '.circle',
//     translateX: 250,
//     backgroundColor: '#000',
//     loop: true,
//     duration: 2000, 
//     scale: 3,
//     translateY: 100,
// });


//first circle
let dur = 1500;
let varDelay = dur/6;
let distortion = 3;
let distance = 600;
anime({
    targets: '.circle:nth-child(1)',
    translateX: [
        { value: distance,   duration: dur,  delay: 0},
        { value: 0,     duration: dur,  delay: varDelay}
      ],

      scaleX: [
        { value: distortion,    duration: varDelay,     delay: 0,   easing: 'easeOutExpo' },
        { value: 1,             duration: dur },
        { value: distortion,    duration: varDelay,     delay: 0,   easing: 'easeOutExpo' },
        { value: 1,             duration: dur }
      ],
      
      easing: 'easeOutElastic(1, .75)',
      loop: true
});


anime({
    targets: '.circle:nth-child(2)',
    translateX: function(el) {
        return el.getAttribute('data-x');
      },
      translateY: function(el, i) {
        return 50 + (-50 * i);
      },
      scale: function(el, i, l) {
        return (l - i) + .25;
      },
      rotate: function() { return anime.random(-360, 360); },
      borderRadius: function() { return ['50%', anime.random(10, 35) + '%']; },
      duration: function() { return anime.random(1200, 1800); },
      delay: function() { return anime.random(0, 400); },
      direction: 'alternate',
      loop: true

});