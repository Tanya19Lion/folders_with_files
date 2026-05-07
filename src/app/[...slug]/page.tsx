import FileTree from "@/components/FileTree";
import { filesSystemData } from "@/data/filesSystemData";
import { getFolderPath } from "@/lib/foldersPath";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ slug?: string[] }>;
};

const FolderPage = async ({ params }: Props) => {
    const { slug = [] } = await params;
    const result = getFolderPath(filesSystemData, slug);

    if (!result) {
        notFound();
    }

    const { folder, displayPath } = result;

    return (
        <main className="pt-6">
            <h1 className="text-2xl font-bold mb-4">/{displayPath.join("/")}</h1>

            <FileTree data={folder} currentPath={slug} />
        </main>
    );
};

export default FolderPage;