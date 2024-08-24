import { Octokit } from '@octokit/core';

const headers = {
  'X-GitHub-Api-Version': '2022-11-28',
};

interface ScaleContainerAppConfig {
  owner: string;
  repo: string;
  ref: string;
  inputs: {
    min_replicas: number;
  };
}

export async function scaleContainerApp(octokit: Octokit, config: ScaleContainerAppConfig) {
  return octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
    owner: config.owner,
    repo: config.repo,
    workflow_id: 'scale-azure-container-app.yml',
    ref: config.ref,
    inputs: {
      min_replicas: String(config.inputs.min_replicas),
    },
    headers,
  });
}