import { useState } from 'react';
import { Article } from './components/article/Article';

const defaultSettings = {
	fontSize: '16px',
	fontFamily: 'Arial',
	lineHeight: '1.5',
	containerWidth: '800px',
};

export const App = () => {
	const [articleSettings, setArticleSettings] = useState(defaultSettings);

	return (
		<div
			style={
				{
					'--font-size': articleSettings.fontSize,
					'--font-family': articleSettings.fontFamily,
					'--line-height': articleSettings.lineHeight,
					'--container-width': articleSettings.containerWidth,
				} as React.CSSProperties
			}>
			<Article />
		</div>
	);
};
