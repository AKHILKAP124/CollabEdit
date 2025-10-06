import React, { useEffect, useState } from "react";

type FileNode = {
    name: string;
    type: "file" | "folder";
    children?: FileNode[];
    file?: File;
    isOpen?: boolean;
};


// 🔹 Convert FileList to Tree
function buildTree(files: FileList): FileNode[] {
    const tree: FileNode[] = [];

    for (const file of Array.from(files)) {
        const parts = (file as any).webkitRelativePath.split("/"); // e.g. "src/components/App.tsx"
        let currentLevel = tree;

        parts.forEach((part: string, index: number) => {
            const existingNode = currentLevel.find((n) => n.name === part);

            if (!existingNode) {
                const newNode: FileNode = {
                    name: part,
                    file,
                    type: index === parts.length - 1 ? "file" : "folder",
                    children: index === parts.length - 1 ? undefined : [],
                    isOpen: false,
                };

                currentLevel.push(newNode);

                if (newNode.type === "folder") {
                    currentLevel = newNode.children!;
                }
            } else if (existingNode.type === "folder") {
                currentLevel = existingNode.children!;
            }
        });
    }

    return tree;
}



// 🔹 Recursive Folder/File Renderer


export default function FileExplorer() {
    const [fileContent, setFileContent] = useState<string>("");
    const [tree, setTree] = useState<FileNode[]>([]);

    useEffect(() => {
        if (fileContent) {
            console.log(fileContent);
        }
    }, [fileContent]);

    function FileTreeNode({
        node,
        toggleNode,
        onFileClick
    }: {
        node: FileNode;
        toggleNode: (path: string) => void;
        onFileClick: (file: File) => void;
    }) {
        return (
            <div className="ml-4">
                {node.type === "folder" ? (
                    <div>
                        <div
                            className="cursor-pointer font-bold"
                            onClick={() => toggleNode(node.name)}
                        >
                            {node.isOpen ? "📂" : "📁"} {node.name}
                        </div>
                        {node.isOpen &&
                            node.children?.map((child, i) => (
                                <FileTreeNode
                                    key={i}
                                    node={child}
                                    toggleNode={toggleNode}
                                    onFileClick={onFileClick}
                                />
                            ))}
                    </div>
                ) : (
                    <div className="cursor-pointer" onClick={() => { onFileClick(node.file); }}>📄 {node.name}</div>
                )}
            </div>
        );
    }

    const handleFileClick = async (file: File) => {
        console.log(file);
        if (file.type.startsWith("text/") || file.type === "") {
            const text = await file.text();
            setFileContent(text);
        } else if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => {
                setFileContent(`<img src="${reader.result}" alt="${file.name}" />`);
            };
            reader.readAsDataURL(file);
        } else {
            setFileContent("Preview not supported");
        }
    };


    // Toggle folder open/close
    const toggleNode = (name: string) => {
        const updateTree = (nodes: FileNode[]): FileNode[] =>
            nodes.map((n) =>
                n.name === name
                    ? { ...n, isOpen: !n.isOpen }
                    : { ...n, children: n.children ? updateTree(n.children) : n.children }
            );

        setTree(updateTree(tree));
    };

    // Handle folder upload
    const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newTree = buildTree(e.target.files);
            setTree(newTree);
        }
    };

    return (
        <div className="p-4">
            {/* Upload folder */}
            <input
                type="file"
                {...{ webkitdirectory: "" }}
                multiple
                onChange={handleFolderUpload}
                className="mb-4"
            />

            {/* Render file explorer */}
            <div>
                {tree.map((node, i) => (
                    <FileTreeNode key={i} node={node} toggleNode={toggleNode} onFileClick={handleFileClick} />
                ))}
            </div>

            {/* File Preview */}
            <div className="border p-2">
                <h2 className="font-bold mb-2">Preview</h2>
                <div
                    dangerouslySetInnerHTML={{ __html: fileContent }}
                    className="whitespace-pre-wrap"
                />
            </div>
        </div>
    );
}

