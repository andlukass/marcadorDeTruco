import { useState } from 'react'
import Modal from '../modal/modal'
import './changeName.css'

function ChangeName(props) {

	const [inputName, setInputName] = useState('');
	const [isClicked, setIsClicked] = useState(false);

	const handleInputChange = (e) => {
		setInputName(e.target.value);
	}

	const handleClick = () => {
		if (inputName.length > 0){
		props.nameChange(props.teamName, inputName);
		props.onClose();
		} 
		else {
			setIsClicked(true);
		}
	}

	return (
		<>
			<Modal isOpen={props.isOpen} onClose={props.onClose}>
					<div>
					<h3>Nome da equipe:</h3>
					{ (isClicked && inputName < 1) ? <input className='placeholder-red' 
					placeholder='Digite um nome...'
					onChange={handleInputChange}/> : 
					<input placeholder='Digite um nome...'
					onChange={handleInputChange}/> }
					<div className='buttonContainer'>
						<p className='nameButton' onClick={handleClick}>✓</p>
					</div>
					</div>
			</Modal>
		</>
	)
}

export default ChangeName