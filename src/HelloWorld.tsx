import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {z} from 'zod';
import {zColor} from '@remotion/zod-types';
import {TextContainer} from './HelloWorld/TextContainer';
import {Subtitle} from './HelloWorld/Subtitle';
import React, { useState } from 'react';

export const myCompSchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
});

export const HelloWorld: React.FC<z.infer<typeof myCompSchema>> = ({
	titleText: propOne,
	titleColor: propTwo,
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const [subtitleStartFrame, setSubtitleStartFrame] = useState<number>(0);

	// Move the 'opacity' and 'interpolate' inside the component.
	const opacity = interpolate(frame, [durationInFrames - 25, durationInFrames - 15], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{ backgroundColor: 'white' }}>
			<AbsoluteFill style={{ opacity }}>
				<Sequence from={35}>
					<TextContainer 
						titleText={propOne} 
						titleColor={propTwo} 
						onComplete={(duration) => {
							setSubtitleStartFrame(35 + duration + 5);  
						}} 
					/>
				</Sequence>
				<Sequence from={subtitleStartFrame}>
					<Subtitle /> 
				</Sequence>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
