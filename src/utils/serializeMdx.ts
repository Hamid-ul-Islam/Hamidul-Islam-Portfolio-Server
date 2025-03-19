import { serialize } from 'next-mdx-remote/serialize'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

/**
 * Serializes MDX content with syntax highlighting and GitHub Flavored Markdown support.
 * @param content - The MDX content as a string.
 * @returns The serialized MDX content.
 */
export async function serializeMdx(content: string) {
	return await serialize(content, {
		mdxOptions: {
			remarkPlugins: [remarkGfm], // Add GitHub Flavored Markdown support
			rehypePlugins: [
				[
					rehypePrettyCode,
					{
						theme: 'one-dark-pro', // Use any theme you like
						keepBackground: false, // Set to true if you want to keep the background color
					},
				],
			],
		},
		// Important: This prevents client components from being used during build
		parseFrontmatter: true,
	})
}
