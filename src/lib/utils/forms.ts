export function isInvalid(form: unknown, field: string) {
	if (!form) {
		return null;
	}

	// @ts-expect-error because form type is not known, but safely accessed
	if (!form.errors?.[field]) {
		return 'false';
	}

	return 'true';
}

export function getFieldErrors(form: unknown, field: string) {
	// @ts-expect-error because form type is not known, but safely accessed
	const errors = form?.errors?.[field]?._errors ?? null;
	return errors instanceof Array ? errors : null;
}
