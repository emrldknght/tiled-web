import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Path = 'http://localhost/sq';
const Files = `${Path}/list-files`;

const fetchPath = (path) => {
  return new Promise(resolve => {
    fetch(path)
      .then(r => r.json())
      .then(j => resolve(j));
  })
}

export default function FileExplorer() {
  const [filesData, setFilesData] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);

  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    async function getFileList() {
      const md = await fetchPath(Files);
      console.log('md', md);
      setFilesData(md);
    }
    getFileList();

  }, [])

  const getFile = async item => {
    const data = await fetchPath(`${Path}/map-file/${item}`);
    console.log('fd', data);
    setCurrentFile(item);
    return data;
  }

  const toggleExpand = () => setExpanded(!expanded);

  const fileItems = filesData.map((file, i) => <div
    className={`item ${ (file === currentFile) ? 'active' : '' }`}
    key={`file_${i}`} onClick={getFile.bind(null, file)}>{file}
  </div>)

  return(
    <div className="file-explorer col">
      <div className="burger" onClick={toggleExpand}>
        <FontAwesomeIcon icon="bars" />
      </div>
      {(expanded) ? (
        <div className="col">
          <b>Map Files:</b>
          {/* Current: {currentFile} */}
          <hr/>
          <div className="col file-list">
            {fileItems}
          </div>
        </div>
      ) : (<div className="placeholder">&nbsp;</div>)
      }
    </div>
  )
}