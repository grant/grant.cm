import {Project, projects} from '../../../data/projects';

const cardColors: Record<string, string> = {
  ts2gas: 'rgb(49, 120, 198)',
  'new-computer-checklist': 'rgb(31, 41, 55)',
  algorythem: 'rgb(242, 99, 61)',
  eagleeye: 'rgb(166, 53, 51)',
  algodb: 'rgb(132, 193, 160)',
  nestvacationtracker: 'rgb(52, 152, 219)',
  capture: 'rgb(46, 204, 113)',
  harbor: 'rgb(241, 196, 15)',
  harmonic: 'rgb(232, 132, 59)',
  leappong: 'rgb(179, 214, 117)',
  hnplays2048: 'rgb(241, 182, 5)',
  milestone: 'rgb(153, 82, 138)',
  thefourelements: 'rgb(115, 50, 42)',
  cellularwarfare: 'rgb(65, 109, 234)',
  vidwall: 'rgb(196, 76, 62)',
  'glass-ocr': 'rgb(42, 36, 35)',
  areyouhungrynow: 'rgb(132, 193, 160)',
  sudosoldiers: 'black',
  acadee: 'rgb(133, 184, 75)',
  dubhacks14f: 'rgb(57, 39, 91)',
  dubhacks15f: 'rgb(237, 27, 120)',
  socketio: 'rgb(223, 112, 101)',
  speekr: 'rgb(3, 169, 244)',
  navi: 'rgb(29, 233, 197)',
  awear: 'rgb(21, 188, 221)',
  herder: 'rgb(255, 80, 87)',
  safebaby: 'rgb(254, 209, 86)',
  productgrunt: 'rgb(17, 17, 17)',
  rollen: 'rgb(69, 16, 27)',
  issues: 'rgb(236, 240, 243)',
  hawk: 'rgb(246, 166, 90)',
  snappo: 'rgb(144, 143, 179)',
  slides2gif: 'rgb(249, 171, 0)',
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-gradient-to-r from-orange-projectStart to-orange-projectEnd overflow-x-hidden text-white [box-shadow:inset_0_-20px_20px_-20px_rgba(0,0,0,0.35)] [&>_.title]:cursor-pointer"
    >
      <h2 className="px-0 py-5 pb-[10px] text-center font-montserrat text-[32px] font-bold uppercase tracking-[5px] text-black-light sm:text-large sm:tracking-[9px]">
        Side Projects
      </h2>
      <p className="text-center text-black">
        <em>Hackathon and side projects I've shipped</em>
      </p>
      <div className="pb-5">
        <ul className="mx-auto grid max-w-[1100px] grid-cols-[repeat(auto-fit,96px)] justify-center gap-4 px-3 pt-4">
          {projects.map(renderProject)}
        </ul>
      </div>
    </section>
  );
}

/**
 * Renders a single project
 */
function renderProject(project: Project) {
  const imgURL = `/images/cards/${project.id}.${project.img}`;
  const bgColor = cardColors[project.id] || 'transparent';
  const isSpecialImage =
    project.id === 'eagleeye' ||
    project.id === 'dubhacks15f' ||
    project.id === 'rollen';

  return (
    <li
      key={project.id}
      className="relative h-24 w-24 overflow-hidden rounded-[5px] text-center text-white transition-transform duration-normal hover:scale-105"
      style={{backgroundColor: bgColor, fontWeight: 700, fontSize: '40px'}}
    >
      <a
        className="group relative block h-full w-full"
        href={project.url.github}
        aria-label={`${project.title} on GitHub`}
      >
        <img
          className={`w-full ${isSpecialImage ? 'pt-[10px]' : ''}`}
          src={imgURL}
          alt=""
        />
        <div className="absolute bottom-0 left-0 right-0 h-[24%] bg-gray/40 p-1 transition-all duration-normal group-hover:h-full group-hover:bg-gray/85 group-hover:pt-8">
          <h3 className="text-center text-xxsmall font-bold uppercase">
            {project.title}
          </h3>
        </div>
      </a>
    </li>
  );
}
