"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StatisticManager {
    constructor(title, data) {
        this.title = title;
        this.data = data;
    }
    setData(newData) {
        this.data = newData;
    }
    getData() {
        return this.data;
    }
    calculateAvarage() {
        if (!this.avarage) {
            let avarage = this.data.reduce((acc, curr) => (acc += curr));
            avarage = avarage / (this.data.length);
            this.avarage = avarage;
        }
        return this.avarage;
    }
    calculateStandardDeviation() {
        if (!this.stdDev) {
            const avarage = this.calculateAvarage();
            let stdDev = this.data.reduce((acc, curr, i) => {
                if (i == 1) {
                    acc = (acc - avarage) * (acc - avarage);
                }
                return (acc += (curr - avarage) * (curr - avarage));
            });
            stdDev = Math.sqrt(stdDev / (this.data.length - 1));
            this.stdDev = stdDev;
        }
        return this.stdDev;
    }
    calculateconfidenceIntervalAmplitude() {
        if (!this.confidenceIntervalAmplitude) {
            const stdDev = this.calculateStandardDeviation();
            const tStudentValue = 2.021; //for n=41 (df = 40) and confidenceLevel=95%
            const quatitySqrt = Math.sqrt(this.data.length);
            const confidenceIntervalAmplitude = tStudentValue * stdDev / (quatitySqrt);
            this.confidenceIntervalAmplitude = confidenceIntervalAmplitude;
        }
        return this.confidenceIntervalAmplitude;
    }
    generateResults() {
        this.calculateconfidenceIntervalAmplitude();
        console.log('\x1b[32m%s\x1b[0m', this.title.toUpperCase());
        console.log('\x1b[33m%s\x1b[0m', "DESCRIPTIVE STATISTICS");
        console.log('Avarage: ', this.avarage);
        console.log('StdDev: ', this.stdDev);
        const minConfidenceInterval = this.avarage - this.confidenceIntervalAmplitude;
        const maxConfidenceInterval = this.avarage - this.confidenceIntervalAmplitude;
        console.log('\x1b[33m%s\x1b[0m', 'CONFINDENCE INTERVAL INFOS');
        console.log('Confidence Interval: [', minConfidenceInterval, ', ', maxConfidenceInterval, ']');
        console.log('Confidence Interval Amplitude: ', this.confidenceIntervalAmplitude);
    }
}
exports.StatisticManager = StatisticManager;
//# sourceMappingURL=statistic.js.map