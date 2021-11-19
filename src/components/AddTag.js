import React, { useState } from "react";

function AddTag(props) {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTags((arr) => [...arr, tag]);
    setTag("");
    console.log(tags);
  };

  return (
    <div>
      <div className="tag-container">
        {tags.map((tag) => {
          return (
            <div className="tag-card">
              <div style={{ paddingInline: "8px" }}>{tag}</div>
            </div>
          );
        })}
        {/* {tags.map((tag) => (
          <div className="tag-card">
            <div style={{ paddingInline: "8px" }}>{tag}</div>
          </div>
        ))} */}
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
  );
}

export default AddTag;
