# roundtrip fork of polaris-react

Used to maintain additional bug fixes that have yet to be merged.

Since the repository contains many subprojects and (to our knowledge!) `package.json` can't
reference a subproject, we need to build and prepare an npm package to reference in our
main repository.

Instructions on managing the fork and preparing the build:

```sh
# 1) Fetch upstream and rebase our roundtrip branch onto the target version,
# changing N to the number of commits we have on our branch.
#
# It's possible that if upstream has merged our pull requests we can safely
# drop commits.
git fetch --all
git checkout roundtrip
git rebase --onto @shopify/polaris@x.y.z roundtrip~N roundtrip
git push --force

# 2) Create a new tag using the same version number as the tag and include
# -roundtrip.N suffix. Increment N if this is a new release based off the
# same version.
git tag vx.y.z-roundtrip.0
git push --tags

# 3) Ensure a clean install and build everything.
rm -rf node_modules
pnpm install && pnpm build

# 4) Prepare an npm package.
#
# This should create a file named shopify-polaris-x.y.z.tgz
cd polaris-react
pnpm pack
```

Create a [new GitHub release](https://github.com/roundtrip/polaris/tags) for the
tag created above in step (2) and include the npm pack created in step (4).

Update `package.json` in our main repository to reference the release tarball.
