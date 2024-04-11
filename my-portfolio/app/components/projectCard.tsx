
export default function ProjectCard () {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div className="image-container h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="empty">
        {/* The parent div used inline style to link to an image and use it as a background */}
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="dark:prose-invert prose font-bold text-xl mb-2">Can coffee make you a better developer?</div>
          <p className="dark:invert text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
        </div>
      </div>
    </div>
    )
}
