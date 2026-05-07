type FolderOrFile = 'folder' | 'file';

export type FileNodeType = {
   type: FolderOrFile;
   children?: Record<string, FileNodeType>;
};

export type FileSystemType = Record<string, FileNodeType>;

// export type FileTree = {
//    root: FileSystemType;
// };