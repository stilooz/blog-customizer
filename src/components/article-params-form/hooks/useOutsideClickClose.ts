import { useEffect } from 'react';

export function useOutsideClickClose(isOpen: boolean, ref: React.RefObject<HTMLElement>, onClose: () => void) {
	useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClose();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, ref, onClose]);
} 