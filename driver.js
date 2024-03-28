"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var scrapper_functions_1 = require("./scrapper.functions");
var fs = require("fs");
var jsdom_1 = require("jsdom");
var captureProfile = function (url_sting, document) {
    var profileDetails = (0, scrapper_functions_1.getProfileDetailsFromMainScreen)(url_sting, document);
    var experiences = (0, scrapper_functions_1.collectExperienceFromMainProfileScreen)(document);
    var skills = (0, scrapper_functions_1.getSkillsInMainScreen)(document);
    var currentProfile = __assign(__assign({}, profileDetails), { experiences: experiences, skills: skills });
    return currentProfile;
};
// loop to a directory for page_sources for each profile
function listFilesInDirectory(directoryPath) {
    // Use fs.readdir to get the list of files in the directory
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        // Log the list of files to the console
        console.log('Files in directory:');
        var profiles_list = [];
        files.forEach(function (file) {
            var _a, _b, _c, _d;
            var fileName = file.split('.')[0];
            var url = "https://www.linkedin.com/in/".concat(fileName);
            console.log(directoryPath + file);
            var data = fs.readFileSync(directoryPath + file, 'utf-8');
            var dom = new jsdom_1.JSDOM(data);
            var document = dom.window.document;
            console.log((_d = (_c = (_b = (_a = document.querySelector("#ember30")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.replace(/\n/g, '')) === null || _c === void 0 ? void 0 : _c.replace(/\s+/g, ' ')) === null || _d === void 0 ? void 0 : _d.trim());
            var currentProfile = captureProfile(url, document);
            dom.window.close();
            profiles_list.push(currentProfile);
        });
        // console.log(profiles_list);
        // push to .json 
        fs.writeFile(directoryPath + "profiles.json", JSON.stringify(profiles_list, null, 2), function (err) {
            if (err) {
                console.error('Error writing to file:', err);
            }
            else {
                console.log('Content has been written to', directoryPath + "profiles.json");
            }
        });
    });
}
// Example usage: List files in the current directory (.)
listFilesInDirectory('sources/');
