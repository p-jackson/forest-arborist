'use strict'; // eslint-disable-line strict

const path = require('path');
const mute = require('mute');
const childProcess = require('child_process');
const fsh = require('./fsh');


function getRepoTypeForParams(repoPath, repoType) {
  if (repoType === undefined) {
    return this.getRepoTypeForLocalPath(repoPath);
  }
  return repoType;
}


module.exports = {


  isGitRepository(repository) {
    const unmute = mute();
    try {
      // KISS and get git to check. Hard to be definitive by hand, especially with scp URLs.
      childProcess.execFileSync(
        'git', ['ls-remote', repository]
      );
      unmute();
      return true;
    } catch (err) {
      unmute();
      return false;
    }
  },


  isHgRepository(repository) {
    const unmute = mute();
    try {
      // KISS and get hg to check. Hard to be definitive by hand, especially with scp URLs.
      childProcess.execFileSync(
        'hg', ['id', repository]
      );
      unmute();
      return true;
    } catch (err) {
      unmute();
      return false;
    }
  },


  getRepoTypeForLocalPath(repoPath) {
    if (fsh.dirExistsSync(path.join(repoPath, '.git'))) {
      return 'git';
    } else if (fsh.dirExistsSync(path.join(repoPath, '.hg'))) {
      return 'hg';
    }

    return undefined;
  },


  getOrigin(repoPath, repoTypeParam) {
    let origin;
    const repoType = getRepoTypeForParams(repoPath, repoTypeParam);

    if (repoType === 'git') {
      try {
        origin = childProcess.execFileSync(
          'git', ['-C', repoPath, 'config', '--get', 'remote.origin.url']
        ).toString().trim();
      } catch (err) {
        // May have created repo locally and does not yet have an origin
      }
    } else if (repoType === 'hg') {
      origin = childProcess.execFileSync(
        'hg', ['--repository', repoPath, 'config', 'paths.default']
      ).toString().trim();
    }
    return origin;
  },


  getBranch(repoPath, repoTypeParam) {
    let branch;
    const repoType = getRepoTypeForParams(repoPath, repoTypeParam);

    if (repoType === 'git') {
      const unmute = mute();
      try {
        // This will fail if have detached head, but does work for an empty repo
        branch = childProcess.execFileSync(
           'git', ['symbolic-ref', '--short', 'HEAD'], { cwd: repoPath }
        ).toString().trim();
      } catch (err) {
        branch = undefined;
      }
      unmute();
    } else if (repoType === 'hg') {
      branch = childProcess.execFileSync(
        'hg', ['--repository', repoPath, 'branch']
      ).toString().trim();
    }
    return branch;
  },


  getRevision(repoPath, repoTypeParam) {
    let revision;
    const repoType = getRepoTypeForParams(repoPath, repoTypeParam);

    if (repoType === 'git') {
      revision = childProcess.execFileSync(
         'git', ['rev-parse', 'HEAD'], { cwd: repoPath }
      ).toString().trim();
    } else if (repoType === 'hg') {
      revision = childProcess.execFileSync(
        'hg', ['log', '--rev', '.', '--template', '{node}'], { cwd: repoPath }
      ).toString().trim();
    }
    return revision;
  },


};