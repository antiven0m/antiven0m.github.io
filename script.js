const apiUrl = 'https://www.doomworld.com/idgames/api/api.php';

function makeRequest(action, parameters, callback) {
  const url = `${apiUrl}?action=${action}&out=json${parameters}`;
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      callback(data);
    }
  };

  xhr.open('GET', url, true);
  xhr.send();
}

function displayDirectories(directories) {
  const directoryList = document.getElementById('directory-list');
  directoryList.innerHTML = '';

  directories.forEach((directory) => {
    const listItem = document.createElement('li');
    listItem.textContent = directory.name;
    directoryList.appendChild(listItem);
  });
}

function displayFiles(files) {
  const fileList = document.getElementById('file-list');
  fileList.innerHTML = '';

  files.forEach((file) => {
    const listItem = document.createElement('li');
    listItem.textContent = file.title;
    fileList.appendChild(listItem);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  makeRequest('getdirs', '', function (data) {
    if (data && data.content && data.content.dir) {
      const directories = data.content.dir;
      displayDirectories(directories);
    }
  });

  makeRequest('getfiles', '', function (data) {
    if (data && data.content && data.content.file) {
      const files = data.content.file;
      displayFiles(files);
    }
  });
});
