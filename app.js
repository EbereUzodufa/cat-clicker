var totalCounter = 0;
var model = {
	catList: [
		{
			name:'Chidozie',
			src:'img/chidozie.jpg',
			imgAttr:'cat Chidozie',
			clickCounter:0
		},
		{
			name:'Egiemeh',
			src:'img/egie.jpg',
			imgAttr:'cat Egiemeh',
			clickCounter:0
		},
		{
			name:'Obinna',
			src:'img/obinna.jpg',
			imgAttr:'cat Obinn',
			clickCounter:0
		},
		{
			name:'Kizito',
			src:'img/kizito.jpg',
			imgAttr:'cat Kizito',
			clickCounter:0
		},
		{
			name:'Ebere',
			src:'img/ebere.jpg',
			imgAttr:'cat Ebere',
			clickCounter:0
		}
	],

	selectedCat: null,

	// totalCount: 0
};

var octopus = {
	init: function(){
		model.selectedCat = model.catList[0];

		theCatListsView.init();
		theCatView.init();
	},

	getCats: function(){
		return model.catList;
	},

	getSelectedCat: function(){
		return model.selectedCat;
	},

	setSelectedCat: function(thisCat){
		model.selectedCat = thisCat;
	},

	increaseSelectedCatCounter: function(){
		model.selectedCat.clickCounter++;
		// totalCounter++;
		// modal.totalCount = totalCounter;
		theCatView.render();
	}
}

var theCatView = {
    init: function() {
        // store pointers to our DOM elements for easy access later
        this.thisCatElem = document.getElementById('catDisplay');
        this.thisCatNameElem = document.getElementById('selectedCatCaption');
        this.thisCatImageElem = document.getElementById('selectedImg');
        this.thisCountElem = document.getElementById('clickCount');

        // on click, increment the current cat's counter
        this.thisCatImageElem.addEventListener('click', function(){
            octopus.increaseSelectedCatCounter();
            totalCounter++;
            console.log(totalCounter);
            $('#clickCountTotal').html(totalCounter);
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var selectedCat = octopus.getSelectedCat();
        this.thisCountElem.textContent = selectedCat.clickCounter;
        this.thisCatNameElem.textContent = selectedCat.name;
        this.thisCatImageElem.src = selectedCat.src;
        this.thisCatImageElem.alt = selectedCat.imgAttr;
    }
};

var theCatListsView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('listOfCats');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setSelectedCat(catCopy);
                    theCatView.render();
                };
            })(cat));

            this.catListElem.appendChild(elem);
        }
    }
};

octopus.init();