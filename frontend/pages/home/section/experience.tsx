import React, {useRef, useState} from 'react';
import Image from 'next/image';

/**
 * A single role within an experience.
 */
interface ExperienceRole {
  title: string; // The role at the company, like "Engineer"
  dateRange: string; // The date range, like "2013-2015"
  shortSummary?: string; // A compact summary for the earlier-experience grid.
  summary?: React.ReactNode; // An optional summary of the experience.
  bullets?: React.ReactNode[]; // An optional list of bullets describing the  element with a description of the experience
  languages: string[]; // The programming languages used.
}

/**
 * A single technical experience.
 */
interface Experience {
  id: string; // The ID, like "google"
  company: string; // The human-readable name, like "Google"
  roles: ExperienceRole[]; // The roles that the company
  wasStudent?: boolean; // True if the experience was when I was a student
}

/**
 * The list of experiences, from most to least recent.
 */
const experiences: Experience[] = [
  {
    company: 'Cartesia',
    id: 'cartesia',
    roles: [
      {
        title: 'Member of Technical Staff',
        dateRange: 'Mar 2026 – Present',
        summary: <span>Building real-time voice AI.</span>,
        languages: ['TypeScript', 'React'],
      },
    ],
  },
  {
    company: 'Anon.com',
    id: 'anon',
    roles: [
      {
        title: 'Staff Full-Stack Engineer; Interim Manager',
        dateRange: 'Mar 2024 – Nov 2025',
        summary: (
          <span>
            Product lead & full-stack engineer for the dashboard and AI web
            automation workflows.
          </span>
        ),
        bullets: [
          <span>
            Built API, UI, and docs for the AI developer platform with 3
            engineers.
          </span>,
        ],
        languages: ['TypeScript', 'React', 'Postgres', 'GCP'],
      },
    ],
  },
  {
    company: 'Additive.AI',
    id: 'additive',
    roles: [
      {
        title: 'Member of Technical Staff',
        dateRange: '2023-2024',
        summary: (
          <span>Built the web console for an AI accounting startup.</span>
        ),
        bullets: [
          <span>
            Designed and built the frontend web experience for app.additive.ai
          </span>,
          <span>Built PDF generation pipeline for tax documents</span>,
          <span>
            Enhanced Excel workpaper with features such as checkfigures, error
            messages, and a summary page
          </span>,
        ],
        languages: [
          'TypeScript',
          'React',
          'Python',
          'PyMuPDF',
          'Django',
          'Postgres',
          'Docker',
          'GCP',
        ],
      },
    ],
  },
  {
    company: 'Observable',
    id: 'observable',
    roles: [
      {
        title: 'Senior Software Engineer',
        dateRange: '2022-2023',
        summary: (
          <span>
            Built a{' '}
            <a href="https://observablehq.com">data visualization platform</a>.
            Lots of TypeScript!
          </span>
        ),
        bullets: [
          <span>
            Built social identity (the ability to follow accounts and see a
            timeline of user activity)
          </span>,
          <span>
            Improved the core editing experience via a new menu and set of
            recommendations
          </span>,
          <span>
            Enabled Private embeds: The ability to securely share a single
            visualization on other sites
          </span>,
          <span>
            Worked on dashboards. Dozens of enhancements and bug fixes.
          </span>,
        ],
        languages: ['Node', 'TypeScript', 'JavaScript', 'Postgres', 'Heroku'],
      },
    ],
  },
  {
    company: 'Google',
    id: 'google',
    roles: [
      {
        title: 'Software Engineer, Google Cloud, Serverless',
        dateRange: '2021-2022',
        summary: (
          <span>Built the core runtimes for the serverless platform.</span>
        ),
        bullets: [
          <span>
            Built serverless runtimes for Google Cloud, App Engine and Cloud
            Functions.
          </span>,
          <span>Created java17 and ruby30 runtimes.</span>,
          <span>Created new features for the Function Frameworks.</span>,
        ],
        languages: ['Java', 'Ruby', 'Go', 'Node'],
      },
      {
        title: 'Developer Programs Engineer, Google Cloud, Serverless',
        dateRange: '2019-2021',
        summary: (
          <span>Built developer products for the serverless platform.</span>
        ),
        bullets: [
          <span>
            Led and built <strong>Google Cloud Functions</strong> computing
            strategy though the Functions Framework. Built 7 open source
            function runtimes in collaboration with language experts:{' '}
            <a href="https://git.io/gcfff">git.io/gcfff</a>
          </span>,
          <span>
            Built <strong>Eventarc</strong> devX: Google CloudEvents repos
            generated client libraries and samples.
          </span>,
          <span>
            Built <strong>Cloud Workflows</strong> devX: IDE autocompletion, API
            client libraries, and samples.
          </span>,
          <span>
            <strong>International speaker</strong> for Google Cloud. Spoke at
            over <b>30</b> developer events in 12 countries
            (USA/CAN/LatAm/Europe/SEA). Audiences between 20 and 500 developers.{' '}
            <a href="https://github.com/grant/talks"></a>
          </span>,
        ],
        languages: [
          'Node',
          'Python',
          'Go',
          'Java',
          'Ruby',
          'PHP',
          '.NET',
          'Dart',
          'C++',
        ],
      },
      {
        title: 'Developer Programs Engineer, Google Workspace (G Suite)',
        dateRange: '2017-2019',
        summary: (
          <span>
            Designed and built the{' '}
            <strong>open source developer presence.</strong>
          </span>
        ),
        bullets: [
          <span>
            Designed, built, launched the <strong>Apps Script CLI</strong>,{' '}
            <a href="https://github.com/google/clasp">google/clasp</a>. Sees
            25k+ req/day. Used by thousands of devs building add-ons.
          </span>,
          <span>
            Created GitHub org,{' '}
            <a href="https://github.com/googleworkspace">googleworkspace</a>.
            Built API samples for Sheets, Slides, Drive, and other products.
          </span>,
        ],
        languages: [
          'Node',
          'Python',
          'Go',
          'Java',
          'Ruby',
          'PHP',
          '.NET',
          'Apps Script',
        ],
      },
    ],
  },
  {
    company: 'Sift Science',
    id: 'sift',
    roles: [
      {
        title: 'Software Engineer',
        dateRange: '2016-2017',
        summary: (
          <span>
            Built features for the fraud APIs and web console, including
            workflows, enhanced payment and social profile data, and Mixpanel
            tracking.
          </span>
        ),
        languages: ['Java', 'React', 'SCSS'],
      },
    ],
  },
  {
    company: 'Google',
    id: 'google',
    wasStudent: true,
    roles: [
      {
        title: 'Software Engineer Intern',
        dateRange: 'Summer 2015',
        shortSummary: 'Android app validation',
        summary: (
          <span>
            Designed and developed an Android device validator that dramatically
            reduces the number of failed app submission for Android Auto, TV,
            and Wear. The validator detects common app issues during develop
            time in Android Studio and submission time in the Play Store by 40%.{' '}
            <a href="http://git.io/Je2NQ">git.io/Je2NQ</a>
          </span>
        ),
        languages: ['Java', 'C++'],
      },
    ],
  },
  {
    company: 'Sift Science',
    id: 'sift',
    wasStudent: true,
    roles: [
      {
        title: 'Software Engineer Intern',
        dateRange: 'Winter 2015',
        shortSummary: 'Fraud tooling and visualization',
        summary: (
          <span>
            Built historical fraud-score visualization, backend and frontend
            feature-gating and pricing changes, and a redesigned user details
            page.
          </span>
        ),
        languages: ['Java', 'Maven', 'HBase', 'React', 'SCSS', 'D3'],
      },
    ],
  },
  {
    company: 'LinkedIn',
    id: 'linkedin',
    wasStudent: true,
    roles: [
      {
        title: 'Software Engineer Intern',
        dateRange: 'Summer 2014',
        shortSummary: 'Globalized skills search',
        summary: (
          <span>
            Built the server-side infrastructure for internationalizing skills
            so recruiters could find professionals around the world independent
            of language. The feature affected over 60 million page views per
            month and 320+ million members.
          </span>
        ),
        languages: [
          'Java',
          'Kafka',
          'Avro',
          'Pig',
          'MapReduce',
          'Rest.li',
          'Ruby',
        ],
      },
    ],
  },
  {
    company: 'Facebook',
    id: 'fb',
    wasStudent: true,
    roles: [
      {
        title: 'Open Academy - Socket.IO',
        dateRange: "Jan–June '14",
        shortSummary: 'Socket.IO example app',
        summary: (
          <span>
            Selected for the Open Academy Program to contribute to open source.
            Created Socket.IO's official example app{' '}
            <a href="http://socket.io/demos/chat/">Socket.IO Chat </a>. This
            example is used to teach newcomers how to use Socket.IO from
            scratch.
          </span>
        ),
        bullets: [
          <span>
            Here's a <a href="https://cloudup.com/cMrYoTieM0c">video demo </a>of
            the app given by Socket.IO's founder{' '}
            <a href="https://github.com/rauchg">Guillermo Rauch</a>.
          </span>,
        ],
        languages: ['JavaScript', 'Websockets'],
      },
    ],
  },
  {
    company: 'Tableau',
    id: 'tableau',
    wasStudent: true,
    roles: [
      {
        title: 'Software Engineer Intern',
        dateRange: 'Summer 2013',
        shortSummary: 'Dashboard transparency and API',
        summary: (
          <span>
            Designed and implemented two flagship features for big-data
            visualization software.
          </span>
        ),
        bullets: [
          <span>
            Fully built{' '}
            <a href="http://www.tableausoftware.com/new-features/dashboard-transparency">
              transparent objects{' '}
            </a>
            (e.g. legends, images, text regions) for Tableau’s web visualization
            engine. Feature shipped and was demoed live in front of 3,000
            customers at Tableau’s Customer Conference 2013. Also codeveloped
            support for high dpi vizes.
          </span>,
          <span>
            Developed Tableau’s #1 customer request{' '}
            <a href="http://www.tableausoftware.com/new-features/javascript-api">
              JavaScript API
            </a>{' '}
            feature: the ability to get a viz’s data programmatically (via
            getUnderlyingDataAsync and getSummaryDataAsync API commands) with
            the ability to support data cubes.
          </span>,
        ],
        languages: ['Script#', 'Java', 'C++'],
      },
    ],
  },
  {
    company: 'Nor1',
    id: 'nor1',
    wasStudent: true,
    roles: [
      {
        title: 'Software Engineer Intern',
        dateRange: 'Summer 2012',
        shortSummary: 'Hotel inventory applications',
        summary: (
          <span>
            Built comprehensive web applications doing both front-end and
            back-end development:
          </span>
        ),
        bullets: [
          <span>
            Created a spreadsheet-like web application that allows hotel
            property managers to input current hotel inventory into Nor1’s
            analytical engine.
          </span>,
          <span>
            Built a live data feed web application that processed data from
            database records and presented the interpreted data in a
            user-friendly, easy-to-read live feed of real-time data.
          </span>,
        ],
        languages: ['CakePHP', 'JS'],
      },
    ],
  },
  {
    company: 'Kongregate',
    id: 'kongregate',
    wasStudent: true,
    roles: [
      {
        title: 'Game Developer',
        dateRange: '2008-2011',
        shortSummary: 'Indie Flash games',
        summary: (
          <span>
            Developed indie Flash games such as{' '}
            <a href="http://www.kongregate.com/games/creeplover/cellular-warfare">
              Cellular Warfare{' '}
            </a>
            and{' '}
            <a href="http://www.kongregate.com/games/granttimmerman/the-four-elements">
              The Four Elements.
            </a>
          </span>
        ),
        languages: ['ActionScript', 'Kongregate API'],
      },
    ],
  },
];

