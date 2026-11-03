import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';
import { Footer } from '@/components/Footer';

const chillax = localFont({
    src: '../../public/fonts/Chillax-Variable.ttf',
    variable: '--font--chillax',
});

export const metadata: Metadata = {
    title: 'Artisan Melody',
    description: 'Play a piano in the browser',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
            className={`h-full antialiased ${chillax.variable}`}
        >
            <body className="font-primary flex h-full flex-col bg-violet-200">
                {children}
                <Footer />
            </body>
        </html>
    );
}
