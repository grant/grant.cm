import React from 'react';
import Image from 'next/image';

/**
 * A single role within an experience.
 */
interface ExperienceRole {
  title: string; // The role at the company, like "Engineer"
  dateRange: string; // The date range, like "2013-2015"
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
    company: 'Anon.com',
    id: 'anon',
    roles: [
      {
        title: 'Staff Full-Stack Engineer; Interim Manager',
        dateRange: 'Mar 2024 – Nov 2025',
        summary: (
          <span>
            Product lead & full-stack engineer for Anon's dashboard and AI web
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
          <span>
            Built the web console for additive.ai – an AI accounting startup.
          </span>
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
            Built the <a href="https://observablehq.com">observablehq.com</a>{' '}
            data viz platform. Lots of TypeScript!
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
          <span>
            Built the core runtimes for Google Cloud's serverless computing
            platform.
          </span>
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
          <span>
            Built developer products for Google Cloud's serverless computing
            platform.
          </span>
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
            Designed and built{' '}
            <strong>G Suite's open source developer presence.</strong>
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
            Built a variety of features supporting Sift Science’s fraud APIs and
            web console. Features include workflows, enhanced payment and social
            profile data, mixpanel tracking.
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
        summary: (
          <span>
            Built historical Sift scores visualization, feature gating/pricing
            changes backend and frontend, and redesigned user details page for
            Sift Science's console.
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
        summary: (
          <span>
            Built the server-side infrastructure for internationalizing skills
            on LinkedIn, allowing recruiters to search for skilled professionals
            around the world independent of their language. The skills feature
            affects over 60 million page views per month and 320+ million
            members.
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
        summary: (
          <span>
            Hand-picked to contribute to Facebook’s open-sourced projects as a
            part of Facebook’s Open Academy Program. Created Socket.IO's
            official example app{' '}
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
        summary: (
          <span>
            Designed and implemented two flagship features for Tableau’s big
            data visualization software.
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

export default function SectionExperience() {
  return (
    <section
      id="experience"
      className="bg-gradient-to-r from-[rgb(58,130,137)] to-[rgb(173,223,230)] overflow-x-hidden text-white [box-shadow:inset_0_-20px_20px_-20px_rgba(0,0,0,0.35)] [&>_.title]:cursor-pointer"
    >
      <h2 className="font-montserrat text-black-light font-bold text-large tracking-[9px] uppercase text-center py-5 px-0 pb-[10px] text-white">
        Experience
      </h2>
      <p className="text-center text-blue-light">
        <em>Where I've worked</em>
      </p>
      <div className="mx-auto py-[10px] px-[10px] max-w-[1000px]">
        {experiences.map((experience: Experience) => {
          const experienceKey = experience.id + experience.roles[0].dateRange;
          const isWhite =
            experience.id === 'google' ||
            experience.id === 'nor1' ||
            experience.id === 'observable';
          return (
            <div
              key={experienceKey}
              className={`${experience.id} p-5 rounded-[5px] hover:bg-white/5`}
            >
              <div className="text-center w-[100px] h-[100px] mx-auto">
                <Image
                  width={100}
                  height={100}
                  className={`rounded-full ${isWhite ? 'bg-white' : ''}`}
                  src={`/images/icons/${experience.id}.svg`}
                  alt={experience.company}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </div>
              {/* For each role... */}
              {experience.roles.map(role => {
                const bullets = role.bullets?.map((b, i) => (
                  <li key={i}>{b}</li>
                ));

                return (
                  <div
                    key={experienceKey + role.dateRange}
                    className="my-[10px]"
                  >
                    <div>
                      <h5 className="float-left">
                        {experience.company} - {role.title}
                      </h5>
                      <h6 className="float-right">{role.dateRange}</h6>
                      <div className="clear-both"></div>
                    </div>
                    <div className="mx-auto mt-[10px] text-blue-light">
                      {role.summary}
                      {role.bullets ? (
                        <ul className="py-[10px] text-small leading-normal list-disc list-inside">
                          {bullets}
                        </ul>
                      ) : (
                        ''
                      )}
                      <div className="pt-[5px]">
                        {role.languages.map((l, idx) => (
                          <div
                            key={idx}
                            className="inline-block my-[5px] mx-[5px] px-[5px] bg-white/10 rounded-[3px] [&:not(:first-child)]:ml-[5px]"
                          >
                            {l}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
