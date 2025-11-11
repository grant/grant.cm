import {projects} from '../../../data/projects';

const cardColors: Record<string, string> = {
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
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-gradient-to-r from-[rgb(208,119,53)] to-[rgb(255,145,65)] overflow-x-hidden text-white [box-shadow:inset_0_-20px_20px_-20px_rgba(0,0,0,0.35)] [&>_.title]:cursor-pointer"
    >
      <h2 className="font-montserrat text-black-light font-bold text-large tracking-[9px] uppercase text-center py-5 px-0 pb-[10px]">
        Side Projects
      </h2>
      <p className="text-center text-gray-dark">
        <em>Hackathon and side projects I've shipped</em>
      </p>
      <div>
        <ul className="text-center">{projects.map(renderProject)}</ul>
      </div>
    </section>
  );
}

/**
 * Renders a single project
 */
function renderProject(project: any) {
  const imgURL = `/images/cards/${project.id}.${project.img}`;
  const bgColor = cardColors[project.id] || 'transparent';
  const isSpecialImage =
    project.id === 'eagleeye' ||
    project.id === 'dubhacks15f' ||
    project.id === 'rollen';

  return (
    <li
      key={project.id}
      className="inline-block m-[10px] relative w-[200px] h-[200px] overflow-hidden text-center rounded-[5px] text-white transition-transform duration-normal hover:scale-110 max-[800px]:w-[100px] max-[800px]:h-[100px]"
      style={{backgroundColor: bgColor, fontWeight: 700, fontSize: '40px'}}
    >
      <img
        className={`w-full ${isSpecialImage ? 'pt-[10px]' : ''}`}
        src={imgURL}
        alt={project.title}
      />
      <div className="h-[15%] absolute bottom-0 left-0 right-0 p-[3px] pb-[6px] bg-gray/40 hover:h-full hover:pt-5 hover:bg-gray/85 max-[800px]:h-[30%]">
        <h3 className="text-xsmall font-bold text-center uppercase pb-[10px] hover:pb-[30px] max-[800px]:text-xxsmall">
          {project.title}
        </h3>
        <p className="hidden text-xsmall leading-[1.3] pb-5 hover:block max-[800px]:!hidden">
          {project.description}
        </p>
        <div className="bottom-0 max-[800px]:hidden">
          {project.url.github ? (
            <a
              className="text-small block underline"
              href={project.url.github}
            >
              GITHUB
            </a>
          ) : (
            ''
          )}
          {project.url.demo ? (
            <a className="text-small block underline" href={project.url.demo}>
              DEMO
            </a>
          ) : (
            ''
          )}
        </div>
      </div>
    </li>
  );
}
