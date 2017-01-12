var initialCats = [
	{
		clickCount : 0,
		name : 'Vampire Cat',
		imgSrc : '../assets/vampirecat.jpg',
		nicknames : ['v', 'v money', 'v for vendetta', 'bella swan']
	},
	{
		clickCount : 0,
		name : 'Coffee Cat',
		imgSrc : '../assets/coffeecat.jpg',
		nicknames : ['java', 'iced kitty', 'catteine']
	},
	{
		clickCount : 0,
		name : 'Flower Cat',
		imgSrc : '../assets/flowercat.jpg',
		nicknames : ['hippie', 'peace kitty']
	},
	{
		clickCount : 0,
		name : 'Cowboy Cat',
		imgSrc : '../assets/cowboycat.jpg',
		nicknames : ['cowboy', 'lone ranger']
	},
	{
		clickCount : 0,
		name : 'iCat',
		imgSrc : '../assets/icat.jpg',
		nicknames : ['iPhone', 'toasty']
	}

];


var Cat = function(data){
	this.clickCount = ko.observable(data.clickCount);
	this.name = ko.observable(data.name);
	this.imgSrc = ko.observable(data.imgSrc);
	this.nicknames = ko.observableArray(data.nicknames);

	this.title = ko.computed(function(){
		var title;
		var clicks = this.clickCount();
		if (clicks < 10) {
			title = "Newborn";
		} else if (clicks < 20) {
			title = "Infant";
		} else if (clicks < 30) {
			title = "Child";
		} else if (clicks < 40) {
			title = "Teen";
		} else if (clicks < 50) {
			title = "Adult";
		} else {
			title = "Cat";
		}
		return title;
	}, this);

}

var ViewModel = function(){
	var self = this;

	this.catList = ko.observableArray([]);

	initialCats.forEach(function(catItem){
		self.catList.push(new Cat(catItem));
	});

	this.currentCat = ko.observable(this.catList()[0]);

	this.setCurrent = function(index){
		self.currentCat(self.catList()[index]);
	};

	this.incrementCounter = function(){
		self.currentCat().clickCount(self.currentCat().clickCount() + 1);
	};
}

ko.applyBindings(new ViewModel());