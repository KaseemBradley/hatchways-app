import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { STUDENT_URL } from "./index";
import Student from "./components/Student";

function App() {
  const [studentData, setStudentData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState("");

  //fetching student data from API
  const getStudents = () => {
    axios
      .get(STUDENT_URL)
      .then((res) => {
        setStudentData(
          res.data.students.map((student) => ({ ...student, tags: [] }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // adding tag to studentData Object
  const addTag = (tag, studentId) => {
    const studentTags = studentData.map((student) => {
      if (student.id === studentId) {
        return { ...student, tags: [...student.tags, tag] };
      }
      return student;
    });

    setStudentData(studentTags);
  };

  // Filtering based on name and tag being searched
  const getStudentsFilteredBySearchTerm = () => {
    if (studentData.length === 0) {
      return [];
    }

    return studentData.filter(({ firstName, lastName, tags }) => {
      const lowerCaseSearchTerm = searchName.toLowerCase();
      const lowerCaseTag = searchTag.toLowerCase();
      const nameMatches =
        firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
        lastName.toLowerCase().includes(lowerCaseSearchTerm);
      let tagMatches = false;
      tags.forEach((tag) => {
        if (tag.toLowerCase().includes(lowerCaseTag)) {
          tagMatches = true;
        }
      });
      if (lowerCaseSearchTerm && searchTag) {
        return nameMatches && tagMatches;
      } else if (lowerCaseSearchTerm && !searchTag) {
        return nameMatches;
      } else if (searchTag && !lowerCaseSearchTerm) {
        return tagMatches;
      }

      return true;
    });
  };

  useEffect(getStudents, []);

  return (
    <div className="main-container">
      <input
        name="searchByName"
        type="text"
        placeholder="Search by name"
        onChange={(event) => {
          setSearchName(event.target.value);
        }}
      ></input>
      <input
        name="searchByTag"
        type="text"
        placeholder="Search by tag"
        onChange={(event) => {
          setSearchTag(event.target.value);
        }}
      ></input>
      <div className="students">
        {getStudentsFilteredBySearchTerm().map((student) => {
          return (
            <Student key={student.id} studentData={student} addTag={addTag} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
