let clickCounter1 = 0;
let clickCounter2 = 0;


$('#theCat1').click(function(e) {
  //the element has been clicked... do stuff here
  clickCounter1++;
  let ele = document.getElementById('clickCount1');
  ele.textContent = clickCounter1;
  updateTotal();
});

$('#theCat2').click(function(e) {
  //the element has been clicked... do stuff here
  clickCounter2++;
  let ele = document.getElementById('clickCount2');
  ele.textContent = clickCounter2;
  updateTotal();
});

const updateTotal = function(){
	let totalCount = clickCounter1 + clickCounter2;
	console.log(totalCount);
	$('#clickCountTotal').html(totalCount);
	// $('#clickCountTotal').html(totalCount);
}