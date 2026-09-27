/**
 * Metadata about a project.
 */
export interface Project {
  id: string; // The unique id.
  title: string; // The user-facing title.
  img: 'svg' | 'png'; // The image extension.
  description: string; // The short description.
  notes?: string; // Notes about this project.
  url: {
    demo?: string; // A URL with a demo.
    github: string; // The GitHub source linked from the project tile.
    youtube?: string; // A URL with a video demo on YouTube.
  };
}

/**
 * The list of projects.
 */
export const projects: Project[] = [
  {
    id: 'ts2gas',
    title: 'ts2gas',
    img: 'svg',
    description: 'Transpile TypeScript to Google Apps Script (used by clasp).',
    url: {
      demo: 'https://www.npmjs.com/package/ts2gas',
      github: 'https://github.com/grant/ts2gas',
    },
  },
  {
    id: 'new-computer-checklist',
    title: 'Computer Checklist',
    img: 'svg',
    description:
      'Mac setup checklist for Homebrew, FileVault, and a fresh toolchain.',
    url: {
      github: 'https://github.com/grant/new-computer-checklist',
    },
  },
  {
    id: 'algodb',
    title: 'AlgoDB',
    img: 'svg',
    description:
      'Search Wikipedia/Rosetta Code for copy-paste algorithm implementations.',
    url: {
      demo: 'https://medium.com/@granttimmerman/algodb-a-search-engine-for-algorithms-ff56dee0617d#.ih0caqob7',
      github: 'https://github.com/xkxx/algodb',
    },
  },
  {
    id: 'eagleeye',
    title: 'Eagle Eye',
    img: 'svg',
    description:
      'Track family flights and get Twilio texts on landings and delays.',
    url: {
      demo: 'http://devpost.com/software/eagle-eye',
      github: 'https://github.com/grant/eagleeye',
    },
  },
  {
    id: 'harbor',
    title: 'Harbor',
    img: 'png',
    description:
      'College party safety kit with Twilio check-in calls and texts.',
    url: {
      demo: 'http://devpost.com/software/harbor-7hbfag',
      github: 'https://github.com/grant/harbor',
    },
  },
  {
    id: 'dubhacks15f',
    title: 'DubHacks 2015',
    img: 'svg',
    description:
      "Event site for UW's 2015 student hackathon, which I organized.",
    url: {
      demo: 'http://15f.dubhacks.co/',
      github: 'https://github.com/dubhacks/15f',
    },
  },
  {
    id: 'nestvacationtracker',
    title: 'Nest Vacation Tracker',
    img: 'svg',
    description:
      'Parse Gmail flight dates and set Nest to save energy while you travel.',
    url: {
      demo: 'http://devpost.com/software/nest-vacation-saver',
      github: 'https://github.com/yarabarla/Nest-Vacation-Tracker',
    },
  },
  {
    id: 'capture',
    title: 'Capture',
    img: 'svg',
    description:
      'Turn a photo of a hand-drawn mock into a live site with OpenCV.',
    url: {
      demo: 'http://treehackswinter2015.challengepost.com/submissions/33360-capture',
      github: 'https://github.com/grant/capture',
    },
  },
  {
    id: 'snappo',
    title: 'Snappo',
    img: 'png',
    description:
      'Share selfies with people nearby—a location-based iOS social app.',
    url: {
      demo: 'http://challengepost.com/software/snappo',
      github: 'https://github.com/grant/snappo',
    },
  },
  {
    id: 'hawk',
    title: 'Hawk',
    img: 'svg',
    description:
      'Alert parents if a teen driver speeds or leaves a set radius.',
    url: {
      demo: 'http://challengepost.com/software/hawk-zi0fw',
      github: 'https://github.com/grant/hawk',
    },
  },
  {
    id: 'issues',
    title: 'Github Issues',
    img: 'png',
    description: 'Mobile GitHub Issues viewer built with Backbone.',
    url: {
      demo: 'http://grant.github.io/issues',
      github: 'https://github.com/grant/issues',
    },
  },
  {
    id: 'algorythem',
    title: 'Algo Rhythm',
    img: 'svg',
    description:
      'Train an RNN on MusicXML and generate classical piano in-browser.',
    url: {
      demo: 'https://medium.com/@granttimmerman/algo-rhythm-music-composition-using-neural-networks-f89897ff2df7',
      github: 'https://github.com/grant/algo-rhythm',
    },
  },
  {
    id: 'rollen',
    title: 'Rollen',
    img: 'png',
    description:
      'Find movies with friends using Facebook login, MongoDB, and Redis.',
    url: {
      github: 'https://github.com/grant/rollen',
    },
  },
  {
    id: 'productgrunt',
    title: 'Product Grunt',
    img: 'png',
    description: 'Daily Product Hunt parody of the worst old products.',
    url: {
      demo: 'https://www.producthunt.com/posts/product-grunt',
      github: 'https://github.com/grant/productgrunt',
    },
  },
  {
    id: 'safebaby',
    title: 'SafeBaby',
    img: 'png',
    description:
      'Baby-health tracker with Jawbone UP, Pebble, and Twilio alerts.',
    url: {
      github: 'https://github.com/grant/Baby-Tracker',
      demo: 'http://challengepost.com/software/safebaby',
    },
  },
  {
    id: 'herder',
    title: 'Herder',
    img: 'svg',
    description:
      'Uber driver analytics for when and where to work, plus demand SMS.',
    url: {
      github: 'https://github.com/grant/herder.co',
      youtube: 'http://youtu.be/8LZUNBag_Ok',
    },
  },
  {
    id: 'awear',
    title: 'Awear',
    img: 'svg',
    description:
      'iBeacon + Myo gestures that control nearby lights and devices by room.',
    url: {
      github: 'https://github.com/karan/awear',
      demo: 'http://challengepost.com/software/awear',
    },
  },
  {
    id: 'navi',
    title: 'navi',
    img: 'svg',
    description:
      'Live pair-programming sessions for coding problems with friends.',
    url: {
      github: 'https://github.com/karan/navi',
    },
  },
  {
    id: 'speekr',
    title: 'Speekr',
    img: 'png',
    description:
      'Practice native accents with Chrome speech recognition and synthesis.',
    url: {
      github: 'https://github.com/karan/speekr',
      demo: 'https://speekr.herokuapp.com',
    },
  },
  {
    id: 'socketio',
    title: 'socket.io chat',
    img: 'svg',
    description:
      'Official Socket.IO chat example for learning the library from scratch.',
    url: {
      github:
        'https://github.com/Automattic/socket.io/tree/master/examples/chat',
      demo: 'http://socket.io/demos/chat/',
    },
  },
  {
    id: 'dubhacks14f',
    title: 'DubHacks 2014',
    img: 'png',
    description:
      'Event site for the first DubHacks—the UW hackathon I founded.',
    notes: 'Beautiful website for describing this annual event.',
    url: {
      github: 'https://github.com/dubhacks/14f',
      demo: 'http://14f.dubhacks.co/',
    },
  },
  {
    id: 'harmonic',
    title: 'Harmonic',
    img: 'svg',
    description:
      "Swipe SoundCloud tracks with friends; 1st at Facebook's 2014 hackathon.",
    notes: 'Uses socket.io, express, SoundCloud, Redis, MongoDB and much more.',
    url: {
      github: 'https://github.com/grant/harmonic',
    },
  },
  {
    id: 'leappong',
    title: 'Leap Pong',
    img: 'svg',
    description:
      'Multiplayer pong you play with your hands via the Leap Motion.',
    notes: "Uses socket.io, express, and the Leap Motion's JS SDK",
    url: {
      github: 'https://github.com/grant/leappong',
    },
  },
  {
    id: 'hnplays2048',
    title: 'HN Plays 2048',
    img: 'png',
    description:
      'Crowd-played 2048 (100k+ plays); hit the front page of Hacker News.',
    notes: '100k+ plays',
    url: {
      github: 'https://github.com/grant/hnplays2048',
      demo: 'http://hnplays2048.herokuapp.com/',
    },
  },
  {
    id: 'milestone',
    title: 'Milestone',
    img: 'png',
    description:
      'Map the path to a dream job; 1st at AngelHack Seattle Fall 2013.',
    notes: 'Won 1st place AngelHack, Seattle Fall 2013',
    url: {
      github: 'https://github.com/grant/milestone',
    },
  },
  {
    id: 'sudosoldiers',
    title: 'Sudo Soldiers',
    img: 'png',
    description:
      'UW student group site for hackers teaching each other to build.',
    url: {
      github: 'https://github.com/SudoSoldiers/Sudo-Soldiers-Website',
      demo: 'http://students.washington.edu/uwsudo/',
    },
  },
  {
    id: 'thefourelements',
    title: 'The Four Elements',
    img: 'svg',
    description:
      'Kongregate Flash marble-puzzle game about mastering the elements.',
    url: {
      github: 'https://github.com/grant/thefourelements',
      demo: 'http://grant.github.io/thefourelements',
    },
  },
  {
    id: 'cellularwarfare',
    title: 'Cellular Warfare',
    img: 'svg',
    description:
      'Kongregate Flash game where you grow and evolve into a super-cell.',
    url: {
      github: 'https://github.com/grant/cellularwarfare',
      demo: 'http://grant.github.io/cellularwarfare',
    },
  },
  {
    id: 'vidwall',
    title: 'Vidwall',
    img: 'svg',
    description:
      'Play a wall of YouTube videos at once (24-hour Code Day project).',
    url: {
      github: 'https://github.com/grant/vidwall',
      demo: 'http://grant.github.io/vidwall',
    },
  },
  {
    id: 'glass-ocr',
    img: 'svg',
    title: 'Google Glass OCR',
    description:
      'Google Glass app that OCRs whatever the camera is looking at.',
    url: {
      github: 'https://github.com/colegleason/glass-ocr',
      demo: 'https://vision-for-glass.appspot.com/',
    },
  },
  {
    id: 'areyouhungrynow',
    title: 'Are You Hungry Now',
    img: 'svg',
    description: 'Find nearby people and grab lunch (Startup Weekend Seattle).',
    url: {
      github: 'https://github.com/charleswli/areyouhungrynow',
      demo: 'https://www.youtube.com/watch?v=U0DQHoN3-MY',
    },
  },
  {
    id: 'acadee',
    title: 'Acadee',
    img: 'svg',
    description:
      'Classroom assignment manager built at AngelHack Seattle 2012.',
    url: {
      github: 'https://github.com/grant/Acadee',
      demo: 'https://www.youtube.com/watch?v=HL9exIwXvM0',
    },
  },
  {
    id: 'godiagram',
    title: 'Go Diagram',
    img: 'png',
    description:
      'UML diagram editor for Go projects (parser + React frontend).',
    url: {
      github: 'https://github.com/grant/go-diagram',
      demo: 'https://drive.google.com/file/d/0B4riRkl944ZqcnQzR0x1c0QxVDA/view?usp=sharing',
    },
  },
  {
    id: 'slides2gif',
    title: 'Slides2Gif',
    img: 'svg',
    description: 'Turn Google Slides presentations into animated GIFs.',
    url: {
      demo: 'https://slides2gif.com',
      github: 'https://github.com/grant/slides2gif',
    },
  },
];
