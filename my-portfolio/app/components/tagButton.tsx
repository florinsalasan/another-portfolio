export default function TagButton({ tag }: { tag: string }) {

    return (
        <button id={tag} value={tag} className="border-black border-2 rounded-full 
            w-40 h-12 dark:border-white active:bg-red-700">
            <p className="inline">
                <span className="hidden active:visible">&#x2713; </span>{ tag }
            </p>
        </button>
    )

}

