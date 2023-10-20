/**
 *
 * @param {number} value Value to be formated
 * @param {string} locales Locale ( default is "en-US" )
 * @param {Object} options Additional options ( default is {} )
 * @returns
 */
export const number = (value, locales = 'en-US', options = {}) => {
	const { format } = new Intl.NumberFormat(locales || 'en-US', {
		useGrouping: true,
		...options
	});
	return format(value);
};
