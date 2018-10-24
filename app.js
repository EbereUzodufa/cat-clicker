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
			imgAttr:'cat Obinna',
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
	},

    updateCat: function(catNewName, catNewUrl, catNewCounter){
        this.cat = model.selectedCat;
        this.cat.name = catNewName;
        this.cat.src = catNewUrl;
        this.cat.clickCounter = catNewCounter;
        console.log(this.cat);
        alert('Updated');
        theCatView.render();
        theCatListsView.render();
    },

    addNewCat: function(newCatName, newCatUrl){
        let newCat = new Object({
            name:newCatName,
            src:newCatUrl,
            imgAttr:'cat ' + newCatName,
            clickCounter:0,
        });
        
        //console.log(newCat);
        model.catList.push(newCat);
        //console.log(model.catList);
        //alert('Add new Cat');
        console.log('Add new Cat - ' + newCat.name);
        theCatView.render();
        theCatListsView.render();
    },

    totalCount: function(){
        var cats = octopus.getCats();
        let countCatsClicks = 0;
        // console.log('<!------>');
        for (var i = cats.length - 1; i >= 0; i--) {
            // console.log(cats[i].name + ' - ' + cats[i].clickCounter);
            countCatsClicks += cats[i].clickCounter;
        }
        totalCounter = countCatsClicks;
        // console.log('This is the countCatsClicks:' + countCatsClicks);
        // console.log('This is the totalCounter:' + totalCounter);
        // console.log('<------!>');
    }
}

var theCatView = {
    init: function() {
        // store pointers to our DOM elements for easy access later
        this.thisCatElem = document.getElementById('catDisplay');
        this.thisCatNameElem = document.getElementById('selectedCatCaption');
        this.thisCatImageElem = document.getElementById('selectedImg');
        this.thisCountElem = document.getElementById('clickCount');

        this.formCatName = document.getElementById('formCatName');
        this.formCatUrl = document.getElementById('formCatUrl');
        this.formCatClickCount = document.getElementById('formCatClickCount');

        // on click, increment the current cat's counter
        this.thisCatImageElem.addEventListener('click', function(){
            octopus.increaseSelectedCatCounter();
            totalCounter++;
            console.log(totalCounter);
            $('#clickCountTotal').html(totalCounter);
            octopus.totalCount();
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

        this.formCatName.value = selectedCat.name;
        this.formCatUrl.value = selectedCat.src;
        this.formCatClickCount.value = selectedCat.clickCounter;
    }
};

var theCatListsView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('listOfCats');
        const adminButton = document.getElementById('showAdminButton');
        const cancelButton = document.getElementById('cancelButton');
        const submitButton = document.getElementById('submitButton');
        const addNewCatButton = document.getElementById('addNewCatButton');
        const form = document.getElementById('adminPanel');
        // render this view (update the DOM elements with the right values)

        //Cancel Button function
        adminButton.addEventListener('click', function(e){
            // console.log('Okay');
            $(form).toggle('hidden');
        });

        cancelButton.addEventListener('click', function(ev){
            // console.log('Okay');
            ev.preventDefault();
            // $(form).hide(); This will work perfects
            $(form).toggle('hidden');
        });

        submitButton.addEventListener('click', function(ev){
            // console.log('Okay');
            ev.preventDefault();
            this.formCatName = document.getElementById('formCatName');
            this.formCatUrl = document.getElementById('formCatUrl');
            this.formCatClickCount = document.getElementById('formCatClickCount');

            //console.log(this.formCatName.value + ', ' + this.formCatUrl.value + ', ' + this.formCatClickCount.value);
            octopus.updateCat(this.formCatName.value, this.formCatUrl.value, this.formCatClickCount.value);
        });

        addNewCatButton.addEventListener('click', function(ev){
            // console.log('Okay');
            ev.preventDefault();
            this.formAddCatName = document.getElementById('formAddCatName');
            this.formAddCatUrl = document.getElementById('formAddCatUrl');

            //console.log(this.formAddCatName.value + ', ' + this.formAddCatUrl.value);
            octopus.addNewCat(this.formAddCatName.value, this.formAddCatUrl.value);

            this.formAddCatName.value = '';
            this.formAddCatUrl.value = '';
        });

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