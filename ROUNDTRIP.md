# roundtrip fork of polaris-react

Since upstream is now archived and we're on the latest release v13.9.5,
we're now maintaining our own fork that contains fixes and improvements.

Instructions on managing the fork and preparing the build:

```sh
# 1) Ensure we're on our roundtrip branch.
git checkout roundtrip

# 2) Commit fixes to the branch.
git commit

# 3) Create a new tag using v13.9.5-roundtrip.N as the tag format,
# incrementing N by one.
git tag v13.9.5-roundtrip.N

# 4) Push both the commits and the tags.
git push
git push --tags

# 5) Ensure a clean install and build everything.
rm -rf node_modules
pnpm install && pnpm build

# 6) Prepare an npm package.
#
# This should create a file named shopify-polaris-v13.9.5.tgz
cd polaris-react
pnpm pack
```

Create a [new GitHub release](https://github.com/roundtrip/polaris/tags) for the
tag created above in step (3) and include the npm pack created in step (6).

Update `package.json` in our main repository to reference the release tarball.
