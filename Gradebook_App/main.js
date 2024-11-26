function getAverage(scores) {
    let sum_of_all_scores = 0;
    let average = 0;

    for (let i = 0; i < scores.length; i++) {
        sum_of_all_scores += scores[i]
    }

    average = sum_of_all_scores / scores.length;

    return average;
}

function getGrade(score) {
    let grade = " ";

    if (score === 100) {
        grade = "A++";
    }
    else if (score >= 90){
        grade = "A";
    }
    else if (score >= 80){
        grade = "B";
    }
    else if (score >= 70){
        grade = "C";
    }
    else if (score >= 60){
        grade = "D";
    }
    else {
        grade = "F";
    }

    return grade;
}

function hasPassingGrade(score) {

    let passingGrade = " ";
    passingGrade = getGrade(score)

    if (passingGrade === 'F'){
        return false;  
    }
    else {
        return true;
    }
}

function studentMsg(totalScores, studentScore) {

    let classAverage = getAverage(totalScores);
    let studentGrade = getGrade(studentScore);

    if (studentGrade === 'F') {
        return "Class average: " + classAverage + "." + "Your grade: " + studentGrade + ". You failed the course.";
    }
    else {
        return "Class average: " + classAverage + ". " + "Your grade: " + studentGrade + ". You passed the course.";
    }

}

console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));
console.log('\n');

console.log(getGrade(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89])));
console.log(getGrade(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95])));
console.log('\n');

console.log(hasPassingGrade(100));
console.log(hasPassingGrade(53));
console.log(hasPassingGrade(87));
console.log('\n');

console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
