var ImageJs = require('imagejs'),
	request = require('request');


function getRNumbers(){
	return new Promise(function(resolve, reject) {
		request('https://www.random.org/integers/?num=128&min=0&col=1&max=255&base=10&format=plain&rnd=new', function(err, response, body) {
			if(err) {
				return reject(err);
			}
			resolve(body.split("\n").map(function(item){ return parseInt(item)}));
		});
	});
}

function getGNumbers(){
	return new Promise(function(resolve, reject) {
		request('https://www.random.org/integers/?num=128&min=0&col=1&max=255&base=10&format=plain&rnd=new', function(err, response, body) {
			if(err) {
				return reject(err);
			}
			resolve(body.split("\n").map(function(item){ return parseInt(item)}));
		});
	});
}

function getBNumbers(){
	return new Promise(function(resolve, reject) {
		request('https://www.random.org/integers/?num=128&min=0&col=1&max=255&base=10&format=plain&rnd=new', function(err, response, body) {
			if(err) {
				return reject(err);
			}
			resolve(body.split("\n").map(function(item){ return parseInt(item)}));
		});
	});
}

Promise.all([getRNumbers(), getBNumbers(), getGNumbers()])
.then(function(values) {
	var r = values[0],
		g = values[1],
		b = values[2];

	var bitmap = new ImageJs.Bitmap({
		width: 128,
		height: 128
	});

	for(var i = 0; i < 128; i++) {
		for(var j = 0; j < 128; j++) {
			bitmap.setPixel(i, j, {
				r: r[j] + r[i],
				g: g[j] + g[i],
				b: b[j] + b[j]
			});
		}
	}

	bitmap.writeFile("image.jpg").then(function() {
		console.log("Image Written successfully");
	});
});