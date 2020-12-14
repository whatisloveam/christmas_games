let slider = document.querySelector('.slide');
slider.style.transform = 'translateY(250px)';
let elemInBin = document.querySelector('.item-in-bin');
const del = 1600;
let gameOver = false; 


let items = [
  { isToy:true, name: 'caramel'},
  { isToy:true, name: 'green_ball'},
  { isToy:true, name: 'red_ball'},
  { isToy:true, name: 'star'},
  { isToy:true, name: 'present'},
  { isToy:true, name: 'top_star'},
  { isToy:false, name: 'apple'},
  { isToy:false, name: 'skeleton'},
  { isToy:false, name: 'socks'},
  { isToy:false, name: 'tire'}
  ]
 
  shuffle(items);
  let currentItem = items.pop();
  slider.src = 'images\\' + currentItem.name + '.png';

  setTimeout(autoFillTree, del,currentItem.name + ' ');

document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowDown' && !gameOver ) {
      setItemOnTree();
    }

  });

function setItemOnTree(){
  if (currentItem.isToy) {

    let j = document.querySelector('.' + currentItem.name);
    j.style.visibility = 'visible';
    setNewElement();
  }
  else {
      gameOver = true;
      let l = document.querySelector('.lose');
      l.src = slider.src;
      l.style.visibility='visible';
      slider.style.visibility = 'hidden';
      let s = document.querySelector('.condolence');
      s.style.visibility = 'visible';
  }
}


document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowRight' && !gameOver) {
    elemInBin.src = slider.src;
    if (!currentItem.isToy) {
     setNewElement();
   }
   else {
     gameOver = true;
     slider.style.visibility = 'hidden';
     let s = document.querySelector('.condolence');
     s.style.visibility = 'visible';
   }
  }
   

});


function setNewElement(){
  if (items.length > 0) {
    currentItem = items.pop();
    slider.src = 'images\\' + currentItem.name + '.png';
    slider.style.transform = 'translateY(0px)';
    slider.style.transition = 'transform 0s' ;
    setTimeout(updateSlider,100);
    setTimeout(autoFillTree, del, currentItem.name + ' ');
  } else {
    gameOver = true;
    slider.style.visibility = 'hidden';
    let c = document.querySelector('.congr');
    c.style.visibility='visible';
  }
}

  function autoFillTree(n) {
    if (currentItem.name + ' ' == n  && !gameOver) {
      setItemOnTree();
  }
}
  



  function shuffle(arr){
    var j, temp;
    for(var i = arr.length - 1; i > 0; i--){
      j = Math.floor(Math.random()*(i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
  }


  function updateSlider() {
    slider.style.transform = 'translateY(250px)';
    slider.style.transition = 'transform 1.5s';
    slider.style.transitionTimingFunction =  'linear';
  }

  document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && gameOver) {
      
     setTimeout(g, 300);
    
    }
  }); 

  function g(){
    location.reload();
  }
  

