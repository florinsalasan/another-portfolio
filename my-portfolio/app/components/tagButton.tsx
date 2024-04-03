export default function TagButton({ tag, active }: { tag: string, active: boolean }) {

    return (
        <button id={tag} value={tag} className={ "border-black border-2 rounded-full w-40 h-12 dark:border-white tag-button " + (active ? "bg-red-700" : "")}>
            <p className="inline">
                <span className={active ? "visible" : "hidden" }>&#x2713; </span>{ tag }
            </p>
        </button>
    )

}

