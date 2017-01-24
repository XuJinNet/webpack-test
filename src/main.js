
import('./b')
	.then(b => {
		b.default.test();
	});

class A {
	constructor() {

	}

	func1() {
		console.log('money 💰😊');
	}
}

const a = new A();
a.func1();