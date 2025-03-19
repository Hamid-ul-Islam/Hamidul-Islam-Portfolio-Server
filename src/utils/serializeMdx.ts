import MarkdownIt from 'markdown-it'
import highlightjs from 'markdown-it-highlightjs'

export function serializeMdx(content: string) {
	const md = new MarkdownIt().use(highlightjs, {
		inline: true,
		theme: 'atom-one-dark',
	})

	return {
		compiledSource: md.render(content),
	}
}
