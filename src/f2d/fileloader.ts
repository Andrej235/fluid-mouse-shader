// Loads arbitrary number of files in a batch and gives a callback when every

// file has been loaded with its response text.

// Construct a file loader with a suffix path that is prepended to all
// names.

type File = {
  name: string;
  url: string;
  text?: string;
};

export default class FileLoader {
  folderPath: string;
  names: string[];
  queue: File[];

  constructor(folderPath: string, names: string[]) {
    this.folderPath = folderPath;
    this.names = names;
    this.queue = [];

    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      var url = folderPath + "/" + name;

      var file: File = {
        name: name,
        url: url,
      };
      this.queue.push(file);
    }
  }

  // Load all files currently in the queue, calls onDone when all files
  // has been downloaded.

  run(onDone: (files: Record<string, string>) => void) {
    var files: Record<string, string> = {};
    var filesRemaining = this.queue.length;

    var fileLoaded = function (file: File) {
      if (file.text === undefined) return;

      files[file.name] = file.text;
      filesRemaining--;

      if (filesRemaining === 0) onDone(files);
    };

    var loadFile = function (file: File) {
      var request = new XMLHttpRequest();
      request.onload = function () {
        if (request.status === 200) file.text = request.responseText;

        fileLoaded(file);
      };
      request.open("GET", file.url, true);
      request.send();
    };

    for (var i = 0; i < this.queue.length; i++) {
      loadFile(this.queue[i]);
    }
    this.queue = [];
  }
}
