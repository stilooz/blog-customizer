import { useState, useEffect } from 'react';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

type ArticleSettings = {
	fontSize: string;
	fontFamily: string;
	lineHeight: string;
	containerWidth: string;
};

type ArticleParamsFormProps = {
	currentSettings: ArticleSettings;
	onApply: (settings: ArticleSettings) => void;
};

export const ArticleParamsForm = ({ currentSettings, onApply }: ArticleParamsFormProps) => {
	const [localSettings, setLocalSettings] = useState(currentSettings);

	useEffect(() => {
		setLocalSettings(currentSettings);
	}, [currentSettings]);

	const handleChange = (key: keyof ArticleSettings, value: string) => {
		setLocalSettings((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(localSettings);
	};

	const handleReset = () => {
		setLocalSettings(currentSettings);
		onApply(currentSettings);
	};

	return (
		<aside className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
				<div className={styles.bottomContainer}>
					<Button title='Сбросить' htmlType='reset' type='clear' />
					<Button title='Применить' htmlType='submit' type='apply' />
				</div>
			</form>
		</aside>
	);
};
