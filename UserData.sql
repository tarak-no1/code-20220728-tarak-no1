-- This script only contains the table creation statements and does not fully represent the table in database. It's still missing: indices, triggers. Do not use it as backup.

-- Squences
CREATE SEQUENCE IF NOT EXISTS "UserData_id_seq"

-- Table Definition
CREATE TABLE "public"."UserData" (
    "udId" int4 NOT NULL DEFAULT nextval('"UserData_id_seq"'::regclass),
    "createdAt" timestamptz,
    "updatedAt" timestamptz,
    "gender" text,
    "height" int4,
    "weight" int4,
    "bmi" float8,
    "bmiCategory" text,
    "healthRisk" text,
    PRIMARY KEY ("udId")
);

INSERT INTO "public"."UserData" ("udId", "createdAt", "updatedAt", "gender", "height", "weight", "bmi", "bmiCategory", "healthRisk") VALUES
(25, '2022-07-31 07:37:31.266+05:30', '2022-07-31 07:37:31.266+05:30', 'Male', 171, 96, 32.83, 'Moderately obese', 'Medium risk');
INSERT INTO "public"."UserData" ("udId", "createdAt", "updatedAt", "gender", "height", "weight", "bmi", "bmiCategory", "healthRisk") VALUES
(26, '2022-07-31 07:37:31.266+05:30', '2022-07-31 07:37:31.266+05:30', 'Male', 161, 85, 32.79, 'Moderately obese', 'Medium risk');
INSERT INTO "public"."UserData" ("udId", "createdAt", "updatedAt", "gender", "height", "weight", "bmi", "bmiCategory", "healthRisk") VALUES
(27, '2022-07-31 07:37:31.266+05:30', '2022-07-31 07:37:31.266+05:30', 'Male', 180, 77, 23.77, 'Normal weight', 'Low risk');
INSERT INTO "public"."UserData" ("udId", "createdAt", "updatedAt", "gender", "height", "weight", "bmi", "bmiCategory", "healthRisk") VALUES
(28, '2022-07-31 07:37:31.266+05:30', '2022-07-31 07:37:31.266+05:30', 'Female', 166, 62, 22.5, 'Normal weight', 'Low risk'),
(29, '2022-07-31 07:37:31.266+05:30', '2022-07-31 07:37:31.266+05:30', 'Female', 150, 70, 31.11, 'Moderately obese', 'Medium risk'),
(30, '2022-07-31 07:37:31.266+05:30', '2022-07-31 07:37:31.266+05:30', 'Female', 167, 82, 29.4, 'Overweight', 'Enhanced risk');