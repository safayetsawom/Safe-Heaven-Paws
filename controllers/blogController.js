const Blog = require('../models/blogModel');

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch blogs' 
    });
  }
};

exports.createBlog = async (req, res) => {
  try {
    console.log('Received blog data:', req.body);
    console.log('User data:', req.user);

    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ 
        success: false,
        message: 'Title and content are required' 
      });
    }

    const blogData = {
      title,
      content,
      authorName: req.user.name || req.user.username,
      createdAt: new Date()
    };

    console.log('Creating blog with data:', blogData);

    const newBlog = new Blog(blogData);
    const savedBlog = await newBlog.save();

    console.log('Blog saved successfully:', savedBlog);

    res.status(201).json({
      success: true,
      data: savedBlog
    });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to create blog',
      error: error.message 
    });
  }
}; 