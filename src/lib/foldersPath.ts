import { FileNodeType } from '../types/fileSystemTypes';
import { toSlug } from '@/utils/toSlug';

type FolderPathResult = {
    folder: Record<string, FileNodeType>;
    displayPath: string[];
};

export const getFolderPath = ( tree: Record<string, FileNodeType>, path: string[] ): FolderPathResult | null => {
    let current: Record<string, FileNodeType> = tree;
    const displayPath: string[] = [];

    for (const segment of path) {
        const matchingKey = Object.keys(current).find(key => toSlug(key) === segment);
        
        if (!matchingKey) {
            return null;
        }

        displayPath.push(matchingKey);

        const next = current[matchingKey];

        if (next.type !== 'folder') {
            return null;
        }

        if (!next.children) return null;
        current = next.children;
    }

    return { folder: current, displayPath };
};