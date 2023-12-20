let dur = 600;
let distance = -100;
let startDelay = 0;
let staggerDelay = 200;
anime({
    targets: '.container:nth-child(1) .ball',
    translateY: [
        { value: distance,    duration: dur,    delay: anime.stagger(staggerDelay, {start:startDelay})},
        { value: 0,           duration: dur,    delay: 0},
      ],
      scale:[
        {value: 1.5, duration: dur, delay: anime.stagger(staggerDelay, {start:startDelay})},
        {value: 1,   duration: dur, delay: 0},
      ],
      loop: true,
      easing: 'easeInOutSine'
});

anime({
  targets: '.container:nth-child(3) .ball',
  translateY: [
      { value: -distance,    duration: dur,    delay: anime.stagger(staggerDelay, {start:startDelay})},
      { value: 0,           duration: dur,    delay: 0},
    ],
    scale:[
      {value: 1.5, duration: dur, delay: anime.stagger(staggerDelay, {start:startDelay})},
      {value: 1,   duration: dur, delay: 0},
    ],
    loop: true,
    easing: 'easeInOutSine'
});

