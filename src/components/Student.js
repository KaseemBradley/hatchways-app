import React, { useState } from "react";
import GradeList from "./GradeList";

const Student = ({ studentData, addTag }) => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  let grades = []; // array to store grades converted to ints
  let tests = []; // number of tests

  let gradesLength = studentData.grades.length;

  // convert each string to int
  for (let i = 0; i < gradesLength; i++) {
    grades.push(parseInt(studentData.grades[i]));
    tests.push(i + 1);
  }

  // calculate average of grades
  const getAverageGrade = (array) =>
    array.reduce((a, b) => a + b) / grades.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTag("");
    addTag(tag, studentData.id);
    studentData.tags = tags;
  };

  return (
    <div>
      <img src={studentData.pic} alt="student pic" className="student-img" />
      <h1 className="student-name">
        {studentData.firstName} {studentData.lastName}
      </h1>
      <div className="student-info">
        <p>Email: {studentData.email}</p>
        <p>Company: {studentData.company}</p>
        <p>Skill: {studentData.skill}</p>
        <p>Average: {getAverageGrade(grades)}%</p>
        <GradeList>
          <div className="all-grades">
            <div className="tests">
              {tests.map((test) => {
                return (
                  <div>
                    <p>Test {test}:</p>
                  </div>
                );
              })}
            </div>
            <div>
              {grades.map((grade) => {
                return (
                  <div>
                    <p>{grade}%</p>
                  </div>
                );
              })}
            </div>
          </div>
        </GradeList>
        <div className="add-tag-container">
          {/* add tag to student */}
          <div>
            <div className="tag-container">
              {studentData.tags.map((tag) => {
                return (
                  <div className="tag-card">
                    <div style={{ paddingInline: "8px" }}>{tag}</div>
                  </div>
                );
              })}
            </div>
            <form onSubmit={handleSubmit}>
              <input
                className="add-tag"
                type="text"
                placeholder="Add a tag"
                value={tag}
                onChange={(e) => {
                  setTag(e.target.value);
                }}
              ></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
