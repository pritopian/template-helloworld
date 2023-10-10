import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { FONT_FAMILY } from './constants';

const subtitleStyle: React.CSSProperties = {
	fontFamily: FONT_FAMILY,
	fontSize: 40,
	textAlign: 'center',
	color: 'black',  // Placeholder, will be overridden by prop if needed
};

export const Subtitle: React.FC = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 30], [0, 1]);

	return (
		<div style={{ ...subtitleStyle, opacity }}>
			Edit <code>src/Root.tsx</code> and save to reload.
		</div>
	);
};
