"use client"

export default function DropdownChecklist({ allTags }: {allTags: string[]}) {
    return (
    <div>
        <form method="post" onSubmit={handleSubmit}>
            <ul className="grid grid-cols-3">
                {allTags.map(tag => (
                    <li key={tag} className="list-none block">
                        <label>
                            <input type="checkbox" id={tag} value={tag}/>
                            {" " + tag }
                        </label>
                    </li>
                ))}
            </ul>
            <button className="" type="submit">Filter by tag</button>
        </form>
    </div>
    )
};

function handleSubmit() {
    
}
