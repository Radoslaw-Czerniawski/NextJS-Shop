import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import { getBasePath } from '../utils/config';

const isExternalURL = (url: string) => new URL(url).origin !== getBasePath();

export const CustomReactMarkdown = ({
    children,
}: {
    children: MarkdownResult;
}) => (
    <MDXRemote
        {...children}
        components={{
            a: ({ href, ...props }) => {
                if (!href) {
                    return (
                        <a {...props} href={href} rel='noopener noreferrer'></a>
                    );
                }

                if (isExternalURL(href)) {
                    return (
                        <a
                            {...props}
                            href={href}
                            target='_blank'
                            rel='noopener noreferrer'
                        ></a>
                    );
                }

                return (
                    <Link href={href}>
                        <a {...props}></a>
                    </Link>
                );
            },
        }}
    />
);
