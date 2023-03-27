const WorkingDirectory = require("../models/working-directory");
const GitCommand = require("../models/git-command");

const chai = require('chai');
const expect = chai.expect;


describe("Testing GitCommand.status()", function(){

    it('Should return information if has 2 changes in directory', function(){
        let wd = new WorkingDirectory();
        wd.addFile("index.html", "views", "<html>Hello</html>");
        wd.addFile("index.js", "assets/scripts", "alert('Hi!')");

        //add two

        let git = new GitCommand(wd);
        let output = git.status();

        expect(output).to.equal('You have 2 change/s.\nviews/index.html\nassets/scripts/index.js');
    });

    it('Should return information if no changes in directory', function(){
        let wd = new WorkingDirectory();
        let git = new GitCommand(wd);
        let output = git.status();

        expect(output).to.equal('You have 0 change/s.\n');
    });

    it('Should return information if has any number of changes in directory', function(){
        let wd = new WorkingDirectory();
        wd.addFile("index.html", "views", "<html>Hello</html>");
        wd.addFile("index.js", "assets/scripts", "alert('Hi!')");
        wd.addFile("index2.html", "views", "<html>Hello index 2</html>");
        wd.addFile("index2.js", "assets/scripts", "alert('Hi! from index 2')");

        //add more than two

        let git = new GitCommand(wd);
        let output = git.status();

        expect(output).to.equal('You have 4 change/s.\nviews/index.html\nassets/scripts/index.js\nviews/index2.html\nassets/scripts/index2.js');
    });
})
