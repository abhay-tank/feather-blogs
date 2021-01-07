class Blog {
	constructor(
		blogId = "",
		blogAuthor = "",
		blogTitle = "",
		blogContent = "",
		blogImages = {
			blogImageId: "",
			blogImageAlt: "",
			blogImageURL: "",
		},
		blogRelatedLinks = [],
		createdAt = null,
		updatedAt = null
	) {
		this.blogId = blogId;
		this.blogAuthor = blogAuthor;
		this.blogImages = blogImages;
		this.blogTitle = blogTitle;
		this.blogContent = blogContent;
		this.blogRelatedLinks = blogRelatedLinks;
	}
}

export default Blog;
