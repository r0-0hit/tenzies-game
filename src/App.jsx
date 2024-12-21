import './App.css'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import Dice from './components/Dice'
import Confetti from 'react-confetti'

const App = () => {
	const [dice, setDice] = useState(genrateNewDice)
	const [tenzies, setTenzies] = useState(false)
	const [score, setScore] = useState(0)
	const [maxScore, setMaxScore] = useState(
		() => JSON.parse(localStorage.getItem('maxScore')) || 1000
	)

	useEffect(() => {
		const allHeld = dice.every(die => die.isHeld)
		const allValueEqual = dice.every(die => die.value === dice[0].value)

		if (allHeld && allValueEqual) {
			console.log('You Won!')
			setTenzies(true)
			if (score < maxScore) {
				setMaxScore(score)
				// localStorage.setItem('maxScore', JSON.stringify(score))
			}
		}
	}, [dice])

	useEffect(() => {
		if (score) localStorage.setItem('maxScore', JSON.stringify(score))
	}, [maxScore])

	const renderAllDice = dice.map(die => (
		<Dice
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDie={() => holdDie(die.id)}
		/>
	))

	function genrateNewDice() {
		const newDice = []
		for (let i = 0; i < 10; i++) {
			newDice.push({
				value: Math.ceil(Math.random() * 6),
				id: nanoid(),
				isHeld: false,
			})
		}
		return newDice
	}

	function holdDie(id) {
		setDice(oldDie =>
			oldDie.map(die => {
				return die.id === id
					? {
							...die,
							isHeld: !die.isHeld,
					  }
					: die
			})
		)
	}

	function rollDice() {
		if (tenzies) {
			setTenzies(false)
			setDice(genrateNewDice)
			setScore(0)
		} else {
			setScore(n => n + 1)
			setDice(oldDie =>
				oldDie.map(die => {
					return die.isHeld
						? die
						: {
								value: Math.ceil(Math.random() * 6),
								id: nanoid(),
								isHeld: false,
						  }
				})
			)
		}
	}

	return (
		<main>
			{tenzies && <Confetti />}
			<h1 className='title'>Tenzies</h1>
			<p className='instructions'>
				Roll until all dice are the same. Click each die to freeze it at
				its current value between rolls.
			</p>
			<div className='score-section'>
				<p className='score'>Score: {score}</p>
				{maxScore !== 1000 && (
					<p className='max-score'>Max Score: {maxScore}</p>
				)}
			</div>
			<div className='dice-container'>{renderAllDice}</div>
			<button
				className='roll-dice'
				onClick={rollDice}
			>
				{tenzies ? 'Play Again' : 'Roll'}
			</button>
		</main>
	)
}

export default App