const recentExperiences = experiences.filter(
  experience => !experience.wasStudent,
);
const studentExperiences = experiences.filter(
  experience => experience.wasStudent,
);
const whiteIconBackgrounds = new Set(['google', 'nor1', 'observable']);

export default function SectionExperience() {
  return (
    <section
      id="experience"
      className="bg-gradient-to-r from-secondary-surfaceStart to-secondary-surfaceEnd overflow-x-hidden text-white [box-shadow:inset_0_-20px_20px_-20px_rgba(0,0,0,0.35)] [&>_.title]:cursor-pointer"
    >
      <h2 className="font-montserrat text-black-light font-bold text-large tracking-[9px] uppercase text-center py-5 px-0 pb-[10px] text-white">
        Experience
      </h2>
      <p className="text-center text-white">
        <em>Where I've worked</em>
      </p>
      <div className="mx-auto py-[10px] px-[10px] max-w-[1000px]">
        {recentExperiences.map(renderExperience)}
        <section
          aria-labelledby="earlier-experience"
          className="mt-3 border-t border-white/20 px-4 py-5"
        >
          <h3
            id="earlier-experience"
            className="mb-3 text-center text-small font-bold uppercase tracking-[2px]"
          >
            Earlier experience
          </h3>
          <ul className="grid grid-cols-3 gap-x-6 gap-y-3 text-small max-[700px]:grid-cols-2 max-[500px]:grid-cols-1">
            {studentExperiences.flatMap(experience =>
              experience.roles.map(role => (
                <li
                  key={experience.id + role.dateRange}
                  className="flex items-start gap-2"
                >
                  <SpinningExperienceLogo
                    company={experience.company}
                    id={experience.id}
                    isWhite={whiteIconBackgrounds.has(experience.id)}
                    size="small"
                  />
                  <span className="min-w-0">
                    <span className="block leading-snug">
                      <strong>{experience.company}</strong> · {role.title}
                    </span>
                    <span className="mt-1 block leading-snug text-white/80">
                      {role.shortSummary} · {role.dateRange}
                    </span>
                  </span>
                </li>
              )),
            )}
          </ul>
        </section>
      </div>
    </section>
  );
}

