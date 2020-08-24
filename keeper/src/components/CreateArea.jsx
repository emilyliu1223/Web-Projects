import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [Note, newNote] = useState({
    title: "",
    content: ""
  });

  function Expanded() {
    setExpanded(true);
    return (
      <input
        onChange={handleChange}
        name="title"
        value={Note.title}
        placeholder="Title"
      />
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    newNote(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(Note);
    newNote({ title: "", content: "" });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded ? (
          <input
            onChange={handleChange}
            name="title"
            value={Note.title}
            placeholder="Title"
          />
        ) : null}

        <textarea
          onClick={Expanded}
          onChange={handleChange}
          name="content"
          value={Note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
