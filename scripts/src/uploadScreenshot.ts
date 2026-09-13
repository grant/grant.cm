import {createR2Client, IssueAssetService, loadR2Config} from './issueAssets';

interface UploadArguments {
  command: 'upload';
  filename: string;
  issue: string;
  urlOnly: boolean;
}

interface HealthArguments {
  command: 'health';
}

type CliArguments = UploadArguments | HealthArguments;

const usage = `Usage:
  upload-screenshot <image> --issue <issue-or-run-id> [--url-only]
  upload-screenshot health

Options:
  --issue <id>  Store under issues/<id>/.
  --url-only    Print only the resulting public URL.
  --help        Show this help.`;

export function parseArguments(args: string[]): CliArguments {
  if (args.includes('--help') || args.includes('-h')) {
    throw new HelpRequested();
  }
  if (args[0] === 'health') {
    if (args.length !== 1) {
      throw new Error(
        'The health command does not accept additional arguments.',
      );
    }
    return {command: 'health'};
  }

  const filename = args[0];
  if (!filename || filename.startsWith('-')) {
    throw new Error('Provide an image path as the first argument.');
  }
  let issue: string | undefined;
  let urlOnly = false;
  for (let index = 1; index < args.length; index++) {
    const argument = args[index];
    if (argument === '--issue') {
      issue = args[++index];
      if (!issue) throw new Error('--issue requires a value.');
    } else if (argument === '--url-only') {
      urlOnly = true;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }
  if (!issue) {
    throw new Error(
      'Missing --issue <issue-or-run-id>; this controls the R2 object path.',
    );
  }
  return {command: 'upload', filename, issue, urlOnly};
}

export async function run(
  args: string[],
  output: Pick<Console, 'log' | 'error'> = console,
): Promise<number> {
  try {
    const parsed = parseArguments(args);
    const config = loadR2Config();
    const service = new IssueAssetService(createR2Client(config), config);
    if (parsed.command === 'health') {
      await service.healthCheck();
      output.log('ok');
      return 0;
    }

    const url = await service.uploadFile(parsed.filename, parsed.issue);
    if (!parsed.urlOnly) output.log(`Uploaded ${parsed.filename}`);
    output.log(url);
    return 0;
  } catch (error) {
    if (error instanceof HelpRequested) {
      output.log(usage);
      return 0;
    }
    output.error(
      `upload-screenshot: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
    output.error('Run upload-screenshot --help for usage.');
    return 1;
  }
}

class HelpRequested extends Error {}

if (require.main === module) {
  void run(process.argv.slice(2)).then(exitCode => {
    process.exitCode = exitCode;
  });
}
