import { writable } from 'svelte/store';

const createStore = () => {
	const { set, subscribe, update } = writable({ isOpen: false, message: '' });

	const close = () =>
		update((state) => {
			return { ...state, isOpen: false };
		});
	const open = (message = '') =>
		update((state) => {
			return { ...state, isOpen: true, message };
		});
	const toggle = () =>
		update((state) => {
			return { ...state, isOpen: !state.isOpen };
		});

	return { close, open, subscribe, toggle };
};
export const submitted = createStore();
