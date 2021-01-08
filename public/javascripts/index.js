//動畫
anime({
    targets: '.flash',
    opacity: [0,1],
    loop: true,
    duration: 1500,
    easing: 'linear'
});

anime({
    targets: '.eat',
    translateX: [-2000,0], // -> '250px'
    autoplay: true,
    duration: 1000,
});

anime({
   targets: '.JS',
   opacity: [0,1],
   delay: (el, i) => 150 * (i),
});

anime({
    targets: '.ut',
    opacity: [0,1],
    delay: (el, i) => 150 + 100 * (i),
});

// anime.timeline({loop: true})
//     .add({
//         targets: '.flash',
//         scale: [0, 1],
//         duration: 1000,
//         elasticity: 600,
//         delay: (flash, i) => 45 * (i+1)
//     }).add({
//     targets: '.flash',
//     opacity: 0,
//     duration: 1000,
//     easing: "easeOutExpo",
//     delay: 1000
// });