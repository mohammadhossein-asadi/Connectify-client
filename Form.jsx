const handleFormSubmit = async (values, onSubmitProps) => {
  try {
    const loggedIn = await login({
      email: values.email, // Ensure this matches your backend expectations
      password: values.password, // Ensure this matches your backend expectations
    });
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(setLogin(loggedIn));
      navigate("/home");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    // Handle error appropriately
  }
};
