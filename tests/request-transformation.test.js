const {
    transformData
} = require("../utils/supporter");

describe("Request JSON Data Transform Check", () => {
    test('matching check', (done) => {
        const requestJSONFormat = {
            Gender: 'Male',
            HeightCm: 180,
            WeightKg: 77
        };
        expect(transformData(requestJSONFormat)).toStrictEqual({
            gender: 'Male',
            height: 180,
            weight: 77,
            bmi: 23.77,
            bmiCategory: 'Normal weight',
            healthRisk: 'Low risk'
        });
        done();
    });

    test('not matching check', (done) => {
        const requestJSONFormat = {
            Gender: 'Male',
            HeightCm: 160,
            WeightKg: 77
        };
        expect(transformData(requestJSONFormat)).not.toStrictEqual({
            gender: 'Male',
            height: 180,
            weight: 77,
            bmi: 23.77,
            bmiCategory: 'Normal weight',
            healthRisk: 'Low risk'
        });
        done();
    });
});