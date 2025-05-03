import { JSDOM } from "jsdom";
import { DESCRIPTION_LENGTH_DEFAULT } from "../consts";

export function generateDescriptionFromHtml(html: string) {
	return (
		(new JSDOM(html).window.document.body.textContent?.slice(
			0,
			DESCRIPTION_LENGTH_DEFAULT
		) ?? "") + " [...]"
	);
}
