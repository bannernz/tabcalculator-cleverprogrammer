import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	const [amount, setAmount] = useState(100);
	const [tipPercentage, setTipPercentage] = useState(5);
	const [toBePaid, setToBePaid] = useState();
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const minValue = -100;
	const maxValue = 100;

	const calculateTip = (e) => {
		e.preventDefault();

		const data = {
			amount: amount,
			tipPercentage: tipPercentage,
		};

		//const getAmount = 
		fetch('http://localhost:9000/api/v1/calulatetip',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		})
			.then((res) => {
				// console.log(res)
				return res.json();
			})
			.then((data) => {
				console.log('JSON: ', data);
				setToBePaid(data.toBePaid);
			});

	};

	const onChangePercentage = (e) => {
		let percentage = parseInt(e.target.value);
		
		// console.log(typeof percentage);
		// console.log(minValue,' <= ',percentage,' <= ',maxValue);
		// if (typeof percentage !== 'number'){
		// 	console.log(typeof percentage);
		// 	setButtonDisabled(true);
		// }
		// if ((( minValue <= percentage) && (percentage <= maxValue)) ) {  // && (buttonDisabled === true)
		if ((( minValue <= percentage) && (percentage <= maxValue)) ) {  // && (buttonDisabled === true)	
			setButtonDisabled(false);
			// console.log('(onChangePercentage) ',buttonDisabled,':  ', percentage);
			setTipPercentage(percentage);
			return ;	
		}
		else {
			// console.log('(onChangePercentage) ',buttonDisabled,': ', percentage);
			setButtonDisabled(true);
		}
		// console.log(minValue,' <= ',percentage,' <= ',maxValue);

		setTipPercentage(e.target.value);

		// setTipPercentage(e.target.value);
	}

	const buttonIncreaseClick = (e) => {
		let percentage = tipPercentage;
		
		if ( (percentage+1) < maxValue)
			percentage += 1;

		setTipPercentage(percentage);
	};

	const buttonDecreaseClick = (e) => {
		let percentage = tipPercentage;

		if ((percentage-1) > minValue)
			percentage -= 1;

		setTipPercentage(percentage);
	};

	return (
		<div className="app">
			<div className="app_header">
				<h1>Tip Calculator</h1>
			</div>
			<div className="app__amount field">
				<label>Amount</label>
				<input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />
			</div>
			<div className="app__percentage field">
				<label>Percentage</label>
				<div className="selector">
					<button className="button increase" onClick={buttonIncreaseClick}>+</button>
					<input className="percentage" type='text' value={tipPercentage} onChange={(e) => onChangePercentage(e)} min={minValue} max={maxValue} />
					<button className="button decrease" onClick={buttonDecreaseClick}>-</button>
				</div>
			</div>
			<div className="app__button">
				<button onClick={calculateTip} disabled={buttonDisabled}><span>Calc</span></button>
				<span className="app__button__warning" style={{display: `${buttonDisabled ? 'block' : 'none'}` }}>Please enter between -100 and 100, sugguest percentage is 5%</span>
			</div>
			<div className="app__answer field" style={{display: `${toBePaid ? 'block' : 'none'}` }}>
				<label>To Be Paid</label>
				<span>${toBePaid}</span>
			</div>
		</div>
	)
}

export default App;
