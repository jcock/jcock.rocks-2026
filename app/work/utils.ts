export const formatDate = (date: string, includeRelative = false) => {
	const currentDate = new Date();
	let normalizedDate = date;

	if (!normalizedDate.includes('T')) {
		normalizedDate = `${normalizedDate}T00:00:00`;
	}

	const targetDate = new Date(normalizedDate);
	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	const daysAgo = currentDate.getDate() - targetDate.getDate();

	let relativeDate = 'Today';

	if (yearsAgo > 0) {
		relativeDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		relativeDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		relativeDate = `${daysAgo}d ago`;
	}

	const fullDate = targetDate.toLocaleString('en-us', {
		year: 'numeric'
	});

	if (!includeRelative) {
		return fullDate;
	}

	return `${fullDate} (${relativeDate})`;
};
