#!/bin/bash
git checkout master
git branch -D gh-pages
git checkout -b gh-pages
git filter-branch -f --subdirectory-filter public/ --prune-empty HEAD
git push -f origin gh-pages
git checkout master
