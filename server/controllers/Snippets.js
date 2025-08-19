import Snippets from "../models/Snippets.js";

const createSnippet = async (req, res) => {
  try {
    const { title, code, user, language } = req.body;
    if (!title || !code || !user || !language ) {
      return res
        .status(400)
        .json({
          message: "Title, code, user, and language are required",
        });
    }
    const snippet = new Snippets({ title, code, user, language });
    await snippet.save();
    return res
      .status(201)
      .json({ message: "Snippet created successfully", snippet });
  } catch (error) {
    return res.status(500).json({ message: "Error creating snippet", error });
  }
};

const getAllSnippets = async (req, res) => {
  console.log("Fetching all snippets");
  // Fetch all snippets and populate user details
  try {
    const snippets = await Snippets.find().populate(
      "user",
      "name email picture"
    );
    return res.status(200).json(snippets);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching snippets", error });
  }
};

const getSnippetById = async (req, res) => {
  try {
    const { sId } = req.params; 
    console.log("Snippet ID:", sId);
    if (!sId) {
      return res.status(400).json({ message: "Snippet ID is required" });
    }
    const snippet = await Snippets.findById(sId).populate(
      "user",
      "name email picture"
    );
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }
    return res.status(200).json(snippet);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching snippet", error });
  }
};

const updateStarCount = async (req, res) => {
  try {
    const { snippetId, userId } = req.body;
    if (!snippetId || !userId) {
      return res.status(400).json({ message: "Snippet ID and User ID are required" });
    }
    const snippet = await Snippets.findById(snippetId);
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }
    
    // Toggle star status
    if (snippet.stars.includes(userId)) {
      snippet.stars = snippet.stars.filter((id) => id !== userId);
    } else {
      snippet.stars.push(userId);
    }
    
    await snippet.save();
    return res.status(200).json({ message: "Star count updated", snippet });
  } catch (error) {
    return res.status(500).json({ message: "Error updating star count", error });
  }
};

const getUserStarredSnippets = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const snippets = await Snippets.find({ stars: userId }).populate(
      "user",
      "name email picture"
    );
    return res.status(200).json(snippets);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching starred snippets", error });
  }
};

const getStarCount = async (req, res) => {
  try {
    const { snippetId } = req.params;
    if (!snippetId) {
      return res.status(400).json({ message: "Snippet ID is required" });
    }
    const snippet = await Snippets.findById(snippetId);
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }
    return res.status(200).json(snippet.stars.length );
  } catch (error) {
    return res.status(500).json({ message: "Error fetching star count", error });
  }
};

const deleteSnippet = async (req, res) => {
  try {
    const { sId } = req.params;
    if (!sId) {
      return res.status(400).json({ message: "Snippet ID is required" });
    }
    const snippet = await Snippets.findByIdAndDelete(sId);
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }
    return res.status(200).json({ message: "Snippet deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting snippet", error });
  }
};

export { createSnippet, getAllSnippets, deleteSnippet, getSnippetById, updateStarCount, getUserStarredSnippets, getStarCount };
