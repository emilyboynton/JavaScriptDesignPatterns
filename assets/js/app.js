var model = {
	cats : [
		{
			name : 'Vampire Cat', 
			pic : 'assets/vampirecat.jpg', 
			click : 0
		},
		{
			name : 'Cowboy Cat', 
			pic : 'assets/cowboycat.jpg', 
			click : 0
		},
		{
			name : 'Coffee Cat', 
			pic : 'assets/coffeecat.jpg',
			click :  0
		},
		{
			name : 'Flower Cat', 
			pic : 'assets/flowercat.jpg', 
			click : 0
		},
		{ 
			name :'iCat', 
			pic : 'assets/iCat.jpg',
			click : 0
		}
	],

	currentCat : null

};

var octopus = {
	init : function(){
		model.currentCat = model.cats[0];
		view.init();
		view.renderList(model.cats);
		if (model.currentCat != null ){
			view.renderCatDetails();
		}
		view.renderAdmin();
	},

	setCurrentCat : function(data){
		model.currentCat = data;
	},

	getCatDetails : function() {
		return model.currentCat;
	},

	increaseCatClicks : function(){
		model.currentCat.click += 1;
	},

	setCatName : function(data) {
		model.currentCat.name = data;
	},

	setCatUrl : function(data) {
		model.currentCat.pic = data;
	},

	setCatClicks : function(data) {
		model.currentCat.click = data;
	},

	getCats : function() {
		return model.cats;
	}

};

var view = {
	init : function() {
		this.catName = document.getElementById('cat-name');
		this.catClicks = document.getElementById('cat-clicks');
		this.catPic = document.getElementById('cat-pic');
		this.catList = document.getElementById('cat-list');
		this.adminButton = document.getElementById('admin-show');
		this.adminArea = document.getElementById('admin');
		this.adminCatName = document.getElementById('admin-name');
		this.adminCatClicks = document.getElementById('admin-clicks');
		this.adminCatUrl = document.getElementById('admin-url');
		this.adminCancel = document.getElementById('admin-hide');
		this.adminSubmit = document.getElementById('admin-update');


		this.adminButton.addEventListener('click', (function(){
			view.removeHidden();
		}));

		this.adminCancel.addEventListener('click', (function(){
			view.addHidden();
		}));

		this.adminSubmit.addEventListener('click', (function(){
			view.submit();
			view.addHidden();
		}))
	},

	renderList : function(data){
		this.catList.innerHTML="";
		for (var i = 0; i < data.length; i++){
			var catObject = data[i];

			var item = document.createElement('li');
			item.textContent = catObject.name;
			
			item.addEventListener('click', (function(catObjectCopy){
				return function(){
					octopus.setCurrentCat(catObjectCopy);
					octopus.increaseCatClicks();
					view.renderCatDetails();
					view.renderAdmin();
				};

			})(catObject));

			this.catList.appendChild(item);
		}
	},

	renderCatDetails : function() {
		details = octopus.getCatDetails();
		this.catName.textContent = details.name;
		this.catClicks.textContent = "Clicks: " + details.click;
		this.catPic.src = details.pic;
	},

	renderAdmin : function() {
		details = octopus.getCatDetails();
		this.adminCatName.value = details.name;
		this.adminCatUrl.value = details.pic;
		this.adminCatClicks.value = details.click;
	},

	submit : function() {
		octopus.setCatName(view.adminCatName.value);
		octopus.setCatUrl(view.adminCatUrl.value);
		octopus.setCatClicks(parseInt(view.adminCatClicks.value));
		this.renderList(octopus.getCats());
		this.renderCatDetails();
	},

	addHidden : function() {
		this.adminArea.classList.add('hidden');
	},

	removeHidden : function() {
		this.adminArea.classList.remove('hidden');
	}

};

octopus.init();

