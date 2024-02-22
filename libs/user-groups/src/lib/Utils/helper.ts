export const fieldsHandler = (props) => {
  const { name, description, tags } = props;
  if (!name || !description || !tags) {
    return {
      name: "Name is required",
      description: "Description is required",
      tags: "Tags are required",
    };
  } else {
    return {
      name: "",
      description: "",
      tags: "",
    };
  }
};
