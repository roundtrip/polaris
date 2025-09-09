# Roundtrip Release Process

After making your changes:
```sh
# Don't include the old tarball in the pack
rm shopify-polaris-v12.10.0.tgz

# These are very special tarballs apparently otherwise yarn hangs
yarn pack

# Add it back to git
git add shopify-polaris-v12.10.0.tgz

# Amend the commit so it's self contained
git commit --amend
```

