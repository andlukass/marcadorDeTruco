import ChangeName from '../ChangeName/ChangeName'
import { useState, useEffect } from 'react'
import { BsPencilSquare } from "react-icons/bs";
import './Counter.css'


function Counter(props) {
	const [isOpen, setIsOpen] = useState(false);
	const [fontSize, setFontSize] = useState(35);
	const [teamName, setTeamName] = useState('');

	useEffect(() => {
		
		let length = props.team.name.length;
		let newSize;
		if (length >= 1 && length <= 4) {
			setTeamName(props.team.name);
			newSize = 45;
		} else if (length > 4 && length <= 10) {
			setTeamName(props.team.name);
			newSize = 180 / length;
		} else if (length > 10 && length < 20) {
			let string = props.team.name.slice(0, props.team.name.length/1.5)
			let spaces = string.split(" ").length - 1;
			if (spaces) {
				setTeamName(props.team.name);
			} else {
				setTeamName(breakLine(props.team.name));
			}
			newSize = 23;
		} else {
			setTeamName(props.team.name.slice(0, 16) + '...');
			newSize = 23;
		}
		setFontSize(newSize);
		console.log(length, newSize)
	}, [props.team.name]);

	const breakLine = (string) => {
		let half = string.length/2
		let part1 = string.slice(0, half);
		let part2 = string.slice(half, string.length);
		console.log(part1, part2, half)
		let full = part1 + "-\n" + part2;
		return full;
	}

	const onOpen = () => {
		setIsOpen(true);
	}

	const handleClick = (change) => {
		props.pointsChange(props.team.name, change);
	}

	return (
		<>
			<ChangeName 
				nameChange={props.nameChange}
				teamName={props.team.name}
				isOpen={isOpen}
				onClose={()=>setIsOpen(false)}/>
			<div className="counter">
				<div className="titleBox">
					<div className="edit" onClick={onOpen}>
						<BsPencilSquare />
					</div>
					<div className="title">
					<h3 style={{ fontSize: `${fontSize}px`,
						whiteSpace: 'pre-line'}}>{teamName}</h3>
					</div>
				</div>
				<h1>{props.team.points}</h1>
				<div className="buttonsBox">
					<div className="pointsButton" onClick={() => handleClick(-1)}>
						<span> - </span> 
						</div>
					<div className="pointsButton" onClick={() => handleClick(1)}>
						<span> + </span> 
						</div>
				</div>
			</div>
		</>
	)
}

export default Counter