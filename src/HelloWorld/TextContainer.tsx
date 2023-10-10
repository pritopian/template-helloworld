import React, { useState } from 'react';
import {Title} from './Title';
import {Subtitle} from './Subtitle';

const container: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%',
	width: '100%',
	textAlign: 'center',
};

export const TextContainer: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({ titleText, titleColor }) => {
    const [showSubtitle, setShowSubtitle] = useState(false);

	const handleTitleComplete = (duration: number) => {
        // You can use the duration for some purpose or just ignore it
		setShowSubtitle(true);
	};

	return (
		<div style={container}>
			<Title 
                titleText={titleText} 
                titleColor={titleColor} 
                onComplete={handleTitleComplete}  // Passed the required prop
            />
            {showSubtitle && <Subtitle />} {/* This will render Subtitle when showSubtitle is true */}
		</div>
	);
};
