'use client'

export default function ToTopBtn() {
    return (
    <button className="rounded-full md:invisible md:w-0 md:absolute visible fixed md:top-20 
            hover:cursor-pointer border-black border-2 w-8 h-8 bg-white prose
            dark:text-white dark:bg-neutral-800 dark:border-white bottom-5 
            right-5"
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <p>↑</p>
    </button>
    )
};

