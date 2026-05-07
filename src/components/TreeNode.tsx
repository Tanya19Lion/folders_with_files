"use client";   

import { useState } from "react";
import { File, Folder, FolderOpen } from "lucide-react";
import Link from "next/link";
import { FileNodeType } from "../types/fileSystemTypes";
import { toSlug } from "@/utils/toSlug";
import FileTree from "./FileTree";

type TreeNodeProps = {
    name: string;
    node: FileNodeType;
    currentPath: string[];
};

const TreeNode = ({ name, node, currentPath }: TreeNodeProps) => {
    const [open, setOpen] = useState(false);

    const path = [...currentPath, toSlug(name)];

    if (node.type === "file") {
        return (
            <div className="flex items-center gap-2 pl-4 text-gray-500">
                <File size={16} />
                <span>{name}</span>
            </div>
        );
    }

    return (
        <div className="pl-2">
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 text-cyan-600 cursor-pointer"
                >
                    {open ? <FolderOpen size={18} /> : <Folder size={18} />}
                </button>

                <Link href={`/${path.join("/")}`} className="hover:underline">{name}</Link>
            </div>

            {open && node.children && (
                <div className="ml-4 border-l border-gray-700 pl-2 mt-1">
                   <FileTree data={node.children} currentPath={path} />
                </div>
            )}
        </div>
    );
};

export default TreeNode;