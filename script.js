const appDiv = document.getElementById('app');

const FILE_TYPE = {
  FOLDER: 'folder',
  FILE: 'file',
};

const FILES = {
  0: {
    id: 0,
    name: 'Root',
    type: FILE_TYPE.FOLDER,
    parentId: null,
    child: [1, 2],
  },
  1: {
    id: 1,
    name: 'First',
    type: FILE_TYPE.FOLDER,
    parentId: 0,
    child: [3, 4],
  },
  2: {
    id: 2,
    name: 'Second',
    type: FILE_TYPE.FOLDER,
    parentId: 0,
    child: [],
  },
  3: {
    id: 3,
    name: 'Third',
    type: FILE_TYPE.FILE,
    parentId: 1,
    child: [],
  },
  4: {
    id: 4,
    name: 'Four',
    type: FILE_TYPE.FILE,
    parentId: 1,
    child: [],
  },
};

const createFile = (parentId, type, name) => {
  const data = {
    id: Date.now(),
    name,
    type,
    parentId: +parentId,
    child: [],
  };

  FILES[data.id] = data;
  FILES[parentId].child.push(data.id);
  console.log(FILES);
  render();
};

const onCreateClick = (parentId, type) => {
  //@ts-ignore
  const input = document.getElementById('file-name')?.value;
  createFile(parentId, type, input);
};

const generateInputHtml = (parentId, type) => {
  return `
    <div class=create-input>
      <input id=file-name type=text>
      <button class=create-btn onclick="onCreateClick('${parentId}', '${type}')">Create</button>
    </div>
  `;
};

const onFolderClick = (id) => {
  const createFileDiv = document.getElementById(`file-create-${id}`);
  if (createFileDiv) {
    const inputEl = generateInputHtml(id, FILE_TYPE.FOLDER);
    createFileDiv.innerHTML += inputEl;
  }
};

const onFileClick = (id) => {
  const createFileDiv = document.getElementById(`file-create-${id}`);
  if (createFileDiv) {
    const inputEl = generateInputHtml(id, FILE_TYPE.FILE);
    createFileDiv.innerHTML += inputEl;
  }
};

const generateFileHtml = (data) => {
  return `
    <li id="file-create-${data.id}">
      <div class="file-container ${data.type}" >
        <p class=file-name>${data.name}</p>
        ${
          data.type === FILE_TYPE.FOLDER
            ? `
          <div>
            <button onclick=onFolderClick(${data.id})>+ folder</button>
            <button onclick=onFileClick(${data.id})>+ file</button>
          </div>
          `
            : ''
        }
        
      </div>
    </li>
  `;
};

const generateFileStructure = (rootId) => {
  const rootData = FILES[rootId];
  let html = '';

  html += generateFileHtml(rootData);

  if (rootData.child.length > 0) {
    const childData = FILES[rootId].child;

    childData.forEach((el) => {
      html += `<ul>
          ${generateFileStructure(el)}
        </ul>`;
    });
  }

  return html;
};

const render = () => {
  let html = `
    <ul>
    ${generateFileStructure(0)}
    </ul>
  `;

  if (appDiv) {
    appDiv.innerHTML = html;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  render();
});
