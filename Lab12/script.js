let dur = 2000;
let distance = 300;
let startDelay = 0;
let staggerDelay = 100;
anime({
    targets: '.firstAnime .circle',
    translateX: [
        { value: distance,    duration: dur,    delay: anime.stagger(staggerDelay, {start:startDelay})},
        { value: 0,           duration: dur,    delay: startDelay}
      ],
      loop: true
});

anime({
  targets: '.secondAnime .circle',
  translateX: [
      { value: distance,    duration: dur,    delay: anime.stagger(staggerDelay, {start:startDelay})},
      { value: 0,           duration: dur,    delay: startDelay}
    ],
    loop: true
});

