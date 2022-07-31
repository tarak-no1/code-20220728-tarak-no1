const isError = function(e) {
	return (
		e &&
		e.stack &&
		e.message &&
		typeof e.stack === "string" &&
		typeof e.message === "string"
	);
};

const getResponseObject = ()=> ({
		status: "success",
		message: "",
		data: null,
		error_code: ""
	});

const getBMI = (weight, height) => {
	const heightInMeters = height/100;
	return Math.round(weight/(heightInMeters*heightInMeters)*100)/100;
};

const getBMICategory = (bmi) => {
	let bmiCategory = 'Underweight';
	if(bmi >= 40) {
		bmiCategory = 'Very severely obese';
	}
	else if(bmi >= 35 && bmi <= 39.9) {
		bmiCategory = 'Severel obese';
	}
	else if(bmi >= 30 && bmi <= 34.9) {
		bmiCategory = 'Moderately obese';
	}
	else if(bmi >= 25 && bmi <= 29.9) {
		bmiCategory = 'Overweight';
	}
	else if(bmi >= 18.5 && bmi <= 24.9) {
		bmiCategory = 'Normal weight';
	}
	else {
		bmiCategory = 'Underweight'
	}
	return bmiCategory;
};

const getHealthRisk = (bmi) => {
	let healthRisk = 'Malnutrition risk';
	if(bmi >= 40) {
		healthRisk = 'Very high risk';
	}
	else if(bmi >= 35 && bmi <= 39.9) {
		healthRisk = 'High risk';
	}
	else if(bmi >= 30 && bmi <= 34.9) {
		healthRisk = 'Medium risk';
	}
	else if(bmi >= 25 && bmi <= 29.9) {
		healthRisk = 'Enhanced risk';
	}
	else if(bmi >= 18.5 && bmi <= 24.9) {
		healthRisk = 'Low risk';
	}
	else {
		healthRisk = 'Malnutrition risk'
	}
	return healthRisk;
};

const transformData = (data) => {
    const height = data.HeightCm;
    const weight = data.WeightKg;
    const bmi = getBMI(weight, height);
    const transformatedData = {
        gender: data.Gender,
        height,
        weight,
        bmi,
        bmiCategory: getBMICategory(bmi),
        healthRisk: getHealthRisk(bmi)
    };
    return transformatedData;
};

module.exports = {
	isError,
    getResponseObject,
	getBMI, getBMICategory, getHealthRisk,
	transformData
};
