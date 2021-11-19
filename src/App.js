import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { STUDENT_URL } from "./index";
import Student from "./components/Student";

// student.tags.includes(searchedTag)
// {tag: 'tag1', id: '3'}
// students.map(student => {
//   if (id == passed in id) {
//     {...student, tags: [...student.tags, newTag]}
//     add tags to this student
//   }
//   return student
// })
// setStudentData()
// add tag to arr of tags
// map over students, find correct student, add tags arr to student obj
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

  const addTag = (tag, studentId) => {
    const s = studentData.map((student) => {
      if (student.id === studentId) {
        console.log("match");
        return { ...student, tags: [...student.tags, tag] };
      }
      return student;
    });
    for (let i = 0; i < s.length; i++) {
      console.log(s[i].tags);
    }
    setStudentData(s);
  };

  const getStudentsFilteredBySearchTerm = () => {
    if (studentData.length === 0) {
      return [];
    }

    return studentData.filter(({ firstName, lastName, tags }) => {
      const lowerCaseSearchTerm = searchName.toLowerCase();
      const nameMatches =
        firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
        lastName.toLowerCase().includes(lowerCaseSearchTerm);
      let tagMatches = false;
      tags.forEach((tag) => {
        if (tag.includes(searchTag)) {
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
