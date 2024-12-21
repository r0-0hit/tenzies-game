const Dice = ({ value, isHeld, holdDie }) => {
	const styles = {
		backgroundColor: isHeld ? '#59E391' : 'white',
	}
	return (
		<div
			className='die-face'
			style={styles}
			onClick={holdDie}
		>
			<h2>{value}</h2>
		</div>
	)
}

export default Dice
