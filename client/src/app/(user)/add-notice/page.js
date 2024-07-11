'use client'
import React, { useCallback, useState, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";

export default function App() {
  const [content, setContent] = useState("");
  const [logs, setLogs] = useState([]);
  const appendLog = useCallback(
    (message) => {
      console.log("logs = ", logs);
      const newLogs = [...logs, message];
      setLogs(newLogs);
    },
    [logs, setLogs]
  );

  const config = useMemo(
    () => ({
      readonly: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    []
  );

  const onChange = useCallback(
    (newContent) => {
      appendLog(`onChange triggered with ${newContent}`);
    },
    [appendLog]
  );

  useEffect(() => {
    console.log("onChange = ", onChange);
  }, [onChange]);

  const onBlur = useCallback(
    (newContent) => {
      appendLog(`onBlur triggered with ${newContent}`);
      setContent(newContent);
    },
    [appendLog, setContent]
  );


  const handleSubmitNotice = async()=>{
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}notice`,{"content":content})
  }

  return (
    <div>
      <JoditEditor
        value={content}
        config={config}
        tabIndex={1}
        onBlur={onBlur}
        onChange={onChange}
      />
    {JSON.stringify(content)}
      <button onClick={() => handleSubmitNotice()}>Add</button>
    </div>
  );
}
