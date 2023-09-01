import './modal.css'

function Modal(props) {

	if (props.isOpen){
		return (
			<>
				<div onClick={props.onClose} className="background">
					<div className="container">
						<div onClick={(e) => e.stopPropagation()} className="content">
							{props.children}
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default Modal