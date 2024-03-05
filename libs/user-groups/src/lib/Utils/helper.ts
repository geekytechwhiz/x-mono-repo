const spaceReplace = (val) => {
  return val && val.replace(/[\s]+/g, "-");
};

export const userGroupCreateMapper = (userData) => {
  const { name } = userData;
  const updateValue = spaceReplace(name);
  return { ...userData, name: updateValue, label: name, parentId: null };
};

export const userGroupUpdateMapper = (userData, locationData) => {
  const { name } = userData;
  const { id, groupName } = locationData;
  const updateValue = spaceReplace(name);
  return { ...userData, name: updateValue, label: name, id, groupName };
};
