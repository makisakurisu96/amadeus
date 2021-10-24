var allsessionID = require('./allsessionID_krishnaji.json')
const fs = require("fs");
var path = 'cfs/data/'
var files = fs.readdirSync(path);
let precheck_trans = {}
let commit_dryrun_trans = {}
let commit_trans = {}
let reccon_trans = {}
let json_name = ["precheck_trans", "commit_dryrun_trans", "commit_trans", "reccon_trans"]

files.forEach(function (f) {
    if (!f.includes(".gz")) {
        const LineByLineReader = require('line-by-line'),
            lr = new LineByLineReader(`${path}${f}`);
        // lr = new LineByLineReader('demo_ver_audit.log');

        lr.on('error', function (err) {
            // 'err' contains error object
            console.log(err)
        });

        lr.on('line', function (line) {
            // pause emitting of lines...
            lr.pause();
            // ...do your asynchronous line processing..
            if (line.includes(":service-operations/pre-check'")) {
                sessionID = line.split(' ')[6].split('/')[1]
                if (allsessionID.hasOwnProperty(sessionID) && allsessionID[sessionID].length == 2) {
                    start_timestamp = allsessionID[sessionID][0].split(' ')[1].replace('::', ' ')
                    end_timestamp = allsessionID[sessionID][1].split(' ')[1].replace('::', ' ')
                    t1 = new Date(Date.parse(start_timestamp))
                    t2 = new Date(Date.parse(end_timestamp))
                    precheck_trans[sessionID] = [line, start_timestamp, end_timestamp, t1.getTime(), t2.getTime()]
                }
                else if (allsessionID[sessionID].length > 2) {
                    console.log(`sessionID encountered multiple times for multiple operations ${sessionID}`)
                }
            }
            else if (line.includes("'/ncs:services/commit-dry-run'")) {
                sessionID = line.split(' ')[6].split('/')[1]
                if (allsessionID.hasOwnProperty(sessionID) && allsessionID[sessionID].length == 2) {
                    start_timestamp = allsessionID[sessionID][0].split(' ')[1].replace('::', ' ')
                    end_timestamp = allsessionID[sessionID][1].split(' ')[1].replace('::', ' ')
                    t1 = new Date(Date.parse(start_timestamp))
                    t2 = new Date(Date.parse(end_timestamp))
                    commit_dryrun_trans[sessionID] = [line, start_timestamp, end_timestamp, t1.getTime(), t2.getTime()]
                }
                else if (allsessionID[sessionID].length > 2) {
                    console.log(`sessionID encountered multiple times for multiple operations ${sessionID}`)
                }
            }
            else if (line.includes("JSON-RPC: 'validate_commit' with JSON")) {
                sessionID = line.split(' ')[6].split('/')[1]
                if (allsessionID.hasOwnProperty(sessionID) && allsessionID[sessionID].length == 2) {
                    start_timestamp = allsessionID[sessionID][0].split(' ')[1].replace('::', ' ')
                    end_timestamp = allsessionID[sessionID][1].split(' ')[1].replace('::', ' ')
                    t1 = new Date(Date.parse(start_timestamp))
                    t2 = new Date(Date.parse(end_timestamp))
                    commit_trans[sessionID] = [line, start_timestamp, end_timestamp, t1.getTime(), t2.getTime()]
                }
                else if (allsessionID[sessionID].length > 2) {
                    console.log(`sessionID encountered multiple times for multiple operations ${sessionID}`)
                }
            }
            else if (line.includes("-reconciliation'") && line.includes("WebUI action")) {
                sessionID = line.split(' ')[6].split('/')[1]
                if (allsessionID.hasOwnProperty(sessionID) && allsessionID[sessionID].length == 2) {
                    start_timestamp = allsessionID[sessionID][0].split(' ')[1].replace('::', ' ')
                    end_timestamp = allsessionID[sessionID][1].split(' ')[1].replace('::', ' ')
                    t1 = new Date(Date.parse(start_timestamp))
                    t2 = new Date(Date.parse(end_timestamp))
                    reccon_trans[sessionID] = [line, start_timestamp, end_timestamp, t1.getTime(), t2.getTime()]
                }
                else if (allsessionID[sessionID].length > 2) {
                    console.log(`sessionID encountered multiple times for multiple operations ${sessionID}`)
                }
            }

            // setTimeout(function () {
            //     // ...and continue emitting lines.
            lr.resume();
            // }, 1);
        });

        lr.on('end', function () {
            // All lines are read, file is closed now.
            console.log(`Number of precheck_trans: ${Object.keys(precheck_trans).length}`)
            console.log(`Number of commit_dryrun_trans: ${Object.keys(commit_dryrun_trans).length}`)
            console.log(`Number of commit_trans: ${Object.keys(commit_trans).length}`)
            console.log(`Number of reccon_trans: ${Object.keys(reccon_trans).length}`)
        });
    }
});

setTimeout(function () {
    console.log("now writing(make sure I am last)")
    fs.writeFile(`${json_name[0]}.json`, JSON.stringify(precheck_trans), err => {

        // Checking for errors
        if (err) throw err;
    });
    fs.writeFile(`${json_name[1]}.json`, JSON.stringify(commit_dryrun_trans), err => {

        // Checking for errors
        if (err) throw err;
    });
    fs.writeFile(`${json_name[2]}.json`, JSON.stringify(commit_trans), err => {

        // Checking for errors
        if (err) throw err;
    });
    fs.writeFile(`${json_name[3]}.json`, JSON.stringify(reccon_trans), err => {

        // Checking for errors
        if (err) throw err;
    });

}, 10000);