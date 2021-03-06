# Forest Arborist

## Backlog

## Known Issues
* hg specific issues (low priority at moment)
 * "hg push" returns status 1 so breaks for-each
 * if "hg pull" gets nothing then no need to call "hg update"
 * not auto-detecting pinned revision (could do it by detecting not on tip)
* using colours for logging errors and commands, but clashes with some terminal colours!
* flat gitlab layout means might default to a lot of relative repos, review init behaviour if necessary.
* no warning about excess arguments passed to command (not supported by commander and work-arounds proved fragile)

## Backlog Musing
* switch and make-branch should do main before reading manifest, dependencies could change free/locked/pinned
* Test before operations on forest which break if changes in repo do not get half way?
 * http://unix.stackexchange.com/questions/155046/determine-if-git-working-directory-is-clean-from-a-script
* init --interactive, to prompt for free/locked/pinned and relative/absolute ?
* (not getting travis emails unless make address explicit, something not quite right)
 * work-around could be to use secure email in travis.tml: https://github.com/travis-ci/travis-ci/issues/3853
* cover
 * istanbul
  * istanbul cover node_modules/jasmine/bin/jasmine.js
 * https://github.com/nickmerwin/node-coveralls

## Scripts

* copy-up, copy-down: streamline develop <--> master
* test:fabonly: test the installed command (rather than the code)
* test:install: check local (global) install as a proxy for publish+install
* prepare: use the new npm 4 onwards hook! (Called before publish and after install.)
* tsc: just a convenience for people without typescript globally installed

## Patterns

Version Plan
* Use different versions on master (published) and develop (linked work in progress).
* Tag version on master to match the published version.
* Do not tag version on develop since changes.
* See copy-up and copy-down run commands.

Terminology Inspirations
* git
* Mercurial
* npm

## References

Using
* [command](https://www.npmjs.com/package/commander)
* [chalk](https://github.com/sindresorhus/chalk)

Developer
* [w3schools javascript](http://www.w3schools.com/js/default.asp)
* [node](https://nodejs.org/docs/latest/api/index.html)
* [node ES6 support](http://node.green)
* [Building command line tools with Node.js](https://developer.atlassian.com/blog/2015/11/scripting-with-node/) from Atlassian

Interesting
* [shelljs](http://documentup.com/arturadib/shelljs#command-reference)
* [async](http://caolan.github.io/async/)
* [defaults](https://www.npmjs.com/package/defaults)
* [omnipath](https://www.npmjs.com/package/omnipath) for transparent consistent handling of paths and urls

git-flow equivalent git commands
* https://gist.github.com/JamesMGreene/cdd0ac49f90c987e45ac

Other Approaches
* git submodules
* git subtree
* (google) repo
* braid
* gits (git slave)
* mr (multiple repositories)
