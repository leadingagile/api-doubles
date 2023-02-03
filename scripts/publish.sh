#!/usr/bin/env bash

npm --dry-run version prerelease
npm --dry-run publish
