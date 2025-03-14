import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
    title: "Ed-Cred",
    description: "Your Trusted Platform for Honest Feedbacks. With stellar one-click reports and unmatched support, see how Circle will make a difference in your business.",
};

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter"
});


export default function RootLayout({ children }: { children: any }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
