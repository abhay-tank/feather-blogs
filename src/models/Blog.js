class Blog {
	constructor(
		blogId = null,
		blogAuthor = null,
		blogTitle = null,
		blogContent = null,
		blogImages = [
			{
				blogImageId: null,
				blogImageAlt: null,
				blogImageURL: null,
			},
		],
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
