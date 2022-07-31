const { 
    getBMI,
    getBMICategory,
    getHealthRisk
} = require("../utils/supporter");

describe("BMI calculator", () => {
    test('bmi matching check', (done) => {
        const weight = 77;
        const height = 180;
        expect(getBMI(weight, height)).toStrictEqual(23.77);
        done();
    });
    test('bmi not matching check', (done) => {
        const weight = 77;
        const height = 180;
        expect(getBMI(weight, height)).not.toStrictEqual(24.77);
        done();
    });
    test('BMI category matching check', (done) => {
        const weight = 77;
        const height = 180;
        const bmi = getBMI(weight, height);
        expect(getBMICategory(bmi)).toStrictEqual('Normal weight');
        done();
    });
    test('BMI category not matching check', (done) => {
        const weight = 77;
        const height = 180;
        const bmi = getBMI(weight, height);

        expect(getBMICategory(bmi)).not.toStrictEqual('Overweight');
        done();
    });
    test('Health Risk matching check', (done) => {
        const weight = 77;
        const height = 180;
        const bmi = getBMI(weight, height);
        expect(getHealthRisk(bmi)).toStrictEqual('Low risk');
        done();
    });
    test('Health Risk not matching check', (done) => {
        const weight = 77;
        const height = 180;
        const bmi = getBMI(weight, height);

        expect(getHealthRisk(bmi)).not.toStrictEqual('High risk');
        done();
    });
});