import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Drawer, Icon, Position} from "@blueprintjs/core";

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

  const [expanded, setExpanded] = useState(false);

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

      <Drawer isOpen={expanded} position={Position.LEFT}
        title="Map Files"
        icon="git-repo"
        onClose={toggleExpand}
        size="15em"
      >
        <div className="col">
          Current: {currentFile}
          <hr/>
          <div className="col file-list">
            {fileItems}
          </div>
        </div>
      </Drawer>

      <div className="burger" onClick={toggleExpand}>
        <Icon icon="menu" />
      </div>
    </div>
  )
}