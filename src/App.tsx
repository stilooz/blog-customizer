import { CSSProperties, FormEvent, useState } from 'react';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { Article } from './components/article';
import { ArticleParamsForm } from './components/article-params-form';
import { ArticleStateType, defaultArticleState } from './constants/articleProps';

export const App = () => {
	const [appliedSettings, setAppliedSettings] = useState(defaultArticleState);

	const handleApply = (settings: ArticleStateType) => {
		setAppliedSettings(settings);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appliedSettings.fontFamilyOption.value,
					'--font-size': appliedSettings.fontSizeOption.value,
					'--font-color': appliedSettings.fontColor.value,
					'--container-width': appliedSettings.contentWidth.value,
					'--bg-color': appliedSettings.backgroundColor.value,
				} as CSSProperties
			}
		>
			<ArticleParamsForm
				onApply={handleApply}
			/>
			<Article />
		</main>
	);
}; 