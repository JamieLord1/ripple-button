import React, { useState } from 'react'
import './index.css'

interface RippleObject {
	x: number;
	y: number;
	size: string;
}

interface Props {
	buttonType?: string;
	text: string;
}

const Index: React.FC<Props> = ({ buttonType, text }) => {
	const [hasRipple, setHasRipple] = useState<boolean>(false);
	const [ripple, setRipple] = useState<RippleObject>({
		x: 0,
		y: 0,
		size: ''
	});
	let rippleTimer: any = 0;

	const addRipple = (event?: any) => {
		const rippleContainer = event.currentTarget.getBoundingClientRect();
		const size =
		rippleContainer.width > rippleContainer.height
			? rippleContainer.width
			: rippleContainer.height;
		const x = event.pageX - rippleContainer.x - size / 2;
		const y = event.pageY - rippleContainer.y - size / 2;
		const newRipple = {
			x,
			y,
			size
		};
		
		setRipple(newRipple);
		setHasRipple(true);
		setTimeout(() => setHasRipple(false), 850);
	};

	const handleOnClick = (e: any) => {
		if (!hasRipple) {
			addRipple(e)
		}
	}

	return (
		<button className={`${buttonType}-button`}>
			{text}
			<div className="div-container" onClick={handleOnClick}>
				{
					hasRipple ? (
						<span className={`${buttonType}-ripple`}
							style={{
								top: ripple.y,
								left: ripple.x,
								width: ripple.size,
								height: ripple.size
							}}
						/>
					) : null
				}
			</div>
		</button>
	)
}

Index.defaultProps = {
	buttonType: 'secondary'
}

export default Index
