import TreeNode from "./TreeNode";
import { FileSystemType, FileNodeType } from "../types/fileSystemTypes";

type Props = {
    data: FileSystemType | FileNodeType;
    currentPath?: string[];
};

const FileTree = ({ data, currentPath = [] }: Props) => {
    return (
        <div className="space-y-1">
            {Object.entries(data).map(([name, node]) => (
                <TreeNode key={name} name={name} node={node} currentPath={currentPath} />
            ))}
        </div>
    );
};

export default FileTree;