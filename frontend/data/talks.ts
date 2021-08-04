export interface Location {
  name: string; // The location of the talk
  coordinate?: number[]; // The latitude, longitude of the location
}

/**
 * Metadata about a project.
 */
export interface Talk {
  eventName: string; // The event name
  date: string; // The mm-dd-yyyy date of the event
  title: string; // The title of the talk
  location: Location;
  links?: {
    // A set of links
    video?: string; // A video of the talk
    eventPage?: string; // The event page
    presentation?: string; // A link to the slides
    other?: string; // Some other link
  };
}

enum CITIES {
  VIRTUAL = 'VIRTUAL',
  SAN_FRANCISCO = "SAN_FRANCISCO",
  KANSAS_CITY = 'KANSAS_CITY',
  MANILA = 'MANILA',
  SYDNEY = 'SYDNEY',
  HANOI = 'HANOI',
  MEXICO = 'MEXICO',
  CALI = 'CALI',
  MEDELLIN = 'MEDELLIN',
  LIMA = 'LIMA',
  CUSCO = 'CUSCO',
  BUENOS_AIRES = 'BUENOS_AIRES',
  SANTIAGO_CHILE = 'SANTIAGO_CHILE',
  SEATTLE = 'SEATTLE',
  SUNNYVALE = 'SUNNYVALE',
  MOUNTAIN_VIEW = 'MOUNTAIN_VIEW',
  ORLANDO = 'ORLANDO',
  LONDON = 'LONDON',
  LOS_ANGELES = 'LOS_ANGELES',
  DUBLIN = 'DUBLIN',
  STOCKHOLM = 'STOCKHOLM',
  AUSTIN = 'AUSTIN',
  VANCOUVER = 'VANCOUVER',
  FRESNO = 'FRESNO',
  NEW_YORK = 'NEW_YORK',
  FREMONT = 'FREMONT',
  TAMPA_FLORIDA = 'TAMPA_FLORIDA',
  DC = 'DC',
}

const LOCATION: { [key in CITIES]: Location } = {
  VIRTUAL: {
    name: 'Virtual',
  },
  SAN_FRANCISCO: {
    name: 'San Francisco',
    coordinate: [37.774929, -122.419418],
  },
  KANSAS_CITY: {
    name: 'Kansas City',
    coordinate: [39.099728, -94.578568],
  },
  MANILA: {
    name: 'Manila, Philippines',
    coordinate: [14.58226, 120.9748],
  },
  SYDNEY: {
    name: 'Sydney, Australia',
    coordinate: [-33.872761, 151.205338],
  },
  HANOI: {
    name: 'Hanoi, Vietnam',
    coordinate: [21.027763, 105.83416],
  },
  MEXICO: {
    name: 'Mexico City, Mexico',
    coordinate: [19.432608, -99.133209],
  },
  CALI: {
    name: 'Cali, Colombia',
    coordinate: [3.4516, -76.5320]
  },
  MEDELLIN: {
    name: 'Medellin, Colombia',
    coordinate: [6.2476, -75.5658]
  },
  LIMA: {
    name: 'Lima, Peru',
    coordinate: [12.0464, -77.0428]
  },
  CUSCO: {
    name: 'Cusco, Peru',
    coordinate: [6.2476, -75.5658]
  },
  BUENOS_AIRES: {
    name: 'Buenos Aires, Argentina',
    coordinate: [34.6037, -58.3816]
  },
  SANTIAGO_CHILE: {
    name: 'Santiago, Chile',
    coordinate: [33.4489, -70.6693]
  },
  SEATTLE: {
    name: 'Seattle',
    coordinate: [47.6062, -122.3321],
  },
  SUNNYVALE: {
    name: 'Sunnyvale',
    coordinate: [37.3688, -122.0363  ],
  },
  MOUNTAIN_VIEW: {
    name: 'Mountain View',
    coordinate: [37.3861, -122.0839    ],
  },
  ORLANDO: {
    name: 'Orlando',
    coordinate: [28.5383, -81.3792    ],
  },
  LONDON: {
    name: 'London',
    coordinate: [51.5074, -0.1278    ],
  },
  LOS_ANGELES: {
    name: 'Los Angeles',
    coordinate: [34.0522, -118.2437    ],
  },
  DUBLIN: {
    name: 'Dublin',
    coordinate: [53.3498, -6.2603    ],
  },
  STOCKHOLM: {
    name: 'Stockholm',
    coordinate: [59.3293, 18.0686    ],
  },
  AUSTIN: {
    name: 'Austin',
    coordinate: [30.2672, -97.7431    ],
  },
  VANCOUVER: {
    name: 'Vancouver',
    coordinate: [49.2827, -123.1207    ],
  },
  FRESNO: {
    name: 'Fresno',
    coordinate: [36.7378, -119.7871    ],
  },
  NEW_YORK: {
    name: 'New York',
    coordinate: [40.7128, -74.0060    ],
  },
  FREMONT: {
    name: 'Fremont',
    coordinate: [37.5485, -121.9886    ],
  },
  TAMPA_FLORIDA: {
    name: 'Tampa',
    coordinate: [],
  },
  DC: {
    name: 'D.C.',
    coordinate: [],
  },
};

