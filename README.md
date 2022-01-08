# Group 42 Git Workspace #
This is a git repository for the final app development.<hr>
### Basic Git Commands ###
#### Clone the master ####
git clone https://kanglee8614@bitbucket.org/cm2020-agil-g4g0-ejs/cm2020-agil-g4g0-ejs.git<hr>
#### Check the status of local repo ####
git status<hr>
#### Pull the updated master ####
git checkout master<br>
git pull<hr>
#### Create a local branch ####
git checkout master
git checkout -b branch-name<hr>
#### Add files to stage ####
git add target_file_name<hr>
#### Commit staged change ####
git commit -m "Description on the change."<hr>
#### Push the commit from local to remote ####
git push -u origin branch-name<hr>
#### Creating a pull request ####
Manually select your pushed local branch and target remote branch (usually master) in the left hand side menu called "Pull requests"<hr>
#### Merge the branch to master ####
Once all reviewers approves the pull request, you can merge the branch to origin/master by clicking the "merge" button in your branch<hr>
#### Reset to specific commit ####
git reset --hard commit_hash<hr>
