# Assessment 

[
    {"Gender": "Male", "HeightCm": 171, "WeightKg": 96 }, 
    {"Gender": "Male", "HeightCm": 161, "WeightKg":85 },
    { "Gender": "Male", "HeightCm": 180, "WeightKg": 77 },
    { "Gender": "Female", "HeightCm": 166,"WeightKg": 62},
    {"Gender": "Female", "HeightCm": 150, "WeightKg": 70},
    {"Gender": "Female","HeightCm": 167, "WeightKg": 82}
] as the input with weight and height
parameters of a person, we have to perform the following:
Calculate the BMI (Body Mass Index) using mass(kg)/height(m)*height(m), BMI Category and Health risk from
Table 1 of the person and add them as 3 new columns
2) Count the total number of overweight people using ranges in the column BMI Category of
Table 1, check this is consistent programmatically and add any Other observations in the
documentation
3) Create build, teststo make sure the code is working as expected and this can be added to an
automation build / test / deployment pipeline

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

## Install

    $ git clone https://github.com/tarak-no1/code-20220728-tarak-no1.git
    $ cd code-20220728-tarak-no1
    $ npm install

## Running the project

    $ npm run dev (for development)
    $ npm start (for production with test cases)

## Test cases

    $ npm run test

## Deployment process

Code will be push to github repository. And it will be automatically deployed in [heroku](https://dashboard.heroku.com/apps/code-20220728-tarak-no1)
    
## APIs Used
    $ Json File Upload API: 
        curl --location --request POST 'https://code-20220728-tarak-no1.herokuapp.com/api/v1/usage/upload' \
        --form 'userData=@"/C:/Users/APPARAO/Documents/Downloads/code-20220728-tarak-no1/sample.json"'
    Response Format:
        {
            "status": "success",
            "message": "",
            "data": true,
            "error_code": ""
        }

    $ Display User Data API
        curl --location --request GET 'https://code-20220728-tarak-no1.herokuapp.com/api/v1/usage/display?current_page=0&total_records=3'
    Response Format:
        {
            "status": "success",
            "message": "",
            "data": {
                "userData": [
                    {
                        "udId": 7,
                        "createdAt": "2022-07-31T13:08:43.353Z",
                        "updatedAt": "2022-07-31T13:08:43.353Z",
                        "gender": "Male",
                        "height": 171,
                        "weight": 96,
                        "bmi": 32.83,
                        "bmiCategory": "Moderately obese",
                        "healthRisk": "Medium risk"
                    },
                    {
                        "udId": 8,
                        "createdAt": "2022-07-31T13:08:43.353Z",
                        "updatedAt": "2022-07-31T13:08:43.353Z",
                        "gender": "Male",
                        "height": 161,
                        "weight": 85,
                        "bmi": 32.79,
                        "bmiCategory": "Moderately obese",
                        "healthRisk": "Medium risk"
                    },
                    {
                        "udId": 9,
                        "createdAt": "2022-07-31T13:08:43.353Z",
                        "updatedAt": "2022-07-31T13:08:43.353Z",
                        "gender": "Male",
                        "height": 180,
                        "weight": 77,
                        "bmi": 23.77,
                        "bmiCategory": "Normal weight",
                        "healthRisk": "Low risk"
                    }
                ],
                "totalOverWeightPeople": 1
            },
            "error_code": ""
        }

