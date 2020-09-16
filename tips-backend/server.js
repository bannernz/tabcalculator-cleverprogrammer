// import dependencies
import express from 'express';
import cors from 'cors';

// app config
const app = express();
const port = 9000;

// middlewares
app.use(express.json());
app.use(cors())

// api routes
app.get('/', (req, res) => {
	res.status(200).send('hello world')
})

app.post('/api/v1/calulatetip', (req, res) => {
	console.log('JSON: ',req.body);
	let amount = req.body.amount;
	let tipPercentage = req.body.tipPercentage;

	if (typeof amount !== 'int')
		amount = parseInt( amount );

		console.log('amount:        ',amount);
		console.log('tipPercentage: ',tipPercentage);
	
	if (typeof tipPercentage !== 'int')
		tipPercentage = parseInt( tipPercentage );

	let toBePaid = amount + (amount * (tipPercentage/100));

	console.log('amount:        ',amount);
	console.log('tipPercentage: ',tipPercentage);

	console.log('toBePaid:      ',toBePaid);

	res.status(200).send({toBePaid: toBePaid});
})


// listener
// console.log('Server Started');
app.listen(port, ()=>console.log(`listening on localhost:${port}`));