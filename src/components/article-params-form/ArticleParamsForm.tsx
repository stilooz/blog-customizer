import { SyntheticEvent, useCallback, useRef, useState, ReactNode, FormEvent } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { RadioGroup } from '../../ui/radio-group';
import { Select } from '../../ui/select';
import { OptionType, fontFamilyOptions, ArticleStateType, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, defaultArticleState } from '../../constants/articleProps';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const ref = useRef<HTMLFormElement | null>(null);
	const [open, setOpen] = useState(false);
	const [draftSettings, setDraftSettings] = useState<ArticleStateType>(defaultArticleState);

	useOutsideClickClose(open, ref, () => setOpen(false));

	const toggleForm = useCallback(() => {
		setOpen((prevOpen) => !prevOpen);
	}, []);

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setDraftSettings((prev) => ({ ...prev, [field]: value }));
		};
	};
	const handleReset = () => {
		setDraftSettings(defaultArticleState);
	};
	const handleApply = (e: FormEvent) => {
		e.preventDefault();
		onApply(draftSettings);
	};

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={open} />
			<aside className={clsx(styles.container, { [styles.container_open]: open })}>
				<form className={styles.form} ref={ref} onSubmit={handleApply}>
					<Text size={31} weight={800} uppercase as={'h3'} align='center'>
						Задайте параметры
					</Text>
					<Select
						selected={draftSettings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOnChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={draftSettings.fontSizeOption}
						onChange={handleOnChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						selected={draftSettings.fontColor}
						options={fontColors}
						onChange={handleOnChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={draftSettings.backgroundColor}
						options={backgroundColors}
						onChange={handleOnChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={draftSettings.contentWidth}
						options={contentWidthArr}
						onChange={handleOnChange('contentWidth')}
						title='Ширина контента'
					/>
					<div className={clsx(styles.bottomContainer)}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={handleReset} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
