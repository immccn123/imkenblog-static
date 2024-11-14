// place files you want to import through the `$lib` alias in this folder.
export const eraseHtml = (post: App.Post) => ({ ...post, html: undefined });
