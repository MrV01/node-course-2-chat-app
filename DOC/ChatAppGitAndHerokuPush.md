
1. Create local git repository of NodeJS application:
npm init
npm i express@4.15.4 --save
npm  i  morgan@1.8.2 --save  
git init
echo "node_modules/" >> .gitignore
echo "# node-course-2-chat-app" >> README.md

Add following to package.json ( after  "main": "index.js", )

"scripts": {
  "start": "node server/server.js"
  "test": "echo \"Error: no test specified\" && exit 1"
},
"engines" : {
  "node" : "8.1.3"
},

2. Create EMPTY GitHub repository. Name: git@github.com:MrV01/node-course-2-chat-app.git

3. Push an existing repository on the command line.

git remote add origin git@github.com:MrV01/node-course-2-chat-app.git
git push -u origin master

/////////////////////////////////////////////////////////////////
/// HEROKU
/////////////////////////////////////////////////////////////////
λ heroku create
Creating app... done, whispering-escarpment-71891
https://whispering-escarpment-71891.herokuapp.com/ | https://git.heroku.com/whispering-escarpment-71891.git
Vlad@Vlad-HPlaptop ~/Documents/PROG/HTML5/sites/completeNodeJsDeveloperCourse2/node-chat-app (master)
λ  git push heroku master
Counting objects: 18, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (12/12), done.
Writing objects: 100% (18/18), 5.31 KiB | 0 bytes/s, done.
Total 18 (delta 3), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Node.js app detected
remote: parse error: Expected separator between values at line 8, column 10
remote:  !     Unable to parse package.json
remote:
remote:
remote: -----> Build failed
remote: parse error: Expected separator between values at line 8, column 10
remote: parse error: Expected separator between values at line 8, column 10
