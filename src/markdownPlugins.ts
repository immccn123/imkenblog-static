import { visit } from "unist-util-visit";

export function rehypeRewriteUrl() {
	return (ast: import("hast").Root) => {
		visit(ast, "element", (node) => {
			if (node.tagName === "a") {
				const href = node.properties.href;
				if (href === undefined || href === null) return;
				if (href.toString().match(/^(http|https):\/\//)) {
					node.properties.target = "_blank noreferrer noopener";
				}
			}
		});
	};
}
