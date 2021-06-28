import styles from './projects.module.scss';
import sectionStyles from './sections.module.scss';
import classNames from 'classnames/bind';
import {projects} from '../../../data/projects';

export default function Projects() {
  return (
    <section
      id="projects"
      className={classNames(styles.projects, sectionStyles.section)}
    >
      <h2 className={styles.title}>Side Projects</h2>
      <p className={styles.sectionDescription}>
        <em>Hackathon and side projects I've shipped</em>
      </p>
      {
        <div className={styles.centerBox}>
          <ul className={styles.projectsList}>{projects.map(renderProject)}</ul>
        </div>
      }
    </section>
  );
}

/**
 * Renders a single project
 */
function renderProject(project) {
  const imgURL = `/images/cards/${project.id}.${project.img}`;
  return (
    <li
      key={project.id}
      className={classNames(styles.card, styles[project.id])}
    >
      <a href={project.url.github}>
        <img className={styles.cardImage} src={imgURL} />
        <div className={styles.textArea}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.urls}>
            {project.url.github ? (
              <a className={styles.url} href={project.url.github}>
                GITHUB
              </a>
            ) : (
              ''
            )}
            {project.url.demo ? (
              <a className={styles.url} href={project.url.demo}>
                DEMO
              </a>
            ) : (
              ''
            )}
          </div>
        </div>
      </a>
    </li>
  );
}
