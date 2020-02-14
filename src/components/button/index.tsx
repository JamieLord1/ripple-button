import React, { useState } from 'react'
import './index.css'

interface RippleObject {
	x?: any;
	y?: any;
	size?: any;
}

interface Props {
	buttonType?: string;
	text: string;
}

const Index: React.FC<Props> = ({ buttonType, text }) => {
	const [hasRipple, setHasRipple] = useState<boolean>(false);
	const [ripple, setRipple] = useState<RippleObject>({});
	let rippleTimer: number = 0;

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
		
		if (hasRipple) {
			clearTimeout(rippleTimer);
			setHasRipple(false);
		}
		setRipple(newRipple);
		setHasRipple(true);
		setTimeout(() => setHasRipple(false), 300);
	};

	return (
		<button className={`${buttonType}-button`}>
			{text}
			<div className="div-container" onMouseDown={addRipple}>
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
