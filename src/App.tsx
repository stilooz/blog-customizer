import { CSSProperties, FormEvent, useState } from 'react';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { Article } from './components/article';
import { ArticleParamsForm } from './components/article-params-form';
import { ArticleStateType, OptionType, defaultArticleState } from './constants/articleProps';

export const App = () => {
	const [draftSettings, setDraftSettings] = useState<ArticleStateType>(defaultArticleState);
	const [appliedSettings, setAppliedSettings] = useState(defaultArticleState);

	const handleFontFamilyChange = (select: OptionType) => {
		setDraftSettings({ ...draftSettings, fontFamilyOption: select });
	};

	const changeFontSize = (select: OptionType) => {
		setDraftSettings({ ...draftSettings, fontSizeOption: select });
	};

	const handleFontColorChange = (select: OptionType) => {
		setDraftSettings({ ...draftSettings, fontColor: select });
	};

	const changeContainerWidth = (select: OptionType) => {
		setDraftSettings({ ...draftSettings, contentWidth: select });
	};

	const changeBgColor = (select: OptionType) => {
		setDraftSettings({ ...draftSettings, backgroundColor: select });
	};

	const handleResetSettings = () => {
		setAppliedSettings(defaultArticleState);
		setDraftSettings(defaultArticleState);
	};

	const applySideBarState = (event: FormEvent) => {
		event.preventDefault();
		setAppliedSettings(draftSettings);
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
				onFontFamilyChange={handleFontFamilyChange}
				onFontSizeChange={changeFontSize}
				onFontColorChange={handleFontColorChange}
				onBackgroundColorChange={changeBgColor}
				onContentWidthChange={changeContainerWidth}
				onReset={handleResetSettings}
				onApply={applySideBarState}
				settingsDraft={draftSettings}
			/>
			<Article />
		</main>
	);
}; 