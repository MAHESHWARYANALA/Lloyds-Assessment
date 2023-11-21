var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: 'test/report/cucumber_report.json',
        output: 'test/report/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        screenshotsDirectory: 'screenshots/',
        storeScreenshots: false,
        // metadata: {
        //     "App Version":"0.3.2",
        //     "Test Environment": "PROD",
        //     "Browser": "Chrome",
        //     "Platform": "Windows 10",
        //     "Parallel": "Scenarios",
        //     "Executed": "Remote"
        // },
        failedSummaryReport: true,
    };

    reporter.generate(options);