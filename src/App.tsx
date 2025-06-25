import { useState, useEffect, useRef } from 'react';
import { Article } from './components/article';
import { ArrowButton } from './ui/arrow-button';
import { ArticleParamsForm } from './components/article-params-form';
import styles from './components/article-params-form/ArticleParamsForm.module.scss';
import clsx from 'clsx';

const defaultSettings = {
	fontSize: '16px',
	fontFamily: 'Arial',
	lineHeight: '1.5',
	containerWidth: '800px',
};

export const App = () => {
	const [articleSettings, setArticleSettings] = useState(defaultSettings);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		};

		if (isSidebarOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen]);

	const handleApply = (newSettings: typeof defaultSettings) => {
		setArticleSettings(newSettings);
		setIsSidebarOpen(false);
	};

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
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			/>
			{isSidebarOpen && (
				<aside
					className={clsx(styles.container, { [styles.container_open]: isSidebarOpen })}
					ref={sidebarRef}
				>
					<ArticleParamsForm
						currentSettings={articleSettings}
						onApply={handleApply}
					/>
				</aside>
			)}
			<Article />
		</div>
	);
};
