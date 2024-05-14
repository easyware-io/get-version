import * as core from '@actions/core';
import * as fs from 'fs';

export default async function run(): Promise<void> {
  try {
    // Get the inputs
    // Limit "app" to this possible strings: 'quarkus', 'angular'
    const app = core.getInput('app', { required: true });
    if (!['quarkus', 'angular'].includes(app)) {
      throw new Error(`Invalid app: ${app}. At this point, only 'quarkus' and 'angular' are supported.`);
    }

    // Get the path to the project
    const path = core.getInput('path');
    // if path is not provided, set a default value, remove trailing slash
    const pathToUse = path ? `${path.replace(/\/$/, '')}/` : '.';

    let version = 'unknown';

    // If the app is 'quarkus', get version from pom.xml
    if (app.toLowerCase() === 'quarkus') {
      const pathToPom = `${pathToUse}/pom.xml`;
      if (!fs.existsSync(path)) {
        const allFiles = fs.readdirSync(pathToUse);
        core.error(`Files in ${pathToUse}: ${allFiles.join('\n')}`);
        throw new Error(`File not found: ${pathToPom}`);
      }
      const pom = fs.readFileSync(pathToPom, 'utf8');
      const regex = /<version>(.*)<\/version>/;
      const match = pom.match(regex);
      if (match) {
        version = match[1];
      } else {
        throw new Error(`Version not found in: ${pathToPom}`);
      }
    }

    // If the app is 'angular', get version from package.json
    if (app.toLowerCase() === 'angular') {
      const pathToPackage = `${pathToUse}/package.json`;
      if (!fs.existsSync(path)) {
        const allFiles = fs.readdirSync(pathToUse);
        core.error(`Files in ${pathToUse}: ${allFiles.join('\n')}`);
        throw new Error(`File not found: ${pathToPackage}`);
      }
      const pkg = fs.readFileSync(pathToPackage, 'utf8');
      const json = JSON.parse(pkg);
      version = json.version;
    }

    // Return "version" as output
    core.setOutput('version', version);
    core.info(`Version: ${version}`);
  } catch (error) {
    core.setOutput('version', 'unknown');
    if (error instanceof Error) core.setFailed(`Failed get version: ${error.message}`);
  }
}

if (require.main === module) {
  run();
}
