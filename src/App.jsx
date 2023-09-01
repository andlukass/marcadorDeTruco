import { useState } from 'react'
import Counter from './components/Counter/Counter'
import { BsXCircleFill } from "react-icons/bs";
import logo42 from './assets/42.png';

import './App.css'

function App() {
	const [teamOne, setTeamOne] = useState({
		name: 'Nós',
		points: 0,
		victories: 0,
	});
	const [teamTwo, setTeamTwo] = useState({
		name: 'Eles',
		points: 0,
		victories: 0,
	});

	const pointsChange = (teamName, change) => {
		if (teamName == teamOne.name) {
			let newPoints = Math.min(12, Math.max(0, teamOne.points + change));
			setTeamOne({ ...teamOne, points: newPoints });
		} else {
			let newPoints = Math.min(12, Math.max(0, teamTwo.points + change));
			setTeamTwo({ ...teamTwo, points: newPoints });
		}
	}

	const nameChange = (teamName, newName) => {
		if (teamName == teamOne.name) {
			setTeamOne({ ...teamOne, name: newName });
		} else {
			setTeamTwo({ ...teamTwo, name: newName });
		}
	}

	const clear = () => {
		setTeamOne({ ...teamOne, points: 0 });
		setTeamTwo({ ...teamTwo, points: 0 });
	}

	return (
		<>
			<div className='add'>
				<p>um oferecimento...</p>
				<img src={logo42} alt="Imagem" className="image" />
			</div>
			<div className="principal">
				<Counter team={teamOne}
					nameChange={nameChange}
					pointsChange={pointsChange}
					className={'teste'} />
					<div className='line'></div>
				<Counter team={teamTwo}
					nameChange={nameChange}
					pointsChange={pointsChange}/>
			</div>
			<p onClick={clear}>zerar partida 
			<span style={{position: 'relative', marginLeft: '20px'}}>
				<BsXCircleFill color='#ff6c64'
						style={{position: 'absolute',
						top: '2', left: '-15'}}/>
			</span>
			</p>
		</>
	)
}

export default App
