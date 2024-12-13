// import mysql from 'mysql';

// export default function mysqlConnect() {
// 	const con = mysql.createConnection({
// 		host: 'localhost',
// 		user: 'root',
// 		password: 'sachin',
// 		database: 'practice',
// 	});

// 	con.connect((err) => {
// 		if (err) console.log(err);
// 		else console.log('connection created');
// 	});

// 	con.query(
// 		'select * from player where id >= ? and age > ?',
// 		[3, 10],
// 		(error, data) => {
// 			if (error) console.log(error);
// 			else console.log(data[0].name);
// 		},
// 	);
// }

// class B {
// 	gcd(a, b) {
// 		if (b === 0) return a;
// 		return this.gcd(b, a % b);
// 	}
// 	lcm(a, b) {
// 		return (a * b) / this.gcd(a, b);
// 	}
// 	countD(a, b, num) {
// 		return (
// 			Math.floor(num / a) +
// 			Math.floor(num / b) -
// 			Math.floor(num / this.lcm(a, b))
// 		);
// 	}
// 	fun(a, b, n) {
// 		let start = Math.min(a, b);
//         let end = start * n;

//         while ( start <= end )
//         {
//             let mid = ( start + end ) / 2;
//             let no = countD( a, b, mid );

//             if(no>)

//         }
// 	}
// }

// let a = new B();
// a.fun(2, 3, 10);

// var a = 1;
