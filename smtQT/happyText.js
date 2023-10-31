function initparticles() {
    bubbles();
    hearts();
    confetti();
    confettiTwo();
 }
 
 /*The measurements are ... whack (so to say), for more general text usage I would generate different sized particles for the size of text; consider this pen a POC*/
 
 function bubbles() {
    $.each($(".particletext.bubbles"), function(){
       var bubblecount = ($(this).width()/50)*10;
       for(var i = 0; i <= bubblecount; i++) {
          var size = ($.rnd(40,80)/10);
          $(this).append('<span class="particle" style="top:' + $.rnd(20,30) + '%; left:' + $.rnd(0,95) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0,30)/10) + 's;"></span>');
       }
    });
 }
 
 function hearts() {
    $.each($(".particletext.hearts"), function(){
       var heartcount = ($(this).width()/50)*3;
       for(var i = 0; i <= heartcount; i++) {
          var size = ($.rnd(70,100)/10);
          $(this).append('<span class="particle" style="top:' + $.rnd(20,30) + '%; left:' + $.rnd(0,95) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0,30)/10) + 's;"></span>');
       }
    });
 }
 
 
 function confetti() {
    $.each($(".particletext.confetti"), function(){
       var confetticount = ($(this).width()/50)*10;
       for(var i = 0; i <= confetticount; i++) {
          $(this).append('<span class="particle c' + $.rnd(1,4) + '" style="top:' + $.rnd(20,80) + '%; left:' + $.rnd(0,100) + '%;width:' + $.rnd(6,12) + 'px; height:' + $.rnd(1,5) + 'px;animation-delay: ' + ($.rnd(0,30)/10) + 's;"></span>');
       }
    });
 }

 function confettiTwo() {
   $.each($(".particletext.confettiTwo"), function(){
      var confetticount = ($(this).width()/50)*10;
      for(var i = 0; i <= confetticount; i++) {
         $(this).append('<span class="particle c' + $.rnd(1,4) + '" style="top:' + $.rnd(20,30) + '%; left:' + $.rnd(0,100) + '%;width:' + $.rnd(6,12) + 'px; height:' + $.rnd(1,5) + 'px;animation-delay: ' + ($.rnd(0,30)/10) + 's;"></span>');
      }
   });
}
 
 jQuery.rnd = function(m,n) {
       m = parseInt(m);
       n = parseInt(n);
       return Math.floor( Math.random() * (n - m + 1) ) + m;
 }
 
 initparticles();
 
 