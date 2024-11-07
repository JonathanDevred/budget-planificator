"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ThemeToggleButton } from "./ThemeToggleButton";
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false); 

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <section className="pt-8 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-center">Planificateur de budget</h1>
            <div className="flex ml-12 md:justify-center sm:ml-24 items-center">
                <div className="sm:hidden">
                    <Button onClick={toggleMenu}>
                        {isOpen ? <X className="w-6 h-6 text-blue-500" /> : <Menu className="w-6 h-6 text-blue-500" />}
                    </Button>
                </div>

                <div className="hidden sm:flex ml-4 space-x-4">
                    <Link href="/" className="text-lg text-blue-500 hover:underline">Accueil</Link>
                    <Link href="/planning" className="text-lg text-blue-500 hover:underline">Planning Mensuel</Link>
                    <Link href="/tracking" className="text-lg text-blue-500 hover:underline">Tracking des Dépenses</Link>
                    <ThemeToggleButton />
                </div>
            </div>

            {isOpen && (
                <div className="sm:hidden ml-12 flex flex-col space-y-2 mt-2">
                    <Link href="/" className="text-lg text-blue-500 hover:underline">Accueil</Link>
                    <Link href="/planning" className="text-lg text-blue-500 hover:underline">Planning Mensuel</Link>
                    <Link href="/suivi" className="text-lg text-blue-500 hover:underline">Suivi des Dépenses</Link>
                    <ThemeToggleButton />
                </div>
            )}
        </section>
    );
};
