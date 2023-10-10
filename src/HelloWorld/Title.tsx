import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FONT_FAMILY } from './constants';
import React, { useEffect } from 'react';  // Added useEffect import

const title: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: 100,
    textAlign: 'center',
    // color will be overridden by prop
};

const wordStyle: React.CSSProperties = {
	display: 'inline-block',
	marginRight: '15px',  // Adjust the margin value as needed
};

interface TitleProps {
	titleText: string;
	titleColor: string;
	onComplete: (duration: number) => void;
}

export const Title: React.FC<TitleProps> = ({ titleText, titleColor, onComplete }) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const words = titleText.split(' ');

	// Calculate the total duration of the title animation
	const totalDuration = words.length * 10;  // Assuming a delay of 10 frames per word

	// Call onComplete when the title animation is done
	useEffect(() => {
			if (frame >= totalDuration) {
					onComplete(totalDuration);
			}
	}, [frame, totalDuration, onComplete]);

		return (
			<h1 style={{ ...title, color: titleColor }}>
					{words.map((word, index) => {
							const delay = index * 10;  // Adjust the delay value as needed
							const springValue = spring({
									fps: videoConfig.fps,
									frame: frame - delay,
									config: {
											stiffness: 100,  // Adjust the stiffness as needed
											damping: 20,     // Adjust the damping as needed
											mass: 0.5,       // Adjust the mass as needed
									},
							});
	
							return (
									<span
											key={index}
											style={{
													...wordStyle,
													transform: `scale(${springValue})`,
											}}
									>
											{word}{' '} {/* Added a space after each word */}
									</span>
							);
					})}
			</h1>
	);
				}	