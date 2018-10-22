let clickCounter = 0;


$('#theCat').click(function(e) {
  //the element has been clicked... do stuff here
  clickCounter++;
  let ele = document.getElementById('clickCount');
  ele.textContent = clickCounter;
});