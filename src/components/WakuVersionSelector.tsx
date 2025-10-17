import { useState, useRef } from 'react';
import { webcontainer } from 'tutorialkit:core';
import tutorialStore from 'tutorialkit:store';
import type { WebContainerProcess } from '@webcontainer/api';

const WAKU_VERSIONS = [
  { value: '^0.0.35', label: 'Latest (0.0.35)' },
  { value: '0.0.34', label: 'v0.0.34' },
  { value: '0.0.33', label: 'v0.0.33' },
  { value: 'next', label: 'Next' },
];

// Store the dev server process globally so we can kill it
let currentDevProcess: WebContainerProcess | null = null;

export default function WakuVersionSelector() {
  const [selectedVersion, setSelectedVersion] = useState('^0.0.35');
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleVersionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const version = event.target.value;
    setIsUpdating(true);
    setSelectedVersion(version);

    try {
      const wc = await webcontainer;

      console.log(`Switching to @waku/sdk@${version}...`);

      // Step 1: Read and update package.json
      const packageJsonContent = await wc.fs.readFile('package.json', 'utf-8');
      const packageJson = JSON.parse(packageJsonContent);
      packageJson.dependencies['@waku/sdk'] = version;
      const newContent = JSON.stringify(packageJson, null, 2) + '\n';

      // Step 2: Update package.json in the editor (so user can see the change)
      const editorStore = (tutorialStore as any)._editorStore;
      if (editorStore) {
        editorStore.updateFile('/package.json', newContent);
      }

      // Step 3: Update package.json in WebContainer
      await wc.fs.writeFile('package.json', newContent);

      // Step 4: Kill existing dev server if it exists
      if (currentDevProcess) {
        console.log('Stopping current dev server...');
        currentDevProcess.kill();
        currentDevProcess = null;
      }

      // Step 5: Run npm install
      console.log('Running npm install...');
      const installProcess = await wc.spawn('npm', ['install']);
      const installExit = await installProcess.exit;

      if (installExit !== 0) {
        console.error('npm install failed');
        return;
      }

      console.log('Dependencies installed successfully');

      // Step 6: Start new dev server
      console.log('Starting dev server...');
      currentDevProcess = await wc.spawn('npm', ['run', 'dev']);

      console.log(`Successfully switched to @waku/sdk@${version}`);
      console.log('Please reload the preview to see the changes.');
    } catch (error) {
      console.error('Failed to update version:', error);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="version-selector">
      <label htmlFor="waku-version">SDK Version:</label>
      <select
        id="waku-version"
        value={selectedVersion}
        onChange={handleVersionChange}
        disabled={isUpdating}
      >
        {WAKU_VERSIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {isUpdating && <span className="spinner" title="Installing...">⟳</span>}
    </div>
  );
}
