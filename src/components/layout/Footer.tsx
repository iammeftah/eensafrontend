import { Facebook, Twitter, Instagram, Mail } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* About */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                            E-ENSA Marrakech
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            The digital platform for the National School of Applied Sciences of Marrakech,
                            providing modern solutions for academic excellence.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <li><a href="#" className="hover:text-[#8B4513]">Student Portal</a></li>
                            <li><a href="#" className="hover:text-[#8B4513]">Course Catalog</a></li>
                            <li><a href="#" className="hover:text-[#8B4513]">Academic Calendar</a></li>
                            <li><a href="#" className="hover:text-[#8B4513]">Resources</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                            Contact
                        </h3>
                        <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <li>Avenue Abdelkrim Khattabi</li>
                            <li>BP 575, Marrakech, Morocco</li>
                            <li>Phone: +212 524 434 745</li>
                            <li>Email: contact@ensa.ac.ma</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                            Follow Us
                        </h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-neutral-600 hover:text-[#8B4513] dark:text-neutral-400">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-neutral-600 hover:text-[#8B4513] dark:text-neutral-400">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-neutral-600 hover:text-[#8B4513] dark:text-neutral-400">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-neutral-600 hover:text-[#8B4513] dark:text-neutral-400">
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-saddle pt-8 dark:border-saddle">
                    <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                        © {new Date().getFullYear()} E-ENSA Marrakech. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}