function SpinningExperienceLogo({
  company,
  id,
  isWhite,
  size,
}: {
  company: string;
  id: string;
  isWhite: boolean;
  size: 'small' | 'large';
}) {
  const [rotation, setRotation] = useState(0);
  const ignoreClickFromHover = useRef(false);
  const isSmall = size === 'small';
  const imageSize = isSmall ? 28 : 64;
  const imageClasses = `absolute inset-0 h-full w-full select-none rounded-full [backface-visibility:hidden] ${
    isWhite ? 'bg-white' : ''
  }`;
  const spinOnce = () => {
    setRotation(degrees => degrees + 360);
  };

  return (
    <button
      type="button"
      aria-label={`Spin ${company} logo`}
      className={`flex shrink-0 appearance-none items-center justify-center border-0 bg-transparent p-0 ${
        isSmall ? 'h-[44px] w-[44px]' : 'mx-auto h-16 w-16'
      }`}
      onPointerEnter={() => {
        ignoreClickFromHover.current = true;
        spinOnce();
      }}
      onClick={() => {
        if (ignoreClickFromHover.current) {
          ignoreClickFromHover.current = false;
          return;
        }
        spinOnce();
      }}
    >
      <span
        className={`block [perspective:300px] ${
          isSmall ? 'h-7 w-7' : 'h-16 w-16'
        }`}
      >
        <span
          data-spin-coin
          className="relative block h-full w-full [transform-style:preserve-3d] transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{transform: `rotateY(${rotation}deg)`}}
        >
          <Image
            width={imageSize}
            height={imageSize}
            className={imageClasses}
            src={`/images/icons/${id}.svg`}
            alt=""
            draggable={false}
            sizes={`${imageSize}px`}
          />
          <Image
            width={imageSize}
            height={imageSize}
            className={`${imageClasses} [transform:rotateY(180deg)]`}
            src={`/images/icons/${id}.svg`}
            alt=""
            aria-hidden="true"
            draggable={false}
            sizes={`${imageSize}px`}
          />
        </span>
      </span>
    </button>
  );
}

