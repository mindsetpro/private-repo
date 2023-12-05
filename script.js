// Add a list to store file and folder information
let fileSystem = [
  { name: 'Folder 1', type: 'folder', children: [] },
  { name: 'main.py', type: 'file', content: 'This is the content of File 1.txt' },
];

function openFileManager() {
  const fileManagerDiv = document.getElementById('fileManager');
  fileManagerDiv.style.display = 'block';

  // Display the current file system
  displayFileSystem();
}

function createFolder() {
  const folderName = prompt('Enter folder name:');
  if (folderName) {
    const newFolder = { name: folderName, type: 'folder', children: [] };
    fileSystem.push(newFolder);
    displayFileSystem();
  }
}

function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  fileInput.click();
}

function handleFileUpload() {
  const fileInput = document.getElementById('fileInput');
  const files = fileInput.files;

  for (const file of files) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const newFile = { name: file.name, type: 'file', content: e.target.result };
      fileSystem.push(newFile);
      displayFileSystem();
    };
    reader.readAsText(file);
  }

  // Reset file input to allow uploading the same file again
  fileInput.value = '';
}

function deleteItem(index) {
  fileSystem.splice(index, 1);
  displayFileSystem();
}

function displayFileSystem() {
  const fileList = document.getElementById('fileList');
  fileList.innerHTML = '';

  for (let i = 0; i < fileSystem.length; i++) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${fileSystem[i].type === 'folder' ? '📁' : '📄'} ${fileSystem[i].name}
      <button onclick="deleteItem(${i})">Delete</button>
    `;

    if (fileSystem[i].type === 'folder') {
      listItem.addEventListener('click', () => openFolder(i));
    }

    fileList.appendChild(listItem);
  }
}

function openFolder(index) {
  const folder = fileSystem[index];
  if (folder.type !== 'folder') {
    alert(`${folder.name} is not a folder.`);
    return;
  }

  const folderContent = folder.children;
  if (folderContent.length === 0) {
    alert(`${folder.name} is empty.`);
  } else {
    let contentText = `Contents of Folder ${folder.name}:\n\n`;
    for (const item of folderContent) {
      contentText += `${item.type === 'folder' ? '📁' : '📄'} ${item.name}\n`;
    }
    alert(contentText);
  }
}

function editBotStatus() {
  const botId = prompt('Enter Bot ID:');
  if (!botId) {
    alert('Bot ID is required.');
    return;
  }

  const statusOptions = ['playing', 'streaming', 'listening', 'watching'];
  const selectedStatus = prompt('Select Status: ' + statusOptions.join(', '));

  if (!statusOptions.includes(selectedStatus)) {
    alert('Invalid status option.');
    return;
  }

  let statusText;
  if (selectedStatus === 'streaming') {
    const twitchUrl = prompt('Enter Twitch URL:');
    statusText = `https://twitch.tv/${twitchUrl}`;
  } else {
    statusText = prompt(`Enter ${selectedStatus} status text:`);
  }

  // Simulate updating the bot's status
  alert(`Setting status for Bot ID ${botId}: ${selectedStatus} - ${statusText}`);
}
