const spaceReplace = (val) => {
  return val && val.replace(/[\s]+/g, "-");
};

export const userGroupMapper = (userData) => {
  const { name } = userData;
  const updateValue = spaceReplace(name);
  return { ...userData, name: updateValue, label: name };
};
