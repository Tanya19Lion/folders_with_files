import FileTree from "@/components/FileTree";
import { filesSystemData } from "@/data/filesSystemData";

const HomePage = () => {
	return (		
		<FileTree data={filesSystemData} />
	);
}

export default HomePage;
