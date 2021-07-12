import React, {useEffect, useState} from "react";
import {Callout, Drawer, Icon, Intent, Position} from "@blueprintjs/core";
import {fetchFileList, fetchPath, Path} from "./lib/api";
import {ApiError, isApiError} from "./types";

export default function FileExplorer() {
  const [filesData, setFilesData] = useState<string[]>([]);
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState('Error! Error!');

  useEffect(() => {
    console.log('render files');

    async function getFileList() {
      const md: string[] | ApiError = await fetchFileList();
      if(isApiError(md)) {
        setError(md.error)
      } else {
        setFilesData(md);
      }
    }
    getFileList();

  }, [])

  const getFile = async (item: string) => {
    console.log('will get');
    const data = await fetchPath(`${Path}/map-file/${item}`);
    console.log('fd', data);
    setCurrentFile(item);
    return data;
  }

  const toggleExpand = () => setExpanded(!expanded);

  const fileItem = (file: string, i: number) => <div
    className={`item ${ (file === currentFile) ? 'active' : '' }`}
    key={`file_${i}`} onClick={getFile.bind(null, file)}>{file}
  </div>

  const fileItems = filesData.map((file, i) => fileItem(file, i))

  return(
    <div className="file-explorer col">

      <Drawer isOpen={expanded} position={Position.LEFT}
        title="Map Files"
        icon="git-repo"
        onClose={toggleExpand}
        size="15em"
      >
        <Callout title="Error" intent={Intent.DANGER} icon="map">
          {error}
        </Callout>
        <div className="col">
          Current: {currentFile}
          <hr/>
          <div className="col file-list">
            {fileItems}
            {fileItem('map3', 7)}
          </div>
        </div>
      </Drawer>

      <div className="burger" onClick={toggleExpand}>
        <Icon icon="menu" />
      </div>
    </div>
  )
}