/*Version 1 
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
*/
const listOfCats = document.getElementById('listOfCats');
const selectedCatName = document.getElementById('selectedCatCaption');
const selectedCatImg = document.getElementById('selectedImg');
const selectedCatClickCount = document.getElementById('clickCount');

let selectedCat;
let totalCount = 0;

class Cat{
	constructor(name, src, count){
		this.name = name;
		this.src = src;
		this.count = count;
	}
}

var defaultCatList = [
	['Chidozie', 'img/chidozie.jpg'],
	['Egiemeh', 'img/egie.jpg'],
	['Obinna', 'img/obinna.jpg'],
	['Kizito', 'img/kizito.jpg'],
	['Ebere', 'img/ebere.jpg'],
];

var catList = defaultCatList.map(cat => {
	const thisCat = new Cat(cat[0], cat[1], 0);
	// console.log(thisCat);
	return thisCat;
});

console.log(catList);

let catListHTML;

let listCats = function(){
	catListHTML='';
	for (var i = catList.length - 1; i >= 0; i--) {
		var catName = catList[i].name;
		// var catsrc = catList[i].name;
		// catListHTML += ('<p id="aCat">' + catName + '</p>');
		// console.log(catListHTML);

		 // We're creating a DOM element for the number
	    var elem = document.createElement('p');
	    elem.textContent = catName;

	    // ... and when we click, alert the value of `num`
	    elem.addEventListener('click', (function(catNameCopy) {
	        return function() {
	        	updateStatus(catNameCopy);
	        	selectedCat = catNameCopy;
				console.log('clicked');
	        };
	    })(catName));
	    listOfCats.appendChild(elem);
	}
}

(function(){
	listCats();
})

// $('#aCat').click(function(e) {
//   //the element has been clicked... do stuff here
//   console.log('clicked');
//   let ele = $(this).html();
//   console.log(ele);
// });

var updateStatus = function(thisCatName){
	for (var i = catList.length - 1; i >= 0; i--) {
		var catName = catList[i].name;
		console.log('catName - ' + catName);
		console.log('thisCatName - ' + thisCatName);
		if (catName === thisCatName) {
			var catSrc = catList[i].src;
			var catCount = catList[i].count;
			selectedCatName.textContent = catName;
			selectedCatImg.src = catSrc;
			selectedCatClickCount.textContent = catCount;
           	console.log(catSrc + ' , ' + catName);
           	break;
		}
	}
}

$('#selectedImg').click(function(e) {
  //the element has been clicked... do stuff here
  	for (var i = catList.length - 1; i >= 0; i--) {
		var catName = catList[i].name;
		if (catName === selectedCat) {
			var catCount = catList[i].count;
			catCount += 1;
			totalCount += 1;
			catList[i].count = catCount;
			selectedCatClickCount.textContent = catCount;
           	break;
		}
	}
	$('#clickCountTotal').html(totalCount);
});