/**
 * A list of all talks
 */
export const talks: Talk[] = [
  {
    eventName: "Google I/O '21 (Virtual)",
    date: '05.19.2021',
    title: 'Cloud, Dart, and full-stack Flutter – Q&A',
    location: LOCATION.VIRTUAL,
    links: {
      video: 'https://www.youtube.com/watch?v=r8rVm4-RJJM',
    },
  },
  {
    eventName: "Google I/O '21 (Virtual)",
    date: '05.18.2021',
    title: 'Go full-stack with Kotlin or Dart on Google Cloud',
    location: LOCATION.VIRTUAL,
    links: {
      video: 'https://www.youtube.com/watch?v=JwCmu_INnCg',
    },
  },
  {
    eventName: 'GDG Kansas City (Virtual)',
    date: '12.10.2020',
    title: 'Connect Serverless Events with Cloud Eventarc',
    location: LOCATION.KANSAS_CITY,
    links: {
      eventPage:
        'https://gdg.community.dev/events/details/google-gdg-cloud-kansas-city-presents-connect-serverless-events-with-cloud-eventarc',
    },
  },
  {
    eventName: '💥 Video – CloudEvents with Google Cloud',
    date: '09.15.2020',
    title: 'Google Cloud Tech',
    location: LOCATION.VIRTUAL,
    links: {
      video: 'https://www.youtube.com/watch?v=yGQe0-5D7e4',
    },
  },
  {
    eventName: 'GDG Cloud Manila',
    date: '02.21.2020',
    title: 'Go Serverless with Google Cloud!',
    location: LOCATION.MANILA,
    links: {
      eventPage: 'https://www.meetup.com/GDG-Cloud-Manila/events/268741372',
    },
  },
  {
    eventName: 'GDG Cloud Syndey',
    date: '02.11.2020',
    title: 'Go Serverless with Google Cloud!',
    location: LOCATION.SYDNEY,
    links: {
      eventPage: 'https://www.meetup.com/gdgcloudsydney/events/267899575',
    },
  },
  {
    eventName: 'GDG Cloud Hanoi',
    date: '01.21.2020',
    title: 'Go Serverless with Google Cloud!',
    location: LOCATION.HANOI,
    links: {
      eventPage: 'https://www.meetup.com/GDG-Cloud-Hanoi/events/267896968',
    },
  },
  {
    eventName: 'DevFest CDMX',
    date: '12.16.2019',
    title: 'Go Serverless with Google Cloud!',
    location: LOCATION.MEXICO,
    links: {
      eventPage: 'https://www.meetup.com/cloudmx/events/262709329/',
    },
  },
  {
    eventName: 'DevFest Cali',
    date: '11.23.2019',
    title: 'Go Serverless with Google Cloud!',
    location: LOCATION.CALI,
    links: {
      eventPage: 'https://www.meetup.com/GDGCali/events/264293187/',
    },
  },
  {
    eventName: 'DevFest Medellin',
    date: '11.16.2019',
    title: 'Go Serverless with Google Cloud!',
    location: LOCATION.MEDELLIN,
    links: {
      eventPage: 'https://www.meetup.com/GDG-Medellin/events/262641229/',
    },
  },
  {
    eventName: 'Cloud Summit Mexico',
    date: '11.13.2019',
    title: 'Serverless with Knative',
    location: LOCATION.MEXICO,
    links: {
      eventPage:
        'https://inthecloud.withgoogle.com/summit-2019/global-register.html',
    },
  },
  {
    eventName: '💥 Video – Functions Framework',
    date: '11.10.2019',
    title: 'Google Cloud Tech',
    location: LOCATION.VIRTUAL,
    links: {
      video: 'https://www.youtube.com/watch?v=qQiqo1zZJmI',
    },
  },
  {
    eventName: 'DevFest Lima',
    date: '11.09.2019',
    title: 'Go Serverless with Google Cloud!',
    location: LOCATION.LIMA,
    links: {
      eventPage: 'https://www.meetup.com/GDG-Open/events/263942288/',
    },
  },
  {
    eventName: 'GDG Lima',
    date: '10.26.2019',
    title: 'Go Serverless with Google Cloud!',
    location: LOCATION.LIMA,
    links: {
      eventPage: 'https://www.meetup.com/gdglima/events/265429819/',
    },
  },
  {
    eventName: 'DevFest Cusco',
    date: '10.19.2019',
    title: 'Go Serverless with Google Cloud!',
    location: LOCATION.CUSCO,
    links: {
      eventPage: 'https://www.meetup.com/gdgcuscoperu/events/263807769/',
    },
  },
  {
    eventName: 'Cloud Functions vs Cloud Run',
    date: '10.15.2020',
    title: 'Google Cloud Tech',
    location: LOCATION.VIRTUAL,
    links: {
      video: 'https://www.youtube.com/watch?v=zRjOSxTpC3A',
    },
  },
  {
    eventName: 'DevFest Buenos Aires',
    date: '10.12.2019',
    title: 'Ir sin servidor con Google Cloud Functions',
    location: LOCATION.BUENOS_AIRES,
    links: {
      eventPage: 'https://www.meetup.com/es-ES/gdg-wtm/events/264036293/',
    },
  },
  {
    eventName: 'DevFest Santiago',
    date: '10.04.2019',
    title: 'Go Serverless with Google Cloud!',
    location: LOCATION.SANTIAGO_CHILE,
    links: {
      eventPage: 'https://devfest.cl',
    },
  },
  {
    eventName: 'Noders, Santiago',
    date: '09.26.2019',
    title: 'Go Serverless with Google Cloud!',
    location: LOCATION.SANTIAGO_CHILE,
    links: {
      eventPage: 'https://www.meetup.com/NodersJS/events/264707900/',
    },
  },
  {
    eventName: 'SeattleJS',
    date: '06.13.2019',
    title: 'Go Serverless with Google Cloud Functions',
    location: LOCATION.SEATTLE,
    links: {
      eventPage: 'https://www.meetup.com/seattlejs/events/clmbzqyzjbrb',
      video: 'https://www.youtube.com/watch?v=EjMs36ucRA4',
    },
  },
  {
    eventName: 'SF Python',
    date: '06.12.2019',
    title: 'Intro into Google Cloud Functions',
    location: LOCATION.SAN_FRANCISCO,
    links: {
      eventPage: 'https://www.meetup.com/sfpython/events/xkwxvqyzjbqb/',
    },
  },
  {
    eventName: "Google I/O '19",
    date: '05.07.2019',
    title: 'Functions as a Service',
    location: LOCATION.MOUNTAIN_VIEW,
    links: {
      eventPage: 'https://events.google.com/io2019/',
    },
  },
  {
    eventName: "Cloud Next '19",
    date: '04.10.2019',
    title: 'Functions as a Service',
    location: LOCATION.SAN_FRANCISCO,
    links: {
      video: 'https://www.youtube.com/watch?v=fEbAALVwyEU',
    },
  },
  {
    eventName: 'GDG SV',
    date: '02.23.2019',
    title: 'Google Cloud Functions for Go',
    location: LOCATION.SUNNYVALE,
    links: {
      eventPage: 'https://www.meetup.com/gdg-silicon-valley/events/258255512/',
    },
  },
  {
    eventName: 'Developer Week, SF',
    date: '02.22.2019',
    title: 'All About Apps Script – Talk',
    location: LOCATION.SAN_FRANCISCO,
    links: {
      eventPage:
        'https://developerweek2019.sched.com/event/JFo7/pro-talk-all-about-apps-script',
    },
  },
  {
    eventName: 'Developer Week, SF',
    date: '02.20.2019',
    title: 'Apps Script, The Original Serverless Runtime – Workshop',
    location: LOCATION.SAN_FRANCISCO,
    links: {
      eventPage:
        'https://developerweek2019.sched.com/event/JYSK/pro-workshop-apps-script-the-original-serverless-runtime',
    },
  },
  {
    eventName: 'GDG Central Florida',
    date: '01.19.2019',
    title: 'All About Apps Script',
    location: LOCATION.ORLANDO,
    links: {
      eventPage: 'https://www.meetup.com/GDG-Central-Florida/events/253755546/',
      video: 'https://www.youtube.com/watch?v=dpYHPzQF1qI',
    },
  },
  {
    eventName: 'SeattleJS',
    date: '12.13.2018',
    title: 'All About Apps Script',
    location: LOCATION.SEATTLE,
    links: {
      eventPage: 'https://github.com/seattlejs/seattlejs/issues/138',
    },
  },
  {
    eventName: 'DevFest LA',
    date: '12.02.2018',
    title: 'All About Apps Script',
    location: LOCATION.LOS_ANGELES,
    links: {
      eventPage: 'https://devfest.gdgla.org/',
    },
  },
  {
    eventName: 'DevFest Dublin',
    date: '11.17.2018',
    title: 'All About Apps Script',
    location: LOCATION.DUBLIN,
    links: {
      eventPage: 'https://dublin-devfest-2018.firebaseapp.com/',
    },
  },
  {
    eventName: 'DevFest Stockholm',
    date: '11.08.2018',
    title: 'All About Apps Script',
    location: LOCATION.STOCKHOLM,
    links: {
      eventPage:
        'https://www.meetup.com/Stockholm-Google-Developer-Group/events/255474330/',
    },
  },
  {
    eventName: 'Angular Connect',
    date: '11.07.2018',
    title: 'Automate G Suite with Apps Script and Angular',
    location: LOCATION.LONDON,
    links: {
      eventPage: 'https://angularconnect.com/',
    },
  },
  {
    eventName: 'GDG SF',
    date: '10.28.2018',
    title: 'All About Apps Script',
    location: LOCATION.SAN_FRANCISCO,
    links: {
      eventPage:
        'https://www.meetup.com/google-developer-group-san-francisco/events/253616001/',
    },
  },
  {
    eventName: 'GDG Austin',
    date: '10.25.2018',
    title: 'All About Apps Script',
    location: LOCATION.AUSTIN,
    links: {
      eventPage: 'https://www.meetup.com/gdgaustin/events/255177058/',
    },
  },
  {
    eventName: 'UT Austin',
    date: '10.24.2018',
    title: 'All About Apps Script (student edition',
    location: LOCATION.AUSTIN,
    links: {
      eventPage:
        'https://docs.google.com/presentation/d/1Fk_f4VjLREKDt1dJBp0JYc0SCoVVhKVaPZNyQIDLCZo/edit?usp=sharing',
    },
  },
  {
    eventName: 'DevFest Vancouver',
    date: '10.21.2018',
    title: 'Automate G Suite with APIs and Apps Script',
    location: LOCATION.VANCOUVER,
    links: {
      eventPage: 'https://devfest2018vancouver.firebaseapp.com/',
      video: 'https://www.youtube.com/watch?v=qFN8ULYt7Bk',
    },
  },
  {
    eventName: 'GDG Fresno',
    date: '10.20.2018',
    title: 'All About Apps Script',
    location: LOCATION.FRESNO,
    links: {
      eventPage: 'https://www.meetup.com/googledevelopers/events/253850757/',
    },
  },
  {
    eventName: 'Video – Apps Script – clasp and TypeScript',
    date: '10.05.2018',
    title: 'Totally Unscripted',
    location: LOCATION.VIRTUAL,
    links: {
      video: 'https://www.youtube.com/watch?v=ReeTGi600QI',
    },
  },
  {
    eventName: 'NYC – Cloud Next Extended',
    date: '09.29.2018',
    title: 'All About Apps Script',
    location: LOCATION.NEW_YORK,
    links: {
      eventPage: 'https://www.meetup.com/GDG-Bronx/events/252972021/',
    },
  },
  {
    eventName: 'GDG Fremont',
    date: '09.26.2018',
    title: 'Automate G Suite with Apps Script',
    location: LOCATION.FREMONT,
    links: {
      eventPage: 'https://www.meetup.com/GDG-Fremont/events/254077517',
    },
  },
  {
    eventName: 'SF Python',
    date: '09.12.2018',
    title: 'G Suite + Python lightning talk',
    location: LOCATION.SAN_FRANCISCO,
    links: {
      eventPage: 'https://www.meetup.com/sfpython/events/254295636',
      other: 'https://twitter.com/granttimmerman/status/1040067728583712769',
    },
  },
  {
    eventName: 'Colgate-Palmolive, Westgate FL',
    date: '09.06.2018',
    title: 'G Suite Developer Days',
    location: LOCATION.TAMPA_FLORIDA,
  },
  {
    eventName: 'OpenLate',
    date: '08.07.2018',
    title: 'Automate with Apps Script',
    location: LOCATION.SAN_FRANCISCO,
    links: {
      eventPage: 'https://www.meetup.com/OpenLate/events/qbcsfnyxlbkb/',
    },
  },
  {
    eventName: "Cloud Next '18",
    date: '07.25.2018',
    title: 'Enhancing the Google Apps Script Developer Experience',
    location: LOCATION.SAN_FRANCISCO,
    links: {
      video: 'https://www.youtube.com/watch?v=wXYtWwtizag',
    },
  },
  {
    eventName: 'DevFest DC',
    date: '06.08.2018',
    title: 'All About Apps Script',
    location: LOCATION.DC,
    links: {
      eventPage: 'https://www.devfestdc.org/',
    },
  },
  {
    eventName: 'TrailheaDX, SF',
    date: '03.28.2018',
    title: 'All About Apps Script',
    location: LOCATION.SAN_FRANCISCO,
    links: {
      eventPage: 'https://developer.salesforce.com/trailheadx',
    },
  },
  {
    eventName: 'Cloud Community Conference, Sunnyvale',
    date: '03.16.2018',
    title: 'All About Apps Script',
    location: LOCATION.SUNNYVALE,
  },
  {
    eventName: 'DevFest SV',
    date: '12.16.2017',
    title: 'All About Apps Script',
    location: LOCATION.SUNNYVALE,
    links: {
      eventPage: 'https://www.meetup.com/gdg-silicon-valley/events/244582419/',
    },
  },
  {
    eventName: 'UW Hackers, Seattle',
    date: '10.29.2015',
    title: 'How to Prepare for Technical Interviews',
    location: LOCATION.SEATTLE,
    links: {
      other:
        'https://docs.google.com/presentation/d/1X4kAlq4amNeIxW6Y6IR6fh1whSor5llmfMxWfep84yY',
    },
  },
  {
    eventName: 'UW Hackers, Seattle',
    date: '04.16.2015',
    title: 'React.js: The Frontend Framework of the Future',
    location: LOCATION.SEATTLE,
    links: {
      video: 'https://www.youtube.com/watch?v=iVVZfPbNCtI',
      other: 'https://github.com/grant/react-talk',
    },
  },
  {
    eventName: 'UW Hackers, Seattle',
    date: '10.16.2014',
    title: 'MEAN Stack',
    location: LOCATION.SEATTLE,
    links: {
      presentation: 'https://github.com/grant/MEAN-Stack-Slides',
      other: 'http://grant.github.io/react-talk/talk/',
    },
  },
  {
    eventName: 'UW Hackers, Seattle',
    date: '05.14.2014',
    title: '3D Printing',
    location: LOCATION.SEATTLE,
    links: {
      presentation:
        'https://github.com/UWHackers/uwhackers.github.io/tree/master/3d-printing',
      other: 'http://uwhackers.github.io/3d-printing/#/',
    },
  },
  {
    eventName: 'UW Hackers, Seattle',
    date: '05.01.2014',
    title: 'Mobile Design - Responsive Design and UI Paradigms',
    location: LOCATION.SEATTLE,
    links: {
      presentation: 'http://grant.github.io/Mobile-Development-Design/#/',
      other: 'https://github.com/grant/Mobile-Development-Design/tree/gh-pages',
    },
  },
  {
    eventName: 'UW Hackers, Seattle',
    date: '04.02.2014',
    title: 'Open Sourcing Everything',
    location: LOCATION.SEATTLE,
    links: {
      presentation: 'http://uwhackers.github.io/open-source-slides/#/',
      other:
        'https://github.com/UWHackers/uwhackers.github.io/tree/master/open-source-slides',
    },
  },
  {
    eventName: 'UW Hackers, Seattle',
    date: '02.27.2014',
    title: 'Hacking like a Hipster',
    location: LOCATION.SEATTLE,
    links: {
      presentation: 'http://uwhackers.github.io/grunt-gulp-heroku-slides',
      other: 'https://github.com/UWHackers/WebDev/tree/master/p4/slides',
      video: 'https://www.youtube.com/watch?v=weZUOS8QuLw',
    },
  },
];
