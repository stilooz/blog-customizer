import { SyntheticEvent, useCallback, useEffect, useRef, useState, ReactNode, FormEvent } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { RadioGroup } from '../../ui/radio-group';
import { Select } from '../../ui/select';
import { OptionType, fontFamilyOptions, ArticleStateType, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from '../../constants/articleProps';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text';

type ArticleParamsFormProps = {
	onFontFamilyChange: (select: OptionType) => void;
	onFontSizeChange: (select: OptionType) => void;
	onFontColorChange: (select: OptionType) => void;
	onBackgroundColorChange: (select: OptionType) => void;
	onContentWidthChange: (select: OptionType) => void;
	onReset: () => void;
	onApply: (event: FormEvent) => void;
	settingsDraft: ArticleStateType;
};

export const ArticleParamsForm = ({
	onFontFamilyChange,
	onFontSizeChange,
	onFontColorChange,
	onBackgroundColorChange,
	onContentWidthChange,
	onReset,
	onApply,
	settingsDraft,
}: ArticleParamsFormProps) => {
	const ref = useRef<HTMLFormElement | null>(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open]);

	const toggleForm = useCallback(() => {
		setOpen((prevOpen) => !prevOpen);
	}, []);

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={open} />
			<aside className={clsx(styles.container, { [styles.container_open]: open })}>
				<form className={styles.form} ref={ref} onSubmit={onApply}>
					<Text size={31} weight={800} uppercase as={'h3'} align='center'>
						Задайте параметры
					</Text>
					<Select
						selected={settingsDraft.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={onFontFamilyChange}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={settingsDraft.fontSizeOption}
						onChange={onFontSizeChange}
						title='Размер шрифта'
					/>
					<Select
						selected={settingsDraft.fontColor}
						options={fontColors}
						onChange={onFontColorChange}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={settingsDraft.backgroundColor}
						options={backgroundColors}
						onChange={onBackgroundColorChange}
						title='Цвет фона'
					/>
					<Select
						selected={settingsDraft.contentWidth}
						options={contentWidthArr}
						onChange={onContentWidthChange}
						title='Ширина контента'
					/>
					<div className={clsx(styles.bottomContainer)}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={onReset} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
