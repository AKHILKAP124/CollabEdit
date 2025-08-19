import SnippetComment from "../models/SnippetComment.js";

const createComment = async (req, res) => {
    try {
        const { snippet, user, content } = req.body;
        if (!snippet || !user || !content) {
            return res.status(400).json({ message: "Snippet ID, user ID, and content are required" });
        }
        const comment = new SnippetComment({ snippet, user, content });
        await comment.save();
        return res.status(201).json({ message: "Comment created successfully", comment });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating comment', error });
    }
}

const getSnippetComments = async (req, res) => {
    try {
        const { snippetId } = req.body;
        if (!snippetId) {
            return res.status(400).json({ message: "Snippet ID is required" });
        }
        const comments = await SnippetComment.find({ snippet: snippetId }).populate('user', 'name email picture');
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching comments', error });
    }
}

const userComments = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const comments = await SnippetComment.find({ user: userId }).populate('user', 'name email picture').populate('snippet');
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching user comments', error });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        if (!commentId) {
            return res.status(400).json({ message: "Comment ID is required" });
        }
        const comment = await SnippetComment.findByIdAndDelete(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting comment', error });
    }
}

export {
    createComment,
    getSnippetComments,
    deleteComment,
    userComments
}