function renderExperience(experience: Experience) {
  const experienceKey = experience.id + experience.roles[0].dateRange;
  const isWhite = whiteIconBackgrounds.has(experience.id);

  return (
    <article
      key={experienceKey}
      className={`${experience.id} grid grid-cols-[64px_1fr] items-start gap-4 rounded-[5px] p-4 hover:bg-white/5 max-[600px]:grid-cols-1`}
    >
      <SpinningExperienceLogo
        company={experience.company}
        id={experience.id}
        isWhite={isWhite}
        size="large"
      />
      <div>
        {experience.roles.map(role => {
          const bullets = role.bullets?.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ));

          return (
            <div
              key={experienceKey + role.dateRange}
              className="mb-4 last:mb-0"
            >
              <div>
                <h5 className="float-left">
                  {experience.company} - {role.title}
                </h5>
                <h6 className="float-right">{role.dateRange}</h6>
                <div className="clear-both"></div>
              </div>
              <div className="mx-auto mt-2 text-white">
                {role.summary ? (
                  <div className="experience-summary">{role.summary}</div>
                ) : null}
                {role.bullets ? (
                  <ul className="py-2 text-small leading-normal list-disc list-inside">
                    {bullets}
                  </ul>
                ) : (
                  ''
                )}
                <div className="pt-1 text-small">
                  {role.languages.map(language => (
                    <div
                      key={language}
                      className="mx-1 my-1 inline-block rounded-[3px] bg-white/10 px-1"
                    >
                      {language}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
