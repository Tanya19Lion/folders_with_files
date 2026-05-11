import { FileNodeType } from '../types/fileSystemTypes';
import { toSlug } from '@/lib/toSlug';

type FolderPathResult = {
    folder: Record<string, FileNodeType>;
    displayPath: string[];
};

/**
 * Type guard to validate if a value is a valid FileNodeType
 */
const isValidFileNode = (node: unknown): node is FileNodeType => {
    if (!node || typeof node !== 'object') return false;
    
    const n = node as Partial<FileNodeType>;

    if (n.type !== 'file' && n.type !== 'folder') return false;

    if (n.type === 'folder' && n.children !== undefined) {
        if (typeof n.children !== 'object' || n.children === null) return false;
    }
    
    return true;
};

/**
 * Validates the entire tree structure
 */
const isValidTree = (tree: unknown): tree is Record<string, FileNodeType> => {
    if (!tree || typeof tree !== 'object' || Array.isArray(tree)) return false;
    
    return Object.values(tree).every(isValidFileNode);
};

export const getFolderPath = (tree: Record<string, FileNodeType>, path: string[]): FolderPathResult | null => {  
    if (!isValidTree(tree)) {
        console.error('Invalid tree structure provided');
        return null;
    }

    if (!Array.isArray(path)) {
        console.error('Path must be an array');
        return null;
    }

    if (path.length === 0) {
        return { folder: tree, displayPath: [] };
    }

    let current: Record<string, FileNodeType> = tree;
    const displayPath: string[] = [];

    for (let i = 0; i < path.length; i++) {
        const segment = path[i];

        // Validate segment
        if (typeof segment !== 'string' || segment.trim() === '') {
            console.error(`Invalid path segment at index ${i}:`, segment);
            return null;
        }

        const matchingKey = Object.keys(current).find(key => toSlug(key) === segment);
        
        if (!matchingKey) {
            console.warn(`No matching folder found for segment "${segment}" at path: /${displayPath.join('/')}`);
            return null;
        }

        const next = current[matchingKey];

        // Validate node structure
        if (!isValidFileNode(next)) {
            console.error(`Invalid node structure at "${matchingKey}"`);
            return null;
        }

        displayPath.push(matchingKey);

        // Check if it's a file instead of a folder
        if (next.type !== 'folder') {
            console.warn(`Path segment "${matchingKey}" is a file, not a folder`);
            return null;
        }

        // Validate children exist for folder
        if (!next.children || typeof next.children !== 'object') {
            console.error(`Folder "${matchingKey}" has invalid or missing children`);
            return null;
        }

        current = next.children;
    }

    return { folder: current, displayPath };
};