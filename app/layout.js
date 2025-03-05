import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

export const metadata = {
    title: "Ed-Cred",
    description: "Your Trusted Platform for Honest Feedbacks. With stellar one-click reports and unmatched support, see how Circle will make a difference in your business.",
};

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "900"],
    variable: "--font-poppins"
});

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["600", "500", "700"],
    variable: "--font-jakarta"
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${poppins.className} antialiased font-light`} suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
