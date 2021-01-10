const config = {
	BACKEND_BASE_URL: "https://feather-api.herokuapp.com",
	AUTH_SIGNUP_ENDPOINT: "/auth/signUp", // POST
	AUTH_SIGNIN_ENDPOINT: "/auth/signIn", // POST
	AUTH_SIGNOUT_ENDPOINT: "/auth/signOut", // GET
	AUTH_SEND_VERIFICATION_EMAIL_ENDPOINT: "/auth/sendVerificationEmail/", // GET append :userId
	AUTH_VERIFY_USER_ACCOUNT_ENDPOINT: "/auth/verifyUserAccount/", // GET append :verificationToken
	BLOGS_GET_ALL_ENDPOINT: "/blogs", // GET append ?limit=10 if needed
	BLOGS_GET_BY_ID_ENDPOINT: "/blogs/", //  GET append :blogId
	BLOGS_UPDATE_ENDPOINT: "/blogs/", // PATCH append :blogId
	BLOGS_CREATE_ENDPOINT: "/blogs", // POST
	BLOGS_DELETE_ENDPOINT: "/blogs/", // DELETE append :blogId
};

export default config;
