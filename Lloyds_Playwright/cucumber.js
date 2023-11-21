let options = [
    '--require-module ts-node/register',
    '--require ./steps/*.steps.ts',
    '--format progress',
].join(' ');

let run_features = [
    './features/*.feature',
    options,
    // trace: 'on-first-retry',
    // permissions: ['geolocation'],
    // geolocation: { latitude: 10.995794, longitude: 76.960693 },
    
].join(' ');

module.exports = {
    test_runner: run_features,
    require: [
        "steps/*.steps.ts"
    ],
    format: [
        "progress-bar",
        "html:test-results/cucumber-report.html",
        "json:test-results/cucumber-report.json",
        "rerun:@rerun.txt"
    ],
    use: {  
        viewport: {width: 1366, height: 688},
        trace: 'on-first-retry',
        permissions: ['geolocation'],
        geolocation: { latitude: 10.995794, longitude: 76.960693 },
        video: 'on',
      },
    reporter: [['html', { outputFolder: "test/report" }]],
};